import React from 'react';
import { Sparkles } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="text-center mb-8 sm:mb-12">
      <div className="flex items-center justify-center gap-3 mb-4">
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-xl shadow-lg">
          <Sparkles className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          VibeBio
        </h1>
      </div>
      <p className="text-lg sm:text-xl text-gray-600 font-medium">
        Your vibe. Your bio. Instantly.
      </p>
      <p className="text-sm sm:text-base text-gray-500 mt-2">
        AI-powered social media bios that match your personality
      </p>
    </header>
  );
};