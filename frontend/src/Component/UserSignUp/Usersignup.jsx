import React from "react";
import {
  Stack,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import InputAdornment from "@mui/material/InputAdornment";
import PhoneIcon from "@mui/icons-material/Phone";
import { setuserdetails, sentotp } from "../../redux/features/userSlice";
import { googleSignup } from "../../redux/features/googleSlice";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { clearError } from "../../redux/features/userSlice";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { GoogleLogin } from "@react-oauth/google";

const schema = yup.object().shape({
  username: yup.string().required("username is mandatory"),
  email: yup.string().email("Please enter valid email").required("Enter Email"),
  phonenumber: yup
    .number("Please enter a valid phone number")
    .typeError("Please enter a valid phone number")
    .integer("Please enter a valid phone number")
    .positive("Please enter a valid phone number")
    .required("Phone number is mandatory"),
  password: yup
    .string()
    .required()
    .min(4, "Minimum 4 chars")
    .max(15, "Enter upto 15 chars only"),
  confirmpassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});
const Usersignup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const Data = useSelector((state) => state.user);

  const googlecredential = useSelector((state) => state.google);
  console.log("googlecredential", googlecredential);

  const userType = useSelector((state) => state.google.userType);
  console.log("userTYPE", userType);

  useEffect(() => {
    if (userType === "user") {
      navigate("/");
    } else if (userType === "recruiter") {
      navigate("/centerhomepage");
    }
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data) => {
    console.log("userdata", data);
    dispatch(setuserdetails({ ...data, userType: value }));
    dispatch(sentotp({ phonenumber: data.phonenumber, email: data.email }));
  };

  useEffect(() => {
    dispatch(clearError());
  }, []);

  useEffect(() => {
    Data.otpStatus && navigate("/verifyotp");
    Data.error && toast.error(Data.error, { theme: "colored" });
  }, [Data.otpStatus, Data.error]);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful]);

  const [value, setValue] = React.useState("user");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  console.log("value", value);

  return (
    <Stack
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "30px",
        margin: "5px auto",
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
      <Paper sx={{ padding: "40px", margin: "-1.5rem" }} elevation={4}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
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
              Sign Up
            </Typography>
            <Box sx={{ width: "100%" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                textColor="secondary"
                indicatorColor="secondary"
                aria-label="secondary tabs example"
                centered
              >
                <Tab label="Corporate Account" value="recruiter" />
                <Tab label="USER" value="user" />
                {/* <Tab value="three" label="Item Three" /> */}
              </Tabs>
            </Box>
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
                label="userName"
                {...register("username")}
                placeholder="username"
                helperText={errors.username?.message}
                error={!!errors.username}
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
            </Grid>
            <Grid item xs={12} sm={6} md={12}>
              <TextField
                label="email"
                {...register("email")}
                placeholder="email"
                sx={{ width: "100%" }}
                helperText={errors.email?.message}
                error={!!errors.email}
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
                label="Password"
                type="password"
                {...register("password")}
                placeholder="Password"
                sx={{ width: "100%" }}
                helperText={errors.password?.message}
                error={!!errors.password}
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
            <Grid item xs={12} sm={6} md={12}>
              <TextField
                label="confirmPassword"
                type="password"
                {...register("confirmpassword")}
                placeholder="confirmpassword"
                sx={{ width: "100%" }}
                helperText={errors.confirmpassword?.message}
                error={!!errors.confirmpassword}
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
            <Grid item xs={12} sm={6} md={12}>
              <TextField
                label="phoneNumber"
                {...register("phonenumber")}
                placeholder="phonenumber"
                helperText={errors.phonenumber?.message}
                error={!!errors.phonenumber}
                sx={{ width: "100%" }}
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
            </Grid>
          </Grid>
          <Stack direction={"column"} spacing={1} alignItems={"center"}>
            {/* <CustomButton
              backgroundColor="#1778F2"
              color="#fff"
              buttonText="Sign Up"
       
            /> */}
            <Button
              type="submit"
              sx={{
                backgroundColor: "#1778F2",
                color: "white",
                "&:hover": {
                  backgroundColor: "#1778F2", // Change the background color when hovered
                  // You can also add other styles as needed
                },
              }}
            >
              Sign Up
            </Button>
            {/* <GoogleLogin
              onSuccess={(credentialResponse) => {
                console.log(credentialResponse);
                dispatch(
                  googleSignup({ ...credentialResponse, userType: value })
                );
              }}
              size="mdeium"
              shape="square"
              onError={() => {
                console.log("Login Failed");
              }}
            /> */}
            <Typography
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              Already have an account
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: "700",
                  color: "#1778F2",
                  cursor: "pointer",
                  textDecoration: "none",
                }}
                component={Link}
                to="/login"
              >
                Login
              </Typography>
            </Typography>
          </Stack>
        </form>
      </Paper>
    </Stack>
  );
};

export default Usersignup;
