/**
 * Upload DJ photos to Vercel Blob.
 * Usage: node scripts/upload-dj-photos.mjs /path/to/photos/folder
 *
 * Put the 5 photos in a folder named 1.jpg, 2.jpg, 3.jpg, 4.jpg, 5.jpg
 * (or any names — they'll be renamed on upload).
 */

import { put } from "@vercel/blob";
import { readFileSync, readdirSync } from "fs";
import { join, extname } from "path";
import { config } from "dotenv";

config({ path: ".env.local" });

const folder = process.argv[2];
if (!folder) {
  console.error("Usage: node scripts/upload-dj-photos.mjs <folder>");
  process.exit(1);
}

const exts = new Set([".jpg", ".jpeg", ".JPG", ".JPEG", ".png", ".PNG"]);
const files = readdirSync(folder)
  .filter((f) => exts.has(extname(f)))
  .sort();

console.log(`Found ${files.length} photos in ${folder}`);

for (let i = 0; i < files.length; i++) {
  const file = files[i];
  const path = join(folder, file);
  const buffer = readFileSync(path);
  const blobName = `dj/photos/${i + 1}.jpg`;

  console.log(`Uploading ${file} → ${blobName}...`);
  const result = await put(blobName, buffer, {
    access: "public",
    contentType: "image/jpeg",
  });
  console.log(`  ✓ ${result.url}`);
}

console.log("Done.");
