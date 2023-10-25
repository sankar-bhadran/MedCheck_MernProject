import React from "react";
import Header from "../../Component/Header/Header";
import Footer from "../../Component/Footer/Footer";
import OrderSuccessPage from "../../Component/SuccessFullPage/SuccessPage";

const OrderComfirmationPage = () => {
  return (
    <div>
      <Header />
      <OrderSuccessPage />
      <Footer />
    </div>
  );
};

export default OrderComfirmationPage;
