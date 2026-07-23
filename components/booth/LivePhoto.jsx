import React, { createContext, useContext, useEffect, useState } from 'react';

export const LivePhotoContext = createContext(null);

export const LivePhoto = ({ src, ...props }) => {
  const context = useContext(LivePhotoContext);
  const [videoUrl, setVideoUrl] = useState(null);

  useEffect(() => {
    if (!context || !context.photos || !context.videoClips) return;
    
    // Cari index foto ini di array photos
    const index = context.photos.indexOf(src);
    
    // Jika foto ditemukan dan ada video clip-nya
    if (index !== -1 && context.videoClips[index]) {
      const url = URL.createObjectURL(context.videoClips[index]);
      setVideoUrl(url);
      
      // Cleanup blob url
      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [src, context]);

  // Jika ada video URL (dan berada dalam konteks LivePhotoContext), render <video>
  if (videoUrl) {
    return (
      <video
        src={videoUrl}
        autoPlay
        loop
        muted
        playsInline
        {...props}
      />
    );
  }

  // Fallback ke <img> statis biasa jika tidak ada konteks atau klip video
  return <img src={src} {...props} />;
};
