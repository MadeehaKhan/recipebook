# RecipeBook Database Setup

This directory contains scripts and instructions for initializing and working with the RecipeBook PostgreSQL database.

## Overview

- Database: PostgreSQL (dev: 16 recommended)
- Connection string (backend/.env):

  ```env
  DATABASE_URL=postgresql://postgres:password@postgres:5432/recipebook  # Docker
  # Or for local PostgreSQL:
  # DATABASE_URL=postgresql://postgres:password@localhost:5432/recipebook
  ```

- Primary script:
  - `init-db.sh` — creates the `recipebook` database and initializes schema; seeds simple dev data when `NODE_ENV=development`.

## Prerequisites

- PostgreSQL client (psql) available in your shell
- One of:
  - Docker & Docker Compose
  - Local PostgreSQL 16 running on Windows
- Shell to run bash scripts on Windows:
  - WSL (Windows Subsystem for Linux) or
  - Git Bash

## Using Docker (recommended)

1. Start services

```sh
pnpm start:dev
```
or
```sh
#./backend
npm start dev

#./frontend (new terminal)
npm start dev
```
- Backend: http://localhost:5000
- Frontend: http://localhost:5173
- Postgres: localhost:5432 (container host name: `postgres`)

2. Initialize the database

- Option A: Let `docker-compose.yml` handle creating, initializing, and seeding the data (you do nothing but run `pnpm start:dev`
):

```yml
env_file:
    - ./backend/.env
environment:
    NODE_ENV: development
volumes:
    - postgres-data:/var/lib/postgresql/data
    - ./backend/src/db/init-db.sh:/docker-entrypoint-initdb.d/01-init-db.sh
ports:
    - "5432:5432"
```

- Option B: If you prefer Git Bash:

```sh
$env:NODE_ENV="development"
bash ./backend/src/db/init-db.sh
```

3. Verify

```powershell
psql -U postgres -h localhost -p 5432 -d recipebook -c "SHOW server_version;"
psql -U postgres -h localhost -p 5432 -d recipebook -c "SELECT COUNT(*) FROM pg_tables WHERE schemaname='public';"
```

Common Docker commands:

```powershell
docker compose ps
docker compose logs -f postgres
docker compose down -v && docker compose up --build
```

## Using Local PostgreSQL 16 (Windows)

Use your local PostgreSQL 16 instead of Docker.

1. Stop Docker postgres (free port 5432)

```powershell
docker compose stop postgres
```

2. Point backend to local DB

```dotenv
# filepath: c:\Users\madeeha\Projects\RecipeBook\backend\.env
# ...existing code...
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/recipebook
# ...existing code...
```

3. Ensure init script targets localhost
   Update `init-db.sh` if needed:

```bash
# filepath: c:\Users\madeeha\Projects\RecipeBook\backend\src\db\init-db.sh
# ...existing code...
PSQL="psql -h localhost -p 5432 -U postgres"
PSQL_DB="psql -h localhost -p 5432 -U postgres -d $DBNAME"
# ...existing code...
```

4. Run init script

```powershell
$env:NODE_ENV="development"
wsl bash ./backend/src/db/init-db.sh
# or Git Bash:
$env:NODE_ENV="development"
bash ./backend/src/db/init-db.sh
```

5. Verify

```powershell
psql -U postgres -h localhost -p 5432 -d recipebook -c "SHOW server_version;"
psql -U postgres -h localhost -p 5432 -d recipebook -c "SELECT COUNT(*) FROM pg_tables WHERE schemaname='public';"
```

## Database Schema

Tables:

- categories — Recipe categories
- ingredient_bases — Base ingredient definitions
- recipes — Main recipe records
- recipe_ingredients — Junction table (recipes → ingredients)
- instructions — Step-by-step cooking instructions
- recipe_notes — Tips and notes for recipes
- substitutions — Ingredient substitution mappings

Relationships & constraints:

- recipes.category_id → categories.id (ON DELETE RESTRICT)
- recipe_ingredients.recipe_id → recipes.id (ON DELETE CASCADE)
- recipe_ingredients.ingredient_base_id → ingredient_bases.id (ON DELETE RESTRICT)
- instructions.recipe_id → recipes.id (ON DELETE CASCADE)
- recipe_notes.recipe_id → recipes.id (ON DELETE CASCADE)
- substitutions.ingredient_base_id → ingredient_bases.id (ON DELETE CASCADE)

Indexes:

- Primary keys on all tables
- Foreign key indexes on relationship columns
- Additional indexes for common lookups (e.g., category_id, contributor)

Note: Ensure your `init-db.sh` contains the full CREATE TABLE statements for the above schema (remove placeholder sections and trailing commas).

## Connection Details

- Host: `localhost` (local) or `postgres` (Docker)
- Port: `5432`
- Database: `recipebook`
- User: `postgres`
- Password: set in `backend/.env`

## Troubleshooting

- Port conflicts:
  - If local Postgres uses 5432, map Docker Postgres to 5433 in docker-compose or stop the container.
- Re-initialize:
  ```sql
  -- In psql:
  DROP DATABASE recipebook;
  ```
  Then rerun `init-db.sh`.
- psql not found:
  - Use full path to psql (e.g., `C:\Program Files\PostgreSQL\16\bin\psql.exe`) or run inside WSL/Git Bash.
- No tables created:
  - Review `init-db.sh` for accurate CREATE TABLE statements and host/port settings.
- Seed data:
  - `init-db.sh` seeds sample data only when `NODE_ENV=development`. Adjust or add a dedicated seed script as needed.

## Sample Data

If you maintain sample CSVs (optional), store them under `sample_data/` at the project root:

- categories.csv, ingredient_bases.csv, recipes.csv, recipe_ingredients.csv, instructions.csv, recipe_notes.csv, substitutions.csv

Use a dedicated seed script to load CSVs, or extend `init-db.sh` for seeding.
