import React from "react";
import { RouterProvider } from "react-router-dom";
import { useSelector } from "react-redux";
import router from "./routes";

const App = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <RouterProvider router={router} />
  );
};

export default App;
