const express = require('express');
const prediction = require('../models/prediction');

const router = express.Router();

router.get('/api/v1/predictions',
  (req, res) => {
    prediction.findOne({
      date: '2021-12-11',
    })
      .exec((err, state) => {
        if (err) res.status(500).send({ error: 'Something failed!' });
        else if (!state || state.length === 0) res.status(404).send({ message: 'not found' });
        else res.send(state.data);
      });
  });

module.exports = router;
