import React from 'react'
import Header from "../../../Component/Header/Header";
import Footer from "../../../Component/Footer/Footer";
import LabCartStepper from '../../../Component/LabCenters/LabCartStepper/LabCartStepper'
import { Container } from '@mui/material';
const CartStepper = () => {
  return (
    <div>
    <Header />
    <Container sx={{ marginTop: "70px" }}>
      <LabCartStepper />
    </Container>
    <Footer />
  </div>
  )
}

export default CartStepper