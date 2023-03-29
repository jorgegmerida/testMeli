import * as React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as ImageNotFound } from "assets/NotFound.svg";
import styles from "./styles.module.scss";

export const NotFound: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        marginTop: "20rem",
      }}
    >
      <ImageNotFound />
      <div className={styles.title}>Parece que esta página no existe</div>
      <Link to={"/"} className={styles.redirect}>
        Ir a la página principal
      </Link>
    </div>
  );
};
