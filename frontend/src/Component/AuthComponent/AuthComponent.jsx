import React from "react";
import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";
const AuthComponent = () => {
  const isLoggedIn = localStorage.getItem("existinguser");
  if (isLoggedIn) {
    return <Outlet />;
  } else {
    return <Navigate to='/adminlogin' />
  }
};

export default AuthComponent;
