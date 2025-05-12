import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js';
import { Box, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

ChartJS.register(
  // Add the necessary chart.js components like LineElement, CategoryScale, etc.
);

const StockPage = () => {
  const [stockData, setStockData] = useState([]);
  const [timeInterval, setTimeInterval] = useState('30'); // Default time interval (in minutes)
  const [averagePrice, setAveragePrice] = useState(0);

  useEffect(() => {
    // Fetch data from the backend API based on the selected time interval
    axios.get(`/api/stocks?interval=${timeInterval}`)
      .then(response => {
        setStockData(response.data);
        // Calculate average price
        const avg = response.data.reduce((acc, stock) => acc + stock.price, 0) / response.data.length;
        setAveragePrice(avg);
      })
      .catch(error => console.error('Error fetching stock data', error));
  }, [timeInterval]);

  const handleIntervalChange = (event) => {
    setTimeInterval(event.target.value);
  };

  const chartData = {
    labels: stockData.map(stock => stock.timestamp), // Time stamps for X-axis
    datasets: [
      {
        label: 'Stock Price',
        data: stockData.map(stock => stock.price),
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
        tension: 0.1,
      },
    ],
  };

  return (
    <Box>
      <Typography variant="h4">Stock Price Chart</Typography>
      <FormControl fullWidth margin="normal">
        <InputLabel>Time Interval</InputLabel>
        <Select
          value={timeInterval}
          onChange={handleIntervalChange}
          label="Time Interval"
        >
          <MenuItem value="30">Last 30 minutes</MenuItem>
          <MenuItem value="60">Last 60 minutes</MenuItem>
          <MenuItem value="120">Last 120 minutes</MenuItem>
        </Select>
      </FormControl>
      <Line data={chartData} />
      <Typography variant="h6">Average Price: {averagePrice.toFixed(2)}</Typography>
    </Box>
  );
};

export default StockPage;
