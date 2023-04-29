import * as React from 'react';
import type {PokemonItem} from "../gql/graphql";
import {Card, CardActionArea, CardContent, CardMedia, Typography} from "@mui/material";
import {useCallback} from "react";

interface Props {
  pokemon: PokemonItem;
  onClick: (pokemon: PokemonItem) => void;
}
export default function PokemonCard({ pokemon, onClick }: Props) {
  const handleClick = useCallback(() => {
    onClick(pokemon);
  }, [pokemon, onClick]);

  return (
    <Card>
      <CardActionArea onClick={handleClick}>
        <CardMedia
          component="img"
          image={pokemon.artwork ?? ''}
          alt={`Pokemon ${pokemon.name}`}
        />
        <CardContent>
          <Typography variant="h6">
            {pokemon.name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
