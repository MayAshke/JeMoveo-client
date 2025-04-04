import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Signup from './components/Signup';  
import SignupAdmin from './components/Signup-Admin';  
import Login from './components/Login';   
import MainAdmin from './components/Main-Admin';   
import MainPlayer from './components/Main-Player';   
import Results from './components/Results';   
import Live from './components/Live';   
import AppProvider from './context/AppContext'; 

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="App">
          <header className="App-header">
            <img src='logo-JaMoveo.png' alt="logo" />
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/signup-admin" element={<SignupAdmin />} />
              <Route path="/login" element={<Login />} />
              <Route path="/main-admin" element={<MainAdmin />} />
              <Route path="/main-player" element={<MainPlayer />} />
              <Route path="/results" element={<Results />} />
              <Route path="/live" element={<Live />} />
            </Routes>
          </header>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
