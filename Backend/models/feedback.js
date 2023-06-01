const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    feedback: { type: String, required: true },
    feedbackType: { type: String, required: true },
    feedbackAt: { type: Date, default: Date.now },
  });

module.exports = mongoose.model('Feedback', feedbackSchema);