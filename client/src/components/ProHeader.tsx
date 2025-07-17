import React from 'react';
import { CgProfile } from 'react-icons/cg';
import { RxCross2 } from 'react-icons/rx';
import useChattStore from '../store/chatmessage';

const ProHeader: React.FC = () => {
  const { recieversDisplay, setRecieversDisplay } = useChattStore();

  return (
    <div className="w-full h-14 px-4 bg-white/70 backdrop-blur-md flex items-center justify-between border-b border-gray-300 rounded-t-xl">
      {recieversDisplay ? (
        <>
          <div className="flex items-center gap-2 text-lg font-semibold text-gray-800">
            <CgProfile className="text-2xl text-emerald-700" />
            <span>{recieversDisplay}</span>
          </div>
          <button
            onClick={() => setRecieversDisplay('')}
            className="text-gray-700 hover:text-red-500 transition-all"
          >
            <RxCross2 className="text-2xl" />
          </button>
        </>
      ) : (
        <span className="text-gray-600 text-md">Select a user to start chatting</span>
      )}
    </div>
  );
};

export default ProHeader;
