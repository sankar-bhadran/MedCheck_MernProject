import React from "react";
import Header from "../../../Component/Header/Header";
import Footer from "../../../Component/Footer/Footer";
import CartStepperComponent from "../../../Component/Centers/CartStepper/Cartstepper";
import { Box, Container } from "@mui/material";

const Cartstepper = () => {
  return (
    <div>
      <Header />
      <Container sx={{ marginTop: "70px" }}>
        <CartStepperComponent />
      </Container>
      <Footer />
    </div>
  );
};

export default Cartstepper;
