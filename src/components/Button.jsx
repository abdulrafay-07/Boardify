import React from 'react';

const Button = ({ 
    children, type='button', bgColor = '', textColor = 'text-black', className = '', ...props
}) => {
    return (
        <button
            className={`${bgColor} ${textColor} ${className}`} {...props}
        >
            {children}
        </button>
    )
}

export default Button;