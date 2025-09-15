import { Movie } from '@/types/movie'
import axios from 'axios'

axios.defaults.headers.common['Authorization'] = `Bearer ${process.env.NEXT_PUBLIC_MOVIE_TOKEN}`

axios.defaults.baseURL = `https://api.themoviedb.org`

interface getPopularMoviesResponse{
    results: Movie[]
    total_pages:number
}

export async function getPopularMovies(page: number):Promise<getPopularMoviesResponse>{
    const res = await axios.get<getPopularMoviesResponse>("/3/trending/movie/week?language=en-US", {
        params: {
            page,
        }
    })
    return res.data;
    
}
export async function getMovieById(id: Movie["id"]):Promise<Movie> {
    const res = await axios.get<Movie>(`3/movie/${id}?language=en-US`)
    return res.data;

}