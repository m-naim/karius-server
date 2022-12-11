const express = require('express');

const router = express.Router();
const WatchList = require('../models/watchList');

router.get('/api/v1/watchlists/:name', (req, res) => {
  WatchList.findOne({
    name: req.params.name,
  })
    .exec((err, state) => {
      if (err) res.status(500).send({ error: 'Something failed!' });
      else if (!state || state.length === 0) res.status(404).send({ message: 'not found' });
      else res.send(state);
    });
});
router.get('/api/v1/watchlists', (req, res) => {
  WatchList.find()
    .exec((err, state) => {
      if (err) res.status(500).send({ error: 'Something failed!' });
      else if (!state) res.send([]);
      else res.send(state);
    });
});

router.post('/api/v1/watchlists', (req, res) => {
  const newWatchList = new WatchList({
    name: req.body.name,
  });
  newWatchList.save().then((data) => res.send(data));
});

router.put('/api/v1/watchlists/', (req, res) => {
  const query = { name: req.body.name };
  WatchList.findOneAndUpdate(query, req.body,
    { upsert: true },
    (err, state) => {
      if (err) res.status(500).send(err);
      else if (!state) res.status(404).send({ message: 'not found' });
      else res.send(state);
    });
});

module.exports = router;
