import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./slices/products";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/es/storage";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, productSlice);

export const store = configureStore({
  reducer: {
    products: persistedReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
