import { useReveal, useParallaxScale } from '../hooks/useScrollFX';
import { PlaceholderVisual } from './PlaceholderVisual';

export function WhoWeAre() {
  const bodyRef = useReveal<HTMLDivElement>();
  const { wrapRef, targetRef } = useParallaxScale<HTMLDivElement>();

  return (
    <section className="section-pad who-we-are" id="about">
      <div className="container who-grid">
        <div>
          <div className="section-label">
            <span>Who We Are</span>
          </div>
          <div className="who-body reveal" ref={bodyRef}>
            <p>
              Connect4Scale is a creative video production and digital content agency dedicated to helping brands
              communicate with clarity and confidence.
            </p>
            <p>
              We combine creativity, storytelling, and marketing strategy to produce content that not only looks
              exceptional but also supports your business objectives.
            </p>
            <p>
              Whether you&rsquo;re launching a new product, building brand awareness, engaging employees, or reaching
              new customers, we help your message connect with the right audience.
            </p>
          </div>
        </div>

        <div className="who-image-side" ref={wrapRef}>
          <div ref={targetRef} style={{ width: '100%', height: '100%' }}>
            <PlaceholderVisual icon="clapper" />
          </div>
        </div>
      </div>
    </section>
  );
}
