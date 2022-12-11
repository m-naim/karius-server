const mongoose = require('mongoose');

const stateSchema = new mongoose.Schema(
  {
    userId: String,

    lists: [
      {
        id: String,
        title: String,
      },
    ],
    tasks: [
      {
        listID: String,
        id: String,
        title: String,
        done: Boolean,
        creationDate: Date,
        doneDate: Date,
      },
    ],
    model: {
      open: Boolean,
    },
    selectedList: String,
    selectedTask: String,
  },
);

module.exports = mongoose.model('state', stateSchema);
