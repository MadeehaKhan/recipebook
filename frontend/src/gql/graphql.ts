/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Category = {
  __typename?: 'Category';
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type CategoryInput = {
  description: Scalars['String']['input'];
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
};

export type Ingredient = {
  __typename?: 'Ingredient';
  base: IngredientBase;
  quantity: Scalars['Float']['output'];
  unit: Scalars['String']['output'];
};

export type IngredientBase = {
  __typename?: 'IngredientBase';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  type: Scalars['String']['output'];
};

export type IngredientBaseInput = {
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  type: Scalars['String']['input'];
};

export type IngredientInput = {
  base: IngredientBaseInput;
  quantity: Scalars['Float']['input'];
  unit: Scalars['String']['input'];
};

export type Instruction = {
  __typename?: 'Instruction';
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  stepNumber: Scalars['Int']['output'];
};

export type InstructionInput = {
  description: Scalars['String']['input'];
  id: Scalars['ID']['input'];
  stepNumber: Scalars['Int']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addRecipe: Recipe;
  addSubstitution: Substitution;
  deleteRecipe: Scalars['Boolean']['output'];
  getSubstitutions: Array<Substitution>;
  modifyRecipe: Recipe;
};


export type MutationAddRecipeArgs = {
  input?: InputMaybe<RecipeInput>;
};


export type MutationAddSubstitutionArgs = {
  input?: InputMaybe<SubstitutionInput>;
};


export type MutationDeleteRecipeArgs = {
  id: Scalars['ID']['input'];
};


export type MutationGetSubstitutionsArgs = {
  ingredient: Scalars['String']['input'];
};


export type MutationModifyRecipeArgs = {
  id: Scalars['ID']['input'];
  input?: InputMaybe<RecipeInput>;
};

export type Query = {
  __typename?: 'Query';
  recipe?: Maybe<Recipe>;
  recipes?: Maybe<Array<Recipe>>;
  recipesByCategory?: Maybe<Array<Recipe>>;
  recipesByIngredient?: Maybe<Array<Recipe>>;
  recipesByKeyword?: Maybe<Array<Recipe>>;
};


export type QueryRecipeArgs = {
  id: Scalars['ID']['input'];
};


export type QueryRecipesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryRecipesByCategoryArgs = {
  category: Scalars['String']['input'];
};


export type QueryRecipesByIngredientArgs = {
  ingredient: Scalars['String']['input'];
};


export type QueryRecipesByKeywordArgs = {
  keyword: Scalars['String']['input'];
};

export type Recipe = {
  __typename?: 'Recipe';
  category: Category;
  contributed_by?: Maybe<Scalars['String']['output']>;
  cookTimeMinutes: Scalars['Int']['output'];
  createdAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  ingredients: Array<Ingredient>;
  instructions: Array<Instruction>;
  notes?: Maybe<Array<Scalars['String']['output']>>;
  prepTimeMinutes: Scalars['Int']['output'];
  servings: Scalars['Float']['output'];
  substitutions?: Maybe<Array<Substitution>>;
  title: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
  version: Scalars['Float']['output'];
};

export type RecipeInput = {
  category: CategoryInput;
  contributed_by?: InputMaybe<Scalars['String']['input']>;
  cookTimeMinutes: Scalars['Int']['input'];
  ingredients: Array<IngredientInput>;
  instructions: Array<InstructionInput>;
  notes?: InputMaybe<Array<Scalars['String']['input']>>;
  prepTimeMinutes: Scalars['Int']['input'];
  servings: Scalars['Float']['input'];
  substitutions?: InputMaybe<Array<SubstitutionInput>>;
  title: Scalars['String']['input'];
};

export type Substitution = {
  __typename?: 'Substitution';
  notes?: Maybe<Scalars['String']['output']>;
  originalIngredient: Ingredient;
  ratio: Scalars['Float']['output'];
  substituteIngredient: Ingredient;
};

export type SubstitutionInput = {
  notes?: InputMaybe<Scalars['String']['input']>;
  originalIngredient: IngredientInput;
  ratio: Scalars['Float']['input'];
  substituteIngredient: IngredientInput;
};

export type BasicRecipeFieldsFragment = { __typename?: 'Recipe', id: string, title: string, contributed_by?: string | null, servings: number, createdAt: string, updatedAt: string, category: { __typename?: 'Category', name: string } };

export type RecipeDetailsFragment = { __typename?: 'Recipe', id: string, title: string, version: number, contributed_by?: string | null, createdAt: string, updatedAt: string, cookTimeMinutes: number, prepTimeMinutes: number, servings: number, notes?: Array<string> | null, ingredients: Array<{ __typename?: 'Ingredient', quantity: number, unit: string, base: { __typename?: 'IngredientBase', id: string, name: string, type: string } }>, instructions: Array<{ __typename?: 'Instruction', id: string, stepNumber: number, description: string }>, category: { __typename?: 'Category', id: string, name: string }, substitutions?: Array<{ __typename?: 'Substitution', ratio: number, notes?: string | null, originalIngredient: { __typename?: 'Ingredient', quantity: number, unit: string, base: { __typename?: 'IngredientBase', id: string, name: string, type: string } }, substituteIngredient: { __typename?: 'Ingredient', quantity: number, unit: string, base: { __typename?: 'IngredientBase', id: string, name: string, type: string } } }> | null };

export type GetRecipesQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetRecipesQuery = { __typename?: 'Query', recipes?: Array<{ __typename?: 'Recipe', id: string, title: string, contributed_by?: string | null, servings: number, createdAt: string, updatedAt: string, category: { __typename?: 'Category', name: string } }> | null };

export type GetRecipeQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetRecipeQuery = { __typename?: 'Query', recipe?: { __typename?: 'Recipe', id: string, title: string, version: number, contributed_by?: string | null, createdAt: string, updatedAt: string, cookTimeMinutes: number, prepTimeMinutes: number, servings: number, notes?: Array<string> | null, ingredients: Array<{ __typename?: 'Ingredient', quantity: number, unit: string, base: { __typename?: 'IngredientBase', id: string, name: string, type: string } }>, instructions: Array<{ __typename?: 'Instruction', id: string, stepNumber: number, description: string }>, category: { __typename?: 'Category', id: string, name: string }, substitutions?: Array<{ __typename?: 'Substitution', ratio: number, notes?: string | null, originalIngredient: { __typename?: 'Ingredient', quantity: number, unit: string, base: { __typename?: 'IngredientBase', id: string, name: string, type: string } }, substituteIngredient: { __typename?: 'Ingredient', quantity: number, unit: string, base: { __typename?: 'IngredientBase', id: string, name: string, type: string } } }> | null } | null };

export const BasicRecipeFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BasicRecipeFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Recipe"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"contributed_by"}},{"kind":"Field","name":{"kind":"Name","value":"servings"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<BasicRecipeFieldsFragment, unknown>;
export const RecipeDetailsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"RecipeDetails"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Recipe"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"ingredients"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"base"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"unit"}}]}},{"kind":"Field","name":{"kind":"Name","value":"instructions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"stepNumber"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"contributed_by"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"cookTimeMinutes"}},{"kind":"Field","name":{"kind":"Name","value":"prepTimeMinutes"}},{"kind":"Field","name":{"kind":"Name","value":"servings"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}},{"kind":"Field","name":{"kind":"Name","value":"substitutions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"originalIngredient"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"base"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"unit"}}]}},{"kind":"Field","name":{"kind":"Name","value":"substituteIngredient"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"base"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"unit"}}]}},{"kind":"Field","name":{"kind":"Name","value":"ratio"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}}]}}]}}]} as unknown as DocumentNode<RecipeDetailsFragment, unknown>;
export const GetRecipesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetRecipes"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"recipes"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BasicRecipeFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BasicRecipeFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Recipe"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"contributed_by"}},{"kind":"Field","name":{"kind":"Name","value":"servings"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<GetRecipesQuery, GetRecipesQueryVariables>;
export const GetRecipeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetRecipe"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"recipe"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"RecipeDetails"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"RecipeDetails"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Recipe"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"ingredients"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"base"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"unit"}}]}},{"kind":"Field","name":{"kind":"Name","value":"instructions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"stepNumber"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"contributed_by"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"cookTimeMinutes"}},{"kind":"Field","name":{"kind":"Name","value":"prepTimeMinutes"}},{"kind":"Field","name":{"kind":"Name","value":"servings"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}},{"kind":"Field","name":{"kind":"Name","value":"substitutions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"originalIngredient"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"base"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"unit"}}]}},{"kind":"Field","name":{"kind":"Name","value":"substituteIngredient"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"base"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"unit"}}]}},{"kind":"Field","name":{"kind":"Name","value":"ratio"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}}]}}]}}]} as unknown as DocumentNode<GetRecipeQuery, GetRecipeQueryVariables>;