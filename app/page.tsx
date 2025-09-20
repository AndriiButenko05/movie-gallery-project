import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.heading}>Welcome to Movie Gallery</h1>
          <p className={styles.text}>
            Here you can explore movies.Want to know when your favorite movie
            was released or watch review? <br />
            Feel free to surf this website
          </p>
        </div>
      </main>
    </div>
  );
}
