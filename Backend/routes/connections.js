const express = require('express');
const router = express.Router();
const Match = require('../models/match');
const Message = require('../models/message')
const Report = require('../models/report')
const Block = require('../models/block')

// Unmatching
// Literally just deletes a match
router.delete('/unmatch', async (req, res) => {
  const { userId, selectedUserId } = req.body;

  // console.log("Unmatch request received for userId:", userId, "and selectedUserId:", selectedUserId); // Debug line

  try {
    // console.log("Searching for match..."); // Debug line
    const match = await Match.findOne({
      $or: [
        { user1_id: userId, user2_id: selectedUserId },
        { user1_id: selectedUserId, user2_id: userId }
      ]
    });

    // console.log("Match found:", match); // Debug line

    if (!match) {
      // console.log("No match found for given user IDs"); // Debug line
      return res.status(404).send({ message: 'Match not found.' });
    }

    // console.log("Deleting match with ID:", match._id); // Debug line
    await Match.findByIdAndDelete(match._id);
    // console.log("Match deleted successfully"); // Debug line
    res.status(200).send({ message: 'Unmatched successfully.' });
  } catch (error) {
    console.error("Error during unmatching:", error); // Debug line
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
  // console.log("here")
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

  // console.log("debug start")
  // console.log(user1Id)
  // console.log(user2Id)
  // console.log(lastOnly)
  // console.log("debug end")
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

router.post('/handleSerious', async (req, res) => {
  const { actionType, userId, selectedUserId, reason } = req.body;

  try {
    switch (actionType) {
      case 'Block user':
        const newBlock = new Block({
          blocker: userId,
          blocked: selectedUserId
        });
        await newBlock.save();
        break;
      case 'Report user':
        if (!reason) {
          return res.status(400).json({ error: 'Reason for reporting is required' });
        }
        const newReport = new Report({
          reporting_id: userId,
          reported_id: selectedUserId,
          reason
        });
        await newReport.save();
        break;
      default:
        return res.status(400).json({ error: 'Invalid action type' });
    }

    res.status(200).json({ message: 'Action successfully completed' });
  } catch (error) {
    console.error('An error occurred:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// And so on... for other match related routes

module.exports = router;
