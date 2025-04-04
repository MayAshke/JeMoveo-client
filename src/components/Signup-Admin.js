import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const SignupAdmin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [instrument, setInstrument] = useState('');
  const [role, setRole] = useState('player'); 
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); 
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password || !instrument || !role) {
        setErrorMessage('Please fill in all fields.');
        return;
      }  

    try {
      const response = await axios.post(`${SERVER_URL}/signup`, {
        username,
        password,
        instrument,
        role,
        type: 'admin',
      });
      setMessage('User created successfully! Redirecting to login...');
      setErrorMessage(null);

      setTimeout(() => {
        navigate('/login'); 
      }, 2000); 
    } catch (err) {
      console.error('Error creating user:', err);
  
      if (err.response && err.response.data.error === 'Username already exists') {
        setErrorMessage('This username is already taken. Please choose another one.');
      } else {
        setErrorMessage('Failed to create user: ' + (err.response ? err.response.data.error : 'Unknown error'));
      }
    }
  };

  return ( 
    <div>
      <h2>Sign up as an admin</h2>
      {errorMessage && (<p className="error-message">{errorMessage}</p>)}
      <form onSubmit={handleSubmit} class="form-container">
        <div className="form-row">
          <label>Username: </label>
          <input
            placeholder="Username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-row">
          <label>Password: </label>
          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-row">
          <label>Instrument: </label>
          <input
            placeholder="Instrument"
            type="text"
            value={instrument}
            onChange={(e) => setInstrument(e.target.value)}
          />
        </div>
        <div className="form-row">
          <label>Role: </label>
          <select placeholder="Role" value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="player">Player</option>
            <option value="singer">Singer</option>
          </select>
        </div>
        <button type="submit" >Sign Up as an admin</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default SignupAdmin;