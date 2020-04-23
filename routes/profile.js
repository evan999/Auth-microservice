const express = require('express');
const router = express.Router();
const pool = require('../db');
const auth = require('../middleware/auth');

// @route POST api/profiles/
// @desc  Register profile to user
// @access Private
router.post('/', auth, (req, res) => {
  res.json(req.user);
});

// @route GET api/profiles/self
// @desc  Get profile data of the logged in user
// @access Private
