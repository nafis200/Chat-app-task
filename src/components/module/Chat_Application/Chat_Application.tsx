"use client";
import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
const Chat_Application = () => {
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    fetch("/message.json")
      .then((res) => res.json())
      .then((data) => setMessages(data));
  }, []);

  return (
    <div className="p-4 space-y-4">
      {messages.map((msg) => {
        const isUser = msg.role === "user";
        return (
          <div
            key={msg.id}
            className={`flex ${
              isUser ? "justify-end" : "justify-start"
            } items-start gap-2`}
          >
            {/* Avatar */}
            {!isUser && (
              <img
                src={msg.avatar || "/bot-avatar.png"}
                alt={msg.role}
                className="w-10 h-10 rounded-full object-cover"
              />
            )}

            {/* Message Box */}
            <div
              className={`max-w-[70%] p-4 rounded-lg ${
                isUser ? "bg-gray-200 text-black" : "bg-gray-900 text-white"
              }`}
            >
              <p>{msg.content}</p>

              {/* Emotions Progress - Single line */}
              <div className="mt-2 flex gap-2 items-center">
                {msg.emotions.map((e: any, i: number) => (
                  <div key={i} className="flex-1">
                    <div className="flex items-center justify-between text-xs mb-1 text-gray-300">
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

            {isUser && (
              <img
                src={msg.avatar || "/user-avatar.png"}
                alt={msg.role}
                className="w-10 h-10 rounded-full object-cover"
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Chat_Application;
