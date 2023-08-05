// Import the necessary modules
const express = require('express');
const router = express.Router();
const Preference = require('../models/preference');
const User = require('../models/user');
const Media = require('../models/media');

// Location radius preference endpoint - Done
router.put('/:userId/radius', async (req, res) => {
  const { userId } = req.params;
  const { radius } = req.body;
  console.log(radius)
  if (radius < 1 || radius > 50) {
    return res.status(400).send('Invalid radius. Must be between 1 and 50.');
  }


  const userPreferences = await Preference.findOne({ user_id: userId });
  console.log(userPreferences.location_range)
  try {
    await Preference.updateOne({ user_id: userId }, { location_range: radius });
    // const userPreferences2 = await Preference.findOne({ user_id: userId });
    // console.log(userPreferences2.location_range)
    res.status(200).send('Radius updated successfully');
  } catch (error) {
    res.status(500).send('Error updating radius');
  }
});

// Age preference endpoint - Done
router.put('/:userId/age', async (req, res) => {
  const { userId } = req.params;
  const { minAge, maxAge } = req.body;

  if (minAge < 18 || maxAge > 99 || minAge > maxAge) {
    return res.status(400).send('Invalid age range. Min age should be 18, max age should be 99, and min age should not be greater than max age.');
  }

  try {
    let preference = await Preference.findOne({ user_id: userId });
    console.log('Current Age Range: ', preference.age_range);

    preference.age_range = [minAge, maxAge];
    await preference.save();

    console.log('Updated Age Range: ', preference.age_range);
    res.status(200).send('Age range updated successfully');
  } catch (error) {
    console.error('Error updating age range: ', error);
    res.status(500).send('Error updating age range');
  }
});


// Weight endpoint - Done...? (Bug where you can match outside of your weight cateogry
// BUT won't be possible to have bug as will only be shown the weight categories associated to u)
// User can match one above AND one below their weight class. Have to  
router.put('/:userId/weight', async (req, res) => {
  const { userId } = req.params;
  const { weightCategories } = req.body;

  // Weight Categories and their ranges
  const categories = {
    "Strawweight": [0, 115],
    "Flyweight": [115, 125],
    "Bantamweight": [125, 135],
    "Featherweight": [135, 145],
    "Lightweight": [145, 155],
    "Welterweight": [155, 170],
    "Middleweight": [170, 185],
    "Light Heavyweight": [185, 205],
    "Heavyweight": [205, Infinity]
  };

  // Validate weightCategories...
  if (!Array.isArray(weightCategories) || weightCategories.some(category => !(category in categories))) {
    return res.status(400).send('Invalid weight categories.');
  }

  try {
    let preference = await Preference.findOne({ user_id: userId });
    console.log('Current Weight Categories: ', preference.weight_categories);

    // Determine the overall range
    const minWeight = Math.min(...weightCategories.map(category => categories[category][0]));
    const maxWeight = Math.max(...weightCategories.map(category => categories[category][1]));

    preference.weight_categories = weightCategories;
    preference.weight_range = [minWeight, maxWeight];

    await preference.save();

    console.log('Updated Weight Categories: ', preference.weight_categories);
    console.log('Updated Weight Range: ', preference.weight_range);

    res.status(200).send('Weight categories and range updated successfully');
  } catch (error) {
    console.error('Error updating weight categories and range: ', error);
    res.status(500).send('Error updating weight categories and range');
  }
});



// Fighting style preference endpoint - Done
router.put('/:userId/style', async (req, res) => {
  const { userId } = req.params;
  const { fightingStyles } = req.body; // Assuming this will be an array of fighting styles

  if (fightingStyles.length > 3 || fightingStyles.length < 1) {
    return res.status(400).send('Invalid number of fighting styles. You can select up to 3 styles.');
  }

  try {
    await Preference.updateOne({ user_id: userId }, { fightingStyle: fightingStyles });
    res.status(200).send('Fighting styles updated successfully');
  } catch (error) {
    res.status(500).send('Error updating fighting styles');
  }
});

// Fighting level preference endpoint - Done
router.put('/:userId/level', async (req, res) => {
  const { userId } = req.params;
  const { fightingLevels } = req.body; // Assuming this will be an array of fighting styles

  if (fightingLevels.length > 3 || fightingLevels.length < 1) {
    return res.status(400).send('Invalid number of fighting styles. You can select up to 3 styles.');
  }

  try {
    await Preference.updateOne({ user_id: userId }, { fightingLevel: fightingLevels });
    res.status(200).send('Fighting styles updated successfully');
  } catch (error) {
    res.status(500).send('Error updating fighting styles');
  }
});

// Get Age prefereence endpoint
router.get('/:id/preferences', async (req, res) => {
  try {
    const { id } = req.params;
    const preference = await Preference.findOne({ user_id: id });
    if (preference) {
      res.status(200).json(preference);
    } else {
      res.status(404).json({ error: 'Preference not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get user's metric preferences
// router.get('/:id/metrics', async (req, res) => {
//   const { id } = req.params;

//   try {
//     const user = await User.findById({ _id: id }).select('heightUnit weightUnit');
//     console.log(user)
//     res.send(user);
//   } catch (error) {
//     res.status(500).send({ error: 'Server error' });
//   }
// });

// Update preferences range - values in body are undefined?
router.put('/:userId/prefUpdateFromSettings', async (req, res) => {
  const { userId } = req.params;
  const dataToUpdate = req.body; // This is now the dataToUpdate object

  console.log(userId)

  try {
    await Preference.updateOne({ user_id: userId }, {
    //   // fightingStyle: dataToUpdate.fightingStylePreference,
    //   // fightingLevel: dataToUpdate.fightingLevelPreference,
      age_range: dataToUpdate.ageRange,
      location_range: dataToUpdate.distance
    });

    // await User.updateOne({ _id: userId }, {
    //   weightUnit: dataToUpdate.weightUnit,
    //   heightUnit: dataToUpdate.heightUnit
    // });

    res.status(200).send('preferences updated successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating preferences');
  }
});

// UpdatingTysionsMedia - Only added position 1 to Tyson
// router.put('/:userId/quick', async (req, res) => {
//   const { userId } = req.params;
//   const { position } = req.body;

//   try {
//     // Find the user's media document
//     const media = await Media.findOne({ user_id: userId });

//     if (!media) {
//       // If the media document does not exist, return an appropriate response
//       return res.status(404).send('Media document not found');
//     }

//     // Add the "position" attribute to the media document and set its value to 1
//     media.position = position;
    
//     // Save the updated media document
//     await media.save();

//     res.status(200).send('Media updated successfully');
//   } catch (error) {
//     console.error('Error updating media:', error);
//     res.status(500).send('Internal Server Error');
//   }
// });

module.exports = router;