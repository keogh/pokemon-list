import React from 'react';
import './App.css';
import { useQuery , gql} from '@apollo/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './Components/Root';

const GET_POKEMONS = gql`
  query pokemons($limit: Int, $offset: Int) {
    pokemons(limit: $limit, offset: $offset) {
      count
      next
      previous
      status
      message
      results {
        url
        name
        image
        artwork
      }
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery(GET_POKEMONS, {
    variables: {
      limit: 12,
      offset: 0,
    },
  });

  if (loading) return <>'Loading...'</>;
  if (error) return <>`Error! ${error.message}`</>;

  // TODO: use router loader
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root pokemons={data.pokemons.results} />
    }
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
