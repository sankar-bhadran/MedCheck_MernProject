import {
  Box,
  Button,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import {
  clearPaymentState,
  getScanCenterDetails,
} from "../../../redux/features/userSlice";
import { getuser, orders } from "../../../redux/features/userSlice";
import axios from "../../../utils/axiosInstances";

const Payment = ({ state, setOrderDetails }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.user.commonData);
  console.log("data", data);
  const paymentData = useSelector((state) => state.user.paymentState);
  console.log("paymentdata", paymentData?.id);
  const { id } = useParams();
  const testDetails = useSelector((state) => state.user.Data);
  const userCartItem = testDetails?.testCart?.item || [];

  useEffect(() => {
    dispatch(getScanCenterDetails(id));
  }, []);

  useEffect(() => {
    dispatch(getuser());
    setOrderDetails((prev) => ({ ...prev, id }));
  }, []);

  console.log("state", state);

  const handlepayment = () => {
    dispatch(orders());
  };

  useEffect(() => {
    dispatch(clearPaymentState);
  }, []);

  const initPayment = (paymentData) => {
    const options = {
      key: "rzp_test_WyyNTFgqxuHb2f",
      amount: paymentData.amount,
      currency: paymentData.currency,
      description: "Test Transaction",
      order_id: paymentData.id,
      handler: async (response) => {
        console.log("response", response);
        try {
          const verifyUrl = "api/paymentverify";
          const { data } = await axios.post(verifyUrl, {
            ...response,
            ...state,
          });
          paymentSuccess(data.appointments._id);
          console.log("data", data.appointments._id);
        } catch (error) {
          console.log(error);
        }
      },
      theme: {
        color: "#3399cc",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  if (paymentData) {
    initPayment(paymentData, state);
  }

  const paymentSuccess = (data) => {
    console.log("idididid",data)
    navigate(`/orderconfirm/${data}`);
  };

  return (
    <div>
      <Grid container spacing={5} mt={2}>
        <Grid item lg={8}>
          <Paper
            sx={{
              padding: "50px",
              width: "100%",
              height: "100%",
              borderRadius: "10px",
              border: "1px solid #bfbfbf",
            }}
          >
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="h6">Appointment Details</Typography>
                <Paper
                  sx={{ borderRadius: "10px", border: "1px solid #bfbfbf" }}
                >
                  <Stack p={2} direction={"row"} spacing={2}>
                    <Typography>{state.mobilenumber}</Typography>
                    <Typography>{state.email}</Typography>
                  </Stack>
                  <Stack p={2} direction={"row"} spacing={2} mt={-2}>
                    <strong>{state.date}</strong>
                    <strong>{state.slot}</strong>
                  </Stack>
                  <Stack p={2} direction={"row"} spacing={2} mt={-2}>
                    <Typography variant="outline">
                      {data?.CenterName}
                    </Typography>
                    ,
                    <Typography variant="caption">
                      {data?.Place},{data?.City}
                    </Typography>
                  </Stack>
                </Paper>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="h6">Order Details</Typography>
                <Paper
                  sx={{
                    width: "100%",
                    borderRadius: "10px",
                    border: "1px solid #bfbfbf",
                    padding: "10px",
                    marginBottom: "10px",
                  }}
                >
                  <Stack mb={2}>
                    <Typography>
                      <strong>{state.patientname}</strong>
                    </Typography>
                    <Typography>
                      <strong>{state.dateofbirth}</strong>,{" "}
                      <strong>{state.gender}</strong>
                    </Typography>
                  </Stack>
                  {userCartItem?.map((data) => (
                    <Paper
                      sx={{
                        width: "100%",
                        borderRadius: "6px",
                        border: "1px solid #bfbfbf",
                        padding: "10px",
                        marginBottom: "10px",
                        marginTop: "6pX",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Stack direction={"row"} alignItems={"center"}>
                          <Typography>{data.description}</Typography>
                        </Stack>
                        <Stack
                          direction={"row"}
                          alignItems={"center"}
                          spacing={3}
                        >
                          <Typography>
                            ₹ <strong>{data.price}</strong>
                          </Typography>
                          {/* <Divider
                            orientation="vertical"
                            flexItem
                            sx={{ margin: "0 16px" }}
                          /> */}
                        </Stack>
                      </Box>
                    </Paper>
                  ))}
                </Paper>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item lg={4}>
          <Paper
            sx={{
              width: "100%",
              height: "auto",
              border: "1px solid #bfbfbf",
              borderRadius: "10px",
              padding: "20px",
            }}
          >
            {/* <Paper
              sx={{
                width: "90%",
                height: "20%",
                borderRadius: "6px",
                border: "1px solid #bfbfbf",
                padding: "10px",
                margin: "20px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Stack direction={"row"} alignItems={"center"}>
                  <Typography>Estimated Amount</Typography>
                </Stack>
                <Typography sx={{ fontWeight: "bold" }}>₹ 4000</Typography>
              </Box>
            </Paper> */}
            <Stack spacing={2}>
              <Typography variant="h6"> Bill Summary</Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Stack direction={"row"} alignItems={"center"}>
                  <Typography>MRP total</Typography>
                </Stack>
                <Typography sx={{ fontWeight: "bold" }}>
                  ₹{testDetails?.testCart?.totalPrice}
                </Typography>
              </Box>
              <Button
                sx={{
                  backgroundColor: "#1778F2",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "#1778F2",
                  },
                }}
                onClick={handlepayment}
              >
                PAY ₹{testDetails?.testCart?.totalPrice}
              </Button>
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Payment;
