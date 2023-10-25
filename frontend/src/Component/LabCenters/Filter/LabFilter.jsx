import React from 'react'
import  { useEffect, useState } from "react";
import { Box, Paper, Typography } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import {
  searchDetails,
  getListingDetails,
} from "../../../redux/features/CenterSlice";
import { useDispatch } from "react-redux";
import debounce from "lodash.debounce";

const LabFilter = () => {
    const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    dispatch(searchDetails(search));
  }, [search]);

  console.log("search", search);
  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    border: "2px solid #c0c0c0", // Add this line to set the border color
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
  }));
  return (
    <Box
      sx={{
        display: {
          md: "flex",
          sm: "flex",
        },
        justifyContent: {
          md: "center",
          sm: "center",
        },
        alignItems: {
          md: "center",
          sm: "center",
        },
        position: "sticky",
        top: "10px",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: {
            md: "800px",
            lg: "300px",
            sm: "600px",
            xs: "300px",
          },
          height: {
            md: "200px",
            lg: "300px",
            sm: "300px",
            xs: "400px",
          },
          padding: "16px",
          borderRadius: "8px",
          boxShadow: "0 5px 5px rgba(0, 0, 0, 0.1)",
            // border: "1px solid #1778F2",
            // backgroundColor:'#F8F8F8',
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography>Filters</Typography>
          <Typography sx={{ color: "#828282" }}>Clear All</Typography>
        </Box>
        <div
          style={{
            width: "100%",
            height: "2px",
            backgroundColor: "#c0c0c0",
            margin: "10px auto",
          }}
        ></div>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            autoFocus
            placeholder="Search…"
            value={search}
            inputProps={{ "aria-label": "search" }}
            onChange={handleChange}
          />
        </Search>
      </Paper>
    </Box>
  )
}

export default LabFilter