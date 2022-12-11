const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    followers: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }],
    name: String,
    allocation: [
      {
        asset: {
          type: mongoose.Schema.Types.ObjectId,
          require: true,
          ref: 'stock',
        },
        weight: Number,
        qty: Number,
        bep: Number,
        total_value: Number,
        symbol: String,
        last: Number,
      },
    ],
    transactions: [
      {
        qty: Number,
        price: Number,
        date: Date,
        symbol: String,
      }
    ],
    cash_flow: [{
      date: Date,
      amount: Number,
      action: String,
    }],
    perfs: {
      cum_All: [],
      cum_1M: [],
      cum_6M: [],
      cum_1Y: [],
      sum: [],
      date: [],
    },
    public: Boolean,
    last_perfs_update: Date,
  },
);

portfolioSchema.methods.addUser = function (u) {
  this.owner = u;
  return this;
};

portfolioSchema.methods.addFollower = function (u) {
  if (this.followers.includes(u)) this.followers = this.followers.filter((e) => e != u)
  else this.followers.push(u)
  return this;
};

portfolioSchema.methods.addTransaction = function (t) {
  this.transactions.push(t);
  return this;
};

portfolioSchema.methods.addAllocation = function (a) {
  this.allocation.push(a);
  return this;
};

module.exports = mongoose.model('portfolio', portfolioSchema);
