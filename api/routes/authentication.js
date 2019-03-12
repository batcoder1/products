const express = require('express');
const users = require('../controllers/users');
const router = express.Router();

// user login
router.route('/login').post(users.login);

module.exports = router;
