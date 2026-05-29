import React, { useState, useEffect } from 'react';

export default function FeatureForm({ topic, fields, onSubmit, loading }) {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    // Reset form when topic changes
    setFormData({});
  }, [topic]);

  const handleChange = (e, fieldType) => {
    const { name, value } = e.target;
    let parsedValue = value;
    
    if (fieldType === 'number') {
      parsedValue = value === '' ? '' : Number(value);
    }
    
    setFormData(prev => ({ ...prev, [name]: parsedValue }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="glass-panel p-8 rounded-2xl animate-fade-in-up">
      <h3 className="text-2xl font-bold mb-6 border-b pb-4 dark:border-gray-700">Enter Details</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {fields.map(field => (
          <div key={field.name} className="flex flex-col">
            <label className="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300" htmlFor={field.name}>
              {field.label}
              {field.description && <span className="block text-xs font-normal opacity-80 mt-1">{field.description}</span>}
            </label>
            
            {field.type === 'select' ? (
              <select
                id={field.name}
                name={field.name}
                value={formData[field.name] !== undefined ? formData[field.name] : ''}
                onChange={(e) => handleChange(e, field.type)}
                required
                className="p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none transition-shadow"
              >
                <option value="" disabled>Select an option</option>
                {field.options.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            ) : (
              <input
                type="number"
                id={field.name}
                name={field.name}
                min={field.min}
                max={field.max}
                step={field.step || "any"}
                value={formData[field.name] !== undefined ? formData[field.name] : ''}
                onChange={(e) => handleChange(e, field.type)}
                required
                className="p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none transition-shadow"
              />
            )}
          </div>
        ))}
      </div>
      
      <div className="mt-8 flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="px-8 py-3 bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
        >
          {loading ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </span>
          ) : 'Run Classification'}
        </button>
      </div>
    </form>
  );
}
