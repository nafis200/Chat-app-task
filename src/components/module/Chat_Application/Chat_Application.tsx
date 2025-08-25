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
  {messages.map((msg, index) => {
    const isUser = msg.role === "user";
    return (
      <div
        key={msg.id}
        className={`flex ${isUser ? "justify-end" : "justify-start"} items-start gap-2`}
      >
        {/* Circular Avatar */}
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
            isUser ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-900"
          }`}
        >
          <p className="font-semibold mb-2">{msg.role}</p>
          <p>{msg.content}</p>

          {/* Emotions Progress */}
          <div className="mt-2 space-y-1">
            {msg.emotions.map((e: any, i: number) => (
              <div key={i}>
                <div className="flex justify-between text-xs mb-1">
                  <span>{e.label}</span>
                  <span>{e.confidence}%</span>
                </div>
                <Progress
                  value={e.confidence}
                  className={`h-2 rounded-full ${
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

        {/* User avatar */}
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
