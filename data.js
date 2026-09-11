/* ============================================================
   DATA — edit bahagian ini sahaja. Format masa: "HH:MM" (24 jam).
   ============================================================ */
const DATA = {
  trip: {
    title: 'Pulau Pinang',
    start: '2026-09-12',
    dates: '12 – 14 September 2026',
    base: 'Homestay Karpal Singh Drive',
    updated: '11 September 2026, 5.40 petang',
    toddler: 2,
    version: 'v9.0'
  },

  // Kumpulan. color = warna pada carta pergerakan, seat map & bilik.
  groups: [
    { id:'F1', name:'Muhd',   label:'Keluarga Muhd',   short:'Kel. Muhd', pax:4, dewasa:2, kanak:2, who:'2 dewasa, 2 kanak-kanak', color:'#6F5BB8', from:'Sudah di Pulau Pinang', members:['Muhd','Kak Salina','Khadijah','Alisha'] },
    { id:'F2', name:'Hadi',   label:'Keluarga Hadi',   short:'Kel. Hadi', pax:4, dewasa:2, kanak:2, who:'2 dewasa, 2 kanak-kanak', color:'#288181', from:'ERL Salak Tinggi',       members:['Hadi','Kak Hajar','Hud','Hana'] },
    { id:'F3', name:'Obi',    label:'Keluarga Obi',    short:'Kel. Obi',  pax:5, dewasa:2, kanak:3, who:'2 dewasa, 3 kanak-kanak', color:'#9B6A16', from:'ERL Salak Tinggi',       members:['Obi','Kak Yusra','Nasrullah','Maryam','Annur'] },
    { id:'F4', name:'Wafi',   label:'Keluarga Wafi',   short:'Kel. Wafi', pax:2, dewasa:2, kanak:0, who:'2 dewasa',                color:'#2F5AA8', from:'ERL Salak Tinggi / parking KLIA2', members:['Wafi','Nadian'] },
    { id:'G1', name:'Halima', label:'Halima & Kak Ayman', short:'Halima & Ayman', pax:2, dewasa:2, kanak:0, who:'2 dewasa',        color:'#BE4E76', from:'ERL Putrajaya / Salak Tinggi', members:['Halima','Kak Ayman'], arriveDay:2 },
    { id:'G2', name:'Fitri',  label:'Fitri, Madno & Fatimah', short:'Fitri, Madno, Fatimah', pax:3, dewasa:3, kanak:0, who:'3 dewasa', color:'#6B7C25', from:'ERL KL Sentral / Grab',  members:['Fitri','Madno','Fatimah'] },
    { id:'S1', name:'Syafi',  label:'Syafi',           short:'Syafi',     pax:1, dewasa:1, kanak:0, who:'1 dewasa',                color:'#6B7280', from:'ERL Putrajaya / Salak Tinggi / carpool Wafi', members:['Syafi'] }
  ],

  flights: [
    { iso:'2026-09-12', date:'12 Sept (Sabtu)', dep:'09:25', arr:'10:20', from:'KUL', to:'PEN', fromName:'KLIA2', toName:'Pulau Pinang', flightNo:'AK6142', who:['F2','F3','F4','G2:Madno','G2:Fitri','G2:Fatimah','S1'], note:'15 orang dalam satu penerbangan.' },
    { iso:'2026-09-13', date:'13 Sept (Ahad)',  dep:'06:40', arr:'07:40', from:'KUL', to:'PEN', fromName:'KLIA2', toName:'Pulau Pinang', flightNo:'AK6124', who:['G1'], note:'Kereta 2 (Syafi) tunggu di pintu ketibaan LTAPP.' },
    { iso:'2026-09-14', date:'14 Sept (Isnin)', dep:'16:00', arr:'17:00', from:'PEN', to:'KUL', fromName:'Pulau Pinang', toName:'KLIA2', flightNo:'AK6131', who:['G2:Fitri','G2:Fatimah'], note:'Fitri & Fatimah sahaja.' },
    { iso:'2026-09-14', date:'14 Sept (Isnin)', dep:'17:15', arr:'18:15', from:'PEN', to:'KUL', fromName:'Pulau Pinang', toName:'KLIA2', flightNo:'AK6154', who:['F2','F3','F4','G2:Madno','S1'], note:'13 orang.' },
    { iso:'2026-09-14', date:'14 Sept (Isnin)', dep:'20:45', arr:'21:50', from:'PEN', to:'KUL', fromName:'Pulau Pinang', toName:'KLIA2', flightNo:'AK6129', who:['G1'] },
  ],

  cutoff: {
    title:'Sampai KLIA2',
    rows:[
      { t:'06:00', l:'Ada bagasi check-in', d:'Beri ruang untuk kaunter bagasi, tag beg dan barisan keselamatan.' },
      { t:'07:00', l:'Cabin sahaja', d:'Terus ke keselamatan, tiada kaunter bagasi.' }
    ],
    foot:'Kedua-duanya untuk penerbangan 9.25 pg. Halima & Kak Ayman hari Ahad guna kiraan sama dari waktu berlepas mereka.'
  },

  // Cara ke KLIA2 pagi Sabtu, ikut kumpulan
  // Cara ke KLIA2 pagi Sabtu. Setiap kumpulan pilih SATU pilihan.
  klRule:'Setiap keluarga ada caranya sendiri. Kumpulan yang ada dua pilihan (A dan B) pilih satu sahaja.',
// Peraturan lajur: Langkah = tindakan sahaja; Masa = satu tempoh atau waktu jam;
// Kos = wang sahaja. Apa-apa nasihat atau syarat masuk medan 'nota' di bawah jadual.
  klSide: [
    { g:'F2', title:'Keluarga Hadi', sub:'4 orang, dari Seremban', opts:[
      { k:'A', name:'Pandu terus ke KLIA2', main:true, steps:[], nota:'Butiran perjalanan akan dikemaskini.' },
    ]},
    { g:'F3', title:'Keluarga Obi', sub:'5 orang, dari Seremban', opts:[
      { k:'A', name:'ERL dari Salak Tinggi', main:true, steps:[
        ["Pandu dari Seremban ke Salak Tinggi Park & Ride","\u00b135 minit","\u2014"],
        ["Parking Salak Tinggi Park & Ride","\u2014","RM30\u201336"],
        ["KLIA Transit ke KLIA2","11 minit","RM4.90 dewasa, RM2.20 kanak-kanak"],
        ["Sasar tren","6.00 pg","\u2014"]
      ], nota:'Beli tiket tiga anak di kaunter atau mesin sebelum masuk gate.' },
    ]},
    { g:'F4', title:'Keluarga Wafi', sub:'2 orang, dari Cyberjaya', opts:[
      { k:'A', name:'Pandu terus ke KLIA2', main:true, steps:[
        ["Pandu terus dari Cyberjaya ke KLIA2","\u2014","\u2014"],
        ["Bertolak dari rumah","5.00 \u2013 5.30 pg","\u2014"],
        ["Parking Gateway@klia2","\u2014","RM55 sehari, 3 hari \u00b1RM165"],
        ["Atau KLIA Long Term Car Park","\u2014","RM27\u201332 sehari"]
      ], nota:'Saranan sampai sebelum 6.00 pagi. Bertolak 5.30 pagi bermakna sampai tepat pada waktu itu tanpa lebihan \u2014 bertolak 5.00 pagi lebih selamat. Shuttle Long Term Car Park percuma setiap 10\u201315 minit.' }
    ]},
    { g:'S1', title:'Syafi', sub:'1 orang, dari Cyberjaya', opts:[
      { k:'A', name:'Ikut kereta Keluarga Wafi', steps:[
        ["Ikut kereta Keluarga Wafi dari Cyberjaya terus ke KLIA2","\u2014","Tiada tambang ERL"]
      ], nota:'Kereta Wafi jadi 3 orang. Sahkan ruang beg dengan Wafi dahulu.' },
      { k:'B', name:'ERL dari Putrajaya Sentral', steps:[
        ["Pandu ke Putrajaya Sentral","\u2014","Parking \u00b1RM12 sehari"],
        ["ERL Putrajaya Sentral ke KLIA2","20 minit","RM9.40"],
        ["Tren pertama","5.22 pg","\u2014"]
      ] }
    ]},
    { g:'G2', title:'Fitri, Madno & Fatimah', sub:'3 orang', opts:[
      { k:'A', name:'ERL dari KL Sentral', main:true, steps:[
        ["KLIA Ekspres tanpa henti dari KL Sentral","33 minit","RM55 dewasa sehala"],
        ["Atau KLIA Transit","39 minit","RM55 dewasa sehala"],
        ["KLIA Ekspres pertama dari KL Sentral","5.00 pg","\u2014"]
      ], nota:'Tiba KLIA2 5.33 pg \u2014 itu satu-satunya tren yang sempat untuk had 6.00 pg. Tiket online 10% lebih murah.' },
      { k:'B', name:'Grab terus ke KLIA2', steps:[
        ["Grab terus ke KLIA2","\u2014","Berubah ikut permintaan"]
      ], nota:'Turun di pintu berlepas Aras 3. Biasanya lebih mahal daripada ERL untuk 3 orang.' }
    ]},
    { g:'G1', title:'Halima & Kak Ayman', sub:'Ahad pagi, 2 orang', opts:[
      { k:'A', name:'ERL dari Putrajaya', main:true, steps:[
        ["Pandu ke Putrajaya Sentral","\u2014","Parking \u00b1RM12 sehari"],
        ["ERL Putrajaya Sentral ke KLIA2","20 minit","RM9.40 dewasa"],
        ["Tren pertama Ahad","5.22 pg","\u2014"]
      ], nota:'Tiba KLIA2 5.42 pg — lebih kurang 58 minit sebelum berlepas. Ketat untuk cabin sahaja, tidak memadai kalau ada bagasi.' },
      { k:'B', name:'Dihantar atau Grab terus ke KLIA2', steps:[
        ["Dihantar atau Grab terus ke KLIA2","\u2014","Tiada parking untuk dibayar"]
      ], nota:'Boleh sampai lebih awal. Pilih ini kalau ada bagasi check-in, sebab ERL pertama tiba 5.42 pg — terlalu lewat untuk berlepas 6.40 pg.' }
    ], foot:'Berlepas 6.40 pg, tiba 7.40 pg. Kereta 2 (Syafi) ambil mereka di pintu ketibaan LTAPP.' }
  ],

  // Lokasi. Koordinat dari Google Places.
  cats: [
    { k:'meal',     label:'Makan',          color:'#B0623B' },
    { k:'stop',     label:'Tempat menarik', color:'#2B824B' },
    { k:'solat',    label:'Solat',          color:'#3B3974' },
    { k:'flight',   label:'Penerbangan',    color:'#3B79B0' },
    { k:'homestay', label:'Homestay',       color:'#934887' },
    { k:'rehat',    label:'Rehat',          color:'#714B3D' },
    { k:'note',     label:'Nota',           color:'#867637' },
    { k:'move2',    label:'Perjalanan',     color:'#993344' }
  ],

  places: {
    klia2:     { name:"KLIA2", lat:2.7442, lng:101.6858, addr:"Sepang, Selangor", kind:"plane" },
    lta:       { name:"Lapangan Terbang Antarabangsa Pulau Pinang (LTAPP)", lat:5.296, lng:100.2752, addr:"Bayan Lepas", kind:"plane", tips:"Parking RM3 sejam, maksimum RM33 sehari." },
    homestay:  { name:"Homestay Karpal Singh Drive", lat:5.3967, lng:100.3279, addr:"12, Lebuh Sungai Pinang 3, Jelutong, 11600 George Town", kind:"home" },
    beratur:   { short:"Beratur 786", name:"Nasi Kandar Beratur 786", lat:5.2993, lng:100.2671, addr:"1-1-11 Summerskye Residence, Jalan Sungai Tiram 8, Bayan Lepas", hours:"9.00 pg – 11.00 mlm, setiap hari", halal:"muslim", rating:4.2, reviews:1283, phone:"+60 4-299 9772", tagline:"Nasi kandar berhawa dingin, giliran bergerak laju", special:"Nasi kandar. Ayam goreng digoreng di depan.", tips:"6 minit dari LTAPP. Berhawa dingin, tempat duduk betul, tak seperti gerai asal yang panas. Giliran bergerak laju sebab ramai staf." },
    queensbay: { name:"Queensbay Mall", lat:5.3331, lng:100.307, addr:"100, Persiaran Bayan Indah, Bayan Lepas", hours:"10.30 pg – 10.30 mlm", rating:4.4, reviews:26293, phone:"+60 4-619 8989", tagline:"Mall terbesar Pulau Pinang, ada surau dan medan selera", special:"Mall terbesar Pulau Pinang, berhawa dingin, ada surau dan medan selera besar.", tips:"12 minit ke LTAPP. Parking bertingkat percuma beberapa jam pertama.", short:"Queensbay" },
    kgagong:   { tiket:"RM10 dewasa · RM5 kanak-kanak · RM3 parking", name:"Kampung Agong", lat:5.5396, lng:100.3791, addr:"841 Kampung Bakar Kapor, 13100 Penaga", hours:"9.00 pg – 6.00 ptg", rating:4.5, reviews:5942, phone:"+60 12-481 7795", cost:"RM10 dewasa, RM5 kanak-kanak 4–12 tahun, bawah 4 percuma. Sewa kostum tradisional RM30, slot terhad.", tagline:"Di tanah besar, seberang jambatan", tips:"Tanah besar, seberang jambatan. Panas tengah hari — bawa topi dan air.", short:"Kg Agong" },
    pakteh:    { name:"PakTeh Fruits, Kg. Pelet", lat:5.4152, lng:100.4624, addr:"Jalan Guar Perahu, Kubang Semang, Bukit Mertajam", hours:"10.00 pg – 11.00 mlm", halal:"muslim", rating:4, reviews:603, tagline:"Kedai buah viral — durian dan mangga", special:"Kedai buah viral (durian, mangga).", tips:"Ini di Bukit Mertajam, bukan di Penaga — jalan pusing 30 km dari Kg Agong." },
    laluna:    { name:"La Luna", q:"La.Luna", lat:5.3127634, lng:100.2995774, addr:"Kompleks Selera Sri Pantai, Lebuhraya Tun Dr. Lim Chong Eu, 11900 Bayan Lepas, Pulau Pinang", phone:"+60 18-955 1677", hours:"Selasa hingga Ahad 4.00 ptg – 11.00 mlm. Tutup Isnin.", rating:4.7, reviews:396, cost:"Taco RM10 sebiji, set dengan fries dan minuman lebih kurang RM18.50 seorang.", tagline:"Taco gaya Malaysia tepi laut, ambil bungkus", special:"Taco gaya Malaysia, isi padat, pilihan ayam, daging atau kambing. Tepi laut, angin kuat. Kompleks sama ada gerai ikan bakar juga: BOSS Ikan Bakaq (4.3/86) dan Medan Selera Seri Pantai (3.9/457), jadi semua umur ada pilihan.", tips:["Beratur untuk order dan bayar dahulu, kemudian tunggu nombor dipanggil. Barisan bergerak laju.","Waktu paling sibuk 6 hingga 8 malam — kita sampai 6.40 ptg, jadi jangkakan beratur.","Kereta yang tidak ke La Luna boleh terus ke homestay untuk solat Maghrib dahulu."], short:"La Luna" },
    padang:    { name:"Padang Kota Lama (Medan Renong)", lat:5.4228, lng:100.3407, addr:"4, Jalan Tun Syed Sheh Barakbah, George Town", hours:"11.45 pg – 12.30 tgh malam", halal:"muslim", rating:3.7, reviews:4857, phone:"+60 19-477 5786", tagline:"Medan selera tepi laut: pasembur, mee udang", special:"Medan selera tepi laut: pasembur, mee udang, kerang bakar.", tips:"Parking susah hujung minggu — sampai awal atau parking di Fort Cornwallis/Esplanade.", short:"Esplanade" },
    hutton:    { name:"Roti Bakar Hutton Lane", lat:5.4174, lng:100.3305, addr:"300, Jalan Phee Choon, George Town", hours:"5.00 pg – 1.30 ptg", halal:"muslim", rating:4.3, reviews:2709, phone:"+60 13-402 5497", tagline:"Roti bakar telur goyang dan nasi dalca sejak 1974", special:"Roti bakar telur goyang, nasi dalca, kopi O. Sejak 1974." },
    hill:      { tiket:true, name:"Penang Hill (stesen bawah)", lat:5.4082, lng:100.2771, addr:"Jalan Bukit Bendera, Air Itam", hours:"Tren 6.30 pg – 11.00 mlm, kaunter 6.15 pg", rating:4.3, reviews:653, cost:"MyKad: RM16 dewasa, RM8 kanak-kanak 4–12 & warga emas (pergi-balik). Express lane RM40 / RM20.", tagline:"Naik tren ke puncak, tren setiap 30 minit", tips:["Express lane dan normal lane naik funicular yang SAMA. Bezanya hanya barisan; penumpang express masuk platform dahulu.","Kalau separuh kumpulan beli express, mereka naik train lebih awal dan kumpulan akan terpisah. Semua mesti pilih lane yang sama.","Beli tiket online sekurang-kurangnya 24 jam awal. Tiket online tidak boleh ditebus pada hari sama, dan ia melangkau barisan kaunter.","Beli online di sales.penanghill.gov.my, tunjuk MyKad masa tebus.","Tren setiap 30 minit, lebih kerap bila ramai. Ahad pagi giliran lebih pendek.","Bawa air untuk setiap orang, barisan sebahagiannya terdedah.","Bawa topi atau payung.","Bawa snek untuk budak-budak.","Seorang dewasa beratur, yang lain tunggu di kawasan teduh.","Beli tiket online 24 jam awal supaya terus ke barisan naik."], short:"Penang Hill" },
    hameed:    { name:"Nasi Kandar Hameediyah", lat:5.4186, lng:100.3325, addr:"164A, Lebuh Campbell, George Town", hours:"10.00 pg – 10.00 mlm", halal:"sijil", rating:4.1, reviews:7373, phone:"+60 4-261 1095", tagline:"Nasi kandar tertua Malaysia, sejak 1907", special:"Nasi kandar tertua Malaysia (1907).", tips:"Masuk Hameediyah Tandoori House sebelah — berhawa dingin, ada tempat duduk.", short:"Hameediyah" },
    habib:     { name:"Masjid Habib (Masjid Daerah Timur Laut)", lat:5.4495, lng:100.3082, addr:"5, Jalan Seri Tanjung Pinang, Tanjung Tokong", tagline:"Masjid baru 2026, kubah bentuk intan", special:"Masjid baru, dibuka Januari 2026. Kubah bentuk intan.", tips:"Parking luas.", rating:5, reviews:195 },
    kapitan:   { name:"Masjid Kapitan Keling", lat:5.417, lng:100.3371, addr:"14, Lebuh Buckingham, George Town", tagline:"Masjid warisan 1801 di tengah George Town", special:"Masjid warisan 1801.", tips:"4 minit jalan kaki dari Hameediyah, di laluan ke Armenian Street.", rating:4.6, reviews:3413 },
    armenian:  { name:"Armenian Street", lat:5.4154, lng:100.3371, addr:"Lebuh Armenian, George Town", tagline:"Mural dan kedai warisan George Town", special:"Mural, kedai warisan.", tips:"Parking tepi jalan MBPP 60 sen setiap 30 minit, bayar melalui app Penang Smart Parking.", short:"Armenian St" },
    udm:       { tiket:true, name:"Upside Down Museum", lat:5.4158046, lng:100.3335296, addr:"45, Lebuh Kimberley, George Town", hours:"9.30 pg – 6.30 ptg setiap hari", rating:4.2, reviews:5834, phone:"+60 4-264 2660", tagline:"Bilik terbalik untuk gambar, berhawa dingin penuh", cost:"MyKad ±RM26 dewasa, RM14 kanak-kanak. Bukan MyKad RM36 / RM26. Masuk terakhir 5.45 ptg.", note:"Harga dari panduan pelancongan, bukan laman rasmi. Sumber berbeza beri angka berbeza — sahkan di kaunter.", tips:"Staf di setiap bilik tolong pose dan ambil gambar, jadi kumpulan besar tak kelam-kabut. Lawatan 15–25 minit ikut kesesakan.", short:"Upside Down" },
    ksd:       { name:"Karpal Singh Drive", lat:5.3974713, lng:100.3294059, addr:"Persiaran Karpal Singh, Jelutong, George Town", rating:4.6, reviews:198, tagline:"Tepi laut betul-betul di luar homestay, angin laut, sesuai untuk senja", tips:"Tak perlu memandu langsung. Berbasikal dan berjoging popular di sini. Hati-hati dengan penunggang basikal laju.", short:"Karpal Singh Drive" },
    trick3d:   { tiket:true, name:"Penang 3D Trick Art Museum", lat:5.4198087, lng:100.3417021, addr:"10, Lebuh Penang, George Town", hours:"9.00 pg – 6.00 ptg", rating:4.3, reviews:4427, phone:"+60 4-263 1628", cost:"MyKad RM18 dewasa, RM12 kanak-kanak 4–12 tahun. Bukan MyKad RM28 / RM18.", note:"Sumber: laman rasmi penangtrickart.com.", tagline:"Muzium gambar 3D, berhawa dingin" },
    kamera:    { tiket:true, name:"Asia Camera Museum", lat:5.4154278, lng:100.3368096, addr:"71, Lebuh Armenian, George Town", hours:"10.00 pg – 6.00 ptg", rating:4.7, reviews:921, phone:"+60 11-1859 9878", cost:"Semak di premis.", note:"Harga tiket tidak dijumpai dari sumber yang boleh disahkan.", tagline:"Atas Armenian Street sendiri, ada tour interaktif" },
    peranakan: { tiket:true, name:"Pinang Peranakan Mansion", lat:5.4178275, lng:100.3412046, addr:"29, Church Street, George Town", hours:"9.30 pg – 5.30 ptg", rating:4.5, reviews:6473, phone:"+60 4-264 2929", cost:"RM20 dewasa, bawah 6 tahun percuma.", note:"Sumber: Tourism Malaysia. Sesetengah ulasan terbaru sebut RM30 — sahkan di kaunter.", tagline:"Rumah agam Baba-Nyonya" },
    gurneybay: { name:"Gurney Bay Park", lat:5.4326214, lng:100.3188222, addr:"Persiaran Gurney, George Town", hours:"Buka 24 jam", rating:4.5, reviews:896, cost:"Percuma.", tagline:"Taman tepi laut baru dengan taman permainan dan skate park", note:"Pokok masih muda, tiada teduh — paling elok menjelang senja, bukan tengah hari." },
    fizzy:     { name:"Makan Pagi by Fizzy", lat:5.4167, lng:100.3306, addr:"266, Jalan Dr Lim Chwee Leong, George Town", hours:"7.00 pg – 2.00 ptg", halal:"muslim", rating:4.2, reviews:2019, phone:"+60 13-984 2274", tagline:"Nasi lemak, roti goyang, satay dan lontong", special:"Nasi lemak, roti goyang, satay, lontong.", tips:"Hujung minggu giliran boleh sejam; Isnin lebih lengang. Parking persendirian sebelah kafe mahal — guna parking Chowrasta." },
    chowrasta: { name:"Pasar Chowrasta", lat:5.4182, lng:100.3313, addr:"Lot 124, Jalan Penang, George Town", hours:"6.30 pg – 7.00 mlm", rating:4.2, reviews:9961, cost:"Parking bertingkat atas pasar, kira-kira RM1 sejam (buka 5 pg – 10 mlm).", tagline:"Buah tangan: tau sar pneah, buah pala, dodol", special:"Buah tangan: tau sar pneah, buah pala, dodol, kerepek.", tips:"Jeruk Madu Pak Ali (423 Jalan Penang) 2 minit jalan kaki.", short:"Chowrasta" },
    dimsum:    { name:"Dim Sum Valet (Cina Muslim)", lat:5.4169, lng:100.3311, addr:"16, Lebuh Keng Kwee, George Town", hours:"9.00 pg – 6.00 ptg, tutup Selasa", halal:"sijil", rating:4.4, reviews:785, phone:"+60 19-916 1631", tagline:"Dim sum halal, pilih sendiri dari bakul", special:"Dim sum halal, pilih sendiri dari bakul di pintu masuk, lebih kurang RM4.50 sepinggan. Char koay teow di sini pun dipuji ramai.", tips:"Ada tingkat atas untuk kumpulan besar.", short:"Dim Sum Valet" },
    laksa:     { name:"Penang Road Famous Laksa", lat:5.4167, lng:100.3312, addr:"5–7, Lebuh Keng Kwee, George Town", hours:"9.00 pg – 5.30 ptg, tutup Rabu", halal:"semak", rating:4.3, reviews:2341, tagline:"Laksa terkenal di Lebuh Keng Kwee", tips:"Order dulu baru duduk. Giliran 20–30 minit hujung minggu.", halalNote:"Sijil halal JAKIM ditarik balik pada 13 Jun 2025 dan masih dalam tempoh tindakan pembetulan." },
    olo:       { name:"OLO Studio", lat:5.395, lng:100.3171, addr:"Level 3, Straits Garden, Jelutong", hours:"11.00 pg – 7.00 mlm", tagline:"Kraf dan tufting, berbumbung", special:"Kraf & tufting, berbumbung.", tips:"5 minit dari homestay.", rating:4.9, reviews:748 },
    gurney:    { name:"Gurney Plaza", lat:5.438, lng:100.31, addr:"170, Persiaran Gurney", hours:"10.00 pg – 10.00 mlm", rating:4.4, reviews:21373 }
  },

  // Anggaran waktu solat PNG01 (JAKIM), diselaraskan dengan e-Solat 31 Ogos 2026.
  prayer: {
    '2026-09-12': { subuh:'06:03', syuruk:'07:09', zohor:'13:17', asar:'16:18', maghrib:'19:21', isyak:'20:31' },
    '2026-09-13': { subuh:'06:02', syuruk:'07:09', zohor:'13:17', asar:'16:18', maghrib:'19:21', isyak:'20:30' },
    '2026-09-14': { subuh:'06:02', syuruk:'07:08', zohor:'13:16', asar:'16:19', maghrib:'19:20', isyak:'20:29' }
  },

  // Jadual. type: stop | meal | solat | flight | move | note
  // move: { km, min, via } — perjalanan kereta antara dua tempat.
  days: [
    { n:1, date:"2026-09-12", label:"Sabtu, 12 Sept", short:"Sabtu", intro:["Kampung Agong di Penaga tutup 6.00 ptg — tiada peluang kedua.", "Satu-satunya hari kita keluar pulau, dan hari paling banyak memandu.", "Kira masa ikut keadaan trafik semasa."], ringkas:["kgagong", "laluna", "padang"], km:126, toll:"RM14", tollNote:"2 kereta masuk pulau", fuel:"±RM53", azanFrom:"10:20", items:[
        { t:"04:30", type:"note", title:"Bertolak dari rumah", kecil:"Waktu bertolak berbeza ikut kumpulan", metaLink:{ text:"Pagi Sabtu: cara ke KLIA2", href:"#pagi-sabtu" } },
        { t:"05:45", e:"08:45", type:"flight", title:"KLIA2", place:"klia2", pills:["Check-in bagasi", "Breakfast"], kecil:"check-in bagasi, Subuh, sarapan", meta:"Kaunter bagasi sebelum 6.00 pg. Cabin sahaja boleh sampai sebelum 7.00 pg. Subuh masuk lebih kurang 6.00 pg — surau di Aras 2 dan 3. Sarapan selepas melepasi keselamatan." },
        { t:"09:25", type:"flight", title:"Berlepas", flightRef:"AK6142", kecil:"Tempoh 55 minit" },
        { t:"10:20", type:"flight", title:"Tiba Pulau Pinang", place:"lta", kecil:"ambil bagasi" },
        { t:"11:30", type:"move2", title:"Ambil kereta sewa", kecil:"Kereta 1 Wafi, Kereta 2 Syafi", meta:"Kereta 1 starting driver Wafi, Kereta 2 starting driver Syafi. Semak kereta, ambil gambar sekeliling badan kereta sebelum bergerak." },
        { move:{ km:9.9, min:6 } },
        { t:"11:45", e:"12:45", type:"meal", title:"Nasi Kandar Beratur 786", place:"beratur", pills:["Lunch"], planB:[{ name:"Arab Street", addr:"31-1-15, The CEO, Lebuh Nipah 5, Bayan Lepas", rating:4.9, reviews:193, hours:"11.00 pg – 11.00 mlm, Jumaat buka 2.00 ptg", why:"Masakan Arab halal, shawarma dan nasi mandi, porsi besar.", kei:"Masakan Arab, shawarma dan nasi mandi" }, { name:"Minah Restaurant", addr:"Jalan Sultan Azlan Shah, Taman Tun Sardon, Gelugor", rating:4.3, reviews:1300, hours:"9.00 pg – 4.00 ptg, tutup Isnin", why:"Masakan Melayu, banyak pilihan lauk dan ulam.", kei:"Masakan Melayu, banyak pilihan lauk dan ulam" }, { name:"Cargas Café", addr:"Main Road Bayan Lepas", rating:4.3, reviews:3208, why:"Nasi campur murah, 2 minit dari LTAPP, tapi panas dan self-service.", kei:"Nasi campur murah, self-service" }, { name:"Bayan Baru Market Food Court", why:"Medan selera MBPP, banyak gerai Muslim, semua orang boleh pilih sendiri. 12 minit.", rating:4, reviews:1812, kei:"Medan selera MBPP, banyak gerai Muslim" }, { name:"Alunan Rasa by Irama Dining", addr:"Setia Triangle", rating:4.6, reviews:321, why:"Ada surau, tapi buka 12.00 tgh sahaja.", kei:"Restoran, ada surau" }] },
        { move:{ km:15.1, min:20, via:"Lebuhraya Tun Dr Lim Chong Eu" } },
        { t:"13:05", e:"14:15", type:"homestay", title:"Check-in homestay", place:"homestay", pills:["Check-in homestay", "Solat jamak"], flags:[{ k:"warn", v:"Check-in awal belum disahkan" }], meta:"Check-in rasmi 3.00 ptg. Wafi minta awal, tetapi belum disahkan — anggap ia belum pasti sampai homestay jawab.", planB:[{ text:"Kalau tak boleh masuk: letak beg di lobi atau dalam kereta, solat Zuhur jamak Asar di Masjid Jamek Jelutong (5 minit) atau surau berdekatan, kemudian gerak terus ke Kampung Agong. Beg masuk bilik lepas balik malam." }, { text:"Jangan pusing-pusing menunggu — Kampung Agong tutup 6.00 ptg, jadi masa lebih baik dihabiskan di sana." }, { text:"Sahkan dengan tuan homestay seminggu sebelum trip supaya tak jadi teka-teki pada hari itu." }] },
        { move:{ km:37.4, min:65, via:"Jambatan Pulau Pinang → Butterworth → Kepala Batas → Penaga. Kira masa ikut keadaan trafik semasa." } },
        { t:"15:20", e:"17:30", type:"stop", title:"Kampung Agong", place:"kgagong", flags:[{ k:"warn", v:"Tutup 6.00 ptg" }], planB:[{ place:"pakteh", why:"Kedai buah viral di Bukit Mertajam. Jalan pusing 30 km dari sini, jadi ia ganti La Luna, bukan tambahan." }, { text:"Nak makan di Hameed Pata Mee Sotong (tutup 8 mlm): keluar Kg Agong 5.00 ptg, terus ke Esplanade, makan 6.15–7.15 mlm, kemudian solat Maghrib di Masjid Kapitan Keling berdekatan." }, { place:"olo", why:"Hujan lebat: berbumbung. Gerak ke Esplanade lebih awal." }] },
        { move:{ km:40.2, min:70, via:"Melalui Jambatan Pulau Pinang terus ke Bayan Lepas." } },
        { t:"18:40", e:"19:10", type:"meal", title:"La Luna", place:"laluna", pills:["Snacking", "Take away"], meta:"Ambil bungkus sahaja, bukan makan di situ. Untuk dimakan kemudian atau sebagai snek.", planB:[{ name:"Jeruk Madu Pak Ali", addr:"Jalan Penang", why:"Kalau tak sempat, buah tangan sama boleh dapat di sini pada Hari 3, 2 minit dari Chowrasta.", rating:4.1, reviews:1667, kei:"Jeruk dan buah tangan" }] },
        { move:{ km:14.3, min:20 } },
        { t:"19:30", e:"20:20", type:"solat", title:"Tiba homestay", place:"homestay", pills:["Solat jamak"], kecil:"Maghrib masuk 7.21 mlm" },
        { move:{ km:4.7, min:12 } },
        { t:"20:35", e:"22:30", type:"meal", title:"Padang Kota Lama", place:"padang", pills:["Dinner"], kecil:"Esplanade. Medan Renong buka lewat malam", planB:[{ name:"Hameed Pata Mee Sotong", addr:"Esplanade Park Food Court", why:"Berada di Esplanade Park Food Court sebelah. Nak makan di situ, kena sampai sebelum 7.30 mlm — bermakna skip La Luna dan solat Maghrib di Masjid Kapitan Keling selepas makan.", hours:"Isnin–Sabtu 11.00 pg – 8.00 mlm", note:"Tutup 8.00 malam, dan Esplanade Park Food Court tutup Ahad. Malam ini kita tidak ke sana.", kei:"Mee sotong, gerai medan selera Esplanade" }] },
        { move:{ km:4.4, min:12 } },
        { t:"22:45", type:"homestay", title:"Balik homestay", place:"homestay" }
    ]},
    { n:2, date:"2026-09-13", label:"Ahad, 13 Sept", short:"Ahad", intro:["Dua kereta berpecah pagi ini: Kereta 2 ke LTAPP ambil Halima & Kak Ayman, Kereta 1 terus ke sarapan.", "Semua bertemu semula di Roti Bakar Hutton Lane sebelum 9.00 pg.", "Selepas itu semua tempat rapat dalam George Town, kecuali Masjid Habib."], ringkas:["hill", "hameed", "armenian", "udm"], km:79, toll:"RM14", tollNote:"2 kereta masuk pulau", fuel:"±RM48", fuelNote:"termasuk larian LTAPP", items:[
        { t:"07:30", type:"move2", title:"Kereta 2 ke LTAPP", kecil:"Syafi pandu, ambil Halima & Kak Ayman", meta:"Homestay ke LTAPP 20 minit. Flight tiba 7.40 pg, pickup 8.00 pg. Dari LTAPP terus ke tempat sarapan, sampai kira-kira 8.45." },
        { t:"07:45", type:"move2", title:"Kereta 1 ke sarapan", kecil:"Wafi pandu. Homestay ke Hutton Lane 12 minit" },
        { t:"08:00", e:"09:00", type:"meal", title:"Roti Bakar Hutton Lane", place:"hutton", pills:["Breakfast"], planB:[{ place:"fizzy", why:"Simpan untuk Isnin." }, { name:"Kopitiam 7 Pagi", rating:4.3, reviews:1430, kei:"Kopitiam, sarapan" }, { name:"Hidden Cafe Kg Tepi Pantai", kei:"Kafe, sarapan" }, { name:"Roti Canai Gemas Road", rating:4.3, reviews:3249, note:"Tutup Isnin.", kei:"Roti canai" }] },
        { move:{ km:6, min:20, via:"Jalan Air Itam" } },
        { t:"09:30", e:"12:00", type:"stop", title:"Penang Hill", place:"hill", planB:[{ name:"Taman Botani Pulau Pinang", why:"Kaki bukit, percuma.", rating:4.5, reviews:8438, kei:"Taman botani di kaki bukit" }, { tiket:true, name:"The Habitat Penang Hill", why:"Atas bukit, RM50 dewasa.", rating:4.4, reviews:4448, kei:"Taman hutan di atas bukit" }, { name:"Pantai Miami", addr:"Batu Ferringhi", rating:4.2, reviews:1613, kei:"Pantai" }, { tiket:true, name:"Tropical Spice Garden", addr:"Teluk Bahang", rating:4.6, reviews:2050, kei:"Taman rempah" }, { tiket:true, name:"Entopia Butterfly Farm", addr:"Teluk Bahang", rating:4.5, reviews:10113, kei:"Taman rama-rama" }] },
        { move:{ km:6, min:20, via:"Jalan Air Itam → Jalan Dato Keramat" } },
        { t:"12:25", e:"13:45", type:"meal", title:"Nasi Kandar Hameediyah", place:"hameed", pills:["Lunch"], flags:[{ k:"info", v:"Zohor 1.17 ptg" }], planB:[{ name:"Kassim Nasi Kandar", rating:4.4, reviews:449, kei:"Nasi kandar" }, { name:"Nasi Kandar Kampong Pisang", addr:"Air Itam", why:"Kalau lapar sebelum turun bukit.", rating:4.9, reviews:21, kei:"Nasi kandar" }] },
        { move:{ km:7, min:18, via:"Jalan Kelawai → Tanjung Tokong" } },
        { t:"14:05", e:"14:40", type:"solat", title:"Masjid Habib", place:"habib", pills:["Solat jamak"], flags:[{ k:"warn", v:"Jalan pusing 40 min" }], planB:[{ text:"Jimat 40 minit: solat di Masjid Kapitan Keling, 4 minit jalan kaki dari Hameediyah, terus ke Armenian Street. Singgah Masjid Habib untuk Maghrib sebelum makan malam — ia di laluan ke Tanjung Tokong/Gurney." }] },
        { move:{ km:7, min:18, via:"Balik ke George Town. Parking tepi jalan di Lebuh Acheh / Lebuh Cannon." } },
        { t:"15:00", e:"16:00", type:"stop", title:"Armenian Street", place:"armenian" },
        { move:{ km:0.6, min:10, walk:true } },
        { t:"16:10", e:"17:15", type:"stop", title:"Upside Down Museum", place:"udm", kecil:"Berhawa dingin, tak terjejas hujan atau panas", planB:[{ place:"trick3d", why:"Muzium gambar 3D berdekatan.", kei:"Muzium gambar 3D, berhawa dingin" }, { place:"kamera", why:"Atas Armenian Street sendiri, tak perlu alih kereta.", kei:"Tour interaktif kamera lama" }, { place:"peranakan", why:"Rumah agam Baba-Nyonya, 5 minit dari sini.", kei:"Rumah agam Baba-Nyonya, RM30 seorang" }, { place:"gurneybay", why:"Kalau nak lapang dan percuma, paling elok menjelang senja.", kei:"Taman tepi laut, taman permainan dan skate park" }, { place:"gurney", why:"Kalau hujan petang.", kei:"Mall di Persiaran Gurney" }] },
        { move:{ km:28, min:45, via:"Lebuhraya Tun Dr Lim Chong Eu → Jambatan Pulau Pinang → Seberang Perai. Kira masa ikut keadaan trafik semasa." } },
        { t:"18:00", e:"19:00", type:"meal", title:"Makan malam bersama Umi Wan", pills:["Dinner"], kecil:"Kawasan Permatang Pauh, di tanah besar", flags:[{ k:"warn", v:"Lokasi tepat belum diputuskan" }], meta:"Kawasan Permatang Pauh sahaja setakat ini — restoran belum dipilih. Akan dikemas kini.", planB:[{ name:"Premium Chinese Muslim Cuisine", rating:4.3, reviews:297, kei:"Masakan Cina Muslim" }, { name:"Tok Ma Malay Kitchen", addr:"George Town", kei:"Masakan Melayu" }, { name:"The Table Penang", rating:4.4, reviews:1025, kei:"Restoran makan malam" }, { name:"Rumah Kacha", rating:4.3, reviews:710, kei:"Restoran makan malam" }, { name:"Jawi House Cafe Gallery", rating:4.5, reviews:1573, kei:"Kafe dan galeri" }, { name:"Halab Penang Arabic Restaurant", addr:"381, Lebuh Chulia, George Town, 10200", rating:4.7, reviews:9178, hours:"Ahad 9.00 pg – 3.00 pg", phone:"+60 4-251 9550", halal:"muslim", note:"Ada tempahan dalam talian dan pakej kumpulan." }, { name:"Penang Steamboat and Grill (The Mualaf Kopitiam)", addr:"63, Persiaran Gurney, 10250", rating:4.2, reviews:538, hours:"Ahad 5.00 ptg – 12.00 pg", phone:"+60 16-408 9122", halal:"muslim", note:"Buffet steamboat dan grill. Parking susah." }, { name:"Restoran Deen (Jelutong)", addr:"598-D & 598-E, Jalan Jelutong, 11600", rating:4.1, reviews:8013, hours:"Ahad 4.30 ptg – 11.30 mlm", phone:"+60 4-657 5285", halal:"muslim", note:"Paling dekat dengan homestay. Parking sangat susah, jalan sempit." }, { name:"Donna Bistro @ Komtar", addr:"Lot 5, Komtar Walk, Jalan Dr Lim Chwee Leong, 10450", rating:4.7, reviews:1359, hours:"Ahad 4.00 ptg – 3.00 pg", phone:"+60 17-565 5079", halal:"muslim", note:"Tempat duduk banyak, kasual." }] },
        { move:{ km:25, min:40, via:"Balik melalui Jambatan Pulau Pinang terus ke Jelutong. Kira masa ikut keadaan trafik semasa." } },
        { t:"19:40", e:"20:20", type:"solat", title:"Tiba homestay", place:"homestay", pills:["Solat jamak"], kecil:"Maghrib masuk 7.21 mlm semasa dalam perjalanan balik" },
        { t:"20:30", e:"21:15", type:"stop", pilihan:true, title:"Karpal Singh Drive", place:"ksd", pills:["Pilihan"], meta:"Sesiapa yang penat boleh terus rehat di homestay. Tak perlu memandu — ia betul-betul di luar homestay." },
        { t:"21:30", type:"homestay", title:"Balik homestay", place:"homestay", planB:[{ tiket:true, name:"Avatar Secret Garden", addr:"Tanjung Tokong", why:"Masih bertenaga: lampu malam.", kei:"Taman lampu malam" }, { name:"Gurney Bay Park", rating:4.5, reviews:893, why:"Basikal pantai.", kei:"Taman tepi laut, sesuai berbasikal" }, { name:"Feringghi Walk", why:"Basikal pantai.", kei:"Laluan tepi pantai, sesuai berbasikal" }] }
    ]},
    { n:3, date:"2026-09-14", label:"Isnin, 14 Sept", short:"Isnin", intro:["Checkout awal walaupun homestay bagi sampai 12 tgh — beg terus masuk kereta.", "Pagi lengang di George Town, dan Queensbay Mall di laluan ke lapangan terbang."], ringkas:["chowrasta", "dimsum", "queensbay"], km:23, toll:"—", fuel:"±RM10", azanTo:"17:15", items:[
        { t:"08:00", e:"08:30", type:"homestay", title:"Checkout", place:"homestay", pills:["Check-out"], kecil:"beg masuk kereta", meta:"Homestay benarkan sampai 12 tgh, tapi kita keluar awal supaya tak patah balik. Semak semua bilik, pengecas, ubat." },
        { move:{ km:4, min:12 } },
        { t:"08:45", e:"09:55", type:"meal", title:"Makan Pagi by Fizzy", place:"fizzy", pills:["Breakfast"], kecil:"Parking di Chowrasta, 3 minit jalan kaki", planB:[{ name:"Kopitiam 7 Pagi", rating:4.3, reviews:1430, kei:"Kopitiam, sarapan" }, { name:"Hidden Cafe Kg Tepi Pantai", kei:"Kafe, sarapan" }] },
        { move:{ km:0.3, min:3, walk:true } },
        { t:"10:00", e:"10:55", type:"stop", title:"Pasar Chowrasta", place:"chowrasta", kecil:"Jeruk Madu Pak Ali" },
        { move:{ km:0.2, min:2, walk:true } },
        { t:"11:00", e:"12:00", type:"meal", title:"Dim Sum Valet", place:"dimsum", pills:["Lunch"], kecil:"Lebuh Keng Kwee. Isnin buka", planB:[{ place:"laksa", why:"Sijil JAKIM ditarik balik Jun 2025, jadi bukan pilihan kalau nak yang bersijil." }, { place:"hameed", why:"Bersijil JAKIM, 6 minit jalan kaki (tapi kita dah makan di sana Hari 2)." }, { name:"Sup Hameed", addr:"Jalan Penang", why:"Sup tulang dan nasi beriani, dekat sini juga.", rating:4, reviews:3113, kei:"Sup tulang dan nasi beriani" }] },
        { move:{ km:11, min:20, via:"Lebuhraya Tun Dr Lim Chong Eu ke Bayan Lepas" } },
        { t:"12:20", e:"14:00", type:"rehat", title:"Queensbay Mall", place:"queensbay", pills:["Solat jamak"], kecil:"rehat, solat Zuhur, beli barang akhir", flags:[{ k:"info", v:"Zohor 1.16 ptg" }], meta:"Berhawa dingin, ada surau untuk solat Zuhur, dan medan selera kalau sesiapa nak makan ringan. 14 minit dari sini ke LTAPP.", planB:[{ text:"Terus ke LTAPP dari Lebuh Keng Kwee (25 minit) kalau semua dah penat — tiba 12.30 tgh, buffer sangat besar." }, { tiket:true, name:"Snake Temple", why:"5 minit dari LTAPP, kalau nak singgah pendek yang lain.", rating:3.9, reviews:1847, kei:"Tokong ular" }] },
        { move:{ km:8, min:14 } },
        { t:"14:15", type:"flight", title:"Tiba LTAPP", place:"lta", kecil:"turunkan Fitri & Fatimah, pulangkan kereta", meta:"Fitri & Fatimah check-in terus untuk flight 4.00 ptg (buffer 1 jam 45 minit). Yang lain pulangkan 2 kereta, kemudian check-in untuk 5.15 ptg." },
        { t:"16:00", type:"flight", title:"Berlepas", pills:["Fitri & Fatimah"], kecil:"AirAsia ke KLIA2" },
        { t:"17:15", type:"flight", title:"Berlepas", pills:["Hadi, Obi, Wafi, Madno, Syafi"], kecil:"AirAsia ke KLIA2" },
        { t:"18:15", type:"flight", title:"Tiba KLIA2", place:"klia2", kecil:"Ambil bagasi, ERL atau kereta balik", meta:"Ambil bagasi, ERL/kereta balik. Tren KLIA Transit ke Salak Tinggi 11 minit, ke Putrajaya 20 minit." }
    ]}
  ],

  // Turutan lokasi untuk garisan laluan peta (mengikut hari)
  routes: {
    1:['lta','beratur','homestay','kgagong','laluna','homestay','padang','homestay'],
    2:['homestay','hutton','hill','hameed','habib','armenian','udm','homestay'],
    3:['homestay','fizzy','chowrasta','dimsum','queensbay','lta']
  },
  // SEMENTARA — bulatan radius untuk memilih tempat makan Hari 2.
  // Buang keseluruhan kunci `bulatan` ini dan bulatan hilang dari peta.
  // Tiada kod lain perlu disentuh. Ia tidak mengubah zum atau bounds peta.
  //
  // hari  : bulatan dipapar pada tapis hari ini DAN pada tapis Semua.
  //         Nilai ini juga menentukan warna — ia mewarisi warna laluan hari
  //         yang sama (--d1/--d2/--d3), dibaca semasa peta dibina. Sengaja
  //         tiada kod warna ditulis di sini supaya ia tidak boleh terpesong
  //         daripada warna laluan sebenar.
  bulatan: {
    hari: 2,
    pusat: { lat:5.3878, lng:100.4085, nama:'Permatang Pauh' },
    radius: [ { km:5 } ]
  },

  // Marker bernombor (satu setiap lokasi berhenti; homestay & LTAPP dipapar berasingan)
  // Larian sampingan yang bukan laluan utama semua orang.
  larian: {
    2: { titik:['homestay','lta','hutton'], label:'Kereta 2 sahaja — ambil Halima & Kak Ayman' }
  },
  markers: {
    1:['beratur','kgagong','laluna','padang'],
    2:['hutton','hill','hameed','habib','armenian','udm'],
    3:['fizzy','chowrasta','dimsum','queensbay']
  },

  // Kereta: layout Staria 10 seat, 4 baris 2-3-2-3 (baris 1 = penumpang depan + pemandu di kanan).
  // Nilai seat: 'ID:Nama' atau 'ID:Nama:D' (starting driver), 'BEG' = ruang bagasi, '' = kosong.
  carFoot: 'Boleh rotate seat sepanjang jalan.',
  carNote: 'Hyundai Staria 10 seat, diesel. Sudah tempah — bayar semasa ambil di LTAPP.',
  carTips: [
    'Anak kecil lebih baik di baris 2 dan 3, bukan baris belakang sekali. Baris belakang paling banyak terasa gegaran dan paling mudah buat budak mabuk perjalanan.',
    'Sesiapa yang mudah mabuk perjalanan letak di baris 1 atau 2, pandang ke hadapan, dan buka tingkap sedikit.',
    'Baris 3 ialah kerusi kapten dengan lorong di tengah, jadi paling senang keluar masuk. Sesuai untuk sesiapa yang kerap perlu bergerak, contohnya menjaga bayi atau berhenti ke tandas.',
    'Baris belakang paling sesuai untuk orang dewasa dan beg.',
    'Untuk perjalanan panjang ke Kampung Agong, tukar tempat selepas berhenti supaya tiada seorang terperap di baris belakang sepanjang hari.'
  ],
  carRows: [2,3,2,3],
  carScenarios: [
    { id:'tiba', tab:'Ketibaan', sub:'15 orang', when:'Sabtu 12 Sept, dari LTAPP', pax:15,
      note:'Baris belakang kedua-dua kereta dilipat untuk beg. Keluarga Muhd belum join — mereka jumpa kita di homestay.',
      cars:[
        { name:'Kereta 1', driver:'Wafi', seats:['F4:Nadian','F4:Wafi:D', 'F2:Hadi','F2:Kak Hajar','F2:Hud', 'F2:Hana','G2:Fatimah', 'BEG','BEG','BEG'] },
        { name:'Kereta 2', driver:'Syafi', stroller:2, seats:['F3:Obi','S1:Syafi:D', 'F3:Kak Yusra + Annur::Annur','F3:Nasrullah','F3:Maryam', 'G2:Madno','G2:Fitri', 'BEG','BEG','BEG'] }
      ] },
    { id:'cuti', tab:'Semasa bercuti', sub:'21 orang', when:'Sabtu petang – Isnin pagi', pax:21,
      note:'Beg tinggal di homestay, jadi semua seat boleh diguna. 21 orang dalam 20 seat — muat sebab Annur dipangku Kak Yusra.',
      cars:[
        { name:'Kereta 1', driver:'Wafi', seats:['F4:Nadian','F4:Wafi:D', 'F2:Hadi','F2:Kak Hajar','F2:Hud', 'F2:Hana','G2:Fatimah', 'G2:Fitri','G1:Halima','G1:Kak Ayman'] },
        { name:'Kereta 2', driver:'Syafi', stroller:2, seats:['F3:Obi','S1:Syafi:D', 'F3:Kak Yusra + Annur::Annur','F3:Nasrullah','F3:Maryam', 'G2:Madno','F1:Muhd', 'F1:Kak Salina','F1:Khadijah','F1:Alisha'] }
      ] },
    { id:'balik', tab:'Berlepas', sub:'17 terbang', when:'Isnin 14 Sept, ke LTAPP', pax:17,
      note:'Beg naik semula, jadi baris belakang Kereta 1 dilipat. Keluarga Muhd bawa kereta sendiri untuk hantar kita dan angkut beg yang tak muat.',
      cars:[
        { name:'Kereta 1', driver:'Wafi', seats:['F4:Nadian','F4:Wafi:D', 'F2:Hadi','F2:Kak Hajar','F2:Hud', 'F2:Hana','G2:Fatimah', 'BEG','BEG','BEG'] },
        { name:'Kereta 2', driver:'Syafi', stroller:2, seats:['F3:Obi','S1:Syafi:D', 'F3:Kak Yusra + Annur::Annur','F3:Nasrullah','F3:Maryam', 'G2:Madno','G2:Fitri', 'G1:Halima','G1:Kak Ayman','BEG'] }
      ],
      third:{ g:'F1', driver:'Muhd', who:'Keluarga Muhd', text:'Guna kenderaan sendiri pulang ke tanah besar.' } }
  ],

  stay: {
    name:'Homestay Karpal Singh Drive',
    addr:'12, Lebuh Sungai Pinang 3, Karpal Singh Drive, Jelutong, 11600 George Town',
    // facts sengaja kosong: bilik tidur, katil, bilik air dan tingkat
    // semuanya dikira dari `tingkat` pada masa jalan dan disisip di sini.
    facts:[],
    images:[
      { src:'img/frontviewhome.avif', alt:'Pemandangan hadapan homestay', w:1440, h:960 },
      { src:'img/postbox.webp', alt:'Peti surat di hadapan rumah', w:1440, h:960 },
      { src:'img/backviewhome.avif', alt:'Pemandangan belakang homestay', w:1440, h:960 },
      { src:'img/backviewhome2.avif', alt:'Pemandangan belakang homestay dari sudut lain', w:1440, h:1920 },
      { src:'img/1stfloor.avif', alt:'Tingkat satu homestay', w:1440, h:960 },
      { src:'img/hall1.avif', alt:'Ruang tamu', w:1440, h:960 },
      { src:'img/hall2.avif', alt:'Ruang tamu dari sudut lain', w:1440, h:960 },
      { src:'img/hallconnecttodining.avif', alt:'Ruang tamu bersambung ke ruang makan', w:1440, h:960 },
      { src:'img/dining1.avif', alt:'Ruang makan', w:1440, h:960 },
      { src:'img/kitchen1.jpeg', alt:'Dapur', w:1440, h:960 },
      { src:'img/kitchen2.avif', alt:'Dapur dari sudut lain', w:1440, h:960 },
      { src:'img/bed1.avif', alt:'Bilik tidur 1', w:1440, h:960 },
      { src:'img/bed2.avif', alt:'Bilik tidur 2', w:1440, h:960 },
      { src:'img/bed3.avif', alt:'Bilik tidur 3', w:1440, h:960 },
      { src:'img/bed4.avif', alt:'Bilik tidur 4', w:1440, h:960 },
      { src:'img/bed5.avif', alt:'Bilik tidur 5', w:1440, h:960 },
      { src:'img/bed6.avif', alt:'Bilik tidur 6', w:1440, h:960 },
      { src:'img/bed7.avif', alt:'Bilik tidur 7', w:1440, h:960 },
      { src:'img/bed8.avif', alt:'Bilik tidur 8', w:1440, h:960 },
      { src:'img/bed9.avif', alt:'Bilik tidur 9', w:1440, h:960 },
      { src:'img/laundry-toilet.avif', alt:'Ruang dobi dan tandas', w:1440, h:960 }
    ],
    checkin:'3.00 ptg (minta awal)', checkout:'12.00 tgh (kita keluar 8.30 pg)',
    // Agihan bilik ikut tingkat. Susunan tingkat sebahagian daripada maklumat,
    // jadi ia disimpan bertingkat, bukan sebagai senarai rata.
    // siapa: id kumpulan (label diambil dari DATA.groups supaya nama sama di
    // seluruh halaman) atau nama individu. Bilangan penghuni, bilik dan tingkat
    // semuanya dikira dari struktur ini, tiada satu pun ditulis tetap.
    tingkat:[
      { aras:'Ground floor', bilik:[
        { n:1, katil:'1 queen', air:'bath-sendiri', siapa:['Halima','Kak Ayman'], nota:'Day 2 baru masuk.' },
        { n:2, katil:'1 queen', air:'bath-sendiri', siapa:['Fatimah','Hana'] }
      ]},
      { aras:'1st floor',
        // Kad ruang sepunya: bukan bilik tidur, jadi ia tidak masuk kiraan
        // `bilik`. Bath-nya dikira dalam tally tingkat dan jumlah bilik air.
        ruang:{ air:1, item:[['sofa','Ruang tamu'],['kutleri','Ruang makan'],['dapur','Dapur']] },
        bilik:[
        { n:3, katil:'1 super single', air:'bath-asing', bilikAir:0, siapa:['Madno'], nota:'Bilik air di dapur, aras yang sama.' }
      ]},
      { aras:'2nd floor', bilik:[
        { n:4, katil:'2 king', katilNota:'ada bathtub', air:'bath-sendiri', siapa:['F1'] },
        { n:5, katil:'2 super single', katilNota:'shower sahaja', air:'shower-sendiri', siapa:['S1'] },
        { n:6, katil:'3 super single', air:'bath-asing', siapa:['Fitri','Hud'], nota:'Bilik air di luar bilik, aras yang sama.' }
      ]},
      { aras:'3rd floor', bilik:[
        { n:7, katil:'1 queen', air:'bath-sendiri', siapa:['Hadi','Kak Hajar'] },
        { n:8, katil:'1 king', air:'bath-sendiri', siapa:['F4'] },
        { n:9, katil:'1 king + 1 super single', air:'bath-sendiri', siapa:['F3'] }
      ]}
    ]
  },



  // Harga bagasi AirAsia domestik (AK), setiap orang setiap sektor sehala.
  bagasi: {
    note:'Harga bagasi sama di KLIA2 dan LTAPP — ia dikira setiap orang setiap sektor sehala, bukan ikut lapangan terbang. AirAsia guna harga dinamik: ia berubah ikut laluan, tarikh dan berapa awal awak beli, jadi tiada senarai harga tetap yang boleh dipercayai. Semak harga sebenar dalam app AirAsia MOVE di bawah "My Bookings" untuk tarikh awak.',
    ladder:[
      ['Paling murah', 'Semasa tempahan asal — tambah bagasi serentak dengan beli tiket'],
      ['Lebih mahal', 'Selepas tempah, melalui app atau laman web sebelum hari penerbangan'],
      ['Paling mahal', 'Di kaunter lapangan terbang pada hari itu — elak ini'],
      ['Bahaya', 'Beg ditahan di pintu masuk pesawat kerana melebihi saiz kabin']
    ],
    rules:[
      ['Bagasi kabin percuma', '7 kg semua orang: 1 beg 56 × 36 × 23 cm + 1 barang bawah kerusi 40 × 30 × 10 cm'],
      ['Bagasi check-in', 'Mesti dibeli awal. Tingkatan bermula 15 kg untuk domestik, sehingga 60 kg'],
      ['Had setiap beg', 'Tiada beg boleh melebihi 32 kg, walaupun jumlah kuota awak lebih'],
      ['Saiz maksimum beg', '119 × 81 × 119 cm'],
      ['Bilangan beg', 'Tiada had bilangan, asalkan jumlah berat dalam kuota yang dibeli']
    ],
    tip:'Untuk 15 orang, cara paling jimat ialah kongsi kuota: beli satu kuota besar untuk satu tempahan dan masukkan beberapa beg di bawahnya, bukan beli 15 kuota kecil berasingan. Timbang beg di rumah dahulu.'
  },

  // Kos jalan raya
  ucapan:{ sebelum:'Selamat Bercuti', selepas:'Selamat Pulang', tarikh:'2026-09-15' },

  routeNote:'Waktu puncak dan trafik jambatan boleh tambah 15-20 minit.',

  // Apa yang berubah, ditulis untuk ahli keluarga. Terbaru di atas.
  // Entri boleh guna 'items' (senarai ringkas) atau 'kumpulan' (bertajuk).
  // Apa yang berubah, untuk ahli keluarga. Terbaru di atas.
  // Catat perubahan besar sahaja: tempat, masa, susunan orang, seksyen baru.
  changelog: [
    { v:'8.1', tarikh:'11 September 2026',
      ganti:[
        { sebelum:'Keluarga Hadi: ERL dari Salak Tinggi, dari Cyberjaya', selepas:'Pandu terus ke KLIA2, dari Seremban' }
      ]},
    { v:'8.0', tarikh:'11 September 2026',
      ganti:[
        { sebelum:'Dua penerbangan pergi Sabtu: AK6154 dan AK6142', selepas:'Satu penerbangan sahaja: AK6142, 15 orang' }
      ]},
    { v:'7.0', tarikh:'10 September 2026',
      ganti:[
        { sebelum:'Makan malam Umi Wan 8.00 malam', selepas:'Petang 6.00 di kawasan Permatang Pauh' },
        { sebelum:'Syafi naik AK6154', selepas:'Syafi naik AK6142, sama dengan Fatimah dan Fitri' }
      ],
      baru:[
        'Karpal Singh Drive berpindah ke malam, selepas balik dari Permatang Pauh.',
        'Hari 2 kini merentas jambatan dua kali — 79 km, bukan 30 km.'
      ]},
    { v:'6.2', tarikh:'9 September 2026', baru:[
      'Makan malam bersama Umi Wan ada Plan B: Halab Arabic, Penang Steamboat and Grill, Restoran Deen dan Donna Bistro.'
    ]},
    { v:'6.0', tarikh:'9 September 2026', baru:[
      'Agihan bilik dikemas kini: nama penghuni setiap bilik, susunan katil, dan status bilik air sendiri atau kongsi.'
    ]},
    { v:'5.5', tarikh:'6 September 2026', baru:[
      'Selepas 15 September, halaman bertukar keadaan selesai: bar Trip selesai di atas dengan ringkasan angka, dan ucapan penutup Selamat Pulang.'
    ]},
    { v:'5.4', tarikh:'6 September 2026', baru:[
      'Penunjuk langsung penerbangan: pil bertukar LIVE dan satu bar muncul di atas halaman semasa flight dalam perjalanan.',
      'Kiraan pax Isnin tidak lagi berkata semua balik petang.'
    ]},
    { v:'5.3', tarikh:'6 September 2026', baru:[
      'Halima & Kak Ayman tiba LTAPP 7.40 pg, pickup Kereta 2 pukul 8.00 pg.'
    ]},
    { v:'5.1', tarikh:'6 September 2026', baru:[
      'Semua nombor penerbangan kini disahkan: AK6154, AK6142, AK6124, AK6131 dan AK6129.',
      'Halima & Kak Ayman tiba Ahad 7.40 pg, bukan 8.00 pg.',
      'Fitri & Fatimah ada nombor penerbangan sendiri, waktu sama dengan yang lain.'
    ]},
    { v:'4.7', tarikh:'5 September 2026', baru:[
      'Keluarga Hadi dan Keluarga Obi kini satu cara sahaja — ERL dari Salak Tinggi. Tiada lagi pilihan lain untuk dipilih.',
      'Harga tiket Upside Down Museum dan muzium Plan B lain sudah ada dalam seksyen Kos.'
    ]},
    { v:'4.6', tarikh:'5 September 2026', baru:[
      'Titik mula setiap keluarga dikemas kini: Keluarga Hadi dari Cyberjaya, Keluarga Obi dari Seremban.',
      'Keluarga Wafi kini pandu terus ke KLIA2, tidak lagi guna ERL.',
      'Syafi ada dua pilihan: ikut kereta Keluarga Wafi, atau ERL dari Putrajaya Sentral.',
      'Waktu bertolak kini berbeza ikut kumpulan — lihat Pagi Sabtu: cara ke KLIA2.'
    ]},
    { v:'4.5', tarikh:'5 September 2026',
      ganti:[
        { sebelum:'Chew Jetty', selepas:'Upside Down Museum' }
      ],
      baru:[
        'Chew Jetty ditukar kerana kebakaran 5 September memusnahkan premis berhampiran jeti.',
        'Petang Ahad ada pilihan jalan-jalan tepi laut di Karpal Singh Drive, betul-betul luar homestay.'
      ]},
    { v:'4.3', tarikh:'4 September 2026', baru:[
      'Gambar homestay boleh dilihat terus dalam halaman.',
      'Peta hari Ahad tunjuk larian Kereta 2 ke lapangan terbang.'
    ]},
    { v:'3.0', tarikh:'3 September 2026',
      ganti:[
        { sebelum:'Mentari Pagi', selepas:'Nasi Kandar Beratur 786' },
        { sebelum:'PakTeh Fruits', selepas:'La Luna' }
      ],
      baru:[
        'Pelan tempat duduk kedua-dua kereta dengan nama setiap orang.',
        'Agihan bilik homestay.',
        'Setiap tempat ada Plan B kalau penuh atau tutup.',
        'Waktu solat, anggaran kos, dan senarai barang bawa.'
      ]}
  ],
  jalan: {
    km:'Laluan utama 228 km sebuah kereta (126 Hari 1 + 79 Hari 2 + 23 Hari 3). Kereta 2 tambah lebih kurang 35 km untuk ambil Halima & Kak Ayman di LTAPP hari Ahad. Jumlah kedua-dua kereta: lebih kurang 491 km, iaitu 49.1 liter pada 10 liter setiap 100 km.',
    bahanapi:[
      { jenis:'Diesel, subsidi BUDI', harga:'RM2.10', kereta:'RM53', total:'RM106' },
      { jenis:'Diesel, harga pasaran', utama:true, harga:'RM4.62', kereta:'RM116', total:'RM232' },
      { jenis:'RON95, subsidi BUDI95', harga:'RM1.99', kereta:'RM50', total:'RM100' },
      { jenis:'RON95, harga pasaran', harga:'RM3.82', kereta:'RM96', total:'RM192' }
    ],
    tolrows:[
      { apa:'Jambatan Pulau Pinang, kelas 1', kadar:'RM7.00 sekali masuk', bila:'Hari 1 balik dari Penaga, Hari 2 balik dari Permatang Pauh', total:'RM28 (2 kereta, 2 kali)' },
      { apa:'Keluar ke tanah besar', kadar:'Percuma', bila:'Tiada tol arah keluar', total:'RM0' }
    ],
    notaFuel:'Staria guna diesel. Kadar subsidi BUDI hanya terpakai kalau pemandu sahkan dengan MyKad di pam.',
    nota:'Harga bahan api berubah setiap Rabu. Angka di atas ialah kadar Ogos 2026. Subsidi BUDI disahkan dengan MyKad di pam, kuota 200 liter sebulan.',
    rental:'Kebanyakan syarikat sewa guna dasar penuh-ke-penuh: ambil tangki penuh, pulangkan penuh. Isi minyak di stesen berhampiran LTAPP sebelum pulangkan, dan simpan resit.'
  },



  costs:[
    { grp:'pinang', item:'Penang Hill (pergi-balik, MyKad)', dewasa:'RM16', kanak:'RM8', note:'Express lane RM40 / RM20. Beli online sales.penanghill.gov.my.' },
    { grp:'pinang', item:'Kampung Agong', dewasa:'RM10', kanak:'RM5', note:'Bawah 4 tahun percuma. Kostum tradisional RM30.' },
    { grp:'pinang', item:'Queensbay Mall', dewasa:'Percuma', kanak:'Percuma', note:"Parking kadar mall biasa. Ada surau dan medan selera." },
    { grp:'pinang', item:'Armenian Street, Chowrasta', dewasa:'Percuma', kanak:'Percuma', note:"Parking tepi jalan 60 sen / 30 minit. Chowrasta ±RM1 sejam." },
    { grp:'pinang', item:'Upside Down Museum', dewasa:'±RM26', kanak:'±RM14', note:"Bukan MyKad RM36 / RM26. Masuk terakhir 5.45 ptg. Sahkan di kaunter." },
    { grp:'pinang', item:'Penang 3D Trick Art Museum', dewasa:'RM18', kanak:'RM12', note:"Bukan MyKad RM28 / RM18. Kanak-kanak 4–12 tahun. Plan B Hari 2." },
    { grp:'pinang', item:'Pinang Peranakan Mansion', dewasa:'RM20', kanak:'Percuma', note:"Bawah 6 tahun percuma. Ada ulasan sebut RM30 — sahkan di kaunter. Plan B Hari 2." },
    { grp:'pinang', item:'Asia Camera Museum', dewasa:'Semak sendiri', kanak:'Semak sendiri', note:"Harga tidak disahkan — semak di premis. Plan B Hari 2." },
    { grp:'pergi', item:'KLIA Transit Salak Tinggi → KLIA2', dewasa:'RM4.90', kanak:'RM2.20', note:'Kanak-kanak 6–15 tahun. Bawah 6 percuma. 11 minit.' },
    { grp:'pergi', item:'KLIA Transit Putrajaya → KLIA2', dewasa:'RM9.40', kanak:'RM4.20', note:'20 minit.' },
    { grp:'pergi', item:'KLIA Ekspres / Transit KL Sentral → KLIA2', dewasa:'RM55', kanak:'RM25', note:'33–39 minit. Online 10% lebih murah.' },
    { grp:'pergi', item:'Parking Salak Tinggi Park & Ride (Sab–Isn)', dewasa:'RM30–36', kanak:'—', note:'RM3 siang, RM9 malam pertama (berbumbung, terbuka RM7), RM12 / RM10 sehari seterusnya.' },
    { grp:'pergi', item:'Parking Gateway@klia2 (Sab–Isn)', dewasa:'RM165', kanak:'—', note:'Jalan terus ke terminal.' },
    { grp:'pergi', item:'Parking KLIA Long Term Car Park (Sab–Isn)', dewasa:'RM27–32 sehari', kanak:'—', note:'Shuttle percuma ke KLIA2 setiap 10–15 minit.' },
    { grp:'balik', item:'Parking LTAPP', dewasa:'RM3 sejam', kanak:'—', note:'Untuk keluarga Muhd jika hantar/ambil.' }
  ],

  rain:[
    { when:'Hari 1 petang', plan:'Hujan lebat sebelum gerak ke Kampung Agong: tukar dengan OLO Studio (Jelutong, 5 minit dari homestay) dan gerak ke Esplanade lebih awal — sempat Hameed Pata sebelum 8 mlm.' },
    { when:'Hari 2 petang', plan:'Upside Down Museum berhawa dingin dan berbumbung — hujan tidak menjejaskannya. Kalau nak tukar juga, Penang 3D Trick Art Museum atau Gurney Plaza. Penang Hill pagi biasanya selamat.' },
    { when:'Hari 2 malam', plan:'Gurney Plaza kalau makan malam Umi Wan ditunda atau hujan tak berhenti.' },
    { when:'Hari 3 pagi', plan:'Chowrasta, Dim Sum Valet dan Queensbay Mall semuanya berbumbung — Hari 3 selamat walaupun hujan.' },
    { when:'Habis awal mana-mana hari', plan:'Hari 1: Jeruk Madu Pak Ali. Hari 2: Avatar Secret Garden (malam), Feringghi Walk. Hari 3: tambah masa di Queensbay Mall sebelum ke LTAPP.' }
  ],

  checklist:[
    { i:'id', t:'MyKad semua orang', nota:'Kadar tempatan di Penang Hill dan Kampung Agong' },
    { i:'id', t:'MyKid anak-anak', nota:'Untuk tiket kanak-kanak' },
    { i:'solat', t:'Telekung dan sejadah kecil', nota:'Banyak solat jamak di masjid dan surau' },
    { i:'hujan', t:'Payung lipat atau baju hujan', nota:'September musim peralihan monsun' },
    { i:'panas', t:'Topi, sunblock, botol air', nota:'Kampung Agong terdedah dan panas tengah hari' },
    { i:'kad', t:'Touch ’n Go', nota:'Tol jambatan dan parking Salak Tinggi. App Penang Smart Parking untuk tepi jalan George Town' },
    { i:'bateri', t:'Powerbank dan kabel', nota:'Hari panjang, peta makan bateri' },
    { i:'ubat', t:'Ubat asas dan plaster', nota:'Termasuk ubat sendiri' },
    { i:'kasut', t:'Kasut selesa', nota:'Armenian Street dan Pasar Chowrasta banyak jalan kaki' },
    { i:'snek', t:'Snek dan air budak-budak', nota:'Terutama larian ke Penaga' },
    { i:'beg', t:'Beg kecil kosong', nota:'Buah tangan Chowrasta. Timbang beg sebelum balik' },
    { i:'tiket', t:'Screenshot tiket AirAsia dan Penang Hill', nota:'Signal lemah atas bukit' }
  ]

};
