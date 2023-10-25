import React, { useEffect } from "react";
import Labstepper from "../LabStepper/Labstepper";
import Header from "../../Header/Header";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { useDispatch, useSelector } from "react-redux";
import { allDetails } from "../../../redux/features/labSlice";
import LabComfirmationPage from "../LabApproval/LabRegistrationComp";
import LabTabs from "../Tabs/LabTabs";
const Labregistration = () => {
  const dispatch = useDispatch();
  const labData = useSelector((state) => state.labcenter.labData);
  console.log("labData", labData);
  console.log("labData", labData?.isContinue);

  useEffect(() => {
    dispatch(allDetails());
  }, []);

  return (
    <div>
      <Header />
      <Container sx={{ marginTop: "30px" }}>
        <Box
          sx={{ bgcolor: "#cfe8fc" }}
          style={{ padding: "30px 30px 30px 30px" }}
        >
          {labData?.isContinue ? (
            <LabTabs labId={labData?._id} />
          ) : labData?.isSubmitted ? (
            <LabComfirmationPage
              data={{
                isReject: labData?.isreject,
                message: labData?.message,
                verified: labData?.isVerified,
              }}
            />
          ) : (
            <Labstepper />
          )}
        </Box>
      </Container>
    </div>
  );
};

export default Labregistration;
