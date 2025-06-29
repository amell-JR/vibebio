import React from 'react';
import { Vibe } from '../types';
import { vibes } from '../data/vibes';

interface VibeSelectorProps {
  selectedVibe: string;
  onVibeSelect: (vibeId: string) => void;
}

export const VibeSelector: React.FC<VibeSelectorProps> = ({
  selectedVibe,
  onVibeSelect,
}) => {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Choose Your Vibe
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {vibes.map((vibe) => (
          <button
            key={vibe.id}
            onClick={() => onVibeSelect(vibe.id)}
            className={`p-4 rounded-xl border-2 transition-all duration-200 hover:scale-105 ${
              selectedVibe === vibe.id
                ? 'border-purple-500 bg-purple-50 shadow-md'
                : 'border-gray-200 bg-white hover:border-purple-300 hover:shadow-sm'
            }`}
          >
            <div className="text-2xl mb-2">{vibe.emoji}</div>
            <div className="text-sm font-medium text-gray-800">{vibe.name}</div>
            <div className="text-xs text-gray-500 mt-1">{vibe.description}</div>
          </button>
        ))}
      </div>
    </div>
  );
};