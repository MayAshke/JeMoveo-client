import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // מייבא את ה-hook

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [instrument, setInstrument] = useState('');
  const [role, setRole] = useState('player'); // ברירת מחדל היא "player"
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // יצירת פונקציה לניווט

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/signup', {
        username,
        password,
        instrument,
        role,
      });
      setMessage('User created successfully! Redirecting to login...');
      setTimeout(() => {
        navigate('/login'); // אחרי 2 שניות, נעבור לדף ה-login
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
      <h2>Signup</h2>
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
        <button type="submit">Sign Up</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Signup;