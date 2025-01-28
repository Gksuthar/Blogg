const cloudinary = require('cloudinary').v2;
const { error } = require('console');
const BlogPost = require('../Modals/BlogPost')
const fs = require('fs');
const path = require('path');

cloudinary.config({
    cloud_name: 'dsu49fx2b',  // Replace with your actual Cloudinary cloud name
    api_key: '625639266695181',  // Replace with your actual Cloudinary API key
    api_secret: '5Do5PCsveLlgOut9S2irZ3ZemRE',  // Replace with your actual Cloudinary API secret
});

const addBlog = async (req, res) => {
        try {
            const { title, content } = req.body;
            let imageUrl = req.file ? req.file : null;
    
            // If file is uploaded, upload to Cloudinary
            if (req.file) {
                const result = await cloudinary.uploader.upload(req.file.path, {
                    folder: "blog_images", // Cloudinary folder for images
                });
                imageUrl = result.secure_url; // Save the Cloudinary image URL
            }
    
            // Create the blog post in the database
            const response = await BlogPost.create({
                title,
                content,
                img: imageUrl, // Use Cloudinary URL or null if no image
            });
    
            // Check if creation was successful
            if (!response) {
                return res.status(401).send({
                    message: "Your data is not inserted.",
                    data: response,
                });
            }
    
            // Success response
            res.status(200).send({
                message: "Your data has been inserted successfully.",
                data: response,
                image: req.file ? req.file : null, // Send the file info if uploaded
            });
        } catch (error) {
            console.error("Error adding blog post:", error);
            res.status(500).send({
                message: "An error occurred while adding the blog post.",
                error: process.env.NODE_ENV === 'development' ? error.message : "Internal server error", // Provide detailed error in dev mode
            });
        }
};
    
  
const getBlogs = async (req, res) => {
    try {
        const response = await BlogPost.find();

        if (!response || response.length === 0) {
            return res.status(404).send({
                message: "No blog posts found.",
                data: [],
            });
        }

        res.status(200).send({
            message: "Blog posts retrieved successfully.",
            data: response,
        });
    } catch (error) {
        res.status(500).send({
            message: "Failed to retrieve blog posts.",
            error: error.message,
        });
    }
};
const getBlog = async (req, res) => {
    
    try {
        const { id } = req.params;  // Extract the `id` from the URL parameters
        const response = await BlogPost.findById(id);

        if (!response || response.length === 0) {
            return res.status(404).send({
                message: "No blog posts found.",
                data: '',
            });
        }

        res.status(200).send({
            message: "Blog posts retrieved successfully.",
            data: response,
        });
    } catch (error) {
        res.status(500).send({
            message: "Failed to retrieve blog posts.",
            error: error.message,
        });
    }
};
const removeData = async (req, res) => {
    
    try {
        const { id } = req.params;  
        const response = await BlogPost.findByIdAndDelete(id);

        if (!response) {
            return res.status(404).send({
                message: "No blog found.",
                data: '',
            });
        }

        res.status(200).send({
            message: "Blog posts removed successfully.",
            data: response,
        });
    } catch (error) {
        res.status(500).send({
            message: "Failed to remove blog posts.",
            error: error.message,
        });
    }
};

const updateBlog = async (req, res) => {
    
    try {
        const { id } = req.params;  
        const {title,content} = req.body;

        const response = await BlogPost.findByIdAndUpdate(id,{title,content}, { new: true, runValidators: true });
        if (!response) {
            return res.status(404).send({
                message: "No blog found.",
                data: '',
            });
        }

        res.status(200).send({
            message: "Blog posts Updated successfully.",
            data: response,
        });
    } catch (error) {
        res.status(500).send({
            message: "Failed to Update blog posts.",
            error: error.message,
        });
    }
};

module.exports = {addBlog,getBlogs,getBlog,removeData,updateBlog}