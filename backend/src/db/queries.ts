import { pool } from "./connect.js";
import type { Recipe } from "../models.js";

const LIMIT = 10;

export async function getAllRecipes(limit?: number): Promise<Recipe[]> {
  const query = `
    SELECT
      r.id,
      r.title,
      r.version,
      r.contributed_by,
      r.created_at AS "createdAt",
      r.updated_at AS "updatedAt",
      r.cook_time_minutes AS "cookTimeMinutes",
      r.prep_time_minutes AS "prepTimeMinutes",
      r.servings,
      r.notes,
      json_build_object(
        'id', c.id,
        'name', c.name,
        'description', c.description
      ) AS category
    FROM recipes r
    LEFT JOIN categories c ON r.category_id = c.id
    ${limit ? "LIMIT $1" : ""};
  `;
  const params = limit ? [limit] : [];
  const result = await pool.query(query, params);
  return result.rows;
}

export async function getRecipesByKeyword(
  keyword: string,
  limit: number = LIMIT,
) {
  const query = `
  SELECT id, title, description, servings, prep_time_minutes, cook_time_minutes
    FROM recipes
    WHERE title ILIKE $1 OR description ILIKE $1
    LIMIT $2
  `;
  const result = await pool.query(query, [`%${keyword}%`, limit]);
  return result.rows;
}

export async function getRecipesByIngredient(
  ingredient: string,
  limit: number = LIMIT,
) {
  const query = `
  SELECT r.id, r.title, r.description, r.servings, r.prep_time_minutes, r.cook_time_minutes
    FROM recipes r
    JOIN recipe_ingredients ri ON r.id = ri.recipe_id
    JOIN ingredients i ON ri.ingredient_id = i.id
    WHERE i.name ILIKE $1
    LIMIT $2
    `;
  const result = await pool.query(query, [`%${ingredient}%`, limit]);
  return result.rows;
}

export async function getRecipesByCategory(
  category: string,
  limit: number = LIMIT,
) {
  const query = `
    SELECT id, title, description, servings, prep_time_minutes, cook_time_minutes
        FROM recipes
        WHERE category = $1
        LIMIT $2
    `;
  const result = await pool.query(query, [category, limit]);
  return result.rows;
}

export async function getRecipeById(id: string) {
  const query = `SELECT * FROM recipes WHERE id = $1`;
  const result = await pool.query(query, [id]);
  return result.rows[0] || null;
}
