import { graphql } from "../gql/index.js";

const BASIC_RECIPE_FIELDS = graphql(`
  fragment BasicRecipeFields on Recipe {
    id
    title
    contributed_by
    servings
    category {
      name
    }
    createdAt
    updatedAt
  }
`);

const RECIPE_DETAILS = graphql(`
  fragment RecipeDetails on Recipe {
    id
    title
    version
    ingredients {
      base {
        id
        name
        type
      }
      quantity
      unit
    }
    instructions {
      id
      stepNumber
      description
    }
    contributed_by
    category {
      id
      name
    }
    createdAt
    updatedAt
    cookTimeMinutes
    prepTimeMinutes
    servings
    notes
    substitutions {
      originalIngredient {
        base {
          id
          name
          type
        }
        quantity
        unit
      }
      substituteIngredient {
        base {
          id
          name
          type
        }
        quantity
        unit
      }
      ratio
      notes
    }
  }
`);

export const GET_RECIPES = graphql(`
  query GetRecipes($limit: Int) {
    recipes(limit: $limit) {
      ...BasicRecipeFields
    }
  }
`);

export const GET_RECIPE = graphql(`
  query GetRecipe($id: ID!) {
    recipe(id: $id) {
      ...RecipeDetails
    }
  }
`);
