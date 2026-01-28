import { pool } from "./connect";

const LIMIT = 10;

export async function getRecipesByKeyword(
  keyword: string,
  limit: number = LIMIT,
) {
  const query = `
  SELECT id, title, description, servings, prep_time, cook_time
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
  SELECT r.id, r.title, r.description, r.servings, r.prep_time, r.cook_time 
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
    SELECT id, title, description, servings, prep_time, cook_time
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

export const getAllRecipes = async (limit: number = LIMIT) => {
  const query = `SELECT id, title, description, servings, prep_time, cook_time FROM recipes LIMIT $1`;
  const result = await pool.query(query, [limit]);
  return result.rows;
};
