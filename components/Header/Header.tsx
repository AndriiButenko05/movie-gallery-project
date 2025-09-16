import Link from "next/link";
import css from "./Header.module.css";
import GenresMenu from "../GenresMenu/GenresMenu";
import { getGenres } from "@/lib/api/api";

async function Header() {
  const genres = await getGenres();
  return (
    <header className={css.header}>
      <Link href="/" aria-label="Home">
        Movie Gallery
      </Link>
      <nav aria-label="Main Navigation" className={css.navigation}>
        <ul className={css.navigation}>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/movies/trending">Popular Movies</Link>
          </li>
          <li>
            <Link href="/movies/search">Search Movies</Link>
          </li>
        </ul>
        <GenresMenu genres={genres}></GenresMenu>
      </nav>
    </header>
  );
}

export default Header;
