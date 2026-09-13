import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger, prefersReducedMotion } from './gsap';

const LenisContext = createContext<Lenis | null>(null);

/** Smooth-scroll provider (Lenis) wired into the GSAP ticker + ScrollTrigger. */
export function LenisProvider({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const instance = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    setLenis(instance);

    instance.on('scroll', ScrollTrigger.update);
    const onTick = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(onTick);
      instance.destroy();
      setLenis(null);
    };
  }, []);

  // Every scroll-triggered reveal on the site computes its fire position
  // (e.g. "when this heading's top hits 85% of the viewport") once, at
  // mount time. If that happens before the custom web fonts finish loading
  // (Syne/Inter swap in and can reflow text height), the measurement is
  // wrong and the reveal can end up permanently un-triggered — the content
  // is there, just stuck invisible. Refreshing after fonts + full page load
  // recomputes every trigger against the real, settled layout.
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();

    if ('fonts' in document) {
      document.fonts.ready.then(refresh).catch(() => {});
    }
    window.addEventListener('load', refresh);
    const settleTimer = window.setTimeout(refresh, 500);

    return () => {
      window.removeEventListener('load', refresh);
      window.clearTimeout(settleTimer);
    };
  }, []);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}

export function useLenis() {
  return useContext(LenisContext);
}

/** Scrolls smoothly to a section id, offsetting for the fixed nav height. */
export function useScrollToSection() {
  const lenis = useLenis();
  return (id: string) => {
    const target = document.getElementById(id);
    if (!target) return;
    if (lenis) {
      lenis.scrollTo(target, { offset: -88 });
    } else {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };
}
