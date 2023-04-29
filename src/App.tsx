import React, {useCallback, useMemo, useState} from 'react';
import './App.css';
import { useQuery } from '@apollo/client';
import PokemonsList from "./Components/PokemonsList";
import Pagination from "./Components/Pagination/Pagination";
import {useLocation} from "react-router-dom";
import {AppBar, Container, Grid, Toolbar, Typography} from "@mui/material";
import PokemonDetailsDialog from "./Components/PokemonDetailsDialog";
import parsePaginationFromLocation from "./utils/parsePaginationFromLocation";
import { GET_POKEMONS } from "./queries/pokemon";
import type {PokemonItem} from "./gql/graphql";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import logo from './logo.svg';
import PokemonListLoading from './Components/PokemonListLoading';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const ContainerStyles = {
  pt: 4,
  pb: 4,
  mb: 20,
};

const PaginationContainerStyles = {
  mt: 4,
}

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

  const numPages = useMemo(() => {
    if (!data?.pokemons) {
      return 1;
    }
    return Math.ceil(data.pokemons.count / itemsPerPage);
  }, [data, itemsPerPage]);

  if (error) return <>`Error! ${error.message}`</>;

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <AppBar position="static" color="primary">
        <Toolbar>
          <Grid container gap={2} alignItems="center">
            <Grid item>
              <img src={logo} alt="PokeBall as Logo" width={46} />
            </Grid>
            <Grid item>
              <Typography variant="h5" component="div">
                Pokemon List
              </Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={ContainerStyles}>
        {loading && <PokemonListLoading />}
        {!loading && (
          <PokemonsList pokemons={data.pokemons.results} onClickItem={handleClickItem} />
        )}
        <Grid container justifyContent="center" sx={PaginationContainerStyles}>
          <Grid item>
            <Pagination page={page} count={numPages} />
          </Grid>
        </Grid>
      </Container>

      {selectedPokemon && (
        <PokemonDetailsDialog
          open={isPokemonDetailsOpen}
          onClose={handleClose}
          pokemon={selectedPokemon}
        />
      )}
    </ThemeProvider>
  );
}

export default App;
