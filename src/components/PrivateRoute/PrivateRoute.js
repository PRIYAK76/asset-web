// PrivateRoute.js
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const username = localStorage.getItem("userName");

  // If username is not in localStorage (i.e., not logged in), redirect to login page
  if (!username) {
    return <Navigate to="/Login" />;
  }

  // If logged in, render the child components (protected routes)
  return <Outlet />;
};

export default PrivateRoute;
