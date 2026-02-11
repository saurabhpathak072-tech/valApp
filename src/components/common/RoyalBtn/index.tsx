
import { APP_CONSTANTS } from "@/constants";
import { AnimatePresence, motion } from "framer-motion";
import { FC } from "react";

interface RoyalBtnProps {
    onClick: () => Promise<void> | void;
    scale?: number;
    isLoading?: boolean;
    children: React.ReactNode;
}
const RoyalBtn: FC<RoyalBtnProps> = ({ onClick, scale = 1, isLoading = false, children }) => {
    return (
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
                animate={{ scale }}
                whileHover={{ scale: scale * 1.1, y: -5 }}
                whileTap={{ scale: scale * 0.9 }}
                onClick={onClick}
                disabled={isLoading}
                aria-busy={isLoading}
                className="relative px-14 py-5 bg-gradient-to-b from-[#800000] to-[#4A0404] text-[#FFFBF2] font-serif text-3xl font-bold rounded-full border-2 border-[#D4AF37] shadow-[0_10px_20px_rgba(0,0,0,0.3)] tracking-widest flex items-center gap-3 overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed"
            >
                {/* Shimmer Effect */}
                <motion.div
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{ repeat: Infinity, duration: isLoading ? 1.2 : 3, ease: "linear" }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                />

                <AnimatePresence mode="wait" initial={false}>
                    {isLoading ? (
                        <motion.span
                            key="loading"
                            initial={{ opacity: 0, y: 8, filter: "blur(2px)" }}
                            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            exit={{ opacity: 0, y: -8, filter: "blur(2px)" }}
                            transition={{ duration: 0.18 }}
                            className="relative inline-flex items-center gap-3"
                        >
                            <motion.span
                                aria-hidden
                                className="h-5 w-5 rounded-full border-2 border-[#D4AF37] border-t-transparent"
                                animate={{ rotate: 360, scale: [1, 1.15, 1] }}
                                transition={{ repeat: Infinity, duration: 0.9, ease: "linear" }}
                            />

                            <span className="sr-only">Loading</span>
                            <motion.span
                                aria-hidden
                                className="relative text-3xl leading-none select-none"
                                animate={{
                                    y: [0, -3, 0],
                                    rotate: [0, -8, 8, 0],
                                    scale: [1, 1.15, 1]
                                }}
                                transition={{ repeat: Infinity, duration: 0.9, ease: "easeInOut" }}
                            >
                                {APP_CONSTANTS.SMILING_FACE}
                            </motion.span>
                        </motion.span>
                    ) : (
                        <motion.span
                            key="idle"
                            initial={{ opacity: 0, y: 8, filter: "blur(2px)" }}
                            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            exit={{ opacity: 0, y: -8, filter: "blur(2px)" }}
                            transition={{ duration: 0.18 }}
                            className="relative inline-flex items-center gap-3"
                        >
                            {/* <span className="relative">{APP_CONSTANTS.HO}</span>
                            <span className="text-xl relative opacity-80">({APP_CONSTANTS.YES})</span> */}
                            {children}
                        </motion.span>
                    )}
                </AnimatePresence>
            </motion.button>
        </div>
    )
}

export default RoyalBtn