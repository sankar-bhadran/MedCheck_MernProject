import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Logo from "../../Assets/Screenshot 2023-07-27 192734.png";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/features/userSlice";

export default function ButtonAppBar({ aboutus, login, namenav }) {
  const navigate = useNavigate();
  const userdata = useSelector((state) => state.user.logOut);
  const dispatch = useDispatch();
  const pathname = useLocation().pathname;
  console.log(pathname);
  // const [isLoggedIn, setIsLoggedIn] = useState(
  //   !!localStorage.getItem("existinguser")
  // );
  // useEffect(() => {
  //   setIsLoggedIn(!!localStorage.getItem("existinguser"));
  // }, []);

  const [auth, setAuth] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handlelogout = () => {
    dispatch(logout());
  };



  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
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
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ backgroundColor: "#fff" }}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <img src={Logo} style={{ width: "140px" }} />
            </Typography>
            <Button
              sx={{ color: "#1778F2", fontWeight: "bold", cursor: "pointer" }}
            >
              {aboutus}
            </Button>
            {localStorage.getItem("existinguser") ? (
              // <Button
              //   sx={{ color: "#1778F2", fontWeight: "bold", cursor: "pointer" }}
              //   component={Link}
              //   to="/"
              //   onClick={handlelogout}
              // >
              //   Logout
              // </Button>
              <>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="#1778F2"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem
                    onClick={handleClose}
                    sx={{
                      color: "#1778F2",
                      fontWeight: "bold",
                      cursor: "pointer",
                    }}
                    component={Link}
                    to="/userprofile"
                  >
                    Profile
                  </MenuItem>
                  <MenuItem
                    onClick={handlelogout}
                    sx={{
                      color: "#1778F2",
                      fontWeight: "bold",
                      cursor: "pointer",
                    }}
                    // component={Link}
                    // to="/login"
                  >
                    Logout
                  </MenuItem>
                </Menu>
              </>
            ) : pathname === "/" || pathname === "/centerhomepage" ? (
              <Button
                sx={{
                  color: "#1778F2",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
                component={Link}
                to="/login"
              >
                Login
              </Button>
            ) : (
              " "
            )}
          </Toolbar>
        </AppBar>
      </Box>
      <Box sx={{ flexGrow: 1, marginTop: "1px" }}>
        <AppBar position="static" sx={{ backgroundColor: "#1778F2" }}>
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}
            >
              <ArrowForwardIcon sx={{ marginRight: "30px" }} />
              <Typography sx={{ fontSize: "25px", fontWeight: "bold" }}>
                {namenav}
              </Typography>
            </Typography>

            {
              pathname === "/login" ||
              pathname === "/signup" ||
              pathname === "/verifyotp" ||
              pathname === "/forgotpassword"
                ? ""
                : " "
              // <Search>
              //   <SearchIconWrapper>
              //     <SearchIcon />
              //   </SearchIconWrapper>
              //   <StyledInputBase
              //     placeholder="Search…"
              //     inputProps={{ "aria-label": "search" }}
              //   />
              // </Search>
            }
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}
