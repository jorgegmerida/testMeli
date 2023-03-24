import * as React from "react";
import styles from "./styles.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { useGetItemsMoreResults } from "../../hooks/UseItemsMoreResults";
import freeShipping from "../../assets/freeShipping.png";
import { setListProducts, setParam } from "../../store/slices/products";
import { useGetFetcher } from "../../hooks/UseFetcher";
import { useSearchParams } from "react-router-dom";
import ReactLoading from "react-loading";

export const Items: React.FC = () => {
  const [showItems, setShowItems] = React.useState<boolean>(false);
  const { list, param } = useSelector((state: RootState) => state.products);
  const { items, categories } = list;
  const [searchParams, setSearchParams] = useSearchParams();
  const fetcher = useGetFetcher();
  const dispatch = useDispatch();
  const itemsMoreResults = useGetItemsMoreResults();

  React.useEffect(() => {
    const param = searchParams.get("search");
    const fetchItems = async () => {
      const response = await fetcher(
        `http://localhost:5000/api/items?q=${param}`
      );
      if (response.categories?.length !== 0 && response.items?.length !== 0) {
        setShowItems(true);
      }
      dispatch(setListProducts(response));
    };
    fetchItems();
  }, []);

  React.useEffect(() => {
    if (categories.length !== 0 && items.length !== 0) {
      const itemsFinal = itemsMoreResults(categories, items);
    }
  }, [items]);

  React.useEffect(() => {
    {
      setTimeout(() => {
        setShowItems(!showItems);
      }, 5000);
    }
  }, []);

  return (
    <div className={styles.container}>
      {showItems ? (
        <div className={styles.card}>
          <div className={styles.items}>
            {items.slice(0, 4)?.map((item, index) => {
              return (
                <div key={index} className={styles.item}>
                  <img
                    src={item.picture}
                    alt="item"
                    width={"260px"}
                    height={"290px"}
                  />
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
                  <div className={styles.itemState}>
                    <div>{item.state}</div>
                  </div>
                </div>
              );
            })}
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
