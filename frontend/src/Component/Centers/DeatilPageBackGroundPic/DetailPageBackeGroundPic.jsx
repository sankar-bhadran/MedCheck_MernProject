import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import Pic from "../../../Assets/Screenshot 2023-09-18 110353.png";

const DetailPageBackeGroundPic = () => {
  return (
    <>
      <Grid
        container
        sx={{
          background:
            "linear-gradient(264.65deg, #66A8FC 2.28%, #2975D5 45.23%, #0E54AD 99.3%)",
          height: "200px",
        }}
      >
        <Grid
          item
          xs={12}
          lg={12}
          sx={{
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <Grid item xs={12} sm={6} md={6} sx={{ margin: "40px" }}>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: "30px", sm: "40px", md: "50px" },
                color: "#ffff",
              }}
            >
              Book Radiology
            </Typography>
            <Typography sx={{ color: "#ffff" }}>
              Stay One Step ahead by reducing the risk of diseases
            </Typography>
            <Typography sx={{ color: "#ffff" }}>
              Get your health check-up done now.
            </Typography>
          </Grid>
          <Grid item sx={{ display: { xs: "none", sm: "block", md: "block" } }}>
            <img
              src={Pic}
              alt="Radiology"
              style={{
                width: "250px",
                height: "200px",
                opacity: "0.7",
                borderRadius: "10px",
              }}
            />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default DetailPageBackeGroundPic;
