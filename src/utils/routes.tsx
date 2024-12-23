import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";

import Dashboard from "../pages/Dashboard";
import { ReferralsList } from "../pages/ReferralsList";
import { InvestmentsList } from "../pages/InvestmentsList";

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
    element: <InvestmentsList />
  },
  {
    path: "dashboard",
    element: <Dashboard />
  },  {
    path: "referals",
    element: <ReferralsList />
  },
  
  // {
  //   path: "claims",
  //   element: <Claim />
  // }
]);