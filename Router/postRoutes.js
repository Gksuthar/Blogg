const express = require('express');
const {getImages,postComments,getComments} = require('../Controllers/PostController')
const router = express.Router();


router.post('/postComment',postComments)
router.get('/getComment',getComments)
router.get('/images',getImages)

module.exports = router