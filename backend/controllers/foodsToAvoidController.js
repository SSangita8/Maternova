const DietaryModel = require('../models/DietaryModel');

// Controller to get all food categories and their details
exports.getFoodsToAvoid = async (req, res) => {
  try {
    const data = await DietaryModel.find({});
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
};
