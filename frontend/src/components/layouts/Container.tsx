import React, { FC } from 'react';

interface ContainerProps {
    children?: React.ReactNode;
}

const Container: FC<ContainerProps> = ({ children }) => {
    return (
        <div className='h-full w-full flex flex-col container mx-auto'>
      
            {children}
        </div>
    );
}

export default Container;

