import React from 'react';
import { topics } from '../config/topics';

export default function ResultCard({ result, onReset }) {
  if (!result) return null;

  // Find mapping from topics config
  const topicConfig = topics.find((t) => t.id === result.topic);
  const rawPrediction = result.prediction?.toString();
  const humanReadableLabel = topicConfig?.resultMapping?.[rawPrediction] || rawPrediction;

  // Determine color based on prediction
  const isPositiveOrDisease = 
    humanReadableLabel.toLowerCase().includes('positif') || 
    humanReadableLabel.toLowerCase().includes('disease') ||
    humanReadableLabel.toLowerCase().includes('malignant') ||
    humanReadableLabel.toLowerCase().includes('ganas') ||
    humanReadableLabel.toLowerCase().includes('palsu') ||
    humanReadableLabel.toLowerCase().includes('forged') ||
    (rawPrediction === '1' && topicConfig?.id !== 'obesity'); // For generic 1

  const isWarning = humanReadableLabel.toLowerCase().includes('overweight') || humanReadableLabel.toLowerCase().includes('obesity');

  let colorClass = 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30';
  let gaugeColor = 'bg-green-500';
  
  if (isPositiveOrDisease) {
    colorClass = 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/30';
    gaugeColor = 'bg-red-500';
  } else if (isWarning) {
    colorClass = 'text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/30';
    gaugeColor = 'bg-yellow-500';
  }

  // Visualization gauge (progress bar for the dominant probability)
  let maxProb = 0;
  if (result.probability) {
    maxProb = Math.max(...Object.values(result.probability));
  }

  return (
    <div className="glass-panel p-8 rounded-2xl max-w-2xl mx-auto mt-8 text-center animate-fade-in-up">
      <h3 className="text-2xl font-bold mb-2">Classification Result</h3>
      <p className="text-gray-500 mb-6 font-medium">{topicConfig?.label || result.topic}</p>
      
      <div className={`py-6 px-4 rounded-xl mb-8 shadow-sm ${colorClass}`}>
        <span className="block text-sm uppercase tracking-wider font-semibold mb-2 opacity-80">Prediction</span>
        <span className="text-3xl font-extrabold px-2">{humanReadableLabel}</span>
        
        {/* Simple visual gauge for the prediction */}
        {maxProb > 0 && (
          <div className="mt-6 mx-auto w-3/4 max-w-md">
            <div className="flex justify-between text-xs font-semibold mb-1 opacity-80">
              <span>Confidence</span>
              <span>{(maxProb * 100).toFixed(1)}%</span>
            </div>
            <div className="w-full bg-white/40 dark:bg-black/30 rounded-full h-3 shadow-inner overflow-hidden">
              <div 
                className={`h-full ${gaugeColor} transition-all duration-1000 ease-out`} 
                style={{ width: `${maxProb * 100}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>

      {result.probability && Object.keys(result.probability).length > 0 && (
        <div className="text-left mb-8 bg-gray-50 dark:bg-gray-800/50 p-5 rounded-xl border border-gray-100 dark:border-gray-700">
          <h4 className="font-semibold mb-4 text-gray-700 dark:text-gray-300 border-b pb-2 dark:border-gray-700">Probability Details:</h4>
          <div className="space-y-4">
            {Object.entries(result.probability).map(([key, val]) => (
              <div key={key}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-gray-600 dark:text-gray-400">
                    {topicConfig?.resultMapping?.[key] || key}
                  </span>
                  <span className="font-semibold">{(val * 100).toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full transition-all duration-1000 ease-out opacity-80" 
                    style={{ width: `${val * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {result.inference_time_ms && (
        <p className="text-xs text-gray-400 mb-8 font-mono bg-gray-100 dark:bg-gray-800 inline-block px-3 py-1 rounded">
          ⏱ Inference time: {result.inference_time_ms.toFixed(2)} ms
        </p>
      )}

      <div>
        <button
          onClick={onReset}
          className="px-8 py-3 bg-gradient-to-r from-gray-800 to-black hover:from-black hover:to-gray-800 dark:from-gray-200 dark:to-white dark:hover:from-white dark:hover:to-gray-200 dark:text-gray-900 text-white font-bold rounded-lg transition-all shadow-md transform hover:scale-105 active:scale-95"
        >
          Try Another Classification
        </button>
      </div>
    </div>
  );
}
