const config = {
  dev: {
    google_callbackURL: 'http://localhost:8000/auth/google/callback',
    facebook_callbackURL: 'http://localhost:8000/auth/facebook/callback',
  },
  production: {
    google_callbackURL: 'https://kareus.herokuapp.com/auth/google/callback',
    facebook_callbackURL: 'https://kareus.herokuapp.com/auth/facebook/callback',
  },
};

module.exports = config[process.env.node_env || 'dev'];
