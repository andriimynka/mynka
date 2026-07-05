"use client";

import { useEffect, useRef } from "react";

type RGB = [number, number, number];
type Palette = { g1: RGB; g2: RGB; g3: RGB; base: RGB };

// One palette per page section, in document order. As the viewport center
// travels between sections the background lerps between adjacent palettes.
const PALETTES: Palette[] = [
  // hero — hot pink / violet
  { g1: [255, 45, 125], g2: [124, 58, 237], g3: [212, 20, 90], base: [12, 4, 16] },
  // services — pink / molten orange
  { g1: [255, 107, 53], g2: [255, 45, 125], g3: [138, 43, 226], base: [16, 5, 10] },
  // work — electric violet / cyan
  { g1: [139, 92, 246], g2: [34, 211, 238], g3: [255, 45, 125], base: [7, 6, 20] },
  // process — deep blue / pink
  { g1: [56, 189, 248], g2: [255, 45, 125], g3: [99, 60, 220], base: [4, 8, 20] },
  // contact — full hot pink send-off
  { g1: [255, 20, 147], g2: [255, 94, 58], g3: [120, 30, 220], base: [18, 3, 12] },
];

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const lerpRGB = (a: RGB, b: RGB, t: number): RGB => [
  Math.round(lerp(a[0], b[0], t)),
  Math.round(lerp(a[1], b[1], t)),
  Math.round(lerp(a[2], b[2], t)),
];
const css = (c: RGB) => `${c[0]}, ${c[1]}, ${c[2]}`;

export default function GradientBackground() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    let current = 0; // smoothed palette position
    let mouseX = 0.5;
    let mouseY = 0.35;

    const target = () => {
      const sections = Array.from(
        document.querySelectorAll<HTMLElement>("[data-palette]")
      );
      if (sections.length === 0) return 0;
      const center = window.scrollY + window.innerHeight / 2;
      // Find the pair of section midpoints the viewport center sits between.
      const mids = sections.map((s) => s.offsetTop + s.offsetHeight / 2);
      if (center <= mids[0]) return 0;
      if (center >= mids[mids.length - 1]) return mids.length - 1;
      for (let i = 0; i < mids.length - 1; i++) {
        if (center >= mids[i] && center <= mids[i + 1]) {
          return i + (center - mids[i]) / (mids[i + 1] - mids[i]);
        }
      }
      return 0;
    };

    const frame = () => {
      const t = target();
      // ease toward the target so fast scrolling still feels fluid
      current += (t - current) * 0.07;

      const i = Math.min(Math.floor(current), PALETTES.length - 2);
      const f = Math.min(Math.max(current - i, 0), 1);
      const a = PALETTES[i];
      const b = PALETTES[i + 1] ?? a;

      el.style.setProperty("--g1", css(lerpRGB(a.g1, b.g1, f)));
      el.style.setProperty("--g2", css(lerpRGB(a.g2, b.g2, f)));
      el.style.setProperty("--g3", css(lerpRGB(a.g3, b.g3, f)));
      el.style.setProperty("--base", css(lerpRGB(a.base, b.base, f)));
      el.style.setProperty("--mx", `${mouseX * 100}%`);
      el.style.setProperty("--my", `${mouseY * 100}%`);

      raf = requestAnimationFrame(frame);
    };

    const onMouse = (e: MouseEvent) => {
      mouseX = e.clientX / window.innerWidth;
      mouseY = e.clientY / window.innerHeight;
    };

    window.addEventListener("mousemove", onMouse, { passive: true });
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouse);
    };
  }, []);

  return (
    <div ref={ref} className="gradient-bg" aria-hidden="true">
      <div className="gradient-layer blob-1" />
      <div className="gradient-layer blob-2" />
      <div className="gradient-layer blob-3" />
      <div className="gradient-layer mouse-glow" />
      <div className="grain" />
    </div>
  );
}
