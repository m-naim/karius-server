const express = require('express');

const router = express.Router();
const Stock = require('../models/stock');

router.get('/api/v1/stocks', (req, res) => {
  Stock.find()
    .exec((err, state) => {
      if (err) res.status(500).send({ error: 'Something failed!' });
      else if (!state || state.length === 0) res.status(404).send({ message: 'not found' });
      else res.send(state);
    });
});
router.get('/api/v1/stocks/search/:symbol', (req, res) => {
  if(req.params.symbol.length==0) res.send([])
  Stock.find({ symbol: new RegExp(`^${req.params.symbol}`, 'i') })
    .exec((err, state) => {
      console.log(state);
      if (err) res.status(500).send({ error: 'Something failed!' });
      else if (!state || state.length === 0) res.status(404).send({ message: 'not found' });
      else res.send(
        state
        .sort((a,b) => a.symbol.length - b.symbol.length).slice(0,5)
        .map((s) => ({ 'symbol': s.symbol, 'name': s.name, 'logo': s.logo })));
    });
});
router.get('/api/v1/stocks/:symbol', (req, res) => {
  Stock.find({ symbol: `/${req.params.symbol}/i` })
    .exec((err, state) => {
      if (err) res.status(500).send({ error: 'Something failed!' });
      else if (!state || state.length === 0) res.status(404).send({ message: 'not found' });
      else res.send(state);
    });
});
router.get('/api/v1/stocks/contains/:symbol', (req, res) => {
  Stock.find({ symbol: { $regex: `.*${req.params.symbol}.*`, $options: 'i' } })
    .exec((err, state) => {
      if (err) res.status(500).send({ error: 'Something failed!' });
      else if (!state || state.length === 0) res.status(404).send({ message: 'not found' });
      else res.send(state);
    });
});

router.get('/api/v1/index/perfs/:symbol', (req, res) => {
  Stock.find({ symbol: { $regex: `.*${req.params.symbol}.*`, $options: 'i' } })
    .exec((err, state) => {
      if (err) res.status(500).send({ error: 'Something failed!' });
      else if (!state || state.length === 0) res.status(404).send({ message: 'not found' });
      else res.send(state);
    });
});

module.exports = router;
