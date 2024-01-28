import Lottie from 'lottie-react';
import loadingAnimation from '@assets/animations/loadingAnimation.json';
import { Overlay } from '@mantine/core';

export const LoadingOverlay = () => {
    return (
        <Overlay color="#000" backgroundOpacity={0.35} blur={4} className='flex items-center justify-center'>
            <div className="h-28 w-28 p-3 bg-white bg-opacity rounded-lg">
                <Lottie
                    animationData={loadingAnimation}
                    loop
                    autoplay
                />
            </div>
        </Overlay>
    );
};
