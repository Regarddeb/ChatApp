import Lottie from 'lottie-react';
import squareLoadingAnimation from '@assets/animations/squareLoadingAnimation.json';

export const MenuLoading: React.FC = () => {
    return (
        <div className='w-full h-full flex items-center justify-center'>
            <div className='w-[100px] h-100px'>
                <Lottie
                    animationData={squareLoadingAnimation}
                    loop
                    autoplay
                />
            </div>
        </div>
    )
}