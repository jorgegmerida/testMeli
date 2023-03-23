import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Items } from "./components/items";
import { Header } from "./UI";

export default function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/*" element={<></>} />
        <Route path="/:search" element={<Items />} />
        {/* <Route path="/items/:id" element={<EditarCliente />} /> */}
      </Routes>
    </Router>
  );
}
