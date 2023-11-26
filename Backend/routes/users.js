const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Media = require('../models/media');
const Preference = require('../models/preference');
const Profile = require('../models/profile');
const multer = require('multer');
const multerS3 = require('multer-s3');
const { S3Client, GetObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');

const bcrypt = require('bcrypt');
const secret = process.env.JWT_SECRET;

// Add more routes (e.g., login) here
const jwt = require('jsonwebtoken');

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
}).array('photos', 6); // This allows up to 5 photos to be uploaded at once

// First delete AWS file, THEN delete MongoDB record
// const uploadToS3 = async (photo) => {
//   const { path, name, type } = photo;
//   const file = fs.readFileSync(path);
//   const params = {
//     Bucket: process.env.AWS_BUCKET_NAME,
//     Key: Date.now().toString() + "-" + name,
//     Body: file,
//     ContentType: type,
//     // ACL: 'public-read' // If you want the file to be publicly accessible
//   };

//   try {
//     const result = await s3.upload(params).promise();
//     return result.Location; // This will be the URL of the uploaded photo
//   } catch (error) {
//     console.error("Error uploading to S3:", error);
//     throw error;
//   }
// };

// First delete AWS file, THEN delete MongoDB record
// key = 1689790266086-49ed9502-7732-40b2-a50b-596619eb005b.jpg
const deleteFromS3 = async (key) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key
  };

  const command = new DeleteObjectCommand(params);

  try {
    await s3.send(command);
  } catch (error) {
    console.error("Error deleting from S3:", error);
    throw error;
  }
};


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

const getWeightClass = (weight, weightUnit, sex) => {
  console.log("Original weight:", weight);
  console.log("Weight unit (1 for kg, 0 for lbs):", weightUnit);
  console.log("Sex (1 for male, 2 for female):", sex);

  // Ensure weight is a number and convert weight to lbs if it's in kg
  let weightInPounds = Number(weight);
  if (weightUnit == 1) {
    weightInPounds *= 2.20462; // 1 kg is approximately 2.20462 lbs
  }
  console.log("Converted weight in pounds:", weightInPounds);

  // Define weight class boundaries for males and females
  const maleBoundaries = [115, 125, 135, 145, 155, 170, 185, 205];
  const femaleBoundaries = [115, 125, 135];

  let weightClass = 0;

  // Select the appropriate boundaries based on sex
  const boundaries = sex === 2 ? femaleBoundaries : maleBoundaries;

  // Determine the weight class based on the boundaries
  for (let i = 0; i < boundaries.length; i++) {
    if (weightInPounds <= boundaries[i]) {
      weightClass = i + 1;
      break;
    }
  }

  // Assign the last weight class if weight is above all boundaries
  if (weightClass === 0) {
    weightClass = sex === 2 ? 4 : 9; // Featherweight for all women above 135lbs, Heavyweight for all men above 205lbs
  }

  console.log("Assigned weight class:", weightClass);
  return weightClass;
};


// Get user image - needs updating to handle multiple
router.get('/:id/image', async (req, res) => {
  const { id } = req.params;
  try {
    const media = await Media.findOne({ user_id: id, position: 1 }); // Include position in the query
    if (!media) {
      return res.status(404).send({ error: 'Media not found for this user at position 1' });
    }
    res.send({ imageUrl: media.url }); // Assumes url is the name of the field that contains the image URL
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Server error' });
  }
});

// Get user image - needs updating to handle multiple
router.get('/:id/getSex', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({ _id: id }); // Query by user_id
    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }
    // console.log(user)
    const userSex = user.sex; // Concatenate first and last name
    res.send({ userSex }); // Send the full name
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Server error' });
  }
});

// Get users name - needs updating to handle multiple
router.get('/:id/getName', async (req, res) => {
  const { id } = req.params;
  try {
    if(id) {
      const user = await User.findOne({ _id: id }); // Query by user_id
      if (!user) {
        return res.status(404).send({ error: 'User not found' });
      }
      console.log(user)
      const fullName = `${user.firstName} ${user.lastName}`; // Concatenate first and last name
      res.send({ fullName }); // Send the full name
    } else {
      console.lof("No id")
    }
    
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Server error' });
  }
});

// Get users name - needs updating to handle multiple
// router.post('/:id/uploadNewImages', async (req, res) => {
router.post('/:id/uploadNewImages', upload, async (req, res) => {

  const { id } = req.params;
  try {
    let uploadedImageUrls = [];

    for (let i = 0; i < req.files.length; i++) {
      let file = req.files[i];
      let position = req.body.position[i]; // Retrieve the corresponding position

      uploadedImageUrls.push({
        location: file.location,
        position: position // Use the retrieved position
      });
    }

    

    // Use the uploaded image URLs and positions to update MongoDB
    for (let image of uploadedImageUrls) {
      console.log(image.position)
      const newMedia = new Media({
        user_id: id,
        url: image.location,
        mediaType: 'image',
        createdAt: new Date(),
        position: image.position // Use the dynamic position
      });
      await newMedia.save();
    }

    res.status(200).send({ message: 'Images uploaded successfully' });

  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Server error during image upload' });
  }
});

router.post('/:id/deleteImages', async (req, res) => {
  const { id } = req.params;
  const { photoIdsToDelete } = req.body;

  try {
    // Find the photos in MongoDB
    const photosToDelete = await Media.find({
      _id: { $in: photoIdsToDelete },
      user_id: id
    }).select('url');

    // Delete the photos from S3
    for (let photo of photosToDelete) {
      // Extract the key from the URL based on the provided example
      // URL structure: https://fightr.s3.eu-west-2.amazonaws.com/1692900903787-82aeeabc-fce7-489b-ac34-022d3fba2230.jpg
      let key = photo.url.split('https://fightr.s3.eu-west-2.amazonaws.com/')[1];
    
      // Delete from S3
      await deleteFromS3(key);
    }

    // Delete from MongoDB
    for (let photoId of photoIdsToDelete) {
      await Media.deleteOne({ _id: photoId, user_id: id });
    }

    res.status(200).send({ message: 'Images deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Server error during image deletion' });
  }
});

// Should move this to preferences 
router.put('/:userId/weightPrefUpdate', async (req, res) => {

  const { userId } = req.params;
  const { weightClass, userSex } = req.body;

  weight_range = getDefaultWeightRange(weightClass, userSex)

  console.log("weight_range")
  console.log(weight_range)

  await Preference.updateOne({ user_id: userId }, { weight_range: weight_range });

  try {
res.status(200).send({ message: 'WEIGHT RPEF UPDATED CORRECTLY' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Server error during WEIGHT RPEF UPDATE' });
  }

});

router.put('/findEmail', async (req, res) => {
  try {
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      // If the user exists, return false since the email is taken
      console.log("user exists")
      res.status(200).json({ emailTaken: true });
    } else {
      // If the user does not exist, return true since the email is not taken
      console.log("user does not exist")
      res.status(200).json({ emailTaken: false });
    }
  } catch (error) {
    res.status(500).send('An error occurred');
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

    console.log(getDefaultWeightRange(userProfile.weightClass, user.sex))

    // Define default preferences
    let ageRange = [Math.max(age - 5, 18), Math.min(age + 5, 99)];
    let locationRange = 10; // default to 10 miles
    let weightRange = getDefaultWeightRange(userProfile.weightClass, user.sex);
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

    // Generate JWT
    const token = jwt.sign({ userId: user._id, email: req.body.email }, secret, { expiresIn: '365d' }); // 365 days

    console.log("Media saved successfully:", media); // added logging
    res.send({ user: savedUser._id, token }); // Send the user ID as a response
  } catch (error) {
    console.error("Error during user registration:", error); // added logging
    res.status(400).send(error);
  }
});



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

    // Generate JWT
    const token = jwt.sign({ userId: user._id, email: user.email }, secret, { expiresIn: '365d' }); // 365 days

    // Inform the client about successful authentication along with the token
    res.status(200).json({ auth: true, message: 'Logged in successfully', userId: user._id, token });
    console.log(email);
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
// router.get('/:id/getEditProfileData', async (req, res) => {
//   const { id } = req.params;

//   try {
//     const user = await User.findById({ _id: id }).select('firstName lastName fightingStyle fightingLevel location height weight');
//     console.log(user)
//     res.send(user);
//   } catch (error) {
//     res.status(500).send({ error: 'Server error' });
//   }
// });

module.exports = router;
