import React from "react";
import { Container, Grid, Paper, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { getContinue } from "../../../redux/features/CenterSlice";
import { useDispatch } from "react-redux";

function RegistrationCompletePage(props) {
  const dispatch=useDispatch()
  const { isReject, message, verified } = props.data;

  const handleClick=()=>{
    dispatch(getContinue())
  }

  return (
    <Container sx={{ marginTop: "5%" }}>
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={8} md={6}>
          <Paper elevation={3} sx={{ p: 3, boxShadow: 2 }}>
            <Typography variant="h4" align="center" gutterBottom>
              {!verified && !isReject
                ? "YOUR REGISTRATION HAS BEEN COMPLETED"
                : verified
                ? "YOUR REGISTRATION HAS BEEN APPROVED"
                : isReject
                ? "YOUR REGISTRATION HAS BEEN APPROVED"
                : ""}
            </Typography>
            {!verified && !isReject ? (
              <>
                <Typography variant="h5" align="center" gutterBottom>
                  Please wait for admin approval.
                </Typography>
                <Typography align="center" gutterBottom>
                  Your registration process is complete.
                </Typography>
                <Typography align="center" gutterBottom>
                  You will receive a notification once your registration is
                  approved by the admin.
                </Typography>
              </>
            ) : verified ? (
              <>
                <Typography variant="h5" align="center" gutterBottom>
                  Congratulations! Your registration has been approved.
                </Typography>
                <Typography align="center" gutterBottom>
                  You can now enjoy the benefits of our platform.
                </Typography>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "50px",
                  }}
                >
                  <Link to="/centerhomepage">
                    <Button variant="contained" color="primary" size="large" onClick={handleClick}>
                      CONTINUE
                    </Button>
                  </Link>
                </div>
              </>
            ) : isReject ? (
              <>
                <Typography variant="h5" align="center" gutterBottom>
                  We regret to inform you that your registration has been
                  rejected.
                </Typography>
                <Typography align="center" gutterBottom>
                  {`Reason for rejection: ${message}`}
                </Typography>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "50px",
                  }}
                >
                  <Link to="/reapply">
                  <Button variant="contained" color="primary" size="large">
                    REAPPLY
                  </Button>
                  </Link>
                 
                </div>
              </>
            ) : (
              " "
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default RegistrationCompletePage;
