import React from "react";
import Header from "../../../Component/Header/Header";
import StepperComponent from "../../../Component/Centers/Stepper/Stepper";
import { Box, Container } from "@mui/material";
const Stepper = () => {
  return (
    <div>
      <Header />
      <Container sx={{ marginTop: "30px" }}>
        <Box
          sx={{ bgcolor: "#cfe8fc" }}
          style={{ padding: "30px 30px 30px 30px" }}
        >
          <StepperComponent />
        </Box>
      </Container>
    </div>
  );
};

export default Stepper;
