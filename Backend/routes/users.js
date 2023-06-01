const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Media = require('../models/media'); 
const Preference = require('../models/preference'); 
const multer = require('multer');
const multerS3 = require('multer-s3');
const { S3Client } = require('@aws-sdk/client-s3');

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

const determineWeightRange = (weight, weightUnit) => {
  // Convert weight to lbs if necessary
  if (weightUnit !== 'lbs') {
    weight = weight * 2.20462; // convert kg to lbs
  }

  // Define the UFC divisions
  const divisions = {
    strawweight: [0, 115],
    flyweight: [115, 125],
    bantamweight: [125, 135],
    featherweight: [135, 145],
    lightweight: [145, 155],
    welterweight: [155, 170],
    middleweight: [170, 185],
    lightHeavyweight: [185, 205],
    heavyweight: [205, Infinity],
  };

  // Identify the user's division and weight range
  for (let [division, range] of Object.entries(divisions)) {
    if (weight > range[0] && weight <= range[1]) {
      // Special cases for strawweight and heavyweight divisions
      if (division === 'strawweight') return [0, 125];
      if (division === 'heavyweight') return [185, 999];

      // General case for other divisions
      let previousDivisionMax = Object.values(divisions)[Object.keys(divisions).indexOf(division) - 1][1];
      let nextDivisionMax = Object.values(divisions)[Object.keys(divisions).indexOf(division) + 1][1];
      return [previousDivisionMax, nextDivisionMax];
    }
  }
};


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
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      birthday: req.body.birthday,
      email: req.body.email,
      password: hashedPassword,
      phoneNumber: req.body.phoneNumber,
      height: req.body.height,
      weight: req.body.weight,
      heightUnit: req.body.heightUnit,
      weightUnit: req.body.weightUnit,
      fightingStyle: req.body.fightingStyle,
      fightingLevel: req.body.fightingLevel,
      location: req.body.location,
    });

    // Calculate age based on the birthday using moment
    const moment = require('moment');
    let age = moment().diff(user.birthday, 'years');

    // Define default preferences
    let ageRange = [Math.max(age - 5, 18), Math.min(age + 5, 99)];
    let locationRange = 10; // default to 10 miles
    let weightRange = determineWeightRange(user.weight, user.weightUnit);
    let fightingStyle = user.fightingStyle;
    let fightingLevel = user.fightingLevel;

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

    // Save the user to the database
    const savedUser = await user.save();

    // Create new Media instances for each uploaded file
    const media = await Promise.all(
      req.files.map(file =>
        new Media({
          user_id: savedUser._id,
          url: file.location,
          mediaType: 'image'
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
  console.log(email)
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
    res.status(200).json({ auth: true, message: 'Logged in successfully' });

  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
