const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../midleware/auth');
const User = require('../models/User');

router.post('/register', async (req, res) => {
  try {
    let {
      email, password, passwordCheck, displayName,
    } = req.body;
    if (!email || !password || !passwordCheck) { return res.status(400).json({ msg: 'Not all fields have been entered.' }); }
    if (password.length < 5) {
      return res
        .status(400)
        .json({ msg: 'The password needs to be at least 5 characters long.' });
    }
    if (password !== passwordCheck) {
      return res
        .status(400)
        .json({ msg: 'Enter the same password twice for verification.' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ msg: 'An account with this email already exists.' });
    }

    if (!displayName) displayName = email;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      password: passwordHash,
      name: displayName,
      provider: 'local',
    });
    const savedUser = await newUser.save();
    const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET);
    res.json({
      token,
      user: {
        name: savedUser.name,
        id: savedUser._id,
        photo: savedUser.photo,
        email: savedUser.email,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // validate
    if (!email || !password) { return res.status(400).json({ msg: 'Not all fields have been entered.' }); }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ msg: 'No account with this email has been registered.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials.' });
    user.logged().save();
    
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        photo: user.photo || '',
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

router.delete('/delete', auth, async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.user);
    res.json(deletedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/tokenIsValid', async (req, res) => {
  try {
    const token = req.header('x-auth-token');
    if (!token) return res.json(false);

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) return res.json(false);

    const user = await User.findById(verified.id);
    if (!user) return res.json(false);

    return res.json({
      name: user.name, photo: user.photo, id: user._id, email: user.email,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// router.get('/', auth, async (req, res) => {
//   console.log(req.user);
//   const user = await User.findById(req.user);
//   console.log('some test on /');
//   console.log(user);
//   res.json({
//     name: user.name,
//     id: user._id,
//     photo: user.photo,
//     email: user.email,
//   });
// });

module.exports = router;
