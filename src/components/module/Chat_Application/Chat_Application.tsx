"use client";
import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import type { IMessage } from "@/types";

const Chat_Application = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    fetch("/message.json")
      .then((res) => res.json())
      .then((data) => setMessages(data));
  }, []);

  return (
    <div className="p-4 space-y-4">
      {messages.map((msg, idx) => {
        const isUser = msg.role === "user";
        return (
          <div
            key={msg.id}
            className={`flex ${
              isUser ? "justify-end" : "justify-start"
            } items-start gap-2`}
          >
            {/* Picture */}
            {!isUser && (
              <Image
                src={"/nafis.jpg"}
                alt={msg.role}
                width={40}
                height={40}
                className="rounded-full object-cover"
              />
            )}

            {/* Message Box */}
            <div>
              <div
                className={`w-full p-4 rounded-lg ${
                  isUser ? "bg-gray-200 text-black" : "bg-gray-900 text-white"
                }`}
              >
                <p>{msg.content}</p>
              </div>
              {/* Progress  Bar shadcn*/}
              <div
                className={`flex ${
                  isUser ? "justify-end" : "justify-start"
                } space-x-5 mt-3`}
              >
                {msg.emotions.map((e: any, i: number) => (
                  <div key={i} className="">
                    <div
                      className={`w-full text-xs mb-1 text-black dark:text-white`}
                    >
                      <span>{e.label}</span>
                      <span>{e.confidence}%</span>
                    </div>
                    <Progress
                      value={e.confidence}
                      className={`h-1 rounded-full ${
                        e.label === "Confidence"
                          ? "bg-green-500"
                          : e.label === "Enthusiasm"
                          ? "bg-yellow-500"
                          : "bg-purple-500"
                      }`}
                    />
                  </div>
                ))}
              </div>
            </div>
          {/* Pictures */}
            {isUser && (
              <Image
                src={"/file.svg"}
                alt={msg.role}
                width={40} 
                height={40} 
                className="rounded-full object-cover"
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Chat_Application;
