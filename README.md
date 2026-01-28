# RecipeBook

A full-stack web application for displaying and managing a personal recipe book. Built with React (Vite) frontend, Express.js backend (TypeScript), and PostgreSQL, all containerized with Docker. Uses a pnpm monorepo with separate frontend and backend packages.

## Features

- Frontend: React 19, Vite, TailwindCSS, Axios
- Backend: Express.js (TypeScript), PostgreSQL (pg), Helmet, Morgan, CORS
- Database: PostgreSQL 16 (Dockerized)
- Monorepo: pnpm workspaces
- Testing: Vitest + Testing Library (frontend), Vitest + Supertest (backend)
- Security: CORS, Helmet, rate limiting (configurable via env)
- Dev Tools: ESLint, Nodemon, TypeScript

## Tech Stack

| Layer           | Technology                                       |
| --------------- | ------------------------------------------------ |
| Frontend        | React 19, Vite, TailwindCSS, Axios, TypeScript   |
| Backend         | Express.js, pg, Helmet, Morgan, CORS, TypeScript |
| Database        | PostgreSQL 16                                    |
| Container       | Docker, Docker Compose                           |
| Package Manager | pnpm                                             |
| Testing         | Vitest, Testing Library, Supertest               |

## Project Structure

```
RecipeBook/
├── frontend/                 # React + Vite (ES modules)
│   ├── src/                  # Components, styles, tests
│   ├── public/               # Static assets
│   ├── vite.config.*         # Vite configuration
│   └── package.json
├── backend/                  # Express API (TypeScript)
│   ├── src/
│   │   ├── index.ts          # Server entry
│   │   ├── db/               # PostgreSQL pool & scripts
│   │   ├── routes/           # API route handlers
│   │   ├── middleware/       # Error handling, etc.
│   │   └── test/             # Vitest tests
│   ├── Dockerfile
│   └── package.json
├── docker-compose.yml
├── docker-compose.prod.yml
├── pnpm-workspace.yaml
└── package.json
```

## Quick Start

### Prerequisites

- Node.js 20+
- pnpm 8+
- Docker & Docker Compose

### One-Command Setup

```bash
npm run setup
```

Installs dependencies, creates .env files, and starts services via Docker Compose.

### Manual Setup (without Docker)

```bash
# Install all workspace deps
pnpm install

# Backend dev
cd backend
npm run dev

# Frontend dev (new terminal)
cd frontend
npm run dev
```

## Development

### Docker Compose (recommended)

```bash
npm run start:dev
```

- Frontend: http://localhost:5173
- Backend: http://localhost:5000
- PostgreSQL: localhost:5432

### Environment Variables

Backend (.env):

```env
PORT=5000
NODE_ENV=development
DATABASE_URL=postgresql://postgres:password@postgres:5432/recipebook
CORS_ORIGIN=*
LOG_FORMAT=dev
RATE_LIMIT_MAX=100
PG_POOL_MAX=10
PG_IDLE_TIMEOUT=30000
PG_CONN_TIMEOUT=5000
```

Frontend (.env):

```env
VITE_API_URL=http://localhost:5000
```

## Scripts

Root:

```bash
npm run setup       # One-command setup
npm run start:dev   # Dev with Docker Compose
npm run start:prod  # Prod with Docker Compose
npm run build       # Build frontend & backend
npm run test        # Run all tests
npm run lint        # Lint all packages
```

Per package:

```bash
# Frontend
npm run dev | build | test | lint

# Backend
npm run dev | start | build | test | lint
```

## Testing

```bash
npm run test

# Or per package:
cd frontend && npm test
cd backend && npm test
```

## Database & Schema (Updated)

The backend uses PostgreSQL with the following tables:

- categories — Recipe categories
- ingredient_bases — Base ingredient definitions
- recipes — Main recipe records
- recipe_ingredients — Junction table (recipes → ingredients)
- instructions — Step-by-step cooking instructions
- recipe_notes — Tips and notes for recipes
- substitutions — Ingredient substitution mappings

Connection details (development):

- Host: localhost (or postgres in Docker)
- Port: 5432
- Database: recipebook
- User: postgres
- Password: configured in backend/.env (see DATABASE_URL)

Seeding:

- Docker: schema auto-initializes via backend/src/db/docker-init.sh
- Seed (Docker): run backend/src/db/seed_docker.sh
- Manual seed: see backend/src/db/README.md for load_seed.bat or load_seed.sh
- Sample CSVs: sample_data/ at project root

## Docker Compose Services (Updated)

Development (docker-compose.yml):

- backend: Express API (port 5000)
  - Depends on postgres
  - Env from backend/.env (e.g., PORT, NODE_ENV, DATABASE_URL, RATE_LIMIT_MAX, PG_POOL_MAX, PG_IDLE_TIMEOUT, PG_CONN_TIMEOUT)
  - Typical health check: GET /api/health (if configured)
- postgres: PostgreSQL 16 (port 5432)
  - Persists data to a named volume (e.g., db-data)
  - Runs backend/src/db/docker-init.sh via /docker-entrypoint-initdb.d/ for first-time schema init
- frontend: React Vite dev server (port 5173)
  - Uses VITE_API_URL to reach backend

Notes:

- Logs: docker-compose logs -f
- Status: docker-compose ps
- Reset DB: docker-compose down -v && docker-compose up --build

Production (docker-compose.prod.yml):

- backend: production build of Express API
- postgres: PostgreSQL with persisted volume
- frontend: static assets served from production build
- Health checks and resource limits enabled

## Security

- Helmet for HTTP headers
- CORS configurable via `CORS_ORIGIN`
- Rate limiting via `RATE_LIMIT_MAX` (15-min window)

## License

MIT License
