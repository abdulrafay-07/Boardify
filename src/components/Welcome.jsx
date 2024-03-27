import React, { useState, useEffect } from 'react';
import authService from '../appwrite/auth';

const Welcome = () => {
    const [name, setUsername] = useState("");

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
        <div className="px-4 py-2 border-2 border-black rounded-2xl m-3 lg:m-6">
            <h2 className="text-xl">Welcome {name}</h2>
        </div>
    )
}

export default Welcome;