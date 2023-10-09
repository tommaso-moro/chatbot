"use client";

import { useChat } from "ai/react";
import { useEffect, useRef } from "react";
import ChatbotCard from "@/components/chatbot-card";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  const cardContentRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom of the cardContent element when messages change
    if (cardContentRef.current) {
      //@ts-ignore
      cardContentRef.current.scrollTop = cardContentRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="p-2 md:p-32 flex items-center justify-center h-screen">
      <div className="w-full lg:w-4/5">
        <ChatbotCard />
      </div>
    </div>
  );
}
