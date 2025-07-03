import React from 'react';
import { BioCard } from './BioCard';
import { RefreshCw, Sparkles } from 'lucide-react';

interface BioResultsProps {
  bios: string[];
  onRegenerate: () => void;
  loading: boolean;
}

const SkeletonCard: React.FC = () => (
  <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 animate-pulse">
    <div className="mb-4">
      <div className="flex items-center gap-2 mb-3">
        <div className="h-6 w-16 bg-gray-200 rounded-full"></div>
        <div className="h-4 w-4 bg-gray-200 rounded"></div>
      </div>
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
    </div>
    
    <div className="flex gap-3">
      <div className="flex-1 h-12 bg-gray-200 rounded-lg"></div>
      <div className="flex-1 h-12 bg-gray-200 rounded-lg"></div>
    </div>
  </div>
);

export const BioResults: React.FC<BioResultsProps> = ({
  bios,
  onRegenerate,
  loading,
}) => {
  // Show skeleton loading state when loading and no bios yet
  if (loading && bios.length === 0) {
    return (
      <div className="mt-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-800">
            Generating Your Bios...
          </h3>
          <div className="flex items-center gap-2 px-4 py-2 text-purple-600 rounded-lg">
            <RefreshCw className="w-4 h-4 animate-spin" />
            <span className="text-sm">Working...</span>
          </div>
        </div>
        
        <div className="space-y-4">
          {[1, 2, 3].map((index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      </div>
    );
  }

  // Show empty state when no bios and not loading
  if (bios.length === 0 && !loading) {
    return (
      <div className="mt-8 text-center py-12">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-xl shadow-lg inline-block mb-4">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            Ready to Create Your Perfect Bio?
          </h3>
          <p className="text-gray-600">
            Choose your vibe above and hit generate to see your personalized bios!
          </p>
        </div>
      </div>
    );
  }

  // Show results when we have bios
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