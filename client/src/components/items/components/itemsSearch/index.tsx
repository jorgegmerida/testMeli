import * as React from "react";
import styles from "./styles.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { useGetItemsMoreResults } from "hooks/UseItemsMoreResults";
import freeShipping from "assets/freeShipping.png";
import {
  setListProducts,
  setShowItems,
  setShowIdItem,
  setSearch,
} from "store/slices/products";
import { useGetFetcher } from "hooks/UseFetcher";
import { useNavigate, useSearchParams } from "react-router-dom";
import ReactLoading from "react-loading";
import { NotFoundProduct } from "../NotFoundProduct";
import { item } from "models";

export const ItemsSearch: React.FC = () => {
  const { list, showItems, search } = useSelector(
    (state: RootState) => state.products.initialState
  );

  const { items, categories } = list;

  const [searchParams] = useSearchParams();

  const fetcher = useGetFetcher();

  const dispatch = useDispatch();

  const itemsMoreResults = useGetItemsMoreResults();

  const navigate = useNavigate();

  const paramId = searchParams.get("search");

  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  React.useEffect(() => {
    const fetchItems = async () => {
      const url = `${process.env.REACT_APP_FETCH_ITEMS}?q=${paramId}`;
      try {
        const response = await fetcher(url);
        if (paramId !== search) {
          dispatch(setSearch(paramId));
        }
        if (response.categories?.length !== 0 && response.items?.length !== 0) {
          dispatch(setListProducts(response));
        } else {
          dispatch(setListProducts({ author: {}, categories: [], items: [] }));
        }
        dispatch(setShowItems(true));
      } catch (error) {
        console.log(error);
      }
    };
    dispatch(setShowItems(false));
    if (paramId !== search) {
      fetchItems();
    } else {
      dispatch(setShowItems(true));
    }
  }, [paramId]);
  React.useEffect(() => {
    if (categories.length !== 0 && items.length !== 0) {
      const itemsFinal = itemsMoreResults(categories, items);
    }
  }, [items]);

  const handleDetailItem = async (
    e: React.MouseEvent<HTMLDivElement>,
    item: item
  ) => {
    e.preventDefault();
    const { id } = item;
    dispatch(setShowItems(false));
    dispatch(setShowIdItem(id));
    navigate(`/items/${id}`);
  };

  return (
    <div className={styles.container}>
      {showItems ? (
        <div className={styles.card}>
          <div className={styles.items}>
            {items && search !== null ? (
              items?.length !== 0 ? (
                items?.slice(0, 4)?.map((item: item, index) => {
                  return (
                    <div key={index} className={styles.item}>
                      <div
                        style={{ display: "flex" }}
                        onClick={(e) => handleDetailItem(e, item)}
                      >
                        <div className={styles.itemImg}>
                          <img
                            src={item.picture}
                            alt="item"
                            width={"230px"}
                            height={"230px"}
                          />
                        </div>
                        <div className={styles.itemPriceTitle}>
                          <div className={styles.itemPrice}>
                            $ {item.price.amount}
                            {item.free_shipping && (
                              <div style={{ marginLeft: "1rem" }}>
                                <img
                                  src={freeShipping}
                                  alt="item"
                                  width={"24px"}
                                  height={"24px"}
                                />
                              </div>
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
                <NotFoundProduct />
              )
            ) : (
              <div>Sin productos</div>
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
