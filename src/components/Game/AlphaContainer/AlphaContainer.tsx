import React from 'react';
import { motion } from 'framer-motion';

type Props = {
    alphabet: string;
};

const AlphaContainer: React.FC<Props> = ({ alphabet }) => {
    return (
        <motion.div
            className='flex items-center justify-center w-12 h-12 mx-2 mb-4 rounded-lg bg-orange-400 text-white text-2xl shadow-lg transition-transform transform hover:scale-105'
            variants={{
                hidden: { y: '-100vh', opacity: 0 },
                visible: { y: 0, opacity: 1 }
            }}
            transition={{
                duration: 0.1,
                type: "spring",
                stiffness: 110,
            }}
        >
            {alphabet}
        </motion.div>
    );
};

export default AlphaContainer;
