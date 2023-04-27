import * as React from 'react';
import {Box, Card, CardMedia, CardContent, Grid, CardActionArea, Typography} from "@mui/material";

interface Props {
  pokemons: [];
}

// @ts-ignore
export default function PokemonsList( { pokemons }) {
  return (
    <Grid container spacing={2}>
      {/* @ts-ignore */}
      {pokemons.map(pokemon => (
        <Grid item xs={2} key={pokemon.name}>
          <Card>
            <CardActionArea>
              <CardMedia
                component="img"
                image={pokemon.artwork}
              />
              <CardContent>
                <Typography variant="h5">
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