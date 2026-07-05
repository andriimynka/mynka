"use client";

import { useEffect, useRef } from "react";

type Logo = { src: string; alt: string };

const COPIES = 4; // duplicated sets give seamless wrap + manual scroll runway
const SPEED = 32; // px per second

// Auto-scrolls forever by advancing scrollLeft, wrapping seamlessly at one
// set's width. Stays a real scroll container, so users can swipe or wheel
// through it too — auto-scroll pauses while the pointer is over it.
export default function LogoMarquee({ logos }: { logos: Logo[] }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const box = ref.current;
    if (!box) return;
    const track = box.firstElementChild as HTMLElement | null;
    if (!track || logos.length === 0) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let last = performance.now();
    let paused = false;
    let resumeTimer: ReturnType<typeof setTimeout>;

    const setWidth = () => {
      const first = track.children[0] as HTMLElement;
      const anchor = track.children[logos.length] as HTMLElement;
      return first && anchor ? anchor.offsetLeft - first.offsetLeft : 0;
    };

    const step = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.1);
      last = now;
      const w = setWidth();
      if (w > 0 && !paused) {
        box.scrollLeft += SPEED * dt;
        if (box.scrollLeft >= w) {
          box.scrollLeft -= w * Math.floor(box.scrollLeft / w);
        }
      }
      raf = requestAnimationFrame(step);
    };

    const pause = () => {
      paused = true;
    };
    const resume = () => {
      paused = false;
    };
    const resumeSoon = () => {
      clearTimeout(resumeTimer);
      resumeTimer = setTimeout(resume, 1200);
    };

    box.addEventListener("pointerenter", pause);
    box.addEventListener("pointerleave", resume);
    box.addEventListener("touchstart", pause, { passive: true });
    box.addEventListener("touchend", resumeSoon, { passive: true });
    raf = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(resumeTimer);
      box.removeEventListener("pointerenter", pause);
      box.removeEventListener("pointerleave", resume);
      box.removeEventListener("touchstart", pause);
      box.removeEventListener("touchend", resumeSoon);
    };
  }, [logos.length]);

  if (logos.length === 0) return null;

  return (
    <div className="marquee logo-marquee" aria-label="Our clients" ref={ref}>
      <div className="marquee-track logo-track">
        {Array.from({ length: COPIES }).flatMap((_, c) =>
          logos.map((logo, i) => (
            <img
              key={`${c}-${i}`}
              className="client-logo"
              src={logo.src}
              alt={c === 0 ? logo.alt : ""}
              aria-hidden={c > 0}
            />
          ))
        )}
      </div>
    </div>
  );
}
