const express = require('express');
const { getAverageStockPriceController, getStockCorrelationController } = require('../controllers/stockController');
const router = express.Router();

// Route to get average stock price
router.get('/average', getAverageStockPriceController);

// Route to get stock correlation
router.get('/correlation', getStockCorrelationController);

module.exports = router;
