import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const socket = io(`${SERVER_URL}`); 

const MainPlayer = () => {
  const [status, setStatus] = useState('Waiting for next song...'); 
   const navigate = useNavigate();

  useEffect(() => {
    socket.emit('joinSession', '123');  
    socket.on('changeStatus', (newStatus) => {
      if (newStatus?.status === 'Live') {
        setStatus('Live');
        navigate(`/live?song=${newStatus.song.title}`);
      }
    });
  }, []);

  return (
    <div>
      <h1>🎸 Users Zone 🎸</h1>
      <p>{status}</p>
    </div>
  );
};

export default MainPlayer;
