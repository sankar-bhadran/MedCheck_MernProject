import React from "react";
import Box from "@mui/material/Box";
import AdminPanel from "../../../Pages/AdminPages/AdminPanel/adminPanel";
import Navbar from "../AdminNavbar/Navbar";
import CenterDetailPage from "./CenterDetailPage";
const ViewDetailPage = () => {
  return (
    <div>
      <>
        <Navbar />
        <Box height={70} />
        <Box sx={{ display: "flex" }}>
          <AdminPanel />
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <CenterDetailPage />
          </Box>
        </Box>
      </>
    </div>
  );
};


export default ViewDetailPage;
