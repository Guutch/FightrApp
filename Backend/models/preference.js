const mongoose = require('mongoose');

const preferenceSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    age_range: { type: [Number], required: true },
    location_range: { type: Number, required: true },
    weight_range: { type: [Number], required: true },
    fightingStyle: { type: [String], required: true },
    fightingLevel: { type: [String], required: true },
  });

module.exports = mongoose.model('Preference', preferenceSchema);