import {gql} from "@apollo/client";

export const GET_POKEMONS = gql`
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

export const GET_POKEMON = gql`
  query($name: String!) {
    pokemon(name: $name) {
      id
      is_default
      name
      order
      species {
        id
        url
        name
      }
      sprites {
        front_default
        front_shiny
      }
      types {
        type {
          name
        }
      }
      weight
      status
      message
    }
  }
`;
