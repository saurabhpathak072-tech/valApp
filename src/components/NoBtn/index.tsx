"use client";
import { NoPhrases } from "@/constants";
import { getNoButtonText } from "@/utils/phrases";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import { useState } from "react";

type TeasingNoButtonProps = {
    onNo: (text: string) => Promise<void>;
};

const TeasingNoButton: React.FC<TeasingNoButtonProps> = ({ onNo }) => {
    const [noPos, setNoPos] = useState({ x: 0, y: 0 });
    const controls = useAnimation();
    const [noCount, setNoCount] = useState(0);
    const [isLoading] = useState(false);

    const moveNo = async () => {
        // 1. First, trigger a quick "shake" animation to tease her
        await controls.start({
            x: [0, -5, 5, -5, 5, 0],
            transition: { duration: 0.2, type: "tween" }
        });

        // 2. Then, snap to a random location
        const randomX = Math.random() * 150 - 75;
        const randomY = Math.random() * 150 - 75;

        setNoPos({ x: randomX, y: randomY });
        return Promise.resolve(); // Ensure this function returns a promise
    };

    const handleNoClick = async (noText: string) => {
        setNoCount((count) => count + 1);
        return Promise.all([onNo(noText), moveNo()]);
    };

    return (
        <motion.button
            animate={{
                x: noPos.x,
                y: noPos.y,
                rotate: [0, -5, 5, 0], // Subtle constant tilt
            }}
            hidden={noCount > NoPhrases.length - 1}
            disabled={isLoading}
            aria-busy={isLoading}
            onHoverStart={() =>
                isLoading
                    ? undefined
                    : controls.start({
                        x: [0, -2, 2, 0],
                        transition: { repeat: Infinity, duration: 0.1, type: "tween" },
                    })
            }
            onHoverEnd={() => controls.stop()}
            onMouseEnter={() => {
                if (isLoading) return;
                moveNo();
            }}
            onClick={() => handleNoClick(getNoButtonText(noCount))}
            className="px-8 py-3 border bg-[#FFFBF2] border-[#800000]/30 text-[#800000]/50 font-serif italic text-lg rounded-full backdrop-blur-sm shadow-inner relative overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed"
            transition={{
                x: {
                    type: "spring",
                    stiffness: 500, // Very fast snap
                    damping: 15, // High bounce
                },
                y: {
                    type: "spring",
                    stiffness: 500,
                    damping: 15,
                },
                rotate: {
                    type: "tween",
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                },
            }}
        >

            <AnimatePresence mode="wait" initial={false}>
                {isLoading ? (
                    <motion.span
                        key="loading"
                        initial={{ opacity: 0, y: 6, filter: "blur(2px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, y: -6, filter: "blur(2px)" }}
                        transition={{ duration: 0.18 }}
                        className="block"
                    >
                        <span className="sr-only">Loading</span>
                        <motion.span
                            aria-hidden
                            className="inline-block text-xl not-italic"
                            animate={{
                                y: [0, -3, 0],
                                rotate: [0, -10, 10, 0],
                                scale: [1, 1.12, 1]
                            }}
                            transition={{ repeat: Infinity, duration: 0.9, ease: "easeInOut" }}
                        >
                            🙈
                        </motion.span>
                    </motion.span>
                ) : (
                    <motion.span
                        key="idle"
                        initial={{ opacity: 0, y: 6, filter: "blur(2px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, y: -6, filter: "blur(2px)" }}
                        transition={{ duration: 0.18 }}
                        className="block"
                    >
                        <motion.span animate={controls} className="block">
                            {getNoButtonText(noCount)}
                        </motion.span>
                    </motion.span>
                )}
            </AnimatePresence>


            <motion.div
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
                className="absolute top-1/2 left-0 h-[1px] bg-[#800000]/20"
            />
        </motion.button>
    );
}

export default TeasingNoButton;