import React from "react";
import useChattStore from "../store/chatmessage";
import { CgProfile } from "react-icons/cg";

const ProfileBook: React.FC = () => {
  const { onlineUsers, setRecieversDisplay } = useChattStore();

  return (
    <div className="w-full h-full bg-white/80 backdrop-blur-lg rounded-xl p-4 overflow-y-auto shadow-md">
      <h2 className="text-center text-xl font-bold text-emerald-800 mb-4">
        Online Users
      </h2>
      {onlineUsers.length === 0 ? (
        <p className="text-center text-gray-600">No users online.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {onlineUsers.map((person) => (
            <button
              key={person}
              data-name={person}
              onClick={(e) =>
                setRecieversDisplay(e.currentTarget.getAttribute("data-name") || "")
              }
              className="w-full flex items-center gap-3 p-3 rounded-lg bg-white/90 hover:bg-emerald-200 transition-all text-gray-800"
            >
              <CgProfile className="text-2xl text-emerald-600" />
              <span className="text-lg">{person}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfileBook;
