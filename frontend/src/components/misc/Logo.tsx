import React from 'react';
import logo from '@assets/images/logo.svg';

type ImageProps = {
    width: number,
    height: number,
}

const Logo: React.FC<ImageProps> = ({ width, height }) => {
    return (
        <img className='p-1.5 bg-purple-300 rounded-full' src={logo} alt="logo" width={width} height={height} />
    )
}

export default Logo;