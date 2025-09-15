"use client";
import { getMovieById } from "@/lib/api/api";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import css from "./page.module.css";
interface MovieClientProps {
  id: string;
}

export default function MovieClient({ id }: MovieClientProps) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", id],
    queryFn: () => getMovieById(id),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });
  const router = useRouter();
  return (
    <div className={css.container}>
      <button onClick={() => router.push("/movies")} className={css.btn}>
        Go back
      </button>
      <div className={css.containerMovie}>
        {isLoading && <p className={css.loading}>Loading content...</p>}
        {isError && <p className={css.error}>Something went wrong</p>}
        <div>
          <Image
            src={`https://image.tmdb.org/t/p/w500/${data?.poster_path}`}
            alt={`${data?.title}`}
            loading="lazy"
            width="400"
            height="600"
            className={css.image}
          />
          <p className={css.text}>Released date: {data?.release_date}</p>
        </div>
        <div className={css.textContainer}>
          <h1 className={css.heading}>{data?.title}</h1>
          <h2 className={css.text}> {data?.overview}</h2>
          <p className={css.text}> Rating:{data?.vote_average}</p>
        </div>
      </div>
    </div>
  );
}
