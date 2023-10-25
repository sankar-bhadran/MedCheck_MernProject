import React from "react";
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
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  addCategory,
  getData,
  getLabCategory,
  availableData,
  labaddCategory,
} from "../../../redux/features/admiSlice";
import { useEffect, useState } from "react";
import SubCategory from "../SubCategory/SubCategory";
const LabCategory = () => {
  const data = useSelector((state) => state.admin);
  const categorydata = useSelector((state) => state.admin.Data);
  const dispatch = useDispatch();
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
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    const formData = new FormData();
    console.log("data", data);
    dispatch(labaddCategory(data));
    handleClose();
  };

  useEffect(() => {
    dispatch(getLabCategory());
  }, [data.adminActionStatus]);

  const handleButtonClick = (data) => {
    dispatch(availableData(data));
  };
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
        Lab Categories
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
                Categories Name
              </TableCell>
              <TableCell align="left" style={{ minWidth: "100px" }}>
                Date
              </TableCell>
              {/* <TableCell align="left" style={{ minWidth: "100px" }}>
                Edit
              </TableCell> */}
              <TableCell align="left" style={{ minWidth: "100px" }}>
                Delete
              </TableCell>
              <TableCell align="left" style={{ minWidth: "100px" }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categorydata && Array.isArray(categorydata) ? (
              categorydata
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((data) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={data._id}>
                    <TableCell align="left"> {data.Testname}</TableCell>
                    <TableCell align="left">{data.createdAt}</TableCell>
                    {/* <TableCell align="left"> */}
                    {/* <Stack spacing={2} direction={"row"}>
                        <EditIcon
                        sx={{
                          fontSize: "20px",
                          color: "blue",
                          cursor: "pointer",
                        }}
                        />
                        
                        <DeleteIcon />
                      </Stack> */}
                    {/* </TableCell> */}
                    <TableCell>
                      {data.is_available === 1 ? (
                        <Button
                          variant="contained"
                          onClick={() => handleButtonClick(data._id)}
                        >
                          Available
                        </Button>
                      ) : (
                        <Button
                          variant="contained"
                          onClick={() => handleButtonClick(data._id)}
                        >
                          Not AVailable
                        </Button>
                      )}
                    </TableCell>
                    <TableCell align="left">
                      {/* <Typography
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          height: "100%",
                          color: "#1778F2",
                          fontWeight: "bold",
                        }}
                      >
                        <SubCategory sub={data.sub} />
                      </Typography> */}
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
        count={categorydata?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Dialog open={open} fullWidth>
        <DialogTitle>LAB CATEGORIES</DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            {/* <DialogContentText>Test Categories</DialogContentText> */}
            <TextField
              {...register("TestName")}
              margin="dense"
              id="name"
              label="TestName"
              type="name"
              variant="standard"
              fullWidth
              sx={{ width: "100%" }}
            />
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

export default LabCategory;
