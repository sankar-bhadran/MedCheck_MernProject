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
import { Divider, Typography, Button, Card, CardMedia } from "@mui/material";
import Box from "@mui/material/Box";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { fetchBookingDetails } from "../../../redux/features/CenterSlice";
const Bookings = ({ centerId }) => {
  const dispatch = useDispatch();
  const fetchedDetails = useSelector((state) => state.center.CommonData);
  //   console.log(
  //     "fetchedDetails",
  //     fetchedDetails[0]?.testDetails.item[0]?.description
  //   );

  if (fetchedDetails && fetchedDetails.length > 0) {
    const descriptions = fetchedDetails[0]?.testDetails?.item.map(
      (item) => item.description
    );

    // 'descriptions' now contains an array of 'description' properties from 'testDetails' items
    console.log(descriptions);
  }

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    dispatch(fetchBookingDetails(centerId));
  }, []);

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
        Scan Center Details
      </Typography>
      <Divider />
      <Box height={10} />
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="left" style={{ minWidth: "100px" }}>
                Patient Name
              </TableCell>
              <TableCell align="left" style={{ minWidth: "100px" }}>
                MobileNumber
              </TableCell>
              <TableCell align="left" style={{ minWidth: "100px" }}>
                Email
              </TableCell>
              <TableCell align="left" style={{ minWidth: "100px" }}>
                Gender
              </TableCell>
              <TableCell align="left" style={{ minWidth: "100px" }}>
                Booking Date
              </TableCell>
              <TableCell align="left" style={{ minWidth: "100px" }}>
                Booking Time
              </TableCell>
              <TableCell align="left" style={{ minWidth: "100px" }}>
                Booked Scan
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fetchedDetails ? (
              fetchedDetails.map((data, index) => (
                <TableRow hover role="checkbox" tabIndex={-1}>
                  <TableCell align="left">{data.patientName}</TableCell>
                  <TableCell align="left">{data.mobilenumber}</TableCell>
                  <TableCell align="left">{data.email}</TableCell>
                  <TableCell align="left">{data.gender}</TableCell>
                  <TableCell align="left">{data.bookedDate}</TableCell>
                  <TableCell align="left">{data.bookedTime}</TableCell>
                  <TableCell align="left">
                    <Button variant="outlined" onClick={handleClickOpen}>
                      Bookedtests
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={1}>Loading...</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        rowsPerPage={rowsPerPage}
        count={fetchedDetails?.length}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>BOOKED SCAN</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText> */}
          {fetchedDetails && fetchedDetails.length > 0
            ? fetchedDetails[0]?.testDetails?.item.map((data, index) => (
                <TextField
                  key={index}
                  autoFocus
                  margin="dense"
                  id={data.TestId}
                  value={data.description}
                  //   label={}
                  type="email"
                  fullWidth
                  variant="standard"
                />
              ))
            : null}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          {/* <Button onClick={handleClose}>Subscribe</Button> */}
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default Bookings;
