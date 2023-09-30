import React from "react";
import { Navigate, Outlet } from "react-router-dom";
const UserRoutes = () => {
  const existingUserJSON = localStorage.getItem("existinguser");
  const existingUser = JSON.parse(existingUserJSON);
  const userType = existingUser.userType;
  if (userType === "user") {
    return <Outlet />;
  } else {
    return <Navigate to="/login" />;
  }
};

export default UserRoutes;
