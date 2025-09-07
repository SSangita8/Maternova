const express = require('express');
const { getUserDetails, updateUserDetails } = require('../controllers/questionController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/details', authMiddleware, getUserDetails);
router.put('/update-details', authMiddleware, updateUserDetails);

module.exports = router;
