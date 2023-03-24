import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./slices/products";

export const store = configureStore({
  reducer: {
    products: productSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
