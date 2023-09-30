import React from 'react'
import { Container, Grid, Paper, Typography, Button } from '@mui/material';


const RejectionPage = () => {
   
  return (
    <Container sx={{ marginTop: '5%' }}>
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={8} md={6}>
        <Paper elevation={3} sx={{ p: 3, boxShadow: 2 }}>
          <Typography variant="h4" align="center" gutterBottom>
            YOUR REGISTRATION HAS BEEN COMPLETED
          </Typography>
          <Typography variant="h5" align="center" gutterBottom>
            Please wait for admin approval.
          </Typography>
          <Typography align="center" gutterBottom>
            Your registration process is complete.
          </Typography>
          <Typography align="center" gutterBottom>
            You will receive a notification once your registration is approved by the admin.
          </Typography>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
            <Button variant="contained" color="warning" size="large">
              CONTINUE
            </Button>
          </div>
        </Paper>
      </Grid>
    </Grid>
  </Container>
  )
}

export default RejectionPage