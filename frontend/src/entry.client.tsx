import { StrictMode } from "react";
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { App } from "./App";
import { TableContents } from "./pages/TableContents";
import { Recipe } from "./pages/Recipe";
import { Category } from "./pages/Category";
import { SearchResults } from "./pages/SearchResults";
import "./index.css";

const client = new ApolloClient({
  link: new HttpLink({ uri: "http://localhost:5000/graphql" }),
  cache: new InMemoryCache(),
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <TableContents /> },
      { path: "recipe/:id", element: <Recipe /> },
      { path: "category/:name", element: <Category /> },
      { path: "search", element: <SearchResults /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  </StrictMode>,
);
