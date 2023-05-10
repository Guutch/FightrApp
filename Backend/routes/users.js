const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.post('/register', async (req, res) => {
  console.log(req.body);
  // Check if the email is already registered
  const userExists = await User.findOne({ email: req.body.email });
  if (userExists) return res.status(400).send('Email already registered');

  console.log(req.body.firstName)

  // Create a new user instance with the entered data
  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    birthday: req.body.birthday,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    height: req.body.height,
    weight: req.body.weight,
    photos: req.body.photos,
    fightingStyle: req.body.fightingStyle,
    fightingLevel: req.body.fightingLevel,
    location: req.body.location
    // Add any other fields you need
  });
  console.log(user.photos)
  try {
    // Save the user to the database
    const savedUser = await user.save();
    res.send({ user: savedUser._id }); // Send the user ID as a response
  } catch (error) {
    res.status(400).send(error);
  }
});

// Add more routes (e.g., login) here

module.exports = router;
