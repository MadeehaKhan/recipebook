import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
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

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = Record<PropertyKey, never>, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;





/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Category: ResolverTypeWrapper<Category>;
  CategoryInput: CategoryInput;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Ingredient: ResolverTypeWrapper<Ingredient>;
  IngredientBase: ResolverTypeWrapper<IngredientBase>;
  IngredientBaseInput: IngredientBaseInput;
  IngredientInput: IngredientInput;
  Instruction: ResolverTypeWrapper<Instruction>;
  InstructionInput: InstructionInput;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Mutation: ResolverTypeWrapper<Record<PropertyKey, never>>;
  Query: ResolverTypeWrapper<Record<PropertyKey, never>>;
  Recipe: ResolverTypeWrapper<Recipe>;
  RecipeInput: RecipeInput;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Substitution: ResolverTypeWrapper<Substitution>;
  SubstitutionInput: SubstitutionInput;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Boolean: Scalars['Boolean']['output'];
  Category: Category;
  CategoryInput: CategoryInput;
  Float: Scalars['Float']['output'];
  ID: Scalars['ID']['output'];
  Ingredient: Ingredient;
  IngredientBase: IngredientBase;
  IngredientBaseInput: IngredientBaseInput;
  IngredientInput: IngredientInput;
  Instruction: Instruction;
  InstructionInput: InstructionInput;
  Int: Scalars['Int']['output'];
  Mutation: Record<PropertyKey, never>;
  Query: Record<PropertyKey, never>;
  Recipe: Recipe;
  RecipeInput: RecipeInput;
  String: Scalars['String']['output'];
  Substitution: Substitution;
  SubstitutionInput: SubstitutionInput;
}>;

export type CategoryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Category'] = ResolversParentTypes['Category']> = ResolversObject<{
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
}>;

export type IngredientResolvers<ContextType = any, ParentType extends ResolversParentTypes['Ingredient'] = ResolversParentTypes['Ingredient']> = ResolversObject<{
  base?: Resolver<ResolversTypes['IngredientBase'], ParentType, ContextType>;
  quantity?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  unit?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
}>;

export type IngredientBaseResolvers<ContextType = any, ParentType extends ResolversParentTypes['IngredientBase'] = ResolversParentTypes['IngredientBase']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
}>;

export type InstructionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Instruction'] = ResolversParentTypes['Instruction']> = ResolversObject<{
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  stepNumber?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  addRecipe?: Resolver<ResolversTypes['Recipe'], ParentType, ContextType, Partial<MutationAddRecipeArgs>>;
  addSubstitution?: Resolver<ResolversTypes['Substitution'], ParentType, ContextType, Partial<MutationAddSubstitutionArgs>>;
  deleteRecipe?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteRecipeArgs, 'id'>>;
  getSubstitutions?: Resolver<Array<ResolversTypes['Substitution']>, ParentType, ContextType, RequireFields<MutationGetSubstitutionsArgs, 'ingredient'>>;
  modifyRecipe?: Resolver<ResolversTypes['Recipe'], ParentType, ContextType, RequireFields<MutationModifyRecipeArgs, 'id'>>;
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  recipe?: Resolver<Maybe<ResolversTypes['Recipe']>, ParentType, ContextType, RequireFields<QueryRecipeArgs, 'id'>>;
  recipes?: Resolver<Maybe<Array<ResolversTypes['Recipe']>>, ParentType, ContextType, Partial<QueryRecipesArgs>>;
  recipesByCategory?: Resolver<Maybe<Array<ResolversTypes['Recipe']>>, ParentType, ContextType, RequireFields<QueryRecipesByCategoryArgs, 'category'>>;
  recipesByIngredient?: Resolver<Maybe<Array<ResolversTypes['Recipe']>>, ParentType, ContextType, RequireFields<QueryRecipesByIngredientArgs, 'ingredient'>>;
  recipesByKeyword?: Resolver<Maybe<Array<ResolversTypes['Recipe']>>, ParentType, ContextType, RequireFields<QueryRecipesByKeywordArgs, 'keyword'>>;
}>;

export type RecipeResolvers<ContextType = any, ParentType extends ResolversParentTypes['Recipe'] = ResolversParentTypes['Recipe']> = ResolversObject<{
  category?: Resolver<ResolversTypes['Category'], ParentType, ContextType>;
  contributed_by?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  cookTimeMinutes?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  ingredients?: Resolver<Array<ResolversTypes['Ingredient']>, ParentType, ContextType>;
  instructions?: Resolver<Array<ResolversTypes['Instruction']>, ParentType, ContextType>;
  notes?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  prepTimeMinutes?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  servings?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  substitutions?: Resolver<Maybe<Array<ResolversTypes['Substitution']>>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  version?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
}>;

export type SubstitutionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Substitution'] = ResolversParentTypes['Substitution']> = ResolversObject<{
  notes?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  originalIngredient?: Resolver<ResolversTypes['Ingredient'], ParentType, ContextType>;
  ratio?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  substituteIngredient?: Resolver<ResolversTypes['Ingredient'], ParentType, ContextType>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  Category?: CategoryResolvers<ContextType>;
  Ingredient?: IngredientResolvers<ContextType>;
  IngredientBase?: IngredientBaseResolvers<ContextType>;
  Instruction?: InstructionResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Recipe?: RecipeResolvers<ContextType>;
  Substitution?: SubstitutionResolvers<ContextType>;
}>;

