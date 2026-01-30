import express, { Request, Response } from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import morgan from "morgan";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import { pool } from "./db/connect";
import { typeDefs } from "./typeDefs";
import { resolvers } from "./resolvers";
import {
  getAllRecipes,
  getRecipeById,
  getRecipesByCategory,
  getRecipesByIngredient,
  getRecipesByKeyword,
} from "./db/queries";

const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || "development";

const app: express.Application = express();

/**
 * Middleware
 */
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: process.env.CORS_ORIGIN || "*" }));
app.use(
  morgan(
    process.env.LOG_FORMAT || (NODE_ENV === "production" ? "combined" : "dev"),
  ),
);
app.set("trust proxy", 1);

// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: parseInt(process.env.RATE_LIMIT_MAX || "100", 10),
//   standardHeaders: true,
//   legacyHeaders: false,
//   skip: () =>
//     process.env.RATE_LIMIT_ENABLED === "false" || NODE_ENV === "development",
// });
// app.use(limiter);

/**
 * REST API Routes
 */
app.get("/api/health", async (req: Request, res: Response): Promise<void> => {
  try {
    const client = await pool.connect();
    client.release();
    res.json({ success: true, message: "Database connection successful" });
  } catch (error: any) {
    console.error("Database connection failed", error);
    res.status(500).json({
      success: false,
      message: "Database connection failed",
      error: error.message,
    });
  }
});

/**
 * Start Server
 */
const startServer = async (): Promise<void> => {
  try {
    const server = new ApolloServer({
      typeDefs,
      resolvers,
    });

    await server.start();

    /**
     * GraphQL Endpoint
     */
    app.use("/graphql", cors(), express.json(), expressMiddleware(server));

    app.listen(PORT, () => {
      console.log(`🚀 Server ready at http://localhost:${PORT}`);
      console.log(`📊 GraphQL available at http://localhost:${PORT}/graphql`);
      console.log(`🏥 Health check at http://localhost:${PORT}/api/health`);
    });

    /**
     * Graceful Shutdown
     */
    const shutdown = async (signal: string): Promise<void> => {
      console.log(`Received ${signal}. Closing server...`);
      try {
        await server.stop();
        await pool.end();
        console.log("Database pool closed");
        process.exit(0);
      } catch (e) {
        console.error("Error during shutdown", e);
        process.exit(1);
      }
    };

    process.on("SIGINT", () => shutdown("SIGINT"));
    process.on("SIGTERM", () => shutdown("SIGTERM"));
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
};

if (require.main === module) {
  startServer();
}

export { app };
