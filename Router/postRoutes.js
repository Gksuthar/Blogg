const express = require('express');
const {getImages,postComment,getComment} = require('../Controllers/PostController')
const router = express.Router();


router.post('/postComment',postComment)
router.get('/getComment',getComment)
router.get('/images',getImages)

module.exports = router