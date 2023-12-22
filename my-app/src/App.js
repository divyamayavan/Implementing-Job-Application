import React from 'react';
import './App.css'; 
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HomePage from './HomePage';
import JobDetailsPage from './JobDetailsPage';
import ApplicationForm from './ApplicationForm';


function App() {
  return (
    <Router>
      <div className='App'>
      <div className="nav-container">
          <nav>
            <ul>
              <li><Link to="/">HomePage</Link></li>
              <li><Link to="/job-details/Your-job-id">JobDetailsPage</Link></li>
              <li><Link to="/application-form">ApplicationForm</Link></li>
            </ul>
          </nav>
        </div>
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/job-details/:jobId" element={<JobDetailsPage />} />
          <Route path="/application-form" element={<ApplicationForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
