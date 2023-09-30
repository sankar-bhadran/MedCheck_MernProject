import React from "react";
import Box from "@mui/material/Box";
import AdminPanel from "../../../Pages/AdminPages/AdminPanel/adminPanel";
import Navbar from "../AdminNavbar/Navbar";
import ApprovelList from "./ApprovelList";
const Testdetails = () => {
  return (
    <>
      <Navbar />
      <Box height={80} />
      <Box sx={{ display: "flex" }}>
        <AdminPanel />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <ApprovelList />
        </Box>
      </Box>
    </>
  );
};

export default Testdetails;
