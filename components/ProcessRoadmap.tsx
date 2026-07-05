"use client";

import { useEffect, useRef } from "react";

// Draws a dotted path connecting the process step numbers, with the dots
// flowing along it. Re-measures whenever the layout shifts.
export default function ProcessRoadmap() {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = ref.current;
    const wrap = svg?.parentElement;
    if (!svg || !wrap) return;

    const draw = () => {
      const wr = wrap.getBoundingClientRect();
      const indices = Array.from(
        wrap.querySelectorAll<HTMLElement>(".process-index")
      );
      if (indices.length < 2 || wr.width === 0) return;

      const pts = indices.map((el) => {
        const r = el.getBoundingClientRect();
        return {
          x: r.left - wr.left + r.width / 2,
          y: r.top - wr.top + r.height / 2,
        };
      });

      let d = `M ${pts[0].x} ${pts[0].y}`;
      for (let i = 1; i < pts.length; i++) {
        const a = pts[i - 1];
        const b = pts[i];
        const midY = (a.y + b.y) / 2;
        d += ` C ${a.x} ${midY}, ${b.x} ${midY}, ${b.x} ${b.y}`;
      }

      svg.setAttribute("viewBox", `0 0 ${wr.width} ${wr.height}`);
      svg.querySelector("path")?.setAttribute("d", d);
    };

    draw();
    const ro = new ResizeObserver(draw);
    ro.observe(wrap);
    // reveal animations translate the items; redraw once they settle
    wrap.addEventListener("transitionend", draw);
    window.addEventListener("resize", draw);
    return () => {
      ro.disconnect();
      wrap.removeEventListener("transitionend", draw);
      window.removeEventListener("resize", draw);
    };
  }, []);

  return (
    <svg ref={ref} className="process-road" aria-hidden="true">
      <path fill="none" />
    </svg>
  );
}
