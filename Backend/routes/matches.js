// Import the necessary modules
const express = require('express');
const router = express.Router();
const Match = require('../models/match');
const Preference = require('../models/preference');
const User = require('../models/user'); 

// Helper function to calculate distance between two coordinates
function calculateDistance(coord1, coord2) {
  const RADIUS_OF_EARTH_IN_MILES = 3958.8; // approximate radius of Earth in miles

  let lat1 = coord1.coordinates[0], lon1 = coord1.coordinates[1];
  let lat2 = coord2.coordinates[0], lon2 = coord2.coordinates[1];

  // Convert degrees to radians
  lat1 = lat1 * Math.PI / 180;
  lon1 = lon1 * Math.PI / 180;
  lat2 = lat2 * Math.PI / 180;
  lon2 = lon2 * Math.PI / 180;

  // Use the Haversine formula to calculate the distance
  let dlon = lon2 - lon1;
  let dlat = lat2 - lat1;
  let a = Math.sin(dlat/2)**2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dlon/2)**2;
  let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return RADIUS_OF_EARTH_IN_MILES * c;
}

// Helper function to filter users based on location
function filterByLocation(user, allUsers, userPreferences) {
  return allUsers.filter(otherUser => {
    // Calculate the distance between the user and the other user
    let distance = calculateDistance(user.location, otherUser.location);

    // Check if the distance is within the user's location range
    return distance <= userPreferences.location_range;
  });
}

// Helper function to filter users based on age
function filterByAge(user, locationMatches, userPreferences) {

  return locationMatches.filter(otherUser => {
    const otherUserAge = getAge(otherUser.birthday);
    // Check if the other user's age is within the user's age range
    return otherUserAge >= userPreferences.age_range[0] && otherUserAge <= userPreferences.age_range[1];
  });
}

// Helper function to calculate age
function getAge(birthday) {
  const today = new Date();
  let age = today.getFullYear() - birthday.getFullYear();
  const m = today.getMonth() - birthday.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthday.getDate())) {
    age--;
  }
  return age;
}

function convertKgToLbs(weightInKg) {
  return weightInKg * 2.20462;
}

// Helper function to filter users based on weight
function filterByWeight(user, allUsers, userPreferences) {
  return allUsers.filter(otherUser => {
    let otherUserWeight = otherUser.weight;
    
    // Check if the weight of other user is in kg, convert it to lbs
    if (otherUser.weightUnit === "kg") {
      otherUserWeight = convertKgToLbs(otherUserWeight);
    }

    // Check if the weight of other user is within the user's weight range
    return otherUserWeight >= userPreferences.weight_range[0] && otherUserWeight <= userPreferences.weight_range[1];
  });
}

function filterByStyle(user, allUsers, userPreferences) {
  return allUsers.filter(otherUser => {
    // Check if at least one of the user's preferred fighting styles matches with the other user's fighting styles
    return otherUser.fightingStyle.some(style => userPreferences.fightingStyle.includes(style));
  });
}

function filterByLevel(user, allUsers, userPreferences) {
  return allUsers.filter(otherUser => {
    // console.log(otherUser)
    // Check if the user's preferred fighting level matches with the other user's fighting level
    return userPreferences.fightingLevel.includes(otherUser.fightingLevel);
  });
}

router.get('/:userId', async (req, res) => {
  // Get the user
  const user = await User.findById(req.params.userId);

if (!user) {
  return res.status(404).send('User with the id ' + req.params.userId + ' not found');
}

// Fetch the user's preferences
const userPreferences = await Preference.findOne({ user_id: user._id });

// If the user has no preferences set yet, return an error message
if (!userPreferences) {
  return res.status(404).send('No preferences set for user with id ' + req.params.userId);
}

// Fetch all other users
const allUsers = await User.find({ _id: { $ne: user._id } });

// Filter based on location
const locationMatches = filterByLocation(user, allUsers, userPreferences);

      
  // Filter based on age
  const ageMatches = filterByAge(user, locationMatches, userPreferences);
      
  // Filter based on weight
  const weightMatches = filterByWeight(user, ageMatches, userPreferences);
      
  // Filter based on fighting style
  const styleMatches = filterByStyle(user, weightMatches, userPreferences);
      
  // Filter based on fighting level
  const levelMatches = filterByLevel(user, styleMatches, userPreferences);
      
  const filteredMatches = levelMatches.map(match => {
    return {
      firstName: match.firstName,
      birthday: match.birthday,
      weight: match.weight,
      fightingStyle: match.fightingStyle,
      location: match.location,
      userId: match._id
    };
  });

  console.log(filteredMatches)

  // Return the matches
  res.send(filteredMatches);
});

module.exports = router;
