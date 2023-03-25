import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useGetFetcher } from "../../../../hooks/UseFetcher";
import { RootState } from "../../../../store";
import { setItemDetail, setShowItems } from "../../../../store/slices/products";
import styles from "./styles.module.scss";
import ReactLoading from "react-loading";

export const ItemDetail: React.FC = () => {
  const { showItems } = useSelector((state: RootState) => state.products);
  const fetcher = useGetFetcher();
  const dispatch = useDispatch();
  const params = useParams();
  const { idItem, itemDetail } = useSelector(
    (state: RootState) => state.products
  );

  React.useEffect(() => {
    const fetchItemDetail = async () => {
      const response = await fetcher(
        `http://localhost:5000/api/items/${
          idItem === null || idItem === undefined || idItem.length === 0
            ? params.id
            : idItem
        }`
      );
      console.log(response);
      if (response) {
        dispatch(setShowItems(true));
      } else {
        setTimeout(() => {
          dispatch(setShowItems(true));
        }, 4000);
      }
      dispatch(setItemDetail(response));
    };
    fetchItemDetail();
  }, []);

  return (
    <div className={styles.container}>
      {showItems ? (
        <div className={styles.card}>
          {itemDetail.item !== undefined && (
            <div className={styles.item}>
              <div className={styles.productPrice}>
                <div className={styles.product}>
                  <img
                    src={itemDetail.item.picture}
                    alt="product"
                    width={"478px"}
                    height={"468px"}
                  />
                </div>
                <div className={styles.titlePrice}>
                  <div className={styles.productSell}>sdsdsddsdsdsdsd</div>
                  <div className={styles.title}>{itemDetail.item.title}</div>
                  <div className={styles.price}>
                    $ {itemDetail.item.price.amount}
                  </div>
                  <button onClick={() => {}} className={styles.button}>
                    Comprar
                  </button>
                </div>
              </div>
              <div className={styles.descriptionContainer}>
                <div className={styles.descriptionTitle}>
                  Descripción del Producto
                </div>
                <div className={styles.description}>
                  {itemDetail.item.description !== ""
                    ? itemDetail.item.description
                    : "Este producto aún no tiene descripcion "}
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <ReactLoading
          type={"spin"}
          color={"yellow"}
          height={"5%"}
          width={"5%"}
          className={styles.load}
        />
      )}
    </div>
  );
};
