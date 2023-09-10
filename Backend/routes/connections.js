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

// Save message to backend
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

// fetch messages from the backend
router.get('/fetchMessages/:user1Id/:user2Id', async (req, res) => {
  const { user1Id, user2Id } = req.params;
  const { lastOnly } = req.query;  // Add this line

  console.log("debug start")
  console.log(user1Id)
  console.log(user2Id)
  console.log(lastOnly)
  console.log("debug end")
  try {
    let query = {
      $or: [
        { sender_id: user1Id, receiver_id: user2Id },
        { sender_id: user2Id, receiver_id: user1Id }
      ]
    };

    let messages = await Message.find(query)
      .sort({ sentAt: 1 });

    if (lastOnly === 'true') {  // Add this block
      messages = messages.slice(-1);
    }

    res.status(200).json({ messages });
  } catch (error) {
    console.error('An error occurred while fetching messages:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update read status of a message
router.put('/markAsRead', async (req, res) => {
  try {
    const { senderId, receiverId } = req.body;

    // Validate the input
    if (!senderId || !receiverId) {
      return res.status(400).json({ error: 'Both senderId and receiverId are required' });
    }

    // Update the 'read' status of messages
    await Message.updateMany(
      { sender_id: senderId, receiver_id: receiverId },
      { $set: { read: true } }
    );

    res.status(200).json({ message: 'Messages marked as read' });
  } catch (error) {
    console.error('An error occurred while updating the read status:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// And so on... for other match related routes

module.exports = router;
