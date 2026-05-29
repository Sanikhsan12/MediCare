import React from 'react';
import { Sun, Moon, Activity } from 'lucide-react';

export default function Navbar({ currentView, setView, theme, toggleTheme }) {
  return (
    <nav className="sticky top-0 z-50 glass-panel shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setView('home')}>
            <Activity className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            <span className="font-bold text-xl tracking-tight">MediCare</span>
          </div>
          
          <div className="hidden md:flex space-x-8">
            <button 
              onClick={() => setView('home')} 
              className={`font-medium transition-colors ${currentView === 'home' ? 'text-blue-600 dark:text-blue-400' : 'hover:text-blue-500'}`}
            >
              Home
            </button>
            <button 
              onClick={() => setView('about')} 
              className={`font-medium transition-colors ${currentView === 'about' ? 'text-blue-600 dark:text-blue-400' : 'hover:text-blue-500'}`}
            >
              About
            </button>
            <button 
              onClick={() => setView('classify')} 
              className={`font-medium transition-colors ${currentView === 'classify' ? 'text-blue-600 dark:text-blue-400' : 'hover:text-blue-500'}`}
            >
              Classification
            </button>
          </div>

          <div className="flex items-center">
            <button 
              onClick={toggleTheme} 
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle Dark Mode"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
