import path from "path";
import fs from "fs";

import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { filename } = req.query;

  if (!filename || typeof filename !== "string") {
    return res.status(400).json({ error: "Filename is required" });
  }

  const filePath = path.join(process.cwd(), "public", filename);

  try {
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: "File not found" });
    }

    const stat = fs.statSync(filePath);
    const fileBuffer = fs.readFileSync(filePath);

    // Set appropriate headers
    res.setHeader("Content-Type", getContentType(filename));
    res.setHeader("Content-Length", stat.size);
    res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
    res.setHeader("ETag", `"${stat.mtime.getTime()}"`);

    // Check if file is modified
    const ifNoneMatch = req.headers["if-none-match"];

    if (ifNoneMatch === `"${stat.mtime.getTime()}"`) {
      return res.status(304).end();
    }

    res.status(200).send(fileBuffer);
  } catch {
    res.status(500).json({ error: "Internal server error" });
  }
}

function getContentType(filename: string): string {
  const ext = path.extname(filename).toLowerCase();
  const mimeTypes: Record<string, string> = {
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".gif": "image/gif",
    ".svg": "image/svg+xml",
    ".webp": "image/webp",
    ".avif": "image/avif",
    ".ico": "image/x-icon",
    ".json": "application/json",
    ".txt": "text/plain",
  };

  return mimeTypes[ext] || "application/octet-stream";
}
