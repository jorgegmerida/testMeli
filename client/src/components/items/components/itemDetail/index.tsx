import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useGetFetcher } from "hooks/UseFetcher";
import { RootState } from "store";
import { setItemDetail, setShowItems } from "store/slices/products";
import styles from "./styles.module.scss";
import ReactLoading from "react-loading";
import { NOT_DESCRIPTION } from "common/constants";
import { formatMoney } from "common/utils";
import { Breadcrumb } from "components/breadcrumb";

export const ItemDetail: React.FC = () => {
  const [showItemDetail, setShowItemDetail] = React.useState<boolean>(false);

  const fetcher = useGetFetcher();

  const dispatch = useDispatch();

  const params = useParams();

  const { idItem, itemDetail, showItems, list } = useSelector(
    (state: RootState) => state.products.initialState
  );

  React.useEffect(() => {
    const fetchItemDetail = async () => {
      const url = `${process.env.REACT_APP_FETCH_ITEMS}/${params.id}`;
      try {
        const response = await fetcher(url);
        if (response) {
          dispatch(setItemDetail(response));
        }
        setShowItemDetail(true);
        dispatch(setShowItems(true));
      } catch (error) {
        console.log(error);
      }
    };
    fetchItemDetail();
  }, []);

  return (
    <div className={styles.container}>
      <Breadcrumb list={list} />
      {showItemDetail && showItems ? (
        <div className={styles.card}>
          {itemDetail.item !== undefined ? (
            <div className={styles.item}>
              <div className={styles.productPrice}>
                <div className={styles.product}>
                  <img
                    src={itemDetail.item.picture}
                    alt="product"
                    width={"650px"}
                    height={"550px"}
                  />
                </div>
                <div className={styles.titlePrice}>
                  <div className={styles.productSell}>
                    {itemDetail.item.condition === "new" ? "Nuevo" : "Usado"} -{" "}
                    {itemDetail.item.sold_quantity} vendidos
                  </div>
                  <div className={styles.title}>{itemDetail.item.title}</div>
                  <div className={styles.price}>
                    {formatMoney(
                      itemDetail.item.price.currency,
                      itemDetail.item.price.amount
                    )}
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
                    : NOT_DESCRIPTION}
                </div>
              </div>
            </div>
          ) : (
            <div>Sin detalle</div>
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
