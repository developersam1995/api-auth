const JWT = require('jsonwebtoken');
const User = require('../models/user');

function signToken(user) {
  return JWT.sign({
    issuer: 'authApp',
    subject: user.id,
    iat: new Date().getTime(),
    expTime: new Date().setDate(new Date().getDate() + 1)
  }, 'iamsam'); //secret
}

module.exports = {
  signUp: async (req, res, next) => {
    const { email, password } = req.value.body;

    const foundUser = await User.findOne({ email });

    if (foundUser) {
      return res.status(403).send({ error: 'Email already in use' });
    }

    const newUser = new User({ email, password });
    await newUser.save();

    const token = signToken(newUser);
    // res.json({user: 'created'});


    res.status(200).json({ token });
  },

  signIn: async (req, res, next) => {
    // generate token
  },

  secret: async (req, res, next) => {
    console.log('i managed');
    res.json({secret:'secret'});
  },
}