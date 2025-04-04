import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignupAdmin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [instrument, setInstrument] = useState('');
  const [role, setRole] = useState('player'); 
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/signup', {
        username,
        password,
        instrument,
        role,
        type: 'admin',
      });
      setMessage('User created successfully! Redirecting to login...');
      setTimeout(() => {
        navigate('/login'); 
      }, 2000); // 2000 מילישניות (2 שניות)
    } catch (err) {
      console.error('Error creating user:', err);
  
      // בדיקה אם השגיאה היא של שם משתמש כפול
      if (err.response && err.response.data.error === 'Username already exists') {
        alert('This username is already taken. Please choose another one.');
      } else {
        // אם זו לא שגיאה של שם משתמש כפול, הצג את השגיאה הכללית
        alert('Failed to create user: ' + (err.response ? err.response.data.error : 'Unknown error'));
      }
    }
  };

  return ( 
    <div>
      <h2>Sign up as an admin</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username: </label>
          <input
            placeholder="Username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password: </label>
          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label>Instrument: </label>
          <input
            placeholder="Instrument"
            type="text"
            value={instrument}
            onChange={(e) => setInstrument(e.target.value)}
          />
        </div>
        <div>
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