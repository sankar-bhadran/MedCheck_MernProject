import React, { useEffect } from "react";
import Steppercomponent from "../Stepper/Stepper";
import Tabs from "../Tabs/Tabs";
import Header from "../../Header/Header";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { useSelector } from "react-redux/es/hooks/useSelector";
import RegistrationCompletePage from "../Approvel/RegistraionComp";
import { useDispatch } from "react-redux";
import { getScanDetails } from "../../../redux/features/CenterSlice";

const Scanregistration = () => {
  const dispatch = useDispatch();
  const centerData = useSelector((state) => state.center.Centerdata);
  // console.log("centerData", centerData);
  // console.log(centerData?.isSubmitted);
  // console.log(centerData?._id);
  // console.log(centerData?.isVerified);
  // console.log("reject", centerData?.isreject);
  console.log("isContinue", centerData?.isContinue);

  useEffect(() => {
    dispatch(getScanDetails());
  }, []);

  return (
    <div>
      <Header />
      <Container sx={{ marginTop: "30px" }}>
        <Box
          sx={{ bgcolor: "#cfe8fc" }}
          style={{ padding: "30px 30px 30px 30px" }}
        >
          {centerData?.isContinue ? (
            <Tabs labId={centerData?._id} />
          ) : centerData?.isSubmitted ? (
            <RegistrationCompletePage
              data={{
                isReject: centerData?.isreject,
                message: centerData?.message,
                verified: centerData?.isVerified,
              }}
            />
          ) : (
            <Steppercomponent />
          )}
        </Box>
      </Container>
    </div>
  );
};

export default Scanregistration;
