/**
 * Upload media files to Vercel Blob Storage.
 *
 * - Compresses images to JPEG (max 1920px wide, 80% quality)
 * - Converts MOV/M4A to MP4/MP3 via ffmpeg
 * - Preserves folder structure in blob names
 *
 * Usage:
 *   npx tsx scripts/upload-blobs.ts [directory]
 *
 * Defaults to ./media if no directory is provided.
 * Outputs a JSON manifest of { filename: url } to stdout.
 *
 * Requires BLOB_READ_WRITE_TOKEN in .env.local or environment.
 */

import { put } from "@vercel/blob";
import { readFileSync, readdirSync, statSync, mkdtempSync, existsSync } from "fs";
import { join, relative, extname, basename, dirname } from "path";
import { execSync } from "child_process";
import { tmpdir } from "os";
import { config } from "dotenv";

config({ path: ".env.local" });

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".heic"]);
const VIDEO_EXTENSIONS = new Set([".mp4", ".mov"]);
const AUDIO_EXTENSIONS = new Set([".mp3", ".wav", ".m4a"]);
const ALL_SUPPORTED = new Set([...IMAGE_EXTENSIONS, ...VIDEO_EXTENSIONS, ...AUDIO_EXTENSIONS]);

const MAX_IMAGE_WIDTH = 1920;
const JPEG_QUALITY = 80;

// Create a temp directory for processed files
const TMP_DIR = mkdtempSync(join(tmpdir(), "blob-upload-"));

function compressImage(filePath: string): { buffer: Buffer; ext: string } {
  const ext = extname(filePath).toLowerCase();

  // Use sips (built into macOS) for image compression
  const outPath = join(TMP_DIR, `${basename(filePath, ext)}.jpg`);

  try {
    // Resize to max width, maintaining aspect ratio, and convert to JPEG
    execSync(
      `sips --resampleWidth ${MAX_IMAGE_WIDTH} --setProperty format jpeg --setProperty formatOptions ${JPEG_QUALITY} "${filePath}" --out "${outPath}" 2>/dev/null`,
      { stdio: "pipe" }
    );

    // Check if the image was smaller than MAX_IMAGE_WIDTH (sips would upscale)
    const origInfo = execSync(`sips -g pixelWidth "${filePath}" 2>/dev/null`, {
      encoding: "utf-8",
    });
    const origWidth = parseInt(origInfo.match(/pixelWidth:\s*(\d+)/)?.[1] || "0");

    if (origWidth <= MAX_IMAGE_WIDTH) {
      // Just convert format without resizing
      execSync(
        `sips --setProperty format jpeg --setProperty formatOptions ${JPEG_QUALITY} "${filePath}" --out "${outPath}" 2>/dev/null`,
        { stdio: "pipe" }
      );
    }

    const compressed = readFileSync(outPath);
    const original = readFileSync(filePath);

    // Only use compressed if it's actually smaller
    if (compressed.length < original.length) {
      const savings = ((1 - compressed.length / original.length) * 100).toFixed(1);
      console.error(`    Compressed: ${formatSize(original.length)} → ${formatSize(compressed.length)} (${savings}% smaller)`);
      return { buffer: compressed, ext: ".jpg" };
    } else {
      console.error(`    Keeping original (${formatSize(original.length)}, compression didn't help)`);
      return { buffer: original, ext };
    }
  } catch (e) {
    console.error(`    Warning: sips failed, uploading original`);
    return { buffer: readFileSync(filePath), ext };
  }
}

function convertVideo(filePath: string): { buffer: Buffer; ext: string } {
  const ext = extname(filePath).toLowerCase();

  if (ext === ".mp4") {
    // Already mp4 — just return as-is
    return { buffer: readFileSync(filePath), ext: ".mp4" };
  }

  // Convert MOV → MP4 with h264 + aac, web-optimized
  const outPath = join(TMP_DIR, `${basename(filePath, ext)}.mp4`);
  console.error(`    Converting MOV → MP4...`);

  try {
    execSync(
      `ffmpeg -i "${filePath}" -c:v libx264 -crf 23 -preset medium -c:a aac -b:a 128k -movflags +faststart -y "${outPath}" 2>/dev/null`,
      { stdio: "pipe", timeout: 120000 }
    );
    const converted = readFileSync(outPath);
    const original = readFileSync(filePath);
    console.error(`    Converted: ${formatSize(original.length)} → ${formatSize(converted.length)}`);
    return { buffer: converted, ext: ".mp4" };
  } catch (e) {
    console.error(`    Warning: ffmpeg conversion failed, skipping ${filePath}`);
    throw e;
  }
}

function convertAudio(filePath: string): { buffer: Buffer; ext: string } {
  const ext = extname(filePath).toLowerCase();

  if (ext === ".mp3") {
    return { buffer: readFileSync(filePath), ext: ".mp3" };
  }

  if (ext === ".m4a") {
    // Convert M4A → MP3
    const outPath = join(TMP_DIR, `${basename(filePath, ext)}.mp3`);
    console.error(`    Converting M4A → MP3...`);

    try {
      execSync(
        `ffmpeg -i "${filePath}" -c:a libmp3lame -b:a 192k -y "${outPath}" 2>/dev/null`,
        { stdio: "pipe", timeout: 60000 }
      );
      const converted = readFileSync(outPath);
      console.error(`    Converted: ${formatSize(readFileSync(filePath).length)} → ${formatSize(converted.length)}`);
      return { buffer: converted, ext: ".mp3" };
    } catch (e) {
      console.error(`    Warning: ffmpeg conversion failed for ${filePath}`);
      throw e;
    }
  }

  // WAV — just pass through
  return { buffer: readFileSync(filePath), ext };
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes}B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)}KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
}

async function uploadDirectory(dir: string) {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) {
    console.error("Error: BLOB_READ_WRITE_TOKEN not set in .env.local");
    process.exit(1);
  }

  const files = getAllFiles(dir);
  const manifest: Record<string, string> = {};
  let totalOriginal = 0;
  let totalUploaded = 0;

  for (const filePath of files) {
    const relativePath = relative(dir, filePath);
    const ext = extname(filePath).toLowerCase();

    if (!ALL_SUPPORTED.has(ext)) {
      if (!filePath.includes(".DS_Store")) {
        console.error(`Skipping unsupported file: ${relativePath}`);
      }
      continue;
    }

    console.error(`\nProcessing ${relativePath}...`);
    const originalSize = statSync(filePath).size;
    totalOriginal += originalSize;

    let buffer: Buffer;
    let finalExt: string;

    try {
      if (IMAGE_EXTENSIONS.has(ext)) {
        ({ buffer, ext: finalExt } = compressImage(filePath));
      } else if (VIDEO_EXTENSIONS.has(ext)) {
        ({ buffer, ext: finalExt } = convertVideo(filePath));
      } else if (AUDIO_EXTENSIONS.has(ext)) {
        ({ buffer, ext: finalExt } = convertAudio(filePath));
      } else {
        buffer = readFileSync(filePath);
        finalExt = ext;
      }
    } catch (e) {
      console.error(`  ✗ Failed to process ${relativePath}, skipping`);
      continue;
    }

    // Build the blob path, replacing extension if converted
    const dirPart = dirname(relativePath);
    const baseName = basename(relativePath, ext);
    const blobPath = join(dirPart, `${baseName}${finalExt}`).replace(/\\/g, "/");

    totalUploaded += buffer.length;

    console.error(`  Uploading as ${blobPath} (${formatSize(buffer.length)})...`);
    const blob = await put(blobPath, buffer, {
      access: "public",
      token,
    });
    manifest[blobPath] = blob.url;
    console.error(`  ✓ ${blob.url}`);
  }

  console.error(`\n${"=".repeat(50)}`);
  console.error(`Total original: ${formatSize(totalOriginal)}`);
  console.error(`Total uploaded:  ${formatSize(totalUploaded)}`);
  console.error(`Savings:         ${((1 - totalUploaded / totalOriginal) * 100).toFixed(1)}%`);
  console.error(`Files uploaded:  ${Object.keys(manifest).length}`);

  // Output manifest as JSON to stdout
  console.log(JSON.stringify(manifest, null, 2));
}

function getAllFiles(dir: string): string[] {
  const results: string[] = [];
  for (const entry of readdirSync(dir)) {
    if (entry === ".DS_Store") continue;
    const fullPath = join(dir, entry);
    if (statSync(fullPath).isDirectory()) {
      results.push(...getAllFiles(fullPath));
    } else {
      results.push(fullPath);
    }
  }
  return results.sort();
}

const targetDir = process.argv[2] || "./media";
uploadDirectory(targetDir);
