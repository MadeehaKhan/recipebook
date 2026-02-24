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
    JOIN ingredient_bases ib ON ri.ingredient_base_id = ib.id
    WHERE ib.name ILIKE $1
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
    SELECT
      r.id,
      r.title,
      r.description,
      r.servings,
      r.prep_time_minutes,
      r.cook_time_minutes
    FROM recipes r
    JOIN categories c ON r.category_id = c.id
    WHERE c.name = $1
    LIMIT $2
    `;
  const result = await pool.query(query, [category, limit]);
  return result.rows;
}

export async function getRecipeById(id: string) {
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
      COALESCE(json_agg(DISTINCT n.note) FILTER (WHERE n.id IS NOT NULL), '[]') AS notes,
      json_build_object(
        'id', c.id,
        'name', c.name
      ) AS category,
      COALESCE(json_agg(DISTINCT jsonb_build_object(
        'id', ri.id,
        'quantity', ri.quantity,
        'unit', ri.unit,
        'base', json_build_object(
          'id', ib.id,
          'name', ib.name,
          'type', COALESCE(ib.type, '')
        )
      )) FILTER (WHERE ri.id IS NOT NULL), '[]') AS ingredients,
      COALESCE(json_agg(DISTINCT jsonb_build_object(
        'id', instr.id,
        'description', instr.description,
        'stepNumber', instr.step_number
      )) FILTER (WHERE instr.id IS NOT NULL), '[]') AS instructions
    FROM recipes r
    LEFT JOIN recipe_ingredients ri ON r.id = ri.recipe_id
    LEFT JOIN ingredient_bases ib ON ri.ingredient_base_id = ib.id
    LEFT JOIN instructions instr ON r.id = instr.recipe_id
    LEFT JOIN categories c ON r.category_id = c.id
    LEFT JOIN recipe_notes n ON r.id = n.recipe_id
    WHERE r.id = $1
    GROUP BY r.id, r.title, r.version, r.contributed_by, r.created_at, r.updated_at,
             r.cook_time_minutes, r.prep_time_minutes, r.servings, c.id, c.name;
  `;
  const result = await pool.query(query, [id]);
  return result.rows[0] || null;
}
