import React from 'react';
import { ShieldCheck, Zap, Activity } from 'lucide-react';

export default function Home({ setView }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <div className="max-w-3xl space-y-8">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-400 pb-2">
          Advanced Health Classification
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          MediCare leverages machine learning to predict various health conditions and perform data classification tasks with high accuracy.
        </p>
        
        <div className="flex justify-center gap-4 pt-8">
          <button 
            onClick={() => setView('classify')}
            className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
          >
            Start Classification
          </button>
          <button 
            onClick={() => setView('about')}
            className="px-8 py-4 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 rounded-full font-bold text-lg shadow-md hover:shadow-lg transition-all"
          >
            Learn More
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mt-24 max-w-5xl w-full text-left">
        <div className="glass-panel p-6 rounded-2xl">
          <ShieldCheck className="h-10 w-10 text-teal-500 mb-4" />
          <h3 className="text-xl font-bold mb-2">Accurate Predictions</h3>
          <p className="text-gray-600 dark:text-gray-400">Trained on robust datasets ensuring high reliability for preliminary screening.</p>
        </div>
        <div className="glass-panel p-6 rounded-2xl">
          <Zap className="h-10 w-10 text-yellow-500 mb-4" />
          <h3 className="text-xl font-bold mb-2">Fast Inference</h3>
          <p className="text-gray-600 dark:text-gray-400">Microservice architecture guarantees lightning fast response times.</p>
        </div>
        <div className="glass-panel p-6 rounded-2xl">
          <Activity className="h-10 w-10 text-red-500 mb-4" />
          <h3 className="text-xl font-bold mb-2">Multiple Conditions</h3>
          <p className="text-gray-600 dark:text-gray-400">Support for Diabetes, Heart Disease, Breast Cancer, Obesity, and more.</p>
        </div>
      </div>
    </div>
  );
}
