import React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Labform from "../LabForm/Labform";
import Labcertificate from "../LabCertificate/Labcertificate";
import Labphoto from "../LabPhoto/Labphoto";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerLab } from "../../../redux/features/labSlice";
const steps = [
  "Enter Lab Details",
  "Upload Lab Center Photos",
  "Upload Certificates",
];

const Labstepper = () => {
  const dispatch=useDispatch()
  const [centersData, setCentersData] = useState();
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
    console.log(formData);

    dispatch(registerLab(formData))


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
              <Button onClick={() => navigate("/centerhomepage")}>
                Finish
              </Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            {/* <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography> */}
            {activeStep === 0 && (
              < Labform state={centersData} setState={setCentersData} />
            )}
            {activeStep === 1 && (
              <Labphoto state={centersData} setState={setCentersData} />
            )}
            {activeStep === 2 && (
              <Labcertificate state={centersData} setState={setCentersData} />
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
  };


export default Labstepper;
