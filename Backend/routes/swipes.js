const express = require('express');
const router = express.Router();
const Swipe = require('../models/swipe');
const Match = require('../models/match');

// CREATE a new swipe
// Not properly functional for a left swipe 
// Does not send notification on successful match (Kinda does - swipingscreen)
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

    // Fetch all swipes where the given user was the swiper
    const swiperSwipes = await Swipe.find({ swiper_id: userId });

    console.log("swiperSwipes");
    console.log(swiperSwipes); 



    // Fetch all swipes where the given user was swiped
    const swipedSwipes = await Swipe.find({ swiped_id: userId });

    console.log("swipedSwipes"); 
    console.log(swipedSwipes);
    


    // Combine the two sets of swipes
    const allSwipes = [...swiperSwipes, ...swipedSwipes];

    console.log("allSwipes")
    console.log(allSwipes)

    res.status(201).send(allSwipes);
  } catch (error) {
    res.status(500).send();
  }
});


router.post('/newMatch', async (req, res) => {
  const { user1_id, user2_id } = req.body;

  // Delete the existing right swipe
  await Swipe.findOneAndDelete({
    swiper_id: user2_id,
    swiped_id: user1_id,
    direction: 'right',
  });

  // Create a new match document
  const match = new Match({
    user1_id,
    user2_id,
    matchedAt: Date.now(),
  });

  try {
    // Save the match
    await match.save();
    res.status(201).send(match);
  } catch (error) {
    res.status(400).send(error);
  }
});



// And so on... for other swipe related routes

module.exports = router;
