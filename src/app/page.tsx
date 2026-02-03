"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ValentineRequest() {
  const router = useRouter();
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });

  const handleNoHover = () => {
    // Randomly move the "No" button when she tries to click it
    const randomX = Math.random() * 300 - 150;
    const randomY = Math.random() * 300 - 150;
    setNoButtonPos({ x: randomX, y: randomY });
  };

  const handleYes = () => {
    // Store a short-lived flag for the next route (no URL params).
    sessionStorage.setItem("valentineAccepted", "1");
    router.push("/result");
  };

  return (
    <>
      {/* Traditional Border Motif could go here */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        {/* <h2 className="text-[#800000] text-2xl font-serif mb-2 italic">Priye,</h2> */}
        <h1 className="text-4xl md:text-6xl font-bold text-[#D4AF37] mb-8 drop-shadow-sm">
          Will you be my Valentine?
        </h1>
        <p className="text-[#800000] font-semibold mb-10 text-lg">
          {/* "Sakhya re, tujya vina karme na..." <br /> */}
          Life is incomplete without you
        </p>

        <div className="flex flex-col md:flex-row gap-6 items-center justify-center">
          {/* YES BUTTON */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleYes}
            className="bg-[#E65100] hover:bg-[#BF360C] text-white px-10 py-4 rounded-full text-2xl font-bold shadow-lg transition-colors"
          >
            Ho (Yes!)
          </motion.button>

          {/* NO BUTTON - The Evasive One */}
          <motion.button
            animate={{ x: noButtonPos.x, y: noButtonPos.y }}
            onMouseEnter={handleNoHover}
            className="bg-gray-300 text-gray-700 px-8 py-3 rounded-full text-xl cursor-not-allowed"
          >
            Nahi (No)
          </motion.button>
        </div>
      </motion.div>
    </>
  );
}