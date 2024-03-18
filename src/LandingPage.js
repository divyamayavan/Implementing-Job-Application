import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="landing-container">
      <div className="landing-content">
        <h1>Find a Job With Your Interests and Abilities </h1>
        <p>Explore job opportunities, apply, and take the next step in your career.</p>
        <Link to="/Login">
          <button>Get Started</button>
        </Link>
      </div>
      <div className='land-bg'></div>
    </div>
  );
};

export default LandingPage;