import {
  getAllRecipes,
  getRecipeById,
  getRecipesByCategory,
  getRecipesByIngredient,
  getRecipesByKeyword,
} from "./db/queries";
import {
  EntityIdArgs,
  ModifyRecipeArgs,
  RecipeArgs,
  RecipesWithStringsArgs,
  SubstitutionArgs,
} from "./models";

export const resolvers = {
  Query: {
    recipes: async (parent, args: { limit?: number }) => {
      const { limit } = args;
      // Implementation for fetching all recipes
      return await getAllRecipes(limit);
    },
    recipe: async (parent, args: EntityIdArgs) => {
      const { id } = args;
      // Implementation for fetching a single recipe by ID
      return await getRecipeById(id);
    },
    recipesByCategory: async (parent, args: RecipesWithStringsArgs) => {
      const { discriminator, limit } = args;
      // Implementation for fetching recipes by category
      return await getRecipesByCategory(discriminator, limit);
    },
    recipesByIngredient: async (parent, args: RecipesWithStringsArgs) => {
      const { discriminator, limit } = args; 
      // Implementation for fetching recipes by ingredient
      return await getRecipesByIngredient(discriminator, limit);
    },
    recipesByKeyword: async (parent, args: RecipesWithStringsArgs) => {
      const { discriminator, limit } = args;
      // Implementation for fetching recipes by keyword
      return await getRecipesByKeyword(discriminator, limit);
    },
  },

  Mutation: {
    // Mutation resolvers go here
    addRecipe: async (parent, args: RecipeArgs) => {
      // Implementation for adding a recipe
    },
    modifyRecipe: async (parent, args: ModifyRecipeArgs) => {
      // Implementation for modifying a recipe
    },
    deleteRecipe: async (parent, args: EntityIdArgs) => {
      // Implementation for deleting a recipe
    },
    addSubstitution: async (parent, args: SubstitutionArgs) => {
      // Implementation for adding a substitution
    },
    getSubstitutions: async (parent, args) => {
      // Implementation for getting substitutions
    },
  },
};
