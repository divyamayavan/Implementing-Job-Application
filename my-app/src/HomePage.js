import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';


const HomePage = () => {
  const [job, setJob] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/job-listings')
      .then(response => response.json())
      .then(data => setJob(data))
      .catch(error => console.error('Error fetching job listings:', error));
  }, []);

  return (
    <>
      <div className='main'>
        <h1 className='home-head-bg'>Your Next Career Move Starts Here !</h1>
        <div className='cards'>
          {job.map(job => (
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

