import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The internet, reduced to a single word.
const WORD = "Scrollhole";

function fail(message: string): never {
  throw new Error(message);
}

function checkWord(value: string): void {
  const points = [...value];
  if (points.length < 1 || points.length > 30) {
    fail(`word must be 1-30 code points, got ${points.length}`);
  }
  if (value.trim().length === 0) {
    fail("word must not be only whitespace");
  }
  for (const ch of points) {
    if (ch === " " || ch === "\n" || ch === "\r" || ch === "\t" || /\s/.test(ch)) {
      fail("word must be a single word with no whitespace");
    }
  }
}

function outputDir(): string {
  const configured = process.env.MAKEFUN_OUTPUT_DIR;
  if (typeof configured === "string" && configured.trim() !== "") {
    return configured.trim();
  }
  return "/output";
}

function main(): void {
  checkWord(WORD);

  const dir = outputDir();
  mkdirSync(dir, { recursive: true });

  const target = join(dir, "entry.txt");
  writeFileSync(target, WORD, "utf8");

  const back = readFileSync(target, "utf8");
  if (back !== WORD) {
    fail(`round-trip mismatch: wrote ${JSON.stringify(WORD)}, read back ${JSON.stringify(back)}`);
  }
  const bytes = Buffer.byteLength(back, "utf8");
  if (bytes < 1 || bytes > 30) {
    fail(`entry byte length out of range: ${bytes}`);
  }

  console.log(`wrote ${target} (${bytes} bytes)`);
}

main();
