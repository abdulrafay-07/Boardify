import React from 'react';

const Button = ({ 
    children, type='button', bgColor = '', textColor = 'text-black', className = '', ...props
}) => {
    return (
        <button
            className={`px-4 py-2 rounded-lg border border-black font-primary ${bgColor} ${textColor} ${className}`} {...props}
        >
            {children}
        </button>
    )
}

export default Button;