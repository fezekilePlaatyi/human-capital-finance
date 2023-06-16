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
import Applications from "../pages/Applications"
import AllApplications from "../components/AllApplications";
import SingleApplication from "../components/SingleApplication"

const router = createBrowserRouter(
  createRoutesFromElements([
    <Route key="/login" path="/" element={<Login />}/>,
    <Route path="/" element={<Home />} children={[
      <Route key="dashboard" path="dashboard" index element={<Dashboard />} />,
      <Route path="applications" element={<Applications />} children={[
        <Route key="all_applications" path="" element={<AllApplications />}/>,
        <Route key="single_application" path="single_application" element={<SingleApplication />} />,
      ]} />
    ]} />,
  ])
);

export default router;
