import React from 'react';
import { Signup as SignupComponent } from '../components/index.js';

const Signup = () => {
    return (
        <div className="dark:bg-neutral-900 dark:text-white bg-white text-neutral-900 h-screen py-20">
            <SignupComponent />
        </div>
    )
}

export default Signup;