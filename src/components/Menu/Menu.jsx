import React, { useState } from "react";
import { RxHamburgerMenu, RxCross1 } from "react-icons/rx";
import { Button } from "../index";

const Menu = () => {
    const [isMenuOpen, SetIsMenuOpen] = useState(false);
    const options = ["Create board", "Join board", "Your boards"];

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
                            options.map((option, index) => (
                                <Button 
                                    className="flex flex-col font-semibold text-lg lg:text-2xl mb-2" 
                                    key={index}
                                >
                                    {option}
                                </Button>
                            ))
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