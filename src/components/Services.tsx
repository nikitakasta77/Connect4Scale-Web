import { Fragment, useState, type ReactNode } from 'react';
import { useReveal } from '../hooks/useScrollFX';
import { isFinePointer } from '../lib/gsap';
import { PlaceholderVisual } from './PlaceholderVisual';
import type { MarkName } from './icons/Marks';
import { WaveMark, RaysMark, BlobMark } from './icons/Marks';

interface ServiceData {
  num: string;
  name: string;
  desc: string;
  icon: MarkName;
}

const SERVICES: ServiceData[] = [
  { num: '01', name: 'Brand Films', desc: 'Brand stories built to create emotion, recognition and lasting impact.', icon: 'clapper' },
  { num: '02', name: 'Corporate Videos', desc: 'Clear, credible communication for leadership, culture and operations.', icon: 'grid' },
  { num: '03', name: 'Social Media Content', desc: 'Native, scroll-stopping content built for every platform and format.', icon: 'wave' },
  { num: '04', name: 'Product Videos', desc: 'Showcase products with precision, detail and cinematic craft.', icon: 'lens' },
  { num: '05', name: 'Event Coverage', desc: 'Full-scale capture and highlight production for live moments.', icon: 'rays' },
  { num: '06', name: 'Motion Graphics', desc: 'Animated visuals that simplify ideas and elevate every frame.', icon: 'circuit' },
  { num: '07', name: 'Training & Explainer Videos', desc: 'Turn complex processes into content people actually retain.', icon: 'bars' },
  { num: '08', name: 'Digital Marketing Creatives', desc: 'Performance-ready creative built to support campaigns and funnels.', icon: 'blob' },
];

function ServiceRow({ num, name, desc, icon }: ServiceData) {
  const [open, setOpen] = useState(false);

  return (
    <li
      className={`service-item${open ? ' is-open' : ''}`}
      data-cursor="View"
      onMouseEnter={() => isFinePointer() && setOpen(true)}
      onMouseLeave={() => isFinePointer() && setOpen(false)}
      onClick={() => !isFinePointer() && setOpen((o) => !o)}
    >
      <div className="service-item-bg">
        <PlaceholderVisual icon={icon} />
      </div>
      <div className="service-item-inner">
        <span className="service-num">{num}</span>
        <div>
          <div className="service-name">{name}</div>
          <div className="service-desc">{desc}</div>
        </div>
        <span className="service-arrow">→</span>
      </div>
    </li>
  );
}

function Subservice({
  id,
  label,
  title,
  tags,
  visual,
  reverse,
}: {
  id: string;
  label: string;
  title: string[];
  tags: string[];
  visual: ReactNode;
  reverse?: boolean;
}) {
  const headingRef = useReveal<HTMLHeadingElement>();

  return (
    <div className={`container subservice${reverse ? ' is-reverse' : ''}`} id={id}>
      <div>
        <div className="subservice-label">
          <span>{label}</span>
        </div>
        <h3 className="subservice-title reveal" ref={headingRef}>
          {title.map((line, i) => (
            <Fragment key={line}>
              {line}
              {i < title.length - 1 ? <br /> : null}
            </Fragment>
          ))}
        </h3>
        <ul className="tag-list">
          {tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      </div>
      <div className="subservice-visual">{visual}</div>
    </div>
  );
}

export function Services() {
  return (
    <section className="section-pad services" id="services">
      <div className="container">
        <div className="section-label">
          <span>Our Services</span>
        </div>
        <ul className="services-list">
          {SERVICES.map((s) => (
            <ServiceRow key={s.num} {...s} />
          ))}
        </ul>
      </div>
    </section>
  );
}

/** The four Services deep-dive blocks (Video Production, Social Media Content,
 * Motion Graphics, Event Production) — split out from `Services` so another
 * section (Why Us) can be placed between the main list and these. */
export function ServiceDetails() {
  return (
    <section className="service-details">
      <Subservice
        id="video-production"
        label="Video Production"
        title={['Video Production']}
        tags={[
          'Corporate Films',
          'Brand Films',
          'Product Videos',
          'Factory & Manufacturing Films',
          'CEO & Leadership Messages',
          'Recruitment Videos',
          'Training Videos',
          'Customer Testimonials',
          'Case Study Videos',
          'Documentary Style Films',
        ]}
        visual={<PlaceholderVisual icon="film" />}
      />

      <Subservice
        id="social-content"
        label="Social Media Content"
        title={['Content built for the', 'way people watch today.']}
        tags={['Instagram Reels', 'YouTube Videos', 'LinkedIn Content', 'Facebook Videos', 'Short-form Content', 'Monthly Content Packages']}
        reverse
        visual={
          <div className="vertical-frames" aria-hidden="true">
            <div className="vframe is-a"><WaveMark /></div>
            <div className="vframe is-b"><RaysMark /></div>
            <div className="vframe is-c"><BlobMark /></div>
          </div>
        }
      />

      <Subservice
        id="motion-graphics"
        label="Motion Graphics"
        title={['Make complex ideas', 'impossible to ignore.']}
        tags={['Explainer Videos', 'Infographics']}
        visual={<PlaceholderVisual icon="circuit" />}
      />

      <Subservice
        id="event-production"
        label="Event Production"
        title={['Capture the moment.', 'Amplify the impact.']}
        tags={['Corporate Conferences', 'Award Functions', 'Product Launches', 'Trade Shows', 'Seminars', 'Exhibitions']}
        reverse
        visual={<PlaceholderVisual icon="rays" />}
      />
    </section>
  );
}

