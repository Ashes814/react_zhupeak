import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import router from "@/router";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "@/store";

import "./theme.css";
// import sum from "@/test";

// console.log(sum(1, 2));

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <RouterProvider router={router}></RouterProvider>
  </Provider>
);
