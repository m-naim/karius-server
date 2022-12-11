const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    user: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    name: String,
    limite: Date,
    important: {
      type: Boolean,
      default: false,
    },
    list: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'task',

      },
    ],
  },
);
taskSchema.methods.addUser = function (u) {
  this.user.push(u);
  return this;
};

taskSchema.methods.addList = function (l) {
  this.list.push(l);
  return this;
};
taskSchema.methods.change = function () {
  this.important = !this.important;
  return this;
};
taskSchema.methods.setlimite = function (date) {
  console.log(date);
  this.limite = date;
  return this;
};
module.exports = mongoose.model('Task', taskSchema);
