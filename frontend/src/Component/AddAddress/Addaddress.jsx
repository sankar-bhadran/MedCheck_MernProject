import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Stack } from "@mui/material";
import { useForm } from "react-hook-form";
import { addaddress } from "../../redux/features/userSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Addaddress() {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    handleClose();
    dispatch(addaddress(data));
  };

  

  return (
    <div>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        sx={{ color: "#1778F2", fontWeight: "bold" }}
      >
        + ADD ADDRESS
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Address</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <DialogContentText></DialogContentText>
            <Stack spacing={2}>
              <TextField
                id="outlined-basic"
                {...register("House")}
                label="Flat/House,Building"
                name="House"
                variant="outlined"
                sx={{ width: "550px" }}
              />
              <TextField
                id="outlined-basic"
                {...register("Area")}
                label="Area, Colony, Street"
                name="Area"
                variant="outlined"
                sx={{ width: "550px" }}
              />
              <TextField
                id="outlined-basic"
                label="City"
                {...register("city")}
                name="city"
                variant="outlined"
                sx={{ width: "550px" }}
              />
              <TextField
                id="outlined-basic"
                {...register("state")}
                label="State"
                name="state"
                variant="outlined"
                sx={{ width: "550px" }}
              />
              <TextField
                id="outlined-basic"
                label="Pincode"
                {...register("pincode")}
                name="pincode"
                variant="outlined"
                sx={{ width: "550px" }}
              />
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox />}
                  label="Default address"
                  name="defaultaddress"
                  {...register("defaultaddress")}
                />
              </FormGroup>
            </Stack>
            <DialogActions>
              <Button
                sx={{
                  backgroundColor: "#5cb85c",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "#5cb85c",
                    color: "white",
                  },
                }}
                type="submit"
              >
                UPDATE
              </Button>
              <Button
                onClick={handleClose}
                autoFocus
                sx={{
                  backgroundColor: "#d9534f",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "#d9534f",
                    color: "white",
                  },
                }}
              >
                Cancel
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
