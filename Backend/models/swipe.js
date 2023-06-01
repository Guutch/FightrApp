const mongoose = require('mongoose');

// Will need to fix direction in the future
const swipeSchema = new mongoose.Schema({
    swiper_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    swiped_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    direction: { type: String, enum: ['left', 'right'], required: true },
    swipedAt: { type: Date, default: Date.now },
  });

  module.exports = mongoose.model('Swipe', swipeSchema);