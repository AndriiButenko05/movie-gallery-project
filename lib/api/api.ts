import { Movie } from "@/types/movie";
import axios from "axios";

axios.defaults.headers.common[
  "Authorization"
] = `Bearer ${process.env.NEXT_PUBLIC_MOVIE_TOKEN}`;

axios.defaults.baseURL = `https://api.themoviedb.org`;

interface GetMoviesResponse {
  results: Movie[];
  total_pages: number;
}

export async function getPopularMovies(
  page: number
): Promise<GetMoviesResponse> {
  const res = await axios.get<GetMoviesResponse>(
    "/3/trending/movie/week?language=en-US",
    {
      params: {
        page,
      },
    }
  );
  return res.data;
}
export async function getMovieById(id: Movie["id"]): Promise<Movie> {
  const res = await axios.get<Movie>(`3/movie/${id}?language=en-US`);
  return res.data;
}

export async function searchMovies(
  page: number,
  query?: Movie["title"],
  year?: string
): Promise<GetMoviesResponse> {
  const res = await axios.get<GetMoviesResponse>(`/3/search/movie`, {
    params: {
      page,
      ...(query ? { query } : {}),
      ...(year ? { year } : {}),
    },
  });
  return res.data;
}

export interface Genre {
  id: number;
  name: string;
}
export interface GetGenresResponse {
genres:Genre[]
}

export async function getGenres(): Promise<Genre[]> {
  const res = await axios.get<GetGenresResponse>(
    `/3/genre/movie/list?language=en-US`
  );
  return res.data.genres;
}



export async function searchMoviesByGenres(page: number,genreId?:string):Promise<GetMoviesResponse> {
  const res = await axios.get<GetMoviesResponse>(
    `/3/discover/movie?include_adult=false&include_video=false&language=en-US&sort_by=popularity.desc`, {
      params: {
        page,
        ...(genreId ? { with_genres:genreId } : {})
      }
    }
  );
  return res.data;
}
