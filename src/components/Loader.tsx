import { useEffect, useRef, useState } from 'react';
import { gsap, prefersReducedMotion } from '../lib/gsap';

const TAGLINE = ['Connect.', 'Create.', 'Scale.'];

export function Loader() {
  const [visible, setVisible] = useState(true);
  const rootRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const wordSpanRefs = useRef<Array<HTMLSpanElement | null>>([]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const finish = () => {
      document.body.style.overflow = '';
      setVisible(false);
    };

    if (prefersReducedMotion()) {
      finish();
      return;
    }

    const spans = wordSpanRefs.current.filter(Boolean) as HTMLSpanElement[];

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, onComplete: finish });
      tl.fromTo(barRef.current, { scaleX: 0 }, { scaleX: 1, duration: 1.1, ease: 'power2.inOut' }, 0)
        .to(wordRef.current, { opacity: 1, duration: 0.4 }, 0)
        .to(spans, { opacity: 1, y: 0, duration: 0.5, stagger: 0.12 }, 0.25)
        .to(wordRef.current, { opacity: 0, duration: 0.3 }, 1.35)
        .to(spans, { opacity: 0, y: -12, duration: 0.35, stagger: 0.05 }, 1.4)
        .to(rootRef.current, { opacity: 0, duration: 0.5 }, 1.7);
    });

    return () => ctx.revert();
  }, []);

  if (!visible) return null;

  return (
    <div className="loading-screen" ref={rootRef} aria-hidden="true">
      <div className="loading-wordmark" ref={wordRef} style={{ opacity: 0 }}>
        CONNECT4SCALE
      </div>
      <div className="loading-tagline" style={{ opacity: 1, display: 'flex', gap: '0.6em' }}>
        {TAGLINE.map((word, i) => (
          <span
            key={word}
            ref={(el) => {
              wordSpanRefs.current[i] = el;
            }}
            style={{ opacity: 0, transform: 'translateY(12px)', display: 'inline-block' }}
          >
            {word}
          </span>
        ))}
      </div>
      <div className="loading-bar-track">
        <div className="loading-bar-fill" ref={barRef} />
      </div>
    </div>
  );
}
