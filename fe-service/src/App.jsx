import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import TopicSelector from "./components/TopicSelector";
import FeatureForm from "./components/FeatureForm";
import ResultCard from "./components/ResultCard";
import { topics } from "./config/topics";
import { classify } from "./services/api";

function App() {
  const [theme, setTheme] = useState("dark");
  const [currentView, setCurrentView] = useState("home"); // home, about, classify

  const [selectedTopic, setSelectedTopic] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  // Initialize theme
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const handleSelectTopic = (topicId) => {
    setSelectedTopic(topicId);
    setResult(null);
    setError(null);
  };

  const handleSubmit = async (features) => {
    setLoading(true);
    setError(null);
    try {
      const data = await classify(selectedTopic, features);
      setResult(data);
    } catch (err) {
      setError(err.message || "An error occurred during classification");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setError(null);
    setSelectedTopic(null);
  };

  const renderClassifyView = () => (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {!result ? (
        <div className="max-w-5xl mx-auto">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Select a Classification Topic
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Choose the machine learning model you want to interact with.
            </p>
          </div>

          <TopicSelector
            selected={selectedTopic}
            onSelect={handleSelectTopic}
          />

          {selectedTopic && (
            <div className="mt-8">
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6">
                  <strong className="font-bold">Error! </strong>
                  <span className="block sm:inline">{error}</span>
                </div>
              )}
              <FeatureForm
                topic={selectedTopic}
                fields={
                  topics.find((t) => t.id === selectedTopic)?.fields || []
                }
                onSubmit={handleSubmit}
                loading={loading}
              />
            </div>
          )}
        </div>
      ) : (
        <ResultCard result={result} onReset={handleReset} />
      )}
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar
        currentView={currentView}
        setView={setCurrentView}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      <main className="flex-grow">
        {currentView === "home" && <Home setView={setCurrentView} />}
        {currentView === "about" && <About />}
        {currentView === "classify" && renderClassifyView()}
      </main>

      <footer className="py-6 text-center text-gray-500 text-sm mt-auto border-t dark:border-gray-800">
        &copy; {new Date().getFullYear()} MediCare App. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
