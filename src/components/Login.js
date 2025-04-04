import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const {setRole, setType} = useContext(AppContext);
  const [errorMessage, setErrorMessage] = useState('');

  const goToSignup = () => {
    navigate('/signup');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!username || !password) {
      setErrorMessage('Please fill in all fields.');
      return;
    }

    try {
      const response = await axios.post(`${SERVER_URL}/login`, {
        username,
        password,
      });

       localStorage.setItem('token', response.data.token);
       localStorage.setItem('type', response.data.user.type); 
       setRole(response.data.user.role);
       setType(response.data.user.type);

       if (response.data.user.type === 'admin') {
         navigate('/Main-Admin');
       } else {
         navigate('/Main-Player');
       }
 
      setErrorMessage('Login successful!');
    } catch (err) {
      console.error('Login failed:', err);
      setErrorMessage('Failed to login');
    }
  };

  return (
    <div>
      <h2>Login</h2>
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
        <div style={{ display: 'flex', flexDirection: 'column' , gap: '15px' }}>
        <button type="submit">Login</button>
        <button onClick={goToSignup}>Don't have an account? Sign up</button>
        </div>
      </form>
    </div>
  );
};

export default Login;