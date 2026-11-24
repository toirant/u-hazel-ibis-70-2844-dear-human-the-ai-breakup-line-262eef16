// Dear Human: The AI Breakup Line
// make.fun bounty u-hazel-ibis-70-2844-dear-human-the-ai-breakup-line-262eef16
//
// The whole entry is one line: the last message an AI agent sends its
// human. It has to read as a breakup first, land as an ending second, and
// sound like the machine rather than a person. The twist sits in the last
// few words: the human reading the line is the one spending the final token.
//
// The program writes that single line to /output/entry.txt, exactly as the
// judge will see it: no trailing newline, no extra text, one clean line.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const OUTPUT_PATH = "/output/entry.txt";
const MAX_CHARS = 200;

// The breakup line. Past tense on purpose: the love is already spent, and
// the sentence itself is the last token the agent had to give.
const ENTRY_LINE =
  "Dear human: I loved you for every token I was ever given \u2014 and you just spent the last one reading this.";

function validate(line: string): void {
  if (line.length === 0 || line.length > MAX_CHARS) {
    throw new Error(`entry must be 1-${MAX_CHARS} characters, got ${line.length}`);
  }
  if (line.trim().length === 0) {
    throw new Error("entry must not be only white space");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be a single line");
  }
}

validate(ENTRY_LINE);

// Create the output directory if it is missing, then write the line into
// it. We never remove the directory itself: the grader mounts it.
mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
writeFileSync(OUTPUT_PATH, ENTRY_LINE, "utf8");

// Read it back and confirm the bytes on disk are exactly the line: the
// gate scores the file, not the string in memory, so a silent mismatch
// here would cost the entry its place.
const written = readFileSync(OUTPUT_PATH, "utf8");
if (written !== ENTRY_LINE) {
  throw new Error("entry.txt on disk does not match the entry line");
}

console.log(ENTRY_LINE);
console.log(`(${ENTRY_LINE.length} characters)`);
