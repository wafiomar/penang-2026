/* ============================================================
   DATA — edit bahagian ini sahaja. Format masa: "HH:MM" (24 jam).
   ============================================================ */
const DATA = {
  trip: {
    title: 'Pulau Pinang',
    start: '2026-09-12',
    dates: '12 – 14 September 2026',
    base: 'Homestay Karpal Singh Drive',
    updated: '3 September 2026, 8.03 pagi',
    version: 'v2.1'
  },

  // Kumpulan. color = warna pada carta pergerakan, tempat duduk & bilik.
  groups: [
    { id:'F1', name:'Muhd',   label:'Keluarga Muhd',   short:'Kel. Muhd', pax:4, who:'2 dewasa, 2 kanak-kanak', color:'#6F5BB8', from:'Sudah di Pulau Pinang', members:['Muhd','Kak Salina','Khadijah','Alisha'] },
    { id:'F2', name:'Hadi',   label:'Keluarga Hadi',   short:'Kel. Hadi', pax:4, who:'2 dewasa, 2 kanak-kanak', color:'#2B8C8C', from:'ERL Salak Tinggi',       members:['Hadi','Kak Hajar','Hud','Hana'] },
    { id:'F3', name:'Obi',    label:'Keluarga Obi',    short:'Kel. Obi',  pax:5, who:'2 dewasa, 3 kanak-kanak', color:'#C98A1D', from:'ERL Salak Tinggi',       members:['Obi','Kak Yusra','Nasrullah','Maryam','Annur'] },
    { id:'F4', name:'Wafi',   label:'Keluarga Wafi',   short:'Kel. Wafi', pax:2, who:'2 dewasa',                color:'#2F5AA8', from:'ERL Salak Tinggi / parking KLIA2', members:['Wafi','Nadian'] },
    { id:'G1', name:'Halima', label:'Halima & Kak Ayman', short:'Halima & Ayman', pax:2, who:'2 dewasa',        color:'#C4507A', from:'ERL Putrajaya / Salak Tinggi', members:['Halima','Kak Ayman'], arriveDay:2 },
    { id:'G2', name:'Fitri',  label:'Fitri, Madno & Fatimah', short:'Fitri, Madno, Fatimah', pax:3, who:'3 dewasa', color:'#7B8F2A', from:'ERL KL Sentral / Grab',  members:['Fitri','Madno','Fatimah'] },
    { id:'S1', name:'Syafi',  label:'Syafi',           short:'Syafi',     pax:1, who:'1 dewasa',                color:'#6B7280', from:'ERL Putrajaya / Salak Tinggi / carpool Wafi', members:['Syafi'] }
  ],

  flights: [
    { date:'12 Sept (Sabtu)', dep:'09:25', arr:'10:20', from:'KUL', to:'PEN', fromName:'KLIA2', toName:'Pulau Pinang', flightNo:'AK6154', who:['F2','F3','F4','G2','S1'], note:'Fitri & Fatimah tempahan berasingan, penerbangan sama masa. 15 orang.' },
    { date:'13 Sept (Ahad)',  dep:'07:05', arr:'08:00', from:'KUL', to:'PEN', fromName:'KLIA2', toName:'Pulau Pinang', flightNo:'', who:['G1'], est:true, note:'Waktu berlepas 7.05 pg ialah anggaran — dikira dari waktu tiba 8.00 pg tolak 55 minit masa penerbangan. Sahkan pada tiket sebenar. Kereta 2 ambil mereka di LTAPP.' },
    { date:'14 Sept (Isnin)', dep:'16:00', arr:'', from:'PEN', to:'KUL', fromName:'Pulau Pinang', toName:'KLIA2', flightNo:'', who:['G2:Fitri','G2:Fatimah'], note:'Fitri & Fatimah sahaja. Masa tiba dan nombor penerbangan: isi bila ada.' },
    { date:'14 Sept (Isnin)', dep:'17:15', arr:'18:15', from:'PEN', to:'KUL', fromName:'Pulau Pinang', toName:'KLIA2', flightNo:'', who:['F2','F3','F4','G1','G2:Madno','S1'], note:'Semua yang lain. Nombor penerbangan balik: isi bila ada.' }
  ],

  cutoff: {
    title:'Pukul berapa disarankan sampai KLIA2',
    rows:[
      { t:'06:00', l:'Kalau ada bagasi check-in', d:'Disarankan 3 jam sebelum berlepas. Beri ruang untuk kaunter bagasi, tag beg dan barisan keselamatan.' },
      { t:'07:00', l:'Kalau cabin sahaja', d:'Disarankan 2 jam sebelum berlepas. Terus ke keselamatan, tiada kaunter bagasi.' }
    ],
    foot:'Ini saranan, bukan syarat rasmi AirAsia — ia ruang selamat berdasarkan pengalaman orang lain dengan kumpulan besar dan anak kecil. Kedua-duanya untuk penerbangan 9.25 pg. Halima & Kak Ayman hari Ahad guna kiraan sama dari waktu berlepas mereka.'
  },

  // Cara ke KLIA2 pagi Sabtu, ikut kumpulan
  // Cara ke KLIA2 pagi Sabtu. Setiap kumpulan pilih SATU pilihan.
  klRule:'Setiap keluarga pilih satu pilihan sahaja. Dua pilihan bertanda "berkait" mengubah pilihan kumpulan lain — baca notanya sebelum pilih.',
  klSide: [
    { g:'F2', title:'Keluarga Hadi', sub:'4 orang', opts:[
      { k:'A', name:'ERL dari Salak Tinggi', main:true, lines:[
        'Pandu ke Salak Tinggi Park & Ride (berbumbung, 812 petak). Parking Sabtu–Isnin lebih kurang RM36 berbumbung atau RM30 terbuka. Bayar Touch \u2019n Go atau kad.',
        'KLIA Transit ke KLIA2: 11 minit. RM4.90 dewasa, RM2.20 kanak-kanak 6–15 tahun, bawah 6 percuma.',
        'Hujung minggu tren setiap 30 minit, tren pertama 5.00 pg. Naik tren 5.00 pg atau 5.30 pg supaya sampai KLIA2 sebelum 6.00 pg.'
      ]},
      { k:'B', name:'Ikut kereta Keluarga Wafi terus ke KLIA2', lines:[
        'Tanpa ERL langsung. Jimat masa dan tambang, tapi kereta jadi 6 orang.',
        'Perlu kereta 7 tempat dan ruang beg untuk 6 orang — sahkan dengan Wafi dahulu.'
      ], link:'Kalau Hadi pilih B: Keluarga Wafi guna Pilihan B atau C, dan Syafi guna Pilihan D.' }
    ]},
    { g:'F3', title:'Keluarga Obi', sub:'5 orang', opts:[
      { k:'A', name:'ERL dari Salak Tinggi', main:true, lines:[
        'Sama seperti Keluarga Hadi: Salak Tinggi Park & Ride, kemudian KLIA Transit 11 minit.',
        'Tambang RM4.90 dewasa, RM2.20 kanak-kanak. Tiga anak — beli tiket di kaunter atau mesin sebelum masuk gate.',
        'Sasar tren 6.00 pg.'
      ]},
      { k:'B', name:'Pandu sendiri terus ke KLIA2', lines:[
        '5 orang dan beg dalam satu kereta, tiada pindah-pindah beg di stesen.',
        'Parking Gateway@klia2 RM55 sehari, 3 hari lebih kurang RM165. Atau KLIA Long Term Car Park RM27–32 sehari dengan shuttle percuma setiap 10–15 minit.',
        'Bertolak dari rumah lebih kurang 4.30 pg supaya sampai KLIA2 sebelum 6.00 pg.'
      ]}
    ]},
    { g:'F4', title:'Keluarga Wafi + Syafi', sub:'3 orang', opts:[
      { k:'A', name:'Salak Tinggi Park & Ride + ERL', main:true, lines:[
        'Parking lebih kurang RM36 untuk 3 hari, tambang RM4.90 seorang sehala.',
        'Syafi carpool dengan Wafi dari Cyberjaya ke Salak Tinggi.'
      ]},
      { k:'B', name:'Parking Gateway@klia2', lines:[
        'RM55 sehari, 3 hari lebih kurang RM165. Jalan terus ke terminal, tiada tren.'
      ]},
      { k:'C', name:'KLIA Long Term Car Park', lines:[
        'RM27–32 sehari, jadi lebih kurang RM90 untuk 3 hari. Shuttle percuma ke KLIA2 setiap 10–15 minit.'
      ]},
      { k:'D', name:'Syafi naik ERL Putrajaya sendiri', lines:[
        'Putrajaya Sentral ke KLIA2: 20 minit, RM9.40. Tren pertama 5.22 pg. Parking Putrajaya Sentral lebih kurang RM12 sehari.'
      ], link:'Guna D hanya kalau Keluarga Hadi pilih B. Ketika itu Keluarga Wafi akan pilih Pilihan B atau C.' }
    ]},
    { g:'G2', title:'Fitri, Madno & Fatimah', sub:'3 orang', opts:[
      { k:'A', name:'ERL dari KL Sentral', main:true, lines:[
        'KLIA Ekspres 33 minit tanpa henti, atau KLIA Transit 39 minit. RM55 dewasa sehala, tiket online 10% lebih murah.',
        'KLIA Ekspres pertama 5.00 pg dari KL Sentral, tiba KLIA2 5.33 pg — itu satu-satunya tren yang sempat untuk had 6.00 pg.'
      ]},
      { k:'B', name:'Grab terus ke KLIA2', lines:[
        'Turun di pintu berlepas Aras 3. Kos berubah ikut permintaan, biasanya lebih mahal daripada ERL untuk 3 orang.'
      ]}
    ]},
    { g:'G1', title:'Halima & Kak Ayman', sub:'Ahad pagi, 2 orang', opts:[
      { k:'A', name:'ERL dari Putrajaya', main:true, lines:[
        'Putrajaya Sentral ke KLIA2: 20 minit, RM9.40 dewasa. Parking Putrajaya Sentral lebih kurang RM12 sehari.',
        'Tren pertama hari Ahad 5.22 pg, tiba KLIA2 5.42 pg — lebih kurang 1 jam 20 minit sebelum berlepas, memadai untuk cabin sahaja.'
      ]},
      { k:'B', name:'Dihantar atau Grab terus ke KLIA2', lines:[
        'Tiada parking untuk dibayar dan boleh sampai lebih awal.',
        'Pilih ini kalau ada bagasi check-in, sebab ERL pertama terlalu lewat untuk saranan 3 jam.'
      ]}
    ], foot:'Waktu berlepas 7.05 pg ialah anggaran — sahkan pada tiket sebenar. Kereta 2 (Syafi) tunggu di pintu ketibaan LTAPP pada 8.00 pg Ahad.' }
  ],

  // Lokasi. Koordinat dari Google Places.
  places: {
    klia2:     { name:"KLIA2", lat:2.7442, lng:101.6858, addr:"Sepang, Selangor", kind:"plane" },
    lta:       { name:"Lapangan Terbang Antarabangsa Pulau Pinang (LTAPP)", lat:5.296, lng:100.2752, addr:"Bayan Lepas", kind:"plane", tips:"Parking RM3 sejam, maksimum RM33 sehari." },
    homestay:  { name:"Homestay Karpal Singh Drive", lat:5.3967, lng:100.3279, addr:"12, Lebuh Sungai Pinang 3, Jelutong, 11600 George Town", kind:"home" },
    beratur:   { name:"Nasi Kandar Beratur 786", lat:5.2993, lng:100.2671, addr:"1-1-11 Summerskye Residence, Jalan Sungai Tiram 8, Bayan Lepas", hours:"9.00 pg – 11.00 mlm, setiap hari", halal:"muslim", rating:4.2, reviews:1283, tagline:"Nasi kandar berhawa dingin, giliran bergerak laju", special:"Nasi kandar. Ayam goreng digoreng di depan.", tips:"6 minit dari LTAPP. Berhawa dingin, tempat duduk betul, tak seperti gerai asal yang panas. Giliran bergerak laju sebab ramai staf." },
    sofea:     { name:"Mentari Pagi by Sofea", lat:5.2978, lng:100.2641, addr:"Jalan Mahkamah, Bayan Lepas", hours:"8.00 pg – 1.00 tgh", halal:"muslim", rating:3.1, reviews:343, tagline:"Tiga minit dari LTAPP, tutup 1.00 tengah hari", tips:"3 minit dari LTAPP, jadi terus ke sini lepas ambil kereta. Tutup 1.00 tgh — kalau flight lewat atau kereta sewa lambat, terus guna Plan B." },
    queensbay: { name:"Queensbay Mall", lat:5.3331, lng:100.307, addr:"100, Persiaran Bayan Indah, Bayan Lepas", hours:"10.30 pg – 10.30 mlm", rating:4.4, reviews:26288, tagline:"Mall terbesar Pulau Pinang, ada surau dan medan selera", special:"Mall terbesar Pulau Pinang, berhawa dingin, ada surau dan medan selera besar.", tips:"12 minit ke LTAPP. Parking bertingkat percuma beberapa jam pertama." },
    kgagong:   { name:"Kampung Agong", lat:5.5396, lng:100.3791, addr:"841 Kampung Bakar Kapor, 13100 Penaga", hours:"9.00 pg – 6.00 ptg", rating:4.5, reviews:5928, cost:"RM10 dewasa, RM5 kanak-kanak 4–12 tahun, bawah 4 percuma. Sewa kostum tradisional RM30, slot terhad.", tagline:"Di tanah besar, seberang jambatan", tips:"Tanah besar, seberang jambatan. Panas tengah hari — bawa topi dan air." },
    pakteh:    { name:"PakTeh Fruits, Kg. Pelet", lat:5.4152, lng:100.4624, addr:"Jalan Guar Perahu, Kubang Semang, Bukit Mertajam", hours:"10.00 pg – 11.00 mlm", halal:"muslim", rating:4, reviews:603, tagline:"Kedai buah viral — durian dan mangga", special:"Kedai buah viral (durian, mangga).", tips:"Ini di Bukit Mertajam, bukan di Penaga — jalan pusing 30 km dari Kg Agong." },
    padang:    { name:"Padang Kota Lama (Medan Renong)", lat:5.4228, lng:100.3407, addr:"4, Jalan Tun Syed Sheh Barakbah, George Town", hours:"11.45 pg – 12.30 tgh malam", halal:"muslim", rating:3.7, reviews:4857, tagline:"Medan selera tepi laut: pasembur, mee udang", special:"Medan selera tepi laut: pasembur, mee udang, kerang bakar.", tips:"Parking susah hujung minggu — sampai awal atau parking di Fort Cornwallis/Esplanade." },
    hutton:    { name:"Roti Bakar Hutton Lane", lat:5.4174, lng:100.3305, addr:"300, Jalan Phee Choon, George Town", hours:"5.00 pg – 1.30 ptg", halal:"muslim", rating:4.3, reviews:2710, tagline:"Roti bakar telur goyang dan nasi dalca sejak 1974", special:"Roti bakar telur goyang, nasi dalca, kopi O. Sejak 1974." },
    hill:      { name:"Penang Hill (stesen bawah)", lat:5.4082, lng:100.2771, addr:"Jalan Bukit Bendera, Air Itam", hours:"Tren 6.30 pg – 11.00 mlm, kaunter 6.15 pg", rating:4.3, reviews:653, cost:"MyKad: RM16 dewasa, RM8 kanak-kanak 4–12 & warga emas (pergi-balik). Express lane RM40 / RM20.", tagline:"Naik tren ke puncak, tren setiap 30 minit", tips:["Express lane dan normal lane naik funicular yang SAMA. Bezanya hanya barisan; penumpang express masuk platform dahulu.","Kalau separuh kumpulan beli express, mereka naik train lebih awal dan kumpulan akan terpisah. Semua mesti pilih lane yang sama.","Beli tiket online sekurang-kurangnya 24 jam awal. Tiket online tidak boleh ditebus pada hari sama, dan ia melangkau barisan kaunter.","Beli online di sales.penanghill.gov.my, tunjuk MyKad masa tebus.","Tren setiap 30 minit, lebih kerap bila ramai. Ahad pagi giliran lebih pendek."] },
    hameed:    { name:"Nasi Kandar Hameediyah", lat:5.4186, lng:100.3325, addr:"164A, Lebuh Campbell, George Town", hours:"10.00 pg – 10.00 mlm", halal:"sijil", rating:4.1, reviews:7366, tagline:"Nasi kandar tertua Malaysia, sejak 1907", special:"Nasi kandar tertua Malaysia (1907).", tips:"Masuk Hameediyah Tandoori House sebelah — berhawa dingin, ada tempat duduk." },
    habib:     { name:"Masjid Habib (Masjid Daerah Timur Laut)", lat:5.4495, lng:100.3082, addr:"5, Jalan Seri Tanjung Pinang, Tanjung Tokong", tagline:"Masjid baru 2026, kubah bentuk intan", special:"Masjid baru, dibuka Januari 2026. Kubah bentuk intan.", tips:"Parking luas.", rating:5, reviews:195 },
    kapitan:   { name:"Masjid Kapitan Keling", lat:5.417, lng:100.3371, addr:"14, Lebuh Buckingham, George Town", tagline:"Masjid warisan 1801 di tengah George Town", special:"Masjid warisan 1801.", tips:"4 minit jalan kaki dari Hameediyah, di laluan ke Armenian Street.", rating:4.6, reviews:3413 },
    armenian:  { name:"Armenian Street", lat:5.4154, lng:100.3371, addr:"Lebuh Armenian, George Town", tagline:"Mural dan kedai warisan George Town", special:"Mural, kedai warisan.", tips:"Parking tepi jalan MBPP 60 sen setiap 30 minit, bayar melalui app Penang Smart Parking." },
    chew:      { name:"Chew Jetty", lat:5.4127, lng:100.3398, addr:"Pengkalan Weld, George Town", hours:"9.00 pg – 9.00 mlm", rating:4.1, reviews:10583, tagline:"Boardwalk rata, sesuai untuk stroller", tips:"10 minit jalan kaki dari Armenian Street — tak perlu alih kereta. Boardwalk rata, sesuai stroller." },
    fizzy:     { name:"Makan Pagi by Fizzy", lat:5.4167, lng:100.3306, addr:"266, Jalan Dr Lim Chwee Leong, George Town", hours:"7.00 pg – 2.00 ptg", halal:"muslim", rating:4.2, reviews:2008, tagline:"Nasi lemak, roti goyang, satay dan lontong", special:"Nasi lemak, roti goyang, satay, lontong.", tips:"Hujung minggu giliran boleh sejam; Isnin lebih lengang. Parking persendirian sebelah kafe mahal — guna parking Chowrasta." },
    chowrasta: { name:"Pasar Chowrasta", lat:5.4182, lng:100.3313, addr:"Lot 124, Jalan Penang, George Town", hours:"6.30 pg – 7.00 mlm", rating:4.2, reviews:9961, cost:"Parking bertingkat atas pasar, kira-kira RM1 sejam (buka 5 pg – 10 mlm).", tagline:"Buah tangan: tau sar pneah, buah pala, dodol", special:"Buah tangan: tau sar pneah, buah pala, dodol, kerepek.", tips:"Jeruk Madu Pak Ali (423 Jalan Penang) 2 minit jalan kaki." },
    dimsum:    { name:"Dim Sum Valet (Cina Muslim)", lat:5.4169, lng:100.3311, addr:"16, Lebuh Keng Kwee, George Town", hours:"9.00 pg – 6.00 ptg, tutup Selasa", halal:"sijil", rating:4.4, reviews:786, tagline:"Dim sum halal, pilih sendiri dari bakul", special:"Dim sum halal, pilih sendiri dari bakul di pintu masuk, lebih kurang RM4.50 sepinggan. Char koay teow di sini pun dipuji ramai.", tips:"Ada tingkat atas untuk kumpulan besar." },
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
    {
      n:1, date:'2026-09-12', label:'Sabtu, 12 Sept', short:'Sabtu',
      intro:['Kampung Agong di Penaga tutup 6.00 ptg — tiada peluang kedua.',
             'Satu-satunya hari kita keluar pulau, dan hari paling banyak memandu.',
             'Kira masa ikut keadaan trafik semasa.'],
      km:129, toll:'RM14', tollNote:'2 kereta masuk pulau', fuel:'±RM54', azanFrom:'10:20',
      items:[
        { t:'04:30', type:'note',  title:'Bertolak dari rumah masing-masing', meta:'Awal sebab peraturan 3 jam. Lihat "Pagi Sabtu: cara ke KLIA2" untuk laluan setiap kumpulan.', metaLink:{ text:'Pagi Sabtu: cara ke KLIA2', href:'#pagi-sabtu' } },
        { t:'05:45', e:'08:45', type:'flight', title:'KLIA2 — check-in bagasi, Subuh, sarapan', place:'klia2', meta:'Kaunter bagasi sebelum 6.00 pg. Cabin sahaja boleh sampai sebelum 7.00 pg. Subuh masuk lebih kurang 6.00 pg — surau di Aras 2 dan 3. Sarapan selepas melepasi keselamatan.' },
        { t:'09:25', type:'flight', title:'Berlepas AK6154', meta:'Tempoh 55 minit.' },
        { t:'10:20', type:'flight', title:'Tiba Pulau Pinang, ambil bagasi', place:'lta' },
        { t:'11:30', type:'stop',  title:'Ambil kereta sewa di LTAPP', meta:'Kereta 1 pemandu mula Wafi, Kereta 2 pemandu mula Syafi. Semak kereta, ambil gambar sekeliling badan kereta sebelum bergerak.' },
        { move:{ km:3, min:6 } },
        { t:'11:45', e:'12:45', type:'meal', title:'Makan tengah hari — Mentari Pagi by Sofea', place:'sofea', flags:[{k:'warn',v:'Tutup 1.00 tgh'}], planB:[{ place:"beratur", why:"Berhawa dingin, buka 9 pg – 11 mlm jadi tiada risiko tutup. 6 minit dari LTAPP." }, { name:"Cargas Café", addr:"Main Road Bayan Lepas", rating:4.3, reviews:3208, why:"Nasi campur murah, 2 minit dari LTAPP, tapi panas dan self-service." }, { name:"Bayan Baru Market Food Court", why:"Medan selera MBPP, banyak gerai Muslim, semua orang boleh pilih sendiri. 12 minit.", rating:4, reviews:1812 }, { name:"Alunan Rasa by Irama Dining", addr:"Setia Triangle", rating:4.6, reviews:321, why:"Ada surau, tapi buka 12.00 tgh sahaja." }] },
        { move:{ km:15, min:20, via:'Lebuhraya Tun Dr Lim Chong Eu' } },
        { t:'13:05', e:'14:30', type:'stop', title:'Check-in homestay, solat Zuhur (jamak Asar)', place:'homestay', meta:'Check-in rasmi 3.00 ptg. Wafi minta awal, tetapi belum disahkan — anggap ia belum pasti sampai homestay jawab.', flags:[{k:'warn',v:'Check-in awal belum disahkan'}], planB:[{ text:"Kalau tak boleh masuk: letak beg di lobi atau dalam kereta, solat Zuhur jamak Asar di Masjid Jamek Jelutong (5 minit) atau surau berdekatan, kemudian gerak terus ke Kampung Agong. Beg masuk bilik lepas balik malam." }, { text:"Jangan pusing-pusing menunggu — Kampung Agong tutup 6.00 ptg, jadi masa lebih baik dihabiskan di sana." }, { text:"Sahkan dengan tuan homestay seminggu sebelum trip supaya tak jadi teka-teki pada hari itu." }] },
        { move:{ km:45, min:65, via:'Jambatan Pulau Pinang → Butterworth → Kepala Batas → Penaga. Kira masa ikut keadaan trafik semasa.' } },
        { t:'15:45', e:'18:00', type:'stop', title:'Kampung Agong', place:'kgagong', flags:[{k:'warn',v:'Tutup 6.00 ptg'}], planB:[{ text:"Nak makan di Hameed Pata Mee Sotong (tutup 8 mlm): keluar Kg Agong 5.00 ptg, terus ke Esplanade, makan 6.15–7.15 mlm, kemudian solat Maghrib di Masjid Kapitan Keling berdekatan." }, { place:"olo", why:"Hujan lebat: berbumbung. Gerak ke Esplanade lebih awal." }] },
        { move:{ km:30, min:40, via:'Kepala Batas → Bukit Mertajam.' } },
        { t:'18:40', e:'19:10', type:'stop', title:'PakTeh Fruits — kedai buah viral', place:'pakteh', planB:[{ name:"La.Luna", addr:"Kompleks Selera Sri Pantai, Lebuhraya Tun Dr Lim Chong Eu, Bayan Lepas", rating:4.7, reviews:394, hours:"4.00 ptg – 11.00 mlm, tutup Isnin", why:"Taco tepi laut. Kompleks sama ada gerai ikan bakar juga (BOSS Ikan Bakaq 4.3/86, Medan Selera Seri Pantai 3.9/457), jadi semua umur ada pilihan.", note:"60 km dari Kampung Agong, arah bertentangan dengan homestay. Kalau pilih ini, ia ganti makan malam Esplanade, bukan tambahan. Belum diputuskan." }, { name:"Jeruk Madu Pak Ali", addr:"Jalan Penang", why:"Kalau tak sempat, buah tangan sama boleh dapat di sini pada Hari 3, 2 minit dari Chowrasta.", rating:4.1, reviews:1667 }] },
        { move:{ km:28, min:40, via:'Bukit Mertajam → Prai → Jambatan Pulau Pinang → Jelutong' } },
        { t:'19:50', e:'20:20', type:'solat', title:'Tiba homestay — solat Maghrib (jamak Isyak)', place:'homestay', meta:'Maghrib masuk 7.21 mlm.' },
        { move:{ km:4, min:12 } },
        { t:'20:35', e:'22:30', type:'meal', title:'Makan malam — Padang Kota Lama, Esplanade', place:'padang', meta:'Medan Renong buka sampai lewat malam. Budak-budak boleh main di padang.', planB:[{ name:"Hameed Pata Mee Sotong", addr:"Esplanade Park Food Court", why:"Berada di Esplanade Park Food Court sebelah. Nak makan di situ, kena sampai sebelum 7.30 mlm — bermakna skip PakTeh dan solat Maghrib di Masjid Kapitan Keling selepas makan.", hours:"Isnin–Sabtu 11.00 pg – 8.00 mlm", note:"Tutup 8.00 malam, dan Esplanade Park Food Court tutup Ahad. Malam ini kita tidak ke sana." }] },
        { move:{ km:4, min:12 } },
        { t:'22:45', type:'note', title:'Balik homestay', place:'homestay' }
      ]
    },
    {
      n:2, date:'2026-09-13', label:'Ahad, 13 Sept', short:'Ahad',
      intro:['Dua kereta berpecah pagi ini: Kereta 2 ke LTAPP ambil Halima & Kak Ayman, Kereta 1 terus ke sarapan.',
             'Semua bertemu semula di Roti Bakar Hutton Lane sebelum 9.00 pg.',
             'Selepas itu semua tempat rapat dalam George Town, kecuali Masjid Habib.'],
      km:30, toll:'—', fuel:'±RM20', fuelNote:'termasuk larian LTAPP',
      items:[
        { t:'07:30', type:'move2', title:'Kereta 2 (Syafi) ke LTAPP — ambil Halima & Kak Ayman', meta:'Homestay ke LTAPP 20 minit. Flight tiba 8.00 pg. Dari LTAPP terus ke tempat sarapan, sampai kira-kira 8.45.' },
        { t:'07:45', type:'move2', title:'Kereta 1 (Wafi) terus ke sarapan', meta:'Homestay ke Hutton Lane 12 minit.' },
        { t:'08:00', e:'09:00', type:'meal', title:'Sarapan — Roti Bakar Hutton Lane', place:'hutton', planB:[{ place:"fizzy", why:"Simpan untuk Isnin." }, { name:"Kopitiam 7 Pagi", rating:4.3, reviews:1430 }, { name:"Hidden Cafe Kg Tepi Pantai" }, { name:"Roti Canai Gemas Road", rating:4.3, reviews:3249, note:"Tutup Isnin." }] },
        { move:{ km:6, min:20, via:'Jalan Air Itam' } },
        { t:'09:30', e:'12:00', type:'stop', title:'Penang Hill', place:'hill', planB:[{ name:"Taman Botani Pulau Pinang", why:"Kaki bukit, percuma.", rating:4.5, reviews:8438 }, { name:"The Habitat Penang Hill", why:"Atas bukit, RM50 dewasa.", rating:4.4, reviews:4448 }, { name:"Pantai Miami", addr:"Batu Ferringhi", rating:4.2, reviews:1613 }, { name:"Tropical Spice Garden", addr:"Teluk Bahang", rating:4.6, reviews:2050 }, { name:"Entopia Butterfly Farm", addr:"Teluk Bahang", rating:4.5, reviews:10113 }] },
        { move:{ km:6, min:20, via:'Jalan Air Itam → Jalan Dato Keramat' } },
        { t:'12:25', e:'13:45', type:'meal', title:'Makan tengah hari — Nasi Kandar Hameediyah', place:'hameed', flags:[{k:'info',v:'Zohor 1.17 ptg'}], planB:[{ name:"Kassim Nasi Kandar", rating:4.4, reviews:449 }, { name:"Nasi Kandar Kampong Pisang", addr:"Air Itam", why:"Kalau lapar sebelum turun bukit.", rating:4.9, reviews:21 }] },
        { move:{ km:7, min:18, via:'Jalan Kelawai → Tanjung Tokong' } },
        { t:'14:05', e:'14:40', type:'solat', title:'Masjid Habib — Zuhur (jamak Asar)', place:'habib', flags:[{k:'warn',v:'Jalan pusing 40 min'}], planB:[{ text:"Jimat 40 minit: solat di Masjid Kapitan Keling, 4 minit jalan kaki dari Hameediyah, terus ke Armenian Street. Singgah Masjid Habib untuk Maghrib sebelum makan malam — ia di laluan ke Tanjung Tokong/Gurney." }] },
        { move:{ km:7, min:18, via:'Balik ke George Town. Parking tepi jalan di Lebuh Acheh / Lebuh Cannon.' } },
        { t:'15:00', e:'16:00', type:'stop', title:'Armenian Street', place:'armenian' },
        { move:{ km:0.8, min:10, walk:true } },
        { t:'16:10', e:'17:15', type:'stop', title:'Chew Jetty', place:'chew', meta:'Petang angin laut, cahaya lembut, kurang terik.', planB:[{ name:"Hin Bus Depot", why:"Seni, kafe.", rating:4.6, reviews:2395 }, { place:"gurney", why:"Kalau hujan petang." }] },
        { move:{ km:4, min:12 } },
        { t:'17:30', e:'18:50', type:'stop', title:'Balik homestay — rehat, mandi', place:'homestay' },
        { t:'19:00', e:'19:45', type:'solat', title:'Solat Maghrib (jamak Isyak)', place:'homestay', meta:'Maghrib 7.21 mlm.' },
        { t:'20:00', e:'22:00', type:'meal', title:'Makan malam bersama Umi Wan', meta:'Lokasi setakat ini di tanah besar. Akan dikemas kini.', planB:[{ name:"Premium Chinese Muslim Cuisine", rating:4.3, reviews:297 }, { name:"Tok Ma Malay Kitchen", addr:"George Town" }, { name:"The Table Penang", rating:4.4, reviews:1025 }, { name:"Rumah Kacha", rating:4.3, reviews:710 }, { name:"Jawi House Cafe Gallery", rating:4.5, reviews:1573 }] },
        { t:'22:30', type:'note', title:'Balik homestay', place:'homestay', planB:[{ name:"Avatar Secret Garden", addr:"Tanjung Tokong", why:"Masih bertenaga: lampu malam." }, { name:"Gurney Bay Park", rating:4.5, reviews:893, why:"Basikal pantai." }, { name:"Feringghi Walk", why:"Basikal pantai." }] }
      ]
    },
    {
      n:3, date:'2026-09-14', label:'Isnin, 14 Sept', short:'Isnin',
      intro:['Checkout awal walaupun homestay bagi sampai 12 tgh — beg terus masuk kereta.',
             'Pagi lengang di George Town, dan Queensbay Mall di laluan ke lapangan terbang.'],
      km:23, toll:'—', fuel:'±RM10', azanTo:'17:15',
      items:[
        { t:'08:00', e:'08:30', type:'stop', title:'Checkout — beg masuk kereta', place:'homestay', meta:'Homestay benarkan sampai 12 tgh, tapi kita keluar awal supaya tak patah balik. Semak semua bilik, pengecas, ubat.' },
        { move:{ km:4, min:12 } },
        { t:'08:45', e:'09:55', type:'meal', title:'Sarapan — Makan Pagi by Fizzy', place:'fizzy', meta:'Parking di Chowrasta (bertingkat), 3 minit jalan kaki.', planB:[{ name:"Kopitiam 7 Pagi", rating:4.3, reviews:1430 }, { name:"Hidden Cafe Kg Tepi Pantai" }] },
        { move:{ km:0.3, min:3, walk:true } },
        { t:'10:00', e:'10:55', type:'stop', title:'Pasar Chowrasta + Jeruk Madu Pak Ali', place:'chowrasta' },
        { move:{ km:0.2, min:2, walk:true } },
        { t:'11:00', e:'12:00', type:'meal', title:'Makan tengah hari — Dim Sum Valet, Lebuh Keng Kwee', place:'dimsum', meta:'Jalan yang sama dengan Chowrasta, 2 minit jalan kaki. Isnin buka.', planB:[{ place:"laksa", why:"Sijil JAKIM ditarik balik Jun 2025, jadi bukan pilihan kalau nak yang bersijil." }, { place:"hameed", why:"Bersijil JAKIM, 6 minit jalan kaki (tapi kita dah makan di sana Hari 2)." }, { name:"Sup Hameed", addr:"Jalan Penang", why:"Sup tulang dan nasi beriani, dekat sini juga.", rating:4, reviews:3113 }] },
        { move:{ km:11, min:20, via:'Lebuhraya Tun Dr Lim Chong Eu ke Bayan Lepas' } },
        { t:'12:20', e:'14:00', type:'stop', title:'Queensbay Mall — rehat, solat Zuhur, beli barang akhir', place:'queensbay', meta:'Berhawa dingin, ada surau untuk solat Zuhur, dan medan selera kalau sesiapa nak makan ringan. 14 minit dari sini ke LTAPP.', flags:[{k:'info',v:'Zohor 1.16 ptg'}], planB:[{ text:"Terus ke LTAPP dari Lebuh Keng Kwee (25 minit) kalau semua dah penat — tiba 12.30 tgh, buffer sangat besar." }, { name:"Snake Temple", why:"5 minit dari LTAPP, kalau nak singgah pendek yang lain.", rating:3.9, reviews:1847 }] },
        { move:{ km:8, min:14 } },
        { t:'14:15', type:'flight', title:'Tiba LTAPP — turunkan Fitri & Fatimah dahulu, pulangkan kereta', place:'lta', meta:'Fitri & Fatimah check-in terus untuk flight 4.00 ptg (buffer 1 jam 45 minit). Yang lain pulangkan 2 kereta, kemudian check-in untuk 5.15 ptg.' },
        { t:'16:00', type:'flight', title:'Berlepas — Fitri & Fatimah', meta:'AirAsia ke KLIA2.' },
        { t:'17:15', type:'flight', title:'Berlepas — semua yang lain', meta:'AirAsia ke KLIA2.' },
        { t:'18:15', type:'flight', title:'Tiba KLIA2', place:'klia2', meta:'Ambil bagasi, ERL/kereta balik. Tren KLIA Transit ke Salak Tinggi 11 minit, ke Putrajaya 20 minit.' }
      ]
    }
  ],

  // Turutan lokasi untuk garisan laluan peta (mengikut hari)
  routes: {
    1:['lta','sofea','homestay','kgagong','pakteh','homestay','padang','homestay'],
    2:['homestay','hutton','hill','hameed','habib','armenian','chew','homestay'],
    3:['homestay','fizzy','chowrasta','dimsum','queensbay','lta']
  },
  // Marker bernombor (satu setiap lokasi berhenti; homestay & LTAPP dipapar berasingan)
  markers: {
    1:['sofea','kgagong','pakteh','padang'],
    2:['hutton','hill','hameed','habib','armenian','chew'],
    3:['fizzy','chowrasta','dimsum','queensbay']
  },

  // Kereta: layout MPV 10 tempat, 4 baris 2-3-2-3 (baris 1 = pemandu + 1).
  // Nilai seat: 'ID:Nama' atau 'ID:Nama:D' (pemandu mula), 'BEG' = ruang bagasi, '' = kosong.
  carNote: 'Hyundai Staria 10 seat, diesel. Sudah tempah — bayar semasa ambil di LTAPP.',
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
    facts:[['9','bilik tidur'],['14','katil'],['9','bilik air'],['4','tingkat']],
    checkin:'3.00 ptg (minta awal)', checkout:'12.00 tgh (kita keluar 8.30 pg)',
    rooms:[
      { n:1, g:'F1', who:'Muhd, Kak Salina, Khadijah, Alisha' },
      { n:2, g:'F2', who:'Hana & Fatimah' },
      { n:3, g:'F2', who:'Hadi & Kak Hajar' },
      { n:4, g:'G2', who:'Hud & Fitri' },
      { n:5, g:'F3', who:'Obi, Kak Yusra, Nasrullah, Maryam, Annur' },
      { n:6, g:'F4', who:'Wafi & Nadian' },
      { n:7, g:'S1', who:'Syafi' },
      { n:8, g:'G2', who:'Madno' },
      { n:9, g:'G1', who:'Halima & Kak Ayman', sub:'Dari Ahad' }
    ]
  },



  // Harga bagasi AirAsia domestik (AK), setiap orang setiap sektor sehala.
  bagasi: {
    note:'Harga bagasi sama di KLIA2 dan LTAPP — ia dikira setiap orang setiap sektor sehala, bukan ikut lapangan terbang. AirAsia guna harga dinamik: ia berubah ikut laluan, tarikh dan berapa awal awak beli, jadi tiada senarai harga tetap yang boleh dipercayai. Semak harga sebenar dalam app AirAsia MOVE di bawah "My Bookings" untuk tarikh awak.',
    ladder:[
      ['Paling murah', 'Semasa tempahan asal — tambah bagasi serentak dengan beli tiket'],
      ['Lebih mahal', 'Selepas tempah, melalui app atau laman web sebelum hari penerbangan'],
      ['Paling mahal', 'Di kaunter lapangan terbang pada hari itu — elak ini'],
      ['Paling teruk', 'Beg ditahan di pintu masuk pesawat kerana melebihi saiz kabin']
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
  ucapan:{ sebelum:'Selamat Bercuti', selepas:'Terima kasih semua atas pengalaman ini', tarikh:'2026-09-15' },

  routeNote:'Waktu puncak dan trafik jambatan boleh tambah 15-20 minit.',

  jalan: {
    km:'Laluan utama 182 km sebuah kereta (129 Hari 1 + 30 Hari 2 + 23 Hari 3). Kereta 2 tambah lebih kurang 35 km untuk ambil Halima & Kak Ayman di LTAPP hari Ahad. Jumlah kedua-dua kereta: lebih kurang 399 km, iaitu 40 liter pada 10 liter setiap 100 km.',
    bahanapi:[
      { jenis:'Diesel, subsidi BUDI', harga:'RM2.10', kereta:'RM42', total:'RM84' },
      { jenis:'Diesel, harga pasaran', harga:'RM4.62', kereta:'RM92', total:'RM184' },
      { jenis:'RON95, subsidi BUDI95', harga:'RM1.99', kereta:'RM40', total:'RM79' },
      { jenis:'RON95, harga pasaran', harga:'RM3.82', kereta:'RM76', total:'RM152' }
    ],
    tolrows:[
      { apa:'Jambatan Pulau Pinang, kelas 1', kadar:'RM7.00 sekali masuk', bila:'Hari 1 sahaja, balik dari Penaga', total:'RM14 (2 kereta)' },
      { apa:'Keluar ke tanah besar', kadar:'Percuma', bila:'Tiada tol arah keluar', total:'RM0' }
    ],
    nota:'Harga bahan api berubah setiap Rabu. Angka di atas ialah kadar Ogos 2026. Subsidi BUDI disahkan dengan MyKad di pam, kuota 200 liter sebulan.',
    rental:'Kebanyakan syarikat sewa guna dasar penuh-ke-penuh: ambil tangki penuh, pulangkan penuh. Isi minyak di stesen berhampiran LTAPP sebelum pulangkan, dan simpan resit.'
  },



  costs:[
    { item:'Penang Hill (pergi-balik, MyKad)', amt:'RM16 dewasa / RM8 kanak-kanak 4–12', note:'Express lane RM40 / RM20. Beli online sales.penanghill.gov.my.' },
    { item:'Kampung Agong', amt:'RM10 dewasa / RM5 kanak-kanak 4–12', note:'Bawah 4 tahun percuma. Kostum tradisional RM30.' },
    { item:'Queensbay Mall', amt:'Percuma', note:'Parking bertingkat, kadar mall biasa. Ada surau dan medan selera.' },
    { item:'Chew Jetty, Armenian Street, Chowrasta', amt:'Percuma', note:'Parking tepi jalan MBPP 60 sen / 30 minit (app Penang Smart Parking). Parking Chowrasta kira-kira RM1 sejam.' },
    { item:'KLIA Transit Salak Tinggi → KLIA2', amt:'RM4.90 dewasa / RM2.20 kanak-kanak', note:'Kanak-kanak 6–15 tahun. Bawah 6 percuma. 11 minit.' },
    { item:'KLIA Transit Putrajaya → KLIA2', amt:'RM9.40 dewasa / RM4.20 kanak-kanak', note:'20 minit.' },
    { item:'KLIA Ekspres / Transit KL Sentral → KLIA2', amt:'RM55 dewasa / RM25 kanak-kanak', note:'33–39 minit. Online 10% lebih murah.' },
    { item:'Parking Salak Tinggi Park & Ride (Sab–Isn)', amt:'kira-kira RM30–36', note:'RM3 siang, RM9 malam pertama (berbumbung, terbuka RM7), RM12 / RM10 sehari seterusnya.' },
    { item:'Parking Gateway@klia2 (Sab–Isn)', amt:'RM55 sehari, kira-kira RM165', note:'Jalan terus ke terminal.' },
    { item:'Parking KLIA Long Term Car Park (Sab–Isn)', amt:'RM27–32 sehari', note:'Shuttle percuma ke KLIA2 setiap 10–15 minit.' },
    { item:'Parking LTAPP', amt:'RM3 sejam, maks RM33 sehari', note:'Untuk keluarga Muhd jika hantar/ambil.' }
  ],

  rain:[
    { when:'Hari 1 petang', plan:'Hujan lebat sebelum gerak ke Kampung Agong: tukar dengan OLO Studio (Jelutong, 5 minit dari homestay) dan gerak ke Esplanade lebih awal — sempat Hameed Pata sebelum 8 mlm.' },
    { when:'Hari 2 petang', plan:'Chew Jetty terdedah — tukar dengan Hin Bus Depot atau Gurney Plaza. Penang Hill pagi biasanya selamat.' },
    { when:'Hari 2 malam', plan:'Gurney Plaza kalau makan malam Umi Wan ditunda atau hujan tak berhenti.' },
    { when:'Hari 3 pagi', plan:'Chowrasta, Dim Sum Valet dan Queensbay Mall semuanya berbumbung — Hari 3 selamat walaupun hujan.' },
    { when:'Habis awal mana-mana hari', plan:'Hari 1: Jeruk Madu Pak Ali. Hari 2: Avatar Secret Garden (malam), Feringghi Walk. Hari 3: tambah masa di Queensbay Mall sebelum ke LTAPP.' }
  ],

  checklist:[
    { i:'id', t:'MyKad semua orang — kadar tempatan Penang Hill dan Kampung Agong' },
    { i:'id', t:'MyKid anak-anak untuk tiket kanak-kanak' },
    { i:'solat', t:'Telekung, sejadah kecil — banyak solat jamak di masjid dan surau' },
    { i:'hujan', t:'Payung lipat atau baju hujan, September musim peralihan monsun' },
    { i:'panas', t:'Topi, sunblock, botol air — Kampung Agong terdedah dan panas tengah hari' },
    { i:'kad', t:'Touch \u2019n Go untuk parking Salak Tinggi dan tol jambatan, plus app Penang Smart Parking untuk tepi jalan George Town' },
    { i:'bateri', t:'Powerbank dan kabel — hari panjang dan peta dalam telefon' },
    { i:'ubat', t:'Ubat asas, ubat sendiri, plaster' },
    { i:'kasut', t:'Kasut selesa — Armenian Street dan Chew Jetty banyak jalan kaki' },
    { i:'snek', t:'Snek dan air budak-budak dalam kereta, terutama larian ke Penaga' },
    { i:'beg', t:'Beg kecil kosong untuk buah tangan Chowrasta, dan timbang beg sebelum balik' },
    { i:'tiket', t:'Screenshot tiket AirAsia dan tiket Penang Hill — signal lemah atas bukit' }
  ]

};
