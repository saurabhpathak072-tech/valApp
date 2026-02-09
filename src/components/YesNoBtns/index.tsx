"use client";
import { APP_CONSTANTS } from "@/constants";
import { motion } from "framer-motion";
import { useState } from "react";
import TeasingNoButton from "../NoBtn";

type StylishValentineButtonsProps = {
    onYes: () => void | Promise<void>;
    onNo: () => void | Promise<void>;
};

export default function StylishValentineButtons({ onYes, onNo }: StylishValentineButtonsProps) {

    const [isLoading, setIsLoading] = useState(false);

    const handleYes = async () => {
        if (isLoading) return;
        setIsLoading(true);
        try {
            await onYes();
        } finally {
            setIsLoading(false);
        }
    };

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
                    onClick={handleYes}
                    disabled={isLoading}
                    aria-busy={isLoading}
                    className="relative px-14 py-5 bg-gradient-to-b from-[#800000] to-[#4A0404] text-[#FFFBF2] font-serif text-3xl font-bold rounded-full border-2 border-[#D4AF37] shadow-[0_10px_20px_rgba(0,0,0,0.3)] tracking-widest flex items-center gap-3 overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {/* Shimmer Effect */}
                    <motion.div
                        animate={{ x: ['-100%', '200%'] }}
                        transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                    />
                    {isLoading ? (
                        <>
                            <span className="relative inline-flex items-center gap-3">
                                <span className="h-5 w-5 rounded-full border-2 border-[#D4AF37] border-t-transparent animate-spin" />
                                <span className="relative">Loading...</span>
                            </span>
                        </>
                    ) : (
                        <>
                            <span className="relative">{APP_CONSTANTS.HO}</span>
                            <span className="text-xl relative opacity-80">({APP_CONSTANTS.YES})</span>
                        </>
                    )}
                </motion.button>
            </div>

            {/* --- THE DISAPPEARING NO BUTTON --- */}
            <TeasingNoButton onNo={onNo} />

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