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
        el.style.transform = `translateY(${-window.scrollY * 0.12}px)`;
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
