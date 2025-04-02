// src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();  // מאפשר לנווט לדפים אחרים

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post('http://localhost:5000/login', {
        username,
        password,
      });
       // שמירת הטוקן בלוקאל סטורג'
       localStorage.setItem('token', response.data.token);
       localStorage.setItem('type', response.data.user.type); // שמירת התפקיד
 
       // הפניה למסך המתאים לפי התפקיד
       if (response.data.user.type === 'admin') {
         navigate('/Main-Admin');
       } else {
         navigate('/Main-Player');
       }
 
      alert('Login successful!');
      console.log('JWT Token:', response.data.token); // לשמור את הטוקן ולהשתמש בו בהמשך
    } catch (err) {
      console.error('Login failed:', err);
      alert('Failed to login');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
