import React from "react";
import { useEffect, useState } from "react";
import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { getListingDetails } from "../../../redux/features/CenterSlice";
import debounce from "lodash.debounce";
import { searching } from "../../../redux/features/labSlice";
import { getAllLocations } from "../../../redux/features/userSlice";
import { useDispatch, useSelector } from "react-redux";

const LabFilter = () => {
  const locations = useSelector((state) => state.user.locationData);

  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const [selectedLocations, setSelectedLocations] = useState("");
  console.log(" selectedLocations", selectedLocations);
  const handleCheckboxClick = (place) => {
    setSelectedLocations(place);
  };

  useEffect(() => {
    dispatch(searching({ search, selectedLocations }));
  }, [search, selectedLocations]);

  useEffect(() => {
    dispatch(getAllLocations());
  }, []);

  const handleCheckboxChange = (location) => {
    // if (selectedLocations?.includes(place)) {
    //   setSelectedLocations(selectedLocations.filter((item) => item !== place));
    // } else {
    //   setSelectedLocations([...selectedLocations, place]);
    // }
    location = selectedLocations === location ? "" : location;
    setSelectedLocations(location);
  };

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
            lg: "100%",
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
        <div
          style={{
            width: "100%",
            height: "2px",
            backgroundColor: "#c0c0c0",
            margin: "10px auto",
          }}
        ></div>
        <Typography sx={{ color: "#828282" }}>Locations</Typography>
        <Grid container>
          {locations?.[0].location?.map((data, index) => (
            <Grid item mb={-1} key={data._id} lg={12}>
              {/* {data.location.map((place, placeIndex) => ( */}
              <Stack>
                <FormControlLabel
                  key={data}
                  control={
                    <Checkbox
                      inputProps={{ "aria-label": "controlled" }}
                      size="small"
                      // onClick={() => handleCheckboxClick(place)}
                      onChange={() => handleCheckboxChange(data)}
                      checked={data === selectedLocations}
                    />
                  }
                  label={data}
                />
              </Stack>
              {/* ))} */}
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Box>
  );
};

export default LabFilter;
