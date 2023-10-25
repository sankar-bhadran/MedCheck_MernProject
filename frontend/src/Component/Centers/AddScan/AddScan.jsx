import * as React from "react";
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
  getScanCategories,
  addScan,
  getAddTest,
} from "../../../redux/features/CenterSlice";
import { useEffect, useState } from "react";

export default function AddScan({ centerId }) {
  const dispatch = useDispatch();
  const scanCategories = useSelector((state) => state.center.CommonData);
  const testAdded = useSelector((state) => state.center.AddedTest);
  const status = useSelector((state) => state.center.CenterStatus);
 
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const [selectedValue, setSelectedValue] = useState(null);
  const [subValue, setSubValue] = useState([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState(null);
  const [details, setDetails] = useState(null);
  const [price, setPrice] = useState(null);

 
  const handleMainCategorySelect = (event, selectedCategory) => {
    setSelectedValue(selectedCategory);
    const selectedSubcategories =
      scanCategories.find((category) => category.Testname === selectedCategory)
        ?.sub.name || [];

    setSubValue(selectedSubcategories);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    dispatch(getScanCategories());
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = {
      mainCategory: selectedValue,
      subCategory: selectedSubCategories,
      testDetails: details,
      price: price,
      centerID: centerId,
    };
    handleClose();
    dispatch(addScan(formData));
  };

  useEffect(() => {
    dispatch(getAddTest(centerId));
  }, []);

  useEffect(() => {
    dispatch(getAddTest(centerId));
  }, [status]);

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
        Add Scan Details
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
                Sub-Category
              </TableCell>
              <TableCell align="left" style={{ minWidth: "100px" }}>
                Price
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {testAdded ? (
              testAdded.map((item, index) => (
                <TableRow key={index}>
                  <TableCell align="left">{item.description}</TableCell>
                  <TableCell align="left">{item.mainCategory}</TableCell>
                  <TableCell align="left">{item.subCategory}</TableCell>
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
        count={testAdded?.length}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Dialog open={open}>
        <DialogTitle>ADD SCAN AND MRI</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            {/* <DialogContentText>Test Categories</DialogContentText> */}
            <Stack spacing={3} sx={{ width: 500 }}>
              {scanCategories && (
                <Autocomplete
                  disablePortal
                  id="combo-box-category"
                  options={
                    scanCategories
                      ? scanCategories.map((category) => category.Testname)
                      : []
                  }
                  getOptionLabel={(option) => option}
                  value={selectedValue}
                  onChange={handleMainCategorySelect}
                  sx={{ width: 500 }}
                  renderInput={(params) => (
                    <TextField {...params} label="Select Category" />
                  )}
                />
              )}
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={subValue}
                getOptionLabel={(option) => option}
                onChange={(event, newvalue) => {
                  setSelectedSubCategories(newvalue);
                }}
                value={selectedSubCategories}
                sx={{ width: 500 }}
                renderInput={(params) => (
                  <TextField {...params} label="Sub Categroy" />
                )}
              />

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
                onChange={(event) => setPrice(event.target.value)}
                type="number"
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
}
