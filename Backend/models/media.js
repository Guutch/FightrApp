const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    url: { type: String, required: true },
    mediaType: { type: String, required: true, enum: ['image', 'video'] },
    createdAt: { type: Date, default: Date.now },
    position: { type: Number, required: true, min: 1, max: 6 } // add this line
});

module.exports = mongoose.model('Media', mediaSchema);