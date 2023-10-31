import React, { useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";
import { useDispatch, useSelector } from "react-redux";
import { downloadreport, myOrders } from "../../redux/features/userSlice";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import {
  Button,
  DialogTitle,
  TextField,
  requirePropFactory,
} from "@mui/material";
import { resultreport } from "../../redux/features/userSlice";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#1778f2",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const MyOrders = () => {
  const dispatch = useDispatch();
  const myOrder = useSelector((state) => state.user.Data);
  console.log("myOrders", myOrder);

  const [state, setState] = React.useState({ open: false, id: null });

  const handleClickOpen = (id) => {
    console.log(id);
    setState({ open: true, id });
  };
  console.log(state);

  const handleClose = () => {
    setState(false);
  };

  const downloadreports = (id) => {
    console.log("report", id);
    dispatch(resultreport(id))
  };

  useEffect(() => {
    dispatch(myOrders());
  }, []);

  return (
    <Paper
      sx={{
        width: "100%",
        overflow: "hidden",
        padding: "12px",
      }}
    >
      <TableContainer>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Patient Name</StyledTableCell>
              <StyledTableCell align="left">Center Name</StyledTableCell>
              <StyledTableCell align="left">
                Center MobileNumber
              </StyledTableCell>
              <StyledTableCell align="left">Booked Date</StyledTableCell>
              <StyledTableCell align="left">Booked Time</StyledTableCell>
              <StyledTableCell align="left">Testes</StyledTableCell>
              <StyledTableCell align="left">Status</StyledTableCell>
              <StyledTableCell align="left"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(myOrder) &&
              myOrder.map((row) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell component="th" scope="row">
                    {row.patientName}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {row.labId.CenterName}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {" "}
                    {row.labId.ContactNumber}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {new Date(row.bookedDate).toLocaleDateString()}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.bookedTime}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <Button
                      variant="outlined"
                      onClick={() => handleClickOpen(row._id)}
                    >
                      Bookedtests
                    </Button>
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {" "}
                    {row.status === "Completed" ? (
                      <Button
                        size="small"
                        onClick={() => downloadreports(row._id)}
                      >
                        Download Report
                      </Button>
                    ) : (
                      row.status
                    )}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <Button variant="outlined" color="error">
                      Cancel
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={state.open} onClose={handleClose}>
        <DialogTitle>BOOKED SCAN</DialogTitle>
        <DialogContent>
          {myOrder && myOrder.length > 0
            ? myOrder
                .filter((element) => element._id === state.id)
                .map((filteredElement) =>
                  filteredElement.testDetails?.item?.map((data, index) => (
                    <TextField
                      key={index}
                      autoFocus
                      margin="dense"
                      id={data.TestId}
                      value={data.description}
                      type="email"
                      fullWidth
                      variant="standard"
                    />
                  ))
                )
            : null}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default MyOrders;
