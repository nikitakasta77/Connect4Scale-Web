import { useReveal, useSequentialReveal } from '../hooks/useScrollFX';

const VALUES = ['Creativity', 'Innovation', 'Quality', 'Transparency', 'Partnership', 'Results'];

export function Vision() {
  const headingRef = useReveal<HTMLHeadingElement>();
  const visionRef = useReveal<HTMLDivElement>();
  const missionRef = useReveal<HTMLDivElement>();
  const valuesRef = useSequentialReveal<HTMLDivElement>('.value-item', 80);

  return (
    <section className="section-pad vision" id="vision">
      <div className="container">
        <div className="section-label">
          <span>Vision &amp; Values</span>
        </div>
        <h2 className="vision-headline reveal" ref={headingRef}>
          Building the future of
          <br />
          visual communication.
        </h2>

        <div className="vm-grid">
          <div className="vm-block reveal" ref={visionRef}>
            <h3>Vision</h3>
            <p>To become one of India&rsquo;s most trusted creative partners for digital content and video production.</p>
          </div>
          <div className="vm-block reveal" ref={missionRef}>
            <h3>Mission</h3>
            <p>
              To help businesses connect with their audience through meaningful, high-quality visual content that
              inspires action and drives growth.
            </p>
          </div>
        </div>

        <div className="values-row" ref={valuesRef}>
          {VALUES.map((v) => (
            <span className="value-item" key={v}>
              {v}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
