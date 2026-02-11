"use client";
import { APP_CONSTANTS } from "@/constants";
import { motion } from "framer-motion";
import Image from "next/image";
import styles from "./page.module.css";

const Message = () => {
    return (
        <div className={`min-h-screen bg-[#FFFBF2] flex flex-col items-center justify-center overflow-hidden p-6 relative ${styles['w-mobile-100-desktop-50']}`}>
            {/* Animated Background Lotus Petals */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(12)].map((_, i) => (
                    <motion.div
                        key={i}
                        animate={{
                            rotate: 360,
                            scale: [1, 1.1, 1],
                            opacity: [0.1, 0.2, 0.1]
                        }}
                        transition={{ duration: 20, repeat: Infinity, delay: i * 2 }}
                        className="absolute text-[20rem] text-[#D4AF37] opacity-10"
                        style={{ top: i * 20 + "%", left: i % 2 === 0 ? "-10%" : "70%" }}
                    >
                        {APP_CONSTANTS.LOTUS}
                    </motion.div>
                ))}
            </div>
            <Image src={'/assets/img/Moon.png'} alt="Moon" width={100} height={100} />
        </div>
    )
}

export default Message