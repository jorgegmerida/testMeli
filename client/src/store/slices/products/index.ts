import { createSlice } from "@reduxjs/toolkit";
import { CounterState } from "models";
import { INITIAL_STORE } from "common/constants";

const initialState: CounterState = INITIAL_STORE;

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
