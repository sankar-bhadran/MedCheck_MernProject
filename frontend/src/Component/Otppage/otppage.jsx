import React, { useEffect, useState } from "react";
import { Box, Button, Grid, Stack, TextField, Typography } from "@mui/material";
import { styled } from "@mui/system";
import otp from "../../Assets/business-and-finance.png";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import {
  clearError,
  registerUser,
  sentotp,
} from "../../redux/features/userSlice";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const CustomTypography = styled(Typography)(({ theme }) => ({
  fontSize: "3.0rem",
  [theme.breakpoints.down("xs")]: {
    fontSize: "1.6rem",
  },
}));
function Otppage() {
  const [counter, setCounter] = useState(20);
  const { handleSubmit, register } = useForm();
  const userdata = useSelector((state) => state.user.userdata);
  const errormessage = useSelector((state) => state.user.error);
  const otpStatus = useSelector((state) => state.user.otpStatus);
  const data = useSelector((state) => state.user);

  console.log(errormessage);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log("otp :", data);
    const a = { ...userdata, otp: data.otp };
    console.log("aa", a);
    console.log("aa", a.phonenumber, a.email);
    dispatch(registerUser({ ...userdata, otp: data.otp }));
  };

  useEffect(() => {
    data.registerStatus && navigate("/login");
    data.error && toast.error(data.error, { theme: "colored" });
  }, [data.error, data.registerStatus]);

  useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  useEffect(() => {
    dispatch(clearError());
  }, [otpStatus]);

  return (
    <>
      <Box>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <ToastContainer
              position="top-center"
              autoClose={2000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
            <Stack
              sx={{
                margin: "70px",
                minWidth: "50%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Grid container spacing={3} direction="column">
                <Grid item xs={6} sm={12} md={12}>
                  <CustomTypography variant="h3">
                    Enter verification code
                  </CustomTypography>
                </Grid>
                <Grid item>
                  <Typography sx={{ fontSize: "20px" }}>
                    Medicheck verify sent your verification code to:
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h6">{userdata.phonenumber}</Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={12}>
                  <Typography sx={{ fontWeight: "bold" }}>
                    Verification code
                  </Typography>
                  <TextField
                    label="otp"
                    {...register("otp")}
                    sx={{ minWidth: "100%" }}
                  ></TextField>
                </Grid>
                <Grid item xs={12} sm={6} md={12}>
                  <Button
                    type="submit"
                    sx={{
                      backgroundColor: "#1778F2",
                      color: "white",
                      "&:hover": {
                        backgroundColor: "#1778F2",
                      },
                    }}
                  >
                    submit
                  </Button>
                </Grid>
              </Grid>
              <Box>
                {counter !== 0 ? (
                  <Typography>
                    RESEND OTP IN{" "}
                    <span style={{ color: "green", fontWeight: "bold" }}>
                      00:{counter}
                    </span>
                  </Typography>
                ) : (
                  counter === 0 && (
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: "#1778F2",
                        color: "white",
                        "&:hover": {
                          backgroundColor: "#1778F2",
                        },
                      }}
                      onClick={() => {
                        setCounter(20);
                        dispatch(sentotp({ ...userdata }));
                      }}
                    >
                      Resend OTP
                    </Button>
                  )
                )}
              </Box>
            </Stack>
            <Stack
              sx={{
                margin: "0 auto",
                marginTop: 2,
                display: {},
              }}
            >
              <Grid container>
                <Grid item sx={{}}>
                  <img src={otp} style={{ width: "350px", height: "350px" }} />
                </Grid>
              </Grid>
            </Stack>
          </Box>
        </form>
      </Box>
    </>
  );
}

export default Otppage;
