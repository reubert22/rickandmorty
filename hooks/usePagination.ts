import { useState } from "react";

export const usePagination = () => {
  const [page, setPage] = useState<number>(1);

  const increasePage = () => setPage(page + 1);

  return {
    page,
    increasePage,
  };
};
