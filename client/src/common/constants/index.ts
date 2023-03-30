export const INITIAL_STORE = {
  list: {
    author: { name: "", lastname: "" },
    categories: [],
    items: [],
    filter: { category: [] },
  },
  showItems: false,
  idItem: false,
  itemDetail: {
    author: { name: "", lastname: "" },
    item: {
      id: "",
      title: "",
      price: { currency: "", amount: 0, decimals: 0 },

      picture: "",
      condition: "",
      free_shipping: false,
      sold_quantity: 0,
      description: "",
    },
  },
  search: "",
  errors: false,
  breadCrumb: { id: "", name: "" },
};

export const NOT_DESCRIPTION = "Este producto aún no tiene descripcion";

export const PLACEHOLDER_INPUT = "Nunca dejes de buscar";
