# Penang Vacation 2026 — halaman brief keluarga

Satu halaman statik untuk 21 ahli keluarga. Trip 12–14 September 2026.
Dihoskan di GitHub Pages dan Cloudflare Pages dari repo yang sama.

## Bahasa
Semua teks yang dipaparkan mesti dalam Bahasa Melayu. Termasuk komen dalam kod.

## Struktur
Semua data trip berada dalam blok `DATA` di bahagian atas skrip.
Jangan tanam nilai terus dalam fungsi render — letak dalam DATA.

## Versi dan timestamp
Setiap kali fail diubah, naikkan versi di footer:
- Pembetulan kecil atau teks: naik 0.1 (v1.1 → v1.2)
- Perubahan struktur atau seksyen baru: naik versi penuh (v1.9 → v2.0)
Tulis juga tarikh dan waktu kemas kini dalam footer, format:
"Kemas kini 2 September 2026, 9.40 malam (v1.3)"
Guna waktu Malaysia.

## Semakan wajib sebelum lapor siap
Jalankan ketiga-tiga ini setiap kali:
1. Jarak setiap hari (`day.km`) mesti sama dengan jumlah semua `move.km` hari itu
2. Tiada aktiviti bermula sebelum aktiviti sebelumnya tamat campur masa memandu
3. Jumlah orang dalam setiap senario kereta mesti sama dengan label `pax`
Kalau ada yang tak padan, betulkan dahulu, kemudian beritahu apa yang dibetulkan.

## Jangan sekali-kali
- Reka harga, tambang, atau kadar parking. Kalau tak boleh disahkan dari sumber
  sebenar, tulis "semak sendiri" dan beri nama sumber.
- Tulis status halal tanpa sumber. Tiga tahap sahaja: sijil JAKIM,
  milik Muslim tanpa sijil, atau perlu disemak.
- Guna localStorage atau sessionStorage.
- Hotlink gambar dari hasil carian Google.

## Peta
Leaflet dengan tile OpenStreetMap. Tiada API key. Jangan tukar ke penyedia
yang perlukan key — ia akan papar watermark.

## Selepas siap
Beritahu saya apa yang berubah dalam satu perenggan pendek Bahasa Melayu,
kemudian tunggu saya sahkan sebelum commit.