import React from "react";
import {
  Stack,
  Grid,
  Paper,
  Typography,
  TextField,
  IconButton,
  Button,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EmailIcon from "@mui/icons-material/Email";
import InputAdornment from "@mui/material/InputAdornment";
const OwnerLogin = () => {
  return (
    <div>
      <Stack
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "90px",
          margin: "5px auto",
        }}
      >
        ;
        <Paper sx={{ padding: "40px", margin: "-1.5rem" }} elevation={4}>
          <form>
            <Stack
              spacing={2}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: "50px",
                margin: "-80px auto",
                height: "px",
              }}
            >
              <Typography variant="h5" fontSize={30} fontWeight="bold">
                Owner Login
              </Typography>
              <Typography>
                Please fill in this form to create an account.
              </Typography>
            </Stack>

            <Grid
              container
              my={5}
              spacing={2}
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
              marginBottom="10px"
            >
              <Grid item xs={12} sm={6} md={12}>
                <TextField
                  label="email"
                  placeholder="Email"
                  sx={{ width: "100%" }}
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
              </Grid>
              <Grid item xs={12} sm={6} md={12}>
                <TextField
                  label="password"
                  placeholder="Password"
                  type="password"
                  sx={{ width: "100%" }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton>
                          <VisibilityIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
            <Stack direction={"column"} spacing={1} alignItems={"center"}>
              {/* <CustomButton
              backgroundColor="#1778F2"
              color="#fff"
              buttonText="Login"
            /> */}
              <Button
                type="submit"
                sx={{ backgroundColor: "#1778F2", color: "white" }}
              >
                Login
              </Button>
             
              <Typography
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                Don't Have an Account
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontWeight: "700",
                    color: "#1778F2",
                    cursor: "pointer",
                    textDecoration: "none",
                  }}
                  to="/signup"
                >
                  Sign Up
                </Typography>
              </Typography>
            </Stack>
          </form>
        </Paper>
      </Stack>
    </div>
  );
};

export default OwnerLogin;
