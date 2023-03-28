import * as React from "react";
import { createSearchParams, Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";
import meliLogo from "../../assets/logo_meli.png";
import meliSearch from "../../assets/search.png";
import { useGetFetcher } from "../../hooks/UseFetcher";
import { useDispatch, useSelector } from "react-redux";
import {
  setListProducts,
  setShowItems,
  setSearch,
} from "../../store/slices/products";
import { RootState } from "../../store";
import { PLACEHOLDER_INPUT } from "../../util/constants";

export const SearchBar: React.FC = () => {
  const fetcher = useGetFetcher();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { search } = useSelector(
    (state: RootState) => state.products.initialState
  );

  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const getProducts = async (e) => {
    e.preventDefault();

    dispatch(setShowItems(false));

    if (search.trim() === "") return;

    const url = `${process.env.REACT_APP_FETCH_ITEMS}?q=${search}`;
    try {
      const response = await fetcher(url);

      dispatch(setListProducts(response));

      if (response.categories?.length !== 0 && response.items?.length !== 0) {
        dispatch(setShowItems(true));
      } else {
        dispatch(setShowItems(true));
      }

      navigate({
        pathname: "/items",
        search: `?${createSearchParams({
          search: search,
        })}`,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handlerClear = () => {
    dispatch(setSearch(""));
  };
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.wrapperLogo}>
          <Link onClick={handlerClear} to="/">
            <img src={meliLogo} alt={"LOGO_TITLE"} />
          </Link>
        </div>
        <form
          onSubmit={(e) => getProducts(e)}
          className={styles.wrapper_search_form}
        >
          <input
            className={styles.wrapper_form_search_input}
            type="text"
            placeholder={PLACEHOLDER_INPUT}
            onChange={(e) => dispatch(setSearch(e.target.value))}
            value={search}
          />
          <button type="submit" className={styles.wrapper_form_search_submit}>
            <img
              src={meliSearch}
              alt={"search"}
              width={"20px"}
              height={"20px"}
              style={{ marginLeft: "-20px", marginTop: "4px" }}
            />
          </button>
        </form>
      </div>
    </div>
  );
};
