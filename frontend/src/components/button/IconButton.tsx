import React, { ReactNode, ButtonHTMLAttributes } from 'react';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    icon: ReactNode;
    className?: string;
}

export const IconButton: React.FC<IconButtonProps> = ({ icon, className, ...restProps }) => {
    return (
        <button className={`w-fit hover:cursor-pointer z-10 opacity-70 hover:opacity-100 hover:bg-gray-100 rounded-full ${className}`} {...restProps}>
            {icon}
        </button>
    );
};
