const mongoose = require('mongoose');

const riskCheckSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  RBS: { type: Number, required: true },
  HB: { type: Number, required: true },
  HBA1C: { type: Number, required: true },
  RR: { type: Number, required: true },
  SystolicBP: { type: Number, required: true },
  DiastolicBP: { type: Number, required: true },
  HeartRate: { type: Number, required: true },
  BodyTemp: { type: Number, required: true },
  risk: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

const RiskCheck = mongoose.model('RiskCheck', riskCheckSchema);

module.exports = RiskCheck;
