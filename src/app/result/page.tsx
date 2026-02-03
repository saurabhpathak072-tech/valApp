import dynamic from "next/dynamic";

const ResultClient = dynamic(() => import("@/app/result/ResultClient"));

export default function ResultPage() {
    return <ResultClient />;
}