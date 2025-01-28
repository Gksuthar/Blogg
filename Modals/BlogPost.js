const mongoose = require('mongoose');
const { type } = require('os');

const blogPostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  img : {type:String,require:true},
  tags: { type: [String], default: [] },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('BlogPost', blogPostSchema);
