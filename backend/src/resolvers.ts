import {
  getAllRecipes,
  getRecipeById,
  getRecipesByCategory,
  getRecipesByIngredient,
  getRecipesByKeyword,
} from "./db/queries";
import { RecipeResolvers } from "./models";

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
      args: { discriminator: string; limit?: number },
    ) => {
      return await getRecipesByCategory(args.discriminator, args.limit);
    },
    recipesByIngredient: async (
      _parent: any,
      args: { discriminator: string; limit?: number },
    ) => {
      return await getRecipesByIngredient(args.discriminator, args.limit);
    },
    recipesByKeyword: async (
      _parent: any,
      args: { discriminator: string; limit?: number },
    ) => {
      return await getRecipesByKeyword(args.discriminator, args.limit);
    },
  },

  Mutation: {
    addRecipe: async (_parent: any, args: { input: RecipeResolvers }) => {
      // Implementation here
      throw new Error("Not implemented");
    },
    modifyRecipe: async (
      _parent: any,
      args: { id: string; input: RecipeResolvers },
    ) => {
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
