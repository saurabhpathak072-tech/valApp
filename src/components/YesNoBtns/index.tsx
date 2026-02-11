"use client";
import { APP_CONSTANTS } from "@/constants";
import { useState } from "react";
import TeasingNoButton from "../NoBtn";
import RoyalBtn from "../common/RoyalBtn";

type StylishValentineButtonsProps = {
    onYes: (text: string) => Promise<void>;
    onNo: (text: string) => Promise<void>;
};

export default function StylishValentineButtons({ onYes, onNo }: StylishValentineButtonsProps) {

    const [isLoading, setIsLoading] = useState(false);
    const [yesScale, setYesScale] = useState(1);

    const handleYes = async () => {
        if (isLoading) return;
        setIsLoading(true);
        try {
            await onYes(APP_CONSTANTS.YES);
        } finally {
            setIsLoading(false);
        }
    };

    const handleNo = async (text: string) => {
        setYesScale((current) => Math.min(current + 0.12, 2.2));
        await onNo(text);
    };

    return (
        <div className="flex flex-col sm:flex-row items-center justify-center gap-16 mt-12 relative min-h-[250px]">
            {/* --- THE ROYAL YES BUTTON --- */}
            <RoyalBtn onClick={handleYes} scale={yesScale} isLoading={isLoading}>
                <span className="relative">{APP_CONSTANTS.HO}</span>
                <span className="text-xl relative opacity-80">({APP_CONSTANTS.YES})</span>
            </RoyalBtn>

            {/* --- THE DISAPPEARING NO BUTTON --- */}
            <TeasingNoButton onNo={handleNo} />
        </div>
    );
}