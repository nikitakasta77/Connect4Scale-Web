import { useEffect, useState, type MouseEvent } from 'react';
import { useLenis, useScrollToSection } from '../lib/LenisProvider';

const LINKS = [
  { label: 'About Us', id: 'about-us' },
  { label: 'Services', id: 'services' },
  { label: 'Work', id: 'work' },
  { label: 'Contact', id: 'contact' },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const scrollToSection = useScrollToSection();
  const lenis = useLenis();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
  }, [menuOpen]);

  const goTop = (e: MouseEvent) => {
    e.preventDefault();
    setMenuOpen(false);
    if (lenis) lenis.scrollTo(0);
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const go = (id: string) => (e: MouseEvent) => {
    e.preventDefault();
    setMenuOpen(false);
    scrollToSection(id);
  };

  return (
    <>
      <header className={`nav${scrolled ? ' scrolled' : ''}`}>
        <div className="container nav-inner">
          <a href="#top" className="nav-logo" onClick={goTop} data-cursor="View">
            CONNECT4SCALE
          </a>

          <ul className="nav-links">
            {LINKS.map((l) => (
              <li key={l.id}>
                <a href={`#${l.id}`} onClick={go(l.id)} data-cursor="View">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <a href="#contact" className="nav-cta" onClick={go('contact')} data-cursor="View">
            Start a Project
          </a>

          <button
            type="button"
            className={`nav-hamburger${menuOpen ? ' is-open' : ''}`}
            aria-expanded={menuOpen}
            aria-controls="mobileMenu"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      <div className={`nav-mobile-menu${menuOpen ? ' is-open' : ''}`} id="mobileMenu">
        <ul className="nav-mobile-links">
          {LINKS.map((l) => (
            <li key={l.id}>
              <a href={`#${l.id}`} onClick={go(l.id)}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="nav-mobile-footer">
          <span>Connect. Create. Scale.</span>
        </div>
      </div>
    </>
  );
}
