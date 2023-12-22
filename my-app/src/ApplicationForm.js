import React from 'react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

const ApplicationForm = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const jobId = searchParams.get('jobId');

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [coverLetter, setCoverLetter] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Create a FormData object to send files
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('resume', selectedFile);
    formData.append('coverLetter', coverLetter);

    try {
      // Make a POST request to your backend API endpoint
      const response = await fetch('http://localhost:3000/api/apply', {
        method: 'POST',
        body: formData,
      });

      // Handle the response as needed
      if (response.ok) {
        alert('Application submitted successfully!');
      } else {
        alert('Failed to submit application. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('An error occurred. Please try again later.');
    }
  };
  
  
  const handleNameChange = (event) => {
    setName(event.target.value);
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  }

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  }

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleCoverLetterChange = (event) => {
    setCoverLetter(event.target.value);
  }
  
return (
    <>
      <div>
        <div>
          <h1 className='Application-Form'>Application Form</h1>
        </div>
        <div>
          <form onSubmit={handleSubmit} className='form'>
            <label>
              <input
                placeholder='Enter Your Name'
                type="text"
                value={name}
                onChange={handleNameChange}
              />
            </label><br></br>

            <label>
              <input
                placeholder='Email:'
                type="text"
                value={email}
                onChange={handleEmailChange}
              />
            </label><br></br>

            <label>
              <input
                placeholder='Phone No'
                type="text"
                value={phone}
                onChange={handlePhoneChange}
              />
            </label><br></br>

            <label>Upload Resume:
              <input
                type="file"
                onChange={handleFileChange} required
              />
            </label><br></br>

            <label>cover Letter:  </label>
            <textarea rows="5" cols="2" value={coverLetter} onChange={handleCoverLetterChange}> </textarea><br></br>
            <button className='submit'>Submit</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default ApplicationForm;