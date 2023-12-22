import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const jobs = [
    { 
      id: 1, title: "Cloud FullStack Application Developer",
       company: "Wipro", 
       location: "Bengaluru, Karnataka, India" 
    },
    
    { 
      id: 2, title: "Java Developer",
       company: "Tata Consultancy Services",
        location: "Bangalore Urban, Karnataka, India" 
    },
    
    { id: 3, title: "System Engineer",
     company: "IBM", 
    location: "Chennai, Tamilnadu, India (Hybrid)"
   },
    
   { 
    id: 4,
    title: "Full Stack Developer", 
    company: "Technoconsulting Services", 
    location: "Coimbatore, Tamil Nadu, India(WFH)" 
  }
  ];

  return (
    <>
      <div>
        <h1 className='home-head-bg'>Your Next Career Move Starts Here !</h1>
        <div className='cards'>
          {jobs.map(job => (
            <div key={job.id} className="card">
              <div className={`card${job.id}-image`}></div>
              <div className="container">
                <h4><b>{job.title}</b></h4>
                <p><b>{job.company}</b></p>
                <p>{job.location}</p>
              </div>
              <Link to={`/job-details/${job.id}`} className='view'>View Job Details</Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default HomePage;

