import { useCountUp } from '../hooks/useScrollFX';

/**
 * EDITABLE CONFIG — do not invent figures. Replace `value: null` with a real
 * number once Connect4Scale has one to publish; it will animate in on scroll.
 * Until then the stat renders as an em dash.
 */
const STATS_CONFIG: { value: number | null; label: string }[] = [
  { value: null, label: 'Projects Delivered' },
  { value: null, label: 'Brands Supported' },
  { value: null, label: 'Videos Produced' },
  { value: null, label: 'Industries Served' },
];

function Stat({ value, label }: { value: number | null; label: string }) {
  const ref = useCountUp<HTMLSpanElement>(value);
  return (
    <div className="stat">
      <span className="stat-value" ref={ref}>
        —
      </span>
      <span className="stat-label">{label}</span>
    </div>
  );
}

export function Stats() {
  return (
    <section className="section-pad stats" id="stats">
      <div className="container">
        <div className="stats-grid">
          {STATS_CONFIG.map((s) => (
            <Stat key={s.label} {...s} />
          ))}
        </div>
        <p className="stats-note">
          Figures pending — set real values in{' '}
          <span style={{ color: 'var(--c-accent)', fontFamily: 'monospace' }}>STATS_CONFIG</span> (
          src/components/Stats.tsx) to activate the count-up.
        </p>
      </div>
    </section>
  );
}
