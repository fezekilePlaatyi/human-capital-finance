import React from "react";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Login from "../pages/Login"
import Home from "../pages/Home"
import Dashboard from "../pages/Dashboard"
import AllApplications from "../pages/AllApplications"

const router = createBrowserRouter(
  createRoutesFromElements([
    <Route key="/login" path="/" element={<Login />}/>,
    <Route path="/" element={<Home />} children={[
      <Route key="dashboard" path="dashboard" index element={<Dashboard />} />,
      <Route key="all_applications" path="all_applications" element={<AllApplications />} />
    ]} />,
  ])
);

export default router;
