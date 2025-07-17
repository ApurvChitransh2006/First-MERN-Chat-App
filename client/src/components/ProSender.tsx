import React, { useState } from "react";
import useChattStore from "../store/chatmessage";
import { IoSend } from "react-icons/io5";

const ProSender: React.FC = () => {
  const [msg, setMsg] = useState("");
  const { sendMessage, user, recieversDisplay } = useChattStore();

  const handleSend = () => {
    if (msg.trim() && recieversDisplay) {
      sendMessage({ sender: user, receiver: recieversDisplay, message: msg });
      setMsg("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="w-full px-4 py-3 bg-white/70 backdrop-blur-md flex items-center gap-3 border-t border-gray-300 rounded-b-xl">
      <input
        type="text"
        placeholder="Type your message..."
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-1 px-4 py-2 rounded-md border border-gray-300 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
      />
      <button
        onClick={handleSend}
        className="p-2 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white transition-all"
      >
        <IoSend className="text-xl" />
      </button>
    </div>
  );
};

export default ProSender;
