'use client';

import React, { useState, useEffect } from 'react';
import { Sun, Moon, History, Zap } from 'lucide-react';
import { Button } from '../components/Button';
import { ExcuseCard } from '../components/ExcuseCard';
import { HistoryModal } from '../components/HistoryModal';
import { EXCUSES } from '../constants';
import { Excuse, HistoryItem } from '../types';

// Helper for local storage
const useLocalStorage = <T,>(key: string, initialValue: T): [T, (value: T) => void] => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      if (typeof window === 'undefined') return initialValue;
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
};

export default function Home() {
  // Theme State
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  
  // App Logic State
  const [currentExcuse, setCurrentExcuse] = useState<Excuse | null>(null);
  const [history, setHistory] = useLocalStorage<HistoryItem[]>('eaas-history', []);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  // Initialize Theme
  useEffect(() => {
    // Check local storage or system preference
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
    setTheme(initialTheme);
  }, []);

  // Apply Theme Effect
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const generateExcuse = () => {
    setIsGenerating(true);
    
    // Artificial delay for "processing" feel
    setTimeout(() => {
      // Avoid immediate duplicate if possible
      let availableExcuses = EXCUSES;
      if (currentExcuse) {
        availableExcuses = EXCUSES.filter(e => e.id !== currentExcuse.id);
      }
      
      const randomExcuse = availableExcuses[Math.floor(Math.random() * availableExcuses.length)];
      setCurrentExcuse(randomExcuse);

      // Add to history
      const newHistoryItem: HistoryItem = { ...randomExcuse, timestamp: Date.now() };
      setHistory([newHistoryItem, ...history].slice(0, 5)); // Keep last 5
      
      setIsGenerating(false);
    }, 400);
  };

  const clearHistory = () => {
    setHistory([]);
  };

  return (
    <div className="min-h-screen flex flex-col text-gray-900 dark:text-gray-100 font-sans transition-colors duration-300">
      
      {/* Header */}
      <header className="w-full p-6 flex justify-between items-center z-10">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 p-2 rounded-lg text-white">
            <Zap className="w-5 h-5 fill-current" />
          </div>
          <span className="font-bold text-xl tracking-tight hidden sm:inline">Excuse as a Service</span>
          <span className="font-bold text-xl tracking-tight sm:hidden">EaaS</span>
        </div>
        <Button variant="icon" onClick={toggleTheme} aria-label="Toggle theme">
          {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </Button>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 relative">
        
        {/* Hero Section */}
        <div className="w-full max-w-4xl mx-auto flex flex-col items-center gap-12 text-center">
          
          {!currentExcuse && (
             <div className="space-y-6 animate-[fadeIn_0.8s_ease-out]">
              <div className="inline-block p-4 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 mb-4">
                <span className="text-5xl">🖥️💥</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                Your WFH Excuse <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-400 dark:to-purple-400">Awaits</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Generate a quirky, believable, and tech-flavored excuse to skip the office in one click.
              </p>
             </div>
          )}

          {/* Action Area */}
          <div className="w-full flex flex-col items-center gap-8 min-h-[300px] justify-center">
            {currentExcuse ? (
              <ExcuseCard excuse={currentExcuse} />
            ) : null}

            <Button 
              size="xl" 
              onClick={generateExcuse} 
              isLoading={isGenerating}
              className={`
                 transform transition-all duration-200 
                 ${!currentExcuse ? 'animate-pulse-fast' : ''}
                 ${currentExcuse ? 'mt-8' : 'mt-0'}
                 shadow-blue-500/50 hover:shadow-blue-500/70
                 text-lg md:text-xl min-w-[200px]
              `}
            >
              {currentExcuse ? 'Generate Another' : 'Generate Excuse'}
            </Button>
          </div>

        </div>
      </main>

      {/* Footer / Controls */}
      <footer className="w-full p-6 flex justify-center pb-8">
        <Button 
          variant="ghost" 
          onClick={() => setIsHistoryOpen(true)}
          className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
        >
          <History className="w-4 h-4 mr-2" />
          View History ({history.length})
        </Button>
      </footer>

      {/* History Modal */}
      <HistoryModal 
        isOpen={isHistoryOpen} 
        onClose={() => setIsHistoryOpen(false)} 
        history={history}
        onClear={clearHistory}
      />
    </div>
  );
}