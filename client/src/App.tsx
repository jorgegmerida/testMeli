import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ItemsSearch } from "./components/Items/components/ItemsSearch";
import { Header } from "./ui";
import { Provider } from "react-redux";
import { store } from "../src/store";
import { ItemDetail } from "./components/Items/components/ItemDetail";
import { NotFound } from "./components/NotFound";
import { Items } from "./components/Items";
import { RootApp } from "./components/RootApp";

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<RootApp />}>
            <Route path="/items" element={<Items />}>
              <Route path="?" element={<ItemsSearch />} />
              <Route path=":id" element={<ItemDetail />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
}
