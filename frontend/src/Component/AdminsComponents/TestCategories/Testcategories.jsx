import React from "react";
import Box from "@mui/material/Box";
import AdminPanel from "../../../Pages/AdminPages/AdminPanel/adminPanel";
import Navbar from "../AdminNavbar/Navbar";
import Categories from "./Categories";

const Testcategories = () => {
  return (
    <>
     <Navbar/>
      <Box height={70}/>
      <Box sx={{ display: "flex" }}>
        <AdminPanel />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Categories/>
        </Box>
      </Box>
    </>
  );
};

export default Testcategories;
