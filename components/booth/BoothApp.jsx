'use client';
import { useState } from 'react';
import CountPickerScreen from './CountPickerScreen';
import CameraScreen from './CameraScreen';
import StyleFilterScreen from './StyleFilterScreen';
import ResultScreen from './ResultScreen';

export default function BoothApp() {
  const [currentScreen, setCurrentScreen] = useState('count');
  const [photos, setPhotos] = useState([]);
  const [requiredPhotoCount, setRequiredPhotoCount] = useState(0);
  const [retakeIndex, setRetakeIndex] = useState(null);

  const [selectedTemplate, setSelectedTemplate] = useState(null); // 'newspaper' | 'photostrip'
  const [selectedThemeId, setSelectedThemeId] = useState(null);
  const [selectedFilterId, setSelectedFilterId] = useState('normal');
  const [bigPhotoIndex, setBigPhotoIndex] = useState(0);

  const handleSelectCount = (count) => {
    setRequiredPhotoCount(count);
    setPhotos([]);
    setSelectedTemplate(null);
    setSelectedThemeId(null);
    setSelectedFilterId('normal');
    setBigPhotoIndex(0);
    setCurrentScreen('camera');
  };

  const handleCapture = (capturedPhotos) => {
    setPhotos(capturedPhotos);
    setCurrentScreen('style');
  };

  const handleCaptureRetake = (newPhoto) => {
    const updatedPhotos = [...photos];
    updatedPhotos[retakeIndex] = newPhoto;
    setPhotos(updatedPhotos);
    setRetakeIndex(null);
    setCurrentScreen('style');
  };

  const handleRetakeRequest = (index) => {
    setRetakeIndex(index);
    setCurrentScreen('camera');
  };

  const handleSelectTheme = (template, themeId) => {
    setSelectedTemplate(template);
    setSelectedThemeId(themeId);
  };

  const handleFinalizeStyle = () => {
    setCurrentScreen('result');
  };

  const handleReset = () => {
    setPhotos([]);
    setRequiredPhotoCount(0);
    setRetakeIndex(null);
    setSelectedTemplate(null);
    setSelectedThemeId(null);
    setSelectedFilterId('normal');
    setBigPhotoIndex(0);
    setCurrentScreen('count');
  };

  const otherIndex = bigPhotoIndex === 0 ? 1 : 0;
  const orderedPhotosForResult = selectedTemplate === 'newspaper'
    ? [photos[bigPhotoIndex], photos[otherIndex]]
    : photos;

  return (
    <div className='min-h-screen bg-cream grain'>
      {currentScreen === 'count' && (
        <CountPickerScreen onSelectCount={handleSelectCount} />
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
      {currentScreen === 'style' && (
        <StyleFilterScreen
          photos={photos}
          requiredPhotoCount={requiredPhotoCount}
          selectedTemplate={selectedTemplate}
          selectedThemeId={selectedThemeId}
          selectedFilterId={selectedFilterId}
          bigPhotoIndex={bigPhotoIndex}
          onSelectTheme={handleSelectTheme}
          onSelectFilter={setSelectedFilterId}
          onSelectBigPhoto={setBigPhotoIndex}
          onRetake={handleRetakeRequest}
          onNext={handleFinalizeStyle}
          onBack={handleReset}
        />
      )}
      {currentScreen === 'result' && (
        <ResultScreen
          template={selectedTemplate}
          stripThemeId={selectedTemplate === 'photostrip' ? selectedThemeId : null}
          newspaperThemeId={selectedTemplate === 'newspaper' ? selectedThemeId : null}
          photos={orderedPhotosForResult}
          selectedFilterId={selectedFilterId}
          onReset={handleReset}
        />
      )}
    </div>
  );
}
