import React from 'react';
import { X, Clock, Trash2, Copy } from 'lucide-react';
import { HistoryItem } from '../types';

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  history: HistoryItem[];
  onClear: () => void;
}

export const HistoryModal: React.FC<HistoryModalProps> = ({ isOpen, onClose, history, onClear }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col max-h-[80vh] animate-[scaleIn_0.2s_ease-out]">
        <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
            <Clock className="w-5 h-5 mr-2 text-blue-500" />
            Recent Alibis
          </h2>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto p-6 space-y-4">
          {history.length === 0 ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <p>No excuses generated yet.</p>
              <p className="text-sm mt-1">Your record is clean... for now.</p>
            </div>
          ) : (
            history.map((item) => (
              <div 
                key={`${item.id}-${item.timestamp}`} 
                className="group relative p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50 hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors border border-transparent hover:border-blue-100 dark:hover:border-gray-600"
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl select-none">{item.icon}</span>
                  <div className="flex-1">
                    <p className="text-sm text-gray-800 dark:text-gray-200 font-medium leading-relaxed">
                      {item.text}
                    </p>
                    <div className="flex items-center mt-2 text-xs text-gray-400">
                       <span className="capitalize">{item.category}</span>
                       <span className="mx-1">•</span>
                       <span>{new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => navigator.clipboard.writeText(item.text)}
                    className="opacity-0 group-hover:opacity-100 p-1.5 rounded-md hover:bg-white dark:hover:bg-gray-600 text-gray-400 hover:text-blue-500 transition-all shadow-sm"
                    title="Copy"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {history.length > 0 && (
            <div className="p-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-700 flex justify-end">
                <button 
                    onClick={onClear}
                    className="text-sm text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 font-medium flex items-center px-3 py-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Clear History
                </button>
            </div>
        )}
      </div>
    </div>
  );
};