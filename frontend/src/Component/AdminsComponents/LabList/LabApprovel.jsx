import React from "react";
import Box from "@mui/material/Box";
import AdminPanel from "../../../Pages/AdminPages/AdminPanel/adminPanel";
import Navbar from "../AdminNavbar/Navbar";
import LabApprovelList from "./LabApprovelList";

const LabApprovel = () => {
  return (
    <>
      <Navbar />
      <Box height={80} />
      <Box sx={{ display: "flex" }}>
        <AdminPanel />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <LabApprovelList />
        </Box>
      </Box>
    </>
  );
};

export default LabApprovel;
