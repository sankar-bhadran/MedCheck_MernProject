import React from "react";
import Header from "../../Component/Header/Header";
import UserLoginform from "../../Component/UserLogin/UserLogin";

const Userlogin = () => {
  return (
    <div>
      <Header namenav="Login" />
      <UserLoginform />
    </div>
  );
};

export default Userlogin;
