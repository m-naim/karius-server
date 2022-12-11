/* eslint-disable consistent-return */
const express = require('express');

const router = express.Router();


router.get('/', (req, res) => {
  res.send( {health:"app is up!"});
});


module.exports = router;
