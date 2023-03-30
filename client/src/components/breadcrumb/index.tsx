import { Icategory, List } from "models";
import * as React from "react";
import styles from "./styles.module.scss";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { UseGetCategory } from "hooks/UseGetCategory";

interface Props {
  list: List;
}

export const Breadcrumb: React.FC<Props> = ({ list }) => {
  const [categoryItem, setCategoryItem] = React.useState<Icategory>({
    id: "",
    name: "",
  });

  const location = useLocation();

  const dispath = useDispatch();

  const { category } = list.filter;

  const getCategories = UseGetCategory();

  const { search, itemDetail } = useSelector(
    (state: RootState) => state.products.initialState
  );

  React.useEffect(() => {
    const categoryItem = getCategories(
      list?.categories,
      list?.items,
      itemDetail.item?.id,
      category
    );
    setCategoryItem(categoryItem);
  }, [itemDetail.item?.id]);

  return (
    <div className={styles.container}>
      {location.pathname !== `/items/${itemDetail.item?.id}` ? (
        category?.map((cat, index) => {
          return (
            <div key={index} className={styles.category} id={"category"}>
              <Link
                to={`/items?search=${search}`}
                className={
                  location.pathname === "/"
                    ? styles.breadcrumbActive
                    : styles.breadcrumbNotActive
                }
              >
                {cat.name}{" "}
                {index < list.filter?.category.length - 1 && (
                  <span className={styles.breadcrumbArrow}>&gt;</span>
                )}
              </Link>
            </div>
          );
        })
      ) : (
        <div className={styles.category}>
          <Link
            to={`/items?search=${search}`}
            className={
              location.pathname === "/"
                ? styles.breadcrumbActive
                : styles.breadcrumbNotActive
            }
          >
            {categoryItem?.name}{" "}
          </Link>
        </div>
      )}
    </div>
  );
};
