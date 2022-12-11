const passport = require('passport');
const config= require('../config')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../models/User');

require('dotenv').config();

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: config.google_callbackURL,
},
((accessToken, refreshToken, profile, done) => {
  User.findOrCreate({ userid: profile.id },
    {
      $setOnInsert: {
        userid: profile.id,
        name: profile.displayName || 'John Doe',
        photo: profile.photos[0].value || '',
        email: profile.emails[0].value || 'No public email',
        created_on: new Date(),
        provider: profile.provider || '',
      },
      $set: {
        last_login: new Date(),
      },
      $inc: {
        login_count: 1,
      },
    },
    { upsert: true }, (err, user) => done(err, user));
})));

module.exports = passport;
