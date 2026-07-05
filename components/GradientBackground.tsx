"use client";

import { useEffect, useRef } from "react";

type RGB = [number, number, number];
type Palette = { g1: RGB; g2: RGB; g3: RGB; base: RGB };

// One palette per page section, in document order. As the viewport center
// travels between sections the background lerps between adjacent palettes.
// Light theme: bases are near-white pastels, hue colors tint the faint layers.
const PALETTES: Palette[] = [
  // hero — hot pink / violet
  { g1: [255, 45, 125], g2: [124, 58, 237], g3: [212, 20, 90], base: [250, 243, 248] },
  // services — pink / molten orange
  { g1: [255, 107, 53], g2: [255, 45, 125], g3: [138, 43, 226], base: [252, 246, 242] },
  // work — electric violet / cyan
  { g1: [139, 92, 246], g2: [34, 211, 238], g3: [255, 45, 125], base: [246, 244, 252] },
  // testimonials — cyan / pink
  { g1: [34, 211, 238], g2: [255, 45, 125], g3: [139, 92, 246], base: [242, 250, 252] },
  // process — deep blue / pink
  { g1: [56, 189, 248], g2: [255, 45, 125], g3: [99, 60, 220], base: [244, 247, 252] },
  // how we work — deep crimson / pink
  { g1: [255, 45, 125], g2: [220, 38, 80], g3: [124, 58, 237], base: [252, 243, 246] },
  // contact — full hot pink send-off
  { g1: [255, 20, 147], g2: [255, 94, 58], g3: [120, 30, 220], base: [253, 242, 249] },
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
    // glow position trails the cursor, easing toward it each frame
    let glowX = mouseX;
    let glowY = mouseY;

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

    let last = performance.now();

    const frame = (now: number) => {
      // time-based easing so the lag feels the same at any refresh rate
      const dt = Math.min((now - last) / 1000, 0.1);
      last = now;
      const kScroll = 1 - Math.exp(-dt / 0.25);
      const kGlow = 1 - Math.exp(-dt / 0.4);

      const t = target();
      // ease toward the target so fast scrolling still feels fluid
      current += (t - current) * kScroll;

      const i = Math.min(Math.floor(current), PALETTES.length - 2);
      const f = Math.min(Math.max(current - i, 0), 1);
      const a = PALETTES[i];
      const b = PALETTES[i + 1] ?? a;

      el.style.setProperty("--g1", css(lerpRGB(a.g1, b.g1, f)));
      el.style.setProperty("--g2", css(lerpRGB(a.g2, b.g2, f)));
      el.style.setProperty("--g3", css(lerpRGB(a.g3, b.g3, f)));
      el.style.setProperty("--base", css(lerpRGB(a.base, b.base, f)));
      glowX += (mouseX - glowX) * kGlow;
      glowY += (mouseY - glowY) * kGlow;
      el.style.setProperty("--mx", `${glowX * 100}%`);
      el.style.setProperty("--my", `${glowY * 100}%`);

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
      <div className="gradient-layer flow" />
      <div className="gradient-layer corner-a" />
      <div className="gradient-layer corner-b" />
      <div className="gradient-layer mouse-glow" />
      <div className="grain" />
    </div>
  );
}
