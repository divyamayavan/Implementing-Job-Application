import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const JobDetailsPage = () => {
  const { jobId } = useParams(); // Get jobId from URL
  const [jobDetails, setJobDetails] = useState(null);

    const jobdetails = [
      {
        id:1,
        title:"Cloud FullStack Application Developer",
        company:"Wipro",
        description:"0 - 1 Year of Experience, Excellent writing and communication skills.Good knowledge of Java, Spring cloud, SQL and AWS.Ability to present complex technical information.Solution using multiple technologies to address functional needs, and convert design to functional and technical specifications.",
        deadline:"20.6.2023"
      },
    
      {
        id:2,
        title:"Java Developer",
        company:"Tata Consultancy Services",
        description:"Fresher, Develop, test, and maintain high-quality Java applications.Collaborate with cross-functional teams to define, design, and ship new features.Bachelor's degree in Computer Science, Software Engineering, or related field.Excellent communication and collaboration abilities.",
        deadline:"3.8.2023"
      },
    
      {
        id:3,
        title:"System Engineer",
        company:"IBM",
        description:"0-1 year of Experience ,Bachelor's degree in Computer Science, Information Technology, or related field.In-depth knowledge of operating systems (Windows, Linux, Unix, etc.),Strong scripting skills (PowerShell, Bash, Python, etc.),Experience with cloud platforms (AWS, Azure, GCP)",
        deadline:"21.9.2023"
      },
    
      {
        id:4,
        title:"Full Stack Developer",
        company:"Technoconsulting Services",
        description:"3-Years of Experience Bachelor's degree in Computer Science, Software Engineering, or related field.Proven experience as a Full Stack Developer or similar role.Proficiency in front-end technologies such as HTML, CSS, JavaScript, and front-end frameworks (React, Angular, Vue.js, etc.).Experience with server-side languages such as Node.js, Python.Experience with version control systems (Git, SVN) is a plus.",
        deadline:"03.11.2023"
      }
    ];
  

  useEffect(() => {
    // Find the job detail from the hardcoded array based on jobId
    const job = jobdetails.find(job => job.id === parseInt(jobId));
    setJobDetails(job);
  }, [jobId, jobdetails]);

  if (!jobDetails) {
    return <div>Loading job details...</div>;
  }

  return (
    <>
     <div><h1 className='Job-Details-heading'>Available Positions and Job Descriptions</h1></div>
    <div className='JobDisplay'>
      <h1>{jobDetails.title}</h1>
      <p><b>Company Name: </b>{jobDetails.company}</p>
      <p><b>Description: </b>{jobDetails.description}</p>
      <p><b>Deadline for Application Submission: </b>{jobDetails.deadline}</p>
      <Link to={`/application-form?jobId=${jobId}`}>
        Apply for this Job
      </Link>
    </div>
    </>
  );
};

export default JobDetailsPage;



























