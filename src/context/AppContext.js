import React, { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

const AppProvider = ({ children }) => {
    const [role, setRole] = useState("player"); 
    const [user, setUser] = useState(null); 
    const [type, setType] = useState("user"); 
    const [selectedSong, setSelectedSong] = useState(null); 
    const [selectedSongName, setSelectedSongName] = useState('')

    useEffect(() => {
        }, [selectedSongName, role, type])
    return (
        <AppContext.Provider value={{ role, setRole, type, setType, user, setUser, selectedSong, setSelectedSong, selectedSongName, setSelectedSongName }}>
            {children}
        </AppContext.Provider>
    );
};

export default AppProvider;