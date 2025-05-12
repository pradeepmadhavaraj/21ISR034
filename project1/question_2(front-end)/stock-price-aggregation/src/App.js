import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StockPage from './components/StockPage';
import CorrelationHeatmap from './components/CorrelationHeatmap';
import { Container, AppBar, Toolbar, Typography, Box, Button } from '@mui/material';

function App() {
  return (
    <Router>
      <Box>
        <AppBar position="sticky">
          <Toolbar>
            <Typography variant="h6">Stock Price Aggregator</Typography>
          </Toolbar>
        </AppBar>
        <Container>
          <Routes>
            <Route path="/" element={<StockPage />} />
            <Route path="/correlation" element={<CorrelationHeatmap />} />
          </Routes>
        </Container>
      </Box>
    </Router>
  );
}

export default App;
