import * as React from "react";
import styles from "./styles.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import freeShipping from "assets/freeShipping.png";
import {
  setListProducts,
  setShowItems,
  setShowIdItem,
  setSearch,
  clearListProducts,
  setErrors,
} from "store/slices/products";
import { useGetFetcher } from "hooks/UseFetcher";
import { useNavigate, useSearchParams } from "react-router-dom";
import ReactLoading from "react-loading";
import { NotFoundProduct } from "../NotFoundProduct";
import { Item } from "models";
import { formatMoney } from "common/utils";
import { INITIAL_STORE } from "common/constants";
import { Breadcrumb } from "components/breadcrumb";

export const ItemsSearch: React.FC = () => {
  const { list, showItems, search, errors } = useSelector(
    (state: RootState) => state.products.initialState
  );

  const { items, categories, filter } = list;

  const [searchParams] = useSearchParams();

  const fetcher = useGetFetcher();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const paramId = searchParams.get("search");

  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  React.useEffect(() => {
    const fetchItems = async () => {
      dispatch(clearListProducts(INITIAL_STORE.list));
      const url = `${process.env.REACT_APP_FETCH_ITEMS}?q=${paramId}`;
      try {
        const response = await fetcher(url);

        if (response.categories?.length !== 0 || response.items?.length !== 0) {
          dispatch(setListProducts(response));
        } else {
          dispatch(setErrors(true));
        }
      } catch (error) {
        console.log(error);
      }
    };
    dispatch(setShowItems(false));

    if (paramId !== search) {
      dispatch(setErrors(false));
      dispatch(setSearch(paramId));
      fetchItems();
    }
    dispatch(setShowItems(true));
  }, [paramId]);

  const handleDetailItem = async (
    e: React.MouseEvent<HTMLDivElement>,
    item: Item
  ) => {
    e.preventDefault();
    const { id } = item;
    dispatch(setShowItems(false));
    dispatch(setShowIdItem(id));
    navigate(`/items/${id}`);
  };

  return (
    <div className={styles.container}>
      <Breadcrumb list={list} />
      {showItems && items?.length !== 0 ? (
        <div className={styles.card}>
          <div className={styles.items}>
            {items && search !== null ? (
              items?.slice(0, 4)?.map((item: Item, index) => {
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
                          {formatMoney(
                            item.price?.currency,
                            item.price?.amount
                          )}
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
              <div>Sin productos</div>
            )}
          </div>
        </div>
      ) : items?.length === 0 && errors ? (
        <NotFoundProduct />
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
