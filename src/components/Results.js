import React, { useState, useEffect, useContext } from 'react';
import { io } from 'socket.io-client';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

// חיבור לשרת
const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const socket = io(`${SERVER_URL}`); 

const Results = () => {
    console.log("in Results")
    const [songs, setSongs] = useState([]);
    const [selectedSong, setSelectedSong] = useState(null);
    const [isSongSelected, setIsSongSelected] = useState(false);
    const [searchParams] = useSearchParams();
    const { selectedSongName, setSelectedSongName } = useContext(AppContext);
    const searchValue = searchParams.get('searchValue');
    const navigate = useNavigate();  
    useEffect(() => {
        fetch(`${SERVER_URL}/songs`)
        .then((res) => res.json())
        .then((data) => setSongs(data))
        .catch((err) => console.error('Error fetching songs:', err));
    }, []);
   
    const handleSongSelect = (event) => {
        const songTitle = event.target.value;
        const song = songs.find((s) => s.title === songTitle);
        setSelectedSong(song);
        console.log("selecting", song.title)
        setSelectedSongName(song.title)
        setIsSongSelected(true); 
    };

    const handleSongSelectClick = () => {
        if (socket && selectedSong) {
            console.log("Song selected:", selectedSong);
            socket.emit('songSelected', { sessionId: '123', song: selectedSong });
            socket.emit('changeStatus', 'Live');
            navigate( `/live?song=${selectedSong.title}`); 
        }
    };

    const filteredSongs = songs.filter((song) => 
        song.title.toLowerCase().includes(searchValue ? searchValue.toLowerCase() : '') 
    );

    return (
        <div>
            <h1>🎵 Reasult Page 🎵</h1>
            <p>Searching for: {searchValue}</p>
            <select onChange={handleSongSelect} value={selectedSong ? selectedSong.title : ''}>
                <option value="">Choose a song</option>
                {filteredSongs.map((song, index) => (
                    <option key={index} value={song.title}>
                        {song.title} 
                    </option>
                ))}
            </select>
            <button
                onClick={handleSongSelectClick}
                disabled={!isSongSelected}
            >
                Select song and live
            </button>
    
            {selectedSong && (
                <div>
                    <h2>Selected Song:  {selectedSong.title}</h2>
                </div>
            )}
        </div>
    );
};

export default Results;
