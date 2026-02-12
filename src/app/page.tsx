"use client";
import RoyalBtn from "@/components/common/RoyalBtn";
import Modal from "@/components/Modal";
import StylishValentineButtons from "@/components/YesNoBtns";
import { APP_CONSTANTS, audioSrc, message, NAME } from "@/constants";
import api from "@/lib/axios";
import confetti from "canvas-confetti";
import { AnimatePresence, easeOut, motion, type Variants } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import styles from "./page.module.css";

export default function ElegantValentine() {
  const [isAccepted, setIsAccepted] = useState(false);
  const [isYesModalOpen, setIsYesModalOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const handleYes = async (text: string): Promise<void> => {
    try {
      await api.post("/response", {
        Yes: true,
        No: false,
        yesText: text,
      });

      setIsAccepted(true);
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#D4AF37", "#800000"],
      });
      return;
    } catch (err) {
      console.error("Error recording response:", err);
    }
  };

  useEffect(() => {
    if (isYesModalOpen && audioRef.current) {
      audioRef.current.currentTime = 30; // Start from the beginning
      audioRef.current.loop = true; // Ensure it's paused before setting volume
      audioRef.current.volume = 0.3; // Set to a soft background level
      audioRef.current.play().catch(error => {
        console.log("Autoplay prevented, but will play on next click:", error);
      });
    }
  }, [isYesModalOpen]);

  const handleModal = () => {
    setIsYesModalOpen((isYes) => !isYes);
  }

  const handleNo = async (text: string): Promise<void> => {
    try {
      await api.post("/response", {
        Yes: false,
        No: true,
        NoText: text,
      });
      return;
    } catch (err) {
      console.error("Error recording response:", err);
    }
  };

  const containerVars: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.8, delayChildren: 0.5 },
    },
  };

  const itemVars: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: easeOut } },
  };

  return (
    <div className={`min-h-screen bg-[#FFFBF2] flex flex-col items-center justify-center overflow-hidden p-6 relative ${styles['w-mobile-100-desktop-50']}`}>
      <Modal
        open={isYesModalOpen}
        onClose={() => setIsYesModalOpen(false)}
        title={APP_CONSTANTS.ITS_A_YES}
      >
        <motion.div className={styles.modalMessage}>
          <audio ref={audioRef} loop>
            {
              audioSrc.map((src, index) => (
                <source key={index} src={src} type="audio/mpeg" />
              ))
            }
            Your browser does not support the audio element.
          </audio>
          <motion.div className="text-[#fff] flex flex-col gap-4 text-xl italic leading-relaxed bg-black/50 p-6 rounded-lg">
            {message.map((msg, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 + index * 0.5 }}
              >
                {msg}
              </motion.p>
            ))}
          </motion.div>
        </motion.div>

      </Modal>

      {/* Animated Background Lotus Petals */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
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

      <AnimatePresence mode="wait">
        {!isAccepted ? (
          <motion.div
            variants={containerVars}
            initial="hidden"
            animate="visible"
            className="z-10 text-center max-w-2xl"
          >
            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
              className="text-[#800000] font-serif italic text-xl mb-2"
            >
              {APP_CONSTANTS.DEAR} {NAME.SAYALI},
            </motion.p>

            <motion.div variants={itemVars} className="mb-8">
              <h1 className="text-5xl md:text-7xl font-bold text-[#800000] font-serif leading-tight">
                {APP_CONSTANTS.WILL_YOU_BE_MY} <br />
                <span className="text-[#D4AF37] italic">{APP_CONSTANTS.VALENTINE}?</span>
              </h1>
            </motion.div>

            <motion.div variants={itemVars} className="space-y-4 mb-12">
              <p className="text-[#800000] text-2xl font-serif italic">
                {APP_CONSTANTS.LIFE_IS_INCOMPATIBLE}
              </p>
              <p className="text-[#5C4033] text-lg font-light tracking-wide max-w-md mx-auto">
                {APP_CONSTANTS.IN_THE_STORYOF_MY_LIFE_YOU_ARE_MOST_BEAUTIFUL_CHAPTER}
                {APP_CONSTANTS.I_PROMISE_TO_BE_THE_REASON_BEHIND_YOUR_SMILE}
              </p>
              <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
                <Sparkles className="absolute top-10 left-10 text-yellow-400 opacity-50 w-8 h-8 animate-pulse" />
                <Sparkles className="absolute bottom-20 right-20 text-yellow-400 opacity-50 w-12 h-12 animate-pulse" />
              </div>
              <div className="h-[1px] w-32 bg-[#D4AF37] mx-auto" />
            </motion.div>

            <StylishValentineButtons onNo={handleNo} onYes={handleYes} />
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="z-10 text-center bg-white p-12 border-[16px] border-double border-[#D4AF37] shadow-2xl"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <h2 className="text-[#800000] text-4xl font-serif mb-6">{APP_CONSTANTS.ITS_A_YES}</h2>
              <p className="text-[#5C4033] text-2xl italic leading-loose">
                &quot;{APP_CONSTANTS.YOUR_PRESENCE_IS_MY_PEACE_AND_YOUR_SMILE_IS_MY_HOME}<br /> {APP_CONSTANTS.I_WILL_CHERISH_YOU_WITH_A_LOVE_THAT_IS_AS_TIMELESS_AS_THE_ANCIENT_VERSES_AND_AS_DEEP_AS_THE_SILENT_SEA} <br />
                <span className="text-[#800000] font-bold">{APP_CONSTANTS.I_PROMISE}</span>&quot;
              </p>
              <motion.div
                className="mt-8 text-6xl"
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                {APP_CONSTANTS.HEART}
                {APP_CONSTANTS.RING}
              </motion.div>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-16 mt-12 relative ">
                <RoyalBtn onClick={handleModal} >
                  <span className="text-xl relative opacity-80">{APP_CONSTANTS.SPECIAL_MESSAGE_FOR_YOU}</span>
                </RoyalBtn>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}