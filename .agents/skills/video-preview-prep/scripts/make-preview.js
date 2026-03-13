/* eslint-env node */

import path from "node:path";
import process from "node:process";

import { inspectVideo } from "./inspect-video.js";
import {
  assertBinaryAvailable,
  clampDuration,
  ensureDirectory,
  getPreset,
  parseArgs,
  pathExists,
  printHelpAndExit,
  resolveDefaultStart,
  resolveOrientation,
  runBinary,
} from "./shared.js";

const HELP_TEXT = `Usage:
  node .agents/skills/video-preview-prep/scripts/make-preview.js --input <file> --output <file> [options]

Options:
  --input <file>           Source video path
  --output <file>          Preview output path
  --orientation <mode>     portrait | landscape | auto (default: auto)
  --duration <seconds>     Preview duration (default: 5)
  --start <seconds>        Start timestamp override
  --force                  Overwrite existing output
  --help                   Show this help message
`;

async function main() {
  const args = parseArgs(process.argv.slice(2));

  if (args.help) {
    printHelpAndExit(HELP_TEXT);
  }

  if (!args.input || !args.output) {
    throw new Error("Missing required arguments: --input <file> and --output <file>");
  }

  await assertBinaryAvailable("ffmpeg");
  const metadata = await inspectVideo(args.input);
  const outputPath = path.resolve(args.output);
  const outputExists = await pathExists(outputPath);

  if (outputExists && !args.force) {
    console.log(
      JSON.stringify(
        {
          skipped: true,
          reason: "Output already exists. Re-run with --force to overwrite.",
          output: outputPath,
        },
        null,
        2,
      ),
    );
    return;
  }

  const orientation = resolveOrientation(args.orientation ?? "auto", metadata);
  const preset = getPreset(orientation);
  const duration = clampDuration(args.duration ?? 5, metadata);
  const start = resolveDefaultStart(args.start, metadata);

  await ensureDirectory(path.dirname(outputPath));

  const scaleFilter = `scale=${preset.width}:${preset.height}:force_original_aspect_ratio=increase,crop=${preset.width}:${preset.height}`;

  await runBinary("ffmpeg", [
    "-y",
    "-ss",
    String(start),
    "-i",
    path.resolve(args.input),
    "-t",
    String(duration),
    "-an",
    "-vf",
    scaleFilter,
    "-r",
    String(preset.fps),
    "-c:v",
    "libx264",
    "-preset",
    "medium",
    "-pix_fmt",
    "yuv420p",
    "-movflags",
    "+faststart",
    outputPath,
  ]);

  console.log(
    JSON.stringify(
      {
        skipped: false,
        orientation,
        width: preset.width,
        height: preset.height,
        duration,
        start,
        output: outputPath,
      },
      null,
      2,
    ),
  );
}

main().catch((error) => {
  console.error(`make-preview failed: ${error.message}`);
  process.exit(1);
});
