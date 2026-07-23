import React, { useRef, useState, useEffect } from 'react';

const CropModal = ({ photoUrl, onClose, onSave }) => {
  const canvasRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);

  const [isDragging, setIsDragging] = useState(false);
  const [lastPos, setLastPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.onload = () => {
      // Set canvas size once based on original image
      if (canvas.width !== img.width) {
        canvas.width = img.width;
        canvas.height = img.height;
      }
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      const scaledWidth = img.width * scale;
      const scaledHeight = img.height * scale;
      const x = (canvas.width - scaledWidth) / 2 + offsetX;
      const y = (canvas.height - scaledHeight) / 2 + offsetY;
      
      ctx.drawImage(img, x, y, scaledWidth, scaledHeight);
    };
    img.src = photoUrl;
  }, [photoUrl, scale, offsetX, offsetY]);

  const handlePointerDown = (e) => {
    setIsDragging(true);
    setLastPos({ x: e.clientX || (e.touches && e.touches[0].clientX), y: e.clientY || (e.touches && e.touches[0].clientY) });
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const clientY = e.clientY || (e.touches && e.touches[0].clientY);
    const dx = clientX - lastPos.x;
    const dy = clientY - lastPos.y;
    // Sensitivitas geser
    setOffsetX(prev => prev + dx * (2 / scale)); 
    setOffsetY(prev => prev + dy * (2 / scale));
    setLastPos({ x: clientX, y: clientY });
  };

  const handlePointerUp = () => setIsDragging(false);

  const handleSave = () => {
    if (canvasRef.current) {
      onSave(canvasRef.current.toDataURL('image/jpeg', 0.9));
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4">
      <div className="bg-cream border-4 border-ink w-full max-w-lg shadow-hard flex flex-col">
        <div className="p-4 border-b-2 border-ink flex justify-between items-center bg-ink text-cream">
          <h3 className="font-display font-bold text-xl uppercase tracking-wider">Sesuaikan Foto</h3>
          <button onClick={onClose} className="font-ui font-bold hover:text-accent transition-colors">TUTUP</button>
        </div>
        
        <div className="p-4 flex flex-col items-center">
          <p className="font-body text-sm mb-4 text-center">Geser foto untuk memindahkan posisi. Gunakan tombol di bawah untuk zoom.</p>
          
          <div 
            className="relative w-full aspect-[4/3] border-2 border-ink bg-gray-200 overflow-hidden cursor-move touch-none"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
          >
            <canvas ref={canvasRef} className="w-full h-full object-contain pointer-events-none" />
          </div>

          <div className="flex gap-4 mt-6 w-full justify-center">
            <button onClick={() => setScale(s => Math.max(1, s - 0.1))} className="px-4 py-2 border-2 border-ink font-ui font-bold hover:bg-white text-ink transition-colors">- ZOOM OUT</button>
            <button onClick={() => setScale(s => Math.min(3, s + 0.1))} className="px-4 py-2 border-2 border-ink font-ui font-bold hover:bg-white text-ink transition-colors">+ ZOOM IN</button>
          </div>
        </div>

        <div className="p-4 border-t-2 border-ink bg-white flex justify-end gap-3">
          <button onClick={onClose} className="px-6 py-2 border-2 border-ink font-ui font-bold hover:bg-gray-100 text-ink transition-colors">BATAL</button>
          <button onClick={handleSave} className="px-8 py-2 bg-ink text-cream border-2 border-ink font-ui font-bold hover:bg-accent transition-colors">SIMPAN</button>
        </div>
      </div>
    </div>
  );
};

export default CropModal;
