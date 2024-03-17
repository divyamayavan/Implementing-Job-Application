import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import HomePage from './HomePage';
import JobDetailsPage from './JobDetailsPage';
import ApplicationForm from './ApplicationForm';
import LandingPage from './LandingPage';
import Login from './Login';
import SignUp from './SignUp';
import Logout from './Logout';
import './App.css';

const PrivateRoute = ({ element, authenticated, ...rest }) => {
  return authenticated ? (
    <Route {...rest} element={element} />
  ) : (
    <Navigate to="/login" replace />
  );
};

function App() {
  const isAuthenticated = localStorage.getItem('token');
  const [loggedInUser, setLoggedInUser] = React.useState(null);

  const handleLogin = (userData) => {
    setLoggedInUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setLoggedInUser(null);
  };

  return (
    <Router>
      <div className='App'>
        <div className="nav-container">
          <nav>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/home">Find Jobs</Link></li>
              <li><Link to="/job-details/Your-job-id">JobDetailsPage</Link></li>
              <li><Link to="/application-form">ApplicationForm</Link></li>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/signup">Register</Link></li>
              <li><Link to="/logout">Logout</Link></li>
            </ul>
          </nav>
        </div>

        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/job-details/:jobId" element={<JobDetailsPage />} />
          <Route path="/application-form" element={<ApplicationForm />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/signup" element={<SignUp onSignUp={handleLogin} />} />
          <Route path="/logout" element={<Logout onLogout={handleLogout} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;





