import React, { useState } from "react";
import { RxHamburgerMenu, RxCross1 } from "react-icons/rx";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import authService from '../../appwrite/auth.js';
import { logout } from '../../store/authSlice.js';
import { useSelector } from 'react-redux';

const Menu = () => {
    const isAuthenticated = useSelector(state => state.auth.status);
    const [isMenuOpen, SetIsMenuOpen] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const items = [
        {
            name: 'Home',
            slug: "/",
        },
        {
            name: "Create board",
            slug: "/create-board",
        },
        {
            name: "Join board",
            slug: "/join-board",
        },
        {
            name: "Your boards",
            slug: "/your-boards",
        },
    ]

    const logoutHandler = () => {
        authService.logout()
        .then(() => {
            navigate("/");
            dispatch(logout());
        })
    }

    return (
        <div className="fixed top-0 left-0 mx-3 my-6 lg:m-6 font-secondary">
            {isMenuOpen ? 
                <div>
                    <RxCross1 
                        className="dark:text-white text-black font-bold text-3xl lg:text-4xl cursor-pointer" 
                        onClick={() => SetIsMenuOpen(!isMenuOpen)}
                    />
                    <div className="dark:bg-neutral-900 dark:text-white bg-white text-neutral-900 mt-2 p-3 lg:p-6 rounded-lg border-2 border-black dark:border-white">
                        {
                            items.map((item) => (
                                <button 
                                    onClick={() => {
                                        navigate(item.slug);
                                        SetIsMenuOpen(!isMenuOpen)
                                    }}
                                    key={item.slug}
                                    className="flex flex-col text-lg md:text-2xl lg:text-3xl mb-2"
                                >
                                    {item.name}
                                </button>
                            ))
                        }
                        {
                            isAuthenticated && (
                                <button 
                                    onClick={logoutHandler} 
                                    className="text-lg md:text-2xl lg:text-3xl mb-2"
                                >
                                    Logout
                                </button>
                            )
                        }
                    </div>
                </div>
                :
                <RxHamburgerMenu 
                    className="dark:text-white text-black font-bold text-3xl lg:text-4xl cursor-pointer" 
                    onClick={() => SetIsMenuOpen(!isMenuOpen)}
                />
            }
        </div>
    )
}

export default Menu;