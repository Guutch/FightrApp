const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: false,
  },
  lastName: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
    unique: false,
  },
  phoneNumber: {
    type: String,
    required: false,
  },
  height: {
    type: String,
    required: false,
  },
  weight: {
    type: String,
    required: false,
  },
  heightUnit: {
    type: String,
    required: false,
  },
  weightUnit: {
    type: String,
    required: false,
  },
  birthday: {
    type: Date,
    required: false,
  },
  // media: [{
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Media'
  // }],
  fightingStyle: {
    type: [String],
    required: false,
  },
  fightingLevel: {
    type: String,
    required: false,
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
  password: {
    type: String,
    required: false,
  }
});

module.exports = mongoose.model('User', UserSchema);
