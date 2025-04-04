// src/components/Login.js
import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

//const SERVER_URL = process.env.REACT_SERVER_URL;
const SERVER_URL = "https://jamoveo-server-0597.onrender.com";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const {setRole, setType} = useContext(AppContext);

  const goToSignup = () => {
    navigate('/signup');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post(`${SERVER_URL}/login`, {
        username,
        password,
      });
       // שמירת הטוקן בלוקאל סטורג'
       localStorage.setItem('token', response.data.token);
       localStorage.setItem('type', response.data.user.type); 

      setRole(response.data.user.role);
      setType(response.data.user.type);

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
        <div style={{ display: 'flex', flexDirection: 'column' , gap: '15px' }}>
        <button type="submit">Login</button>
        <button onClick={goToSignup}>Don't have an account? Sign up</button>
        </div>
      </form>
    </div>
  );
};

export default Login;