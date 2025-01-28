const express = require('express');
const {getImages} = require('../Controllers/PostController')
const router = express.Router();


router.get('/images',getImages)

module.exports = router