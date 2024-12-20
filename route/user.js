const express = require('express')
const protectRoute = require('../middleware/routeProtect')
const getUserForSidebar = require('../controller/user.controller')
const router = express.Router()

router.get("/", protectRoute, getUserForSidebar)

module.exports = router