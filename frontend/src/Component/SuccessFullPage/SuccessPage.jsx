import React, { useEffect } from "react";
import { Container, Paper, Typography, Button, Box, Grid } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { successPageDetails } from "../../redux/features/userSlice";
import correct from "../../Assets/correct.png";
import download from "../../Assets/down-arrow.png";

const SuccessPage = () => {
  const { id } = useParams();
  const data=useSelector((state)=>state.user.commonData)
  console.log("data",data)
  const dispatch = useDispatch();
   useEffect(()=>{
    dispatch(successPageDetails(id))
   },[])

  console.log("appointmentID",id)
  return (
    <Container sx={{ marginTop: "8%", marginBottom: "8%" }}>
      <Paper
        sx={{
          // boxShadow: "2px 2px 4px #000000",
          padding: "16px", // Adjust the padding as needed
          borderRadius: "10px",
          textAlign: "center",
          border: "1px solid #007aff ",
        }}
        elevation={3}
      >
        <Grid
          container
          sx={{ display: "flex", justifyContent: "center" }}
          direction={"column"}
          spacing={3}
        >
          <Grid item>
            {" "}
            <img src={correct} width="70px" minHeight="70px" />
          </Grid>
          <Grid item sx={{ fontSize: "35px" }}>
            Appointment booked Successfully!
          </Grid>
          <Grid item>
            Appointment booked with <strong>Dr. Darren Elder</strong> <br />
            <strong>on 12 Nov 2023 5:00PM to 6:00PM </strong>
          </Grid>
          <Grid item>
            <Box>
              <Button>
                DownLoad Invoice
                <img
                  src={download}
                  style={{ marginLeft: "5px" }}
                  width="20px"
                  minHeight="20px"
                />
              </Button>
            </Box>
          </Grid>
          <Grid item>
            <Button
              sx={{ border: "1px solid #007aff" }}
              component={Link}
              to="/"
            >
              Back Home
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default SuccessPage;
