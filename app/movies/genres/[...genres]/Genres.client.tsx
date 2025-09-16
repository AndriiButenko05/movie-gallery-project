"use client";
import MovieGrid from "@/components/MovieGrid/MovieGrid";
import Pagination from "@/components/Pagination/Pagination";
import { searchMoviesByGenres } from "@/lib/api/api";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import css from "./page.module.css";

interface GenresClientProps {
  genre: string | undefined;
  genreName: string;
}

export default function GenresClient({ genre, genreName }: GenresClientProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["searchMovies", currentPage, genre],
    queryFn: () => searchMoviesByGenres(currentPage, genre),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  return (
    <div>
      <h1 className={css.heading}>Movies with genre: {genreName}</h1>
      {isError && <p className={css.error}>Something went wrong</p>}
      {isLoading && <p className={css.loading}>Loading content...</p>}
      {data && <MovieGrid movies={data?.results} />}
      <div className={css.pagination}>
        {data && data.total_pages > 1 && (
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
