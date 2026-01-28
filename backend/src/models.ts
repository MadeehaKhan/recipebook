export interface EntityIdArgs {
  id: string;
}

export interface RecipesWithStringsArgs {
  discriminator: string;
  limit?: number;
}

export interface RecipeArgs {
  title: string;
  ingredients: Ingredient[];
  instructions: Instruction[];
  category: Category;
  contributedBy: string;
  cookTimeMinutes: number;
  prepTimeMinutes: number;
  totalTimeMinutes: number;
  servings: number;
  notes?: string[];
  substitutions?: Substitution[];
}

export interface ModifyRecipeArgs extends EntityIdArgs {
  title?: string;
  ingredients?: Ingredient[];
  instructions?: Instruction[];
  category?: Category;
  contributedBy?: string;
  cookTimeMinutes?: number;
  prepTimeMinutes?: number;
  totalTimeMinutes?: number;
  servings?: number;
  notes?: string[];
  substitutions?: Substitution[];
}

interface IngredientBase {
  id: string;
  name: string;
  type: string;
}

interface Ingredient {
  base: IngredientBase;
  quantity: number;
  unit: string;
}

interface Instruction {
  id: string;
  step: number;
  description: string;
}

export interface SubstitutionArgs {
  originalIngredient: Ingredient;
  substituteIngredient: Ingredient;
  ratio: number;
  notes?: string;
}

interface Substitution extends SubstitutionArgs {
  id: string;
}

interface Category {
  id: string;
  name: string;
  description: string;
}
