const mongoose = require('mongoose');

const stateSchema = new mongoose.Schema(
  {
    date: String,
    data: [],
  },
);

module.exports = mongoose.model('prediction', stateSchema);
