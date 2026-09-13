import { useReveal } from '../hooks/useScrollFX';

const ROW_A = Array.from({ length: 6 }, (_, i) => `Client ${i + 1}`);
const ROW_B = Array.from({ length: 6 }, (_, i) => `Client ${i + 7}`);

function MarqueeRow({ items, reverse }: { items: string[]; reverse?: boolean }) {
  const doubled = [...items, ...items];
  return (
    <div className={`marquee${reverse ? ' is-reverse' : ''}`} aria-hidden="true">
      <div className="marquee-track">
        {doubled.map((label, i) => (
          <span className="client-mark" key={`${label}-${i}`}>
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}

export function Clients() {
  const headingRef = useReveal<HTMLHeadingElement>();

  return (
    <section className="section-pad clients" id="clients">
      <div className="container">
        <div className="section-label">
          <span>Our Clients</span>
        </div>
        <h2 className="clients-headline reveal" ref={headingRef}>
          Built for brands that expect more.
        </h2>
        <p className="clients-note">Client roster to be added — placeholder marks shown below.</p>
      </div>

      <MarqueeRow items={ROW_A} />
      <MarqueeRow items={ROW_B} reverse />
    </section>
  );
}
