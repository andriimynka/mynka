# Client logos

Drop logo files in this folder and they show up in the scrolling row on the
site automatically. No code changes needed.

- Formats: `.svg`, `.png`, `.jpg`, `.webp`, `.avif`
- SVG or transparent PNG look best.
- The file name becomes the alt text (e.g. `acme-corp.png` → "acme corp").
- They show in alphabetical order by file name. Prefix with `01-`, `02-`, etc.
  to control the order.
- Logos are shown in grayscale and turn full color on hover.

Delete the two `sample-*.svg` files once you add your real logos.

After adding files: commit and push, and Vercel rebuilds with the new logos.
