import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Signup from './components/Signup';  
import Login from './components/Login';   
import MainAdmin from './components/Main-Admin';   
import MainPlayer from './components/Main-Player';   

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <img src='logo-JaMoveo.png' alt="logo" />
  
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/main-admin" element={<MainAdmin />} />
        <Route path="/main-player" element={<MainPlayer />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
