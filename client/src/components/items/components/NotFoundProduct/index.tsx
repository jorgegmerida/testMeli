import * as React from "react";
import styles from "./styles.module.scss";
import searchBad from "assets/searchBad.png";

export const NotFoundProduct: React.FC = () => {
  return (
    <div className={styles.containerBad}>
      <div className={styles.containerImgSearchBad}>
        <img src={searchBad} alt="busqueda" width={"80px"} height={"80px"} />
      </div>
      <div className={styles.descriptionBad}>
        <div className={styles.titleBad}>
          No hay publicaciones que coincidan con tu búsqueda.
        </div>
        <div className={styles.containerUlBad}>
          <ul>
            <li>
              <b>Revisá la ortografía</b> de la palabra.
            </li>
            <li>
              Utilizá <b>palabras más genéricas</b> ó menos palabras.
            </li>
            <li>
              Navegá por las categorías para encontrar un producto similar
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
