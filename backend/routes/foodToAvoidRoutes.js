const express = require('express');
const router = express.Router();
const { getFoodsToAvoid } = require('../controllers/foodsToAvoidController');

// Route to get all food categories and their details
router.get('/foods-to-avoid', getFoodsToAvoid);

module.exports = router;

