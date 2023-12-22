const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const app = express();
const port = 3000;

mongoose.connect('mongodb://localhost/jobWebsite', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.json());

const jobListingSchema = new mongoose.Schema({
  title: String,
  companyname: String,
  description: String,
  deadline: Date
});

const applicationSchema = new mongoose.Schema({
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'JobListing',
  },
  name: String,
  email: String,
  phonenumber: Number,
  resume: Buffer,
  coverletter: String
});

const JobListing = mongoose.model('JobListing', jobListingSchema);
const JobApplication = mongoose.model('JobApplication', applicationSchema);

// GET endpoint to fetch all jobs
app.get('/api/job-listings', async (req, res) => {
  try {
    const jobListings = await JobListing.find();
    res.json(jobListings);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//GET endpoint to retrieve job details:
app.get('/api/job-details/:jobId', async (req, res) => {
  try {
    const jobDetails = await JobListing.findById(req.params.jobId);
    if (jobDetails) {
      res.json(jobDetails);
    } else {
      res.status(404).json({ error: 'Job not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//POST endpoint to submit job applications:
app.post('/api/submit-application',upload.single('resume'), async (req, res) => {
  try {
    const application = new JobApplication({
      resume: req.file.path,
    })
    await application.save();
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST endpoint to post new job listings (for employers)
app.post('/api/post-job-listing', async (req, res) => {
  try {
    const jobListing = new JobListing(req.body);
    await jobListing.save();
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});






