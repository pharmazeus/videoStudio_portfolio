#!/usr/bin/env node
const runtimeProcess = globalThis.process;
const args = runtimeProcess.argv.slice(2);

if (args.includes("--help") || args.includes("-h")) {
  console.log(`Usage: node scripts/build-brief.js --asset <type> --offer "..." --audience "..." --problem "..." --desired-outcome "..." --proof "..." --objections "..." --cta "..." [--tone "..."] [--constraints "..."] [--language "en"]`);
  runtimeProcess.exit(0);
}

const flagMap = {
  "--asset": "Asset",
  "--offer": "Offer",
  "--audience": "Audience",
  "--problem": "Problem",
  "--desired-outcome": "Desired Outcome",
  "--proof": "Proof",
  "--objections": "Objections",
  "--cta": "CTA",
  "--tone": "Tone",
  "--constraints": "Constraints",
  "--language": "Language"
};

const requiredFlags = new Set([
  "--asset",
  "--offer",
  "--audience",
  "--problem",
  "--desired-outcome",
  "--cta"
]);

const values = {};
for (let i = 0; i < args.length; i += 1) {
  const flag = args[i];
  if (!flagMap[flag]) {
    continue;
  }

  const next = args[i + 1];
  if (!next || next.startsWith("--")) {
    values[flag] = "";
    continue;
  }

  values[flag] = next;
  i += 1;
}

if (!values["--language"]) {
  values["--language"] = "en";
}

const orderedFlags = [
  "--asset",
  "--audience",
  "--offer",
  "--problem",
  "--desired-outcome",
  "--proof",
  "--objections",
  "--cta",
  "--tone",
  "--language",
  "--constraints"
];

const missingCritical = orderedFlags.filter((flag) => requiredFlags.has(flag) && (!values[flag] || values[flag].trim() === ""));

const formatValue = (flag) => {
  const value = values[flag];
  if (!value || value.trim() === "") {
    return requiredFlags.has(flag) ? "MISSING" : "Not provided";
  }
  return value.trim();
};

const lines = ["# Copy Brief", ""];
for (const flag of orderedFlags) {
  lines.push(`- ${flagMap[flag]}: ${formatValue(flag)}`);
}

lines.push("");
lines.push("## Missing critical inputs");
if (missingCritical.length === 0) {
  lines.push("- None");
} else {
  for (const flag of missingCritical) {
    lines.push(`- ${flagMap[flag]}`);
  }
}

runtimeProcess.stdout.write(`${lines.join("\n")}\n`);
