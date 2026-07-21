import './globals.css';

export const metadata = {
  title: 'Warta Rupa — Platform Photobooth Premium',
  description: 'Photobooth online bergaya editorial koran vintage. Ambil foto, pilih template unik, unduh PNG, GIF, atau Video langsung di browser.',
  keywords: 'photobooth online, photo booth, template koran, newspaper photobooth, warta rupa',
  openGraph: {
    title: 'Warta Rupa — Platform Photobooth Premium',
    description: 'Photobooth online bergaya editorial koran vintage.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang='id'>
      <body>{children}</body>
    </html>
  );
}

