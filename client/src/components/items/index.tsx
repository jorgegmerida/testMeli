import * as React from "react";
import styles from "./styles.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { useGetItemsMoreResults } from "../../hooks/UseItemsMoreResults";

export const Items: React.FC = () => {
  const { list, param } = useSelector((state: RootState) => state.products);
  const { items, categories } = list;
  const itemsMoreResults = useGetItemsMoreResults();
  const itemsFinal = itemsMoreResults(categories, items);

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.items}>
          {itemsFinal.slice(0, 4)?.map((item, index) => {
            return (
              <div key={index} className={styles.item}>
                <img
                  src={item.picture}
                  alt="item"
                  width={"190px"}
                  height={"190px"}
                />
                <div className={styles.itemPriceTitle}>
                  <div className={styles.itemPrice}>{item.price.amount}</div>
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
    </div>
  );
};
