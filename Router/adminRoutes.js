const express = require('express');

const {addBlog,getBlogs,getBlog,removeData,updateBlog}= require('../Controllers/adminController')
const router = express.Router();
const multer = require('multer');
const storage  = multer.diskStorage({
    destination : 'Uploads',
    filename : (req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)
    }
})

const upload = multer({storage:storage})

router.post('/addPost',upload.single('img'),addBlog)
router.delete('/removeData/:id',removeData)
router.get('/getBlogs',getBlogs)
router.get('/getBlog/:id',getBlog)
router.put('/editBlog/:id',updateBlog)
module.exports = router