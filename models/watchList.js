const mongoose = require('mongoose');

const stateSchema = new mongoose.Schema(
  {
    userId: String,
    name: String,
    stocks: [],
  },
);

module.exports = mongoose.model('watchList', stateSchema);
