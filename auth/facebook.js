/* eslint-disable consistent-return */
const passport = require('passport');
const config= require('../config')
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/User');

passport.use(new FacebookStrategy({
  clientID: '159030901322260',
  clientSecret: '0d641e47f5d55af221ec80346f3f2d43',
  callbackURL: config.facebook_callbackURL,
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
