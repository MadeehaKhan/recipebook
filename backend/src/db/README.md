# RecipeBook Database Setup

This directory contains scripts and SQL files for initializing and seeding the RecipeBook PostgreSQL database.

## Files

- **init.sql** - Creates the RecipeBook database schema (tables, constraints, indexes)
- **seed.sql** - Seeds data from CSV files (requires .env.local with DATA_DIR)
- **docker-init.sh** - Docker initialization script (runs automatically on container start)
- **seed_docker.sh** - Seeds data in running Docker containers
- **.env.local** - Environment configuration (not committed to git)

## Docker Setup (Recommended)

### Quick Start

```bash
# Start all containers (automatically initializes database)
npm run start:dev

# Seed database with sample data
./backend/src/db/seed_docker.sh
```

The database schema is automatically created when the PostgreSQL container starts, thanks to the `docker-init.sh` script mounted in `/docker-entrypoint-initdb.d/`.

## Manual Setup (Without Docker)

### 1. Initialize Database Schema

```bash
psql -U postgres -d postgres -f backend/src/db/init.sql
```

### 2. Seed with Sample Data

First, configure `backend/src/db/.env.local`:

```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/recipebook
DATA_DIR=C:/Users/madeeha/Projects/RecipeBook/sample_data
```

Then run the seed script:

**Windows:**

```bash
cd backend/src/db
./load_seed.bat
```

**macOS/Linux:**

```bash
cd backend/src/db
chmod +x load_seed.sh
./load_seed.sh
```

## Database Schema

### Tables

- **categories** - Recipe categories
- **ingredient_bases** - Base ingredient definitions
- **recipes** - Main recipe records
- **recipe_ingredients** - Junction table (recipes → ingredients)
- **instructions** - Step-by-step cooking instructions
- **recipe_notes** - Tips and notes for recipes
- **substitutions** - Ingredient substitution mappings

### Foreign Keys & Constraints

- Recipes → Categories (ON DELETE RESTRICT)
- Recipe Ingredients → Recipes (ON DELETE CASCADE)
- Recipe Ingredients → Ingredient Bases (ON DELETE RESTRICT)
- Instructions → Recipes (ON DELETE CASCADE)
- Recipe Notes → Recipes (ON DELETE CASCADE)
- Substitutions → Ingredient Bases (ON DELETE CASCADE)

## Connection Details

**Development:**

- Host: `localhost` or `postgres` (if using Docker)
- Port: `5432`
- Database: `recipebook`
- User: `postgres`
- Password: Set in `backend/.env`

## Troubleshooting

**Error: Database already exists**

- Safe to ignore if tables already created
- Drop database to reset: `DROP DATABASE recipebook;`

**CSV files not found (when using seed.sql)**

- Verify `DATA_DIR` in `.env.local` points to `sample_data/` folder
- Use absolute paths, not relative paths

**Docker container initialization failed**

- Check Docker logs: `docker-compose logs postgres`
- Ensure `backend/src/db/docker-init.sh` exists and is readable

## Sample Data

Sample CSV files are located in the `sample_data/` directory at the project root:

- categories.csv (8 records)
- ingredient_bases.csv (20 records)
- recipes.csv (7 records)
- recipe_ingredients.csv (44 records)
- instructions.csv (44 records)
- recipe_notes.csv (17 records)
- substitutions.csv (12 records)
