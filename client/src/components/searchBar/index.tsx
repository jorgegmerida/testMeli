import * as React from "react";
import { createSearchParams, Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";
import meliLogo from "../../assets/logo_meli.png";
import meliSearch from "../../assets/search.png";
import { useGetFetcher } from "../../hooks/fetcherHook";

interface Props {}

export const SearchBar: React.FC = () => {
  const fetcher = useGetFetcher();
  const navigate = useNavigate();
  const [search, saveSearch] = React.useState<string>("");
  const [shouldFetch, setShouldFetch] = React.useState<boolean>(false);

  const getProducts = async (e) => {
    e.preventDefault();

    const response = await fetcher(
      `http://localhost:5000/api/items?q=${search}`
    );
    // const resFinal = await kresponse
    console.log(response);
    navigate({
      pathname: "/items",
      search: `?${createSearchParams({
        search: search,
      })}`,
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.wrapperLogo}>
          <Link
            //   onClick={clearApplicationState}
            to="/"
          >
            <img src={meliLogo} alt={"LOGO_TITLE"} />
          </Link>
        </div>
        <form onSubmit={getProducts} className={styles.wrapper__search_form}>
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
              style={{ marginLeft: "-20px" }}
            />
          </button>
        </form>
      </div>
    </div>
  );
};
