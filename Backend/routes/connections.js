const express = require('express');
const router = express.Router();
const Match = require('../models/match');

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
// router.get('/', async (req, res) => {
//   try {
//     const matches = await Match.find({});
//     res.send(matches);
//   } catch (error) {
//     res.status(500).send();
//   }
// });

// And so on... for other match related routes

module.exports = router;
