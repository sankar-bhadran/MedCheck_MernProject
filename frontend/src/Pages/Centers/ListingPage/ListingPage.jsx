import React, { useRef, useEffect } from "react";
import Filter from "../../../Component/Centers/Filter/Filter";
import Header from "../../../Component/Header/Header";
import Footer from "../../../Component/Footer/Footer";
import ListingComponent from "../../../Component/Centers/ListingPage/ListingPage";
import { Box, Grid, TextField } from "@mui/material";
const ListingPage = () => {

  return (
    <div>
      <Header namenav="Select Scans Center" />
      <Grid container p={4} spacing={5}>
        <Grid item lg={4} md={12} order={{ md: 1 }}>
          <Filter />
        </Grid>
        <Grid item lg={8} md={12} order={{ md: 2 }}>
          <ListingComponent />
        </Grid>
      </Grid>
      <Footer />
    </div>
  );
};

export default ListingPage;
