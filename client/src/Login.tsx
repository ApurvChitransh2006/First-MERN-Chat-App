import React, { useState } from 'react';
import useChattStore from './store/chatmessage';
import { useNavigate } from 'react-router';

const Login: React.FC = () => {
  const [name, setName] = useState<string>('');
  const { login } = useChattStore();
  const navigate = useNavigate();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(name);
    setName('');
    navigate('/msgdash');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-emerald-500 to-emerald-700 px-3">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl px-8 py-10">
        <form onSubmit={onSubmit} className="flex flex-col gap-6">
          <h2 className="text-4xl font-bold text-center text-emerald-800">Chatify</h2>

          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-gray-700 font-medium">
              Your Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Deep"
              required
              className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all text-gray-800 text-sm bg-white/90"
            />
          </div>

          <button
            type="submit"
            className="py-2 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white font-medium transition-all text-sm shadow-md"
          >
            Enter Chat
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
