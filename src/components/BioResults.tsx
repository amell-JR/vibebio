import React from 'react';
import { BioCard } from './BioCard';
import { RefreshCw } from 'lucide-react';

interface BioResultsProps {
  bios: string[];
  onRegenerate: () => void;
  loading: boolean;
}

export const BioResults: React.FC<BioResultsProps> = ({
  bios,
  onRegenerate,
  loading,
}) => {
  if (bios.length === 0) return null;

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-800">
          Your Generated Bios
        </h3>
        <button
          onClick={onRegenerate}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 text-purple-600 hover:text-purple-700 hover:bg-purple-50 rounded-lg transition-colors duration-200 disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          Regenerate
        </button>
      </div>
      
      <div className="space-y-4">
        {bios.map((bio, index) => (
          <BioCard key={`${bio}-${index}`} bio={bio} index={index} />
        ))}
      </div>
    </div>
  );
};