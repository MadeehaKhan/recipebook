//request to backend fo category details and pic, and recipe chunks

import { useParams } from "react-router-dom";

export const Category = () => {
  const { name = "" } = useParams<{ name: string }>();
  return <h1>{name}</h1>;
};
