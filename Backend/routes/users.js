const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Media = require('../models/media');
const Preference = require('../models/preference');
const Profile = require('../models/profile');
const multer = require('multer');
const multerS3 = require('multer-s3');
const { S3Client, GetObjectCommand } = require('@aws-sdk/client-s3');
// const Media = require('../models/Media');

const bcrypt = require('bcrypt');
// const saltRounds = 10;

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET
  }
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET_NAME,
    // acl: 'public-read', // This will make the files publicly accessible
    key: function (request, file, cb) {
      console.log(file);
      cb(null, Date.now().toString() + "-" + file.originalname);
    }
  })
}).array('photos', 5); // This allows up to 5 photos to be uploaded at once

// Written to populate user's preference doc (weight_range)
const getDefaultWeightRange = (weightClass, userSex) => {
  let upperLimit = userSex === 2 ? 4 : 9; // for female 4, for male 9
  
  if (weightClass === 1) {
    return [weightClass, weightClass + 1];
  } else if (weightClass === upperLimit) {
    return [weightClass - 1, weightClass];
  } else {
    return [weightClass - 1, weightClass, weightClass + 1];
  }
};

// Written to populate Profile doc (weightClass)
const getWeightClass = (weight, weightUnit, sex) => {
  // Convert weight to lbs if it's in kg
  if (weightUnit === 1) {
    weight = weight * 2.20462; // 1 kg is approximately 2.20462 lbs
  }

  let weightClass = 0;

  if (sex === 2) { // if sex is female
    if (weight <= 115) weightClass = 1;
    else if (weight <= 125) weightClass = 2;
    else if (weight <= 135) weightClass = 3;
    else if (weight <= 145) weightClass = 4;
  } else { // if sex is male
    if (weight <= 115) weightClass = 1;
    else if (weight <= 125) weightClass = 2;
    else if (weight <= 135) weightClass = 3;
    else if (weight <= 145) weightClass = 4;
    else if (weight <= 155) weightClass = 5;
    else if (weight <= 170) weightClass = 6;
    else if (weight <= 185) weightClass = 7;
    else if (weight <= 205) weightClass = 8;
    else if (weight <= 265) weightClass = 9;
  }

  return weightClass;
};

// const determineWeightRange = (weight, weightUnit) => {
//   // Convert weight to lbs if necessary
//   if (weightUnit !== 'lbs') {
//     weight = weight * 2.20462; // convert kg to lbs
//   }

//   // Define the UFC divisions
//   const divisions = {
//     strawweight: [0, 115],
//     flyweight: [115, 125],
//     bantamweight: [125, 135],
//     featherweight: [135, 145],
//     lightweight: [145, 155],
//     welterweight: [155, 170],
//     middleweight: [170, 185],
//     lightHeavyweight: [185, 205],
//     heavyweight: [205, Infinity],
//   };

//   // Identify the user's division and weight range
//   for (let [division, range] of Object.entries(divisions)) {
//     if (weight > range[0] && weight <= range[1]) {
//       // Special cases for strawweight and heavyweight divisions
//       if (division === 'strawweight') return [0, 125];
//       if (division === 'heavyweight') return [185, 999];

//       // General case for other divisions
//       let previousDivisionMax = Object.values(divisions)[Object.keys(divisions).indexOf(division) - 1][1];
//       let nextDivisionMax = Object.values(divisions)[Object.keys(divisions).indexOf(division) + 1][1];
//       return [previousDivisionMax, nextDivisionMax];
//     }
//   }
// };

// Get user image - needs updating to handle multiple
router.get('/:id/image', async (req, res) => {
  const { id } = req.params;
  console.log(id)
  // console.log(req.body.id)
  try {
    const media = await Media.findOne({ user_id: id }); // Assumes user_id is the field that contains the user ID
    if (!media) {
      return res.status(404).send({ error: 'Media not found for this user' });
    }
    res.send({ imageUrl: media.url }); // Assumes url is the name of the field that contains the image URL
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Server error' });
  }
});

router.post('/register', upload, async (req, res) => {
  // Check if the email is already registered
  const userExists = await User.findOne({ email: req.body.email });
  if (userExists) return res.status(400).send('Email already registered');

  // Parse location coordinates back into an array
  if (req.body.location && typeof req.body.location.coordinates === 'string') {
    req.body.location.coordinates = JSON.parse(req.body.location.coordinates);
  }

  try {
    // Create a new User instance

    const salt = await bcrypt.genSalt(10);
    // console.log(req.body.password)
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      birthday: req.body.birthday,
      email: req.body.email,
      password: hashedPassword,
      phoneNumber: req.body.phoneNumber,
      sex: req.body.sex,
    });

    const userProfile = new Profile({
      user_id: user._id,
      height: req.body.height,
      weight: req.body.weight,
      heightUnit: req.body.heightUnit,
      weightUnit: req.body.weightUnit,
      fightingStyle: JSON.parse(req.body.fightingStyle),
      fightingLevel: req.body.fightingLevel,
      location: req.body.location,
      weightClass: getWeightClass(req.body.weight, req.body.weightUnit, user.sex),
      // bio: req.body.bio,
    })

    // Calculate age based on the birthday using moment
    const moment = require('moment');
    let age = moment().diff(user.birthday, 'years');

    // Define default preferences
    let ageRange = [Math.max(age - 5, 18), Math.min(age + 5, 99)];
    let locationRange = 10; // default to 10 miles
    let weightRange = getDefaultWeightRange(userProfile.weightClass, user.sex);;
    // let weightRange = determineWeightRange(user.weight, user.weightUnit);
    let fightingStyle = userProfile.fightingStyle;
    let fightingLevel = userProfile.fightingLevel;

    // Create new Preference instance
    const preferences = new Preference({
      user_id: user._id,
      age_range: ageRange,
      location_range: locationRange,
      weight_range: weightRange,
      fightingStyle: fightingStyle,
      fightingLevel: fightingLevel
    });

    // Save the preferences to the database
    await preferences.save();

    // Attach the preferences ID to the user
    user.preferences = preferences._id;

    // Attach the profile ID to the user
    user.profile = userProfile._id;

    // Save the profile ID to the database
    await userProfile.save();

    // Save the user to the database
    const savedUser = await user.save();

    // Create new Media instances for each uploaded file
    const media = await Promise.all(
      req.files.map((file, index) =>
        new Media({
          user_id: savedUser._id,
          url: file.location,
          mediaType: 'image',
          position: file.position || index + 1  // use file.position or index + 1 as a fallback
        }).save()
      )
    );

    console.log("Media saved successfully:", media); // added logging
    res.send({ user: savedUser._id }); // Send the user ID as a response
  } catch (error) {
    console.error("Error during user registration:", error); // added logging
    res.status(400).send(error);
  }
});

// Add more routes (e.g., login) here
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const passwordIsValid = bcrypt.compareSync(password, user.password);

    if (!passwordIsValid) {
      return res.status(401).json({ auth: false, token: null });
    }

    // Generate and return a token if you are using token-based authentication
    // const token = jwt.sign({ id: user._id }, config.secret, {
    //   expiresIn: 86400, // expires in 24 hours
    // });
    // res.status(200).json({ auth: true, token: token });

    // or just inform the client about successful authentication
    res.status(200).json({ auth: true, message: 'Logged in successfully', userId: user._id });
    console.log(email)
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Update user's bio
router.put('/:userId/bio', async (req, res) => {
  const { userId } = req.params;
  const { bio } = req.body;

  try {
    await User.updateOne({ _id: userId }, { bio: bio });
    res.status(200).send('Bio updated successfully');
  } catch (error) {
    res.status(500).send('Error updating bio');
  }
});

// Update user's TnCs
router.put('/:userId/tncs', async (req, res) => {
  const { userId } = req.params;
  

  try {
    await User.updateOne({ _id: userId }, { hasAgreedToTnC: true });
    res.status(200).send('hasAgreedToTnC updated successfully');
  } catch (error) {
    res.status(500).send('Error updating tncs');
  }
});

// Update user's waiver agreement
router.put('/:userId/waiver', async (req, res) => {
  const { userId } = req.params;
  // console.log(userId)

  try {
    await User.updateOne({ _id: userId }, { hasAgreedToWaiver: true });
    res.status(200).send('hasAgreedToWaiver updated successfully');
  } catch (error) {
    res.status(500).send('Error updating hasAgreedToWaiver');
  }
});

// Update user's height
router.put('/:userId/height', async (req, res) => {
  const { userId } = req.params;
  const { height, heightUnit } = req.body;

  try {
    await User.updateOne({ _id: userId }, { height: height, heightUnit: heightUnit });
    res.status(200).send('Height and height unit updated successfully');
  } catch (error) {
    res.status(500).send('Error updating height');
  }
});


// Update user's weight
router.put('/:userId/weight', async (req, res) => {
  const { userId } = req.params;
  const { weight, weightUnit } = req.body;

  try {
    await User.updateOne({ _id: userId }, { weight: weight, weightUnit: weightUnit });
    res.status(200).send('Weight and weight unit updated successfully');
  } catch (error) {
    res.status(500).send('Error updating weight');
  }
});

// Update user's fight styles
router.put('/:userId/fightStyles', async (req, res) => {
  const { userId } = req.params;
  const { fightStyles } = req.body;

  try {
    await User.updateOne({ _id: userId }, { fightingStyle: fightStyles });
    res.status(200).send('Fight styles updated successfully');
  } catch (error) {
    res.status(500).send('Error updating fight styles');
  }
});

// Update user's fight level
router.put('/:userId/fightLevel', async (req, res) => {
  const { userId } = req.params;
  const { fightLevel } = req.body;

  try {
    await User.updateOne({ _id: userId }, { fightingLevel: fightLevel });
    res.status(200).send('Fight level updated successfully');
  } catch (error) {
    res.status(500).send('Error updating fight level');
  }
});

// Update user's first name - Not done
router.put('/:userId/firstName', async (req, res) => {
  const { userId } = req.params;
  const { firstName } = req.body;

  try {
    await User.updateOne({ _id: userId }, { firstName: firstName });
    res.status(200).send('First name updated successfully');
  } catch (error) {
    res.status(500).send('Error updating first name');
  }
});

// Update user's last name
router.put('/:userId/lastName', async (req, res) => {
  const { userId } = req.params;
  const { lastName } = req.body;

  try {
    await User.updateOne({ _id: userId }, { lastName: lastName });
    res.status(200).send('Last name updated successfully');
  } catch (error) {
    res.status(500).send('Error updating last name');
  }
});

// Update user's number
router.put('/:userId/number', async (req, res) => {
  const { userId } = req.params;
  const { number } = req.body;

  try {
    await User.updateOne({ _id: userId }, { phoneNumber: number });
    res.status(200).send('Number updated successfully');
  } catch (error) {
    res.status(500).send('Error updating Number');
  }
});

// Update user's email
router.put('/:userId/email', async (req, res) => {
  const { userId } = req.params;
  const { email } = req.body;

  try {
    await User.updateOne({ _id: userId }, { email: email });
    res.status(200).send('email updated successfully');
  } catch (error) {
    res.status(500).send('Error updating email');
  }
});

// Need update user's location and photos 


// Get user's weight 
// router.get('/:id/getWeight', async (req, res) => {
//   const { id } = req.params;

//   try {
//     const user = await User.findById({ _id: id }).select('weight');
//     // const user = await User.findById({ _id: id }).select('weight');
//     // console.log(user)
//     console.log(user.weight);
//     res.send(user.weight);
//   } catch (error) {
//     res.status(500).send({ error: 'Server error' });
//   }
// });

// // Get user's fight level 
// router.get('/:id/getFightLevel', async (req, res) => {
//   const { id } = req.params;

//   try {
//     const user = await User.findById({ _id: id }).select('fightingLevel');
//     // const user = await User.findById({ _id: id }).select('weight');
//     // console.log(user)
//     // console.log(user.fightingLevel);
//     res.send(user.fightingLevel);
//   } catch (error) {
//     res.status(500).send({ error: 'Server error' });
//   }
// });

// Get user's fields for Edit Profile Screen (already have API for metrics(preferences.js) and weight(above))
// Need to add bio (after done with Tyson Fury)
// This returns user's ID. I don't need this
router.get('/:id/getEditProfileData', async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById({ _id: id }).select('firstName lastName fightingStyle fightingLevel location height weight');
    console.log(user)
    res.send(user);
  } catch (error) {
    res.status(500).send({ error: 'Server error' });
  }
});

module.exports = router;
