import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
// import AddTest from "../AddScan/AddScan";
// import ScanBookings from "../ScanBookings/Bookings";
// import AddSlot from "../AddSlot/AddSlot";
import UserProfile from "../UserProfile/userProfile";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;
  console.log("proppssss");
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const UserTab = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="USER PROFILE" {...a11yProps(0)} />
          <Tab label="Bookings   " {...a11yProps(1)} />
          <Tab label="Add Slot" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <UserProfile />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        {/* <ScanBookings /> */}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        {/* <AddSlot /> */}
      </CustomTabPanel>
    </Box>
  );
};

export default UserTab;
