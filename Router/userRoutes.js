const express = require('express');
const {loginUser,registerUser} = require('../Controllers/userController')
const router = express.Router();
const authMiddleware = require('../middleware/auth')

router.post('/login',authMiddleware,loginUser)
router.post('/register',authMiddleware,registerUser)

module.exports = router