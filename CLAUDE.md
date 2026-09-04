# Penang Vacation 2026 — halaman brief keluarga

Satu halaman statik untuk 21 ahli keluarga. Trip 12–14 September 2026.
Dihoskan di GitHub Pages dan Cloudflare Pages dari repo yang sama.

## Bahasa
Bahasa Melayu untuk semua ayat dan penerangan.
Istilah Inggeris yang lazim digunakan orang Malaysia dibenarkan bila ia
lebih jelas: Day 1/2/3, pax, seat, check-in, Plan B, Route Summary.
Jangan terjemah paksa istilah yang orang memang guna dalam Inggeris.

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

## Changelog untuk keluarga
`DATA.changelog` mencatat perubahan BESAR sahaja — perkara yang mengubah
tempat, masa, susunan orang, atau menambah seksyen baru.

JANGAN catat langsung: pembaikan paparan, pembetulan ayat, perubahan warna,
susun atur, ejaan, atau apa-apa yang kosmetik. Kalau sesuatu versi tiada
perubahan besar, jangan tambah entri baru — biarkan sahaja.

Gabungkan versi berdekatan yang kecil menjadi satu entri. Setiap item satu
baris pendek, tanpa penjelasan panjang. Seluruh changelog mesti boleh dibaca
dalam 30 saat.

Struktur setiap entri:
- `ganti` untuk penggantian, dipapar sebagai jadual Sebelum → Selepas
- `baru` untuk perkara baru, dipapar sebagai senarai pendek

Baik: "Makan tengah hari Sabtu tukar ke Nasi Kandar Beratur 786"
Buruk: "Ditukar DATA.places.sofea kepada beratur"
Buruk: "Perkataan tidak lagi pecah di tengah pada skrin kecil"

## Semakan wajib sebelum lapor siap
Jalankan ketiga-tiga ini setiap kali:
1. Jarak setiap hari (`day.km`) mesti sama dengan jumlah `move.km` yang BUKAN jalan kaki (abaikan segmen dengan `walk:true`), dibundarkan ke km terdekat
2. Tiada aktiviti bermula sebelum aktiviti sebelumnya tamat campur masa memandu
3. Jumlah orang dalam setiap senario kereta mesti sama dengan label `pax`
Kalau ada yang tak padan, betulkan dahulu, kemudian beritahu apa yang dibetulkan.

## Jangan sekali-kali
- Reka harga, tambang, atau kadar parking. Kalau tak boleh disahkan dari sumber
  sebenar, tulis "semak sendiri" dan beri nama sumber.
- Tulis status halal tanpa sumber. Tiga tahap sahaja: sijil JAKIM,
  milik Muslim tanpa sijil, atau perlu disemak.
- Simpan data trip dalam localStorage atau storan pelayar. Data trip kekal
  dalam data.js sahaja.
- Hotlink gambar dari hasil carian Google.

## Storan pelayar
localStorage dibenarkan untuk keutamaan paparan yang tidak penting sahaja,
contohnya versi changelog yang sudah dilihat. Laman ini statik di GitHub Pages
dan Cloudflare Pages, jadi localStorage berfungsi normal.

Jangan sekali-kali simpan data trip di situ — jadual, tempat, masa, nama dan
kos semuanya kekal dalam data.js sahaja. Setiap bacaan storan mesti dibalut
try/catch supaya halaman tetap berfungsi kalau pelayar menyekatnya.

## Peta
Leaflet dengan tile OpenStreetMap. Tiada API key. Jangan tukar ke penyedia
yang perlukan key — ia akan papar watermark.

## Selepas siap
Beritahu saya apa yang berubah dalam satu perenggan pendek Bahasa Melayu,

Selepas setiap perubahan yang diminta:
1. Jalankan semakan wajib di atas
2. Naikkan versi dan kemas kini timestamp di footer
3. git add, commit dengan mesej ringkas Bahasa Melayu, dan push
4. Beritahu saya dalam satu perenggan apa yang berubah dan mesej commit yang digunakan

Jangan tunggu kebenaran untuk commit. Kalau saya tak suka hasilnya,
saya akan minta awak patah balik.