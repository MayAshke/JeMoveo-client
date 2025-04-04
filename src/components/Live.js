import React, { useState, useEffect, useContext } from 'react';
import { io } from 'socket.io-client';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import AutoScrollLyrics from './AutoScrollLyrics';

const SERVER_URL = process.env.SERVER_URL;

const LiveScreen = ( ) => {

    const [song, setSong] = useState([[{ lyrics: "", chords: "" }]]); 
    const [searchParams] = useSearchParams();
    const { role, selectedSongName, type } = useContext(AppContext);
    const navigate = useNavigate();

    //למה צריך?
    console.log({selectedSongName})
    console.log({type})

    const songName = searchParams.get('song');

    useEffect(() => {
        const fetchSong = () => {
            fetch(`${SERVER_URL}/song/${songName}`)
            .then((res) => res.json())
            .then((data) => setSong(data))
            .catch((err) => console.error('Error fetching songs:', err));

            console.log('fetched')
        }
        fetchSong();
        });

        socket.on('forceQuit', () => {
            if (type === 'admin') {
                navigate('/main-admin');
            } else {
                navigate('/main-player');
            }
    }, [role, navigate])

    console.log({song});

    return (
        <div>
    <h1>🎤 Live Session 🎶</h1>
    <h1>{songName}</h1>
    <AutoScrollLyrics song={song} role={role} />
    {type === 'admin' && (
    <button onClick={() => socket.emit('adminQuit')}>
        QUIT
    </button>
    )}
    </div>
    );
};

export default LiveScreen;