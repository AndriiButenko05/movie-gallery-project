import Link from "next/link";
import css from "./Footer.module.css";

function Footer() {
  return (
    <footer className={css.footer}>
      <div className={css.content}>
        <p>© {new Date().getFullYear()} Movie Gallery. All rights reserved.</p>
        <div className={css.wrap}>
          <p>Developer: Andrii Butenko</p>
          <p>
            Contact us:
            <Link href="mailto:andrejbutik@gmail.com">
              andrejbutik@gmail.com
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
