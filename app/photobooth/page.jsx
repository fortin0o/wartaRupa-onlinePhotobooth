"use client";

import React, { useState } from 'react';
import HomeScreen from '../../components/photobooth/HomeScreen';
import CameraScreen from '../../components/photobooth/CameraScreen';
import ReviewScreen from '../../components/photobooth/ReviewScreen';
import ResultScreen from '../../components/photobooth/ResultScreen';

export default function PhotoboothPage() {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [photos, setPhotos] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [requiredPhotoCount, setRequiredPhotoCount] = useState(0);
  
  const [retakeIndex, setRetakeIndex] = useState(null);
  const [selectedFilterId, setSelectedFilterId] = useState('normal');
  const [selectedStripTheme, setSelectedStripTheme] = useState(null);
  const [selectedNewspaperTheme, setSelectedNewspaperTheme] = useState(null);

  const handleSelectTemplate = (template, count, themeId = null) => {
    setSelectedTemplate(template);
    setRequiredPhotoCount(count);
    // themeId is mutually exclusive: one will be set, the other cleared
    if (template === 'photostrip') {
      setSelectedStripTheme(themeId);
      setSelectedNewspaperTheme(null);
    } else if (template === 'newspaper') {
      setSelectedNewspaperTheme(themeId);
      setSelectedStripTheme(null);
    }
    setPhotos([]);
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

  const handleFinalizeReview = (finalPhotos, filterId) => {
    setPhotos(finalPhotos); 
    setSelectedFilterId(filterId); 
    setCurrentScreen('result');
  };

  const handleReset = () => {
    setPhotos([]);
    setSelectedTemplate(null);
    setRequiredPhotoCount(0);
    setRetakeIndex(null);
    setSelectedFilterId('normal');
    setSelectedStripTheme(null);
    setSelectedNewspaperTheme(null);
    setCurrentScreen('home');
  };

  return (
    <div className="min-h-screen font-sans text-black bg-gray-100">
      {currentScreen === 'home' && (
        <HomeScreen onSelectTemplate={handleSelectTemplate} />
      )}
      
      {currentScreen === 'camera' && (
        <CameraScreen 
          template={selectedTemplate}
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
          stripThemeId={selectedStripTheme}
          newspaperThemeId={selectedNewspaperTheme}
          photos={photos} 
          selectedFilterId={selectedFilterId}
          onReset={handleReset} 
        />
      )}
    </div>
  );
}
