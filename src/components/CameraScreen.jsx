import React from 'react';

const CameraScreen = ({ onCapture, onBack }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <h2 className="text-2xl font-playfair mb-4">Camera Screen</h2>
      <div className="w-full max-w-md aspect-[3/4] bg-gray-200 flex items-center justify-center mb-6">
        <p className="text-gray-500">Camera Feed Placeholder</p>
      </div>
      <div className="flex gap-4">
        <button 
          onClick={onBack}
          className="px-6 py-2 border border-gray-300 rounded hover:bg-gray-100 font-garamond"
        >
          Kembali
        </button>
        <button 
          onClick={() => onCapture(['photo1.jpg', 'photo2.jpg', 'photo3.jpg'])}
          className="px-6 py-2 bg-black text-white rounded hover:bg-gray-800 font-garamond"
        >
          Ambil Foto
        </button>
      </div>
    </div>
  );
};

export default CameraScreen;
