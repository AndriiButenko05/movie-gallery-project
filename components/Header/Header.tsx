import Link from "next/link";
import css from "./Header.module.css";

async function Header() {
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
            <Link href="/movies">Popular Movies</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
