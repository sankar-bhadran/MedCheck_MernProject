import React from "react";
import { Navigate, Outlet } from "react-router-dom";
const CenterRoutes = () => {
    const existingUserJSON = localStorage.getItem("existinguser");
    const existingUser = JSON.parse(existingUserJSON);
    const userType = existingUser.userType;
    if (userType === "recruiter") {
      return <Outlet />;
    } else {
      return <Navigate to="/centerhome" />;
    }
};

export default CenterRoutes;
