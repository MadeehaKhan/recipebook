import {
  getAllRecipes,
  getRecipeById,
  getRecipesByCategory,
  getRecipesByIngredient,
  getRecipesByKeyword,
} from "./db/queries.js";

export const resolvers = {
  Query: {
    recipes: async (_parent: any, args: { limit?: number }) => {
      return await getAllRecipes(args.limit);
    },
    recipe: async (_parent: any, args: { id: string }) => {
      return await getRecipeById(args.id);
    },
    recipesByCategory: async (
      _parent: any,
      args: { category: string; limit?: number },
    ) => {
      return await getRecipesByCategory(args.category, args.limit);
    },
    recipesByIngredient: async (
      _parent: any,
      args: { ingredient: string; limit?: number },
    ) => {
      return await getRecipesByIngredient(args.ingredient, args.limit);
    },
    recipesByKeyword: async (
      _parent: any,
      args: { keyword: string; limit?: number },
    ) => {
      return await getRecipesByKeyword(args.keyword, args.limit);
    },
  },

  Mutation: {
    addRecipe: async (_parent: any, args: any) => {
      // Implementation here
      throw new Error("Not implemented");
    },
    modifyRecipe: async (_parent: any, args: any) => {
      // Implementation here
      throw new Error("Not implemented");
    },
    deleteRecipe: async (_parent: any, args: { id: string }) => {
      // Implementation here
      throw new Error("Not implemented");
    },
    addSubstitution: async (_parent: any, args: any) => {
      // Implementation here
      throw new Error("Not implemented");
    },
  },
};
