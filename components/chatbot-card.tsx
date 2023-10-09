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
import StyledLink from "./styled-link";
import Link from "next/link";
import { LINKS } from "@/lib/utils";

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
        <CardTitle className="flex items-center justify-between w-100 text-lg font-mono">
          Chatbot
          <div className="flex flex-row items-center">
            <Button variant="ghost" size="sm">
              <Link href={LINKS.GITHUB} target="_blank">
                <Icons.github className="h-5 w-5 font-black" />
              </Link>
            </Button>

            <ThemeToggle />
          </div>
        </CardTitle>
        <CardDescription>
          A simple interface to chat with{" "}
          <StyledLink href={LINKS.MISTRAL_7B} text="Mistral 7B" newTab={true} />
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
            <div className="flex flex-col h-full items-center justify-center text-muted-foreground font-normal">
              <Icons.braces className="h-5.5 w-5.5 mb-6" />
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
