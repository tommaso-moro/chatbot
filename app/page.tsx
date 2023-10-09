"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useChat } from "ai/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { useEffect, useRef } from "react";

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
    <div className=" p-32 flex items-center justify-center h-screen">
      <Card className=" w-4/5 ">
        <CardHeader>
          <CardTitle>Chat</CardTitle>
          <CardDescription>
            A simple interface to chat with your favorite LLM
          </CardDescription>
        </CardHeader>
        <Separator />
        <CardContent
          className="h-[800px] overflow-auto"
          ref={cardContentRef} // Add the ref to CardContent
        >
          {messages.map((m) => (
            <div key={m.id} className="grid grid-cols-12 mt-2">
              <div className=" col-span-1">
                <span className="font-semibold">
                  {m.role === "user" ? "You: " : "AI: "}
                </span>
              </div>

              <div className=" col-span-11">{m.content}</div>
            </div>
          ))}
        </CardContent>
        <Separator />
        <CardFooter className="pt-6">
          <form onSubmit={handleSubmit} className="w-full">
            <div className="flex flex-row space-x-2">
              <Input
                type="message"
                placeholder="Type your message..."
                value={input}
                onChange={handleInputChange}
              />
              <Button type="submit">
                <PaperPlaneIcon className="mr-2 h-4 w-4" /> Send
              </Button>
            </div>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
