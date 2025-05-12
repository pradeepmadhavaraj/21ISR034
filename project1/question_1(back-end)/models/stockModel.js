const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
  ticker: { type: String, required: true },
  price: { type: Number, required: true },
  lastUpdatedAt: { type: Date, default: Date.now }
});

const Stock = mongoose.model('Stock', stockSchema);
module.exports = Stock;
