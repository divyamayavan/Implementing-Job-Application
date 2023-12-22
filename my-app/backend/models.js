const mongoose = require('mongoose');

const jobListingSchema = new mongoose.Schema({
 title: String,
 companyname: String,
 description: String,
 deadline: Date
});

const jobApplicationSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  resume: String, 
  coverLetter: String,
});

module.exports = mongoose.model('JobListing', jobListingSchema);
module.exports = mongoose.model('JobApplication', jobApplicationSchema);

