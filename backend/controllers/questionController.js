// controllers/questionController.js

const User = require('../models/userModel');

exports.getUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(400).send('Error fetching user details');
  }
};

exports.updateUserDetails = async (req, res) => {
  const { userId } = req.user;
  const { numConceived, liveBirth, abortion, childDeath, deliveries } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send('User not found');
    }
    user.numConceived = numConceived;
    user.liveBirth = liveBirth;
    user.abortion = abortion;
    user.childDeath = childDeath;
    user.deliveries = deliveries;
    user.questionsAnswered = true; // Set flag to true
    await user.save();
    res.status(200).send('User details updated successfully');
  } catch (error) {
    res.status(400).send('Error updating user details');
  }
};
