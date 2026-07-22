const STORY_WIDTH = 1080;
const STORY_HEIGHT = 1920;

const loadImage = (src) => new Promise((resolve, reject) => {
  const img = new Image();
  img.onload = () => resolve(img);
  img.onerror = reject;
  img.src = src;
});

/**
 * Susun ulang hasil PNG (strip/koran) menjadi format vertikal 1080x1920 siap
 * pakai untuk Instagram Story: latar belakang blur & zoom dari foto yang sama,
 * lalu hasil aslinya ditempatkan tajam di tengah dengan margin aman untuk UI
 * Instagram (tombol reply, ikon di atas, dsb).
 * @param {string} imageDataUrl - hasil PNG dari html-to-image
 * @returns {Promise<Blob>}
 */
export async function buildInstaStoryImage(imageDataUrl) {
  const img = await loadImage(imageDataUrl);

  const canvas = document.createElement('canvas');
  canvas.width = STORY_WIDTH;
  canvas.height = STORY_HEIGHT;
  const ctx = canvas.getContext('2d');

  // Latar: versi blur & zoom dari gambar yang sama, menutupi seluruh kanvas.
  const coverScale = Math.max(STORY_WIDTH / img.width, STORY_HEIGHT / img.height) * 1.15;
  const bgW = img.width * coverScale;
  const bgH = img.height * coverScale;
  ctx.filter = 'blur(50px) brightness(0.6)';
  ctx.drawImage(img, (STORY_WIDTH - bgW) / 2, (STORY_HEIGHT - bgH) / 2, bgW, bgH);
  ctx.filter = 'none';

  // Gambar asli, tajam, di tengah — area aman menjauhi tepi atas/bawah.
  const safeWidth = STORY_WIDTH * 0.82;
  const safeHeight = STORY_HEIGHT * 0.68;
  const fitScale = Math.min(safeWidth / img.width, safeHeight / img.height);
  const fgW = img.width * fitScale;
  const fgH = img.height * fitScale;
  const fgX = (STORY_WIDTH - fgW) / 2;
  const fgY = (STORY_HEIGHT - fgH) / 2 - 60;

  ctx.save();
  ctx.shadowColor = 'rgba(0,0,0,0.5)';
  ctx.shadowBlur = 40;
  ctx.shadowOffsetY = 20;
  ctx.drawImage(img, fgX, fgY, fgW, fgH);
  ctx.restore();

  // Branding tipis di bawah hasil.
  ctx.textAlign = 'center';
  ctx.fillStyle = '#fcf8ed';
  ctx.font = "700 44px 'Playfair Display', Georgia, serif";
  ctx.fillText('WARTA RUPA', STORY_WIDTH / 2, fgY + fgH + 90);

  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob), 'image/png');
  });
}
