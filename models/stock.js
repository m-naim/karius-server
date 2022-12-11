const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema(
  {
    userId: String,
    name: String,
    symbol: String,
    last: Number,
    peg: Number,
    country: String,
    currency: String,
    industry: String,
    sector: String,
    last_update: Date,
    logo: String,
  },
);

module.exports = mongoose.model('stock', stockSchema);
