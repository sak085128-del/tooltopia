/* eslint-disable no-console */
/**
 * One-off extractor: parses the hardcoded TOOLS array out of the legacy
 * script.js and writes it to lib/data/tools.seed.json for the DB seed script.
 * Not part of the app runtime.
 */
const fs = require("fs");
const path = require("path");

const src = fs.readFileSync(path.join(__dirname, "..", "script.js"), "utf8");

const startMark = "var TOOLS = [";
const startIdx = src.indexOf(startMark);
if (startIdx === -1) throw new Error("TOOLS array not found");
const arrayStart = startIdx + startMark.length;

// Find the matching closing "];" for the array. We scan forward tracking
// brackets, starting at depth 1 because the opening "[" was already consumed.
let depth = 1;
let endIdx = -1;
for (let i = arrayStart; i < src.length; i++) {
  const c = src[i];
  if (c === "[") depth++;
  else if (c === "]") {
    depth--;
    if (depth === 0) {
      endIdx = i;
      break;
    }
  }
}
if (endIdx === -1) throw new Error("TOOLS array end not found");

const arrayText = src.slice(arrayStart, endIdx);
// The array is valid JS (single-quoted strings). Use Function to evaluate it
// as an expression. It's our own trusted file content.
const tools = new Function("return [" + arrayText + "];")();

console.log(`Parsed ${tools.length} tools`);

const outDir = path.join(__dirname, "..", "lib", "data");
fs.mkdirSync(outDir, { recursive: true });
const outPath = path.join(outDir, "tools.seed.json");
fs.writeFileSync(outPath, JSON.stringify(tools, null, 2), "utf8");
console.log(`Wrote ${outPath}`);