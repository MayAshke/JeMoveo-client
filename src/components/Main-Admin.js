import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MainAdmin = () => {
    const navigate = useNavigate(); 
    const [searchTerm, setSearchTerm] = useState('');

    const handleClick = (searchTerm) => {
        navigate(`/results?searchValue=${searchTerm}`);
    };

  return (
    <div>
      <h1>🎵 Admin Panel 🎵</h1>
      <h2>Search any song...</h2>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search any song..."
      />
      <button onClick={() => handleClick(searchTerm)}>select</button>
    </div>
  );
};

export default MainAdmin;