# Warta Rupa — Online Photobooth

Aplikasi photobooth berbasis web yang mengubah foto kamu menjadi layout koran vintage atau photostrip klasik — langsung di browser, tanpa upload ke server.

## Fitur

- **13 Template**: 6 tema Newspaper + 7 tema Photostrip
- **Filter foto real-time**: Normal, Hitam Putih, Sepia, Vintage
- **Export PNG** resolusi tinggi via html-to-image
- **Kamera langsung** dengan countdown dan mode retake per foto
- Tanpa login, tanpa server, tanpa biaya

## Template Newspaper

| ID | Nama | Deskripsi |
|----|------|-----------|
| `vintage` | Vintage Classic | Koran jadul krem, 2 kolom, grayscale otomatis |
| `tabloid` | Tabloid Gosip | Stempel merah & kuning dramatis |
| `classicbw` | Koran Jadul B&W | Monokrom 2-kolom |
| `editorial` | Majalah Editorial | Minimalis full-bleed, Archivo |
| `bold` | Sport / Kriminal | Background hitam, aksen kuning |
| `zine` | Zine Cutout | Ransom note, washi tape, DIY |

## Template Photostrip

| ID | Nama | Deskripsi |
|----|------|-----------|
| `classic` | Classic | Minimalis, frame putih |
| `filmreel` | Film Reel | Roll film analog |
| `polaroid` | Polaroid | Tumpukan gaya polaroid |
| `cute` | Cute Pastel | Warna ceria & membulat |
| `denim` | Denim Scrapbook | Gaya jahitan denim |
| `polaroidstripes` | Polaroid Stripes | Pola checker & starburst |
| `playfulblob` | Playful Blob | Blob organik & washi tape |

## Stack Teknologi

- **React 19** + **Vite 8**
- **Tailwind CSS v3**
- **html-to-image** — export PNG
- State management murni via `useState` di App.jsx (tanpa router, tanpa Redux)

## Cara Menjalankan

```bash
npm install
npm run dev
```

Buka `http://localhost:5173` di browser.

## Cara Build Produksi

```bash
npm run build
npm run preview
```

## Lisensi

MIT — lihat [LICENSE](./LICENSE)
