import React, { useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Button, Divider, Stack, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Autocomplete from "@mui/material/Autocomplete";
import { useDispatch, useSelector } from "react-redux";
import {
  getLabCategories,
  addLabTest,
  getAllAddedTest,
} from "../../../redux/features/labSlice";
import { useState } from "react";

const AddLabTest = ({ centerId }) => {
  const dispatch = useDispatch();
  const labCategories = useSelector((state) => state.labcenter.commonData);
  const addedTest = useSelector((state) => state.labcenter.Data);
  console.log("addedTest", addedTest);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    dispatch(getLabCategories());
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [selectedValue, setSelectedValue] = useState(null);
  const [details, setDetails] = useState(null);
  const [price, setPrice] = useState(null);
  const handleLabCategorySelect = (event, selectedCategory) => {
    setSelectedValue(selectedCategory);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("selectedvalue",selectedValue)
    console.log("details",details)
    console.log("price",price)
    const formData = {
      mainCategory: selectedValue,
      testDetails: details,
      price: price,
      centerID: centerId,
    };
    handleClose();
    dispatch(addLabTest(formData));
  };

  useEffect(() => {
    dispatch(getAllAddedTest(centerId));
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
        Add Lab Test
      </Typography>
      <Divider />
      <Box height={10} />
      <Stack direction={"row"} spacing={2} className="my-2-mb-2">
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1 }}
        ></Typography>
        <Button
          variant="contained"
          endIcon={<AddIcon />}
          onClick={handleClickOpen}
        >
          ADD
        </Button>
      </Stack>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="left" style={{ minWidth: "100px" }}>
                Scan Details
              </TableCell>
              <TableCell align="left" style={{ minWidth: "100px" }}>
                Category
              </TableCell>
              <TableCell align="left" style={{ minWidth: "100px" }}>
                Price
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {addedTest ? (
              addedTest.map((item, index) => (
                <TableRow key={index}>
                  <TableCell align="left">{item.description}</TableCell>
                  <TableCell align="left">{item.mainCategory}</TableCell>
                  <TableCell align="left">{item.price}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={2}>Loading...</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        rowsPerPage={rowsPerPage}
        count={addedTest?.length}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Dialog open={open}>
        <DialogTitle>ADD LAB TEST</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <Stack spacing={3} sx={{ width: 500 }}>
              {labCategories && (
                <Autocomplete
                  disablePortal
                  id="combo-box-category"
                  options={
                    labCategories
                      ? labCategories.map((category) => category.Testname)
                      : []
                  }
                  getOptionLabel={(option) => option}
                  sx={{ width: 500 }}
                  onChange={handleLabCategorySelect}
                  renderInput={(params) => (
                    <TextField {...params} label="Select Category" />
                  )}
                />
              )}
              <TextField
                placeholder="Enter Details"
                multiline
                onChange={(event) => setDetails(event.target.value)}
                rows={2}
                maxRows={4}
              />
              <TextField
                id="outlined-password-input"
                label="Price"
                type="number"
                onChange={(event) => setPrice(event.target.value)}
                autoComplete="current-password"
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">SUBMIT</Button>
          </DialogActions>
        </form>
      </Dialog>
    </Paper>
  );
};

export default AddLabTest;
