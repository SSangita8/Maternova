const express = require('express');
const { storeRiskCheck, getPredictionsByUser } = require('../controllers/riskCheckController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/store-risk-check', authMiddleware, storeRiskCheck);
router.get('/predictions/:userId', authMiddleware, getPredictionsByUser);


module.exports = router;
