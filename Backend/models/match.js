const mongoose = require('mongoose');

// user1_id: ID of the first user
// user2_id: ID of the second user

const matchSchema = new mongoose.Schema({
    user1_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    user2_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    matchedAt: { type: Date, default: Date.now },
  });

module.exports = mongoose.model('Match', matchSchema);