/* Hook para obtener la categoria del item y armar el breadcrumb en detalle de producto*/

import { Icategory, Item, List } from "models";

export const UseGetCategory = () => {
  const categoryItem = (
    categories: string[],
    items: Item[],
    itemId: string,
    category: Icategory[]
  ) => {
    let categoryResult = "";
    let categoryItem: Icategory = { id: "", name: "" };

    categories.map((e: string) => {
      items.map((i: Item) => {
        if (i.id === itemId) {
          categoryResult = e;
        }
      });
    });

    category.map((c) => {
      if (c.id === categoryResult) {
        categoryItem = c;
      }
    });

    return categoryItem;
  };
  return categoryItem;
};
