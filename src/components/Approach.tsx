import { useReveal, useHorizontalPin } from '../hooks/useScrollFX';

const STEPS = [
  { num: '01', title: 'Discover', desc: 'Understand the business, audience and objective.' },
  { num: '02', title: 'Strategize', desc: 'Develop the creative direction and content strategy.' },
  { num: '03', title: 'Create', desc: 'Script, shoot, design, animate and produce.' },
  { num: '04', title: 'Refine', desc: 'Edit, review and optimize.' },
  { num: '05', title: 'Deliver', desc: 'Deliver platform-ready content.' },
  { num: '06', title: 'Scale', desc: 'Repurpose content and extend its impact across channels.' },
];

export function Approach() {
  const headingRef = useReveal<HTMLHeadingElement>();
  const { wrapRef, trackRef } = useHorizontalPin<HTMLDivElement, HTMLDivElement>();

  return (
    <section className="section-pad approach" id="approach">
      <div className="container">
        <div className="section-label">
          <span>Our Approach</span>
        </div>
        <h2 className="approach-headline reveal" ref={headingRef}>
          From idea to impact.
        </h2>
      </div>

      <div className="approach-wrap" ref={wrapRef}>
        <div className="approach-track" ref={trackRef}>
          {STEPS.map((s) => (
            <div className="approach-step" key={s.num}>
              <span className="approach-step-num">{s.num}</span>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
