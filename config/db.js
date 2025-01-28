const mongoose = require('mongoose');

require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(`mongodb+srv://root:root@cluster0.nv076.mongodb.net/myDatabase?retryWrites=true&w=majority&appName=Cluster0`);
    console.log('MongoDB connection successful');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1); 
  }
};

module.exports = connectDB;
