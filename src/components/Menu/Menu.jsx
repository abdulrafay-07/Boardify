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
        <div className="fixed top-0 left-0 p-3 lg:p-6">
            {isMenuOpen ? 
                <div>
                    <RxCross1 
                        className="font-bold text-3xl lg:text-4xl cursor-pointer" 
                        onClick={() => SetIsMenuOpen(!isMenuOpen)}
                    />
                    <div className="mt-2 p-3 lg:p-6 rounded-lg border-2 border-black">
                        {
                            items.map((item) => (
                                <button 
                                    onClick={() => navigate(item.slug)}
                                    key={item.slug}
                                    className="flex flex-col font-semibold text-lg lg:text-2xl mb-2"
                                >
                                    {item.name}
                                </button>
                            ))
                        }
                        {
                            isAuthenticated && (
                                <button 
                                    onClick={logoutHandler} 
                                    className="font-semibold text-lg lg:text-2xl mb-2"
                                >
                                    Log out
                                </button>
                            )
                        }
                    </div>
                </div>
                :
                <RxHamburgerMenu 
                    className="font-bold text-3xl lg:text-4xl cursor-pointer" 
                    onClick={() => SetIsMenuOpen(!isMenuOpen)}
                />
            }
        </div>
    )
}

export default Menu;