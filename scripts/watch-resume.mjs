/**
 * Watches your local resume file and uploads it to Vercel Blob whenever it
 * changes. The website reads from Blob at request time, so a new version goes
 * live in a couple of seconds — no git commit and no redeploy.
 *
 *   npm run resume:watch   # keep running; auto-uploads on every save
 *   npm run resume:push    # upload once and exit
 *
 * Configure the file location with RESUME_FILE_PATH in .env.local, e.g.
 *   RESUME_FILE_PATH=/Users/nits/Documents/Resumes/Niteesh_Panchal_Resume.pdf
 */
import chokidar from "chokidar";
import { put } from "@vercel/blob";
import dotenv from "dotenv";
import fs from "node:fs/promises";
import path from "node:path";

dotenv.config({ path: path.join(process.cwd(), ".env.local") });

const RESUME_PATH =
  process.env.RESUME_FILE_PATH ||
  process.env.RESUME_FILE ||
  path.join(process.env.HOME || "", "Desktop", "Niteesh_Panchal_Resume.pdf");

// Fixed pathname → stable, overwritten in place on every upload.
const BLOB_PATHNAME = "resume/Niteesh_Panchal_Resume.pdf";
const RUN_ONCE = process.argv.includes("--once");

if (!process.env.BLOB_READ_WRITE_TOKEN) {
  console.error(
    "✗ Missing BLOB_READ_WRITE_TOKEN. Add it to .env.local (from your Vercel Blob store).",
  );
  process.exit(1);
}

let uploading = false;

async function upload() {
  if (uploading) return;
  uploading = true;
  try {
    const data = await fs.readFile(RESUME_PATH);
    const { url } = await put(BLOB_PATHNAME, data, {
      access: "public",
      contentType: "application/pdf",
      addRandomSuffix: false,
      allowOverwrite: true,
    });
    const time = new Date().toLocaleTimeString();
    console.log(`✓ [${time}] Uploaded resume → ${url}`);
  } catch (err) {
    console.error("✗ Upload failed:", err?.message || err);
  } finally {
    uploading = false;
  }
}

if (RUN_ONCE) {
  await upload();
  process.exit(0);
}

console.log(`Watching for changes:\n  ${RESUME_PATH}\n(Press Ctrl+C to stop)\n`);

chokidar
  .watch(RESUME_PATH, {
    ignoreInitial: false, // push the current version on startup
    awaitWriteFinish: { stabilityThreshold: 800, pollInterval: 100 },
  })
  .on("add", upload)
  .on("change", upload)
  .on("error", (err) => console.error("✗ Watcher error:", err?.message || err));
