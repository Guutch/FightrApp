const express = require('express');
const router = express.Router();
const User = require('../models/user');
const multer = require('multer');
const multerS3 = require('multer-s3');
const { S3Client } = require('@aws-sdk/client-s3');

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

router.post('/register', upload, async (req, res) => {
  // console.log(req.body);
  // Check if the email is already registered
  const userExists = await User.findOne({ email: req.body.email });
  if (userExists) return res.status(400).send('Email already registered');

// Parse location coordinates back into an array
if (req.body.location && typeof req.body.location.coordinates === 'string') {
  req.body.location.coordinates = JSON.parse(req.body.location.coordinates);
}

  // Create a new user instance with the entered data
  const photosUrls = req.files.map(file => file.location);

  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    birthday: req.body.birthday,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    height: req.body.height,
    weight: req.body.weight,
    photos: photosUrls,
    fightingStyle: req.body.fightingStyle,
    fightingLevel: req.body.fightingLevel,
    location: req.body.location
  });

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
