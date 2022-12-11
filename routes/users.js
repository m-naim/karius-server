/* eslint-disable consistent-return */
const express = require('express');

const router = express.Router();

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.send({ err: 'not logged' });
}
router.get('/self', ensureAuthenticated, (req, res) => {
  res.send({ user: req.user });
});


module.exports = router;
