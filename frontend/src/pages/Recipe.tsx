//request to backend for recipe details

import { Block } from "../components/Block.js";
import { Loading } from "../components/Loading.js";
import { Error } from "../components/Error.js";
import { GET_RECIPE } from "../services/recipes.js";
import { useQuery } from "@apollo/client/react";
import type {
  GetRecipeQuery,
  GetRecipeQueryVariables,
} from "../gql/graphql.js";

import { useParams } from "react-router-dom";

export const Recipe = () => {
  const { id = "" } = useParams<{ id: string }>();
  const blockColour = "#B6D8F7";

  const { loading, error, data } = useQuery<
    GetRecipeQuery,
    GetRecipeQueryVariables
  >(GET_RECIPE, { variables: { id } });

  if (loading) return <Loading />;
  if (error) return <Error message={error.message} />;

  const recipe = data?.recipe;

  if (!recipe) return <Error message="Recipe not found." />;

  return (
    <>
      <Block colour={blockColour} className="">
        <h1>{recipe.title}</h1>
        <h3>By {recipe.contributed_by}</h3>
        <h3>Serves {recipe.servings}</h3>
        <p>{recipe.notes}</p>
      </Block>

      <Block colour={blockColour} className="">
        <h3>Prep Time: {recipe.prepTimeMinutes} minutes</h3>
        <h3>Cook Time: {recipe.cookTimeMinutes} minutes</h3>
        <h3>
          Total Time:{" "}
          {(recipe.prepTimeMinutes ?? 0) + (recipe.cookTimeMinutes ?? 0)}{" "}
          minutes
        </h3>
      </Block>

      <Block colour={blockColour} className="">
        <h2>Ingredients</h2>
        <ul>
          {recipe.ingredients.map((ingredient) => (
            <li key={ingredient.base.id}>
              {ingredient.quantity} {ingredient.unit} {ingredient.base.name}
            </li>
          ))}
        </ul>
      </Block>

      <Block colour={blockColour} className="">
        <h2>Instructions</h2>
        <ol>
          {recipe.instructions.map((instruction) => (
            <li key={instruction.id}>{instruction.description}</li>
          ))}
        </ol>
      </Block>
    </>
  );
};
