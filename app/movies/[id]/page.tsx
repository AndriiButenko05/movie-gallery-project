import { getMovieById } from "@/lib/api/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import MovieClient from "./Movie.client";
import { Metadata } from "next";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const movie = await getMovieById(id);
  return {
    title: `${movie.title}`,
    description: `${movie.overview}`,
    openGraph: {
      title: `${movie.title}`,
      description: `${movie.overview}`,
      url: `https://movie-gallery-project.vercel.app/movies/${id}`,
      images: [
        {
          url: `https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`,
          width: 1200,
          height: 630,
          alt: "Movie Gallery",
        },
      ],
    },
  };
}

export default async function MoviePage({ params }: Props) {
  const { id } = await params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["movies", id],
    queryFn: () => getMovieById(id),
  });

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <MovieClient id={id} />
      </HydrationBoundary>
    </>
  );
}
