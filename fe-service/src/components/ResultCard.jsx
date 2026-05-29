import React from 'react';

export default function ResultCard({ result, onReset }) {
  if (!result) return null;

  // Determine color based on prediction
  const isPositiveOrDisease = 
    result.prediction?.toString().toLowerCase().includes('positive') || 
    result.prediction?.toString().toLowerCase().includes('disease') ||
    result.prediction?.toString().toLowerCase().includes('malignant') ||
    result.prediction?.toString().toLowerCase().includes('fake') ||
    result.prediction?.toString() === '1';

  const isWarning = result.prediction?.toString().toLowerCase().includes('overweight') || result.prediction?.toString().toLowerCase().includes('obesity');

  let colorClass = 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30';
  if (isPositiveOrDisease) colorClass = 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/30';
  if (isWarning) colorClass = 'text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/30';

  return (
    <div className="glass-panel p-8 rounded-2xl max-w-2xl mx-auto mt-8 text-center animate-fade-in-up">
      <h3 className="text-2xl font-bold mb-2">Classification Result</h3>
      <p className="text-gray-500 mb-6">Topic: {result.topic}</p>
      
      <div className={`py-6 px-4 rounded-xl mb-8 ${colorClass}`}>
        <span className="block text-sm uppercase tracking-wider font-semibold mb-1 opacity-80">Prediction</span>
        <span className="text-4xl font-extrabold">{result.prediction}</span>
      </div>

      {result.probability && Object.keys(result.probability).length > 0 && (
        <div className="text-left mb-8">
          <h4 className="font-semibold mb-4 text-gray-700 dark:text-gray-300">Confidence / Probability:</h4>
          <div className="space-y-4">
            {Object.entries(result.probability).map(([key, val]) => (
              <div key={key}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{key}</span>
                  <span className="font-semibold">{(val * 100).toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div 
                    className="bg-blue-600 h-2.5 rounded-full transition-all duration-1000 ease-out" 
                    style={{ width: `${val * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {result.inference_time_ms && (
        <p className="text-xs text-gray-400 mb-8">
          Inference time: {result.inference_time_ms.toFixed(2)} ms
        </p>
      )}

      <button
        onClick={onReset}
        className="px-8 py-3 bg-gray-800 hover:bg-gray-900 dark:bg-gray-200 dark:hover:bg-gray-300 dark:text-gray-900 text-white font-bold rounded-lg transition-colors"
      >
        Try Another Classification
      </button>
    </div>
  );
}
