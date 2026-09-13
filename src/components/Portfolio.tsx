import { useRef } from 'react';
import { useReveal } from '../hooks/useScrollFX';
import { PlaceholderVisual } from './PlaceholderVisual';
import type { MarkName } from './icons/Marks';

interface Project {
  index: string;
  title: string;
  industry: string;
  type: string;
  desc: string;
  icon: MarkName;
}

const PROJECTS: Project[] = [
  {
    index: '01',
    title: 'Corporate Brand Film',
    industry: 'Manufacturing',
    type: 'Brand Film',
    desc: 'A brand film built to communicate scale, precision and craftsmanship on the factory floor.',
    icon: 'grid',
  },
  {
    index: '02',
    title: 'Product Launch Film',
    industry: 'Technology',
    type: 'Product Video',
    desc: 'Launch content designed to build anticipation and clearly frame product value.',
    icon: 'circuit',
  },
  {
    index: '03',
    title: 'Leadership Film',
    industry: 'Financial Services',
    type: 'Corporate Video',
    desc: 'A leadership message crafted to build trust with stakeholders and clients alike.',
    icon: 'bars',
  },
  {
    index: '04',
    title: 'Social Media Campaign',
    industry: 'Consumer Brand',
    type: 'Social Content Series',
    desc: 'A short-form content series built for reach, retention and platform-native engagement.',
    icon: 'blob',
  },
  {
    index: '05',
    title: 'Event Highlights',
    industry: 'Corporate Event',
    type: 'Event Coverage',
    desc: 'A highlight film that distills a full-scale live event into its most powerful moments.',
    icon: 'rays',
  },
];

export function Portfolio() {
  const headingRef = useReveal<HTMLHeadingElement>();
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>('.portfolio-card');
    const distance = (card?.offsetWidth ?? 400) + 32;
    track.scrollBy({ left: dir * distance, behavior: 'smooth' });
  };

  return (
    <section className="section-pad portfolio" id="work">
      <div className="container">
        <div className="section-label">
          <span>Selected Work</span>
        </div>
        <h2 className="portfolio-headline reveal" ref={headingRef}>
          Ideas, brought to life.
        </h2>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.85rem',
            color: 'var(--c-muted)',
            marginTop: '-2.25rem',
            marginBottom: '2.5rem',
            maxWidth: 460,
          }}
        >
          Placeholder projects shown below — structured and ready to be replaced with real Connect4Scale case
          studies.
        </p>
      </div>

      <div className="container">
        <div className="portfolio-track" ref={trackRef}>
          {PROJECTS.map((p) => (
            <article className="portfolio-card" key={p.index} data-cursor="View">
              <div className="portfolio-card-img">
                <PlaceholderVisual icon={p.icon} />
              </div>
              <div className="portfolio-card-overlay">
                <span className="portfolio-card-industry">{p.industry}</span>
                <h3 className="portfolio-card-title">{p.title}</h3>
                <p className="portfolio-card-type">{p.type}</p>
                <p className="portfolio-card-desc">{p.desc}</p>
                <a href="#contact" className="portfolio-card-link" data-cursor="View">
                  View Project <span>→</span>
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="portfolio-nav">
          <button type="button" onClick={() => scroll(-1)} aria-label="Previous project" data-cursor="View">
            ‹
          </button>
          <button type="button" onClick={() => scroll(1)} aria-label="Next project" data-cursor="View">
            ›
          </button>
        </div>
      </div>
    </section>
  );
}
