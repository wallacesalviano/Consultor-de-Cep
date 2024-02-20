import axios from "axios";
import { useState } from "react";
import { Infos } from "../Types/Infos";
import { ArrowBigRightDash } from 'lucide-react';
import { motion } from "framer-motion"
import {
    fadeIn,
    slideInFromLeft,
    slideInFromRight,
    slideInFromTop
} from '@/lib/Motion';

export const Body = () => {
    const [cep, setCep] = useState("");
    const [cepData, setCepData] = useState<Infos | null>(null);

    const handleGetCep = async () => {
        try {
            const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`); // EndPoint - Minha Url
            const cepData = await response.data;

            setCepData(cepData);
        } catch (error) {
            console.error("Erro ao buscar CEP:", error);
            setCepData(null);
        }
        setCep("");

    };

    const formatCep = (value: string) => {
        const numericValue = value.replace(/\D/g, "");
        return numericValue.replace(/^(\d{5})(\d{3})$/, "$1-$2");
    };

    return (
        <motion.section
            initial='hidden'
            animate='visible'
            className="flex flex-col justify-center items-center mt-20">

            <div className="text-center">
                <div className="md:m-10">
                    <motion.h2 variants={slideInFromLeft(0.2)} className="text-3xl md:text-5xl text-[#171717]">Busque o CEP de todo o Brasil.</motion.h2>
                    <motion.p variants={slideInFromRight(0.3)} className="text-[#4E4D4C] text-lg md:text-3xl mt-3">Digite o cep e faça uma busca!</motion.p>
                </div>

                <motion.div variants={slideInFromTop(0.2)}>
                    <input
                        type="text"
                        placeholder="00000-000"
                        className="bg-gray-200 p-3 md:p-5 rounded-full md:w-[30vw] outline-none"
                        value={formatCep(cep)}
                        onChange={(e) => setCep(e.target.value)}
                    />

                    <button className="bg-[#FFBB24] p-3 md:p-5 rounded-r-full -ml-10 mt-2 font-bold hover:bg-yellow-500" onClick={handleGetCep}>
                        Procurar
                    </button>
                </motion.div>
            </div>

            <div className="mt-12 bg-[#4E4D4C] w-[80vw]  md:w-[40vw] rounded-xl text-xl m-5 ">
                {cepData ? (
                    <motion.ul variants={slideInFromTop(0.1)} className="p-10">
                        <li className="flex justify-between items-center md:justify-around gap-2 md:gap-10 mb-10 bg-[#171717] rounded-xl p-5 text-white">
                            <p className="md:text-2xl text-lg">CEP: {cepData.cep}</p>
                            <ArrowBigRightDash />
                            <p className="md:text-2xl text-lg">{cepData.localidade}</p>

                        </li>
                        <div className="md:w-[18vw] grid grid-cols">
                            <motion.li variants={slideInFromLeft(0.3)}>
                                <h2 className="text-white text-lg md:text-2xl">Bairro:</h2>
                                <p className="bg-[#CCCBCB] text-base p-2 md:text-xl rounded">{cepData.bairro}</p>
                            </motion.li>
                            <motion.li variants={slideInFromRight(0.4)}>
                                <h2 className="text-white text-lg md:text-2xl">Logradouro:</h2>
                                <p className="bg-[#CCCBCB] text-base md:text-xl p-2 rounded">{cepData.logradouro}</p>
                            </motion.li>
                            <motion.li variants={slideInFromLeft(0.5)}>
                                <h2 className="text-white text-lg md:text-2xl">Estado:</h2>
                                <p className="bg-[#CCCBCB] text-base p-2  md:text-xl rounded w-[10vw] md:w-[5vw]">{cepData.uf}</p>
                            </motion.li>
                        </div>
                    </motion.ul>
                ) : (
                    <p></p>
                )}
            </div>
        </motion.section>
    );
}