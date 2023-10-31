import React from "react";
import {
  Box,
  Grid,
  Paper,
  Stack,
  Typography,
  Container,
  Divider,
} from "@mui/material";

const Labphoto = ({ state, setState }) => {
  const fileInputRef1 = React.useRef(null);
  const fileInputRef2 = React.useRef(null);
  const fileInputRef3 = React.useRef(null);

  const handleFileChange = (event) => {
    console.log("alkrgj");
    const file = event.target.files[0];
    console.log(file);
    setState((prev) => ({ ...prev, [event.target.name]: file }));
  };
  return (
    <>
      <Grid container>
        <Container sx={{ minHeight: "50vh" }}>
          <Paper
            sx={{
              maxWidth: "1100px",
              margin: "auto",
              marginTop: "50px",
              padding: "20px",
              border: "1px solid #999",
              // display: "flex",
              // flexDirection: "column",
              // alignItems: "center",
            }}
          >
            <Box>
              <Typography
                sx={{
                  margin: "10px",
                  marginBottom: "15px",
                  color: "#1778F2",
                  fontWeight: "bold",
                }}
              >
                Upload Scan Center Photos
              </Typography>
              <Divider
                sx={{
                  width: "100%",
                  backgroundColor: "#c0c0c0",
                  margin: "0 auto 20px auto",
                  marginLeft: "10px",
                  marginRight: "30px",
                }}
              />
              <Stack
                direction="row"
                spacing={15}
                sx={{ marginLeft: "10px", marginBottom: "20px" }}
              >
                <Grid container spacing={3}>
                  <Grid item xs={12} md={4}>
                    <Box
                      sx={{
                        display: "flex",
                        "& > :not(style)": {
                          m: 1,
                          width: 200,
                          height: 200,
                        },
                      }}
                    >
                      <Paper
                        variant="outlined"
                        onClick={() => fileInputRef1.current.click()}
                        square
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          height: "100%",
                          borderColor: "#1778F2",
                          borderWidth: "2px",
                          borderStyle: "dashed",
                          padding: "16px",
                        }}
                      >
                        {state?.image1 ? (
                          typeof state.image1 === "object" &&
                          state.image1.type.startsWith("image/") ? (
                            <img
                              style={{ width: 240, height: 240, padding: 22 }}
                              src={URL.createObjectURL(state.image1)}
                            />
                          ) : (
                            <p>Image is not valid or not found</p>
                          )
                        ) : (
                          <Typography
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: "#1778F2",
                              fontWeight: "bold",
                              cursor: "pointer",
                            }}
                            // onClick={() => fileInputRef1.current.click()}
                          >
                            + Add Photo
                          </Typography>
                        )}
                      </Paper>
                    </Box>
                  </Grid>
                  <input
                    ref={fileInputRef1}
                    type="file"
                    name="image1"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />
                  <Grid item xs={12} md={4}>
                    <Box
                      sx={{
                        display: "flex",
                        "& > :not(style)": {
                          m: 1,
                          width: 200,
                          height: 200,
                        },
                      }}
                    >
                      <Paper
                        variant="outlined"
                        onClick={() => fileInputRef2.current.click()}
                        square
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          height: "100%",
                          borderColor: "#1778F2",
                          borderWidth: "2px",
                          borderStyle: "dashed",
                          padding: "16px",
                        }}
                      >
                        {state?.image2 ? (
                          typeof state.image2 === "object" &&
                          state.image2.type.startsWith("image/") ? (
                            <img
                              style={{ width: 240, height: 240, padding: 22 }}
                              src={URL.createObjectURL(state.image2)}
                            />
                          ) : (
                            <p>Image is not valid or not found</p>
                          )
                        ) : (
                          <Typography
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: "#1778F2",
                              fontWeight: "bold",
                              cursor: "pointer",
                            }}
                            // onClick={() => fileInputRef1.current.click()}
                          >
                            + Add Photo
                          </Typography>
                        )}
                      </Paper>
                    </Box>
                  </Grid>
                  <input
                    ref={fileInputRef2}
                    type="file"
                    name="image2"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />
                  <Grid item xs={12} md={4}>
                    <Box
                      sx={{
                        display: "flex",
                        "& > :not(style)": {
                          m: 1,
                          width: 200,
                          height: 200,
                        },
                      }}
                    >
                      <Paper
                        variant="outlined"
                        onClick={() => fileInputRef3.current.click()}
                        square
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          height: "100%",
                          borderColor: "#1778F2",
                          borderWidth: "2px",
                          borderStyle: "dashed",
                          padding: "16px",
                        }}
                      >
                          {state?.image3 ? (
                          typeof state.image3 === "object" &&
                          state.image3.type.startsWith("image/") ? (
                            <img
                              style={{ width: 240, height: 240, padding: 22 }}
                              src={URL.createObjectURL(state.image3)}
                            />
                          ) : (
                            <p>Image is not valid or not found</p>
                          )
                        ) : (
                          <Typography
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: "#1778F2",
                              fontWeight: "bold",
                              cursor: "pointer",
                            }}
                            // onClick={() => fileInputRef3.current.click()}
                          >
                            + Add Photo
                          </Typography>
                        )}
                      </Paper>
                    </Box>
                  </Grid>
                  <input
                    ref={fileInputRef3}
                    type="file"
                    name="image3"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />
                </Grid>
              </Stack>
            </Box>
          </Paper>
        </Container>
      </Grid>
    </>
  );
};

export default Labphoto;
