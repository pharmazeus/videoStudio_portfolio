/* eslint-env node */

import path from "node:path";
import process from "node:process";

import { inspectVideo } from "./inspect-video.js";
import {
  assertBinaryAvailable,
  ensureDirectory,
  parseArgs,
  pathExists,
  printHelpAndExit,
  resolveDefaultStart,
  runBinary,
} from "./shared.js";

const HELP_TEXT = `Usage:
  node .agents/skills/video-preview-prep/scripts/extract-poster.js --input <file> --output <file> [options]

Options:
  --input <file>      Source video path
  --output <file>     Poster output path
  --time <seconds>    Poster timestamp override
  --force             Overwrite existing output
  --help              Show this help message
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

  const time = resolveDefaultStart(args.time, metadata);

  await ensureDirectory(path.dirname(outputPath));

  await runBinary("ffmpeg", [
    "-y",
    "-ss",
    String(time),
    "-i",
    path.resolve(args.input),
    "-frames:v",
    "1",
    "-q:v",
    "2",
    outputPath,
  ]);

  console.log(
    JSON.stringify(
      {
        skipped: false,
        time,
        output: outputPath,
      },
      null,
      2,
    ),
  );
}

main().catch((error) => {
  console.error(`extract-poster failed: ${error.message}`);
  process.exit(1);
});
