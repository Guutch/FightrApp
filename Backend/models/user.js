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
  },
  hasAgreedToTnC: {
    type: Boolean,
    required: true,
    default: false
  },
  hasAgreedToWaiver: {
    type: Boolean,
    required: true,
    default: false
  }
});

module.exports = mongoose.model('User', UserSchema);
