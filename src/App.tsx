import React from 'react';
import './App.css';
import { useQuery , gql} from '@apollo/client';
import PokemonsList from "./Components/PokemonsList";
import Pagination from "./Components/Pagination/Pagination";
import {useLocation} from "react-router-dom";

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
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get('page') || '1', 10);
  const itemsPerPage = 24;
  const offset = itemsPerPage * (page - 1);

  // TODO: maybe use router loader
  const { loading, error, data } = useQuery(GET_POKEMONS, {
    variables: {
      limit: itemsPerPage,
      offset: offset,
    },
  });

  if (loading) return <>'Loading...'</>;
  if (error) return <>`Error! ${error.message}`</>;

  const numPages = Math.ceil(data.pokemons.count / itemsPerPage);


  return (
    <>
      <PokemonsList pokemons={data.pokemons.results} />
      <Pagination page={page} count={numPages} />
    </>
  );
}

export default App;
