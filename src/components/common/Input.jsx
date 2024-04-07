import React, { useId } from 'react';

const Input = React.forwardRef(function Input({
    label, type = 'text', className = '', ...props
}, ref) {
    const id = useId();

    return (
        <div>
            {label &&
                <label 
                    className="inline-block mb-1 pl-1"
                    htmlFor={id}
                >
                    {label}
                </label>
            }
            <input 
                className={`px-5 py-3 rounded-lg dark:bg-neutral-900 dark:text-white bg-white text-neutral-900 outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full placeholder:text-center ${className}`}
                type={type}
                ref={ref}
                {...props}
                id={id}
            />
        </div>
    )
})

export default Input;