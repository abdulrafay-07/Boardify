import React, { useState } from 'react';
import authService from '../../appwrite/auth.js';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../store/authSlice.js';
import { Button, Input } from '../index.js';
import { useForm } from 'react-hook-form';

const Signup = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {register, handleSubmit} = useForm();
    const [error, setError] = useState("");

    const signup = async(data) => {
        setError("");
        try {
            const createUser = await authService.createAccount(data);

            if (createUser) {
                const userData = await authService.getCurrentUser();
                if(userData) {
                    dispatch(login(userData));
                }
                navigate("/");
            }
        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <div className="flex items-center justify-center w-full py-4">
            <div className={`dark:bg-neutral-900 dark:text-white text-neutral-900 mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10 dark:border-white/10 font-secondary`}>
                <div className="mb-2 flex justify-center">
                    <span className="text-center text-3xl w-full max-w-[150px] font-primary">
                        Boardify
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">
                    Sign up to create account
                </h2>
                <p className="mt-2 text-center text-base text-black/60 dark:text-white/60">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

                <form onSubmit={handleSubmit(signup)} className="mt-8">
                    <div className="space-y-5 text-xl">
                        <Input
                            label="Name: "
                            placeholder="Enter your name"
                            {...register("name", {
                                required: true
                            })}
                        />
                        <Input 
                            label="Email: "
                            placeholder="Enter your email"
                            type="email"
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || "Email address must be a valid address"
                                }
                            })}
                        />
                        <Input
                            label="Password: "
                            placeholder="Enter your password"
                            type="password"
                            {...register("password", {
                                required: true
                            })}
                        />
                        <Button
                            type="submit" className="w-full"
                        >
                            Create Account
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup;