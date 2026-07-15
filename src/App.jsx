import React, { useState } from 'react';
import HomeScreen from './components/HomeScreen';
import CameraScreen from './components/CameraScreen';
import PreviewScreen from './components/PreviewScreen';
import ResultScreen from './components/ResultScreen';

function App() {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [photos, setPhotos] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  // Navigation handlers
  const handleStart = () => {
    setCurrentScreen('camera');
  };

  const handleCapture = (capturedPhotos) => {
    setPhotos(capturedPhotos);
    setCurrentScreen('preview');
  };

  const handleSelectTemplate = (template) => {
    setSelectedTemplate(template);
    setCurrentScreen('result');
  };

  const handleReset = () => {
    setPhotos([]);
    setSelectedTemplate(null);
    setCurrentScreen('home');
  };

  return (
    <div className="min-h-screen font-sans text-black">
      {currentScreen === 'home' && (
        <HomeScreen onStart={handleStart} />
      )}
      
      {currentScreen === 'camera' && (
        <CameraScreen 
          onCapture={handleCapture} 
          onBack={() => setCurrentScreen('home')} 
        />
      )}
      
      {currentScreen === 'preview' && (
        <PreviewScreen 
          photos={photos} 
          onSelectTemplate={handleSelectTemplate} 
          onBack={() => setCurrentScreen('camera')} 
        />
      )}
      
      {currentScreen === 'result' && (
        <ResultScreen 
          template={selectedTemplate} 
          photos={photos} 
          onReset={handleReset} 
        />
      )}
    </div>
  );
}

export default App;
