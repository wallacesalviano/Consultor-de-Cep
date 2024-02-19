import { motion } from "framer-motion"
import {
    fadeIn,
    slideInFromLeft,
    slideInFromRight,
    slideInFromTop
} from '@/lib/Motion';

export const Header = () => {

    return (
        <motion.nav
            initial='hidden'
            animate='visible'
            className='bg-[#171717] text-[#FFBB24]'>
            <motion.div variants={slideInFromTop(0.2)} className="flex justify-center items-center">
                <h1  className='text-[40px]'><span className="text-[#FF4A4A]">Buscador</span> de <span className='text-[#1EA4E9]'>CEP</span></h1>
                <img src={"./assets/map.png"} alt="foto de mapa para o header" width={50} height={40} />
            </motion.div>
        </motion.nav>
    );
}