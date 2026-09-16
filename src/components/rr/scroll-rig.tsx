"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

let instance: Lenis | null = null;

export function getLenis() {
  return instance;
}

export function ScrollRig() {
  useEffect(() => {
    const root = document.documentElement;
    root.dataset.motion = "on";
    root.style.setProperty("--progress", "0");
    root.style.setProperty("--hero-p", "0");
    root.style.setProperty("--mx", "0");
    root.style.setProperty("--my", "0");

    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.08,
      anchors: { offset: -88, duration: 1.05 },
      smoothWheel: true,
      syncTouch: false,
    });
    instance = lenis;

    let mx = 0;
    let my = 0;
    let cx = 0;
    let cy = 0;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      const w = window.innerWidth || 1;
      const h = window.innerHeight || 1;
      mx = (e.clientX / w - 0.5) * 2;
      my = (e.clientY / h - 0.5) * 2;
    };

    const onScroll = (l: Lenis) => {
      const vh = window.innerHeight || 1;
      const heroP = Math.min(1, Math.max(0, l.scroll / (vh * 0.85)));
      root.style.setProperty("--progress", l.progress.toFixed(4));
      root.style.setProperty("--hero-p", heroP.toFixed(4));
    };

    const tick = () => {
      cx += (mx - cx) * 0.1;
      cy += (my - cy) * 0.1;
      root.style.setProperty("--mx", cx.toFixed(4));
      root.style.setProperty("--my", cy.toFixed(4));
      raf = requestAnimationFrame(tick);
    };

    lenis.on("scroll", onScroll);
    onScroll(lenis);
    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      lenis.off("scroll", onScroll);
      lenis.destroy();
      instance = null;
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <div className="scroll-progress" aria-hidden />;
}
