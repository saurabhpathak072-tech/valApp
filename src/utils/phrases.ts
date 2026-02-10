import { NoPhrases } from "@/constants";

export const getNoButtonText = (noCount: number) => {
  return NoPhrases[Math.min(noCount, NoPhrases.length - 1)];
};
