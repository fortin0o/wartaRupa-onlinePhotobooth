import React, { useState } from 'react';
import HomeScreen from './components/HomeScreen';
import CameraScreen from './components/CameraScreen';
import PreviewScreen from './components/PreviewScreen';
import ResultScreen from './components/ResultScreen';

function App() {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [photos, setPhotos] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [requiredPhotoCount, setRequiredPhotoCount] = useState(0);

  // Navigation handlers
  const handleSelectTemplate = (template, count) => {
    setSelectedTemplate(template);
    setRequiredPhotoCount(count);
    setPhotos([]); // Reset foto jika ada sisa dari sesi sebelumnya
    setCurrentScreen('camera');
  };

  const handleCapture = (capturedPhotos) => {
    setPhotos(capturedPhotos);
    setCurrentScreen('preview');
  };

  const handleReset = () => {
    setPhotos([]);
    setSelectedTemplate(null);
    setRequiredPhotoCount(0);
    setCurrentScreen('home');
  };

  return (
    <div className="min-h-screen font-sans text-black bg-gray-100">
      {currentScreen === 'home' && (
        <HomeScreen onSelectTemplate={handleSelectTemplate} />
      )}
      
      {currentScreen === 'camera' && (
        <CameraScreen 
          onCapture={handleCapture} 
          onBack={handleReset} 
          // Nanti di Tahap berikutnya (CameraScreen) kita bisa passing requiredPhotoCount ke sini
        />
      )}
      
      {currentScreen === 'preview' && (
        <PreviewScreen 
          photos={photos} 
          onSelectTemplate={(template) => {
            // Untuk sementara mempertahankan kompatibilitas dengan PreviewScreen lama
            // Nanti file ini akan dirombak jadi ReviewScreen
            setSelectedTemplate(template);
            setCurrentScreen('result');
          }} 
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
