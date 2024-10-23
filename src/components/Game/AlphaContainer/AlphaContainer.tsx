import React from 'react';

type Props = {
    alphabet: string;
};

const AlphaContainer: React.FC<Props> = ({ alphabet }) => {
    return (
        <div className='flex items-center justify-center w-12 h-12 mx-2 mb-4 rounded-lg bg-orange-400 text-white text-2xl shadow-lg transition-transform transform hover:scale-105'>
            {alphabet}
        </div>
    );
};

export default AlphaContainer;
