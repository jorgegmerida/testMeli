import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import {
  axiosInterceptor,
  axiosRequestInterceptor,
} from "./config/interceptors";

axiosRequestInterceptor();
axiosInterceptor();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
