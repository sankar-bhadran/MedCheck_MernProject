import React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Divider,
  Typography,
  Button,
  Card,
  CardMedia,
  Grid,
  Stack,
  Toolbar,
  AppBar,
} from "@mui/material";
import Box from "@mui/material/Box";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { fetchBookingDetails } from "../../../redux/features/CenterSlice";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

const AddSlot = () => {
  const [value, setValue] = React.useState("");
  const [startTim, setStartTim] = useState(null);
  const [endTime, setEndTime] = useState(null);
  console.log("starttime ",startTim)
  console.log("endTime ",endTime)

  return (
    <Paper
      sx={{
        width: "100%",
        overflow: "hidden",
        padding: "12px",
      }}
    >
      <Typography
        gutterBottom
        variant="h5"
        component="div"
        sx={{ padding: "20px" }}
      >
        Add Slot
      </Typography>
      <Divider />
      <Box height={10} />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box
          sx={{
            maxWidth: 936,
            margin: "auto",
            overflow: "hidden",
            padding: "20px",
            borderRadius: "10px",
            border: "2px solid #FFA500",
          }}
        >
          <AppBar
            position="static"
            color="default"
            elevation={0}
            sx={{ borderBottom: "1px solid rgba(0, 0, 0, 0.12)" }}
          >
            <Toolbar sx={{ justifyContent: "center" }}>
              <Box alignItems="center" justifyContent={"center"}>
                ADD TIME SLOTS
              </Box>
            </Toolbar>
          </AppBar>
          <Box display={"flex"} justifyContent={"center"} marginTop={"50px"}>
            <Stack direction={"row"} spacing={2}>
              <DateCalendar
                disablePast
                // onChange={(e) => console.log(e)}
                // value={selectedDate}
                // onChange={(date) => setSelectedDate(date)}
                sx={{ borderRadius: "10px" }}
              />
            </Stack>

            <Box>
              {/* <form onSubmit={handleSubmit(onSubmit)}> */}
              <Stack direction={"row"}>
                <Stack>
                  {/* <Controller
                          name="startTime"
                          control={control}
                          defaultValue={null}
                          rules={{
                            required: "Start Time is required",
                          }}
                          render={({ field }) => (
                            <TimePicker
                              label="Start Time"
                              {...field}
                              // disablePast
                              sx={{
                                marginRight: ".5rem",
                              }}
                            />
                          )}
                        />
                        {errors.startTime && <p>{errors.startTime.message}</p>} */}
                  <TimePicker
                    label="Start Time"
                    value={startTim}
                    onChange={(time) => setStartTim(time)}
                    views={["hours", "minutes"]}
                    format="HH:mm"
                  />
                </Stack>

                <Stack>
                  {/* <Controller
                          name="endTime"
                          control={control}
                          defaultValue={null}
                          rules={{
                            required: "End Time is required",
                            validate: validateEndTime, // Apply the custom validation function
                          }}
                          render={({ field }) => (
                            <TimePicker
                              label="End Time"
                              {...field}
                              // disablePast
                              sx={{
                                marginRight: ".5rem",
                              }}
                            />
                          )}
                        />
                        {errors.endTime && <p>{errors.endTime.message}</p>} */}
                  <TimePicker
                    label="End Time"
                    value={endTime}
                    onChange={(time) => setEndTime(time)}
                    views={["hours", "minutes"]}
                    format="HH:mm"
                  />
                </Stack>
              </Stack>

              {/* <TimePicker
                    sx={{ marginTop: "8px" }}
                    label="Select slot duration"
                    views={["minutes", "seconds"]}
                    defaultValue={dayjs(defaultTime)}
                    format="mm:ss"
                    onChange={(e) => console.log(e)}
                  /> */}
              {/* <TimePicker
                sx={{ marginTop: "8px" }}
                label="Duration"
                // value={duration}
                // defaultValue={defaultTime}
                // onChange={(time) => setDuration(time)}
                views={["minutes", "seconds"]}
                format="mm:ss"
              /> */}

              <Box mt={2}>
                {/* <Button type="submit" variant="contained" color="primary">
                      Generate slots
                    </Button> */}
                <Button
                  variant="contained"
                  color="primary"
                  //   onClick={handleGenerateSlots}
                >
                  Generate Slots
                </Button>
              </Box>
              <Box mt={2}>
                {/* {generatedSlots &&
                  generatedSlots.map((slot, index) => (
                    <Chip
                      key={index}
                      label={slot}
                      sx={{ margin: "10px" }}
                      onDelete={() => handleDelete(index)}
                    />
                  ))} */}
              </Box>
              {/* </form> */}
            </Box>
          </Box>
          <Button variant="contained" color="secondary">
            Add Slots
          </Button>
        </Box>
      </LocalizationProvider>
    </Paper>
  );
};

export default AddSlot;
