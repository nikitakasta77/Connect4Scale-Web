// Seeds only the two collections that mirror content already written into
// the frontend (Services, Industries) — real copy, not invented data.
// Projects, Clients and Stats are deliberately left empty: the site's rule
// is never to fabricate case studies, client names, or statistics. Add real
// ones later via the admin-authenticated API endpoints.
import 'dotenv/config';
import mongoose from 'mongoose';
import { connectDB } from './config/db.js';
import Service from './models/Service.js';
import Industry from './models/Industry.js';

const SERVICES = [
  { name: 'Brand Films', description: 'Brand stories built to create emotion, recognition and lasting impact.', icon: 'clapper', order: 1 },
  { name: 'Corporate Videos', description: 'Clear, credible communication for leadership, culture and operations.', icon: 'grid', order: 2 },
  { name: 'Social Media Content', description: 'Native, scroll-stopping content built for every platform and format.', icon: 'wave', order: 3 },
  { name: 'Product Videos', description: 'Showcase products with precision, detail and cinematic craft.', icon: 'lens', order: 4 },
  { name: 'Event Coverage', description: 'Full-scale capture and highlight production for live moments.', icon: 'rays', order: 5 },
  { name: 'Motion Graphics', description: 'Animated visuals that simplify ideas and elevate every frame.', icon: 'circuit', order: 6 },
  { name: 'Training & Explainer Videos', description: 'Turn complex processes into content people actually retain.', icon: 'bars', order: 7 },
  { name: 'Digital Marketing Creatives', description: 'Performance-ready creative built to support campaigns and funnels.', icon: 'blob', order: 8 },
];

const INDUSTRIES = [
  { name: 'Banking & Financial Services', icon: 'bars', order: 1 },
  { name: 'Insurance', icon: 'aperture', order: 2 },
  { name: 'Healthcare & Pharmaceuticals', icon: 'blob', order: 3 },
  { name: 'Manufacturing', icon: 'grid', order: 4 },
  { name: 'Technology', icon: 'circuit', order: 5 },
  { name: 'Education', icon: 'film', order: 6 },
  { name: 'Hospitality', icon: 'rays', order: 7 },
  { name: 'Real Estate', icon: 'lens', order: 8 },
  { name: 'Retail', icon: 'wave', order: 9 },
  { name: 'Startups', icon: 'clapper', order: 10 },
  { name: 'Government Organizations', icon: 'grid', order: 11 },
  { name: 'NGOs', icon: 'blob', order: 12 },
];

async function run() {
  await connectDB();

  await Service.deleteMany({});
  await Service.insertMany(SERVICES);
  console.log(`Seeded ${SERVICES.length} services.`);

  await Industry.deleteMany({});
  await Industry.insertMany(INDUSTRIES);
  console.log(`Seeded ${INDUSTRIES.length} industries.`);

  await mongoose.disconnect();
  process.exit(0);
}

run().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
