import { getPopularMovies } from "@/lib/api/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import MoviesClient from "./Movies.client";
import css from "./page.module.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Search Popular Movies`,
  description: `Search Popular Movies and decide what to watch today`,
  openGraph: {
    title: `Search Popular Movies`,
    description: `Search Popular Movies and decide what to watch today`,
    url: `https://movie-gallery-project.vercel.app/movies/trending`,
  },
};

export default async function Movies() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["trendingMovies"],
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
