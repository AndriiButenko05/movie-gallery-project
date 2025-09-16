import { getGenres, searchMoviesByGenres } from "@/lib/api/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import GenresClient from "./Genres.client";
import { Metadata } from "next";

type Props = {
  params: Promise<{ genres: string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { genres } = await params;
  const genre = genres[0] === "All" ? undefined : genres[0];
  const allGenres = await getGenres();
  const currentGenre = allGenres.find((g) => g.id.toString() === genre);
  return {
    title: `Movies with genre:${currentGenre?.name}`,
    description: `Search Movies with genre:${currentGenre?.name}`,
    openGraph: {
      title: `Movies with genre:${currentGenre?.name}`,
      description: `Search Movies with genre:${currentGenre?.name}`,
      url: `https://movie-gallery-project.vercel.app/movies/search`,
    },
  };
}

export default async function Genres({ params }: Props) {
  const { genres } = await params;
  const genre = genres[0] === "All" ? undefined : genres[0];
  const allGenres = await getGenres();
  const currentGenre = allGenres.find((g) => g.id.toString() === genre);
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["moviesByGenres", 1, genre],
    queryFn: () => searchMoviesByGenres(1, genre),
  });
  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <GenresClient genre={genre} genreName={currentGenre?.name ?? "All"} />
      </HydrationBoundary>
    </>
  );
}
