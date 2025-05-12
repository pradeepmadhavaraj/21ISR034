import React from 'react';
import { Container, Grid, Typography, Button, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import StockChart from './components/StockChart'; 

const HomePage = () => {
  return (
    <Container>
      <Grid container spacing={3}>
        {/* Welcome Section */}
        <Grid item xs={12}>
          <Paper elevation={3} style={{ padding: '20px' }}>
            <Typography variant="h3" gutterBottom>
              Welcome to the Stock Price Aggregation Platform
            </Typography>
            <Typography variant="body1">
              Get real-time insights into stock prices, trends, and correlations.
            </Typography>
          </Paper>
        </Grid>

        {/* Stock Chart Section */}
        <Grid item xs={12} md={8}>
          <Paper elevation={3} style={{ padding: '20px' }}>
            <Typography variant="h5" gutterBottom>
              Latest Stock Prices Overview
            </Typography>
            <StockChart /> {/* This will be your stock chart component */}
          </Paper>
        </Grid>

        {/* Links to other pages */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3} style={{ padding: '20px' }}>
            <Typography variant="h6">Explore More Features</Typography>
            <Button variant="contained" color="primary" fullWidth style={{ marginBottom: '10px' }}>
              <Link to="/stock" style={{ textDecoration: 'none', color: 'white' }}>Go to Stock Page</Link>
            </Button>
            <Button variant="contained" color="secondary" fullWidth>
              <Link to="/heatmap" style={{ textDecoration: 'none', color: 'white' }}>View Correlation Heatmap</Link>
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default HomePage;
