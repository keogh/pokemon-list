import * as React from 'react';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia, Chip,
  Dialog, Grid, IconButton,
  Skeleton, Stack, Table, TableBody, TableCell, TableContainer, TableRow,
} from "@mui/material";
import type {PokemonItem, Type} from "../../gql/graphql";
import {useQuery} from "@apollo/client";
import {GET_POKEMON} from "../../queries/pokemon";
import CloseIcon from '@mui/icons-material/Close';

const CardMediaStyles = {
  minWidth: 470,
  minHeight: 470,
}

interface Props {
  pokemon: PokemonItem;
  open: boolean;
  onClose: VoidFunction;
}

export default function PokemonDetailsDialog({ pokemon, open, onClose }: Props) {
  const { loading, error, data } = useQuery(GET_POKEMON, {
    variables: {
      name: pokemon.name,
    },
  });

  if (error) {
    // TODO: Make a better error
    return (
      <Dialog open={open}>
        <p>Error...</p>
      </Dialog>
    );
  }

  if (loading) {
    return (
      <Dialog open={open}>
        <Box>
          <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
          <Skeleton width={460} height={600} />
          <Skeleton height={40} />
          <Skeleton height={40} />
          <Skeleton height={40} />
        </Box>
      </Dialog>
    );
  }

  const pokemonDetails = data.pokemon;

  return (
    <Dialog open={open} onClose={onClose}>
      <Card>
        <CardHeader
          title={`#${pokemonDetails.order} - ${pokemon.name}`}
          action={
            <IconButton arial-label="close" onClick={onClose}>
              <CloseIcon />
            </IconButton>
          }
        />
        <CardMedia
          component="img"
          image={pokemon.artwork ?? ''}
          alt={`Pokemon ${pokemon.name}`}
          sx={CardMediaStyles}
        />
        <CardContent>
          <TableContainer>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell component="th" align="right">Types: </TableCell>
                  <TableCell align="left">
                    <Stack
                      direction="row"
                      justifyContent="flex-start"
                      alignItems="baseline"
                      spacing={1}
                    >
                      {pokemonDetails.types.map((pokemonType: Type) => (
                        <Chip label={pokemonType.type?.name} />
                      ))}
                    </Stack>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" align="right">Weight: </TableCell>
                  <TableCell align="left">
                    {pokemonDetails.weight} lbs
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" align="right">Sprites: </TableCell>
                  <TableCell align="left" sx={{ padding: 0 }}>
                    <Stack
                      direction="row"
                      justifyContent="flex-start"
                      alignItems="baseline"
                      spacing={1}
                    >
                      <img src={pokemonDetails.sprites.front_default} width={64} alt={`Default fron sprite for Pokemon ${pokemon.name}`} />
                      <img src={pokemonDetails.sprites.front_shiny} width={64} alt={`Default fron sprite for Pokemon ${pokemon.name}`} />
                    </Stack>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Dialog>
  );
}
