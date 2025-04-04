import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';

const SERVER_URL = process.env.REACT_SERVER_URL;

const socket = io(`${SERVER_URL}`); 
const MainPlayer = () => {
  const [status, setStatus] = useState('Waiting for next song'); 
   const navigate = useNavigate();

  useEffect(() => {
    socket.emit('joinSession', '123');  
    socket.on('changeStatus', (newStatus) => {
        console.log("changed status", {newStatus})
      if (newStatus?.status === 'Live') {
        console.log({newStatus})
        setStatus('Live');
        navigate(`/live?song=${newStatus.song.title}`);
      }
    });
  }, []);

  return (
    <div>
      <h1>🎸 Player Zone 🎸</h1>
      <p>ברוך הבא לאזור הנגנים!</p>
      <p>Status: {status}</p>
      <ul>
        <li>🎵 הצטרפות לחזרות</li>
        <li>🎶 הצגת רשימת השירים</li>
        <li>🎼 קבלת עדכונים מהאדמין</li>
      </ul>
    </div>
  );
};

export default MainPlayer;
