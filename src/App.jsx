import React, { useState } from 'react';
import HomeScreen from './components/HomeScreen';
import CameraScreen from './components/CameraScreen';
import ReviewScreen from './components/ReviewScreen';
import ResultScreen from './components/ResultScreen';

function App() {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [photos, setPhotos] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [requiredPhotoCount, setRequiredPhotoCount] = useState(0);
  
  // State untuk melacak mode "retake" individual
  const [retakeIndex, setRetakeIndex] = useState(null);

  const handleSelectTemplate = (template, count) => {
    setSelectedTemplate(template);
    setRequiredPhotoCount(count);
    setPhotos([]); // Reset foto jika ada sisa dari sesi sebelumnya
    setCurrentScreen('camera');
  };

  const handleCapture = (capturedPhotos) => {
    setPhotos(capturedPhotos);
    setCurrentScreen('review');
  };

  const handleCaptureRetake = (newPhoto) => {
    const updatedPhotos = [...photos];
    updatedPhotos[retakeIndex] = newPhoto;
    setPhotos(updatedPhotos);
    setRetakeIndex(null);
    setCurrentScreen('review');
  };

  const handleRetakeRequest = (index) => {
    setRetakeIndex(index);
    setCurrentScreen('camera');
  };

  const handleFinalizeReview = (finalPhotos) => {
    setPhotos(finalPhotos); // Update dengan urutan foto yang sudah fix
    setCurrentScreen('result');
  };

  const handleReset = () => {
    setPhotos([]);
    setSelectedTemplate(null);
    setRequiredPhotoCount(0);
    setRetakeIndex(null);
    setCurrentScreen('home');
  };

  return (
    <div className="min-h-screen font-sans text-black bg-gray-100">
      {currentScreen === 'home' && (
        <HomeScreen onSelectTemplate={handleSelectTemplate} />
      )}
      
      {currentScreen === 'camera' && (
        <CameraScreen 
          requiredPhotoCount={requiredPhotoCount}
          retakeIndex={retakeIndex}
          onCapture={handleCapture}
          onCaptureRetake={handleCaptureRetake}
          onBack={handleReset} 
        />
      )}
      
      {currentScreen === 'review' && (
        <ReviewScreen 
          photos={photos} 
          selectedTemplate={selectedTemplate}
          onRetake={handleRetakeRequest}
          onNext={handleFinalizeReview} 
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
