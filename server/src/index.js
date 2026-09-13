import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import { connectDB } from './config/db.js';
import { optionalAdmin } from './middleware/auth.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';

import contactRoutes from './routes/contact.routes.js';
import projectsRoutes from './routes/projects.routes.js';
import servicesRoutes from './routes/services.routes.js';
import industriesRoutes from './routes/industries.routes.js';
import clientsRoutes from './routes/clients.routes.js';
import statsRoutes from './routes/stats.routes.js';

const app = express();

const allowedOrigins = (process.env.CLIENT_ORIGIN ?? '')
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean);

app.use(helmet());
app.use(
  cors({
    origin: allowedOrigins.length ? allowedOrigins : true,
    credentials: true,
  })
);
app.use(express.json({ limit: '200kb' }));
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use(optionalAdmin);

app.get('/api/health', (req, res) => {
  res.json({ ok: true, uptime: process.uptime() });
});

app.use('/api/contact', contactRoutes);
app.use('/api/projects', projectsRoutes);
app.use('/api/services', servicesRoutes);
app.use('/api/industries', industriesRoutes);
app.use('/api/clients', clientsRoutes);
app.use('/api/stats', statsRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`Connect4Scale API listening on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error('Failed to start server:', err.message);
    process.exit(1);
  });
