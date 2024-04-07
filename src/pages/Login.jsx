import React from 'react';
import { Login as LoginComponent } from '../components/index.js';

const Login = () => {
    return (
        <div className="dark:bg-neutral-900 dark:text-white bg-white text-neutral-900 h-screen py-28">
            <LoginComponent />
        </div>
    )
}

export default Login;