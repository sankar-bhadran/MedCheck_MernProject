import React from "react";
import {
  Box,
  Grid,
  Paper,
  Stack,
  Typography,
  Container,
  Divider,
} from "@mui/material";
import TextField from "@mui/material/TextField";

const Labform = ({ state, setState }) => {
  const handleChange = (event) => {
    const { name, value } = event.target;
    setState((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };
  return (
    <>
      <Grid container>
        <Container sx={{ minHeight: "50vh" }}>
          <Paper
            sx={{
              maxWidth: "1100px",
              margin: "auto",
              marginTop: "50px",
              padding: "20px",
              border: "1px solid #999",
              // display: "flex",
              // flexDirection: "column",
              // alignItems: "center",
            }}
          >
            <Box>
              <Typography
                sx={{
                  margin: "10px",
                  marginBottom: "15px",
                  color: "#1778F2",
                  fontWeight: "bold",
                }}
              >
                Lab Details
              </Typography>
              <Divider
                sx={{
                  width: "100%",
                  backgroundColor: "#c0c0c0",
                  margin: "0 auto 20px auto",
                  marginLeft: "10px",
                  marginRight: "30px",
                }}
              />
              <Stack
                direction="row"
                spacing={15}
                sx={{ marginLeft: "10px", marginBottom: "20px" }}
              >
                <Grid container spacing={3}>
                  <Grid item xs={12} md={4}>
                    <TextField
                      id="outlined-basic"
                      onChange={handleChange}
                      label="Lab Name"
                      name="CenterName"
                      variant="outlined"
                      fullWidth
                      //   sx={{ width: "300px" }}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      id="outlined-basic"
                      onChange={handleChange}
                      label="Contact Number"
                      name="ContactNumber"
                      variant="outlined"
                      fullWidth
                      //   sx={{ width: "300px" }}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      id="outlined-basic"
                      onChange={handleChange}
                      name="PinCode"
                      label="Pin Code"
                      variant="outlined"
                      fullWidth
                      //   sx={{ width: "300px" }}
                    />
                  </Grid>
                </Grid>
              </Stack>
              <Stack
                direction="row"
                spacing={15}
                sx={{ marginLeft: "10px", marginBottom: "20px" }}
              >
                <Grid container spacing={3}>
                  <Grid item xs={12} md={4}>
                    <TextField
                      id="outlined-basic"
                      onChange={handleChange}
                      label="Flat/House Number, Building"
                      name="BuildingName"
                      variant="outlined"
                      fullWidth
                      //   sx={{ width: "300px" }}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      id="outlined-basic"
                      onChange={handleChange}
                      label="Area, Colony, Street"
                      name="Area"
                      variant="outlined"
                      fullWidth
                      //   sx={{ width: "300px" }}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      id="outlined-basic"
                      onChange={handleChange}
                      name="LandMark"
                      label="Landmark"
                      variant="outlined"
                      fullWidth
                      //   sx={{ width: "300px" }}
                    />
                  </Grid>
                </Grid>
              </Stack>
              <Stack
                direction="row"
                spacing={15}
                sx={{ marginLeft: "10px", marginBottom: "20px" }}
              >
                <Grid container spacing={3}>
                  <Grid item xs={12} md={4}></Grid>
                </Grid>
              </Stack>

              <Typography
                sx={{
                  margin: "10px",
                  marginBottom: "15px",
                  color: "#1778F2",
                  fontWeight: "bold",
                }}
              >
                Confrim Your Location
              </Typography>

              <Divider
                sx={{
                  width: "100%",
                  backgroundColor: "#c0c0c0",
                  margin: "0 auto 20px auto",
                  marginLeft: "10px",
                  marginRight: "30px",
                }}
              />
              <Stack
                direction="row"
                spacing={15}
                sx={{ marginLeft: "10px", marginBottom: "20px" }}
              >
                <Grid container spacing={3}>
                  <Grid item xs={12} md={4}>
                    <TextField
                      id="outlined-basic-1"
                      onChange={handleChange}
                      label="Place"
                      name="Place"
                      variant="outlined"
                      fullWidth
                      sx={{ marginBottom: "10px" }}
                    />
                    <TextField
                      id="outlined-basic"
                      onChange={handleChange}
                      name="City"
                      label="City"
                      variant="outlined"
                      fullWidth
                      sx={{ marginBottom: "10px" }}
                    />
                    <TextField
                      id="outlined-basic-1"
                      onChange={handleChange}
                      label="State"
                      name="State"
                      variant="outlined"
                      fullWidth
                      sx={{ marginBottom: "10px" }}
                    />
                  </Grid>
                </Grid>
              </Stack>
            </Box>
          </Paper>
        </Container>
      </Grid>
    </>
  );
};

export default Labform;
