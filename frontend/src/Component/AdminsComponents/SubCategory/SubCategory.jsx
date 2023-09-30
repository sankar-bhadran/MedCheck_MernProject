import React, { useEffect } from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getSubCategory } from "../../../redux/features/admiSlice";

const SubCategory = ({ sub }) => {
  const dispatch = useDispatch();
  console.log(sub);
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        sx={{ color: "#1778F2", fontWeight: "bold" }}
      >
        View Detail
      </Button>
      <Dialog open={open}>
        <DialogTitle>SUB CATEGORIES</DialogTitle>
        <DialogContent>
          <DialogContentText></DialogContentText>
          {sub?.name.map((x) => (
            <TextField
              margin="dense"
              id="name"
              type="name"
              value={x}
              variant="standard"
              fullWidth
              sx={{ width: "100%" }}
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          {/* <Button type="submit" onClick={handleClickOpen}>
            SUBMIT
          </Button> */}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SubCategory;
