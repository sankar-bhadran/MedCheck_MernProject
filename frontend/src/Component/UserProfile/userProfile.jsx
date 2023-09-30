import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Paper,
  Stack,
  Typography,
  Container,
  Divider,
  Button,
  TextField,
  IconButton,
  Link,
} from "@mui/material";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import InputAdornment from "@mui/material/InputAdornment";
import { useDispatch, useSelector } from "react-redux";
import { getuser, addressDelete } from "../../redux/features/userSlice";
import { updateProfile } from "../../redux/features/userSlice";
import Addaddress from "../AddAddress/Addaddress";

const UserProfile = () => {
  const userdata = useSelector((state) => state.user?.userData);
  const updateData = useSelector((state) => state.user);
  const addressData = useSelector((state) => state.user);
  console.log("gotdata", userdata);

  const dispatch = useDispatch();
  // console.log("userdata", userdata);
  const [value, setValue] = React.useState(0);
  useEffect(() => {
    setUserData(userdata);
  }, [userdata]);
  const [userData, setUserData] = useState(userdata);
  console.log("updated", userData);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(getuser());
  }, [updateData.actionStatus]);

  useEffect(() => {
    dispatch(getuser());
  }, [addressData.actionStatus]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  const handleUpdate = () => {
    handleClose();
    dispatch(updateProfile(userData));
  };

  const handleChangeTabs = (event, newValue) => {
    setValue(newValue);
  };

  const handleButtonClick = (data) => {
    dispatch(addressDelete(data));
  };

  return (
    <>
      <Grid container>
        <Container sx={{ minHeight: "100vh" }}>
          <Box sx={{ width: "100%", marginTop: "20px" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChangeTabs}
                aria-label="basic tabs example"
              >
                <Tab label="User Profile" />
                <Tab label="My Reports" />
                <Tab label="My Orders" />
              </Tabs>
            </Box>
          </Box>
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
                Basic Information
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
              <Stack direction="row" spacing={15}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={4}>
                    <Typography
                      sx={{ textAlign: "center", fontWeight: "bold" }}
                    >
                      USER NAME
                      <Typography>{userdata?.username}</Typography>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Typography
                      sx={{ textAlign: "center", fontWeight: "bold" }}
                    >
                      EMAIL ADDRESS
                      <Typography>{userdata?.email}</Typography>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Typography
                      sx={{ textAlign: "center", fontWeight: "bold" }}
                    >
                      PHONE NUMBER
                      <Typography>{userdata?.phonenumber}</Typography>
                    </Typography>
                  </Grid>
                  <Button
                    sx={{
                      margin: "40px",
                      backgroundColor: "#1778F2",
                      color: "white",
                      "&:hover": {
                        backgroundColor: "#1778F2",
                        color: "white",
                      },
                    }}
                    variant="outlined"
                    onClick={handleClickOpen}
                  >
                    Update Information
                  </Button>
                </Grid>
              </Stack>
            </Box>
            <Box>
              <Typography
                sx={{
                  margin: "30px",
                  marginBottom: "15px",
                  color: "#1778F2",
                  fontWeight: "bold",
                }}
              >
                Your Addresses
              </Typography>
              <Divider
                sx={{
                  width: "98%",
                  backgroundColor: "#c0c0c0",
                  margin: "0 auto 20px auto",
                  marginLeft: "10px",
                  marginRight: "30px",
                }}
              />
              <Stack direction="row" spacing={15}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={4}>
                    <Box
                      sx={{
                        display: "flex",
                        "& > :not(style)": {
                          m: 1,
                          width: 220,
                          height: 200,
                          marginLeft: "60px",
                          // maxWidth: 220,
                          border: "2px dashed gray",
                        },
                      }}
                    >
                      <Typography
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          height: "100%",
                          color: "#1778F2",
                          fontWeight: "bold",
                        }}
                      >
                        <Addaddress />
                      </Typography>
                    </Box>
                  </Grid>
                  {userdata?.addressDetails &&
                  userdata.addressDetails.length > 0 ? (
                    userdata.addressDetails.map((address, index) => (
                      <Grid item xs={12} md={4} key={index}>
                        <Box
                          sx={{
                            display: "flex",
                            "& > :not(style)": {
                              m: 1,
                              width: 300,
                              height: 200,
                              marginLeft: "60px",
                              border: "2px dashed gray",
                            },
                          }}
                        >
                          <Stack>
                            <Typography
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                height: "100%",
                              }}
                            >
                              {address.house}
                              <br />
                              {address.area}
                              <br />
                              {address.city},{address.state}
                              <br/>
                              {address.pincode}
                            </Typography>
                            <Stack
                              direction={"row"}
                              spacing={1}
                              marginBottom={"10PX"}
                              marginLeft={"10px"}
                            >
                              <Button
                                onClick={() => handleButtonClick(address?._id)}
                              >
                                DELETE
                              </Button>
                            </Stack>
                          </Stack>
                        </Box>
                      </Grid>
                    ))
                  ) : (
                    <Typography>No address details available.</Typography>
                  )}
                </Grid>
              </Stack>
            </Box>
          </Paper>

          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Basic Information"}
            </DialogTitle>
            <DialogContent>
              <TextField
                // label="username"
                name="username"
                placeholder="username"
                value={userData?.username}
                onChange={handleChange}
                sx={{ width: "100%", mb: 2 }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton>
                        <PersonIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                // label="email"
                name="email"
                value={userData?.email}
                onChange={handleChange}
                placeholder="email"
                sx={{ width: "100%", mb: 2 }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton>
                        <EmailIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                // label="email"
                name="phonenumber"
                placeholder="phonenumber"
                sx={{ width: "100%", mb: 2 }}
                value={userData?.phonenumber}
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton>
                        <PhoneIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <DialogActions>
                <Button
                  onClick={handleUpdate}
                  sx={{
                    backgroundColor: "#5cb85c",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "#5cb85c",
                      color: "white",
                    },
                  }}
                  type="submit"
                >
                  UPDATE
                </Button>
                <Button
                  onClick={handleClose}
                  autoFocus
                  sx={{
                    backgroundColor: "#d9534f",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "#d9534f",
                      color: "white",
                    },
                  }}
                >
                  Cancel
                </Button>
              </DialogActions>
            </DialogContent>
          </Dialog>
        </Container>
      </Grid>
    </>
  );
};

export default UserProfile;
