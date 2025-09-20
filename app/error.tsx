"use client";
import { Metadata } from "next";
import css from "./page.module.css";
export const metadata: Metadata = {
  title: "Error",
  description: "Error page",
  openGraph: {
    title: `Error`,
    description: "Error page",
    url: `https://movie-gallery-project.vercel.app/error`,
  },
};

export default function Error() {
  return (
    <div className={css.notFound}>
      <h1 className={css.heading}>Something went wrong</h1>
      <p className={css.text}>Oops, Something went wrong. Try again later</p>
    </div>
  );
}
