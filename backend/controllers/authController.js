// controllers/authController.js

const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
  const { name, phone, password, dob } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, phone, password: hashedPassword, dob });
    await user.save();
    res.status(201).send('User registered');
  } catch (error) {
    console.error('Error during user registration:', error);  // Log actual error for debugging
    res.status(400).send('Error registering user');
  }
};

exports.login = async (req, res) => {
  const { phone, password } = req.body;
  try {
    const user = await User.findOne({ phone });
    if (!user) {
      return res.status(400).send('User not found');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send('Invalid credentials');
    }
    const token = jwt.sign({ userId: user._id }, 'SECRET_KEY');
    res.send({ token, user });
  } catch (error) {
    res.status(400).send('Error logging in');
  }
};
