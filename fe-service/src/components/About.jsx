import React from 'react';
import { topics } from '../config/topics';

export default function About() {
  return (
    <div className="max-w-5xl mx-auto py-12 px-4">
      <h2 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-400">
        About the Models & Datasets
      </h2>
      <p className="text-lg text-gray-600 dark:text-gray-300 text-center mb-12 max-w-3xl mx-auto">
        MediCare supports several machine learning models trained on public datasets. 
        Below is the information regarding the data used for each classification task.
      </p>

      <div className="space-y-8">
        {topics.map(topic => (
          <div key={topic.id} className="glass-panel p-6 rounded-2xl flex flex-col md:flex-row gap-6 items-start">
            <div className="w-full md:w-1/3">
              <h3 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">{topic.label}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wider font-semibold">
                ID: {topic.id}
              </p>
            </div>
            <div className="w-full md:w-2/3">
              <p className="text-gray-700 dark:text-gray-300 mb-4">{topic.description}</p>
              <h4 className="font-semibold mb-2">Required Features ({topic.fields.length}):</h4>
              <div className="flex flex-col gap-2">
                <ul className="list-disc pl-5 space-y-1">
                  {topic.fields.map(f => (
                    <li key={f.name} className="text-sm text-gray-700 dark:text-gray-300">
                      <strong className="font-semibold text-gray-900 dark:text-gray-100">{f.label}</strong>: {f.description}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
