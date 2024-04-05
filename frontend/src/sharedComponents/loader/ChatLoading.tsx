import Lottie from "lottie-react"
import squareLoadingAnimation from '@assets/animations/squareLoadingAnimation.json';

export const ChatLoading = () => {
    return (
        <div className="w-full h-full flex justify-center items-center">
            <div className="w-[200px] h-[200px">
                <Lottie
                    animationData={squareLoadingAnimation}
                    loop
                    autoplay
                />
            </div>
        </div>
    )
}