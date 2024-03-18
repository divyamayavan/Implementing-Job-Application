// import React, { useState } from 'react';

// const SignUp = ({ onSignUp }) => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [phone, setPhone] = useState('');

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     // Perform validation checks here if needed

//     // Make a request to your backend API for sign-up
//     try {
//       const response = await fetch('http://localhost:3000/api/signup', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ name, email, password, confirmPassword, phone }),
//       });

//       if (response.ok) {
//         const userData = await response.json();
//         onSignUp(userData); // Pass the user data to the parent component
//       } else {
//         console.error('Sign-up failed');
//         // Handle sign-up failure (show error message, etc.)
//       }
//     } catch (error) {
//       console.error('Error during sign-up:', error);
//     }
//   };

//   const handleNameChange = (event) => {
//     setName(event.target.value);
//   };

//   const handleEmailChange = (event) => {
//     setEmail(event.target.value);
//   };

//   const handlePasswordChange = (event) => {
//     setPassword(event.target.value);
//   };

//   const handleConfirmPasswordChange = (event) => {
//     setConfirmPassword(event.target.value);
//   };

//   const handlePhoneChange = (event) => {
//     setPhone(event.target.value);
//   };

//   return (
//     <>
//       <div className='JobDisplay'>
//         <div>
//           <h1 className='Application-Form'>Registration Form</h1>
//         </div>
//         <div className='job-details-content'>
//           <form onSubmit={handleSubmit} className='form'>
//             <label>
//               <input
//                 placeholder='Enter Your Name'
//                 type="text"
//                 value={name}
//                 onChange={handleNameChange}
//                 required
//               />
//             </label><br></br>

//             <label>
//               <input
//                 placeholder='Email:'
//                 type="text"
//                 value={email}
//                 onChange={handleEmailChange}
//                 required
//               />
//             </label><br></br>

//             <label>
//               <input
//                 type="password"
//                 placeholder='Enter Your Password Here...'
//                 value={password}
//                 onChange={handlePasswordChange}
//                 required
//               />
//             </label><br></br>

//             <label>
//               <input
//                 type="password"
//                 placeholder='Re-Enter Your Password Here...'
//                 value={confirmPassword}
//                 onChange={handleConfirmPasswordChange}
//                 required
//               />
//             </label><br></br>

//             <label>
//               <input
//                 placeholder='Phone No'
//                 type="text"
//                 name="phoneNumber"
//                 value={phone}
//                 onChange={handlePhoneChange}
//                 required
//               />
//             </label><br></br>

//             <button className='submit'>Submit</button>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// };

// export default SignUp;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SignUp = ({ onSignUp }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if terms are agreed
    if (!agreeTerms) {
      setError('You must agree to the terms and conditions');
      return;
    }

    // Make a request to backend API for sign-up
    try {
      const response = await fetch('http://localhost:3000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: fullName, email, password, confirmPassword, phone }),
      });

      const data = await response.json();

      if (response.ok) {
        // Registration successful
        setSuccessMessage('Successfully registered!');
        onSignUp(data); // Pass the user data to the parent component
      } else {
        // Registration failed
        setError(data.error || 'Registration failed');
      }
    } catch (error) {
      console.error('Error during sign-up:', error);
      setError('Internal Server Error');
    }
  };

  return (
    <div className="container-1">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder='Full name'
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
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
        <input
          type="password"
          placeholder='Re-enter Password'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <input
          type="tel"
          placeholder='Phone Number'
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <div className="terms">
          <input
            type="checkbox"
            id="agreeTerms"
            checked={agreeTerms}
            onChange={(e) => setAgreeTerms(e.target.checked)}
            required
          />
          <label htmlFor="agreeTerms">I agree to the <Link to="#">Terms & Conditions</Link></label>
        </div>
        {error && <p className="error-message">{error}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
        <button type="submit">Sign Up</button>
      </form>
      <div className="member">
        Already have an account? <Link to='/login'>Login</Link>
      </div>
    </div>
  );
};

export default SignUp;
