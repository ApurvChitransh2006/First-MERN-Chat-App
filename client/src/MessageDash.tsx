import React from 'react';
import ProHeader from './components/ProHeader';
import ProMessage from './components/ProMessage';
import ProSender from './components/ProSender';
import ProfileBook from './components/ProfileBook';
import useChattStore from './store/chatmessage';

const MessageDash: React.FC = () => {
  const { logout, recieversDisplay } = useChattStore();
  const isDesktop = window.innerWidth >= 768;

  const showProfile = isDesktop || !recieversDisplay;
  const showChat = isDesktop || !!recieversDisplay;

  return (
    <div className="flex flex-col h-screen w-screen bg-gradient-to-br from-emerald-500 to-emerald-700 p-4 gap-4 overflow-hidden">
      <div className="flex justify-end w-full mb-2">
        <button
          onClick={logout}
          className="px-4 py-2 text-sm font-semibold bg-white/90 text-gray-800 rounded-md shadow-md hover:bg-gray-200 transition-all"
        >
          Logout
        </button>
      </div>
      <div className="flex-1 flex flex-col md:flex-row gap-4 overflow-hidden">
        {showProfile && (
          <div className="w-full md:w-1/4 h-full">
            <ProfileBook />
          </div>
        )}
        {showChat && (
          <div className="w-full md:w-3/4 h-full bg-white/80 rounded-xl shadow-xl flex flex-col backdrop-blur-lg">
            <ProHeader />
            <div className="flex-1 overflow-auto">
              <ProMessage />
            </div>
            <ProSender />
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageDash;
