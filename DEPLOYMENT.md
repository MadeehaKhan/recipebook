# RecipeBook Deployment Guide

This guide shows how to run RecipeBook in development and production environments.

## Development Setup

### Quick Start

```bash
npm run start:dev
```

This runs:

- `docker-compose up` with development configuration
- Auto-initializes database schema
- Auto-seeds sample data
- Hot-reloading enabled for frontend and backend

### What Happens

1. PostgreSQL container starts
2. `init-db.sh` runs automatically (idempotent)
   - Creates `recipebook` database
   - Creates all tables and indexes
   - Seeds sample data (because `NODE_ENV=development`)
3. Backend and Frontend start with hot-reload

### Resetting Database (Dev)

To clear and reinitialize:

```bash
# Stop containers
docker-compose down -v

# Remove volumes (⚠️ deletes data)
docker volume rm recipebook_postgres-data

# Restart with fresh init
npm run start:dev
```

---

## Production Deployment

### Prerequisites

1. Create `.env.prod` with production secrets:

   ```bash
   cp backend/.env.example backend/.env.prod
   # Edit backend/.env.prod with production values
   ```

2. Set secure environment variables:
   ```env
   POSTGRES_PASSWORD=<strong-password>
   CORS_ORIGIN=https://yourdomain.com
   NODE_ENV=production
   ```

### Deploy with Docker Compose

```bash
# Use production compose file
docker-compose -f docker-compose.prod.yml up -d

# Initialize database (one-time only)
docker-compose -f docker-compose.prod.yml exec postgres \
  bash /docker-entrypoint-initdb.d/01-init-db.sh

# Verify health
docker-compose -f docker-compose.prod.yml ps
```

### Key Differences from Dev

| Aspect            | Dev                      | Prod                      |
| ----------------- | ------------------------ | ------------------------- |
| **Compose File**  | `docker-compose.yml`     | `docker-compose.prod.yml` |
| **Sample Data**   | ✅ Auto-seeded           | ❌ None                   |
| **Volumes**       | Auto-cleanup on restart  | ✅ Persistent             |
| **Logging**       | Verbose output           | Limited (10MB files)      |
| **Rebuilds**      | Quick (live code mounts) | Full rebuild required     |
| **Health Checks** | Every 5s                 | Every 30s                 |

### Database Initialization

The `init-db.sh` script is **idempotent**:

- ✅ Safe to run multiple times
- ✅ Detects existing tables and skips creation
- ✅ Only seeds data if `NODE_ENV=development`

**To initialize manually in production:**

```bash
docker-compose -f docker-compose.prod.yml exec postgres \
  NODE_ENV=production bash /docker-entrypoint-initdb.d/01-init-db.sh
```

### Production Checklist

- [ ] Create `.env.prod` with secure values
- [ ] Verify `POSTGRES_PASSWORD` is strong
- [ ] Set `CORS_ORIGIN` to your domain
- [ ] Test database initialization: `docker-compose -f docker-compose.prod.yml up -d`
- [ ] Verify all services are healthy: `docker-compose -f docker-compose.prod.yml ps`
- [ ] Test API health endpoint: `curl http://localhost:5000/api/health`
- [ ] Configure backup strategy for `postgres-data-prod` volume
- [ ] Set up monitoring/logging aggregation

---

## Environment Variables

### Development (.env)

```env
NODE_ENV=development
POSTGRES_PASSWORD=postgres
CORS_ORIGIN=*
```

### Production (.env.prod)

```env
NODE_ENV=production
POSTGRES_PASSWORD=<very-secure-password>
CORS_ORIGIN=https://yourdomain.com
LOG_FORMAT=combined
```

---

## Troubleshooting

### Database Already Exists Error

**Safe to ignore** - the `init-db.sh` script handles this.

### Sample Data Not Appearing

- Check that `NODE_ENV=development` in your `.env`
- Or manually seed: `docker-compose exec postgres psql -U postgres -d recipebook -c "SELECT COUNT(*) FROM recipes;"`

### Port Already in Use

```bash
# Change port in docker-compose.yml
# Or stop conflicting service:
lsof -i :5432  # Find what's using port
kill -9 <PID>
```

### Persistent Volume Issues (Prod)

```bash
# List volumes
docker volume ls

# Inspect specific volume
docker volume inspect recipebook_postgres-data-prod

# Backup volume
docker run --rm -v recipebook_postgres-data-prod:/data -v $(pwd):/backup \
  postgres:16-alpine tar czf /backup/db-backup.tar.gz -C /data .
```

---

## Scaling Considerations

For larger deployments:

1. **Separate database** - Use managed PostgreSQL (AWS RDS, Azure Database)
   - Update `POSTGRES_HOST` to external host
   - Keep persistent volumes for backups only

2. **Multiple backend instances** - Use load balancer (nginx, AWS ALB)

   ```yaml
   backend:
     deploy:
       replicas: 3
   ```

3. **Caching layer** - Add Redis for sessions/caching
4. **CDN** - Serve static frontend assets from CloudFlare/AWS CloudFront
5. **Monitoring** - Add Prometheus, DataDog, or New Relic

---

## Quick Reference

```bash
# Development
npm run start:dev                          # Start all services
docker-compose down -v                    # Stop and remove volumes
docker-compose logs -f backend            # View backend logs

# Production
docker-compose -f docker-compose.prod.yml up -d        # Start services
docker-compose -f docker-compose.prod.yml logs -f      # View logs
docker-compose -f docker-compose.prod.yml ps           # Service status
```
