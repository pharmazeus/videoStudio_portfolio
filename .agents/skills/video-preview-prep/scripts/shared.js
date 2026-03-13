/* eslint-env node */

import { access, mkdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { execFile } from "node:child_process";
import process from "node:process";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

const ORIENTATION_PRESETS = {
  portrait: { width: 720, height: 1280, fps: 30 },
  landscape: { width: 1280, height: 720, fps: 30 },
};

export function printHelpAndExit(helpText) {
  console.log(helpText);
  process.exit(0);
}

export function parseArgs(argv) {
  const args = {};

  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];

    if (!token.startsWith("--")) {
      continue;
    }

    const key = token.slice(2);
    const next = argv[index + 1];

    if (!next || next.startsWith("--")) {
      args[key] = true;
      continue;
    }

    args[key] = next;
    index += 1;
  }

  return args;
}

export async function pathExists(targetPath) {
  try {
    await access(targetPath);
    return true;
  } catch {
    return false;
  }
}

export async function assertFileExists(targetPath, label = "input") {
  const exists = await pathExists(targetPath);

  if (!exists) {
    throw new Error(`Missing ${label} file: ${targetPath}`);
  }
}

export async function ensureDirectory(targetPath) {
  await mkdir(targetPath, { recursive: true });
}

export async function getPathStat(targetPath) {
  return stat(targetPath);
}

export async function assertBinaryAvailable(binaryName) {
  try {
    await execFileAsync(binaryName, ["-version"]);
  } catch (error) {
    const reason =
      error.code === "ENOENT"
        ? `Required dependency is missing: ${binaryName}. Install ffmpeg/ffprobe locally before using this skill.`
        : `Failed to run ${binaryName}: ${error.message}`;

    throw new Error(reason);
  }
}

export async function runBinary(binaryName, args) {
  try {
    return await execFileAsync(binaryName, args);
  } catch (error) {
    const stderr = error.stderr?.trim();
    const stdout = error.stdout?.trim();
    const detail = stderr || stdout || error.message;

    throw new Error(`${binaryName} failed: ${detail}`);
  }
}

export function kebabCase(value) {
  return value
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/[_\s]+/g, "-")
    .replace(/-+/g, "-")
    .toLowerCase();
}

export function inferOrientation({ width, height }) {
  if (!width || !height) {
    throw new Error("Cannot infer orientation from missing dimensions.");
  }

  return height > width ? "portrait" : "landscape";
}

export function resolveOrientation(requestedOrientation, metadata) {
  if (requestedOrientation && requestedOrientation !== "auto") {
    return requestedOrientation;
  }

  return inferOrientation(metadata);
}

export function getPreset(orientation) {
  const preset = ORIENTATION_PRESETS[orientation];

  if (!preset) {
    throw new Error(
      `Unsupported orientation "${orientation}". Use portrait, landscape, or auto.`,
    );
  }

  return preset;
}

export function projectRelativePath(targetPath, cwd = process.cwd()) {
  const relativePath = path.relative(cwd, targetPath).replaceAll(path.sep, "/");
  return relativePath.startsWith(".") ? relativePath : `./${relativePath}`;
}

export function publicAssetPath(targetPath, projectRoot = process.cwd()) {
  const publicRoot = path.join(projectRoot, "public");
  const relativePath = path.relative(publicRoot, targetPath).replaceAll(path.sep, "/");

  if (relativePath.startsWith("..")) {
    throw new Error(
      `Expected output inside public/, received path outside public: ${targetPath}`,
    );
  }

  return `/${relativePath}`;
}

export function resolveDefaultStart(startSeconds, metadata) {
  if (startSeconds !== undefined) {
    return Math.max(0, Number(startSeconds));
  }

  const sourceDuration = Number(metadata.duration ?? 0);

  if (!Number.isFinite(sourceDuration) || sourceDuration <= 0) {
    return 0;
  }

  if (sourceDuration <= 1.2) {
    return 0;
  }

  return Math.min(1, Math.max(0, sourceDuration * 0.2));
}

export function clampDuration(requestedDuration, metadata) {
  const sourceDuration = Number(metadata.duration ?? requestedDuration);
  const desired = Number(requestedDuration ?? 5);

  if (!Number.isFinite(desired) || desired <= 0) {
    throw new Error(`Invalid duration value: ${requestedDuration}`);
  }

  if (!Number.isFinite(sourceDuration) || sourceDuration <= 0) {
    return desired;
  }

  return Math.min(desired, sourceDuration);
}

export async function readJsonFile(filePath) {
  const raw = await readFile(filePath, "utf8");
  return JSON.parse(raw);
}

export async function writeJsonFile(filePath, value) {
  await ensureDirectory(path.dirname(filePath));
  await writeFile(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

export function buildMediaObjectSnippet(item) {
  return [
    "media: {",
    `  poster: "${item.poster}",`,
    `  previewSrc: "${item.previewSrc}",`,
    '  youtubeUrl: "",',
    `  orientation: "${item.orientation}",`,
    "},",
  ].join("\n");
}
