import { Box, Grid, Paper, Stack, TextField, Typography } from "@mui/material";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getScanCenterDetails } from "../../../redux/features/userSlice";

const LabDateAndTime = ({ state, setOrderDetails }) => {
  const [borderColor, setBorderColor] = useState("#bfbfbf");
  const [timeBoreder, setTimeBorderColor] = useState("");
  const [click, setClick] = useState("");
  const dispatch = useDispatch();
  const data = useSelector((state) => state.user.Data);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getScanCenterDetails(id));
  }, []);

  const [defaultDate, setDefaultDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const handleChanges = (event, newAlignment) => {
    const { name, value } = event.target;
    setOrderDetails((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  console.log(state);

  let MorningSlots = [
    "08:00 AM-09:00AM",
    "09:00 AM-10:00AM",
    "10:00 AM-11:00AM",
    "11:00 AM-12:00PM",
  ];

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 6,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  function getDates(startDate, endDate) {
    const dates = [];
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  }

  const todayDate = new Date();
  // console.log(todayDate);

  const nextMonth = new Date(todayDate);
  nextMonth.setMonth(nextMonth.getMonth() + 1);
  nextMonth.setDate(0); // Set to the last day of the next month

  const datesArray = getDates(todayDate, nextMonth);

  // Format the dates as strings (e.g., "yyyy-mm-dd")
  const formattedDates = datesArray.map(formatDate);

  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Add leading zero if needed
    const day = String(date.getDate()).padStart(2, "0"); // Add leading zero if needed
    return `${year}-${month}-${day}`;
  }

  const handleClick = (date) => {
    setOrderDetails((prev) => ({ ...prev, date }));
    setDefaultDate(date);
    setClick(date);
  };

  const typographyRef = useRef();

  // const handleTypographyClick = (slot) => {};

  const handlePaperClick = (data) => {
    console.log("data", data);
    setTimeBorderColor(data);
    setBorderColor("#1778F2");
  };

  const handleTypographyClick = (slot) => {
    setOrderDetails((prev) => ({ ...prev, slot }));
  };
  return (
    <div>
      <Grid container spacing={5} mt={2}>
        <Grid item lg={8}>
          <Paper
            sx={{
              padding: "15px",
              width: "100%",
              height: "100%",
              borderRadius: "10px",
              border: "1px solid #bfbfbf",
            }}
            elevation={1}
          >
            <Grid container>
              <Grid item xs={12}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography variant="h6">Select Date</Typography>
                  <Stack>
                    <Typography variant="h6">{data.CenterName}</Typography>
                    <Typography variant="caption">
                      {data.Place},{data.City}
                    </Typography>
                  </Stack>
                </Box>
              </Grid>

              <Grid item lg={12} md={6}>
                <Carousel
                  responsive={responsive}
                  renderButtonGroupOutside={true}
                >
                  {formattedDates.map((date, index) => (
                    <Paper
                      elevation={1}
                      key={date}
                      sx={{
                        borderRadius: "10px 10px 0 0",
                        margin: "10px",
                        // border: "1px solid #bfbfbf",
                      }}
                    >
                      <Box
                        key={index}
                        sx={{
                          height: "75px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          // backgroundColor:
                          //   defaultDate === date ? "tomato" : "black",
                          borderStyle: "solid",
                          borderWidth: "3px",
                          borderColor: date === click ? "#1778F2" : "#828282",
                          borderRadius: "10px",
                          cursor: "pointer",
                        }}
                        onClick={() => handleClick(date)}
                      >
                        {date}
                      </Box>
                    </Paper>
                  ))}
                </Carousel>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item lg={12}>
                <Typography variant="h6">Select Time Slot</Typography>
              </Grid>
              <Grid item mt={2}>
                <Paper
                  sx={{
                    padding: "15px",
                    width: "100%",
                    height: "100%",
                    borderRadius: "10px",
                    border: "0.1px solid #bfbfbf",
                  }}
                >
                  Morning Slots(AM)
                  <Grid container spacing={1} mt={1}>
                    {MorningSlots.map((data, index) => (
                      <Grid item mb={2} key={index}>
                        <Paper
                          sx={{
                            padding: "6px",
                            borderRadius: "12px",
                            border:
                              data === timeBoreder
                                ? `2px solid ${borderColor}`
                                : "#bfbfbf",
                          }}
                          onClick={() => handlePaperClick(data)}
                        >
                          <Typography
                            sx={{ cursor: "pointer" }}
                            ref={typographyRef}
                            onClick={() => handleTypographyClick(data)}
                          >
                            {data}
                          </Typography>
                        </Paper>
                      </Grid>
                    ))}
                  </Grid>
                  Afternoon Slots (PM)
                  <Grid container spacing={1} mt={1}>
                    <Grid item>
                      <Paper
                        sx={{
                          padding: "6px",
                          borderRadius: "12px",
                          border: "0.1px solid #bfbfbf",
                        }}
                      >
                        <Typography
                          // ref={typographyRef}
                          // onClick={handleTypographyClick}
                          sx={{ cursor: "pointer" }}
                        >
                          12:00 PM-01:00PM
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid item>
                      <Paper
                        sx={{
                          // width: "100%",
                          // height: "100%",
                          padding: "7px",
                          borderRadius: "12px",
                          border: "0.1px solid #bfbfbf",
                        }}
                      >
                        <Typography
                          // ref={typographyRef}
                          // onClick={handleTypographyClick}
                          sx={{ cursor: "pointer" }}
                        >
                          01:00 PM-02:00 PM
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid item>
                      <Paper
                        sx={{
                          // width: "100%",
                          // height: "100%",
                          padding: "7px",
                          borderRadius: "12px",
                          border: "0.1px solid #bfbfbf",
                        }}
                      >
                        <Typography
                          // ref={typographyRef}
                          // onClick={handleTypographyClick}
                          sx={{ cursor: "pointer" }}
                        >
                          02:00 PM-03:00PM
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid item>
                      <Paper
                        sx={{
                          // width: "100%",
                          // height: "100%",
                          padding: "7px",
                          borderRadius: "12px",
                          border: "0.2px solid #bfbfbf",
                        }}
                      >
                        <Typography
                          // ref={typographyRef}
                          // onClick={handleTypographyClick}
                          sx={{ cursor: "pointer" }}
                        >
                          03:00 PM-04:00PM
                        </Typography>
                      </Paper>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item lg={4}>
          <Paper
            sx={{
              width: "100%",
              height: "300px",
              border: "1px solid #bfbfbf",
              borderRadius: "10px",
              padding: "20px",
            }}
          >
            <Stack m={1}>
              <Typography variant="h6">Contact Details</Typography>
              <Typography variant="">
                Reports will be sent to below Contact Details
              </Typography>
            </Stack>
            <Stack spacing={2}>
              <TextField
                id="outlined-multiline-flexible"
                label="MobileNumber"
                name="mobilenumber"
                fullWidth
                onChange={handleChanges}
                value={state.mobilenumber}
                variant="outlined"
                multiline
                maxRows={4}
                InputProps={{
                  style: {
                    borderRadius: "10px",
                  },
                }}
              />
              <TextField
                id="outlined-multiline-flexible"
                label="Email"
                name="email"
                onChange={handleChanges}
                value={state.email}
                variant="outlined"
                fullWidth
                multiline
                maxRows={4}
                InputProps={{
                  style: {
                    borderRadius: "10px",
                  },
                }}
              />
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default LabDateAndTime;
