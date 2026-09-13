import { useEffect, useRef, useState } from 'react';
import { isFinePointer } from '../lib/gsap';

/** Sophisticated custom cursor — desktop / fine-pointer only, per the brief. */
export function CustomCursor() {
  const [enabled] = useState(() => isFinePointer());
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!enabled) return;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.left = `${mx}px`;
        dotRef.current.style.top = `${my}px`;
      }
    };

    const loop = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.left = `${rx}px`;
        ringRef.current.style.top = `${ry}px`;
      }
      raf = requestAnimationFrame(loop);
    };

    const onOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest?.('[data-cursor]');
      if (!target) return;
      ringRef.current?.classList.add('is-hovering');
      if (labelRef.current) labelRef.current.textContent = target.getAttribute('data-cursor');
    };

    const onOut = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest?.('[data-cursor]');
      if (!target) return;
      const related = (e.relatedTarget as HTMLElement | null)?.closest?.('[data-cursor]');
      if (related === target) return;
      ringRef.current?.classList.remove('is-hovering');
    };

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div className="cursor-dot" ref={dotRef} />
      <div className="cursor-ring" ref={ringRef}>
        <span className="cursor-label" ref={labelRef} />
      </div>
    </>
  );
}
