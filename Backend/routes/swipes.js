const express = require('express');
const router = express.Router();
const Swipe = require('../models/swipe');
const Match = require('../models/match');

// CREATE a new swipe
// Not properly functional for a left swipe 
// Does not send notification on successful match
router.post('/newSwipe', async (req, res) => {
    const { swiper_id, swiped_id, direction } = req.body;
  
    if (direction === 'right') {
      const existingSwipe = await Swipe.findOne({
        swiper_id: swiped_id,
        swiped_id: swiper_id,
        direction: 'right',
      });
  
      if (existingSwipe) {
        const match = new Match({
          user1_id: swiper_id,
          user2_id: swiped_id,
          matchedAt: Date.now(),
        });
  
        try {
          await match.save();
          return res.status(201).send(match);
        } catch (error) {
          return res.status(400).send(error);
        }
      }
    }
  
    // Create a new swipe document
    const swipe = new Swipe({
      swiper_id,
      swiped_id,
      direction,
    });
  
    try {
      // Save the swipe
      await swipe.save();
      res.status(201).send(swipe);
    } catch (error) {
      res.status(400).send(error);
    }
  });


// Get swipe information of the user
router.get('/:userId/getAll', async (req, res) => {
  try {
    const userId = req.params.userId;

  // Fetch all swipes where the given user was swiped
  const swipes = await Swipe.find({ swiped_id: userId });

  // Transform the swipes into a more convenient format
  const swipeData = swipes.reduce((acc, swipe) => {
    acc[swipe.swiper_id] = swipe.direction;
    return acc;
  }, {});
  res.status(201).send(swipeData);
  } catch (error) {
    res.status(500).send();
  }
});




// And so on... for other swipe related routes

module.exports = router;
