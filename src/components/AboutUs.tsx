import { useReveal, useSequentialReveal } from '../hooks/useScrollFX';

const PARAGRAPHS = [
  'Connect4Scale was founded with one purpose—to help businesses communicate through powerful visual storytelling.',
  "We understand that today's audience consumes content faster than ever. That's why we produce videos that are engaging, informative, and designed to perform across every digital platform.",
  'From concept development and scripting to filming, editing, animation, and final delivery, we manage every stage of production with creativity and precision.',
  'Our approach combines strategic thinking with cinematic production to create content that builds stronger brands.',
];

const VALUES = ['Creativity', 'Innovation', 'Quality', 'Transparency', 'Partnership', 'Results'];

export function AboutUs() {
  const headingRef = useReveal<HTMLHeadingElement>();
  const bodyRef = useReveal<HTMLDivElement>();
  const visionRef = useReveal<HTMLDivElement>();
  const missionRef = useReveal<HTMLDivElement>();
  const valuesRef = useSequentialReveal<HTMLDivElement>('.value-item', 80);

  return (
    <section className="section-pad about-us" id="about-us">
      <div className="container">
        <div className="section-label">
          <span>About Us</span>
        </div>
        <h2 className="who-headline reveal" ref={headingRef}>
          We Believe Every Brand Has a Story Worth Sharing.
        </h2>
        <div className="who-body reveal" ref={bodyRef}>
          {PARAGRAPHS.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>

        <div className="vm-grid">
          <div className="vm-block reveal" ref={visionRef}>
            <h3>Our Vision</h3>
            <p>To become one of India&rsquo;s most trusted creative partners for digital content and video production.</p>
          </div>
          <div className="vm-block reveal" ref={missionRef}>
            <h3>Our Mission</h3>
            <p>
              To help businesses connect with their audience through meaningful, high-quality visual content that
              inspires action and drives growth.
            </p>
          </div>
        </div>

        <div>
          <h3 className="about-values-heading">Our Values</h3>
          <div className="values-row" ref={valuesRef}>
            {VALUES.map((v) => (
              <span className="value-item" key={v}>
                {v}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
