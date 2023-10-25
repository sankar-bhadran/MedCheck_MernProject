import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import AdminPanel from "../../../Pages/AdminPages/AdminPanel/adminPanel";
import Navbar from "../AdminNavbar/Navbar";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/material";
import StorefrontIcon from "@mui/icons-material/Storefront";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import "../../../Dash.css";
import { useDispatch, useSelector } from "react-redux";
import { adminDashboard } from "../../../redux/features/admiSlice";
import BarChart from "../../Chart/BarChart";
import PieChart from "../../Chart/PieChart";

const Dashboard = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.admin.Data);
  console.log("count", data?.labSum);
  useEffect(() => {
    dispatch(adminDashboard());
  }, []);
  return (
    <>
      <div style={{ backgroundColor: " #eceff1" }}>
        <Navbar />
        <Box height={80} />
        <Box sx={{ display: "flex" }}>
          <AdminPanel />
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={8}>
                <Stack spacing={2} direction={"row"}>
                  <Card
                    sx={{ minWidth: 49 + "%", height: 140 }}
                    className="gradienttwo "
                  >
                    <CardContent>
                      <div>
                        <CreditCardIcon />
                      </div>
                      <Typography gutterBottom variant="h5" component="div">
                        {data?.scanCenterCount}
                      </Typography>
                      <Typography
                        variant="body2"
                        component="div"
                        sx={{ color: "#ccd1d1" }}
                      >
                        Total Registered ScanCenter
                      </Typography>
                    </CardContent>
                  </Card>
                  <Card
                    sx={{ minWidth: 49 + "%", height: 140 }}
                    className="gradient"
                  >
                    <CardContent>
                      <div>
                        <ShoppingBagIcon />
                      </div>
                      <Typography gutterBottom variant="h5" component="div">
                        {data?.labCenterCount}
                      </Typography>
                      <Typography
                        variant="body2"
                        component="div"
                        sx={{ color: "#ccd1d1" }}
                      >
                        Total Registered LabCenter
                      </Typography>
                    </CardContent>
                  </Card>
                </Stack>
              </Grid>

              <Grid item xs={4}>
                <Stack spacing={2}>
                  <Card sx={{ maxWidth: 345 }} className="gradienttwo">
                    <Stack spacing={2} direction="row">
                      <div className="iconstyle">
                        <StorefrontIcon />
                      </div>
                      <div className="paddingall">
                        <span className="pricetitle">₹ {data?.scanSum}</span>
                        <br />
                        <span className="pricesubtitle">
                          ScanCentre Total Income
                        </span>
                      </div>
                    </Stack>
                  </Card>
                  <Card sx={{ maxWidth: 345 }} className="gradient">
                    <Stack spacing={2} direction="row">
                      <div className="iconstyle">
                        <StorefrontIcon />
                      </div>
                      <div className="paddingall">
                        <span className="pricetitle">₹ {data?.labSum}</span>
                        <br />
                        <span className="pricesubtitle"> LabCentre Total Income</span>
                      </div>
                    </Stack>
                  </Card>
                </Stack>
              </Grid>
            </Grid>
            <Box height={20} />
            <Grid container spacing={2}>
              <Grid item xs={8}>
                <Card sx={{ height: 60 + "vh" }}>
                  <CardContent>
                    <BarChart />
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={4}>
                <Card sx={{ height: 60 + "vh", width: 49 + "vh" }}>
                  <CardContent>
                    <PieChart />
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </div>
    </>
  );
};

export default Dashboard;
