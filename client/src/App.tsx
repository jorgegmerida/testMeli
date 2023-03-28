import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Items } from "./components/items";
import { Header } from "./ui";
import { Provider } from "react-redux";
import { store } from "../src/store";
import { ItemDetail } from "./components/items/components/itemDetail";
import { NotFound } from "./components/notFound";

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<></>} />
          <Route path=":search" element={<Items />} />
          <Route path="/items/:id" element={<ItemDetail />} />
          <Route element={<NotFound />} />
        </Routes>
      </Router>
    </Provider>
  );
}
