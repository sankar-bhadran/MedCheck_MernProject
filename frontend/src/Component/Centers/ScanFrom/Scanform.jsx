import React, { useEffect } from "react";
import {
  Box,
  Grid,
  Paper,
  Stack,
  Typography,
  Container,
  Divider,
  Button,
  Autocomplete,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import { getAllLocations } from "../../../redux/features/userSlice";
import { useDispatch, useSelector } from "react-redux";

const Scanform = ({ state, setState }) => {
  const locations = useSelector((state) => state.user.locationData);
  console.log("locations", locations);
  const dispatch = useDispatch();
  const handleChange = (event) => {
    const { name, value } = event.target;
    setState((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  useEffect(() => {
    dispatch(getAllLocations());
  }, []);

  console.log(state);
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
                      value={state.CenterName}
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
                      value={state.ContactNumber}
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
                      value={state.PinCode}
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
                      label="Flat/House Number, Building"
                      onChange={handleChange}
                      value={state.BuildingName}
                      name="BuildingName"
                      variant="outlined"
                      fullWidth
                      //   sx={{ width: "300px" }}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      id="outlined-basic"
                      label="Area, Colony, Street"
                      onChange={handleChange}
                      value={state.Area}
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
                      value={state.LandMark}
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
                      label="Place"
                      onChange={handleChange}
                      value={state.Place}
                      name="Place"
                      variant="outlined"
                      fullWidth
                      sx={{ marginBottom: "10px" }}
                    />
                    <Autocomplete
                      disablePortal
                      id="combo-box-category"
                      getOptionLabel={(option) => option}
                      options={
                        locations
                          ? locations
                              .map((category) => category.location)
                              .flat()
                          : []
                      }
                      value={state.Place} // Set the value explicitly
                      onChange={(event, newValue) => {
                        setState((prevUserData) => ({
                          ...prevUserData,
                          City: newValue,
                        }));
                      }}
                      sx={{ marginBottom: "10px" }}
                      renderInput={(params) => (
                        <TextField {...params} label="City" name="City" />
                      )}
                    />
                    <TextField
                      id="outlined-basic-1"
                      label="State"
                      onChange={handleChange}
                      value={state.State}
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

export default Scanform;
