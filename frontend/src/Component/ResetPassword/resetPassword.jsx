import React from "react";
import {
  Container,
  Grid,
  Paper,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import { useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { resetPassword } from "../../redux/features/userSlice";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  password: yup
    .string()
    .required()
    .min(4, "Minimum 4 chars")
    .max(15, "Enter upto 15 chars only"),
  confirmpassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [serachParams, setSerachParams] = useSearchParams();
  const emailtoken = serachParams.get("token");
  const newtoken = { emailtoken };
  console.log(emailtoken);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm({ resolver: yupResolver(schema) });
  const onSubmit = (data) => {
    // const reset={...newtoken,password:data.password}
    // console.log(newtoken)
    // console.log(reset)
    dispatch(resetPassword({ ...newtoken, password: data.password })).then(
      (res) =>
        res?.payload?.status === 200
          ? navigate("/login")
          : toast.error("Missing email token", {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            })
    );
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful]);

  return (
    <Container component="main" maxWidth="">
      <div className="form-gap">
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          style={{ minHeight: "100vh" }}
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
          <Grid item xs={12} sm={8} md={6} lg={4}>
            <Paper elevation={3}>
              <div
                style={{
                  padding: "1rem",
                  textAlign: "center",
                  marginBottom: "200px",
                }}
              >
                <LockIcon color="primary" fontSize="large" />
                <Typography variant="h4" gutterBottom>
                  Forgot Password?
                </Typography>
                <Typography variant="body1">
                  You can reset your password here.
                </Typography>

                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                  <TextField
                    // label="Password"
                    type="password"
                    {...register("password")}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="email"
                    label="New Password"
                    name="password"
                    autoComplete="email"
                    helperText={errors.password?.message}
                    error={!!errors.password}
                    autoFocus
                  />
                  <TextField
                    label="confirmPassword"
                    type="password"
                    {...register("confirmpassword")}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="confirmpassword"
                    // label="Confirm Password"
                    helperText={errors.confirmpassword?.message}
                    error={!!errors.confirmpassword}
                    name="confirmpassword"
                    autoComplete="email"
                    // type="password"
                    autoFocus
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    size="large"
                    style={{
                      margin: "1rem 0",
                      backgroundColor: "#1778F2",
                      color: "#fff",
                    }}
                  >
                    Set New Password
                  </Button>
                </form>
              </div>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};

export default ResetPassword;
