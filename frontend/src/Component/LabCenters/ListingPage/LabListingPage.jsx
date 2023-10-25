import React from "react";
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
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { getLabListingDetail } from "../../../redux/features/labSlice";

const LabListingPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getLabListingDetail());
  }, []);

  const listingdetails = useSelector((state) => state.labcenter.labData);
  console.log("listingdetails", listingdetails);
  return (
    <>
      <Box>
        <Grid container spacing={3} pr={10} mt={-3}>
          {listingdetails?.map((result, index) => (
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
                  image={`http://localhost:5000/images/${result?.CenterImages?.[0]}`}
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
                <Link to={`/labdetailpage/${result._id}`}>
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
          ))}
        </Grid>
        <Stack spacing={2} mt={5}>
          <Pagination
            count={10}
            renderItem={(item) => (
              <PaginationItem
                slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                {...item}
              />
            )}
          />
        </Stack>
      </Box>
    </>
  );
};

export default LabListingPage;
