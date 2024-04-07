import React from 'react';

const Button = ({ 
    children, type='button', bgColor = '', textColor = 'text-black', className = '', ...props
}) => {
    return (
        <button
            className={`px-4 py-2 rounded-lg dark:bg-neutral-900 dark:text-white bg-white text-neutral-900 border border-black dark:border-white font-primary ${bgColor} ${textColor} ${className}`} {...props}
        >
            {children}
        </button>
    )
}

export default Button;