import * as React from 'react';
import { Grid } from "@mui/material";
import type { PokemonItem } from "../../gql/graphql";
import PokemonCard from "../../PokemonCard/PokemonCard";

const GridItemStyles = {
  minHeight: 290,
}

interface Props {
  pokemons: PokemonItem[];

  // TODO: Move to Context
  onClickItem: (pokemon: PokemonItem) => void;
}

export default function PokemonsList( { pokemons, onClickItem }: Props) {
  return (
    <Grid container spacing={2}>
      {pokemons.map(pokemon => (
        <Grid item lg={2} md={3} sm={4} key={pokemon.name} sx={GridItemStyles}>
          <PokemonCard pokemon={pokemon} onClick={onClickItem} />
        </Grid>
      ))}
    </Grid>
  )
}