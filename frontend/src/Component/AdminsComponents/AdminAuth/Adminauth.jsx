import React from "react";
import {  Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";

const Adminauth = () => {
    const admin = localStorage.getItem("adminIsLoggedIn");
    console.log("adminIsLoggedIn:", admin);
  
    return admin ? <Outlet /> : <Navigate to="/adminlogin" />;
};

export default Adminauth;
