import React from 'react';
import { User } from 'lucide-react';

interface KeywordInputProps {
  keywords: string;
  onKeywordsChange: (keywords: string) => void;
}

export const KeywordInput: React.FC<KeywordInputProps> = ({
  keywords,
  onKeywordsChange,
}) => {
  return (
    <div className="mb-6">
      <label className="block text-lg font-semibold text-gray-800 mb-3">
        Tell us about yourself (optional)
      </label>
      <div className="relative">
        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          value={keywords}
          onChange={(e) => onKeywordsChange(e.target.value)}
          placeholder="e.g., student, designer, loves coffee, based in NYC"
          className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors duration-200 text-gray-700"
        />
      </div>
      <p className="text-sm text-gray-500 mt-2">
        Add keywords to personalize your bio
      </p>
    </div>
  );
};