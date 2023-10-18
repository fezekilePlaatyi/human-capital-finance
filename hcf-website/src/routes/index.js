import React from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import Welcome from "../pages/Welcome";

const router = createBrowserRouter(
    createRoutesFromElements([
      <Route key="/welcome" path="/" element={<Welcome />}/>,
    ])
);
  
  export default router;