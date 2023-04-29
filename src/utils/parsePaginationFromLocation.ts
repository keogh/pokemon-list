import type {Location} from "react-router-dom";

export default function parsePaginationFromLocation(location: Location) {
  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get('page') || '1', 10);
  const itemsPerPage = 24;
  const offset = itemsPerPage * (page - 1);

  return {
    page,
    itemsPerPage,
    offset,
  };
}
