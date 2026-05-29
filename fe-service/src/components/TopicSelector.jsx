import React from 'react';
import { topics } from '../config/topics';

export default function TopicSelector({ selected, onSelect }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
      {topics.map(topic => (
        <button
          key={topic.id}
          onClick={() => onSelect(topic.id)}
          className={`text-left p-6 rounded-2xl transition-all duration-300 border-2 
            ${selected === topic.id 
              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 shadow-md transform -translate-y-1' 
              : 'border-transparent glass-panel hover:border-blue-300 dark:hover:border-blue-700'
            }`}
        >
          <h3 className={`text-xl font-bold mb-2 ${selected === topic.id ? 'text-blue-700 dark:text-blue-300' : ''}`}>
            {topic.label}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">{topic.description}</p>
        </button>
      ))}
    </div>
  );
}
