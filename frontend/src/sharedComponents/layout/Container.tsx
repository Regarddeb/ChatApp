import React, { FC } from 'react';

interface ContainerProps {
    children?: React.ReactNode;
}

const Container: FC<ContainerProps> = ({ children }) => {
    const token = localStorage.getItem('token');
    const width = token ? '' : 'container mx-auto max-w-screen-xl';
    return (
        <div className={`h-full w-full flex flex-col ${width}`}>
            {children}
        </div>
    );
}

export default Container;

