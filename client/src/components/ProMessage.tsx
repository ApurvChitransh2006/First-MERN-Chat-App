import React, { useEffect, useRef } from "react";
import useChattStore from "../store/chatmessage";

const ProMessage: React.FC = () => {
  const { messages, user, recieversDisplay } = useChattStore();
  const bottomRef = useRef<HTMLDivElement>(null); // ref to scroll into view

  const chat = messages.filter(
    (msg) =>
      (msg.sender === user && msg.receiver === recieversDisplay) ||
      (msg.receiver === user && msg.sender === recieversDisplay)
  );

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  return (
    <div className="p-4 flex flex-col gap-3 overflow-y-auto text-sm sm:text-base h-full">
      {chat.map((msg, index) => (
        <div
          key={index}
          className={`max-w-[75%] px-4 py-2 rounded-xl shadow-md ${
            msg.sender === user
              ? "self-end bg-emerald-600 text-white"
              : "self-start bg-white text-gray-900"
          }`}
        >
          {msg.message}
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  );
};

export default ProMessage;
