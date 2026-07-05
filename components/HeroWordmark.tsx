"use client";

import { useEffect, useRef } from "react";
import Reveal from "./Reveal";

// Fills the first viewport with the wordmark and pins it (sticky) so the
// header video scrolls up and over it. The wordmark itself drifts up
// slightly as you scroll for a soft parallax.
export default function HeroWordmark() {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        el.style.transform = `translateY(${-y * 0.12}px)`;
        // fade out as the video approaches, fully gone by ~70% viewport
        el.style.opacity = String(
          Math.max(0, 1 - y / (window.innerHeight * 0.7))
        );
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div className="hero-logo-band">
      <Reveal>
        <h1 className="hero-wordmark" ref={ref}>
          MYNKA<span className="hero-wordmark-dot">.</span>
        </h1>
      </Reveal>
    </div>
  );
}
