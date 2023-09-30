import React from "react";
import Header from "../../Component/Header/Header";
import Userhome from "../../Component/UserHomePage/Userhomepage";
import Footer from "../../Component/Footer/Footer";

const Userhomepage = () => {
  return (
    <div>
      <Header aboutus="About Us" />
      <Userhome />
      <Footer />
    </div>
  );
};

export default Userhomepage;
