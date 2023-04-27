import * as React from 'react';
import { Card, CardMedia, CardContent, Grid, CardActionArea, Typography } from "@mui/material";
import { PokemonItem } from "../../gql/graphql";

interface Props {
  pokemons: PokemonItem[];
}

export default function PokemonsList( { pokemons }: Props) {
  return (
    <Grid container spacing={2}>
      {pokemons.map(pokemon => (
        <Grid item xs={2} key={pokemon.name}>
          <Card>
            <CardActionArea>
              <CardMedia
                component="img"
                image={pokemon.artwork ?? ''}
              />
              <CardContent>
                <Typography variant="h6">
                  {pokemon.name}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}