const express = require('express');
const {loginUser,registerUser} = require('../Controllers/userController')
const router = express.Router();
const authMiddleware = require('../middleware/auth')

router.post('/login',loginUser)
router.post('/register',registerUser)

module.exports = router