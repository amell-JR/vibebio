import React from 'react';
import { Heart, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="text-center py-8 mt-12 border-t border-gray-200">
      <div className="flex items-center justify-center gap-2 mb-3">
        <span className="text-gray-600">Built with</span>
        <Heart className="w-4 h-4 text-red-500" />
        <span className="text-gray-600">using</span>
        <a
          href="https://bolt.new"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-purple-600 hover:text-purple-700 flex items-center gap-1 transition-colors duration-200"
        >
          Bolt
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
      <p className="text-sm text-gray-500">
        Share your bio and tag{' '}
        <a
          href="https://twitter.com/boltdotnew"
          target="_blank"
          rel="noopener noreferrer"
          className="text-purple-600 hover:text-purple-700 font-medium"
        >
          @boltdotnew
        </a>{' '}
        for a chance to win!
      </p>
    </footer>
  );
};