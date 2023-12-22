const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const dbcon = 'mongodb+srv://divyamayavan1925:05KNIKxnd9qLWUmF@job-application-website.m3hqhqp.mongodb.net/jobWebsite?retryWrites=true&w=majority'
    await mongoose.connect(dbcon, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected...');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
