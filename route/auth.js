const express = require('express');
const { Login, Register, Logout } = require('../controller/auth.controller');

const router = express.Router();

router.post('/login', Login);
router.post('/register', Register);
router.post('/logout', Logout);

module.exports = router;