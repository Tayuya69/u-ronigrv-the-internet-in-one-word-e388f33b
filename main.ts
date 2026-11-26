// "Scrollhole" — the internet in one word.
//
// The whole internet, summed up in a single word: a scroll-hole, the
// endless pit you fall into when you meant to check one thing and
// surfaced an hour later, three tabs deeper, with no memory of how
// you got there.
//
// Deterministic: fixed string, no Date, no random, no network, no
// external assets, Node built-ins only.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const WORD = "Scrollhole";

function main(): void {
  // Validate before writing: 1-30 code points, not only whitespace,
  // a single word (no spaces, no \n / \r).
  const codePoints = [...WORD];
  if (codePoints.length < 1 || codePoints.length > 30) {
    throw new Error(`word must be 1-30 characters, got ${codePoints.length}`);
  }
  if (WORD.trim().length === 0) {
    throw new Error("word must not be only whitespace");
  }
  if (/\s/.test(WORD)) {
    throw new Error("word must be a single word with no whitespace");
  }

  const outDir = process.env.MAKEFUN_OUTPUT_DIR?.trim()
    ? process.env.MAKEFUN_OUTPUT_DIR
    : "/output";
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");

  writeFileSync(outPath, WORD, "utf8");

  // Read back and verify byte-identical content and length in range.
  const readBack = readFileSync(outPath, "utf8");
  if (readBack !== WORD) {
    throw new Error(
      `read-back mismatch: wrote ${JSON.stringify(WORD)}, read ${JSON.stringify(readBack)}`,
    );
  }
  const readCodePoints = [...readBack];
  if (readCodePoints.length < 1 || readCodePoints.length > 30) {
    throw new Error(`read-back length out of range: ${readCodePoints.length}`);
  }
}

main();

// Revision note (appended in a second session): the program writes the
// single word to entry.txt, then reads the file back and asserts the
// bytes are identical to the word before exiting. The write is fully
// deterministic: fixed string, no Date, no random, no network.
