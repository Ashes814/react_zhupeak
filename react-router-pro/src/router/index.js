import Login from "../page/Login";
import Article from "../page/Article";
import {
  createBrowserRouter,
  RouterProvider,
  createHashRouter,
} from "react-router-dom";
import { Layout } from "../page/Layout";
import { About } from "../page/About";
import { Board } from "../page/Board";
import { NotFound } from "../page/NotFound";

const router = createHashRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "about", element: <About /> },
      { index: true, element: <Board /> },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  { path: "/article/:id/:name", element: <Article /> },
  { path: "*", element: <NotFound /> },
]);

export default router;
