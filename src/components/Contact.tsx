import { useState, type FormEvent } from 'react';
import { useReveal } from '../hooks/useScrollFX';

const SERVICES = [
  'Corporate Film',
  'Brand Film',
  'Product Video',
  'Social Media Content',
  'Event Coverage',
  'Motion Graphics',
  'Training / Explainer Video',
  'Digital Marketing Creatives',
  'Other',
];

const BUDGETS = ['Under ₹1,00,000', '₹1,00,000 – ₹5,00,000', '₹5,00,000 – ₹15,00,000', '₹15,00,000+', 'Not sure yet'];
const TIMELINES = ['Immediate', 'Within 1 month', '1–3 months', 'Flexible'];

export function Contact() {
  const headingRef = useReveal<HTMLHeadingElement>();
  const introRef = useReveal<HTMLParagraphElement>();
  const formRef = useReveal<HTMLFormElement>();
  const [note, setNote] = useState('');

  // Front-end only for now — wire to a real endpoint (API route, Formspree,
  // etc.) before launch. Nothing is transmitted yet.
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      setNote('Please fill in the required fields.');
      return;
    }
    setNote('Thanks — your message is ready to send once this form is connected to a live endpoint.');
    form.reset();
  };

  return (
    <section className="section-pad contact" id="contact">
      <div className="container contact-grid">
        <div>
          <div className="section-label">
            <span>Contact</span>
          </div>
          <h2 className="contact-headline reveal" ref={headingRef}>
            Let&rsquo;s build something
            <br />
            amazing together.
          </h2>
          <p className="contact-intro-body reveal" ref={introRef}>
            Whether you need a corporate film, social media campaign, product video, or complete digital content
            strategy, Connect4Scale is ready to help.
          </p>

          <dl className="contact-info">
            <div>
              <dt>Phone</dt>
              <dd>[ Add phone number ]</dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd>[ Add email address ]</dd>
            </div>
            <div>
              <dt>Location</dt>
              <dd>[ Add studio location ]</dd>
            </div>
            <div>
              <dt>Business Hours</dt>
              <dd>[ Add business hours ]</dd>
            </div>
          </dl>
        </div>

        <form className="contact-form reveal" ref={formRef} onSubmit={onSubmit} noValidate>
          <div className="form-row">
            <label htmlFor="cf-name">Name</label>
            <input type="text" id="cf-name" name="name" required autoComplete="name" />
          </div>

          <div className="form-row is-half">
            <div>
              <label htmlFor="cf-company">Company</label>
              <input type="text" id="cf-company" name="company" autoComplete="organization" />
            </div>
            <div>
              <label htmlFor="cf-email">Email</label>
              <input type="email" id="cf-email" name="email" required autoComplete="email" />
            </div>
          </div>

          <div className="form-row is-half">
            <div>
              <label htmlFor="cf-phone">Phone</label>
              <input type="tel" id="cf-phone" name="phone" autoComplete="tel" />
            </div>
            <div>
              <label htmlFor="cf-service">Service Required</label>
              <select id="cf-service" name="service" defaultValue="">
                <option value="" disabled>
                  Select a service
                </option>
                {SERVICES.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-row">
            <label htmlFor="cf-project">Project / Requirement</label>
            <input type="text" id="cf-project" name="project" />
          </div>

          <div className="form-row is-half">
            <div>
              <label htmlFor="cf-budget">Budget Range</label>
              <select id="cf-budget" name="budget" defaultValue="">
                <option value="" disabled>
                  Select a range
                </option>
                {BUDGETS.map((b) => (
                  <option key={b}>{b}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="cf-timeline">Timeline</label>
              <select id="cf-timeline" name="timeline" defaultValue="">
                <option value="" disabled>
                  Select a timeline
                </option>
                {TIMELINES.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-row">
            <label htmlFor="cf-message">Message</label>
            <textarea id="cf-message" name="message" rows={4} />
          </div>

          <button type="submit" className="btn-primary contact-submit">
            <span>Let&rsquo;s Connect. Create. Scale.</span>
            <span>→</span>
          </button>
          <p className="form-note" aria-live="polite">
            {note}
          </p>
        </form>
      </div>
    </section>
  );
}
