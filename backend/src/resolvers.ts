import {
  EntityIdArgs,
  RecipesWithStringsArgs,
  RecipeArgs,
  ModifyRecipeArgs,
} from "./models";
import {
  getAllRecipes,
  getRecipeById,
  getRecipesByCategory,
  getRecipesByIngredient,
  getRecipesByKeyword,
} from "./db/queries";

export const resolvers = {
  Query: {
    recipes: async (_parent: any, args: { limit?: number }) => {
      return await getAllRecipes(args.limit);
    },
    recipe: async (_parent: any, args: EntityIdArgs) => {
      return await getRecipeById(args.id);
    },
    recipesByCategory: async (_parent: any, args: RecipesWithStringsArgs) => {
      return await getRecipesByCategory(args.discriminator, args.limit);
    },
    recipesByIngredient: async (_parent: any, args: RecipesWithStringsArgs) => {
      return await getRecipesByIngredient(args.discriminator, args.limit);
    },
    recipesByKeyword: async (_parent: any, args: RecipesWithStringsArgs) => {
      return await getRecipesByKeyword(args.discriminator, args.limit);
    },
  },

  Mutation: {
    addRecipe: async (_parent: any, args: { input: RecipeArgs }) => {
      // Implementation here
      throw new Error("Not implemented");
    },
    modifyRecipe: async (
      _parent: any,
      args: { id: string; input: RecipeArgs },
    ) => {
      // Implementation here
      throw new Error("Not implemented");
    },
    deleteRecipe: async (_parent: any, args: EntityIdArgs) => {
      // Implementation here
      throw new Error("Not implemented");
    },
    addSubstitution: async (_parent: any, args: any) => {
      // Implementation here
      throw new Error("Not implemented");
    },
  },
};
