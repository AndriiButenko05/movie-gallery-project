import { getPopularMovies } from "@/lib/api/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import MoviesClient from "./Movies.client";
import css from "./page.module.css";

export default async function Movies() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["movies"],
    queryFn: () => getPopularMovies(1),
  });

  return (
    <div className={css.page}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <h1 className={css.heading}>Trending Movies</h1>
        <MoviesClient />
      </HydrationBoundary>
    </div>
  );
}
