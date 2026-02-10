"use client";
import StylishValentineButtons from "@/components/YesNoBtns";
import { APP_CONSTANTS, NAME } from "@/constants";
import api from "@/lib/axios";
import confetti from "canvas-confetti";
import { AnimatePresence, easeOut, motion, type Variants } from "framer-motion";
import { useState } from "react";

export default function ElegantValentine() {
  const [isAccepted, setIsAccepted] = useState(false);


  const handleYes = async (): Promise<void> => {
    try {
      await api.post("/response", {
        Yes: true,
        No: false,
      });

      setIsAccepted(true);
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#D4AF37", "#800000"],
      });
    } catch (err) {
      console.error("Error recording response:", err);
    }
  };

  const handleNo = async (): Promise<void> => {
    try {
      await api.post("/response", {
        Yes: false,
        No: true,
      });
    } catch (err) {
      console.error("Error recording response:", err);
    }
  }

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
    <div className="min-h-screen bg-[#FFFBF2] flex flex-col items-center justify-center overflow-hidden p-6 relative">
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
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}