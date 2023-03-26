import { createSlice } from "@reduxjs/toolkit";
import { item, ItemDes, list } from "../../../models";

export interface CounterState {
  list: list;
  showItems: boolean;
  idItem: string;
  itemDetail: ItemDes;
  search: string;
}

const initialState: CounterState = {
  list: { author: { name: "", lastname: "" }, categories: [], items: [] },
  showItems: false,
  idItem: "",
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
};

export const productSlice = createSlice({
  name: "products",
  initialState: {
    initialState,
  },
  reducers: {
    setListProducts: (state, action) => {
      state.initialState.list = action.payload;
    },
    setShowItems: (state, action) => {
      state.initialState.showItems = action.payload;
    },
    setShowIdItem: (state, action) => {
      state.initialState.idItem = action.payload;
    },
    setItemDetail: (state, action) => {
      state.initialState.itemDetail = action.payload;
    },
    setSearch: (state, action) => {
      state.initialState.search = action.payload;
    },
  },
});

export const { setListProducts } = productSlice.actions;
export const { setShowItems } = productSlice.actions;
export const { setShowIdItem } = productSlice.actions;
export const { setItemDetail } = productSlice.actions;
export const { setSearch } = productSlice.actions;

export default productSlice.reducer;
