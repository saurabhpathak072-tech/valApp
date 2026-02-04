"use client";

import confetti from "canvas-confetti";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

export default function ResultClient() {
    const router = useRouter();
    const hasFiredConfetti = useRef(false);
    const accepted = sessionStorage.getItem("valentineAccepted") === "1";

    useEffect(() => {
        if (!accepted) {
            router.replace("/");
        }
    }, [accepted, router]);

    useEffect(() => {
        if (!accepted) return;
        if (hasFiredConfetti.current) return;

        hasFiredConfetti.current = true;
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ["#FF9933", "#FFFFFF", "#138808", "#800000"],
        });
    }, [accepted]);

    if (!accepted) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
        >
            <h1 className="text-5xl font-bold text-[#800000] mb-4">Uttam! ❤️</h1>
            <p className="text-2xl text-[#D4AF37]">
                I knew you&apos;d say yes! Get ready for some Puran Poli.
            </p>
            <p className="mt-4 text-[#D4AF37] font-semibold">I promise to protect your smile forever. ❤️</p>
            <p className="text-[#800000] font-semibold">I’ll cherish you forever. Happy Valentine&apos;s Day!</p>
            <div className="mt-8 text-6xl">💍</div>
        </motion.div>
    );
}
