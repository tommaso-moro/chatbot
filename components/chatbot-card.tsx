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
import { useEffect, useRef } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Icons } from "@/components/icons";
import Link from "next/link";

export default function ChatbotCard() {
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
    <Card className=" w-full h-11/12">
      <CardHeader>
        <CardTitle className="flex items-center justify-between w-100 text-lg">
          Chatbot
          <div className="flex flex-row items-center">
            <Button variant="ghost" size="sm">
              <Icons.github className="h-5 w-5 font-black" />
            </Button>

            <ThemeToggle />
          </div>
        </CardTitle>
        <CardDescription>
          A simple interface to chat with Mistral 7B. Made by{" "}
          <Link
            href="https://www.tmoro.xyz"
            target="_blank"
            className="underline underline-offset-4 decoration-slate-300 hover:decoration-[#6b7280]"
          >
            tmoro
          </Link>
        </CardDescription>
      </CardHeader>
      <Separator />
      <CardContent
        className="h-[70vh] overflow-auto"
        ref={cardContentRef} // Add the ref to CardContent
      >
        <div className="p-6 w-full h-full">
          {messages.length > 0 ? (
            messages.map((m) => (
              <div key={m.id} className="grid grid-cols-12 mt-2 space-x-4">
                <div className=" col-span-1">
                  <span className=" font-semibold ">
                    {m.role === "user" ? "You: " : "AI: "}
                  </span>
                </div>

                <div className=" col-span-11">{m.content}</div>
              </div>
            ))
          ) : (
            <div className="flex flex-col h-full items-center justify-center text-muted-foreground">
              <Icons.braces className="h-6 w-6 mb-2" />
              No messages yet. Send a message to start a conversation!
            </div>
          )}
          <div className="h-4"></div>
        </div>
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
              <Icons.send className="mr-2 h-4 w-4" /> Send
            </Button>
          </div>
        </form>
      </CardFooter>
    </Card>
  );
}
