// Import the necessary modules
const express = require('express');
const router = express.Router();
const Preference = require('../models/preference');
const User = require('../models/user');
const Profile = require('../models/profile');

// Get user's metric preferences
router.get('/:id/metrics', async (req, res) => {
  const { id } = req.params;

  try {
    const user = await Profile.findOne({ user_id: id }).select('heightUnit weightUnit distanceUnit');
    console.log(user)
    res.send(user);
  } catch (error) {
    res.status(500).send({ error: 'Server error' });
  }
});

router.get('/:id/getWeight', async (req, res) => {
  const { id } = req.params;

  try {
    const user = await Profile.findOne({ user_id: id }).select('weightClass');
    // console.log(user)
    // console.log(user.weight);
    res.send(user);
  } catch (error) {
    res.status(500).send({ error: 'Server error' });
  }
});

router.get('/:id/getBio', async (req, res) => {
  const { id } = req.params;

  try {
    const user = await Profile.findOne({ user_id: id }).select('bio');
    // console.log(user)
    // console.log(user.weight);
    res.send(user);
  } catch (error) {
    res.status(500).send({ error: 'Server error' });
  }
});

router.get('/:id/getActualWeight', async (req, res) => {
  const { id } = req.params;

  try {
    const user = await Profile.findOne({ user_id: id }).select('weight');
    // console.log(user)
    // console.log(user.weight);
    res.send(user);
  } catch (error) {
    res.status(500).send({ error: 'Server error' });
  }
});

router.get('/:id/getActualHeight', async (req, res) => {
  const { id } = req.params;

  try {
    const user = await Profile.findOne({ user_id: id }).select('height');
    // console.log(user)
    // console.log(user.weight);
    res.send(user);
  } catch (error) {
    res.status(500).send({ error: 'Server error' });
  }
});

// Get user's fight level 
router.get('/:id/getFightLevel', async (req, res) => {
  const { id } = req.params;

  try {
    const user = await Profile.findOne({ user_id: id }).select('fightingLevel');
    // const user = await User.findById({ _id: id }).select('weight');
    // console.log(user)
    // console.log(user.fightingLevel);
    res.send(user);
  } catch (error) {
    res.status(500).send({ error: 'Server error' });
  }
});

// Get user's fight styles 
router.get('/:id/getFightStyle', async (req, res) => {
  const { id } = req.params;

  try {
    const user = await Profile.findOne({ user_id: id }).select('fightingStyle');
    // const user = await User.findById({ _id: id }).select('weight');
    console.log(user)
    // console.log(user.fightingLevel);
    res.send(user);
  } catch (error) {
    res.status(500).send({ error: 'Server error' });
  }
});

// Edit Profile Screen
router.put('/:id/updatingEditProfile', async (req, res) => {
  const { id } = req.params;

  // Extract the fields from the request body
  const { height, weight, fightingStyles, bio, weightClass } = req.body;
  console.log(fightingStyles)
  try {
    // Find the profile by user_id and update
    const profile = await Profile.findOneAndUpdate(
      { user_id: id }, // Use user_id to find the profile
      {
        height,
        weight,
        fightingStyle: fightingStyles,
        bio,
        weightClass
      },
      // { new: true } // This option returns the updated document
    );

    if (!profile) {
      return res.status(404).send({ error: 'Profile not found' });
    }

    res.send(profile);

  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Server error' });
  }
});



  module.exports = router;