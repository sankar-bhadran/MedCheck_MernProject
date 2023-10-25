import { Box, Button, Grid, Typography } from "@mui/material";
import ErrorImage from "../../Assets/error404.png";
import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <Box>
      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        direction={"column"}
      >
        <Box
          sx={{
            height: "100vh",
            width: "100%",
            // border: "5px solid #2198ff",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Grid
            container
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            direction={"column"}
          >
            <Grid item lg={12} mb={-5}>
              <img src={ErrorImage} width="500px" />
            </Grid>
            <Grid item lg={12}>
              <Typography variant="h6">404</Typography>
            </Grid>
            <Grid item>
              <Typography variant="h4" sx={{ color: "#00babb" }}>
                ERROR
              </Typography>
            </Grid>
            <Grid item mt={2}>
              <Typography variant="h4">
                Oops, looks like this page doesn't exist.
              </Typography>
            </Grid>
            <Grid item mt={2}>
              <Typography variant="caption">Click here to go the</Typography>
            </Grid>
            <Grid item mt={2}>
              <Button
                sx={{
                  backgroundColor: "#2198ff",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "#2198ff",
                  },
                }}
                component={Link}
                to="/"
              >
                Home Page
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Box>
  );
};

export default ErrorPage;
