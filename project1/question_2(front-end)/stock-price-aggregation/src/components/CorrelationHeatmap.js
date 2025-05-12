import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Heatmap } from 'react-heatmap-grid';
import { Box, Typography } from '@mui/material';

const CorrelationHeatmap = () => {
  const [correlationData, setCorrelationData] = useState([]);
  const [selectedStock, setSelectedStock] = useState(null);

  useEffect(() => {
    axios.get(`/api/correlation`)
      .then(response => {
        setCorrelationData(response.data);
      })
      .catch(error => console.error('Error fetching correlation data', error));
  }, []);

  const handleCellClick = (i, j) => {
    // Show details when a cell is clicked
    setSelectedStock({ stock1: i, stock2: j });
  };

  return (
    <Box>
      <Typography variant="h4">Correlation Heatmap</Typography>
      <Heatmap
        data={correlationData}
        onClick={handleCellClick}
        xLabels={['Stock A', 'Stock B', 'Stock C']} // Replace with real stock names
        yLabels={['Stock A', 'Stock B', 'Stock C']} // Replace with real stock names
      />
      {selectedStock && (
        <Box>
          <Typography variant="h6">Stock Pair: {selectedStock.stock1} & {selectedStock.stock2}</Typography>
          {/* Render average and standard deviation for the selected pair */}
        </Box>
      )}
    </Box>
  );
};

export default CorrelationHeatmap;
