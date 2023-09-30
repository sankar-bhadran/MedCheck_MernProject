import React, { useEffect } from "react";
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
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/features/userSlice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import {
  clearError,
  clearRegisterStatus,
} from "../../redux/features/userSlice";
import "react-toastify/dist/ReactToastify.css";
const schema = yup.object().shape({
  email: yup.string().email("Please enter valid email").required("Enter Email"),
  password: yup
    .string()
    .required()
    .min(4, "Minimum 4 chars")
    .max(15, "Enter upto 15 chars only"),
});

const UserLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.user);
  console.log("userData", userData);

  const newUserData = useSelector((state) => state.user.userdata);
  console.log("newDATA", newUserData);
  console.log("userdetails", newUserData.userType);

  const userType = useSelector((state) => state.user.userType);
  console.log("userType", userType);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data) => {
    dispatch(loginUser(data));
  };

  useEffect(() => {
    if (userData.actionStatus) {
      if (userType === "user") {
        navigate("/");
      } else if (userType === "recruiter") {
        navigate("/centerhomepage");
      }
    }

    userData.error && toast.error(userData.error, { theme: "colored" });
    // userData.actionStatus && navigate("/");
    userData.registerStatus &&
      toast.success(userData.successMessages, { theme: "colored" });
  }, [
    userData.error,
    userData.actionStatus,
    userData.registerStatus,
    userType,
  ]);

  useEffect(() => {
    dispatch(clearError())
  }, []);

  return (
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
      ;
      <Paper sx={{ padding: "40px", margin: "-1.5rem" }} elevation={4}>
        <form onSubmit={handleSubmit(onSubmit)}>
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
              Login
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
                {...register("email")}
                helperText={errors.email?.message}
                error={!!errors.email}
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
                {...register("password")}
                helperText={errors.password?.message}
                error={!!errors.password}
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
              sx={{
                backgroundColor: "#1778F2",
                color: "white",
                "&:hover": {
                  backgroundColor: "#1778F2",
                },
              }}
            >
              Login
            </Button>
            <Typography
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                color: "#1778F2",
                fontSize: "14px",
                fontWeight: "700",
                cursor: "pointer",
                textDecoration: "none",
              }}
              component={Link}
              to="/forgotpassword"
            >
              Forgot Password
            </Typography>
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
                  "&:hover": {
                    color: "#1778F2 ",
                  },
                }}
                component={Link}
                to="/signup"
              >
                Sign Up
              </Typography>
            </Typography>
          </Stack>
        </form>
      </Paper>
    </Stack>
  );
};

export default UserLogin;
