const express = require('express');
const { sendMessage } = require('../controller/message.controller');
const protectRoute = require('../middleware/routeProtect')
const { getMessage } = require('../controller/message.controller')

const router = express.Router();

router.post("/send/:id", protectRoute, sendMessage)
router.get("/get/:id", protectRoute, getMessage)

module.exports = router;