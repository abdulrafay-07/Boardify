import React, { useState, useEffect } from 'react';
import { Tldraw } from 'tldraw';
import { Button, Menu } from '../index.js';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Boards = ({ boardId, userId, deleteBoard }) => {
    const [isAuthor, setIsAuthor] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const userData = useSelector((state) => state.auth.userData);

    useEffect(() => {
        setIsAuthor(userData.$id === userId);
    }, [userData.$id, userId]);

    const toggleTheme = () => {
        setDarkMode(!darkMode);
    }

    return (
        <div className="fixed inset-0">
            {
                isAuthor ?
                <div className="relative h-full">
                    <div className={`absolute z-10 ${darkMode ? "text-white" : null}`}>
                        <Menu />
                    </div>
                    <Button className={`absolute top-0 right-0 md:bottom-40 md:top-auto md:right-0 md:left-auto m-4 md:m-6 z-10 md:px-6 md:py-3 text-xl md:text-2xl ${darkMode ? "text-white border-white" : null}`} onClick={deleteBoard}>
                        Delete
                    </Button>
                    <Button className={`absolute top-0 right-0 md:bottom-20 md:top-auto md:right-0 md:left-auto m-4 md:m-6 z-10 md:px-6 md:py-3 text-xl md:text-2xl ${darkMode ? "text-white border-white" : null}`} onClick={toggleTheme}>
                        Dark Mode
                    </Button>
                    <Tldraw className="relative z-0" persistenceKey={boardId} inferDarkMode={darkMode} />
                </div> : 
                <div className="flex flex-col items-center justify-center h-full">
                    <h1 className="text-2xl md:text-5xl my-2 text-gray-800">Page does not exist.</h1>
                    <Link to="/" className="text-2xl text-gray-600">Return to homepage</Link>
                </div>
            }
        </div>
    )
}

export default Boards;