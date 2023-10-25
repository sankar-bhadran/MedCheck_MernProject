import React from "react";
import Header from "../../../Component/Header/Header";
import LabCenterDetailPage from "../../../Component/LabCenters/LabDetailPage/LabDetailPage";
import LabDetailPageBackGround from "../../../Component/LabCenters/DetailPageBackGround/LabDetailPageBackGround";

const LabDetailPage = () => {
  return (
    <>
      <Header />
      <LabDetailPageBackGround />
      <LabCenterDetailPage />
    </>
  );
};

export default LabDetailPage;
