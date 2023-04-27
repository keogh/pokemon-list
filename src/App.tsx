import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useQuery , gql} from '@apollo/client';
import PokemonsList from "./Components/PokemonsList";

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

  return (
   <PokemonsList pokemons={data.pokemons.results} />
  );
}

export default App;
