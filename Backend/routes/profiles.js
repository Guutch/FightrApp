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

  module.exports = router;