import React from 'react'
import Box from "@mui/material/Box";
import AdminPanel from "../../../Pages/AdminPages/AdminPanel/adminPanel";
import Navbar from "../AdminNavbar/Navbar";
import PendingList from './PendingList';
const ScanPendingList = () => {
  return (
    <>
    <Navbar />
    <Box height={80} />
    <Box sx={{ display: "flex" }}>
      <AdminPanel />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <PendingList />
      </Box>
    </Box>
  </>  )
}

export default ScanPendingList