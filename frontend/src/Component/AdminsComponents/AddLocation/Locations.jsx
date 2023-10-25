import React from "react";
import Box from "@mui/material/Box";
import AdminPanel from "../../../Pages/AdminPages/AdminPanel/adminPanel";
import Navbar from "../AdminNavbar/Navbar";
import Addlocation from "./Addlocation";

const Locations = () => {
  return (
    <>
      <Navbar />
      <Box height={70} />
      <Box sx={{ display: "flex" }}>
        <AdminPanel />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Addlocation />
        </Box>
      </Box>
    </>
  );
};

export default Locations;
