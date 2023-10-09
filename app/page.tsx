import ChatbotCard from "@/components/chatbot-card";

export default function Chat() {
  return (
    <div className="p-2 md:p-32 md:pb-6 flex items-center justify-center h-screen">
      <div className="w-full lg:w-4/5">
        <ChatbotCard />
      </div>
    </div>
  );
}
