import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    Grid,
    Paper,
    Stack,
    TextField,
    Typography,
  } from "@mui/material";
  import React, { useEffect, useState } from "react";
  import add from "../../../Assets/add-friend.png";
  import DeleteIcon from "@mui/icons-material/Delete";
  import Ilettter from "../../../Assets/letter-i (1).png";
  import { useDispatch, useSelector } from "react-redux";
  import ToggleButton from "@mui/material/ToggleButton";
  import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
  import { getuser, removeFromCart } from "../../../redux/features/userSlice";
  import dayjs from "dayjs";
  import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
  import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
  import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
  import { DatePicker } from "@mui/x-date-pickers/DatePicker";
const LabCart = ({ state, setOrderDetails }) => {
    const [dateOfbirth, setdateOfbirth] = React.useState();
    const [tempStore, setTempStore] = useState("");
    const [patientData, setPatientData] = useState({
      patientname: "",
      dateOfbirth: "",
      gender: " ",
    });
    const [data, setData] = useState();
  
    const shouldRenderGrid =
      state?.patientname && state?.dateOfbirth && state?.gender;
  
    const handleChanges = (event, newAlignment) => {
      const { name, value } = event.target;
      setTempStore((prevUserData) => ({
        ...prevUserData,
        [name]: value,
      }));
      setPatientData((prevPatientData) => ({
        ...prevPatientData,
        [name]: value,
      }));
      setAlignment(newAlignment);
    };
  
    console.log("tempStore", tempStore);
    const dispatch = useDispatch();
    const [alignment, setAlignment] = React.useState("Male");
    const testDetails = useSelector((state) => state.user.Data);
    const userCartItem = testDetails?.testCart?.item || [];
  
    const [open, setOpen] = React.useState(false);
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    useEffect(() => {
      dispatch(getuser());
    }, []);
  
    const handleButtonClick = () => {
      setOrderDetails(tempStore);
      setData(patientData);
      handleClose();
    };
  
    const handleDeleteButton = (id) => {
      dispatch(removeFromCart(id));
    };
  
    function formateDate(dateOfbirth) {
      const originalDate = new Date(dateOfbirth);
      console.log("originalDate", originalDate);
  
      // Get the year, month, and day components from the date
      const year = originalDate.getFullYear();
      const month = String(originalDate.getMonth() + 1).padStart(2, "0"); // Month is zero-based
      const day = String(originalDate.getDate()).padStart(2, "0");
  
      // Create the formatted date string in "YYYY-MM-DD" format
      const formattedDate = `${year}-${month}-${day}`;
      setTempStore((prev) => ({ ...prev, dateOfbirth: formattedDate }));
      setPatientData((prev) => ({ ...prev, dateOfbirth: formattedDate }));
    }
  
    console.log("fulldata", state);
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
            elevation={1}
          >
            <Grid container spacing={3}>
              <Grid item xs={12}>
                {shouldRenderGrid ? (
                  <>
                    <Typography variant="h6">{state.patientname}</Typography>
                    <Typography variant="overline">
                      {state.dateOfbirth}
                    </Typography>
                    <br />
                    <Typography variant="caption">{state.gender}</Typography>
                  </>
                ) : (
                  <Button onClick={handleClickOpen}>
                    <Paper
                      sx={{
                        width: "250px",
                        height: "100%",
                        borderRadius: "6px",
                        border: "1px solid #bfbfbf",
                        padding: "10px",
                      }}
                    >
                      <Stack direction={"row"} spacing={2}>
                        <img
                          src={add}
                          style={{
                            width: "20px",
                            height: "20px",
                          }}
                        />
                        <Typography sx={{ color: "#0689FF" }}>
                          Add Patient Details
                        </Typography>
                      </Stack>
                    </Paper>
                  </Button>
                )}
              </Grid>

              <Grid item xs={12}>
                {userCartItem?.map((data) => (
                  <Paper
                    sx={{
                      width: "100%",
                      borderRadius: "6px",
                      border: "1px solid #bfbfbf",
                      padding: "10px",
                      marginBottom: "10px",
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
                        <Typography>₹ {data.price}</Typography>
                        <Divider
                          orientation="vertical"
                          flexItem
                          sx={{ margin: "0 16px" }}
                        />
                        <Button>
                          <DeleteIcon
                            style={{ color: "#bfbfbf" }}
                            onClick={() => handleDeleteButton(data.TestId)}
                          />
                        </Button>
                      </Stack>
                    </Box>
                  </Paper>
                ))}
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
            <Paper
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
                  <img
                    src={Ilettter}
                    style={{
                      width: "20px",
                      height: "20px",
                      margin: "2px",
                    }}
                  />
                </Stack>
                <Typography sx={{ fontWeight: "bold" }}>
                  ₹ {testDetails?.testCart?.totalPrice}
                </Typography>
              </Box>
            </Paper>
            <Stack direction={"row"} spacing={1}>
              <img
                src={Ilettter}
                style={{
                  width: "20px",
                  height: "20px",
                }}
              />
              <Typography style={{ fontSize: "12px" }}>
                <strong>Test Prices</strong> Vary according to the{" "}
                <strong>Lab Centre</strong>, Hence the Actual price will be
                shown after <strong>Lab Centre</strong> is selected during{" "}
                <strong>checkout</strong>.
              </Typography>
            </Stack>
          </Paper>
        </Grid>
      </Grid>
      <Dialog open={open} fullWidth>
        <DialogTitle>Add or Select Patient</DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
            <TextField
              id="outlined-multiline-flexible"
              label="PatientName"
              fullWidth
              name="patientname"
              onChange={handleChanges}
              value={state.patientname}
              multiline
              maxRows={4}
              InputProps={{
                style: {
                  borderRadius: "10px",
                },
              }}
            />
            <Stack direction={"row"} spacing={1}>
              {/* <TextField
                id="outlined-multiline-flexible"
                label="DOB(dd-mm-yy)"
                multiline
                name="dateofbirth"
                onChange={handleChanges}
                value={state.dateofbirth}
                maxRows={4}
                InputProps={{
                  style: {
                    borderRadius: "10px",
                    width: "400px",
                  },
                }}
              /> */}
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer
                  components={["DatePicker", "DatePicker"]}
                  sx={{ width: "400px" }}
                >
                  <DatePicker
                    label="DOB(dd-mm-yy)"
                    name="dateofbirth"
                    value={state.dateofbirth}
                    onChange={(newValue) => formateDate(newValue)}
                    sx={{ width: "400px" }}
                  />
                </DemoContainer>
              </LocalizationProvider>

              <ToggleButtonGroup
                color="primary"
                value={alignment}
                exclusive
                onChange={handleChanges}
                aria-label="Platform"
                InputProps={{
                  style: {
                    borderRadius: "10px",
                    width: "200px",
                  },
                }}
              >
                <ToggleButton value="Male" name="gender">
                  MALE
                </ToggleButton>
                <ToggleButton value="Female" name="gender">
                  FEMALE
                </ToggleButton>
              </ToggleButtonGroup>
            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" onClick={handleButtonClick}>
            Add Patient
          </Button>
        </DialogActions>
        {/* </form> */}
      </Dialog>
    </div>
  )
}

export default LabCart