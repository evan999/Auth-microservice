const express = require('express');
const router = express.Router();
const pool = require('../db');
const auth = require('../middleware/auth');

// @route POST api/profiles/
// @desc  Register profile to user
// @access Private
router.post('/', auth, async (req, res) => {
  const { first_name, last_name, avatar, github, cohort } = req.body;
  try {
    let existingProfile = await pool.query(
      'SELECT aid FROM profile WHERE aid=$1',
      [req.user.id]
    );

    if (existingProfile.rows.length) {
      res.status(401).json({
        errors: { existingProfile: 'Profile already exists for user' },
      });
    }

    // Create new profile
    let newProfile = await pool.query(
      'INSERT INTO profile (aid, first_name, last_name, avatar, github, cohort) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [req.user.id, first_name, last_name, avatar, github, cohort]
    );

    newProfile = newProfile.rows[0];
    return res.json(newProfile);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ errors: error });
  }

  //res.json(req.user);
});

// @route GET api/profiles/self
// @desc  Get profile data of the logged in user
// @access Private

router.get('/self/', auth, async (req, res) => {
  try {
    //const aid = req.user.id;
    let userProfile = await pool.query(
      'SELECT first_name, last_name, avatar, github, cohort FROM profile where aid=$1',
      [req.user.id]
    );

    //console.log(first_name);

    if (!userProfile.rows.length) {
      return res
        .status(404)
        .json({ errors: { userProfile: 'No profile set up for user' } });
    }

    userProfile = userProfile.rows[0];
    return res.json(userProfile);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ errors: error });
  }
});

module.exports = router;
