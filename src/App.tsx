import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useQuery , gql} from '@apollo/client';

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
      }
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery(GET_POKEMONS, {
    variables: {
      limit: 2,
      offset: 1,
    },
  });

  if (loading) return <>'Loading...'</>;
  if (error) return <>`Error! ${error.message}`</>;

  console.log('Response from server', data);
  return (
    <>
    'Success!'
    </>
  );
}

export default App;
