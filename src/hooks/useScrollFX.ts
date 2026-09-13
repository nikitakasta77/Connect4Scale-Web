import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger, prefersReducedMotion, isFinePointer } from '../lib/gsap';

/** Simple fade/rise-in-view reveal for a single element (paragraphs, headings, CTAs, etc). */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      el.classList.add('in-view');
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add('in-view');
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -8% 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return ref;
}

/** Reveals direct children matching `selector` one after another as the container enters view. */
export function useSequentialReveal<T extends HTMLElement>(selector: string, staggerMs = 90) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;
    const items = Array.from(container.querySelectorAll<HTMLElement>(selector));
    if (!items.length) return;

    if (prefersReducedMotion()) {
      items.forEach((item) => item.classList.add('in-view'));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            items.forEach((item, i) => {
              setTimeout(() => item.classList.add('in-view'), i * staggerMs);
            });
            io.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );
    io.observe(container);
    return () => io.disconnect();
  }, [selector, staggerMs]);

  return ref;
}

/** Gentle scale-down parallax on an image/visual panel as its wrapper scrolls through view. */
export function useParallaxScale<T extends HTMLElement>() {
  const wrapRef = useRef<T>(null);
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const wrap = wrapRef.current;
    const target = targetRef.current;
    if (!wrap || !target) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        target,
        { scale: 1.1 },
        {
          scale: 1,
          ease: 'none',
          scrollTrigger: { trigger: wrap, start: 'top bottom', end: 'bottom top', scrub: true },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return { wrapRef, targetRef };
}

/** Pins a horizontal track and translates it across the pinned scroll distance. */
export function useHorizontalPin<W extends HTMLElement, TTrack extends HTMLElement>() {
  const wrapRef = useRef<W>(null);
  const trackRef = useRef<TTrack>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const track = trackRef.current;
    if (!wrap || !track) return;
    if (prefersReducedMotion() || window.matchMedia('(max-width: 768px)').matches) return;

    const nav = document.querySelector('.nav') as HTMLElement | null;
    const navHeight = nav?.offsetHeight ?? 80;

    const ctx = gsap.context(() => {
      const getDistance = () => track.scrollWidth - window.innerWidth;
      const st = ScrollTrigger.create({
        trigger: wrap,
        start: `top top+=${navHeight}`,
        end: () => `+=${Math.max(getDistance(), 1)}`,
        pin: true,
        scrub: 0.6,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          gsap.set(track, { x: -self.progress * getDistance() });
        },
      });
      return () => st.kill();
    });
    return () => ctx.revert();
  }, []);

  return { wrapRef, trackRef };
}

/** Cursor-follow "magnetic" pull for buttons, active on fine-pointer devices only. */
export function useMagnetic<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !isFinePointer() || prefersReducedMotion()) return;

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      gsap.to(el, { x: x * 0.25, y: y * 0.4, duration: 0.4, ease: 'power2.out' });
    };
    const onLeave = () => gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1,0.5)' });

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return ref;
}

/** Animates a number from 0 to `target` once its element enters the viewport. Renders "—" if target is null. */
export function useCountUp<T extends HTMLElement>(target: number | null, suffix = '+') {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (target === null) {
      el.textContent = '—';
      return;
    }
    el.textContent = '0' + suffix;

    const animate = () => {
      const obj = { n: 0 };
      if (prefersReducedMotion()) {
        el.textContent = target + suffix;
        return;
      }
      gsap.to(obj, {
        n: target,
        duration: 1.6,
        ease: 'power2.out',
        onUpdate: () => {
          el.textContent = Math.round(obj.n) + suffix;
        },
      });
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate();
            io.disconnect();
          }
        });
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [target, suffix]);

  return ref;
}
