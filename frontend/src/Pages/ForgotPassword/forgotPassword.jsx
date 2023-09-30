import React from "react";
import ForgotPasswordForm from "../../Component/ForgotPassword/forgotPassword";
import Header from "../../Component/Header/Header";

const ForgotPassword = () => {
  return (
    <div>
      <Header namenav={"Forgot Password"} />
      <ForgotPasswordForm />
    </div>
  );
};

export default ForgotPassword;
