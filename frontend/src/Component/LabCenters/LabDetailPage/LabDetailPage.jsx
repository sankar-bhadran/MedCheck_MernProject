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
import DeleteIcon from "@mui/icons-material/Delete";
import { Link, useParams } from "react-router-dom";
import {
  addToCart,
  getuser,
  removeFromCart,
  labAddToCart,
  labRemoveFromCart
} from "../../../redux/features/userSlice";
import { getAllAddedTest, getLabTest } from "../../../redux/features/labSlice";
import { useDispatch, useSelector } from "react-redux";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -1,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 6px",
  },
}));
const LabDetailPage = () => {
  const userdata = useSelector((state) => state.user.Data);
  console.log("addtocart", userdata?.testCart?.item.length);
  console.log("userData", userdata);
  const [selectedValue, setSelectedValue] = useState(null);
  const [clickedChips, setClickedChips] = useState("");

  const handleChipClick = (value) => {
    setSelectedValue(value);
  };

  const dispatch = useDispatch();
  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    dispatch(getAllAddedTest(id));
  }, []);


  useEffect(() => {
    dispatch(getuser());
  }, []);

  const testdata = useSelector((state) => state.labcenter.intialData);
  const testDetails = useSelector((state) => state.labcenter.commonData);
  console.log("testDetails", testDetails);

  const [selectedMainCategory, setSelectedMainCategory] = useState(null);
  console.log("mainCategory", selectedMainCategory);

  const groupedData = {};
  testdata?.forEach((item) => {
    if (!groupedData[item.mainCategory]) {
      groupedData[item.mainCategory] = [];
    }
    groupedData[item.mainCategory].push(item.subCategory);
  });
  const uniqueSubCategories = new Set();

  const handleMainCategoryClick = (selectedMainCategory) => {
    setSelectedMainCategory(selectedMainCategory);
  };

  // const getChipLabel = (e) => {
  //   setClickedChips(e.currentTarget.innerText);
  // };

  useEffect(() => {
    const formData = {
      mainCategory: selectedMainCategory,
      // clickedvalue: clickedChips,
      labId: id,
    };
    dispatch(getLabTest(formData));
  }, [selectedMainCategory]);

  const handleClick = (id) => {
    dispatch(labAddToCart(id));
    console.log("id ", id);
  };

  const handleDelete = (id) => {
    console.log("deleteId", id);
    dispatch(labRemoveFromCart(id));
  };
  return (
    <>
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
                  borderStyle: "solid",
                  borderWidth: "1px",
                  borderColor: "#1778F2",
                  borderRadius: "6px",
                }}
              >
                {mainCategory}
              </Paper>
            </Grid>
          ))}
          {/* 
          {selectedMainCategory ? (
            <Grid item xs={12}>
              <div>
                {groupedData[selectedMainCategory].map((subCategory, index) => {
                  if (!uniqueSubCategories.has(subCategory)) {
                    uniqueSubCategories.add(subCategory);

                    return (
                      <Chip
                        key={index}
                        label={subCategory}
                        component="a"
                        // href="#basic-chip"
                        variant="outlined"
                        onClick={getChipLabel}
                        sx={{
                          margin: "4px",
                        }}
                      />
                    );
                  }
                  return null;
                })}
              </div> */}
          {/* </Grid>
          ) : (
            <Grid item xs={12}>
              <div>No main category selected</div>
            </Grid>
          )} */}

          <Grid item lg={12} md={6}>
            <Paper
              sx={{
                width: "100%",
                height: "101%",
                borderRadius: "10px",
              }}
              variant="outlined"
            >
              {testDetails?.map((data) => (
                <>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      margin: "30px",
                    }}
                  >
                    <Stack direction={"row"} alignItems={"center"}>
                      <Typography>{data.description}</Typography>
                    </Stack>
                    <Stack direction={"row"} alignItems={"center"} spacing={3}>
                      <Divider
                        orientation="vertical"
                        flexItem
                        sx={{ margin: "0 16px" }}
                      />
                      <Typography>₹ {data.price}</Typography>
                      {/* {{const isValuePresent = userdata.testCart.item.some((obj) => obj.TestId === data.id)}}
                    <Button
                      type="submit"
                      variant="outlined"
                      sx={{ color: "#1778F2" }}
                      onClick={() => handleClick(data._id)}
                    >
                      Add
                    </Button> */}
                      {userdata?.testCart.item.some(
                        (obj) => obj.TestId === data._id
                      ) ? (
                        <Button
                          type="submit"
                          variant="outlined"
                          // sx={{ color: "#FF0000" }}
                          onClick={() => handleDelete(data._id)}
                        >
                          <DeleteIcon />
                        </Button>
                      ) : (
                        <Button
                          type="submit"
                          variant="outlined"
                          sx={{ color: "#1778F2" }}
                          onClick={() => handleClick(data._id)}
                        >
                          Add
                        </Button>
                      )}
                    </Stack>
                  </Box>
                  <Divider sx={{ margin: "5px" }} />
                </>
              ))}
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
      {userdata?.testCart?.item.length > 0 ? (
        <Button
          sx={{
            color: "#ffff",
            position: "fixed",
            bottom: "20px",
            right: "50px",
            backgroundColor: "#1778F2",
            width: "150px",
            borderRadius: "10px",
            "&:hover": {
              backgroundColor: "#1261cc",
            },
          }}
          component={Link}
          to={`/booklabtest/${id}`}
        >
          <StyledBadge
            badgeContent={userdata?.testCart?.item.length}
            color="secondary"
          >
            <ShoppingCartIcon />
          </StyledBadge>
          <span style={{ marginLeft: "20px" }}>
            {userdata?.testCart?.item.length} Test
          </span>
        </Button>
      ) : (
        ""
      )}
    </>
  );
};

export default LabDetailPage;
