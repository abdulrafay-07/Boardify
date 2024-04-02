import React, { useState, useEffect } from 'react';
import { Tldraw } from 'tldraw';
import { Button, Menu } from '../index.js';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Boards = ({ boardId, userId, deleteBoard }) => {
    const [isAuthor, setIsAuthor] = useState(false);
    const userData = useSelector((state) => state.auth.userData);

    useEffect(() => {
        setIsAuthor(userData.$id === userId);
    }, [userData.$id, userId]);

    return (
        <div className="fixed inset-0">
            {
                isAuthor ?
                <div className="relative h-full">
                    <div className="absolute top-0 left-0 z-10">
                        <Menu />
                    </div>
                    <Button className="absolute top-0 right-0 m-3 lg:m-6 z-10" onClick={deleteBoard}>
                        Delete
                    </Button>
                    <Tldraw className="relative z-0" persistenceKey={boardId} />
                </div> : 
                <div className="flex flex-col items-center justify-center h-full">
                    <h1 className="text-5xl my-2 text-gray-800">Page does not exist.</h1>
                    <Link to="/" className="text-2xl text-gray-600">Return to homepage</Link>
                </div>
            }
        </div>
    )
}

export default Boards;