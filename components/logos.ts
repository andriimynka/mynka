import fs from "fs";
import path from "path";

// Reads every image in /public/logos at build time. Drop a file in that
// folder (png, jpg, svg, webp) and it shows up in the marquee automatically —
// no code change needed. Filenames become the alt text.
export function getClientLogos(): { src: string; alt: string }[] {
  const dir = path.join(process.cwd(), "public", "logos");
  let files: string[] = [];
  try {
    files = fs.readdirSync(dir);
  } catch {
    return [];
  }
  return files
    .filter((f) => /\.(png|jpe?g|svg|webp|avif)$/i.test(f))
    .sort()
    .map((f) => ({
      src: `/logos/${f}`,
      alt: f.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " "),
    }));
}
