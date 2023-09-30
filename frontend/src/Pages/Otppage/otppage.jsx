import React from "react";
import Header from "../../Component/Header/Header";
import Otp from "../../Component/Otppage/otppage";

function otppage() {
  return (
    <div>
      <Header namenav={"Verification"} />
      <Otp />
    </div>
  );
}

export default otppage;
