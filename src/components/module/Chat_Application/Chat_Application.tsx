"use client";
import { useEffect, useState } from "react";
const Chat_Application = () => {
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    fetch("/message.json")
      .then((res) => res.json())
      .then((data) => setMessages(data));
  }, []);

  return (
    <div className="p-4">
      {messages.map((msg) => (
        <div key={msg.id} className="mb-4">
          <p>
            <strong>{msg.role}:</strong> {msg.content}
          </p>
          <ul>
            {msg.emotions.map((e: any, i: number) => (
              <li key={i}>
                {e.label} ({e.confidence}%)
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Chat_Application;
