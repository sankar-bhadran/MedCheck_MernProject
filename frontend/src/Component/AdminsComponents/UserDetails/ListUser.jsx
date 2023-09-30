import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Divider, Typography, Button } from "@mui/material";
import Box from "@mui/material/Box";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser, blockUser } from "../../../redux/features/admiSlice";
import { ToastContainer, toast } from "react-toastify";

export default function StickyHeadTable() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.admin);
  const userdata = useSelector((state) => state.admin.Data);
  console.log("userdata", userdata);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleButtonClick = (data) => {
    dispatch(blockUser(data));
  };

  useEffect(() => {
    dispatch(getUser());
  }, [data.adminActionStatus]);

  useEffect(() => {
    dispatch(getUser());
  }, []);

  return (
    <Paper
      sx={{
        width: "100%",
        overflow: "hidden",
        padding: "12px",
      }}
    >
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Typography
        gutterBottom
        variant="h5"
        component="div"
        sx={{ padding: "20px" }}
      >
        USER DETAILS
      </Typography>
      <Divider />
      <Box height={10} />
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="left" style={{ minWidth: "100px" }}>
                User Name
              </TableCell>
              <TableCell align="left" style={{ minWidth: "100px" }}>
                Email Address
              </TableCell>
              <TableCell align="left" style={{ minWidth: "100px" }}>
                Phone Number
              </TableCell>
              <TableCell align="left" style={{ minWidth: "100px" }}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userdata && Array.isArray(userdata) ? (
              userdata
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((data) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={data._id}>
                    <TableCell align="left">{data.username}</TableCell>
                    <TableCell align="left">{data.email}</TableCell>
                    <TableCell align="left">{data.phonenumber}</TableCell>
                    <TableCell>
                      {data.is_blocked ? (
                        <Button
                          variant="contained"
                          onClick={() => handleButtonClick(data._id)}
                        >
                          Block
                        </Button>
                      ) : (
                        <Button
                          variant="contained"
                          onClick={() => handleButtonClick(data._id)}
                        >
                          Unblock
                        </Button>
                      )}
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
        count={userdata?.length}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
