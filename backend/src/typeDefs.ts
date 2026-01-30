export const typeDefs = `
  type Query {
    recipes: [Recipe!]
    recipesByCategory(category: String!): [Recipe!]
    recipe(id: ID!): Recipe
    recipesByIngredient(ingredient: String!): [Recipe!] 
    recipesByKeyword(keyword: String!): [Recipe!]
  },

  type Mutation {
    addRecipe(input:RecipeInput): Recipe!
    modifyRecipe(id: ID!, input: RecipeInput): Recipe!
    deleteRecipe(id: ID!): Boolean!
    addSubstitution(input: SubstitutionInput): Substitution!
    getSubstitutions(ingredient: String!): [Substitution!]!
  },

  type Recipe {
    id: ID!
    title: String!
    version: Float!
    ingredients: [Ingredient!]! 
    instructions: [Instruction!]!
    contributedBy: String!
    category: Category!
    createdAt: String!
    updatedAt: String!
    cookTimeMinutes: Int!
    prepTimeMinutes: Int!
    totalTimeMinutes: Int!
    servings: Float!
    notes: [String!]
    substitutions: [Substitution!]
  },  

  input RecipeInput {
    title: String!
    ingredients: [IngredientInput!]!
    instructions: [InstructionInput!]!
    category: CategoryInput!
    contributedBy: String!
    cookTimeMinutes: Int!
    prepTimeMinutes: Int!
    totalTimeMinutes: Int!
    servings: Float!
    notes: [String!]
    substitutions: [SubstitutionInput!]
    },
  input IngredientInput {
    base: IngredientBaseInput!
    quantity: Float!
    unit: String! 
  },
  input IngredientBaseInput {
    id: ID!
    name: String!
    type: String!
  },
  input InstructionInput {  
    id: ID!
    stepNumber: Int!
    description: String!
  },
  input SubstitutionInput {
    originalIngredient: IngredientInput!
    substituteIngredient: IngredientInput!
    ratio: Float!
    notes: String
  },
  input CategoryInput {
    id: ID! 
    name: String!
    description: String!
  },
  
  type IngredientBase {
    id: ID!
    name: String!
    type: String!
  },
  type Ingredient {
    base: IngredientBase!
    quantity: Float!
    unit: String!
  },
  type Instruction {  
    id: ID!
    stepNumber: Int!
    description: String!      
  },
  type Substitution {
    originalIngredient: Ingredient!
    substituteIngredient: Ingredient!
    ratio: Float!
    notes: String
  },
  type Category {
    id: ID! 
    name: String!
    description: String!
  }
`;
