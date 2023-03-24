import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "products",
  initialState: {
    list: { author: {}, categories: [], items: [] },
    param: "",
  },
  reducers: {
    setListProducts: (state, action) => {
      state.list = action.payload;
    },
    setParam: (state, action) => {
      state.param = action.payload;
    },
  },
});

export const { setListProducts } = productSlice.actions;
export const { setParam } = productSlice.actions;

export default productSlice.reducer;
