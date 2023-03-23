import * as React from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";

interface Props {}

export const SearchBar: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Link
          //   onClick={clearApplicationState}
          className={styles.wrapper__logo}
          to="/"
        >
          {/* <img src={mLogo} alt={C.LANG_ES.LOGO_TITLE} />{" "} */}
        </Link>
        <form className={styles.wrapper__search_form}>
          <input
            className={styles.wrapper_form_search_input}
            type="text"
            // placeholder={C.LANG_ES.SEARCHBAR_PLACEHOLDER}
            // onChange={(e) => saveSearch(e.target.value)}
            // value={search}
          />
          <button type="submit" className={styles.wrapper_form_search_submit}>
            {/* <img src={sLogo} alt={C.LANG_ES.SEARCH} /> */}
          </button>
        </form>
      </div>
    </div>
  );
};
