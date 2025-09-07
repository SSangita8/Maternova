// models/userModel.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  dob: { type: Date, required: true },
  numConceived: { type: Number, default: 0 },
  liveBirth: { type: Number, default: 0 },
  abortion: { type: Number, default: 0 },
  childDeath: { type: Number, default: 0 },
  deliveries: { type: Number, default: 0 },
  questionsAnswered: { type: Boolean, default: false }, // Add this flag
});

const User = mongoose.model('User', userSchema);

module.exports = User;
