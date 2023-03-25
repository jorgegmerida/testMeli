import * as React from "react";
import styles from "./styles.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { useGetItemsMoreResults } from "../../hooks/UseItemsMoreResults";
import freeShipping from "../../assets/freeShipping.png";
import {
  setListProducts,
  setShowItems,
  setShowIdItem,
  setItemDetail,
} from "../../store/slices/products";
import { useGetFetcher } from "../../hooks/UseFetcher";
import { useNavigate, useSearchParams } from "react-router-dom";
import ReactLoading from "react-loading";
import searchBad from "../../assets/searchBad.png";

export const Items: React.FC = () => {
  const { list, showItems } = useSelector((state: RootState) => state.products);

  const { items, categories } = list;

  const [searchParams] = useSearchParams();

  const fetcher = useGetFetcher();

  const dispatch = useDispatch();

  const itemsMoreResults = useGetItemsMoreResults();

  const navigate = useNavigate();

  React.useEffect(() => {
    const param = searchParams.get("search");
    const fetchItems = async () => {
      if (list.items.length === 0) {
        try {
          const response = await fetcher(
            `${process.env.REACT_APP_FETCH_ITEMS}?q=${param}`
          );
          if (
            response.categories?.length !== 0 &&
            response.items?.length !== 0
          ) {
            dispatch(setShowItems(true));
            dispatch(setListProducts(response));
          } else {
            dispatch(setShowItems(true));
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        dispatch(setShowItems(true));
      }
    };
    fetchItems();
  }, []);

  React.useEffect(() => {
    if (categories.length !== 0 && items.length !== 0) {
      const itemsFinal = itemsMoreResults(categories, items);
    }
  }, [items]);

  const handleDetailItem = async (item) => {
    const { id } = item;
    dispatch(setShowItems(false));
    const response = await fetcher(
      `${process.env.REACT_APP_FETCH_ITEMS}/${id}`
    );
    if (response) {
      dispatch(setItemDetail(response));
      dispatch(setShowIdItem(id));
      navigate(`/items/${id}`);
    } else {
      dispatch(setShowItems(true));
    }
  };

  return (
    <div className={styles.container}>
      {showItems ? (
        <div className={styles.card}>
          <div className={styles.items}>
            {items.length !== 0 ? (
              items.slice(0, 4)?.map((item, index) => {
                return (
                  <div key={index} className={styles.item}>
                    <div
                      style={{ display: "flex" }}
                      onClick={(e) => handleDetailItem(item)}
                    >
                      <div className={styles.itemImg}>
                        <img
                          src={item.picture}
                          alt="item"
                          width={"260px"}
                          height={"290px"}
                        />
                      </div>
                      <div className={styles.itemPriceTitle}>
                        <div className={styles.itemPrice}>
                          $ {item.price.amount}
                          {item.free_shipping ? (
                            <div style={{ marginLeft: "1rem" }}>
                              <img
                                src={freeShipping}
                                alt="item"
                                width={"24px"}
                                height={"24px"}
                              />
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                        <div className={styles.itemTitle}>{item.title}</div>
                      </div>
                    </div>
                    <div className={styles.itemState}>
                      <div>{item.state}</div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className={styles.containerBad}>
                <div className={styles.containerImgSearchBad}>
                  <img
                    src={searchBad}
                    alt="busqueda"
                    width={"80px"}
                    height={"80px"}
                  />
                </div>
                <div className={styles.descriptionBad}>
                  <div className={styles.titleBad}>
                    No hay publicaciones que coincidan con tu búsqueda.
                  </div>
                  <div className={styles.containerUlBad}>
                    <ul>
                      <li>
                        <b>Revisá la ortografía</b>de la palabra.
                      </li>
                      <li>
                        Utilizá <b>palabras más genéricas</b> ó menos palabras.
                      </li>
                      <li>
                        Navegá por las categorías para encontrar un producto
                        similar
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
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
