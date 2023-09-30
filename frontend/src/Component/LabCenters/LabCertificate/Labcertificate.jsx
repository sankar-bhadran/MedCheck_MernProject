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
const Labcertificate = ({ state, setState }) => {
  const fileInputRef4 = React.useRef(null);
  const fileInputRef5 = React.useRef(null);
  const fileInputRef6 = React.useRef(null);

  const handleFileChange = (event) => {
    console.log("alkrgj");
    const file = event.target.files[0];
    console.log(file);
    setState((prev) => ({ ...prev, [event.target.name]: file }));
    console.log(state);
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
                Upload Certificate
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
                    <Typography
                      sx={{
                        margin: "20px",
                        marginBottom: "15px",
                        color: "#1778F2",
                        fontWeight: "bold",
                      }}
                    >
                      NABH CERTIFICATE
                    </Typography>
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
                        onClick={() => fileInputRef4.current.click()}
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
                        {state.NABH ? (
                          <img
                            style={{ width: 240, height: 240, padding: 22 }}
                            src={URL.createObjectURL(state.NABH)}
                          />
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
                            onClick={() => fileInputRef4.current.click()}
                          >
                            Upload Certificate
                          </Typography>
                        )}
                      </Paper>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Typography
                      sx={{
                        margin: "20px",
                        marginBottom: "15px",
                        color: "#1778F2",
                        fontWeight: "bold",
                      }}
                    >
                      ISO CERTIFICATE
                    </Typography>
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
                        onClick={() => fileInputRef5.current.click()}
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
                        {state.ISO ? (
                          <img
                            onClick={() => fileInputRef5.current.click()}
                            style={{ width: 240, height: 240, padding: 22 }}
                            src={URL.createObjectURL(state.ISO)}
                          />
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
                            onClick={() => fileInputRef5.current.click()}
                          >
                            Upload Certificate
                          </Typography>
                        )}
                      </Paper>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Typography
                      sx={{
                        margin: "20px",
                        marginBottom: "15px",
                        color: "#1778F2",
                        fontWeight: "bold",
                      }}
                    >
                      NABL CERTIFICATE
                    </Typography>
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
                        onClick={() => fileInputRef6.current.click()}
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
                        {state.NABL ? (
                          <img
                            style={{ width: 240, height: 240, padding: 22 }}
                            src={URL.createObjectURL(state.NABL)}
                          />
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
                            onClick={() => fileInputRef6.current.click()}
                          >
                            Upload Certificate
                          </Typography>
                        )}
                      </Paper>
                    </Box>
                  </Grid>
                </Grid>
              </Stack>
            </Box>
          </Paper>
        </Container>
        <input
          ref={fileInputRef4}
          type="file"
          name="NABH"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />{" "}
        <input
          ref={fileInputRef5}
          type="file"
          name="ISO"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />{" "}
        <input
          ref={fileInputRef6}
          type="file"
          name="NABL"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
      </Grid>
    </>
  );
};

export default Labcertificate;
