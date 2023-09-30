import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Scanform from "../ScanFrom/Scanform";
import Scanphoto from "../ScanPhoto/Scanphoto";
import Scancertificate from "../ScanCertificate/Scancertificate";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { scanRegister } from "../../../redux/features/admiSlice";
import { reApply } from "../../../redux/features/CenterSlice";
const steps = [
  "Enter Lab Details",
  "Upload Scan Center Photos",
  "Upload Certificates",
];

export default function HorizontalLinearStepper() {
  const dispatch = useDispatch();
  const centerData = useSelector((state) => state.center.Centerdata);
  const initialData = centerData?.reject ? centerData : {};
  const [centersData, setCentersData] = useState(initialData);
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const navigate = useNavigate();
  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = () => {
    console.log("CENTERDATA", centersData);
    console.log("centersData.isreject", centersData.isreject);
    handleNext();
    const formData = new FormData();
    // for (const key in centersData) {
    //   console.log(centerData[key])
    //   if (centersData.hasOwnProperty(key)) {
    //     formData.append(key, centersData[key]);
    //   }
    // }
    for (const key in centersData) {
      if (centersData.hasOwnProperty(key)) {
        if (key === 'CertificateImages') {
          centersData[key].forEach((certificate, index) => {
            for (const certKey in certificate) {
              if (certificate.hasOwnProperty(certKey)) {
                formData.append(certKey, certificate[certKey]);
              }
            }
          });
        } else {
          formData.append(key, centersData[key]);
        }
      }
    }
    console.log("hai", formData.get("CenterImages"));
    console.log("hai", formData.get("CertificateImages.0"));
    console.log("hai", formData.get("CenterName"));

    if (centersData.isreject) {
      dispatch(reApply(formData));
    } else {
      dispatch(scanRegister(formData));
    }

    console.log(formData);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = <Typography variant="caption"></Typography>;
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={() => navigate("/centerhomepage")}>Finish</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          {/* <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography> */}
          {activeStep === 0 && (
            <Scanform state={centersData} setState={setCentersData} />
          )}
          {activeStep === 1 && (
            <Scanphoto state={centersData} setState={setCentersData} />
          )}
          {activeStep === 2 && (
            <Scancertificate state={centersData} setState={setCentersData} />
          )}
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />

            <Button
              onClick={
                activeStep === steps.length - 1 ? handleSubmit : handleNext
              }
            >
              {activeStep === steps.length - 1 ? "Finish" : "Next"}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}
