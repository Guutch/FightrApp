const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    reporting_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    reported_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    reason: { type: String, required: true },
    reportedAt: { type: Date, default: Date.now },
  });

module.exports = mongoose.model('Report', reportSchema);