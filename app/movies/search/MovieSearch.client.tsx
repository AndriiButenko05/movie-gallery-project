"use client";
import MovieGrid from "@/components/MovieGrid/MovieGrid";
import Pagination from "@/components/Pagination/Pagination";
import SearchBar from "@/components/SearchBar/SearchBar";
import { searchMovies } from "@/lib/api/api";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import css from "./page.module.css";

export default function MovieSearchClient() {
  const [currentPage, setCurrentPage] = useState(1);
  const [text, setText] = useState("");
  const [debouncedSearchedQuery] = useDebounce(text, 500);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["searchMovies", currentPage, debouncedSearchedQuery],
    queryFn: () =>
      searchMovies(currentPage, debouncedSearchedQuery || undefined),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
    enabled: debouncedSearchedQuery.trim() !== "",
  });
  const handleChange = (value: string) => {
    setCurrentPage(1);
    setText(value);
  };
  return (
    <div>
      <h1 className={css.heading}>Search your favorite movie</h1>
      <div className={css.searchBar}>
        <SearchBar value={text} onChange={handleChange}></SearchBar>
      </div>
      {isError && <p className={css.error}>Something went wrong</p>}
      {isLoading && <p className={css.loading}>Loading content...</p>}
      {debouncedSearchedQuery.trim() !== "" &&
        !isLoading &&
        !isError &&
        data?.results?.length === 0 && (
          <p className={css.error}>No movies were found</p>
        )}
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
