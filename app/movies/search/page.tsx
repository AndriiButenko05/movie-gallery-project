import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import MovieSearchClient from "./MovieSearch.client";
import { searchMovies } from "@/lib/api/api";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Search Movies`,
  description: `Search Movies and decide what to watch today`,
  openGraph: {
    title: `Search Movies`,
    description: `Search Movies and decide what to watch today`,
    url: `https://movie-gallery-project.vercel.app/movies/search`,
  },
};

export default async function SearchPage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["searchMovies", 1, "", ""],
    queryFn: () => searchMovies(1, "", ""),
  });

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <MovieSearchClient />
      </HydrationBoundary>
    </>
  );
}
