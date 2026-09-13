# Connect4Scale API

Node.js + Express + MongoDB (Mongoose) backend for the Connect4Scale website.
Lives beside the frontend at `../` — this is a separate, independently
runnable Node project.

## Setup

```bash
cd server
npm install
cp .env.example .env   # then fill in MONGODB_URI and ADMIN_API_KEY
npm run seed            # populates Services + Industries with the site's real copy
npm run dev              # http://localhost:5000, restarts on file change
```

Requires a running MongoDB instance (local `mongod`, Docker, or a free
[MongoDB Atlas](https://www.mongodb.com/atlas) cluster) reachable at the
`MONGODB_URI` you set in `.env`.

## Authentication

There's no user login system here — it's a single shared secret. Any
request that creates, updates, or deletes content, or reads contact form
submissions, must send:

```
x-api-key: <your ADMIN_API_KEY>
```

Requests without it get `401 Unauthorized`. Public `GET` endpoints work
without a key but only ever return published content; sending the key on a
`GET` additionally reveals unpublished items.

**Before going to production:** replace this with real authentication
(e.g. JWT + a login endpoint) if more than one trusted person/service will
manage content — a single static key has no per-user audit trail or
revocation.

## Endpoints

Base URL: `http://localhost:5000/api`

| Method | Path                | Auth        | Purpose |
|--------|---------------------|-------------|---------|
| GET    | `/health`           | —           | Liveness check |
| POST   | `/contact`          | — (public, rate-limited) | Submit the site's Contact form |
| GET    | `/contact`          | admin       | List submissions (`?status=new\|contacted\|closed&page=&limit=`) |
| GET    | `/contact/:id`      | admin       | Get one submission |
| PATCH  | `/contact/:id`      | admin       | Update a submission's status |
| DELETE | `/contact/:id`      | admin       | Delete a submission |
| GET    | `/projects`         | public/admin| List portfolio projects |
| GET    | `/projects/:id`     | public/admin| Get one project |
| POST   | `/projects`         | admin       | Create a project |
| PUT    | `/projects/:id`     | admin       | Update a project |
| DELETE | `/projects/:id`     | admin       | Delete a project |
| GET    | `/services`         | public/admin| List services (same CRUD shape as `/projects`) |
| POST/PUT/DELETE | `/services[/:id]` | admin | Manage services |
| GET    | `/industries`       | public/admin| List industries (same CRUD shape) |
| POST/PUT/DELETE | `/industries[/:id]` | admin | Manage industries |
| GET    | `/clients`          | public/admin| List client logos (same CRUD shape) |
| POST/PUT/DELETE | `/clients[/:id]` | admin | Manage client logos |
| GET    | `/stats`            | public      | Get the site's stat counters (any unset figure is `null`) |
| PUT    | `/stats`            | admin       | Update stat counters |

`/projects`, `/services`, `/industries`, `/clients` share the same document
shape pattern: `order` (Number, for display sequence) and `isPublished`
(Boolean, default `true`) control what visitors see.

### Example: submit the contact form

```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Doe",
    "email": "jane@example.com",
    "company": "Example Co",
    "service": "Brand Film",
    "message": "We'\''d like to talk about a project."
  }'
```

### Example: create a portfolio project (admin)

```bash
curl -X POST http://localhost:5000/api/projects \
  -H "Content-Type: application/json" \
  -H "x-api-key: $ADMIN_API_KEY" \
  -d '{
    "title": "Corporate Brand Film",
    "industry": "Manufacturing",
    "type": "Brand Film",
    "description": "A brand film built to communicate scale and precision.",
    "icon": "grid"
  }'
```

## Content honesty rules carried over from the frontend

The seed script only populates **Services** and **Industries** — real copy
that's already on the site. It deliberately does **not** invent portfolio
projects, client names, or stats: those collections start empty and should
only ever be filled with real data through the admin-authenticated
endpoints above.

## Project layout

```
server/
  src/
    config/db.js            Mongo connection
    middleware/auth.js       optionalAdmin / requireAdmin (x-api-key)
    middleware/errorHandler.js
    models/                  Mongoose schemas
    controllers/              route handlers (crudFactory.js is shared by
                               Project/Service/Industry/Client)
    routes/                  Express routers, one per resource
    seed.js                  populates Services + Industries
    index.js                 app entry point
```

## Not included (by design, to keep scope honest)

- No frontend wiring yet — `Contact.tsx` still only simulates a submission
  client-side. Point it at `POST /api/contact` when you're ready to go live.
- No image upload/storage (Cloudinary, S3, etc.) — `imageUrl`/`logoUrl`
  fields are plain strings; wire up a real uploader before using them.
- No email notifications on new contact submissions — add one (e.g. via
  Resend, SendGrid, or nodemailer + SMTP) if the team needs alerts.
