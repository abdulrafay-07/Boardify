import React, { useState, useEffect } from 'react';
import authService from '../../appwrite/auth';

const Welcome = () => {
    const [username, setUsername] = useState("");

    useEffect(() => {
        const user = async () => {
            const userData = await authService.getCurrentUser();
    
            if (userData) {
                setUsername(userData.name);
            } else {
                setUsername("none");
            }
        }

        user();
    }, [])

    return (
        <div className="fixed top-0 right-0 px-4 py-2 border-2 border-black rounded-2xl m-3 lg:m-6">
            <h2 className="text-xl md:text-2xl font-secondary">Welcome {username}!</h2>
        </div>
    )
}

export default Welcome;