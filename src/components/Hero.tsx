import { useEffect, useRef, type MouseEvent } from 'react';
import { prefersReducedMotion } from '../lib/gsap';
import { useMagnetic } from '../hooks/useScrollFX';
import { useScrollToSection } from '../lib/LenisProvider';

const WORDS = ['Connect.', 'Create.', 'Scale.'];

export function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const magnetic1 = useMagnetic<HTMLAnchorElement>();
  const magnetic2 = useMagnetic<HTMLAnchorElement>();
  const scrollToSection = useScrollToSection();

  useEffect(() => {
    const heading = titleRef.current;
    const cta = ctaRef.current;
    if (!heading) return;

    const reveal = () => {
      heading.classList.add('is-revealed');
      if (cta) {
        cta.style.opacity = '1';
        cta.style.transform = 'translateY(0)';
      }
    };

    if (prefersReducedMotion()) {
      reveal();
      return;
    }

    // Timed (plain setTimeout, not the GSAP ticker) to pick up right as the
    // loading screen dissolves — a CSS transition then carries the reveal.
    const timer = window.setTimeout(reveal, 1900);
    return () => window.clearTimeout(timer);
  }, []);

  const go = (id: string) => (e: MouseEvent) => {
    e.preventDefault();
    scrollToSection(id);
  };

  return (
    <section className="hero" id="hero">
      {/* Hero's own background is intentionally empty — the site-wide fixed
          <SiteBackgroundVideo> shows through here too. This overlay just
          darkens it further for text legibility. */}
      <div className="hero-bg" aria-hidden="true">
        <div className="hero-bg-overlay" />
      </div>

      <div className="hero-content">

        <h1 className="hero-headline" ref={titleRef}>
          {WORDS.map((word) => (
            <span className="line-mask" key={word}>
              <span className="line-inner">{word}</span>
            </span>
          ))}
        </h1>

        <p className="hero-sub">Strategic Video Production &amp; Digital Content That Drives Business Growth</p>
        <p className="hero-body">
          At Connect4Scale, we transform ideas into compelling visual stories that capture attention, build trust, and accelerate business growth. From corporate films and brand videos to social media content and digital campaigns, we create content that delivers measurable impact.
        </p>

        <div className="hero-ctas" ref={ctaRef} style={{ opacity: 0, transform: 'translateY(16px)' }}>
          <a href="#contact" className="btn-primary" ref={magnetic1} data-cursor="Play" onClick={go('contact')}>
            <span>Let&rsquo;s Create Together</span>
            <span>→</span>
          </a>
          <a href="#work" className="btn-ghost" ref={magnetic2} data-cursor="View" onClick={go('work')}>
            <span>View Our Work</span>
            <span>→</span>
          </a>
        </div>
      </div>

      <div className="hero-scroll">
        <span className="hero-scroll-text">Scroll to Explore</span>
        <div className="hero-scroll-line" />
      </div>
    </section>
  );
}
