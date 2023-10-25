require('dotenv').config();
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const { User, userValidationSchema } = require('../models/User');
const maxAge = 3 * 24 * 60 * 60;

const createToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_KEY, {
    expiresIn: maxAge,
  });
}

router.post('/login', async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.login(email, password);

    if (admin) {
      const token = createToken(admin._id);
      res.json({ token, role: 'admin' });
    }
  } catch (adminError) {
    try {
      const user = await User.login(email, password);

      if (user) {
        if (user.isVerified) {
          const token = createToken(user._id);
          res.json({ token, role: 'user' });
        } else {
          res.status(401).json({ message: 'User is not verified' });
        }
      }
    } catch (userError) {
      res.status(401).json({ message: 'Incorrect email or password' });
    }
  }
});



module.exports = router;
