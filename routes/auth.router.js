const express = require('express');

const router = express.Router();
const passport = require('passport');
const authController = require('../controllers/auth.controller');
const passportGoogle = require('../auth/google');

// Setting up the passport middleware for each of the OAuth providers
const twitterAuth = passport.authenticate('twitter');
const googleAuth = passportGoogle.authenticate('google', {
  scope: [
    'https://www.googleapis.com/auth/userinfo.profile',
    'profile',
    'https://www.googleapis.com/auth/plus.login',
    'https://www.googleapis.com/auth/userinfo.email'],
});
const facebookAuth = passport.authenticate('facebook');

// This custom middleware allows us to attach the socket id to the session.
// With the socket id attached we can send back the right user info to
// the right socket
const addSocketIdtoSession = (req, res, next) => {
  req.session.socketId = req.query.socketId;
  next();
};

// Routes that are triggered by the React client
router.get('/twitter', addSocketIdtoSession, twitterAuth);
router.get('/google', addSocketIdtoSession, googleAuth);
router.get('/facebook', addSocketIdtoSession, facebookAuth);

// Routes that are triggered by callbacks from OAuth providers once
// the user has authenticated successfully
router.get('/auth/twitter/callback', twitterAuth, authController.twitter);
router.get('/auth/google/callback', googleAuth, authController.google);
router.get('/auth/facebook/callback', facebookAuth, authController.facebook);

module.exports = router;
