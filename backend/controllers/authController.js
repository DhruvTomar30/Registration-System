// controllers/authController.js
const mongoose = require('mongoose');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
// const JWT_SECRET = dhruv_123456789

exports.register = async (req, res) => {
  try {
    const { name, dob, email, password } = req.body;
    const user = new User({ name, dob, email, password });
    await user.save();
    const token = jwt.sign({ userId: user._id },'dhruv_123456789');
    res.status(201).json({ token, userInfo: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error', message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    const isValid = await user.comparePassword(password);
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    const token = jwt.sign({ userId: user._id }, 'dhruv_123456789');
    res.status(200).json({ token, userInfo: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};
