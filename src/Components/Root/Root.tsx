import * as React from "react";
import PokemonsList from "../PokemonsList";
import {PokemonItem} from "../../gql/graphql";


interface Props {
  pokemons: PokemonItem[];
}

// TODO: Move pokemons prop to Context
export default function Root({ pokemons }: Props) {
  return (
    <>
      <PokemonsList pokemons={pokemons} />
    </>
  )
}