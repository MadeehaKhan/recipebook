export const typeDefs = `
  type Query {
    recipes: [Recipe!]
    recipesByCategory(category: String!): [Recipe!]
    recipe(id: ID!): Recipe
    recipesByIngredient(ingredient: String!): [Recipe!] 
    recipesByKeyword(keyword: String!): [Recipe!]
  },

  type Mutation {
    addRecipe(title: String!, ingredients: [Ingredient!]!, instructions: [Instruction!]!, category: Category!, contributedBy: String!, cookTimeMinutes: Int!, prepTimeMinutes: Int!, totalTimeMinutes: Int!, servings: Float!, notes: [String!], substitutions: [Substitution!]): Recipe!
    modifyRecipe(id: ID!, title: String, ingredients: [Ingredient!], instructions: [Instruction!], category: Category, contributedBy: String, cookTimeMinutes: Int, prepTimeMinutes: Int, totalTimeMinutes: Int, servings: Float, notes: [String!], substitutions: [Substitution!]): Recipe!
    deleteRecipe(id: ID!): Boolean!
    addSubstitution(originalIngredient: String!, substituteIngredient: String!, ratio: Float!): Substitution!
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
