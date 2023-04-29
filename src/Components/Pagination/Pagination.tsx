import * as React from 'react';
import {Link} from "react-router-dom";
import { Pagination as MUIPagination, PaginationItem } from "@mui/material";


interface Props {
  page: number,
  count: number,
}

export default function Pagination({ page, count }: Props) {
  return (
    <MUIPagination
      page={page}
      count={count}
      renderItem={(item) => (
        <PaginationItem
          component={Link}
          to={`/pokemon${item.page === 1 ? '' : `?page=${item.page}`}`}
          {...item}
        />
      )}
    />
  );
}
