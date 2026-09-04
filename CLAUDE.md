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
Setiap kali versi dinaikkan, tambah entri baru dalam `DATA.changelog`
(terbaru di atas). Tulis dalam bahasa mudah untuk ahli keluarga, bukan bahasa
teknikal — tumpu pada apa yang mengubah apa mereka buat atau ke mana mereka
pergi. Jangan sebut nama fail, nama fungsi, atau istilah kod.

Baik: "Makan tengah hari Sabtu tukar ke Nasi Kandar Beratur 786, berhawa
dingin dan tidak tutup awal"
Buruk: "Ditukar DATA.places.sofea kepada beratur"

Kalau perubahan hanya kosmetik dan tidak menjejaskan keluarga, tulis satu
baris ringkas sahaja.

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
- Guna localStorage atau sessionStorage.
- Hotlink gambar dari hasil carian Google.

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