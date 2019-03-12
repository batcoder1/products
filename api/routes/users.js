const express = require('express');
const users = require('../controllers/users');
const router = express.Router();

router.route('/signup').post(users.signup);

module.exports = router;
