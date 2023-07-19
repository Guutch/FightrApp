const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  height: {
    type: Number,
    required: true,
    validate: {
      validator: Number.isFinite,
      message: '{VALUE} is not a valid height',
    },
    max: [300, 'Height in cm must be less than or equal to 300'],
  },
  weight: {
    type: Number,
    required: true,
    validate: {
      validator: Number.isFinite,
      message: '{VALUE} is not a valid weight',
    },
    max: [600, 'Weight in kg must be less than or equal to 600'],
  },
  heightUnit: {
    type: Number,
    required: true,
  },
  weightUnit: {
    type: Number,
    required: true,
  },
  distanceUnit: {
    type: Number,
    required: true,
    default: 1
  },
  fightingStyle: {
    type: [Number],
    required: true,
    validate: [arrayLimit, '{PATH} should have between 1 and 3 elements']
  },
  fightingLevel: {
    type: Number,
    required: true,
  },
  bio: {
    type: String,
    required: false,
    default: ""
  },
  location: {
    type: {
      type: String,
      enum: ['Point'], // 'location.type' must be 'Point'
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  weightClass: {
    type: Number,
    required: true,
  }
});

function arrayLimit(val) {
  return val.length >= 1 && val.length <= 3;
}

module.exports = mongoose.model('Profile', ProfileSchema);