/* eslint-env node */

import { readdir } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

import { inspectVideo } from "./inspect-video.js";
import {
  buildMediaObjectSnippet,
  ensureDirectory,
  getPathStat,
  kebabCase,
  parseArgs,
  pathExists,
  printHelpAndExit,
  publicAssetPath,
  readJsonFile,
  resolveOrientation,
  writeJsonFile,
} from "./shared.js";

const HELP_TEXT = `Usage:
  node .agents/skills/video-preview-prep/scripts/prepare-video-assets.js [options]

Options:
  --input <file-or-dir>       Source file or directory
  --manifest <json>           Optional JSON manifest with items: [{ slug, sourcePath, orientation }]
  --orientation <mode>        portrait | landscape | auto (default: auto)
  --duration <seconds>        Preview duration (default: 5)
  --start <seconds>           Preview start override
  --poster-time <seconds>     Poster timestamp override
  --force                     Overwrite existing outputs
  --help                      Show this help message
`;

const ALLOWED_EXTENSIONS = new Set([
  ".mp4",
  ".mov",
  ".m4v",
  ".webm",
  ".mkv",
  ".avi",
]);

async function collectSources(inputPath) {
  const absolutePath = path.resolve(inputPath);
  const stats = await getPathStat(absolutePath);

  if (stats.isFile()) {
    return [
      {
        slug: kebabCase(path.parse(absolutePath).name),
        sourcePath: absolutePath,
      },
    ];
  }

  const entries = await readdir(absolutePath, { withFileTypes: true });

  return entries
    .filter((entry) => entry.isFile())
    .filter((entry) =>
      ALLOWED_EXTENSIONS.has(path.extname(entry.name).toLowerCase()),
    )
    .map((entry) => ({
      slug: kebabCase(path.parse(entry.name).name),
      sourcePath: path.join(absolutePath, entry.name),
    }));
}

async function loadWorkItems(args) {
  if (args.manifest) {
    const manifest = await readJsonFile(path.resolve(args.manifest));
    const items = Array.isArray(manifest) ? manifest : manifest.items;

    if (!Array.isArray(items)) {
      throw new Error("Manifest must be an array or an object with an items array.");
    }

    return items.map((item) => ({
      slug: item.slug || kebabCase(path.parse(item.sourcePath).name),
      sourcePath: path.resolve(item.sourcePath),
      orientation: item.orientation,
    }));
  }

  if (!args.input) {
    throw new Error("Provide --input <file-or-dir> or --manifest <json>.");
  }

  return collectSources(args.input);
}

function runNodeScript(scriptPath, scriptArgs) {
  const result = spawnSync(process.execPath, [scriptPath, ...scriptArgs], {
    encoding: "utf8",
    stdio: "pipe",
  });

  if (result.status !== 0) {
    throw new Error(result.stderr.trim() || result.stdout.trim());
  }

  return result.stdout.trim() ? JSON.parse(result.stdout) : null;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));

  if (args.help) {
    printHelpAndExit(HELP_TEXT);
  }

  const scriptDir = path.dirname(fileURLToPath(import.meta.url));
  const makePreviewScript = path.join(scriptDir, "make-preview.js");
  const extractPosterScript = path.join(scriptDir, "extract-poster.js");
  const items = await loadWorkItems(args);
  const results = [];

  if (!items.length) {
    throw new Error("No source videos were found to process.");
  }

  for (const item of items) {
    const metadata = await inspectVideo(item.sourcePath);
    const orientation = resolveOrientation(
      item.orientation ?? args.orientation ?? "auto",
      metadata,
    );
    const previewOutput = path.resolve(
      `public/videos/previews/${orientation}/${item.slug}-preview.mp4`,
    );
    const posterOutput = path.resolve(
      `public/posters/${orientation}/${item.slug}-poster.jpg`,
    );

    await ensureDirectory(path.dirname(previewOutput));
    await ensureDirectory(path.dirname(posterOutput));

    const previewArgs = [
      "--input",
      item.sourcePath,
      "--output",
      previewOutput,
      "--orientation",
      orientation,
      "--duration",
      String(args.duration ?? 5),
    ];

    if (args.start) {
      previewArgs.push("--start", String(args.start));
    }

    if (args.force) {
      previewArgs.push("--force");
    }

    const posterArgs = ["--input", item.sourcePath, "--output", posterOutput];

    if (args["poster-time"]) {
      posterArgs.push("--time", String(args["poster-time"]));
    }

    if (args.force) {
      posterArgs.push("--force");
    }

    runNodeScript(makePreviewScript, previewArgs);
    runNodeScript(extractPosterScript, posterArgs);

    results.push({
      slug: item.slug,
      sourcePath: item.sourcePath,
      orientation,
      previewSrc: publicAssetPath(previewOutput),
      poster: publicAssetPath(posterOutput),
      duration: Number(args.duration ?? 5),
      width: orientation === "portrait" ? 720 : 1280,
      height: orientation === "portrait" ? 1280 : 720,
      mediaSnippet: buildMediaObjectSnippet({
        orientation,
        previewSrc: publicAssetPath(previewOutput),
        poster: publicAssetPath(posterOutput),
      }),
    });
  }

  const manifestPath = path.resolve("public/videos/previews/manifest.json");
  const existingManifest = (await pathExists(manifestPath))
    ? await readJsonFile(manifestPath)
    : { generatedAt: null, items: [] };
  const existingItems = Array.isArray(existingManifest.items)
    ? existingManifest.items
    : [];
  const mergedItems = [
    ...existingItems.filter(
      (existing) => !results.some((item) => item.slug === existing.slug),
    ),
    ...results,
  ].sort((left, right) => left.slug.localeCompare(right.slug));

  await writeJsonFile(manifestPath, {
    generatedAt: new Date().toISOString(),
    items: mergedItems,
  });

  console.log(
    JSON.stringify(
      {
        processed: results.length,
        manifest: publicAssetPath(manifestPath),
        items: results,
      },
      null,
      2,
    ),
  );
}

main().catch((error) => {
  console.error(`prepare-video-assets failed: ${error.message}`);
  process.exit(1);
});
