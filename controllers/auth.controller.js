const jwt = require("jsonwebtoken");

exports.twitter = (req, res) => {
  const io = req.app.get('io');
  const user = {
    name: req.user.username,
    photo: req.user.photos[0].value.replace(/_normal/, ''),
  };
  io.in(req.session.socketId).emit('twitter', user);
};

exports.google = (req, res) => {
  const io = req.app.get('io');
  const { user } = req;
  const token = jwt.sign({ id: user.doc._id }, process.env.JWT_SECRET);
  let userDoc={id:user.doc._id,email: user.doc.email, name: user.doc.name,photo: user.doc.photo}
  io.in(req.session.socketId).emit('google', {token,user:userDoc});
};

exports.facebook = (req, res) => {
  const io = req.app.get('io');
  const { givenName, familyName } = req.user.name;
  const user = {
    name: `${givenName} ${familyName}`,
    photo: req.user.photos[0].value,
  };
  io.in(req.session.socketId).emit('facebook', user);
};

