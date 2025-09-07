const RiskCheck = require('../models/riskCheckModel');

exports.storeRiskCheck = async (req, res) => {
  const {
    userId,
    RBS,
    HB,
    HBA1C,
    RR,
    SystolicBP,
    DiastolicBP,
    HeartRate,
    BodyTemp,
    risk,
  } = req.body;
  try {
    const newRiskCheck = new RiskCheck({
      userId,
      RBS,
      HB,
      HBA1C,
      RR,
      SystolicBP,
      DiastolicBP,
      HeartRate,
      BodyTemp,
      risk,
    });
    await newRiskCheck.save();
    res.status(201).send('Risk check details stored');
  } catch (error) {
    res.status(400).send('Error storing risk check details');
  }
};

exports.getPredictionsByUser = async (req, res) => {
  try {
    const predictions = await RiskCheck.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.json(predictions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch predictions' });
  }
};
