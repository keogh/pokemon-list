import React, {useCallback, useState} from 'react';
import './App.css';
import { useQuery } from '@apollo/client';
import PokemonsList from "./Components/PokemonsList";
import Pagination from "./Components/Pagination/Pagination";
import {useLocation} from "react-router-dom";
import {AppBar, Toolbar, Typography} from "@mui/material";
import PokemonDetailsDialog from "./Components/PokemonDetailsDialog";
import parsePaginationFromLocation from "./utils/parsePaginationFromLocation";
import { GET_POKEMONS } from "./queries/pokemon";
import type {PokemonItem} from "./gql/graphql";

function App() {
  const [isPokemonDetailsOpen, setIsPokemonDetailsOpen] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonItem>();

  const location = useLocation();
  const { page, itemsPerPage, offset } = parsePaginationFromLocation(location);

  const handleClickItem = useCallback((pokemon: PokemonItem) => {
    setSelectedPokemon(pokemon);
    setIsPokemonDetailsOpen(true)
  }, []);
  const handleClose = useCallback(() => setIsPokemonDetailsOpen(false), []);

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
      <AppBar position="static" color="secondary">
        <Toolbar>
          <Typography variant="h6" component="div">
            Pokemon List
          </Typography>
        </Toolbar>
      </AppBar>

      <PokemonsList pokemons={data.pokemons.results} onClickItem={handleClickItem} />
      <Pagination page={page} count={numPages} />

      {selectedPokemon && (
        <PokemonDetailsDialog
          open={isPokemonDetailsOpen}
          onClose={handleClose}
          pokemon={selectedPokemon}
        />
      )}
    </>
  );
}

export default App;
