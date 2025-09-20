import { Metadata } from "next";
import css from "./page.module.css";
export const metadata: Metadata = {
  title: "NotFound",
  description: "NotFound page",
  openGraph: {
    title: `NotFound`,
    description: "NotFound page",
    url: `https://movie-gallery-project.vercel.app/not-found`,
  },
};

export default function NotFound() {
  return (
    <div className={css.notFound}>
      <h1 className={css.heading}>Page not not found</h1>
      <p className={css.text}>Please check the link</p>
    </div>
  );
}
