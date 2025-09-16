import Image from "next/image";
import { Movie } from "../../types/movie";
import css from "./MovieGrid.module.css";
import { useRouter } from "next/navigation";

interface MovieGridProps {
  movies: Movie[];
}

export default function MovieGrid({ movies }: MovieGridProps) {
  const router = useRouter();
  return (
    <ul className={css.grid}>
      {movies.map((movie) => (
        <li key={movie.id} onClick={() => router.push(`/movies/${movie.id}`)}>
          <div className={css.card}>
            <Image
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={`${movie.title}`}
              className={css.image}
              loading="lazy"
              width="300"
              height="300"
            />
            <h2 className={css.title}>{movie.title}</h2>
          </div>
        </li>
      ))}
    </ul>
  );
}
