import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "products",
  initialState: {
    list: { author: {}, categories: [], items: [] },
    showItems: false,
    idItem: "",
    itemDetail: {
      author: { name: "", lastname: "" },
      item: {
        id: "",
        title: "",
        price: { currency: "", amount: 0, decimals: 0 },

        picture: "",
        codition: "",
        free_shipping: false,
        sold_quantiti: 0,
        description: "",
      },
    },
  },
  reducers: {
    setListProducts: (state, action) => {
      state.list = action.payload;
    },
    setShowItems: (state, action) => {
      state.showItems = action.payload;
    },
    setShowIdItem: (state, action) => {
      state.idItem = action.payload;
    },
    setItemDetail: (state, action) => {
      state.itemDetail = action.payload;
    },
  },
});

export const { setListProducts } = productSlice.actions;
export const { setShowItems } = productSlice.actions;
export const { setShowIdItem } = productSlice.actions;
export const { setItemDetail } = productSlice.actions;

export default productSlice.reducer;
