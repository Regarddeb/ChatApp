import React, { FC } from 'react';
import { userAtom } from '@atoms/userAtoms';
import { useAtom } from 'jotai';

interface ContainerProps {
    children?: React.ReactNode;
}

const Container: FC<ContainerProps> = ({ children }) => {
    const [user,] = useAtom(userAtom);
    const width = user.token ? '' : 'container mx-auto max-w-screen-xl';
    return (
        <div className={`h-full w-full flex flex-col ${width}`}>
            {children}
        </div>
    );
}

export default Container;

