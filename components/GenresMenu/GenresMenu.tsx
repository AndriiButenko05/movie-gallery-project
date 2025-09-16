"use client";
import css from "./GenresMenu.module.css";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Genre } from "@/lib/api/api";

type Props = {
  genres: Genre[];
};

export default function TagsMenu({ genres }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [setIsOpen]);
  return (
    <div className={css.menuContainer}>
      <button className={css.menuButton} onClick={toggle}>
        Genres ▾
      </button>
      {isOpen && (
        <ul className={css.menuList}>
          <li className={css.menuItem}>
            <Link href={`/movies/genres/All`} onClick={toggle}>
              All
            </Link>
          </li>
          {genres.map((genre) => (
            <li key={genre.id} className={css.menuItem}>
              <Link href={`/movies/genres/${genre.id}`} onClick={toggle}>
                {genre.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
