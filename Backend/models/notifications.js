const mongoose = require('mongoose');

const notificationsSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, enum: ['type1', 'type2', 'type3'], required: true },
    related_user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    sentAt: { type: Date, default: Date.now },
  });

module.exports = mongoose.model('Notifications', notificationsSchema);