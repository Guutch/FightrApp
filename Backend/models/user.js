const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/\S+@\S+\.\S+/, 'Please enter a valid email address.']
  },

  phoneNumber: {
    type: Number,
    required: true,
    min: [0, 'Phone number cannot be negative.']
  },
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
  sex: {
    type: Number,
    required: true,
},
birthday: {
    type: Date,
    required: false,
    validate: {
      validator: function (date) {
        // calculate age
        let ageDifMs = Date.now() - date.getTime();
        let ageDate = new Date(ageDifMs);
        let age = Math.abs(ageDate.getUTCFullYear() - 1970);

        return age >= 18;
      },
      message: "You must be at least 18 years old."
    }
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
    required: true,
    validate: {
      validator: function (v) {
        return (
          v.length >= 8 &&
          /[a-z]/.test(v) &&
          /[A-Z]/.test(v) &&
          /[!@#$%^&*]/.test(v)
        );
      },
      message: props =>
        `Invalid password. Your password must contain at least 8 characters, including 1 lower case letter, 1 upper case letter and 1 special character.`,
    },
  }
});

function arrayLimit(val) {
  return val.length >= 1 && val.length <= 3;
}

module.exports = mongoose.model('User', UserSchema);
