import {Box, Grid, Skeleton} from "@mui/material";
import * as React from "react";

const ContainerStyles = {
  display: 'flex',
  justifyContent: 'flex-start',
  gap: 2,
  flexWrap: 'wrap',
  boxSizing: 'border-box',
}
export default function PokemonListLoading() {
  return (
    <Box sx={ContainerStyles}>
      {[1, 1, 2, 3, 4].map(value => (
        <Skeleton key={value} width={230} height={475} />
      ))}
    </Box>
  )
}
