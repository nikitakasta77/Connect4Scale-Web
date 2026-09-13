import type { MouseEvent } from 'react';
import { useScrollToSection } from '../lib/LenisProvider';

const NAV = [
  { label: 'About', id: 'about' },
  { label: 'Services', id: 'services' },
  { label: 'Work', id: 'work' },
  { label: 'Industries', id: 'industries' },
  { label: 'Contact', id: 'contact' },
];

const SERVICES = [
  { label: 'Video Production', id: 'video-production' },
  { label: 'Social Media Content', id: 'social-content' },
  { label: 'Motion Graphics', id: 'motion-graphics' },
  { label: 'Event Production', id: 'event-production' },
];

export function Footer() {
  const scrollToSection = useScrollToSection();

  const go = (id: string) => (e: MouseEvent) => {
    e.preventDefault();
    scrollToSection(id);
  };

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-logo">CONNECT4SCALE</div>
          <p className="footer-tagline">Connect. Create. Scale.</p>
        </div>

        <div className="footer-grid">
          <div>
            <h4>Navigate</h4>
            {NAV.map((n) => (
              <a href={`#${n.id}`} key={n.id} onClick={go(n.id)}>
                {n.label}
              </a>
            ))}
          </div>
          <div>
            <h4>Services</h4>
            {SERVICES.map((s) => (
              <a href={`#${s.id}`} key={s.id} onClick={go(s.id)}>
                {s.label}
              </a>
            ))}
          </div>
          <div>
            <h4>Legal</h4>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Use</a>
            <a href="#">Cookie Policy</a>
          </div>
          <div>
            <h4>Social</h4>
            <a href="#" target="_blank" rel="noreferrer">LinkedIn</a>
            <a href="#" target="_blank" rel="noreferrer">Instagram</a>
            <a href="#" target="_blank" rel="noreferrer">YouTube</a>
            <a href="#" target="_blank" rel="noreferrer">Facebook</a>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 Connect4Scale. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
