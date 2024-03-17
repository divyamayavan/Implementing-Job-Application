const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { check, validationResult } = require('express-validator');
const bodyParser = require("body-parser");
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
require("dotenv").config();
var cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



//database connection 
const DATABASE = 'mongodb+srv://divyamayavan1925:05KNIKxnd9qLWUmF@job-application-website.m3hqhqp.mongodb.net/jobWebsite'
mongoose.connect(DATABASE, {
    useNewUrlParser: true,
  useUnifiedTopology: true
})
    .then(() => console.log("DB connected"))
    .catch((err) => console.log(err));

//Middleware
app.use(bodyParser.json());
app.use(cors());

//Models-Job Listing
const jobListingSchema = new mongoose.Schema({
  id: {},
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  companyname: {
    type: String,
    required: [true, 'Company name is required'],
    trim: true,
    maxlength: [100, 'Company name cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    minlength: [20, 'Description must be at least 20 characters'],
    maxlength: [1000, 'Description cannot be more than 1000 characters']
  },
  deadline: {
    type: String,
    required: [true, 'Deadline is required'],
    min: [Date.now(), 'Deadline cannot be in the past'],
    validate: {
      validator: (value) => {
        return new Date(value).getTime() > Date.now();
      },
      message: 'Deadline must be a future date'
    }
  }
});
const JobListing = mongoose.model('JobListing', jobListingSchema);

// MOdels - Application Form
const jobApplicationSchema = new mongoose.Schema({
  jobId: {
    type: String,
    required: [true, 'Job ID is required'],
    trim: true
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters long'],
    maxlength: [100, 'Name cannot be more than 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    validate: {
      validator: function(value) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      },
      message: 'Invalid email address'
    }
  },
  phoneNumber: {
    type: Number,
    required: [true, 'Phone number is required'],
    validate: {
      validator: function(value) {
        return /^[0-9]{10}$/.test(value.toString());
      },
      message: 'Invalid phone number'
    }
  },
  resume: {
    data: {
      type: Buffer,
      required: [true, 'Resume is required']
    },
    contentType: {
      type: String,
      required: [true, 'Resume content type is required']
    }
  },
  coverLetter: {
    type: String,
    trim: true,
    maxlength: [1000, 'Cover letter cannot be more than 1000 characters']
  }
});

const JobApplication = mongoose.model('JobApplication', jobApplicationSchema);

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
});

const User = mongoose.model('User', userSchema);

userSchema.pre('save', async function(next) {
  const user = this;
  if (!user.isModified('password')) return next();

  try {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
    next();
  } catch (error) {
    return next(error);
  }
});

// Login endpoint
app.post('/api/login', [
  check('email').isEmail().withMessage('Invalid email address'),
  check('password').notEmpty().withMessage('Password is required'),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '1h' });

    res.json({ token, userId: user._id, username: user.username });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Signup endpoint
app.post('/api/signup', [
  check('name').notEmpty().withMessage('Name is required'),
  check('email').isEmail().withMessage('Invalid email address'),
  check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  check('confirmPassword').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Passwords do not match');
    }
    return true;
  }),
  check('phone').isNumeric().withMessage('Invalid phone number'),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, phone } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists with this email' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      phone,
    });
    await newUser.save();
    res.json({ success: true, message: 'User registered successfully' });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



// API endpoints
// GET endpoint - Fetching job listings
app.get('/api/job-listings', async (req, res) => {
    try {
      const jobListings = await JobListing.find();
      res.json(jobListings);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  // GET endpoint to retrieve job details
  app.get('/api/job-details/:id', async (req, res) => {
    try {
      const jobDetails = await JobListing.findOne({id: req.params.id});
      if (jobDetails) {
        res.json(jobDetails);
      } else {
        res.status(404).json({ error: 'Job not found' });
      }
    } catch (error) {
      console.error('Error fetching job details:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

  // POST endpoint to submit job applications
  app.post('/api/submit-application', 
  upload.single('resume'), // Handling file upload
  [
    check('jobId').notEmpty(),
    check('name').isString().notEmpty(),
    check('email').isEmail(),
    check('phoneNumber').isNumeric(),
    check('coverLetter').isString().notEmpty()
  ], 
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'Resume file is required' });
    }

    try {
      const applicationData = {
        ...req.body,
        resume: {
          data: req.file.path,
          contentType: req.file.mimetype
        }
      };

      const application = new JobApplication(applicationData);
      await application.save();
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
);

  //POST endpoint to post new job listings (for employers)
  app.post('/api/post-job-listings', [
    check('title').isString().notEmpty(),
    check('companyName').isString().notEmpty(),
    check('description').isString().notEmpty(),
    check('deadline').isNumeric().notEmpty()
  ], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    try {
      const jobListing = new JobListing(req.body);
      await jobListing.save();
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

//port
const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
