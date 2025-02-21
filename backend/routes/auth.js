const express = require('express');
const router = express.Router();
const { signUp, login, refresh, logout } = require('../controllers/authController');

router.post('/signup', signUp);
router.post('/login', login);
router.get('/refresh', refresh);
router.post('/logout', logout);

module.exports = router;