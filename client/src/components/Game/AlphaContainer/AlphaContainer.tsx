import React from 'react';
import { motion } from 'framer-motion';

type Props = {
    alphabet: string;
};

const AlphaContainer: React.FC<Props> = ({ alphabet }) => {
    return (
        <motion.div
            className='flex items-center justify-center w-16 h-16 mx-2 mb-4 rounded-lg bg-gradient-to-r from-orange-500 to-yellow-400 text-white text-xl md:text-3xl font-frick shadow-lg hover:shadow-xl transition-transform transform hover:scale-110 relative'
            variants={{
                hidden: { y: '-100vh', opacity: 0 },
                visible: { y: 0, opacity: 1 },
            }}
            transition={{
                duration: 0.2,
                type: "spring",
                stiffness: 110,
            }}
        >
            {/* Inner border */}
            <div className='absolute grid place-content-center inset-0 rounded-lg border-4 border-yellow-300 bg-gradient-to-r from-orange-400 to-yellow-500 transform  translate-x-1 translate-y-1'>
            {alphabet}
            </div>
            
        </motion.div>
    );
};

export default AlphaContainer;
