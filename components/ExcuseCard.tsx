import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { Excuse, HistoryItem } from '../types';
import { Button } from './Button';

interface ExcuseCardProps {
  excuse: Excuse | HistoryItem | null;
}

export const ExcuseCard: React.FC<ExcuseCardProps> = ({ excuse }) => {
  const [copied, setCopied] = useState(false);

  if (!excuse) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(excuse.text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy!', err);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto transform transition-all duration-500 animate-[fadeIn_0.5s_ease-out]">
      <div className="relative group bg-white dark:bg-gray-800 rounded-2xl shadow-xl dark:shadow-2xl dark:shadow-blue-900/10 border border-gray-100 dark:border-gray-700 p-8 md:p-12 overflow-hidden">
        
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl dark:bg-blue-400/10 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl dark:bg-purple-400/10 pointer-events-none"></div>

        <div className="flex flex-col items-center text-center space-y-6 relative z-10">
          <div className="text-6xl md:text-7xl animate-bounce-short">
            {excuse.icon}
          </div>
          
          <div className="space-y-4">
            <p className="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white leading-tight font-mono tracking-tight">
              "{excuse.text}"
            </p>
            <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400">
              Category: {excuse.category}
            </div>
          </div>

          <div className="flex items-center justify-center pt-6 w-full">
            <Button 
              variant="secondary" 
              onClick={handleCopy}
              className="w-full max-w-[200px]" 
              title="Copy to clipboard"
            >
              {copied ? <Check className="w-4 h-4 mr-2 text-green-500" /> : <Copy className="w-4 h-4 mr-2" />}
              {copied ? 'Copied' : 'Copy'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};