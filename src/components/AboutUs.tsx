import { useReveal } from '../hooks/useScrollFX';

const PARAGRAPHS = [
  'Connect4Scale was founded with one purpose—to help businesses communicate through powerful visual storytelling.',
  "We understand that today's audience consumes content faster than ever. That's why we produce videos that are engaging, informative, and designed to perform across every digital platform.",
  'From concept development and scripting to filming, editing, animation, and final delivery, we manage every stage of production with creativity and precision.',
  'Our approach combines strategic thinking with cinematic production to create content that builds stronger brands.',
];

export function AboutUs() {
  const headingRef = useReveal<HTMLHeadingElement>();
  const bodyRef = useReveal<HTMLDivElement>();

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
      </div>
    </section>
  );
}
