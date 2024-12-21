import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Investments from "../pages/Investments";

export const route = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  // {
  //   path: "login",
  //   element: <Login />
  // },
  {
    path: "investments",
    element: <Investments />
  },
  // {
  //   path: "claims",
  //   element: <Claim />
  // }
]);