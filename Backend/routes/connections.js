const express = require('express');
const router = express.Router();
const Match = require('../models/match');
const Message = require('../models/message')

// Unmatching
// Literally just deletes a match - need to handle a lot more
router.delete('/unmatch/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await Match.findByIdAndDelete(id);
    res.status(200).send({ message: 'Unmatched successfully.' });
  } catch (error) {
    res.status(500).send({ message: 'Error unmatching.', error });
  }
});

// GET all matches
router.get('/allMatches/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const matches = await Match.find({
      $or: [
        { user1_id: userId },
        { user2_id: userId }
      ]
    });
    res.send(matches);
  } catch (error) {
    res.status(500).send();
  }
});

router.post('/saveMessage', async (req, res) => {
  console.log("here")
  try {
    const { sender_id, receiver_id, content } = req.body;
    
    // Validate the input
    if (!sender_id || !receiver_id || !content) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Create a new message
    const newMessage = new Message({
      sender_id,
      receiver_id,
      content,
    });

    // Save the message to the database
    await newMessage.save();

    // Send a success response
    res.status(201).json({ message: 'Message saved successfully', data: newMessage });
  } catch (error) {
    console.error('An error occurred while saving the message:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// And so on... for other match related routes

module.exports = router;
