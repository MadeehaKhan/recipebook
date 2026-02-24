//request to backend for categories and top 10

import { Loading } from "../components/Loading";
import { Error } from "../components/Error";
import { Block } from "../components/Block";
import { GET_RECIPES } from "../services/recipes.js";
import { useQuery } from "@apollo/client/react";
import type {
  GetRecipesQuery,
  GetRecipesQueryVariables,
} from "../gql/graphql.js";
import { Page } from "../components/Page";
import { Link } from "react-router-dom";

export const TableContents = () => {
  const { loading, error, data } = useQuery<
    GetRecipesQuery,
    GetRecipesQueryVariables
  >(GET_RECIPES, { variables: { limit: 5 } });
  const blockColour = "#EED2DB";

  if (loading) return <Loading />;
  if (error) return <Error message={error.message} />;

  return (
    <Page>
      <h1 className="text-xl text-[#4B0001] text-left ml-7 font-[Puritan]">Top Recipes</h1>
      <Block colour={blockColour} className="m-4 p-4">
        <ul className="">
          {data?.recipes?.map((recipe) => (
            <li key={recipe.id}>
              <Link to={`/recipe/${recipe.id}`}>{recipe.title}</Link>
            </li>
          ))}
        </ul>
      </Block>
    </Page>
  );
};
