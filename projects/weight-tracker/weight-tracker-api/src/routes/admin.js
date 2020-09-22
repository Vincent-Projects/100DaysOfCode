const express = require('express');

const adminController = require('../controllers/admin');


const router = express.Router();

// POST /login
// Return the user token ad logged in
router.post('/login', adminController.postLogin);

// POST /signup
// Save a new user to the database
router.post('/signup', adminController.postSignup);

module.exports = router;