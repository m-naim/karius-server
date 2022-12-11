const State = require('../models/state');

module.exports = {
  new: (req, res, next) => {
    const newState = new State(req.body);
    newState.save()
      .then(
        () => {
          res.status(200).send({ message: 'new state added with success' });
        },
      );
  },

  get: (req, res, next) => {
    console.log(req.params);
    State.findOne({
      userId: [req.params.userId],
    })
      .exec((err, state) => {
        if (err) res.status(500).send({ error: 'Something failed!' });
        else if (!state || state.length === 0) res.status(404).send({ message: 'not found' });
        else res.send(state);
      });
  },

  update: (req, res, next) => {
    const query = { userId: req.body.userId };
    State.findOneAndUpdate(query, req.body,
      { upsert: true },
      (err, state) => {
        if (err) res.status(500).send(err);
        else if (!state) res.status(404).send({ message: 'not found' });
        else res.send(state);
      });
  },
};
