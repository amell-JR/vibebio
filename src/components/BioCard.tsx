import React, { useState } from 'react';
import { Copy, Share, Check, Heart } from 'lucide-react';

interface BioCardProps {
  bio: string;
  index: number;
}

export const BioCard: React.FC<BioCardProps> = ({ bio, index }) => {
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(bio);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleShare = () => {
    const tweetText = `Here's my new bio made with #VibeBio ⚡️ by @boltdotnew:\n\n"${bio}"\n\nTry it 👉`;
    const url = encodeURIComponent(window.location.href);
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}&url=${url}`;
    
    window.open(twitterUrl, '_blank', 'width=550,height=420');
    setShared(true);
    setTimeout(() => setShared(false), 3000);
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 hover:shadow-lg transition-shadow duration-200">
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-semibold text-purple-600 bg-purple-100 px-2 py-1 rounded-full">
            Bio #{index + 1}
          </span>
          <Heart className="w-4 h-4 text-gray-300" />
        </div>
        <p className="text-gray-800 text-lg leading-relaxed font-medium">
          "{bio}"
        </p>
      </div>
      
      <div className="flex gap-3">
        <button
          onClick={handleCopy}
          className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
            copied
              ? 'bg-green-100 text-green-700 border border-green-200'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
          }`}
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
        
        <button
          onClick={handleShare}
          className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
            shared
              ? 'bg-blue-100 text-blue-700 border border-blue-200'
              : 'bg-purple-100 text-purple-700 hover:bg-purple-200 border border-purple-200'
          }`}
        >
          <Share className="w-4 h-4" />
          {shared ? 'Shared!' : 'Share on X'}
        </button>
      </div>
    </div>
  );
};