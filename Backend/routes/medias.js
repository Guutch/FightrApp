// Import the necessary modules
const express = require('express');
const router = express.Router();
const Media = require('../models/media');

// Define the GET request handler for fetching all media
router.get('/testMedia', async (req, res) => {
  try {
    // Fetch all media from the database
    const media = await Media.find({});
    
    // Send the fetched media as a response
    res.send(media);
  } catch (error) {
    // In case of an error, send an appropriate error message
    console.error("Error fetching media:", error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
});

router.post('/', async (req, res) => {
  // Create a new media document for a user
});

router.get('/:mediaId', async (req, res) => {
  // Get a media document's details
});

router.put('/:mediaId', async (req, res) => {
  // Update a media document's details or content
});

router.delete('/:mediaId', async (req, res) => {
  // Delete a media document
});

  

module.exports = router;
