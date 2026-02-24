/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  fragment BasicRecipeFields on Recipe {\n    id\n    title\n    contributed_by\n    servings\n    category {\n      name\n    }\n    createdAt\n    updatedAt\n  }\n": typeof types.BasicRecipeFieldsFragmentDoc,
    "\n  fragment RecipeDetails on Recipe {\n    id\n    title\n    version\n    ingredients {\n      base {\n        id\n        name\n        type\n      }\n      quantity\n      unit\n    }\n    instructions {\n      id\n      stepNumber\n      description\n    }\n    contributed_by\n    category {\n      id\n      name\n    }\n    createdAt\n    updatedAt\n    cookTimeMinutes\n    prepTimeMinutes\n    servings\n    notes\n    substitutions {\n      originalIngredient {\n        base {\n          id\n          name\n          type\n        }\n        quantity\n        unit\n      }\n      substituteIngredient {\n        base {\n          id\n          name\n          type\n        }\n        quantity\n        unit\n      }\n      ratio\n      notes\n    }\n  }\n": typeof types.RecipeDetailsFragmentDoc,
    "\n  query GetRecipes($limit: Int) {\n    recipes(limit: $limit) {\n      ...BasicRecipeFields\n    }\n  }\n": typeof types.GetRecipesDocument,
    "\n  query GetRecipe($id: ID!) {\n    recipe(id: $id) {\n      ...RecipeDetails\n    }\n  }\n": typeof types.GetRecipeDocument,
};
const documents: Documents = {
    "\n  fragment BasicRecipeFields on Recipe {\n    id\n    title\n    contributed_by\n    servings\n    category {\n      name\n    }\n    createdAt\n    updatedAt\n  }\n": types.BasicRecipeFieldsFragmentDoc,
    "\n  fragment RecipeDetails on Recipe {\n    id\n    title\n    version\n    ingredients {\n      base {\n        id\n        name\n        type\n      }\n      quantity\n      unit\n    }\n    instructions {\n      id\n      stepNumber\n      description\n    }\n    contributed_by\n    category {\n      id\n      name\n    }\n    createdAt\n    updatedAt\n    cookTimeMinutes\n    prepTimeMinutes\n    servings\n    notes\n    substitutions {\n      originalIngredient {\n        base {\n          id\n          name\n          type\n        }\n        quantity\n        unit\n      }\n      substituteIngredient {\n        base {\n          id\n          name\n          type\n        }\n        quantity\n        unit\n      }\n      ratio\n      notes\n    }\n  }\n": types.RecipeDetailsFragmentDoc,
    "\n  query GetRecipes($limit: Int) {\n    recipes(limit: $limit) {\n      ...BasicRecipeFields\n    }\n  }\n": types.GetRecipesDocument,
    "\n  query GetRecipe($id: ID!) {\n    recipe(id: $id) {\n      ...RecipeDetails\n    }\n  }\n": types.GetRecipeDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment BasicRecipeFields on Recipe {\n    id\n    title\n    contributed_by\n    servings\n    category {\n      name\n    }\n    createdAt\n    updatedAt\n  }\n"): (typeof documents)["\n  fragment BasicRecipeFields on Recipe {\n    id\n    title\n    contributed_by\n    servings\n    category {\n      name\n    }\n    createdAt\n    updatedAt\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment RecipeDetails on Recipe {\n    id\n    title\n    version\n    ingredients {\n      base {\n        id\n        name\n        type\n      }\n      quantity\n      unit\n    }\n    instructions {\n      id\n      stepNumber\n      description\n    }\n    contributed_by\n    category {\n      id\n      name\n    }\n    createdAt\n    updatedAt\n    cookTimeMinutes\n    prepTimeMinutes\n    servings\n    notes\n    substitutions {\n      originalIngredient {\n        base {\n          id\n          name\n          type\n        }\n        quantity\n        unit\n      }\n      substituteIngredient {\n        base {\n          id\n          name\n          type\n        }\n        quantity\n        unit\n      }\n      ratio\n      notes\n    }\n  }\n"): (typeof documents)["\n  fragment RecipeDetails on Recipe {\n    id\n    title\n    version\n    ingredients {\n      base {\n        id\n        name\n        type\n      }\n      quantity\n      unit\n    }\n    instructions {\n      id\n      stepNumber\n      description\n    }\n    contributed_by\n    category {\n      id\n      name\n    }\n    createdAt\n    updatedAt\n    cookTimeMinutes\n    prepTimeMinutes\n    servings\n    notes\n    substitutions {\n      originalIngredient {\n        base {\n          id\n          name\n          type\n        }\n        quantity\n        unit\n      }\n      substituteIngredient {\n        base {\n          id\n          name\n          type\n        }\n        quantity\n        unit\n      }\n      ratio\n      notes\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetRecipes($limit: Int) {\n    recipes(limit: $limit) {\n      ...BasicRecipeFields\n    }\n  }\n"): (typeof documents)["\n  query GetRecipes($limit: Int) {\n    recipes(limit: $limit) {\n      ...BasicRecipeFields\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetRecipe($id: ID!) {\n    recipe(id: $id) {\n      ...RecipeDetails\n    }\n  }\n"): (typeof documents)["\n  query GetRecipe($id: ID!) {\n    recipe(id: $id) {\n      ...RecipeDetails\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;