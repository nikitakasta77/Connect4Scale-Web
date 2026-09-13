import { useReveal } from '../hooks/useScrollFX';
import { ApertureMark } from './icons/Marks';

export function CTA() {
  const headingRef = useReveal<HTMLHeadingElement>();
  const bodyRef = useReveal<HTMLParagraphElement>();

  return (
    <section className="cta" id="cta">
      <div className="cta-bg-mark" aria-hidden="true">
        <ApertureMark />
      </div>
      <div className="container cta-inner">
        <h2 className="cta-headline reveal" ref={headingRef}>
          Ready to grow
          <br />
          your brand with
          <br />
          powerful visual
          <br />
          content?
        </h2>
        <p className="cta-body reveal" ref={bodyRef}>
          Let&rsquo;s create content that connects and helps your business scale.
        </p>
      </div>
    </section>
  );
}
