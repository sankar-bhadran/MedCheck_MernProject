import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { categorydetails } from "../../../redux/features/CenterSlice";
import { clearTestDetails } from "../../../redux/features/CenterSlice";
import { useDispatch, useSelector } from "react-redux";
const DetailPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  console.log("id", id);

  useEffect(() => {
    dispatch(categorydetails(id));
  }, []);

  useEffect(() => {
    dispatch(clearTestDetails());
  }, []);

  const testdata = useSelector((state) => state.center.TestDetails);

  const [selectedMainCategory, setSelectedMainCategory] = useState(null);

  const groupedData = {};
  testdata.forEach((item) => {
    if (!groupedData[item.mainCategory]) {
      groupedData[item.mainCategory] = [];
    }
    groupedData[item.mainCategory].push(item.subCategory);
  });

  const handleMainCategoryClick = (selectedMainCategory) => {
    setSelectedMainCategory(selectedMainCategory);
  };

  return (
    <Box sx={{ margin: "70px" }}>
      <Grid container spacing={3}>
        {Object.keys(groupedData).map((mainCategory, index) => (
          <Grid
            item
            key={mainCategory}
            onClick={() => handleMainCategoryClick(mainCategory)}
          >
            <Paper
              sx={{
                width: "190px",
                height: "160px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {mainCategory}
            </Paper>
          </Grid>
        ))}

        {selectedMainCategory ? (
          <Grid item xs={12}>
            {/* <h2>Subcategories for {selectedMainCategory}</h2> */}
            <div>
              {groupedData[selectedMainCategory].map((subCategory, index) => (
                <Chip
                  key={index}
                  label={subCategory}
                  component="a"
                  href="#basic-chip"
                  variant="outlined"
                  clickable
                  sx={{ margin: "4px" }}
                />
              ))}
            </div>
          </Grid>
        ) : (
          <Grid item xs={12}>
            <div>No main category selected</div>
          </Grid>
        )}

        <Grid item lg={12} md={6}>
          <Paper
            sx={{
              width: "100%",
              height: "101%",
              borderRadius: "10px",
            }}
            variant="outlined"
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                margin: "30px",
              }}
            >
              <Stack direction={"row"} alignItems={"center"}>
                <Typography>Influenza Virus (H3N2) RTPCR - SWAB</Typography>
              </Stack>
              <Stack direction={"row"} alignItems={"center"} spacing={3}>
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{ margin: "0 16px" }}
                />
                <Typography>₹ 1600</Typography>
                <Button
                  type="submit"
                  variant="outlined"
                  sx={{ color: "#1778F2" }}
                >
                  Add
                </Button>
              </Stack>
            </Box>
            <Divider sx={{ margin: "5px" }} />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                margin: "30px",
              }}
            >
              <Stack direction={"row"} alignItems={"center"}>
                <Typography>Influenza Virus (H3N2) RTPCR - SWAB</Typography>
              </Stack>
              <Stack direction={"row"} alignItems={"center"} spacing={3}>
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{ margin: "0 16px" }}
                />
                <Typography>₹ 1600</Typography>
                <Button
                  type="submit"
                  variant="outlined"
                  sx={{ color: "#1778F2" }}
                >
                  Add
                </Button>
              </Stack>
            </Box>
            <Divider />
          </Paper>
        </Grid>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            margin: "30px",
          }}
        >
          <Button type="submit" variant="outlined" sx={{ color: "#1778F2" }}>
            View More
          </Button>
        </Box>
      </Grid>
    </Box>
  );
};

export default DetailPage;
