/* eslint-env node */

import path from "node:path";
import process from "node:process";

import {
  buildMediaObjectSnippet,
  kebabCase,
  parseArgs,
  printHelpAndExit,
  readJsonFile,
} from "./shared.js";

const HELP_TEXT = `Usage:
  node .agents/skills/video-preview-prep/scripts/print-case-study-patch.js [options]

Options:
  --slug <slug>              Print one media object from the manifest
  --manifest <json>          Manifest path (default: public/videos/previews/manifest.json)
  --help                     Show this help message
`;

async function main() {
  const args = parseArgs(process.argv.slice(2));

  if (args.help) {
    printHelpAndExit(HELP_TEXT);
  }

  const manifestPath = path.resolve(
    args.manifest ?? "public/videos/previews/manifest.json",
  );
  const manifest = await readJsonFile(manifestPath);
  const items = Array.isArray(manifest) ? manifest : manifest.items;

  if (!Array.isArray(items)) {
    throw new Error("Manifest must contain an items array.");
  }

  const selected = args.slug
    ? items.find((item) => item.slug === kebabCase(args.slug))
    : items;

  if (!selected || (Array.isArray(selected) && selected.length === 0)) {
    throw new Error("No manifest rows matched the requested slug.");
  }

  if (Array.isArray(selected)) {
    console.log(
      selected
        .map(
          (item) =>
            `// ${item.slug}\n${buildMediaObjectSnippet({
              orientation: item.orientation,
              poster: item.poster,
              previewSrc: item.previewSrc,
            })}`,
        )
        .join("\n\n"),
    );
    return;
  }

  console.log(
    buildMediaObjectSnippet({
      orientation: selected.orientation,
      poster: selected.poster,
      previewSrc: selected.previewSrc,
    }),
  );
}

main().catch((error) => {
  console.error(`print-case-study-patch failed: ${error.message}`);
  process.exit(1);
});
