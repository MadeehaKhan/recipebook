import { Pool } from "pg";

const connectionString =
  process.env.DATABASE_URL ||
  process.env.PG_CONNECTION ||
  "postgresql://postgres:postgres@postgres:5432/recipebook";

const pool = new Pool({
  connectionString,
  max: parseInt(process.env.PG_POOL_MAX || "10", 10),
  idleTimeoutMillis: parseInt(process.env.PG_IDLE_TIMEOUT || "30000", 10),
  connectionTimeoutMillis: parseInt(process.env.PG_CONN_TIMEOUT || "5000", 10),
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false,
});

pool.on("error", (err) => {
  console.error("Unexpected PG client error", err);
});

export { pool };
