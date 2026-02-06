"use client";
import { APP_CONSTANTS } from "@/constants";
import { motion } from "framer-motion";
import TeasingNoButton from "../NoBtn";

type StylishValentineButtonsProps = {
    onYes: () => void;
};

export default function StylishValentineButtons({ onYes }: StylishValentineButtonsProps) {



    return (
        <div className="flex flex-col sm:flex-row items-center justify-center gap-16 mt-12 relative min-h-[250px]">

            {/* --- THE ROYAL YES BUTTON --- */}
            <div className="relative group">
                {/* Animated Background Glow */}
                <motion.div
                    animate={{
                        scale: [1, 1.15, 1],
                        opacity: [0.4, 0.7, 0.4]
                    }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute -inset-1 bg-gradient-to-r from-[#D4AF37] via-[#FFD700] to-[#D4AF37] rounded-full blur-md group-hover:blur-xl transition-all"
                />

                <motion.button
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={onYes}
                    className="relative px-14 py-5 bg-gradient-to-b from-[#800000] to-[#4A0404] text-[#FFFBF2] font-serif text-3xl font-bold rounded-full border-2 border-[#D4AF37] shadow-[0_10px_20px_rgba(0,0,0,0.3)] tracking-widest flex items-center gap-3 overflow-hidden"
                >
                    {/* Shimmer Effect */}
                    <motion.div
                        animate={{ x: ['-100%', '200%'] }}
                        transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                    />
                    <span className="relative">{APP_CONSTANTS.HO}</span>
                    <span className="text-xl relative opacity-80">({APP_CONSTANTS.YES})</span>
                </motion.button>
            </div>

            {/* --- THE DISAPPEARING NO BUTTON --- */}
            <TeasingNoButton />

            {/* Small Instruction Text */}
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                className="absolute bottom-10 text-[#5C4033] text-xs uppercase tracking-tighter"
            >
                {APP_CONSTANTS.CHOOSE_WISELY} {APP_CONSTANTS.DEAR}...
            </motion.p>
        </div>
    );
}