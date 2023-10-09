import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const LINKS = {
  GITHUB: "https://github.com/tommaso-moro/chatbot",
  MISTRAL_7B: "https://huggingface.co/mistralai/Mistral-7B-Instruct-v0.1",
  VERCEL: "https://vercel.com",
  TMORO: "https://www.tmoro.xyz",
};
