import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const JobDetailsPage = () => {
  const { jobId } = useParams();
  const [jobDetails, setJobDetails] = useState([]);


  useEffect(() => {
    // Fetch job details from the backend based on jobId
    fetch(`http://localhost:3000/api/job-details/${jobId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => setJobDetails(data))
      .catch(error => console.error('Error fetching job details:', error));
  }, [jobId]);

  if (!jobDetails) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className='JobDisplay'>
        <h1 className='Job-Details-heading'>Available Positions and Job Descriptions</h1>
        <div className='job-details-content'>
        <h1>{jobDetails.title}</h1>
        <p><b>Company Name: </b>{jobDetails.company}</p>
        <p className='description'><b>Description: </b>{jobDetails.description}</p>
        <p><b>Deadline for Application Submission: </b>{jobDetails.deadline}</p>
        <Link to={`/application-form?jobId=${jobId}`} className='apply-link'>
          Apply for this Job
        </Link>
        </div>
      </div>
    </>
  );
};

export default JobDetailsPage;



























