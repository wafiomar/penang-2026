/* ============================================================
   HELPERS
   ============================================================ */
const $ = (s, el=document) => el.querySelector(s);
const G = id => DATA.groups.find(g => g.id === id);
const esc = s => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
function fmtT(t){ // "14:30" -> "2.30 ptg"
  if(!t) return '';
  const [h,m] = t.split(':').map(Number);
  const suf = h<12 ? 'pg' : h<13 ? 'tgh' : h<19 ? 'ptg' : 'mlm';
  const hh = h%12===0 ? 12 : h%12;
  return hh + '.' + String(m).padStart(2,'0') + ' ' + suf;
}
const toMin = t => { const [h,m]=t.split(':').map(Number); return h*60+m; };
const fromMin = m => String(Math.floor(m/60)).padStart(2,'0') + ':' + String(m%60).padStart(2,'0');
// Julat masa: buang suffix pertama kalau kedua-duanya sama waktu. "2.15 – 3.20 ptg"
function julat(a, b){
  const A = fmtT(a), B = fmtT(b);
  const sa = A.slice(A.lastIndexOf(' ')+1), sb = B.slice(B.lastIndexOf(' ')+1);
  return sa === sb ? `${A.slice(0, A.lastIndexOf(' '))} – ${B}` : `${A} – ${B}`;
}
// Jam setiap segmen pergerakan dikira, bukan ditaip dalam DATA.
function masaGerak(items){
  const peta = new Map();
  let siap = null;
  items.forEach((it, i) => {
    if(it.move){
      if(siap === null) return;
      const tamat = siap + (it.move.min || 0);
      peta.set(i, [siap, tamat]);
      siap = tamat;
      return;
    }
    if(it.t) siap = it.e ? toMin(it.e) : toMin(it.t);
  });
  return peta;
}
// Pautan dalam teks meta: ganti frasa dalam DATA dengan pautan ke seksyen lain.
function metaHtml(meta, link){
  const html = meta.map(esc).join('<br>');
  if(!link) return html;
  const frasa = esc(link.text);
  return html.includes(frasa) ? html.replace(frasa, () => `<a href="${link.href}">${frasa}</a>`) : html;
}
// Bentuk ringkas untuk sel jadual sempit: "2j 18m", "47m".
const durShort = min => (min>=60 ? Math.floor(min/60)+'j' + (min%60 ? ' '+min%60+'m' : '') : min+'m');
const dur = min => min>=60 ? Math.floor(min/60)+' jam' + (min%60 ? ' '+min%60+' min' : '') : min+' min';
const gmaps = p => `https://www.google.com/maps/dir/?api=1&destination=${p.lat},${p.lng}`;
const waze  = p => `https://waze.com/ul?ll=${p.lat},${p.lng}&navigate=yes`;
// Profil Google bagi tempat itu — cari ikut nama dan alamat, bukan koordinat.
// q: nama berdaftar untuk carian Google bila ia berbeza daripada nama paparan
const gprofile = p => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent([p.q || p.name, p.addr].filter(Boolean).join(', '))}`;
// Satu penerbangan sedang di udara? Kira ikut waktu Malaysia (UTC+8) pada tarikh
// sebenar penerbangan itu. Tiada waktu tiba bermakna kita tak boleh tahu — anggap tidak.
function diUdara(f){
  if(!f.iso || !f.dep || !f.arr) return false;
  const ms = t => Date.parse(f.iso + 'T' + t + ':00+08:00');
  const mula = ms(f.dep); let tamat = ms(f.arr);
  if(tamat < mula) tamat += 864e5;               // merentas tengah malam
  const kini = Date.now();
  return kini >= mula && kini <= tamat;
}
// Nombor penerbangan sebagai pautan penjejakan langsung: ikon radar + titik LANGSUNG.
function pautanFr24(f){
  if(!f || !f.flightNo) return '';
  return `<a class="fr24" data-flight="${esc(f.flightNo)}" href="https://www.flightradar24.com/data/flights/${esc(f.flightNo.toLowerCase())}"`
    + ` target="_blank" rel="noopener" title="Jejak penerbangan langsung" aria-label="Jejak penerbangan langsung ${esc(f.flightNo)}">`
    + `${ICON.radar}<span>${esc(f.flightNo)}</span></a>`;
}
// Titik LANGSUNG disegarkan berkala, supaya ia muncul dan hilang sendiri
// walaupun halaman dibiarkan terbuka merentas waktu berlepas dan mendarat.
function segarLangsung(){
  document.querySelectorAll('a.fr24[data-flight]').forEach(el => {
    const f = DATA.flights.find(x => x.flightNo === el.dataset.flight);
    const ada = el.nextElementSibling && el.nextElementSibling.classList.contains('fr-live');
    const patut = !!f && diUdara(f);
    if(patut && !ada){
      const s = document.createElement('span');
      s.className = 'fr-live'; s.title = 'Sedang di udara';
      s.innerHTML = '<i></i>LANGSUNG';
      el.after(s);
    } else if(!patut && ada){ el.nextElementSibling.remove(); }
  });
}
setInterval(segarLangsung, 30000);
document.addEventListener('visibilitychange', () => { if(!document.hidden) segarLangsung(); });
const ICON = {
  radar:'<svg class="fr-ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 12a6 6 0 0 1 6-6M12 12a10 10 0 0 1 10-10M12 12a2 2 0 0 1 2-2"/><circle cx="7" cy="17" r="2.2"/><path d="M2 22l3.4-3.4"/></svg>',
  car:'<svg viewBox="0 0 24 24"><path d="M5 17h14M6 17l1.5-6h9L18 17M4 17v2M20 17v2M7 11l1-3h8l1 3"/><circle cx="8" cy="17" r="1.2"/><circle cx="16" cy="17" r="1.2"/></svg>',
  walk:'<svg viewBox="0 0 24 24"><circle cx="13" cy="4" r="1.5"/><path d="M10 21l2-6 3 3v3M8 13l2-4 3-1 3 3 2 1M12 15l-3 6"/></svg>',
  home:'<svg viewBox="0 0 24 24"><path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z"/></svg>',
  bag:'<svg viewBox="0 0 24 24"><rect x="3.5" y="7.5" width="17" height="12" rx="2"/><path d="M9 7.5V5.5a1.5 1.5 0 0 1 1.5-1.5h3A1.5 1.5 0 0 1 15 5.5v2"/></svg>',
  plane:'<svg viewBox="0 0 24 24"><path d="M2 12l7 2 3 7 2-2-1-6 6-4a2 2 0 0 0-2-3l-6 4-6-2-2 2 5 3z"/></svg>'
};

const TI_ICON = {
  meal:'<path d="M6 3v8a2 2 0 0 0 4 0V3M8 11v10M17 3c-1.6 1.2-2.2 3-2.2 5.2 0 1.6.7 2.6 2.2 2.8V21"/>',
  stop:'<path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z"/><circle cx="12" cy="10" r="2.6"/>',
  solat:'<path d="M4 20h16M6 20v-7a6 6 0 0 1 12 0v7M12 3.5v3.5M9.5 20v-3.5a2.5 2.5 0 0 1 5 0V20"/>',
  flight:'<path d="M3 13l7 1.6 3.4 6.4 2-1.8-1-5.6 5.4-3.4a2 2 0 0 0-1.8-3.4l-5.4 3.4L6.4 6.6 4.4 8.4 9 11.4 3 13Z"/>',
  note:'<circle cx="12" cy="12" r="8.5"/><path d="M12 11v5.5M12 7.8v.6"/>',
  move2:'<path d="M4 16h16M6 16l1.4-6h9.2L18 16M5 16v2.2M19 16v2.2"/><circle cx="8.4" cy="16" r="1"/><circle cx="15.6" cy="16" r="1"/>',
  homestay:'<path d="M3.5 11L12 4.2 20.5 11v8.3a1 1 0 0 1-1 1h-4.8v-5.6H9.3v5.6H4.5a1 1 0 0 1-1-1Z"/>',
  rehat:'<path d="M4.5 8.5h12v5.5a4.5 4.5 0 0 1-4.5 4.5H9a4.5 4.5 0 0 1-4.5-4.5Z"/><path d="M16.5 9.8h1.8a2.4 2.4 0 0 1 0 4.8h-1.8M4 21h13"/>'
};
// Warna kategori ikut DATA.cats supaya legend dan jadual sentiasa sepadan.
const CAT = Object.fromEntries(DATA.cats.map(c => [c.k, c]));
const HALAL = {
  sijil:{ t:'Sijil halal JAKIM', ic:'<path d="M12 3l7 3v5.4c0 4.3-2.9 7.7-7 8.6-4.1-.9-7-4.3-7-8.6V6l7-3Z"/><path d="M9.2 12l2 2 3.6-3.8"/>' },
  muslim:{ t:'Milik Muslim, tiada sijil', ic:'<path d="M12 3l7 3v5.4c0 4.3-2.9 7.7-7 8.6-4.1-.9-7-4.3-7-8.6V6l7-3Z"/>' },
  semak:{ t:'Status halal perlu disemak', ic:'<path d="M12 3l7 3v5.4c0 4.3-2.9 7.7-7 8.6-4.1-.9-7-4.3-7-8.6V6l7-3Z"/><path d="M12 8.6v3.6M12 15.2v.5"/>' }
};
const CHK_ICON = {
  id:'<rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="11" r="2"/><path d="M5.6 16.6c.6-1.6 1.9-2.4 3.4-2.4s2.8.8 3.4 2.4M15 10h4M15 13.5h4"/>',
  solat:'<path d="M4 20h16M6 20v-7a6 6 0 0 1 12 0v7M12 3.5v3.5M9.5 20v-3.5a2.5 2.5 0 0 1 5 0V20"/>',
  hujan:'<path d="M7.5 14a4 4 0 0 1 .4-8 5 5 0 0 1 9.4 1.6A3.4 3.4 0 0 1 17 14H7.5Z"/><path d="M9 17.5l-1 3M13 17.5l-1 3M17 17.5l-1 3"/>',
  panas:'<circle cx="12" cy="12" r="4"/><path d="M12 2.5v2.5M12 19v2.5M4.2 4.2l1.8 1.8M18 18l1.8 1.8M2.5 12H5M19 12h2.5M4.2 19.8L6 18M18 6l1.8-1.8"/>',
  kad:'<rect x="2.5" y="5.5" width="19" height="13" rx="2"/><path d="M2.5 10h19M6 15h4"/>',
  bateri:'<rect x="2.5" y="7.5" width="16" height="9" rx="2"/><path d="M21.5 11v2M6 10v4l3-2 3 2v-4"/>',
  ubat:'<rect x="3.5" y="7" width="17" height="13" rx="2"/><path d="M8.5 7V5a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v2M12 11v5M9.5 13.5h5"/>',
  kasut:'<path d="M2.5 16h19a2 2 0 0 1-2 2H4.5a2 2 0 0 1-2-2Z"/><path d="M2.5 16v-4l4-2 2.5 2 3-1 3 2 5.5.6c.6.1 1 .6 1 1.2V16"/>',
  snek:'<path d="M8 3h8l-1 5H9L8 3Z"/><path d="M9 8h6l1.4 11a2 2 0 0 1-2 2.2h-4.8A2 2 0 0 1 7.6 19L9 8Z"/>',
  beg:'<rect x="3.5" y="7.5" width="17" height="12" rx="2"/><path d="M9 7.5V5.5a1.5 1.5 0 0 1 1.5-1.5h3A1.5 1.5 0 0 1 15 5.5v2M3.5 12h17"/>',
  tiket:'<path d="M3 8.5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v1a2.5 2.5 0 0 0 0 5v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1a2.5 2.5 0 0 0 0-5v-1Z"/><path d="M14 7.5v9"/>'
};
const RS_ICON = {
  jarak:'<path d="M6.5 20.5c0-4 2-6 2-9a3.5 3.5 0 0 0-7 0c0 3 2 5 2 9M12 4.5h9M12 12h9M12 19.5h9"/>',
  masa:'<circle cx="12" cy="12" r="8.5"/><path d="M12 7.2V12l3.2 2"/>',
  tol:'<path d="M3 20.5v-9M21 20.5v-9M3 11.5h18M4.5 11.5l1.5-4h12l1.5 4M9 15.5h6"/>',
  minyak:'<path d="M4.5 20.5V5a1.5 1.5 0 0 1 1.5-1.5h5A1.5 1.5 0 0 1 12.5 5v15.5M3 20.5h11M6.5 9.5h4"/><path d="M12.5 9h3a1.5 1.5 0 0 1 1.5 1.5v6a1.5 1.5 0 0 0 3 0V8l-2.5-2.5"/>'
};
const FAKTA_ICON = {
  katil:'<path d="M3 19v-9M3 13h18v6M3 19h18M6.5 10.5h3.2M21 19v-4.5a2 2 0 0 0-2-2h-8.5"/><circle cx="7.8" cy="9.6" r="1.9"/>',
  air:'<path d="M4 12h16v2.5a4.5 4.5 0 0 1-4.5 4.5h-7A4.5 4.5 0 0 1 4 14.5Z"/><path d="M7 12V6.2A1.7 1.7 0 0 1 8.7 4.5h.4a1.7 1.7 0 0 1 1.7 1.7M7 19l-1 2.2M18 19l1 2.2"/>',
  tingkat:'<path d="M4 21V8.5l7-4 7 4V21M4 21h17M8 21v-4h6v4M7.5 11.5h2M14 11.5h2M7.5 14.5h2M14 14.5h2"/>'
};
const STAR = '<svg viewBox="0 0 24 24"><path d="M12 3.4l2.6 5.4 5.9.8-4.3 4.1 1 5.9-5.2-2.8-5.2 2.8 1-5.9L3.5 9.6l5.9-.8z"/></svg>';

/* ============================================================
   HERO
   ============================================================ */
(function hero(){
  $('#hero-dates').textContent = DATA.trip.dates;
  $('#hero-pax').textContent = DATA.groups.reduce((a,g)=>a+g.pax,0) + ' pax';
  const dw = DATA.groups.reduce((a,g)=>a+g.dewasa,0), kk = DATA.groups.reduce((a,g)=>a+g.kanak,0);
  $('#hero-pecah').textContent = `${dw} dewasa · ${kk} kanak-kanak${DATA.trip.toddler?` (${DATA.trip.toddler} toddler)`:''}`;
  const start = new Date(DATA.trip.start + 'T00:00:00+08:00');
  const now = new Date();
  const d = Math.ceil((start - now)/864e5);
  const el = $('#countdown');
  if(d>1) el.textContent = d + ' hari lagi';
  else if(d===1) el.textContent = 'Esok bertolak';
  else if(d<=0 && d>-3) el.textContent = 'Sedang berlangsung';
  else el.textContent = 'Selesai — terima kasih semua';
  $('#foot').innerHTML = `<p>Kemas kini ${esc(DATA.trip.updated)} (${esc(DATA.trip.version)})`
    + ` · <a href="#" class="pautan-ubah" id="btn-ubah">Apa yang berubah<i class="titik-baru" hidden></i></a>`
    + `. Waktu solat zon PNG01. Peta © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>, laluan oleh OSRM.</p>`;
})();

/* ============================================================
   UCAPAN
   ============================================================ */
(function ucapan(){
  const u = DATA.ucapan, el = $('#ucapan'); if(!u || !el) return;
  taburConfetti(el);
  const tukar = new Date(u.tarikh + 'T00:00:00+08:00');
  el.textContent = new Date() >= tukar ? u.selepas : u.sebelum;
})();

/* ============================================================
   RINGKASAN TRIP — modal satu skrin, semua isi dibaca dari DATA
   ============================================================ */
(function ringkasan(){
  const modal = $('#ringkas'); if(!modal) return;
  const hariPendek = s => { const m = s.match(/^(.+?)\s*\((.+)\)$/); return m ? m[2].slice(0,3) + ' ' + m[1] : s; };
  const hariPenuh  = s => { const m = s.match(new RegExp('\\((.+)\\)$')); return m ? m[1] : s; };
  const nama = f => f.who.map(w => { const [gid, nm] = w.split(':'); return nm || G(gid).label; });

  // Blok 1 — penerbangan
  const keLuar = DATA.flights.filter(f => f.to === 'PEN');
  const balik  = DATA.flights.filter(f => f.from === 'PEN');
  const baris1 = [];
  if(keLuar[0]){ const f = keLuar[0];
    baris1.push(`<b>Pergi</b> ${esc(hariPendek(f.date))}${f.flightNo?', '+pautanFr24(f):''}, ${esc(f.fromName)} ${fmtT(f.dep)} → ${esc(f.to)} ${fmtT(f.arr)}`); }
  if(balik.length){
    const bit = balik.map(f => `${fmtT(f.dep)} (${f.who.length > 3 ? 'lain' : esc(nama(f).join(', '))})`).join(' dan ');
    baris1.push(`<b>Balik</b> ${esc(hariPendek(balik[0].date))}, ${bit}`); }
  keLuar.slice(1).forEach(f => baris1.push(`${esc(nama(f).join(', '))} tiba ${esc(hariPenuh(f.date))} ${fmtT(f.arr)}`));

  // Blok 2 — tempat utama setiap hari
  const baris2 = DATA.days.map(d => {
    const senarai = (d.ringkas || DATA.markers[d.n] || []).slice(0,4).map(k => DATA.places[k].short || DATA.places[k].name);
    return `<b>Day ${d.n}</b> <span class="rk-alur">${senarai.map(esc).join(' <i>→</i> ')}</span>`;
  });

  // Blok 3 — kereta, guna senario semasa bercuti
  const sc = DATA.carScenarios.find(s => s.id === 'cuti') || DATA.carScenarios[0];
  const baris3 = sc.cars.map(c => {
    const org = c.seats.filter(s => s && s !== 'BEG').map(s => s.split(':')[1]);
    return `<b>${esc(c.name)}</b> <i>starting driver ${esc(c.driver)}</i><span>${esc(org.join(', '))}</span>`;
  });
  const t3 = DATA.carScenarios.find(s => s.third);
  if(t3) baris3.push(`<b>${esc(t3.third.who)}</b> <i>kereta sendiri</i>`);

  // Blok 4 — homestay
  const bilik = DATA.stay.facts.find(f => f[1].includes('bilik tidur'));
  const tingkat = DATA.stay.facts.find(f => f[1].includes('tingkat'));
  const bersih = s => s.replace(/\s*\(.*\)$/, '');

  $('#ringkas-isi').innerHTML =
      `<section><h3>Penerbangan</h3>${baris1.map(x=>`<p>${x}</p>`).join('')}</section>`
    + `<section><h3>Tiga hari</h3>${baris2.map(x=>`<p>${x}</p>`).join('')}</section>`
    + `<section class="rk-kereta"><h3>Kereta</h3>${baris3.map(x=>`<p>${x}</p>`).join('')}</section>`
    + `<section><h3>Homestay</h3><p>${esc(DATA.stay.addr)}</p>`
    + `<p>Check-in ${esc(bersih(DATA.stay.checkin))} · Check-out ${esc(bersih(DATA.stay.checkout))}</p>`
    + `<p>${esc(bilik[0])} bilik · ${esc(tingkat[0])} tingkat</p></section>`;
  segarLangsung();

  const buka = () => { modal.hidden = false; document.body.style.overflow = 'hidden'; modal.querySelector('.rk-x').focus(); };
  const tutup = () => { modal.hidden = true; document.body.style.overflow = ''; };
  $('#btn-ringkas').addEventListener('click', buka);
  modal.querySelector('.rk-x').addEventListener('click', tutup);
  modal.addEventListener('click', e => { if(e.target === modal) tutup(); });
  document.addEventListener('keydown', e => { if(e.key === 'Escape' && !modal.hidden) tutup(); });
})();

/* ============================================================
   NAV highlight
   ============================================================ */
(function nav(){
  const navEl = $('.nav');
  const links = [...document.querySelectorAll('.nav a')];
  const secs  = links.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
  let io = null;

  // Garis pengaktifan: tepat di bawah bar nav yang melekat.
  const line = () => navEl.getBoundingClientRect().height + 8;

  // Kira sendiri seksyen mana yang sedang dilihat — jangan bergantung pada
  // turutan entri IntersectionObserver, sebab entri terakhir belum tentu betul.
  function pick(){
    const L = line();
    let cur = secs.find(s => { const r = s.getBoundingClientRect(); return r.top <= L && r.bottom > L; });
    if(!cur){
      const de = document.documentElement;
      if(window.scrollY + window.innerHeight >= de.scrollHeight - 2) cur = secs[secs.length-1];
      else cur = secs.find(s => s.getBoundingClientRect().top > L) || secs[0];
    }
    const aktif = links.find(l => l.getAttribute('href') === '#'+cur.id);
    links.forEach(l => l.classList.toggle('on', l === aktif));
    if(aktif && aktif !== tabTerakhir){ tabTerakhir = aktif; bawaKeTengah(aktif); }
  }

  // Skrol bar nav supaya tab aktif kelihatan, dengan ruang di kiri dan kanannya.
  // Berhenti seketika kalau pengguna sedang skrol bar itu sendiri dengan jari.
  const jalur = navEl.querySelector('.wrap');
  let tabTerakhir = null, sentuh = 0;
  ['pointerdown','touchstart','wheel'].forEach(ev =>
    jalur.addEventListener(ev, () => { sentuh = Date.now(); }, { passive:true }));
  function bawaKeTengah(el){
    if(Date.now() - sentuh < 1200) return;          // tangan pengguna masih di situ
    if(jalur.scrollWidth <= jalur.clientWidth) return; // tiada apa nak diskrol
    const ruang = 16;
    const kiri = el.offsetLeft - ruang;
    const kanan = el.offsetLeft + el.offsetWidth + ruang;
    let x = jalur.scrollLeft;
    if(kiri < x) x = kiri;
    else if(kanan > x + jalur.clientWidth) x = kanan - jalur.clientWidth;
    else return;                                    // sudah kelihatan sepenuhnya
    x = Math.max(0, Math.min(x, jalur.scrollWidth - jalur.clientWidth));
    jalur.scrollTo({ left:x, behavior:'smooth' });
  }

  // Bina semula pemerhati bila saiz tetingkap berubah, sebab tinggi nav berubah.
  function build(){
    document.documentElement.style.setProperty('--navh', Math.round(navEl.getBoundingClientRect().height) + 'px');
    if(io) io.disconnect();
    const L = Math.round(line());
    const bawah = Math.max(0, window.innerHeight - L - 1);
    io = new IntersectionObserver(pick, { rootMargin:`-${L}px 0px -${bawah}px 0px`, threshold:0 });
    secs.forEach(s => io.observe(s));
    pick();
  }

  build();
  window.addEventListener('resize', build, { passive:true });
})();

/* ============================================================
   MAP
   ============================================================ */
const MAP = { map:null, layers:{}, all:null, marks:{}, pilihHari:null };
function initMap(){
  if(typeof L === 'undefined'){ $('#map').style.display='none'; $('#map-fallback').style.display='block'; $('#map-ctl').style.display='none'; $('#map-note').style.display='none'; return; }
  const map = L.map('map', { scrollWheelZoom:false, zoomControl:true, attributionControl:true });
  MAP.map = map;
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom:19, attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>' }).addTo(map);
  const P = DATA.places;
  const colors = { 1:getComputedStyle(document.documentElement).getPropertyValue('--d1').trim(), 2:getComputedStyle(document.documentElement).getPropertyValue('--d2').trim(), 3:getComputedStyle(document.documentElement).getPropertyValue('--d3').trim() };

  // Static markers: homestay + LTAPP
  const fixed = L.layerGroup().addTo(map);
  const notaTetap = { lta: (DATA.larian && DATA.larian[2] ? DATA.larian[2].label : '') };
  const mkFixed = (p, kind, id) => L.marker([p.lat,p.lng], { icon:L.divIcon({ className:'', html:`<div class="pin ${kind}">${ICON[kind]}</div>`, iconSize:[30,30], iconAnchor:[15,15], popupAnchor:[0,-14] }), zIndexOffset:500 })
    .bindPopup(popupHtml(p, null, null) + (notaTetap[id] ? `<div class="pp-larian">Ahad pagi: ${esc(notaTetap[id])}</div>` : '')).addTo(fixed);
  mkFixed(P.homestay,'home','homestay'); mkFixed(P.lta,'plane','lta');

  [1,2,3].forEach(d => {
    const lg = L.layerGroup();
    const day = DATA.days.find(x=>x.n===d);
    DATA.markers[d].forEach((id,i) => {
      const p = P[id];
      const item = day.items.find(it => it.place===id);
      const mk = L.marker([p.lat,p.lng], { icon:L.divIcon({ className:'', html:`<div class="pin d${d}">${i+1}</div>`, iconSize:[26,26], iconAnchor:[13,13], popupAnchor:[0,-12] }) })
        .bindPopup(popupHtml(p, d, item)).addTo(lg);
      MAP.marks[d + ':' + id] = mk;
    });
    // Route: straight fallback first, replaced by OSRM geometry if available
    const pts = DATA.routes[d].map(id => [P[id].lat, P[id].lng]);
    const fallback = L.polyline(pts, { color:colors[d], weight:3, opacity:.7, dashArray:'6 8' }).addTo(lg);
    // Larian sampingan: putus-putus dan lebih pudar supaya jelas ia bukan laluan semua orang
    const lr = DATA.larian && DATA.larian[d];
    if(lr){
      const lpts = lr.titik.map(id => [P[id].lat, P[id].lng]);
      const lgaris = L.polyline(lpts, { color:colors[d], weight:3.5, opacity:.6, dashArray:'7 7' })
        .bindTooltip(lr.label, { sticky:true }).addTo(lg);
      fetchRoute(null, lpts, colors[d], lg, lgaris, { opacity:.6, dashArray:'7 7', weight:3.5, label:lr.label });
    }
    MAP.layers[d] = lg; lg.addTo(map);
    fetchRoute(d, pts, colors[d], lg, fallback);
  });
  const b = L.latLngBounds(Object.values(P).filter(p=>p.lat>4).map(p=>[p.lat,p.lng]));
  map.fitBounds(b, { padding:[24,24] });

  $('#map-ctl').addEventListener('click', e => {
    const btn = e.target.closest('button'); if(!btn) return;
    tunjukHari(btn.dataset.day);
  });
  MAP.pilihHari = tunjukHari;
  function tunjukHari(sel){
    const btn = [...$('#map-ctl').children].find(x => x.dataset.day === sel) || $('#map-ctl').children[0];
    [...$('#map-ctl').children].forEach(x=>x.classList.toggle('on', x===btn));
    [1,2,3].forEach(d => { if(sel==='all' || String(d)===sel) MAP.layers[d].addTo(map); else map.removeLayer(MAP.layers[d]); });
    if(sel==='all') map.fitBounds(b, { padding:[24,24] });
    else {
      // Sertakan larian sampingan supaya ia tidak terkeluar dari paparan
      const ids = DATA.routes[+sel].slice();
      const lr = DATA.larian && DATA.larian[+sel];
      if(lr) lr.titik.forEach(id => { if(!ids.includes(id)) ids.push(id); });
      const pts = ids.map(id=>[P[id].lat,P[id].lng]);
      map.fitBounds(L.latLngBounds(pts), { padding:[30,30] });
    }
  }
}
function popupHtml(p, d, item){
  const when = item ? (fmtT(item.t) + (item.e ? ' – ' + fmtT(item.e) : '')) : '';
  return `<div>${d?`<div class="pp-day" style="color:var(--d${d})">Hari ${d}${when?', '+esc(when):''}</div>`:''}
  <div class="pp-title"><a href="${gprofile(p)}" target="_blank" rel="noopener">${esc(p.name)}</a></div>
  <div class="pp-meta">${esc(p.addr||'')}${p.hours?'<br>Buka '+esc(p.hours):''}${p.cost?'<br>'+esc(p.cost):''}${p.note?'<br>'+esc(p.note):''}</div>
  <div class="pp-links"><a class="wz" href="${waze(p)}" target="_blank" rel="noopener">Waze</a><a href="${gmaps(p)}" target="_blank" rel="noopener">Google Maps</a></div></div>`;
}
async function fetchRoute(d, pts, color, lg, fallback, gaya){
  try{
    const coords = pts.map(p=>p[1]+','+p[0]).join(';');
    const r = await fetch(`https://router.project-osrm.org/route/v1/driving/${coords}?overview=full&geometries=geojson`, { cache:'force-cache' });
    if(!r.ok) throw new Error(r.status);
    const j = await r.json();
    const route = j.routes && j.routes[0]; if(!route) throw new Error('no route');
    lg.removeLayer(fallback);
    const st = gaya ? { color, weight:gaya.weight, opacity:gaya.opacity, dashArray:gaya.dashArray } : { color, weight:4, opacity:.85 };
    const baru = L.geoJSON(route.geometry, { style:st }).addTo(lg);
    if(gaya && gaya.label) baru.bindTooltip(gaya.label, { sticky:true });
    if(d === null) return;
    const min = Math.round(route.duration/60);
    const el = $(`#rs-time-${d}`); if(el) el.textContent = durShort(min);
  }catch(err){
    const nt = $('#map-note-text'); if(nt) nt.textContent = 'Garisan putus-putus, laluan jalan tak dapat dimuat';
  }
}
initMap();

/* ============================================================
   NOTA PETA + NAIK KE ATAS
   ============================================================ */
(function mapNote(){
  const x = $('#map-note-x'); if(!x) return;
  x.addEventListener('click', () => { $('#map-note').hidden = true; });
})();

(function toTop(){
  const btn = $('#to-top'), peta = $('#peta'); if(!btn || !peta) return;
  let tunggu = false;
  // Muncul hanya selepas seksyen peta habis, supaya tidak bertindih kawalan peta.
  const upd = () => { tunggu = false; btn.classList.toggle('on', peta.getBoundingClientRect().bottom < 0); };
  window.addEventListener('scroll', () => { if(!tunggu){ tunggu = true; requestAnimationFrame(upd); } }, { passive:true });
  window.addEventListener('resize', upd, { passive:true });
  btn.addEventListener('click', () => window.scrollTo({ top:0, behavior:'smooth' }));
  upd();
})();

/* ============================================================
   ROUTE SUMMARY + INSIGHT
   ============================================================ */
(function routeSum(){
  // Masa memandu awal dikira dari segmen DATA (tanpa jalan kaki); OSRM ganti bila sambungan ada.
  const driveMin = d => d.items.filter(i => i.move && !i.move.walk).reduce((a,i) => a + (i.move.min||0), 0);
  const lbl = (k, teks) => `<th scope="row"><svg viewBox="0 0 24 24" aria-hidden="true">${RS_ICON[k]}</svg>${esc(teks)}</th>`;
  const sel = (fn) => DATA.days.map(d => `<td>${fn(d)}</td>`).join('');
  $('#route-sum').innerHTML = `<table class="rs-tbl">`
    + `<thead><tr><td></td>${DATA.days.map(d => `<th scope="col" class="d${d.n}">Day ${d.n}</th>`).join('')}</tr></thead><tbody>`
    + `<tr>${lbl('jarak','Distance')}${sel(d => esc(d.km + ' km'))}</tr>`
    + `<tr>${lbl('masa','Driving Time')}${DATA.days.map(d => `<td id="rs-time-${d.n}">${esc(durShort(driveMin(d)))}</td>`).join('')}</tr>`
    + `<tr>${lbl('tol','Toll')}${sel(d => esc(d.toll))}</tr>`
    + `<tr>${lbl('minyak','Fuel')}${sel(d => esc(d.fuel))}</tr>`
    + `</tbody></table>`;
  // Nota tol/minyak setiap hari tak muat dalam sel sempit, jadi diletak bawah jadual.
  const kaki = DATA.days.map(d => { const bit = [d.tollNote && 'tol ' + d.tollNote, d.fuelNote && 'minyak ' + d.fuelNote].filter(Boolean);
    return bit.length ? `Day ${d.n}: ${bit.join(', ')}` : null; }).filter(Boolean);
  $('#route-foot').textContent = kaki.join('. ') + (kaki.length ? '.' : '');
  $('#route-note').textContent = DATA.routeNote;
})();

// Ikon garis halus untuk setiap kategori baris "Butiran".
const DET_ICON = {
  nama:'<path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z"/><circle cx="12" cy="10" r="2.6"/>',
  alamat:'<path d="M9 4 3.5 6.2v13.3L9 17.3l6 2.2 5.5-2.2V4L15 6.2 9 4Z"/><path d="M9 4v13.3M15 6.2v13.3"/>',
  telefon:'<path d="M6.5 3.5h3l1.5 4-2 1.5a12 12 0 0 0 6 6l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.5 5.7a2 2 0 0 1 2-2.2Z"/>',
  waktu:'<circle cx="12" cy="12" r="8.5"/><path d="M12 7.2V12l3.2 2"/>',
  ulasan:'<path d="M12 4.2l2.3 4.7 5.2.8-3.8 3.6.9 5.1-4.6-2.4-4.6 2.4.9-5.1L4.5 9.7l5.2-.8L12 4.2Z"/>',
  istimewa:'<path d="M12 3.5l1.9 4.4 4.6.4-3.5 3 1.1 4.5L12 13.4 7.9 15.8 9 11.3l-3.5-3 4.6-.4L12 3.5Z"/><path d="M18.5 17.5l.7 1.6 1.6.7-1.6.7-.7 1.6-.7-1.6-1.6-.7 1.6-.7.7-1.6Z"/>',
  tips:'<path d="M9.2 17.5h5.6M10 20.5h4"/><path d="M12 3.5a5.5 5.5 0 0 1 3.4 9.8c-.6.5-.9 1.1-.9 1.8H9.5c0-.7-.3-1.3-.9-1.8A5.5 5.5 0 0 1 12 3.5Z"/>',
  kos:'<circle cx="12" cy="12" r="8.5"/><path d="M14.4 9.3A2.9 2.9 0 0 0 9.7 10c0 2.5 4.8 1.5 4.8 4a2.9 2.9 0 0 1-4.8.8M12 7.3v1.3M12 15.3v1.3"/>',
  nota:'<path d="M5.5 4.5h13v15h-13z"/><path d="M8.5 8.5h7M8.5 12h7M8.5 15.5h4"/>'
};
const pilBintang = (rating, reviews) => rating
  ? `<span class="bdg rate">${STAR}${rating.toFixed(1)}${reviews?' · '+reviews.toLocaleString('ms-MY')+' ulasan':''}</span>`
  : '';
const det = (k, isi) => `<li><svg viewBox="0 0 24 24" aria-hidden="true">${DET_ICON[k]}</svg><span>${isi}</span></li>`;

// Plan B: satu kad sebaris — nama berpaut, bintang Google, sebab pendek.
function planbHtml(list){
  return `<ul class="pb-list">` + list.map(x => {
    if(x.text) return `<li class="pb pb-note">${esc(x.text)}</li>`;
    const p = x.place ? DATA.places[x.place] : null;
    const nama = x.name || (p && p.name) || '';
    const alamat = x.addr || (p && p.addr) || '';
    const rating = x.rating || (p && p.rating);
    const ulasan = x.reviews || (p && p.reviews);
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent([nama, alamat].filter(Boolean).join(', '))}`;
    const bintang = pilBintang(rating, ulasan);
    const kei = x.kei || (p && (p.tagline || p.special));
    return `<li class="pb"><div class="pb-h"><a href="${url}" target="_blank" rel="noopener">${esc(nama)}</a>${bintang}</div>`
         + `${alamat?`<span class="pb-addr">${esc(alamat)}</span>`:''}`
         + `${alamat?'':''}${x.hours?`<span class="pb-hours">${esc(x.hours)}</span>`:''}`
         + `${kei?`<p class="pb-kei"><b>Keistimewaan:</b> ${esc(kei)}</p>`:''}`
         + `${x.why?`<p>${esc(x.why)}</p>`:''}`
         + `${x.note?`<p class="pb-note-kecil">${esc(x.note)}</p>`:''}</li>`;
  }).join('') + `</ul>`;
}

/* ============================================================
   TIMELINE
   ============================================================ */
(function katLegend(){
  const el = $('#cat-key'); if(!el) return;
  el.innerHTML = DATA.cats.map(c => `<li style="--c:${c.color}"><span class="ico"><svg viewBox="0 0 24 24" aria-hidden="true">${TI_ICON[c.k]}</svg></span>${esc(c.label)}</li>`).join('');
})();

(function timeline(){
  const tabs = $('#day-tabs');
  tabs.innerHTML = DATA.days.map(d => `<button data-day="${d.n}">Day ${d.n}<small>${esc(d.label)}</small></button>`).join('');
  tabs.addEventListener('click', e => { const b = e.target.closest('button'); if(b) renderDay(+b.dataset.day); });
  renderDay(currentDay());
  function currentDay(){
    const today = new Date().toISOString().slice(0,10);
    const hit = DATA.days.find(d => d.date === today);
    return hit ? hit.n : 1;
  }
  function renderDay(n){
    [...tabs.children].forEach(b => b.classList.toggle('on', +b.dataset.day===n));
    const day = DATA.days.find(d => d.n===n);
    $('#day-intro').innerHTML = `<details class="day-intro d${n}"><summary>Perkara paling penting hari ini</summary>`
      + `<ul>${day.intro.map(t => `<li>${esc(t)}</li>`).join('')}</ul></details>`;
    // Merge azan markers
    const pr = DATA.prayer[day.date] || {};
    const azan = ['subuh','zohor','asar','maghrib','isyak'].filter(k=>pr[k]).map(k => ({ azan:k, t:pr[k] }))
      .filter(a => (!day.azanFrom || toMin(a.t) >= toMin(day.azanFrom)) && (!day.azanTo || toMin(a.t) <= toMin(day.azanTo)));
    const rows = [];
    let lastT = null, stopIdx = 0;
    const pushAzanBefore = t => { while(azan.length && (t===null || toMin(azan[0].t) <= toMin(t))){ const a = azan.shift(); rows.push(a); } };
    const gerak = masaGerak(day.items);
    day.items.forEach((it, i) => {
      if(it.t){ pushAzanBefore(it.t); lastT = it.t; }
      if(it.move){
        const seterus = day.items.slice(i+1).find(x => !x.move);
        const p2 = seterus && seterus.place ? DATA.places[seterus.place] : null;
        rows.push({ move:it.move, jam:gerak.get(i), ke:(p2 ? p2.name : (seterus ? seterus.title : '')) });
        return;
      }
      rows.push(it);
    });
    pushAzanBefore(null);
    const P = DATA.places;
    let html = '';
    rows.forEach(it => {
      if(it.azan){
        const nm = { subuh:'Subuh', zohor:'Zohor', asar:'Asar', maghrib:'Maghrib', isyak:'Isyak' }[it.azan];
        html += `<div class="ti ti-azan"><div class="ti-time">${fmtT(it.t)}</div><div class="ti-body">Masuk waktu <b>${nm}</b></div></div>`;
        return;
      }
      if(it.move){
        const m = it.move;
        const jam = it.jam ? julat(fromMin(it.jam[0]), fromMin(it.jam[1])) : '·';
        const ke = it.ke ? `${m.walk?'Jalan kaki ke':'Bergerak ke'} ${esc(it.ke)}` : (m.walk?'Jalan kaki':'Bergerak');
        html += `<div class="ti ti-move"><div class="ti-time">${jam}</div><div class="ti-body">${m.walk?ICON.walk:ICON.car}<span>${ke} · ${dur(m.min)}${m.km?' · '+m.km+' km':''}${m.via?'. '+esc(m.via):''}</span></div></div>`;
        return;
      }
      const p = it.place ? P[it.place] : null;
      const isStop = (it.type==='stop'||it.type==='meal'||it.type==='rehat'||it.type==='solat') && it.place && DATA.markers[n].includes(it.place);
      const pf = it.flightRef ? DATA.flights.find(x => x.flightNo === it.flightRef) : null;
      const fr = pf ? pautanFr24(pf) : '';
      const num = isStop ? `<button type="button" class="n" data-mday="${n}" data-mplace="${esc(it.place)}" aria-label="Tunjuk ${esc(p?p.name:it.title)} pada peta">${++stopIdx}</button>` : '';
      const cat = CAT[it.type];
      const ic = TI_ICON[it.type] ? `<span class="ico" style="--c:${cat?cat.color:'var(--ink-2)'}" title="${cat?esc(cat.label):''}"><svg viewBox="0 0 24 24" aria-hidden="true">${TI_ICON[it.type]}</svg></span>` : '';
      let bdg = '';
      if(p && p.halal){ const h = HALAL[p.halal]; bdg += `<span class="bdg ${p.halal}"><svg viewBox="0 0 24 24" aria-hidden="true">${h.ic}</svg>${h.t}</span>`; }
      if(p && p.rating){ bdg += pilBintang(p.rating, p.reviews); }
      const badges = bdg ? `<div class="badges">${bdg}</div>` : '';
      const flags = (it.flags||[]).map(f => `<span class="flag ${f.k}">${esc(f.v)}</span>`).join('');
      const planB = it.planB && it.planB.length ? `<details class="planb"><summary>Plan B</summary>${planbHtml(it.planB)}</details>` : '';
      const links = p && p.lat && p.kind!=='plane' && it.type!=='note' && it.type!=='move2' ? `<div class="ti-links"><a href="${waze(p)}" target="_blank" rel="noopener">Waze</a><a href="${gmaps(p)}" target="_blank" rel="noopener">Google Maps</a></div>` : '';

      // Item lokasi: satu baris ringkas sahaja, selebihnya dalam "Butiran".
      let lede = '', butiran = '', metaP = '';
      if(p && it.type!=='note'){
        lede = p.tagline ? `<div class="ti-lede">${esc(p.tagline)}</div>` : '';
        const baris = [];
        baris.push(det('nama', `<a href="${gprofile(p)}" target="_blank" rel="noopener">${esc(p.name)}</a>`));
        if(p.addr)   baris.push(det('alamat', esc(p.addr)));
        if(p.phone)  baris.push(det('telefon', `<a href="tel:${esc(p.phone.replace(/[^0-9+]/g,''))}">${esc(p.phone)}</a>`));
        if(p.hours)  baris.push(det('waktu', esc(p.hours)));
        if(p.rating) baris.push(det('ulasan', `Google review: ${pilBintang(p.rating, p.reviews)}`));
        if(p.special)baris.push(det('istimewa', `<b>Keistimewaan:</b> ${esc(p.special)}`));
        if(p.tips)   baris.push(det('tips', Array.isArray(p.tips)
          ? `<b>Tips:</b><ul class="det-tips">${p.tips.map(t => `<li>${esc(t)}</li>`).join('')}</ul>`
          : `<b>Tips:</b> ${esc(p.tips)}`));
        if(p.cost)   baris.push(det('kos', `<b>Kos:</b> ${esc(p.cost)}`));
        if(it.meta)  baris.push(det('nota', `<b>Nota:</b> ${esc(it.meta)}`));
        butiran = `<details class="det"><summary>Details</summary><ul class="det-list">${baris.join('')}</ul></details>`;
      } else {
        const meta = [it.meta, p && p.addr && (it.type!=='note') ? p.addr : '', p && p.hours ? 'Buka ' + p.hours : ''].filter(Boolean);
        metaP = meta.length ? `<div class="ti-meta">${metaHtml(meta, it.metaLink)}</div>` : '';
      }
      const amaran = p && p.halalNote ? `<div class="halal-note">${esc(p.halalNote)}</div>` : '';
      const cost = (!p || it.type==='note') && p && p.cost ? `<div class="ti-cost">${esc(p.cost)}</div>` : '';

      html += `<div class="ti d${n}${it.pilihan?' pilihan':''}">
        <div class="ti-time">${fmtT(it.t)}${it.e?`<span>– ${fmtT(it.e)}</span>`:''}</div>
        <div class="ti-body">
          <div class="ti-title">${ic}<span>${p && it.type!=='note' ? `<a href="${gprofile(p)}" target="_blank" rel="noopener">${esc(it.title)}</a>` : esc(it.title)}${fr ? ' '+fr : ''}</span>${num}</div>
          ${lede}${metaP}${badges}${amaran}${cost}${flags?`<div>${flags}</div>`:''}${butiran}${planB}${links}
        </div></div>`;
    });
    $('#timeline').innerHTML = html;
    segarLangsung();
    $('#timeline').querySelectorAll('button.n').forEach(b => b.addEventListener('click', () => {
      const d = b.dataset.mday, id = b.dataset.mplace, mk = MAP.marks[d + ':' + id];
      if(!mk || !MAP.map) return;
      const aktif = $('#map-ctl .on');
      if(!aktif || (aktif.dataset.day !== d && aktif.dataset.day !== 'all')) MAP.pilihHari(d);
      else if(aktif.dataset.day === 'all') MAP.pilihHari(d);
      $('#peta').scrollIntoView({ behavior:'smooth', block:'start' });
      setTimeout(() => { MAP.map.invalidateSize(); MAP.map.setView(mk.getLatLng(), Math.max(MAP.map.getZoom(), 14), { animate:true }); mk.openPopup(); }, 450);
    }));
  }
})();

/* ============================================================
   SWIMLANE — siapa ada bila
   ============================================================ */
(function lane(){
  // segments: [dayIndex(0..2), startHour, endHour, kind]
  const H0 = 5, H1 = 24; // paparan 5 pg – 12 mlm
  const segSat = [[0,5.5,10.33,'transit'],[0,10.33,24,'here'],[1,0,24,'here']];
  const rowsDef = [
    { g:'F1', segs:[[0,13,24,'here'],[1,0,24,'here'],[2,0,17.25,'here']], note:'Sudah di Pulau Pinang' },
    { g:'F2', segs:[...segSat,[2,0,17.25,'here'],[2,17.25,18.25,'transit']], note:'Balik 5.15 ptg' },
    { g:'F3', segs:[...segSat,[2,0,17.25,'here'],[2,17.25,18.25,'transit']], note:'Balik 5.15 ptg' },
    { g:'F4', segs:[...segSat,[2,0,17.25,'here'],[2,17.25,18.25,'transit']], note:'Balik 5.15 ptg' },
    { g:'S1', segs:[...segSat,[2,0,17.25,'here'],[2,17.25,18.25,'transit']], note:'Balik 5.15 ptg' },
    { g:'G2', label:'Madno', segs:[...segSat,[2,0,17.25,'here'],[2,17.25,18.25,'transit']], note:'Balik 5.15 ptg' },
    { g:'G2', label:'Fitri & Fatimah', segs:[...segSat,[2,0,16,'here'],[2,16,17,'transit']], note:'Balik 4.00 ptg' },
    { g:'G1', segs:[[1,5.5,8,'transit'],[1,8,24,'here'],[2,0,17.25,'here'],[2,17.25,18.25,'transit']], note:'Tiba Ahad 8.00 pg' }
  ];
  const pct = h => Math.max(0, Math.min(100, (h - H0) / (H1 - H0) * 100));
  let html = `<div class="lane-head"><span></span><span>Sabtu 12 Sept</span><span>Ahad 13 Sept</span><span>Isnin 14 Sept</span></div>`;
  rowsDef.forEach(r => {
    const g = G(r.g);
    const cells = [0,1,2].map(di => {
      const segs = r.segs.filter(s => s[0]===di).map(s => {
        const a = pct(s[1]), b = pct(s[2]); if(b<=a) return '';
        const label = s[3]==='here' && (b-a) > 30 ? `<span>${esc(g.id)}</span>` : '';
        return `<div class="seg ${s[3]}" style="left:${a}%;width:${b-a}%;--g:${g.color}">${label}</div>`;
      }).join('');
      return `<div class="lane-cell">${segs}</div>`;
    }).join('');
    html += `<div class="lane-row"><div class="lane-name">${esc(r.label||g.label)}<small>${esc(r.note)}</small></div>${cells}</div>`;
  });
  // Penanda masa supaya carta boleh dibaca, bukan sekadar warna
  // Masa sebenar, bukan singkatan. Hari kedua dan ketiga bermula pada garis 12am.
  const tanda = [['6am',6],['12pm',12],['6pm',18]];
  html += `<div class="lane-foot"><span></span>` + [0,1,2].map(di =>
      `<div class="lane-cell">`
      + (di > 0 ? `<i class="tengahmalam" style="left:0%">12am</i>` : '')
      + tanda.map(t => `<i style="left:${pct(t[1])}%">${t[0]}</i>`).join('')
      + `</div>`).join('') + `</div>`;
  $('#lane').innerHTML = html;
  $('#codekey').innerHTML = DATA.groups.map(g => `<span><b style="--g:${g.color}">${esc(g.id)}</b>${esc(g.label)}<em>${g.pax} org</em></span>`).join('');
  const total = DATA.groups.reduce((a,g)=>a+g.pax,0);
  const g1 = G('G1').pax;
  const kira = [[total-g1,'Sabtu, lepas 10.20 pg'],[total,'Ahad, lepas 8.00 pg'],[total,'Isnin, semua balik petang']];
  $('#headcount').innerHTML = kira.map(([v,l],i) => `<div><b>Day ${i+1} — ${v} pax</b><span>${esc(l)}</span></div>`).join('');
})();

/* ============================================================
   FLIGHTS
   ============================================================ */
(function flights(){
  const chip = w => { const [gid, nm] = w.split(':'); const g = G(gid); return `<span class="chip" style="--g:${g.color}">${esc(nm || g.label)}</span>`; };
  const baris = f => `<div class="board-row">
      <div class="t">${f.dep?fmtT(f.dep):'—'}${f.est?'<i class="est">anggaran</i>':''}<small>${esc(f.date)}</small></div>
      <div><div class="r">${esc(f.fromName)} → ${esc(f.toName)} <span>${f.arr?'tiba '+fmtT(f.arr):''}${f.flightNo?(f.arr?', ':'')+pautanFr24(f):''}</span></div>
        <div class="who">${f.who.map(chip).join('')}</div>
        ${f.note?`<div class="note">${esc(f.note)}</div>`:''}</div></div>`;
  const kump = [['Pergi', DATA.flights.filter(f => f.to === 'PEN')], ['Balik', DATA.flights.filter(f => f.from === 'PEN')]];
  $('#board').innerHTML = kump.map(([nm, list]) => `<div class="board-grp">${esc(nm)}</div>` + list.map(baris).join('')).join('');
  segarLangsung();
  $('#cut-title').innerHTML = `<svg class="cut-ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="13" r="8"/><path d="M12 9v4l2.6 1.6M9 2.4h6M18.6 6.4l1.4-1.4"/></svg>${esc(DATA.cutoff.title)}`;
  $('#cutoff').innerHTML = DATA.cutoff.rows.map(c => `<div><b>${fmtT(c.t)}</b><span>${esc(c.l)}</span><em>${esc(c.d)}</em></div>`).join('');
  $('#cut-foot').textContent = DATA.cutoff.foot;
  $('#kl-rule').textContent = DATA.klRule;
  $('#kl-list').innerHTML = DATA.klSide.map(k => { const g = G(k.g);
    const opts = k.opts.map(o => `<div class="opt${o.main?' main':''}">
        <div class="opt-h"><span class="opt-k">${esc(o.k)}</span><b>${esc(o.name)}</b>${o.main?'<em>Pilihan utama</em>':''}${o.link?'<i class="lk">berkait</i>':''}</div>
        <table class="opt-tbl"><thead><tr><th>Langkah</th><th class="num">Masa</th><th class="num">Kos</th></tr></thead><tbody>${o.steps.map(r=>`<tr><td>${esc(r[0])}</td><td class="num">${esc(r[1])}</td><td class="num">${esc(r[2])}</td></tr>`).join('')}</tbody></table>
        ${o.nota?`<div class="opt-nota">${esc(o.nota)}</div>`:''}
        ${o.link?`<div class="opt-link">${esc(o.link)}</div>`:''}
      </div>`).join('');
    return `<div class="kl" style="--g:${g.color}"><h3>${esc(k.title)}<span>${esc(k.sub)}</span></h3>${opts}${k.foot?`<div class="kl-foot">${esc(k.foot)}</div>`:''}</div>`;
  }).join('');

  $('#seatnote').innerHTML = `<b>Seat pesawat.</b> AirAsia jual pilihan seat sebagai tambahan. Kalau tak beli, sistem beri secara rawak dan keluarga boleh terpisah. Untuk penerbangan 55 minit ini, cara paling murah ialah beritahu kaunter check-in yang ada anak kecil — mereka biasanya boleh susun supaya duduk bersebelahan tanpa caj.`;
})();

/* ============================================================
   SEAT MAP — ilustrasi kereta pandangan atas (SVG tunggal)
   ============================================================ */
// Geometri kabin. Semua nilai dalam unit viewBox 300 x 620.
const SM = {
  w:300, h:620,
  cabin:{ x:26, y:100, w:248, h:504 },
  seatX:{ tiga:[30,112,194], depan:[30,194], kapten:[30,178] },
  seatW:{ tiga:76, depan:76, kapten:92 },
  rowY:[140, 261, 382, 503],
  seatH:56, sandaranH:22
};

// Pecahkan nama panjang kepada dua baris supaya muat dalam kerusi.
function smWrap(nm){
  if(nm.length <= 11) return [nm];
  if(nm.includes(' + ')){ const p = nm.split(' + '); return [p[0], '+ ' + p.slice(1).join(' + ')]; }
  const w = nm.split(' ');
  if(w.length === 1) return [nm];
  let pecah = 1, beza = 1e9;
  for(let i=1;i<w.length;i++){
    const a = w.slice(0,i).join(' ').length, b = w.slice(i).join(' ').length;
    if(Math.abs(a-b) < beza){ beza = Math.abs(a-b); pecah = i; }
  }
  return [w.slice(0,pecah).join(' '), w.slice(pecah).join(' ')];
}

// Satu kerusi: sandaran bentuk U terbalik di bawah, kusyen di atas, nama di tengah.
function smSeat(x, y, w, isi, nama, pemandu, beg, uid){
  const h = SM.seatH, b = y + h, u = b + SM.sandaranH - 6, cx = x + w/2;
  const sandaran = `<path d="M${x+4} ${b-12} V${u-4} Q${x+4} ${u+2} ${x+10} ${u+2} H${x+w-10} Q${x+w-4} ${u+2} ${x+w-4} ${u-4} V${b-12}" fill="none" stroke="#33424C" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>`;
  if(beg){
    return sandaran
      + `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="9" fill="#E7EBEC" stroke="#C3CCD1" stroke-width="1.5"/>`
      + `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="9" fill="url(#sm-hatch-${uid})"/>`
      + `<g transform="translate(${cx-9},${y+11})" fill="none" stroke="#6E7C85" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">`
      + `<rect x="1" y="4.5" width="16" height="11.5" rx="2"/><path d="M6 4.5V3a1.4 1.4 0 0 1 1.4-1.4h3.2A1.4 1.4 0 0 1 12 3v1.5"/></g>`
      + `<text x="${cx}" y="${y+43}" text-anchor="middle" fill="#5D6A72" font-weight="700" font-size="11">Beg</text>`;
  }
  const ink = '#fff'; // nama sentiasa putih; warna kumpulan digelapkan dalam DATA kalau perlu
  const baris = smWrap(nama);
  let teks;
  if(pemandu){
    teks = `<text x="${cx}" y="${y+24}" text-anchor="middle" fill="${ink}" font-weight="700" font-size="11.5">${esc(baris[0])}</text>`
         + (baris[1] ? `<text x="${cx}" y="${y+36}" text-anchor="middle" fill="${ink}" font-weight="700" font-size="11.5">${esc(baris[1])}</text>` : '')
         + `<text x="${cx}" y="${y + (baris[1]?48:40)}" text-anchor="middle" fill="${ink}" font-weight="600" font-size="8">Starting driver</text>`;
  } else if(baris[1]){
    teks = `<text x="${cx}" y="${y+24}" text-anchor="middle" fill="${ink}" font-weight="700" font-size="11.5">${esc(baris[0])}</text>`
         + `<text x="${cx}" y="${y+38}" text-anchor="middle" fill="${ink}" font-weight="700" font-size="11.5">${esc(baris[1])}</text>`;
  } else {
    teks = `<text x="${cx}" y="${y+32}" text-anchor="middle" fill="${ink}" font-weight="700" font-size="11.5">${esc(baris[0])}</text>`;
  }
  return sandaran
    + `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="9" fill="${isi}" stroke="${isi}" stroke-width="1.5"/>`
    + teks;
}

// Badan kenderaan, cermin depan, papan pemuka, stereng di KANAN, cermin sisi.
function smBody(uid){
  return `<defs>`
    + `<pattern id="sm-hatch-${uid}" width="8" height="8" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">`
    + `<line x1="0" y1="0" x2="0" y2="8" stroke="#AEB9BF" stroke-width="3.2"/></pattern>`
    + `</defs>`
    + `<rect x="10" y="94" width="10" height="7" rx="2.5" fill="#8A96A0"/><rect x="16" y="96.5" width="6" height="3" rx="1.5" fill="#8A96A0"/>`
    + `<rect x="280" y="94" width="10" height="7" rx="2.5" fill="#8A96A0"/><rect x="278" y="96.5" width="6" height="3" rx="1.5" fill="#8A96A0"/>`
    + `<path d="M18 96 V58 Q18 14 62 10 H238 Q282 14 282 58 V600 Q282 612 270 612 H30 Q18 612 18 600 Z" fill="#D5DBDE" stroke="#BAC3C8" stroke-width="2"/>`
    + `<rect x="${SM.cabin.x}" y="${SM.cabin.y}" width="${SM.cabin.w}" height="${SM.cabin.h}" rx="14" fill="var(--panel)" stroke="#C6CFD3" stroke-width="1.5"/>`
    + `<path d="M28 96 Q150 40 272 96" fill="none" stroke="#AFBBC2" stroke-width="7" stroke-linecap="round"/>`
    + `<path d="M40 92 Q150 52 260 92" fill="none" stroke="#E3E9EB" stroke-width="3" stroke-linecap="round"/>`
    + `<rect x="32" y="106" width="236" height="17" rx="8" fill="#41505A"/>`
    + `<rect x="48" y="112" width="52" height="5" rx="2.5" fill="#6E7C86"/>`
    + `<g transform="translate(232,126)"><circle r="14" fill="none" stroke="#2E3B44" stroke-width="4.5"/>`
    + `<circle r="4.5" fill="#2E3B44"/><path d="M-14 1.5H-5M14 1.5H5M0 4.5V14" stroke="#2E3B44" stroke-width="3.5" stroke-linecap="round"/></g>`;
}

// Bina SVG penuh untuk satu kereta.
function carSvg(c, uid){
  let n = 0, body = '', pangku = [];
  DATA.carRows.forEach((cols, ri) => {
    const jenis = cols === 3 ? 'tiga' : (ri === 2 ? 'kapten' : 'depan');
    const xs = SM.seatX[jenis], w = SM.seatW[jenis], y = SM.rowY[ri];
    if(c.stroller === ri+1){
      const by = y - 37;
      body += `<rect x="30" y="${by}" width="240" height="26" rx="7" fill="#EDF0F1" stroke="#9AA6AD" stroke-width="1.2" stroke-dasharray="5 4"/>`
        + `<rect x="30" y="${by}" width="240" height="26" rx="7" fill="url(#sm-hatch-${uid})" opacity=".55"/>`
        + `<text x="150" y="${by+17}" text-anchor="middle" fill="#5D6A72" font-weight="700" font-size="11">Ruang stroller</text>`;
    }
    if(jenis === 'kapten'){
      body += `<line x1="150" y1="${y-4}" x2="150" y2="${y+SM.seatH+18}" stroke="#C6CFD3" stroke-width="2" stroke-dasharray="6 6" stroke-linecap="round"/>`;
    }
    for(let k=0;k<cols;k++){
      const s = c.seats[n++] || '';
      if(s === 'BEG'){ body += smSeat(xs[k], y, w, '', '', false, true, uid); continue; }
      if(!s){ body += smSeat(xs[k], y, w, '#E7EBEC', 'Kosong', false, false, uid); continue; }
      const [gid, nm, tag, lap] = s.split(':'); const g = G(gid);
      if(lap) pangku.push([lap, nm.split(' + ')[0]]);
      body += smSeat(xs[k], y, w, g.color, nm, tag === 'D', false, uid);
    }
  });
  const svg = `<svg class="carmap" viewBox="0 0 ${SM.w} ${SM.h}" role="img" aria-label="Susun atur seat ${esc(c.name)}">${smBody(uid)}${body}</svg>`;
  return { svg, pangku };
}

/* ============================================================
   CARS
   ============================================================ */
(function cars(){
  const tabs = $('#car-tabs');
  tabs.innerHTML = DATA.carScenarios.map((s,i) => `<button data-i="${i}">${esc(s.tab)}<small>${esc(s.sub)}</small></button>`).join('');
  tabs.addEventListener('click', e => { const b = e.target.closest('button'); if(b) render(+b.dataset.i); });
  render(0);
  function render(i){
    const sc = DATA.carScenarios[i];
    [...tabs.children].forEach((b,k) => b.classList.toggle('on', k===i));
    $('#car-note').innerHTML = `<div class="day-intro d3"><b>${esc(sc.when)}.</b> ${esc(sc.note)}</div>`;
    $('#cars').innerHTML = sc.cars.map((c, ci) => {
      const { svg, pangku } = carSvg(c, i + '-' + ci);
      const ppl = c.seats.filter(s => s && s!=='BEG').length + c.seats.filter(s => (s.split(':')[3]||'')).length;
      const bags = c.seats.filter(s => s==='BEG').length;
      const kaki = pangku.map(([a,b]) => `${esc(a)} dipangku oleh ${esc(b)}.`).join(' ');
      return `<div class="car"><h3>${esc(c.name)} <span class="sug">(Cadangan)</span><span>Staria 10 seat</span></h3>`
        + `<div class="cnote">${esc(DATA.carNote)}</div>`
        + `<div class="drv">Starting driver: <b>${esc(c.driver)}</b>. ${ppl} orang${bags?`, ${bags} ruang beg`:''}. Boleh tukar.</div>`
        + svg
        + `<div class="cfoot">${kaki ? esc(kaki) + ' ' : ''}${esc(DATA.carFoot)}</div>`
        + `<details class="cadangan"><summary>Cadangan kedudukan</summary><ul>${DATA.carTips.map(t => `<li>${esc(t)}</li>`).join('')}</ul></details>`
        + `</div>`;
    }).join('');
    const t = sc.third;
    $('#own-car').innerHTML = t
      ? `<span><i class="dot" style="background:${G(t.g).color}"></i>${esc(t.text)}</span>`
      : `<span class="muted">Semua dalam 2 Staria pada peringkat ini.</span>`;
  }
  $('#legend').innerHTML = DATA.groups.map(g => `<span style="--g:${g.color}"><i></i>${esc(g.label)} (${g.pax})</span>`).join('');
})();

/* ============================================================
   STAY
   ============================================================ */
(function stay(){
  const s = DATA.stay, p = DATA.places.homestay;
  // Ikon kad fakta homestay
  const FAKTA = { 'bilik tidur':'katil', 'katil':'katil', 'bilik air':'air', 'tingkat':'tingkat' };
  const btnGam = (s.images && s.images.length)
    ? `<button type="button" class="btn-galeri" id="btn-galeri">`
      + `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="8.5" cy="10" r="1.6"/><path d="M21 16l-5-5-4.5 4.5L9 13l-6 6"/></svg>`
      + `<span>Lihat gambar</span></button>`
    : '';
  $('#stay').innerHTML = `<div class="stay-tajuk"><h3>${esc(s.name)}</h3>${btnGam}</div><p>${esc(s.addr)}</p>
    <div class="facts">${s.facts.map(f=>`<div><span class="fi"><svg viewBox="0 0 24 24" aria-hidden="true">${FAKTA_ICON[FAKTA[f[1]]||'katil']}</svg></span><b>${esc(f[0])}</b><span>${esc(f[1])}</span></div>`).join('')}</div>
    <p><b>Check-in</b> ${esc(s.checkin)}<br><b>Check-out</b> ${esc(s.checkout)}</p>
    <div class="ti-links" style="margin:10px 0 16px"><a href="${waze(p)}" target="_blank" rel="noopener">Waze</a><a href="${gmaps(p)}" target="_blank" rel="noopener">Google Maps</a></div>
    <h3 style="font-size:.95rem">Agihan bilik <span style="font-weight:500;color:var(--ink-2)">(cadangan)</span></h3><p class="bilik-nota">Nombor bilik di sini hanya senarai, bukan nombor bilik sebenar di rumah.</p>
    <div class="rooms">${s.rooms.map(r => { const g = r.g ? G(r.g) : null, g2 = r.g2 ? G(r.g2) : null; return `<div class="room ${g?'':'vacant'}${g2?' dua':''}" style="--g:${g?g.color:'transparent'};--g2:${g2?g2.color:'transparent'}"><b>Bilik ${r.n}</b>${esc(r.who)}${r.sub?`<br><small>${esc(r.sub)}</small>`:''}</div>`; }).join('')}</div>`;
})();

(function galeri(){
  const btn = $('#btn-galeri'), box = $('#galeri'); if(!btn || !box) return;
  const imgs = DATA.stay.images || []; if(!imgs.length) return;
  const jalur = box.querySelector('.gl-isi');
  // aspect-ratio ditetapkan dari saiz sebenar supaya tiada lompatan semasa memuat
  jalur.innerHTML = imgs.map(g => `<figure class="gl-slaid">
      <img src="${esc(g.src)}" alt="${esc(g.alt || 'Homestay Karpal Singh Drive')}"
           width="${g.w}" height="${g.h}" style="aspect-ratio:${g.w}/${g.h}"
           loading="lazy" decoding="async">
      <figcaption>${esc(g.alt || 'Homestay Karpal Singh Drive')}</figcaption>
    </figure>`).join('');

  const kira = box.querySelector('#gl-kira');
  let semasa = -1;
  function segar(){
    const i = Math.round(jalur.scrollLeft / jalur.clientWidth);
    const n = Math.max(0, Math.min(i, imgs.length - 1));
    if(n === semasa) return;
    semasa = n;
    kira.textContent = (n + 1) + ' / ' + imgs.length;
  }
  jalur.addEventListener('scroll', () => { requestAnimationFrame(segar); }, { passive:true });

  function ke(n){
    const t = Math.max(0, Math.min(n, imgs.length - 1));
    jalur.scrollTo({ left: t * jalur.clientWidth, behavior:'smooth' });
  }
  box.querySelector('#gl-prev').addEventListener('click', () => ke(semasa - 1));
  box.querySelector('#gl-next').addEventListener('click', () => ke(semasa + 1));

  let skrolHalaman = 0;
  const tutup = () => {
    box.hidden = true;
    document.body.style.overflow = '';
    window.scrollTo({ top:skrolHalaman, behavior:'instant' });  // kembali serta-merta, tanpa animasi
    btn.focus({ preventScroll:true });
  };
  btn.addEventListener('click', () => {
    skrolHalaman = window.scrollY;
    box.hidden = false; document.body.style.overflow = 'hidden';
    jalur.scrollLeft = 0; semasa = -1; segar();
    box.querySelector('.rk-x').focus({ preventScroll:true });
  });
  box.querySelector('.rk-x').addEventListener('click', tutup);
  box.addEventListener('click', e => { if(e.target === box) tutup(); });
  document.addEventListener('keydown', e => {
    if(box.hidden) return;
    if(e.key === 'Escape') tutup();
    else if(e.key === 'ArrowRight') ke(semasa + 1);
    else if(e.key === 'ArrowLeft') ke(semasa - 1);
  });
  window.addEventListener('resize', () => { if(!box.hidden) jalur.scrollLeft = semasa * jalur.clientWidth; }, { passive:true });
})();

/* ============================================================
   SOLAT TABLE
   ============================================================ */
(function solat(){
  const keys = [['subuh','Subuh'],['syuruk','Syuruk'],['zohor','Zohor'],['asar','Asar'],['maghrib','Maghrib'],['isyak','Isyak']];
  const days = DATA.days;
  $('#solat-tbl').innerHTML = `<thead><tr><th></th>${days.map(d=>`<th class="num">${esc(d.short)} ${d.date.slice(8)}</th>`).join('')}</tr></thead><tbody>` +
    keys.map(k => `<tr><td>${k[1]}</td>${days.map(d=>`<td class="num">${fmtT(DATA.prayer[d.date][k[0]])}</td>`).join('')}</tr>`).join('') + `</tbody>`;
})();

/* ============================================================
   COSTS / RAIN / CHECKLIST
   ============================================================ */
const KOS_GRP = [['pergi','Perjalanan ke KLIA2'],['pinang','Semasa di Pulau Pinang'],['balik','Balik']];
$('#cost-tbl').innerHTML = `<thead><tr><th>Perkara</th><th class="num">Dewasa</th><th class="num">Kanak-kanak</th></tr></thead><tbody>`
  + KOS_GRP.map(([g,nm]) => `<tr class="grp"><td colspan="3">${esc(nm)}</td></tr>`
      + DATA.costs.filter(c => c.grp === g).map(c => `<tr><td>${esc(c.item)}<small>${esc(c.note||'')}</small></td>`
        + `<td class="num">${esc(c.dewasa)}</td><td class="num">${esc(c.kanak)}</td></tr>`).join('')).join('')
  + `</tbody>`;
$('#road-km').textContent = DATA.jalan.km;
$('#toll-tbl').innerHTML = `<thead><tr><th>Tol</th><th>Kadar</th><th class="num">Jumlah</th></tr></thead><tbody>` + DATA.jalan.tolrows.map(r => `<tr><td>${esc(r.apa)}<small>${esc(r.bila)}</small></td><td>${esc(r.kadar)}</td><td class="num">${esc(r.total)}</td></tr>`).join('') + `</tbody>`;
$('#fuel-tbl').innerHTML = `<thead><tr><th>Bahan api</th><th class="num">Seliter</th><th class="num">1 kereta</th><th class="num">2 kereta</th></tr></thead><tbody>` + DATA.jalan.bahanapi.map(r => `<tr class="${r.utama?'utama':''}"><td>${esc(r.jenis)}</td><td class="num">${esc(r.harga)}</td><td class="num">${esc(r.kereta)}</td><td class="num">${esc(r.total)}</td></tr>`).join('') + `</tbody>`;
if(DATA.jalan.notaFuel){ const n=document.createElement('p'); n.className='fuel-nota'; n.textContent=DATA.jalan.notaFuel; $('#fuel-tbl').after(n); }
$('#road-note').textContent = DATA.jalan.nota;
$('#road-rental').innerHTML = `<b>Kereta sewa.</b> ${esc(DATA.jalan.rental)}`;
$('#bag-note').textContent = DATA.bagasi.note;
const LAD_ICON = [
  '<circle cx="12" cy="12" r="8.5"/><path d="M9.2 12.2l2 2 3.6-4"/>',
  '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.3V12l3 1.8"/>',
  '<path d="M12 4.5l8.5 15h-17Z"/><path d="M12 10v4M12 16.6v.5"/>',
  '<circle cx="12" cy="12" r="8.5"/><path d="M8.6 8.6l6.8 6.8M15.4 8.6l-6.8 6.8"/>'
];
$('#bag-ladder').innerHTML = DATA.bagasi.ladder.map((x,n) => `<div class="lad l${n}"><span class="li"><svg viewBox="0 0 24 24" aria-hidden="true">${LAD_ICON[n]}</svg></span><b>${esc(x[0])}</b><span>${esc(x[1])}</span></div>`).join('');
$('#bag-tbl').innerHTML = `<thead><tr><th>Peraturan</th><th>Details</th></tr></thead><tbody>` + DATA.bagasi.rules.map(r => `<tr><td>${esc(r[0])}</td><td>${esc(r[1])}</td></tr>`).join('') + `</tbody>`;
$('#bag-tip').innerHTML = `<b>Tip untuk kumpulan besar.</b> ${esc(DATA.bagasi.tip)}`;
$('#rain').innerHTML = DATA.rain.map(r => `<div><b>${esc(r.when)}</b><p>${esc(r.plan)}</p></div>`).join('');
// Tip: kotak tanda boleh ditekan tetapi tidak disimpan — hiasan visual sahaja.
// Teks selepas sempang jadi nota kecil; kalau tiada medan nota, pecahkan pada sempang.
$('#check').innerHTML = DATA.checklist.map(c => {
  let utama = c.t, nota = c.nota || '';
  if(!nota){ const p = c.t.split(' — '); if(p.length > 1){ utama = p[0]; nota = p.slice(1).join(' — '); } }
  return `<li>`
    + `<button type="button" class="tick" aria-pressed="false" aria-label="Tanda: ${esc(utama)}">`
    + `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg></button>`
    + `<span class="ci"><svg viewBox="0 0 24 24" aria-hidden="true">${CHK_ICON[c.i]||CHK_ICON.beg}</svg></span>`
    + `<span class="ct">${esc(utama)}${nota ? `<i>${esc(nota)}</i>` : ''}</span></li>`;
}).join('');
$('#check').addEventListener('click', e => {
  const b = e.target.closest('.tick'); if(!b) return;
  const on = b.getAttribute('aria-pressed') === 'true';
  b.setAttribute('aria-pressed', String(!on));
  b.closest('li').classList.toggle('ditanda', !on);
});

/* ============================================================
   APA YANG BERUBAH
   ============================================================ */
(function ubah(){
  const btn = $('#btn-ubah'), box = $('#ubah'), isi = $('#ubah-isi');
  if(!btn || !box || !isi) return;
  const log = DATA.changelog || []; if(!log.length){ btn.remove(); return; }
  const KUNCI = 'penang2026-versi-dilihat';

  // Keutamaan paparan sahaja, bukan data trip. Kalau storan disekat, halaman
  // tetap berfungsi — cuma popup akan muncul semula setiap lawatan.
  const baca = () => { try { return localStorage.getItem(KUNCI); } catch(e){ return null; } };
  const simpan = v => { try { localStorage.setItem(KUNCI, v); } catch(e){} };

  const senarai = it => `<ul>${it.map(x => `<li>${esc(x)}</li>`).join('')}</ul>`;
  const PANAH = '<svg class="ub-panah" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h15M13 6l6 6-6 6"/></svg>';
  const jadual = g => `<table class="ub-jadual"><thead><tr><th>Sebelum</th><th></th><th>Selepas</th></tr></thead><tbody>`
    + g.map(r => `<tr><td class="lama">${esc(r.sebelum)}</td><td class="pnh">${PANAH}</td><td class="baharu">${esc(r.selepas)}</td></tr>`).join('')
    + `</tbody></table>`;
  // Jadual untuk penggantian, senarai pendek "Baru" untuk perkara baru.
  const badan = c => (c.ganti && c.ganti.length ? jadual(c.ganti) : '')
    + (c.baru && c.baru.length ? `<div class="ub-kump"><h4>Baru</h4>${senarai(c.baru)}</div>` : '')
    + (c.items && c.items.length ? senarai(c.items) : '');

  isi.innerHTML = log.map((c, n) => `<details class="ub-v"${n === 0 ? ' open' : ''}>
      <summary><b>Versi ${esc(c.v)}</b><span>${esc(c.tarikh)}</span></summary>
      <div class="ub-badan">${badan(c)}</div>
    </details>`).join('');

  const titik = btn.querySelector('.titik-baru');
  const terkini = log[0].v;
  const segarTitik = () => { titik.hidden = baca() === terkini; };
  segarTitik();

  let skrolHalaman = 0;
  function buka(){
    if(!box.hidden) return;
    skrolHalaman = window.scrollY;
    box.hidden = false; document.body.style.overflow = 'hidden';
    box.querySelector('.rk-x').focus({ preventScroll:true });
  }
  function tutup(){
    box.hidden = true; document.body.style.overflow = '';
    window.scrollTo({ top:skrolHalaman, behavior:'instant' });
    simpan(terkini); segarTitik();          // ditutup bermakna sudah dilihat
    btn.focus({ preventScroll:true });
  }
  btn.addEventListener('click', e => { e.preventDefault(); buka(); });
  box.querySelector('.rk-x').addEventListener('click', tutup);
  box.addEventListener('click', e => { if(e.target === box) tutup(); });
  document.addEventListener('keydown', e => { if(e.key === 'Escape' && !box.hidden) tutup(); });

  // Lawatan pertama (tiada apa tersimpan) atau versi berubah: buka sendiri,
  // lewat sedikit supaya halaman sempat dimuat dahulu.
  if(baca() !== terkini) setTimeout(buka, 1000);
})();


// Confetti halus di belakang ucapan penutup. Statik kalau pengguna minta
// kurangkan gerakan — kepingan tetap ada, cuma tidak bergerak.
function taburConfetti(el){
  if(el.parentElement.classList.contains('ucapan-bekas')) return;
  const bekas = document.createElement('div');
  bekas.className = 'ucapan-bekas';
  el.parentNode.insertBefore(bekas, el);
  bekas.appendChild(el);

  const diam = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const warna = ['var(--d1)','var(--d2)','var(--d3)','var(--ink-3)'];
  const lapis = document.createElement('div');
  lapis.className = 'confetti';
  lapis.setAttribute('aria-hidden','true');
  let html = '';
  for(let n = 0; n < 26; n++){
    const w = 4 + Math.round(Math.random()*4);
    const h = 6 + Math.round(Math.random()*6);
    const kiri = Math.round(Math.random()*100);
    const putar = Math.round(120 + Math.random()*300);
    const sisi = Math.round(-30 + Math.random()*60);
    const gaya = diam
      ? `left:${kiri}%;top:${8 + Math.round(Math.random()*84)}%;--putar:${putar}deg`
      : `left:${kiri}%;--putar:${putar}deg;--sisi:${sisi}px;animation-duration:${(7 + Math.random()*6).toFixed(1)}s;animation-delay:-${(Math.random()*10).toFixed(1)}s`;
    html += `<i style="${gaya};width:${w}px;height:${h}px;background:${warna[n % warna.length]}"></i>`;
  }
  lapis.innerHTML = html;
  bekas.insertBefore(lapis, el);
}

/* ============================================================
   ANIMASI PESAWAT DI HERO
   ============================================================ */
// Dijana dalam kod, tiada fail. Garis halus sahaja, warna --d3 seperti
// ikon tajuk seksyen. Gerakan tenang: satu kitaran penuh 16 saat.
(function pesawat(){
  const bekas = document.getElementById('hero-anim'); if(!bekas) return;
  const awan = [
    { d:'M8 26h22', o:.30, s:26 },
    { d:'M2 40h14', o:.22, s:34 },
    { d:'M14 62h26', o:.26, s:30 },
    { d:'M6 78h16', o:.18, s:38 }
  ];
  bekas.innerHTML = `<svg viewBox="0 0 240 110" preserveAspectRatio="xMidYMid meet" aria-hidden="true" focusable="false">
    <g class="pw-awan">${awan.map((c,i) =>
      `<path d="${c.d}" style="--o:${c.o};--lama:${c.s}s;--tunda:-${i * 4}s"/>`).join('')}</g>
    <g class="pw-jalan"><g class="pw-lambung">
      <g transform="scale(1.9) translate(23.5,0) rotate(90)">
        <path class="pw-badan" d="M4 0c1 0 1.7 1.1 1.7 2.5v6.5l9.5 5.2v2.5l-9.5-2.7v5.5l3 2v2L4 22.8 0.3 23.5v-2l3-2v-5.5L-6.2 16.7v-2.5l9.5-5.2V2.5C3.3 1.1 3 0 4 0Z"/>
      </g>
    </g></g>
  </svg>`;

  // Kalau pengguna minta kurangkan gerakan, letak pesawat di satu tempat tetap.
  if(matchMedia('(prefers-reduced-motion: reduce)').matches) bekas.classList.add('pw-diam');
})();
