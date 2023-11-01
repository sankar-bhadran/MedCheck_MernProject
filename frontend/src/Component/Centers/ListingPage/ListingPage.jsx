import {
  Box,
  Button,
  CardMedia,
  Chip,
  Grid,
  Pagination,
  PaginationItem,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import {
  categorydetails,
  getListingDetails,
  searchDetails,
} from "../../../redux/features/CenterSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import {baseurl} from '../../../utils/constants'

const ListingPage = () => {
  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    setPage(value);
    console.log("hai hai");
  };

  useEffect(() => {
    dispatch(searchDetails({ page }));
  }, [page]);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(searchDetails());
  }, []);

  const listingdetails = useSelector((state) => state.center.Centerdata);
  const pageCount = useSelector((state) => state.center.Centerdata);
  console.log(pageCount);
  console.log("listingdetails", listingdetails);
  return (
    <>
      <Box>
        <Grid container spacing={3} pr={10} mt={-3}>
          {Array.isArray(listingdetails) ? (
            listingdetails?.map((result, index) => (
              <Grid item xs={12} sm={6} md={6} lg={4}>
                <Paper
                  elevation={3}
                  sx={{
                    padding: "16px",
                    borderRadius: "8px",
                    boxShadow: "0 5px 5px rgba(0, 0, 0, 0.1)",
                    //   backgroundColor: "#F8F8F8",
                    width: {
                      lg: "280px",
                      md: "100%",
                      xs: "300px",
                    },
                    height: {
                      lg: "400px",
                    },
                  }}
                >
                  <Typography variant="h6" gutterBottom>
                    {result.CenterName}
                  </Typography>
                  <CardMedia
                    sx={{
                      height: 220,
                      border: "1px solid #e0e0e0",
                      borderRadius: "6px",
                    }}
                    image={`${baseurl}/images/${result?.CenterImages?.[0]}`}
                    title="green iguana"
                  />
                  <Stack direction="row" alignItems="center" mt={2} spacing={1}>
                    <LocationOnIcon />
                    <Typography sx={{ fontSize: "12px" }}>
                      {result.Place}
                    </Typography>
                    <Chip
                      variant="outlined"
                      sx={{
                        borderRadius: "9px",
                        "& .MuiChip-label": {
                          fontWeight: "bold",
                          display: "flex",
                          alignItems: "center",
                        },
                      }}
                      // icon={<Logo sx={{ marginRight: 1 }} />}
                      label="Trusted"
                    />
                  </Stack>
                  <Link to={`/detailpage/${result._id}`}>
                    <Button
                      type="submit"
                      sx={{
                        backgroundColor: "#1778F2",
                        color: "white",
                        width: "100%",
                        mt: 2,
                        borderRadius: "8px",
                        "&:hover": {
                          backgroundColor: "#1778F2",
                          color: "white",
                        },
                      }}
                    >
                      View Tests
                    </Button>
                  </Link>
                </Paper>
              </Grid>
            ))
          ) : (
            <Typography variant="body1">
              No listing details available.
            </Typography>
          )}
        </Grid>
        <Grid item mt={3}>
          <Pagination count={10} page={page} onChange={handleChange} />
        </Grid>
      </Box>
    </>
  );
};

export default ListingPage;
