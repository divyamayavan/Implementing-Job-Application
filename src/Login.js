// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const Login = ({ onLogin }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleLogin = async (event) => {
//     event.preventDefault();

//     try {
//       const response = await fetch('http://localhost:3000/api/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email, password }),
//       });

//       if (response.ok) {
//         const userData = await response.json();
//         onLogin(userData);
//         localStorage.setItem('token', userData.token);
//         navigate('/landing');
//       } else {
//         console.error('Login failed');
//       }
//     } catch (error) {
//       console.error('Error during login:', error);
//     }
//   };

//   return (
//     <div className='main'>
//       <div>
//         <h1 className='home-head-bg'>Login Details</h1>
//       </div>
//       <div className="login-container">
//         <h2>Login</h2>

//         <label>
//           <input
//             placeholder='Email:'
//             type="text"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </label><br /><br />

//         <label>
//           <input
//             type="password"
//             placeholder='Enter Your Password Here...'
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="input-field"
//           />
//         </label><br /><br />

//         <button onClick={handleLogin} className="login-button">
//           Login
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Login;

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const Login = ({ onLogin }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleLogin = async (event) => {
//     event.preventDefault();

//     try {
//       const response = await fetch('http://localhost:3000/api/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         // Login successful
//         localStorage.setItem('token', data.token);
//         onLogin(data); // Assuming onLogin function updates user state in parent component
//         navigate('/landing'); // Redirect to landing page after successful login
//       } else {
//         // Login failed
//         setError(data.error || 'Invalid credentials');
//       }
//     } catch (error) {
//       console.error('Error during login:', error);
//       setError('Internal Server Error');
//     }
//   };

//   return (
//     <div className='main'>
//       <div>
//         <h1 className='home-head-bg'>Login Details</h1>
//       </div>
//       <div className="login-container">
//         <h2>Login</h2>

//         {error && <p className="error-message">{error}</p>}

//         <label>
//           <input
//             placeholder='Email:'
//             type="text"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </label><br /><br />

//         <label>
//           <input
//             type="password"
//             placeholder='Enter Your Password Here...'
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="input-field"
//           />
//         </label><br /><br />

//         <button onClick={handleLogin} className="login-button">
//           Login
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Login successful
        localStorage.setItem('token', data.token);
        onLogin(data); // Assuming onLogin function updates user state in parent component
        navigate('/'); // Redirect to landing page after successful login
      } else {
        // Login failed
        setError(data.error || 'Invalid credentials');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('Internal Server Error');
    }
  };

  return (
    <>
      <div className="container-1">
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="recover">
            <a href="#">Forgot password</a>
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit">Login</button>
        </form>
        <div className="member">
          Don't have an account? <Link to='/signup'>Sign Up</Link>
        </div>
      </div>
    </>
  );
};

export default Login;




