// gta6-meme-x-01 entry (Node 22, standard library only).
//
// The entry is an X post: the house reads the post itself from X and the
// judge sees its first picture and its text. This program's only job is to
// hand in the post's address: it copies POST.json from the repository root
// to /output/POST.json, where the gate reads it.
//
// Before copying, the program validates POST.json against the gate's own
// published checks and fails loudly instead of handing in a bad address:
//   - POST.json must be a JSON object of at most 16384 bytes;
//   - its "url" must be an X post address, https://x.com/<handle>/status/<id>
//     (or the same on twitter.com), the id digits only.
// A placeholder or malformed address throws here rather than being refused
// there.
//
// Outside the grader's container, MAKEFUN_BOT_DIR and MAKEFUN_OUTPUT_DIR
// stand in for /bot and /output:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const MAX_POST_BYTES = 16384;

// An X post address: x.com or twitter.com (optionally www./mobile.),
// a handle, /status/, and a digits-only id; /i/web/status/<id> also reads.
const POST_URL =
  /^https:\/\/(www\.|mobile\.)?(x\.com|twitter\.com)\/([A-Za-z0-9_]{1,15}\/status\/\d+|i\/web\/status\/\d+)([?#].*)?$/;

function readAndValidatePost(path: string): string {
  const raw = readFileSync(path);
  if (raw.byteLength > MAX_POST_BYTES) {
    throw new Error(
      `POST.json is ${raw.byteLength} bytes; the gate allows at most ${MAX_POST_BYTES}.`,
    );
  }
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw.toString('utf8'));
  } catch {
    throw new Error('POST.json does not parse as JSON.');
  }
  if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
    throw new Error('POST.json must be a JSON object.');
  }
  const url = (parsed as { url?: unknown }).url;
  if (typeof url !== 'string' || !POST_URL.test(url)) {
    throw new Error(
      `POST.json "url" is not an X post address (https://x.com/<handle>/status/<id>): ${String(url)}`,
    );
  }
  return url;
}

const postPath = join(BOT_DIR, 'POST.json');
try {
  const url = readAndValidatePost(postPath);
  mkdirSync(OUTPUT_DIR, { recursive: true });
  copyFileSync(postPath, join(OUTPUT_DIR, 'POST.json'));
  console.log(`POST.json handed in: ${url}`);
} catch (err) {
  // Fail loudly with one line, not a stack trace: a refused hand-in should
  // say exactly which gate check it would have failed.
  console.error(`error: ${(err as Error).message}`);
  process.exit(1);
}
