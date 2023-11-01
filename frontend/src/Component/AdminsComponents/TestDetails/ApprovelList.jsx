import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Divider, Typography, Button, Card, CardMedia } from "@mui/material";
import Box from "@mui/material/Box";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCenters } from "../../../redux/features/admiSlice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {baseurl} from '../../../utils/constants'

export default function StickyHeadTable() {
  const navigate = useNavigate;
  const dispatch = useDispatch();
  const centerData = useSelector((state) => state.admin.Data);
  console.log("centerData", centerData);
  console.log("Type of centerData:", typeof centerData);

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
    dispatch(getCenters());
  }, []);

  const handleButtonClick = (data) => {
    console.log(data);
    navigate("/viewdetails");
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
        Scan Center Details
      </Typography>
      <Divider />
      <Box height={10} />
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="left" style={{ minWidth: "100px" }}>
                Center Image
              </TableCell>
              <TableCell align="left" style={{ minWidth: "100px" }}>
                Center Name
              </TableCell>
              <TableCell align="left" style={{ minWidth: "100px" }}>
                Email Address
              </TableCell>
              <TableCell align="left" style={{ minWidth: "100px" }}>
                Phone Number
              </TableCell>
              <TableCell align="left" style={{ minWidth: "100px" }}>
                View Details
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {centerData && Array.isArray(centerData) ? (
              centerData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((data) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={data._id}>
                    <TableCell align="left">
                      <Card sx={{ width: "200px" }}>
                        <CardMedia
                          component="img"
                          sx={{ width: 200, margin: 0 }}
                          image={`${baseurl}/images/${data?.CenterImages?.[0]}`}
                          alt="no Image"
                        />
                      </Card>
                    </TableCell>
                    <TableCell align="left">{data.CenterName}</TableCell>
                    <TableCell align="left">{data.owner?.email}</TableCell>
                    <TableCell align="left">{data.ContactNumber}</TableCell>
                    <TableCell align="left">
                      <Link to={`/viewdetails/${data._id}`}>
                        <Button variant="contained">View Details</Button>
                      </Link>
                    </TableCell>
                    <TableCell></TableCell>
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
        count={centerData?.length}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
