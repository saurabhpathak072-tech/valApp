"use client";
import { motion, useAnimation } from "framer-motion";
import { useState } from "react";

export default function TeasingNoButton() {
    const [noPos, setNoPos] = useState({ x: 0, y: 0 });
    const controls = useAnimation();

    const moveNo = async () => {
        // 1. First, trigger a quick "shake" animation to tease her
        await controls.start({
            x: [0, -5, 5, -5, 5, 0],
            transition: { duration: 0.2, type: "tween" }
        });

        // 2. Then, snap to a random location
        const randomX = Math.random() * 300 - 150;
        const randomY = Math.random() * 300 - 150;

        setNoPos({ x: randomX, y: randomY });
    };

    return (
        <motion.button
            animate={{
                x: noPos.x,
                y: noPos.y,
                rotate: [0, -5, 5, 0], // Subtle constant tilt
            }}
            // This "controls" handles the vibration on hover
            onHoverStart={() =>
                controls.start({
                    x: [0, -2, 2, 0],
                    transition: { repeat: Infinity, duration: 0.1, type: "tween" },
                })
            }
            onHoverEnd={() => controls.stop()}
            onMouseEnter={moveNo}
            onClick={moveNo} // For mobile users
            className="px-8 py-3 bg-white/20 border border-[#800000]/30 text-[#800000]/50 font-serif italic text-lg rounded-full backdrop-blur-sm shadow-inner relative overflow-hidden"
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
            {/* A "Ghost" effect that trails behind the button */}
            <motion.span
                animate={controls}
                className="block"
            >
                नाही (No)
            </motion.span>

            {/* Decorative strike-through that appears on hover */}
            <motion.div
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
                className="absolute top-1/2 left-0 h-[1px] bg-[#800000]/20"
            />
        </motion.button>
    );
}