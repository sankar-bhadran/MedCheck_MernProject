import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import download from "../../../Assets/upload.png";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { uploadReport } from "../../../redux/features/CenterSlice";
import { useDispatch, useSelector } from "react-redux";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  margin: "",
  whiteSpace: "nowrap",
  width: 1,
});

const UploadReport = ({id}) => {


  console.log("id",id)
  const dispatch = useDispatch();
  const [state, setState] = useState(null);
  const [fileUploaded, setFileUploaded] = useState(false);

  console.log("state", state);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    const formData = new FormData();
    formData.append("image", state);
    formData.append("id",id)
    dispatch(uploadReport(formData));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log(file);
    setState(file);
    setFileUploaded(true);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Uploadreport
        <img
          src={download}
          style={{ marginLeft: "px" }}
          width="20px"
          minHeight="20px"
        />
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth>
        {/* <DialogTitle>Subscribe</DialogTitle> */}
        <DialogContent>
          {/* <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText> */}
          {fileUploaded ? (
            <div>
              <p>File Uploaded: {state.name}</p>
            </div>
          ) : (
            <div>
              <Button
                component="label"
                variant="contained"
                startIcon={<CloudUploadIcon />}
                fullWidth
              >
                Upload file
                <input
                  type="file"
                  name="image"
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
              </Button>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UploadReport;
