import React from "react";
import Header from "../../Component/Header/Header";
import Footer from "../../Component/Footer/Footer";
import Usertabcomponent from "../../Component/userTabs/UserTab";
import { Box, Container } from "@mui/material";
const UserTabs = () => {
  return (
    <div>
      <Header />
      <Container sx={{ minHeight: "100vh" }}>
        <Box sx={{ width: "100%", marginTop: "20px" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Usertabcomponent />
          </Box>
        </Box>
      </Container>
      <Footer />
    </div>
  );
};

export default UserTabs;
