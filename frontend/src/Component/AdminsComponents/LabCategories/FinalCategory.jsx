import React from 'react'
import Box from "@mui/material/Box";
import AdminPanel from "../../../Pages/AdminPages/AdminPanel/adminPanel";
import Navbar from "../AdminNavbar/Navbar";
import LabCategory from './LabCategory';
const FinalCategory = () => {
  return (
    <>
    <Navbar/>
     <Box height={70}/>
     <Box sx={{ display: "flex" }}>
       <AdminPanel />
       <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
         <LabCategory/>
       </Box>
     </Box>
   </>  )
}

export default FinalCategory