import React, { useState, useEffect } from 'react';
import { Tldraw } from 'tldraw';
import { Button, Menu } from '../index.js';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { toggleTheme } from "../../store/themeSwitcher.js";
import { MdDarkMode } from 'react-icons/md';

const Boards = ({ boardId, userId, deleteBoard }) => {
    const [isAuthor, setIsAuthor] = useState(false);
    const userData = useSelector((state) => state.auth.userData);
    const theme = useSelector((state) => state.theme.theme);
    const dispatch = useDispatch();

    useEffect(() => {
        setIsAuthor(userData.$id === userId);
    }, [userData.$id, userId]);

    const handleThemeToggle = () => {
        dispatch(toggleTheme());
    }

    return (
        <div className="fixed inset-0">
            {
                isAuthor ?
                <div className="relative h-full">
                    <div className="absolute z-10 ">
                        <Menu />
                    </div>
                    <div className="hidden md:block fixed top-0 text-3xl right-44 pt-3 dark:text-white z-10 cursor-pointer">
                        <MdDarkMode onClick={handleThemeToggle} />
                    </div>
                    <Button className="absolute top-0 right-0 md:bottom-20 md:top-auto md:right-0 md:left-auto m-4 md:m-6 z-10 md:px-6 md:py-3 text-xl md:text-2xl" onClick={deleteBoard}>
                        Delete
                    </Button>
                    <Tldraw className="relative z-0" persistenceKey={boardId} inferDarkMode={theme === "dark"} />
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