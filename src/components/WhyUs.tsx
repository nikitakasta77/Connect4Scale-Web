import { useSequentialReveal } from '../hooks/useScrollFX';

const ITEMS = [
  { num: '01', title: 'Creative Strategy First' },
  { num: '02', title: 'End-to-End Video Production' },
  { num: '03', title: 'Platform-Optimized Content' },
  { num: '04', title: 'Fast Turnaround' },
  { num: '05', title: 'Experienced Creative Team' },
  { num: '06', title: 'Corporate & Commercial Expertise' },
];

export function WhyUs() {
  const listRef = useSequentialReveal<HTMLUListElement>('.why-check-item', 90);

  return (
    <section className="section-pad why-us" id="why">
      <div className="container">
        <div className="section-label">
          <span>Why Choose Connect4Scale?</span>
        </div>

        <ul className="why-checklist" ref={listRef}>
          {ITEMS.map((item) => (
            <li className="why-check-item" key={item.num}>
              <span className="why-check-mark" aria-hidden="true">
                ✓
              </span>
              <span className="why-check-title">{item.title}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
