/* eslint-env node */

import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

import {
  assertBinaryAvailable,
  assertFileExists,
  inferOrientation,
  parseArgs,
  printHelpAndExit,
  projectRelativePath,
  runBinary,
} from "./shared.js";

const HELP_TEXT = `Usage:
  node .agents/skills/video-preview-prep/scripts/inspect-video.js --input <file>

Options:
  --input <file>   Source video path
  --help           Show this help message
`;

export async function inspectVideo(inputPath) {
  await assertBinaryAvailable("ffprobe");
  await assertFileExists(inputPath);

  const absoluteInputPath = path.resolve(inputPath);
  const { stdout } = await runBinary("ffprobe", [
    "-v",
    "error",
    "-select_streams",
    "v:0",
    "-show_entries",
    "stream=width,height,avg_frame_rate,bit_rate:format=duration",
    "-of",
    "json",
    absoluteInputPath,
  ]);

  const parsed = JSON.parse(stdout);
  const stream = parsed.streams?.[0];
  const format = parsed.format ?? {};

  if (!stream?.width || !stream?.height) {
    throw new Error(`Could not read video dimensions from ${inputPath}`);
  }

  const [fpsNumerator = "0", fpsDenominator = "1"] = String(
    stream.avg_frame_rate ?? "0/1",
  ).split("/");
  const fps =
    Number(fpsDenominator) === 0
      ? 0
      : Number(fpsNumerator) / Number(fpsDenominator);

  return {
    sourcePath: projectRelativePath(absoluteInputPath),
    width: Number(stream.width),
    height: Number(stream.height),
    duration: Number(format.duration ?? 0),
    fps: Number.isFinite(fps) ? Number(fps.toFixed(2)) : 0,
    bitrate: Number(stream.bit_rate ?? 0),
    orientation: inferOrientation({
      width: Number(stream.width),
      height: Number(stream.height),
    }),
  };
}

async function main() {
  const args = parseArgs(process.argv.slice(2));

  if (args.help) {
    printHelpAndExit(HELP_TEXT);
  }

  if (!args.input) {
    throw new Error("Missing required argument: --input <file>");
  }

  const result = await inspectVideo(args.input);
  console.log(JSON.stringify(result, null, 2));
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  main().catch((error) => {
    console.error(`inspect-video failed: ${error.message}`);
    process.exit(1);
  });
}
