import { NextResponse } from "next/server";
import { list } from "@vercel/blob";

// Always run fresh so a newly-uploaded resume shows up without a redeploy.
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const PREFIX = "resume/";
const FILENAME = "Niteesh_Panchal_Resume.pdf";

async function getLatestResume() {
  // Reads BLOB_READ_WRITE_TOKEN from the environment automatically.
  const { blobs } = await list({ prefix: PREFIX });
  if (!blobs.length) return null;
  return blobs.reduce((latest, b) =>
    new Date(b.uploadedAt) > new Date(latest.uploadedAt) ? b : latest,
  );
}

export async function GET(req) {
  try {
    const blob = await getLatestResume();
    if (!blob) {
      return NextResponse.json(
        { error: "Resume has not been uploaded yet." },
        { status: 404 },
      );
    }

    const wantsDownload = new URL(req.url).searchParams.has("download");

    if (wantsDownload) {
      // Proxy the file so we can force a download and avoid any stale CDN copy.
      const upstream = await fetch(blob.url, { cache: "no-store" });
      const buffer = await upstream.arrayBuffer();
      return new NextResponse(buffer, {
        status: 200,
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": `attachment; filename="${FILENAME}"`,
          "Cache-Control": "no-store",
        },
      });
    }

    // Inline preview: redirect to the blob URL, cache-busted by upload time.
    const version = Date.parse(blob.uploadedAt) || Date.now();
    const target = `${blob.url}${blob.url.includes("?") ? "&" : "?"}v=${version}`;
    return NextResponse.redirect(target, {
      status: 302,
      headers: { "Cache-Control": "no-store" },
    });
  } catch (err) {
    return NextResponse.json(
      { error: err?.message || "Failed to load resume." },
      { status: 500 },
    );
  }
}
