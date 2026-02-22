import { pool } from "../db/connect";
import { Router } from "express";

const router = Router();

const testConnection = async () => {
  try {
    const client = await pool.connect();
    client.release();
    return { success: true, message: "Database connection successful" };
  } catch (error) {
    console.error("Database connection failed", error);
    return {
      success: false,
      message: "Database connection failed",
      error: error.message,
    };
  }
};

router.get("/health", async (req, res) => {
  const result = await testConnection();
  res.status(result.success ? 200 : 500).json(result);
});

export default router;
