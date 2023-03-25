import * as React from "react";
import { createSearchParams, Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";
import meliLogo from "../../assets/logo_meli.png";
import meliSearch from "../../assets/search.png";
import { useGetFetcher } from "../../hooks/UseFetcher";
import { useDispatch, useSelector } from "react-redux";
import { setListProducts, setShowItems } from "../../store/slices/products";

export const SearchBar: React.FC = () => {
  const fetcher = useGetFetcher();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [search, saveSearch] = React.useState<string>("");
  const [shouldFetch, setShouldFetch] = React.useState<boolean>(false);

  const getProducts = async (e) => {
    e.preventDefault();

    dispatch(setShowItems(false));

    if (search.trim() === "") return;

    const response = await fetcher(
      `${process.env.REACT_APP_FETCH_ITEMS}?q=${search}`
    );

    dispatch(setListProducts(response));

    navigate({
      pathname: "/items",
      search: `?${createSearchParams({
        search: search,
      })}`,
    });

    if (response.categories?.length !== 0 && response.items?.length !== 0) {
      dispatch(setShowItems(true));
    } else {
      dispatch(setShowItems(true));
    }
  };

  const handlerClear = () => {
    saveSearch("");
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.wrapperLogo}>
          <Link onClick={handlerClear} to="/">
            <img src={meliLogo} alt={"LOGO_TITLE"} />
          </Link>
        </div>
        <form onSubmit={getProducts} className={styles.wrapper_search_form}>
          <input
            className={styles.wrapper_form_search_input}
            type="text"
            placeholder={"Nunca dejes de buscar"}
            onChange={(e) => saveSearch(e.target.value)}
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
