// backend/controllers/stockController.js
const axios = require('axios');
const Stock = require('../models/stockModel');

// Constants
const STOCK_API_BASE_URL = 'http://20.244.56.144/evaluation-service';

// Function to get stock price history from the external API
const getStockPriceHistory = async (ticker, minutes) => {
  try {
    const response = await axios.get(`${STOCK_API_BASE_URL}/stocks/${ticker}?minutes=${minutes}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching stock price history:', error);
    throw error;
  }
};

// Function to calculate average stock price
const getAverageStockPrice = (prices) => {
  const sum = prices.reduce((total, price) => total + price, 0);
  return sum / prices.length;
};

// Controller for getting the average stock price
const getAverageStockPriceController = async (req, res) => {
  const { ticker, minutes } = req.query;

  if (!ticker || !minutes) {
    return res.status(400).json({ message: "Please provide 'ticker' and 'minutes' query parameters." });
  }

  try {
    const priceHistory = await getStockPriceHistory(ticker, minutes);
    const prices = priceHistory.map((data) => data.price);
    const averagePrice = getAverageStockPrice(prices);

    res.json({
      ticker,
      averagePrice,
      priceHistory
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching or calculating stock data.' });
  }
};

// Controller for calculating correlation between two stocks
const getStockCorrelationController = async (req, res) => {
  const { minutes, ticker1, ticker2 } = req.query;

  if (!ticker1 || !ticker2 || !minutes) {
    return res.status(400).json({ message: "Please provide 'ticker1', 'ticker2', and 'minutes' query parameters." });
  }

  try {
    const priceHistory1 = await getStockPriceHistory(ticker1, minutes);
    const priceHistory2 = await getStockPriceHistory(ticker2, minutes);

    const prices1 = priceHistory1.map((data) => data.price);
    const prices2 = priceHistory2.map((data) => data.price);

    // Pearson correlation calculation
    const mean1 = prices1.reduce((sum, price) => sum + price, 0) / prices1.length;
    const mean2 = prices2.reduce((sum, price) => sum + price, 0) / prices2.length;

    const covariance = prices1.reduce((sum, price, i) => sum + (price - mean1) * (prices2[i] - mean2), 0) / (prices1.length - 1);
    const stddev1 = Math.sqrt(prices1.reduce((sum, price) => sum + Math.pow(price - mean1, 2), 0) / (prices1.length - 1));
    const stddev2 = Math.sqrt(prices2.reduce((sum, price) => sum + Math.pow(price - mean2, 2), 0) / (prices2.length - 1));

    const correlation = covariance / (stddev1 * stddev2);

    res.json({
      correlation,
      stocks: {
        [ticker1]: {
          averagePrice: getAverageStockPrice(prices1),
          priceHistory: priceHistory1
        },
        [ticker2]: {
          averagePrice: getAverageStockPrice(prices2),
          priceHistory: priceHistory2
        }
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error calculating stock correlation.' });
  }
};

module.exports = {
  getAverageStockPriceController,
  getStockCorrelationController
};
