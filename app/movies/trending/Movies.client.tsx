"use client";
import MovieGrid from "@/components/MovieGrid/MovieGrid";
import { getPopularMovies } from "@/lib/api/api";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import css from "./page.module.css";
import { useState } from "react";
import Pagination from "@/components/Pagination/Pagination";

export default function MoviesClient() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["trendingMovies", currentPage],
    queryFn: () => getPopularMovies(currentPage),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  return (
    <div>
      {isError && <p className={css.error}>Something went wrong</p>}
      {isLoading && <p className={css.loading}>Loading content...</p>}
      {data && <MovieGrid movies={data?.results} />}
      <div className={css.pagination}>
        {" "}
        {data && (
          <Pagination
            totalPages={data?.total_pages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
}
