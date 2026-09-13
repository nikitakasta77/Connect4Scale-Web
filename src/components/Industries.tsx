import { useState } from 'react';
import { isFinePointer } from '../lib/gsap';
import { PlaceholderVisual } from './PlaceholderVisual';
import type { MarkName } from './icons/Marks';

interface Industry {
  num: string;
  name: string;
  icon: MarkName;
}

const INDUSTRIES: Industry[] = [
  { num: '01', name: 'Banking & Financial Services', icon: 'bars' },
  { num: '02', name: 'Insurance', icon: 'aperture' },
  { num: '03', name: 'Healthcare & Pharmaceuticals', icon: 'blob' },
  { num: '04', name: 'Manufacturing', icon: 'grid' },
  { num: '05', name: 'Technology', icon: 'circuit' },
  { num: '06', name: 'Education', icon: 'film' },
  { num: '07', name: 'Hospitality', icon: 'rays' },
  { num: '08', name: 'Real Estate', icon: 'lens' },
  { num: '09', name: 'Retail', icon: 'wave' },
  { num: '10', name: 'Startups', icon: 'clapper' },
  { num: '11', name: 'Government Organizations', icon: 'grid' },
  { num: '12', name: 'NGOs', icon: 'blob' },
];

export function Industries() {
  const [active, setActive] = useState(INDUSTRIES[0].num);

  const activeIndustry = INDUSTRIES.find((i) => i.num === active) ?? INDUSTRIES[0];

  return (
    <section className="section-pad industries" id="industries">
      <div className="container">
        <div className="section-label">
          <span>Industries We Serve</span>
        </div>

        <div className="industries-body">
          <ul className="industry-list">
            {INDUSTRIES.map((ind) => (
              <li className={`industry-row${active === ind.num ? ' is-active' : ''}`} key={ind.num}>
                <button
                  type="button"
                  data-cursor="View"
                  onMouseEnter={() => {
                    if (isFinePointer()) setActive(ind.num);
                  }}
                  onClick={() => {
                    if (!isFinePointer()) setActive((cur) => (cur === ind.num ? '' : ind.num));
                  }}
                >
                  <span className="industry-row-num">{ind.num}</span>
                  <span className="industry-row-name">{ind.name}</span>
                </button>
              </li>
            ))}
          </ul>

          <div className="industry-preview" aria-hidden="true">
            <PlaceholderVisual icon={activeIndustry.icon} />
          </div>
        </div>
      </div>
    </section>
  );
}
