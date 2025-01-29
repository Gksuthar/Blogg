const cloudinary = require('cloudinary').v2;
const BlogPost = require("../Modals/BlogPost");
const Comment = require('../Modals/commentSchema')
cloudinary.config({
  cloud_name: 'dsu49fx2b',
  api_key: '625639266695181',
  api_secret: '5Do5PCsveLlgOut9S2irZ3ZemRE',
});

const getImages = async (req, res) => {
  try {
    // Assuming 'img' is passed as a query parameter
    const { img } = req.query;

    if (!img) {
      return res.status(400).send({
        message: "Image identifier (img) is required",
      });
    }

    // Find the record in the database to verify the image ID
    const response = await BlogPost.findOne({ img });

    if (!response) {
      return res.status(404).send({
        message: "Image not found in the database",
      });
    }

    // Generate the image URL using Cloudinary
    const imageUrl = cloudinary.url(response.img, {
      secure: true, // Ensures the image is fetched over HTTPS
    });

    // Send the image URL as a response
    res.status(200).send({
      message: 'Image fetched successfully',
      imageUrl: imageUrl,
    });

  } catch (error) {
    console.error("Error fetching the image:", error);
    res.status(500).send({
      message: "An error occurred while fetching the image",
      error: error.message,
    });
  }
};

const postComments = async (req, res) => {
  try {
    const { postId, name, comment } = req.body;

    if (!postId || !name || !comment) {
      return res.status(400).send({
        message: "All fields (postId, name, comment) are required.",
      });
    }

    const data = await Comment.create({ postId, name, comment });

    if (!data) {
      return res.status(500).send({
        message: "Failed to create comment.",
        data: null,
      });
    }

    return res.status(201).send({
      message: "Comment posted successfully.",
      data: data,
    });

  } catch (error) {
    console.error("Error posting comment:", error);

    return res.status(500).send({
      message: "An error occurred while posting the comment.",
      error: error.message,
    });
  }
};

const getComments = async (req, res) => {
  try {
    const { postId } = req.query;

    const data = await Comment.find({ postId });

    if (!data) {
      return res.status(500).send({
        message: "Failed to load comment.",
        data: null,
      });
    }

    return res.status(200).send({
      message: "Comment Loaded successfully.",
      data: data,
    });

  } catch (error) {
    console.error("Error Loaded comment:", error);

    return res.status(500).send({
      message: "An error occurred while posting the comment.",
      error: error.message,
    });
  }
};

module.exports = { getImages,postComments,getComments };
