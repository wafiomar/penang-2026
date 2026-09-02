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
const gprofile = p => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent([p.name, p.addr].filter(Boolean).join(', '))}`;
const ICON = {
  car:'<svg viewBox="0 0 24 24"><path d="M5 17h14M6 17l1.5-6h9L18 17M4 17v2M20 17v2M7 11l1-3h8l1 3"/><circle cx="8" cy="17" r="1.2"/><circle cx="16" cy="17" r="1.2"/></svg>',
  walk:'<svg viewBox="0 0 24 24"><circle cx="13" cy="4" r="1.5"/><path d="M10 21l2-6 3 3v3M8 13l2-4 3-1 3 3 2 1M12 15l-3 6"/></svg>',
  home:'<svg viewBox="0 0 24 24"><path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z"/></svg>',
  plane:'<svg viewBox="0 0 24 24"><path d="M2 12l7 2 3 7 2-2-1-6 6-4a2 2 0 0 0-2-3l-6 4-6-2-2 2 5 3z"/></svg>'
};

const TI_ICON = {
  meal:'<path d="M6 3v8a2 2 0 0 0 4 0V3M8 11v10M17 3c-1.6 1.2-2.2 3-2.2 5.2 0 1.6.7 2.6 2.2 2.8V21"/>',
  stop:'<path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z"/><circle cx="12" cy="10" r="2.6"/>',
  solat:'<path d="M4 20h16M6 20v-7a6 6 0 0 1 12 0v7M12 3.5v3.5M9.5 20v-3.5a2.5 2.5 0 0 1 5 0V20"/>',
  flight:'<path d="M3 13l7 1.6 3.4 6.4 2-1.8-1-5.6 5.4-3.4a2 2 0 0 0-1.8-3.4l-5.4 3.4L6.4 6.6 4.4 8.4 9 11.4 3 13Z"/>',
  note:'<circle cx="12" cy="12" r="8.5"/><path d="M12 11v5.5M12 7.8v.6"/>',
  move2:'<path d="M4 16h16M6 16l1.4-6h9.2L18 16M5 16v2.2M19 16v2.2"/><circle cx="8.4" cy="16" r="1"/><circle cx="15.6" cy="16" r="1"/>'
};
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
const STAR = '<svg viewBox="0 0 24 24"><path d="M12 3.4l2.6 5.4 5.9.8-4.3 4.1 1 5.9-5.2-2.8-5.2 2.8 1-5.9L3.5 9.6l5.9-.8z"/></svg>';

/* ============================================================
   HERO
   ============================================================ */
(function hero(){
  $('#hero-dates').textContent = DATA.trip.dates;
  $('#hero-pax').textContent = DATA.groups.reduce((a,g)=>a+g.pax,0);
  const start = new Date(DATA.trip.start + 'T00:00:00+08:00');
  const now = new Date();
  const d = Math.ceil((start - now)/864e5);
  const el = $('#countdown');
  if(d>1) el.textContent = d + ' hari lagi';
  else if(d===1) el.textContent = 'Esok bertolak';
  else if(d<=0 && d>-3) el.textContent = 'Sedang berlangsung';
  else el.textContent = 'Selesai — terima kasih semua';
  $('#foot').innerHTML = `Kemas kini ${esc(DATA.trip.updated)} (${esc(DATA.trip.version)}). Waktu solat zon PNG01. Peta © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>, laluan oleh OSRM.`;
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
    links.forEach(l => l.classList.toggle('on', l.getAttribute('href') === '#'+cur.id));
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
const MAP = { map:null, layers:{}, all:null };
function initMap(){
  if(typeof L === 'undefined'){ $('#map').style.display='none'; $('#map-fallback').style.display='block'; $('#map-ctl').style.display='none'; $('#map-note').style.display='none'; return; }
  const map = L.map('map', { scrollWheelZoom:false, zoomControl:true, attributionControl:true });
  MAP.map = map;
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom:19, attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>' }).addTo(map);
  const P = DATA.places;
  const colors = { 1:getComputedStyle(document.documentElement).getPropertyValue('--d1').trim(), 2:getComputedStyle(document.documentElement).getPropertyValue('--d2').trim(), 3:getComputedStyle(document.documentElement).getPropertyValue('--d3').trim() };

  // Static markers: homestay + LTAPP
  const fixed = L.layerGroup().addTo(map);
  const mkFixed = (p, kind) => L.marker([p.lat,p.lng], { icon:L.divIcon({ className:'', html:`<div class="pin ${kind}">${ICON[kind]}</div>`, iconSize:[30,30], iconAnchor:[15,15], popupAnchor:[0,-14] }), zIndexOffset:500 })
    .bindPopup(popupHtml(p, null, null)).addTo(fixed);
  mkFixed(P.homestay,'home'); mkFixed(P.lta,'plane');

  [1,2,3].forEach(d => {
    const lg = L.layerGroup();
    const day = DATA.days.find(x=>x.n===d);
    DATA.markers[d].forEach((id,i) => {
      const p = P[id];
      const item = day.items.find(it => it.place===id);
      L.marker([p.lat,p.lng], { icon:L.divIcon({ className:'', html:`<div class="pin d${d}">${i+1}</div>`, iconSize:[26,26], iconAnchor:[13,13], popupAnchor:[0,-12] }) })
        .bindPopup(popupHtml(p, d, item)).addTo(lg);
    });
    // Route: straight fallback first, replaced by OSRM geometry if available
    const pts = DATA.routes[d].map(id => [P[id].lat, P[id].lng]);
    const fallback = L.polyline(pts, { color:colors[d], weight:3, opacity:.7, dashArray:'6 8' }).addTo(lg);
    MAP.layers[d] = lg; lg.addTo(map);
    fetchRoute(d, pts, colors[d], lg, fallback);
  });
  const b = L.latLngBounds(Object.values(P).filter(p=>p.lat>4).map(p=>[p.lat,p.lng]));
  map.fitBounds(b, { padding:[24,24] });

  $('#map-ctl').addEventListener('click', e => {
    const btn = e.target.closest('button'); if(!btn) return;
    [...$('#map-ctl').children].forEach(x=>x.classList.toggle('on', x===btn));
    const sel = btn.dataset.day;
    [1,2,3].forEach(d => { if(sel==='all' || String(d)===sel) MAP.layers[d].addTo(map); else map.removeLayer(MAP.layers[d]); });
    if(sel==='all') map.fitBounds(b, { padding:[24,24] });
    else { const pts = DATA.routes[+sel].map(id=>[P[id].lat,P[id].lng]); map.fitBounds(L.latLngBounds(pts), { padding:[30,30] }); }
  });
}
function popupHtml(p, d, item){
  const when = item ? (fmtT(item.t) + (item.e ? ' – ' + fmtT(item.e) : '')) : '';
  return `<div>${d?`<div class="pp-day" style="color:var(--d${d})">Hari ${d}${when?', '+esc(when):''}</div>`:''}
  <div class="pp-title"><a href="${gprofile(p)}" target="_blank" rel="noopener">${esc(p.name)}</a></div>
  <div class="pp-meta">${esc(p.addr||'')}${p.hours?'<br>Buka '+esc(p.hours):''}${p.cost?'<br>'+esc(p.cost):''}${p.note?'<br>'+esc(p.note):''}</div>
  <div class="pp-links"><a class="wz" href="${waze(p)}" target="_blank" rel="noopener">Waze</a><a href="${gmaps(p)}" target="_blank" rel="noopener">Google Maps</a></div></div>`;
}
async function fetchRoute(d, pts, color, lg, fallback){
  try{
    const coords = pts.map(p=>p[1]+','+p[0]).join(';');
    const r = await fetch(`https://router.project-osrm.org/route/v1/driving/${coords}?overview=full&geometries=geojson`, { cache:'force-cache' });
    if(!r.ok) throw new Error(r.status);
    const j = await r.json();
    const route = j.routes && j.routes[0]; if(!route) throw new Error('no route');
    lg.removeLayer(fallback);
    L.geoJSON(route.geometry, { style:{ color, weight:4, opacity:.85 } }).addTo(lg);
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
const det = (k, isi) => `<li><svg viewBox="0 0 24 24" aria-hidden="true">${DET_ICON[k]}</svg><span>${isi}</span></li>`;

// Plan B: satu kad sebaris — nama berpaut, bintang Google, sebab pendek.
function planbHtml(list){
  return `<ul class="pb-list">` + list.map(x => {
    if(x.text) return `<li class="pb pb-note">${esc(x.text)}</li>`;
    const p = x.place ? DATA.places[x.place] : null;
    const nama = x.name || (p && p.name) || '';
    const alamat = x.addr || (p && p.addr) || '';
    const rating = x.rating || (p && p.rating);
    const ulasan = p && p.reviews;
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent([nama, alamat].filter(Boolean).join(', '))}`;
    const bintang = rating ? `<span class="bdg rate">${STAR}${rating.toFixed(1)}${ulasan?' · '+ulasan.toLocaleString('ms-MY'):''}</span>` : '';
    return `<li class="pb"><div class="pb-h"><a href="${url}" target="_blank" rel="noopener">${esc(nama)}</a>${bintang}</div>`
         + `${alamat?`<span class="pb-addr">${esc(alamat)}</span>`:''}`
         + `${x.why?`<p>${esc(x.why)}</p>`:''}</li>`;
  }).join('') + `</ul>`;
}

/* ============================================================
   TIMELINE
   ============================================================ */
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
    day.items.forEach(it => {
      if(it.t){ pushAzanBefore(it.t); lastT = it.t; }
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
        html += `<div class="ti ti-move"><div class="ti-time">·</div><div class="ti-body">${m.walk?ICON.walk:ICON.car}<span>${m.walk?'Jalan kaki':'Memandu'} kira-kira ${dur(m.min)}${m.km?', '+m.km+' km':''}${m.via?'. '+esc(m.via):''}</span></div></div>`;
        return;
      }
      const p = it.place ? P[it.place] : null;
      const isStop = (it.type==='stop'||it.type==='meal') && it.place && DATA.markers[n].includes(it.place);
      const num = isStop ? `<span class="n">${++stopIdx}</span>` : '';
      const ic = TI_ICON[it.type] ? `<span class="ico"><svg viewBox="0 0 24 24" aria-hidden="true">${TI_ICON[it.type]}</svg></span>` : '';
      let bdg = '';
      if(p && p.halal){ const h = HALAL[p.halal]; bdg += `<span class="bdg ${p.halal}"><svg viewBox="0 0 24 24" aria-hidden="true">${h.ic}</svg>${h.t}</span>`; }
      if(p && p.rating){ bdg += `<span class="bdg rate">${STAR}${p.rating.toFixed(1)} · ${p.reviews.toLocaleString('ms-MY')} ulasan</span>`; }
      const badges = bdg ? `<div class="badges">${bdg}</div>` : '';
      const flags = (it.flags||[]).map(f => `<span class="flag ${f.k}">${esc(f.v)}</span>`).join('');
      const planB = it.planB && it.planB.length ? `<details class="planb"><summary>Plan B</summary>${planbHtml(it.planB)}</details>` : '';
      const links = p && p.kind!=='plane' && it.type!=='note' && it.type!=='move2' ? `<div class="ti-links"><a href="${waze(p)}" target="_blank" rel="noopener">Waze</a><a href="${gmaps(p)}" target="_blank" rel="noopener">Google Maps</a></div>` : '';

      // Item lokasi: satu baris ringkas sahaja, selebihnya dalam "Butiran".
      let lede = '', butiran = '', metaP = '';
      if(p && it.type!=='note'){
        lede = p.tagline ? `<div class="ti-lede">${esc(p.tagline)}</div>` : '';
        const baris = [];
        baris.push(det('nama', `<a href="${gprofile(p)}" target="_blank" rel="noopener">${esc(p.name)}</a>`));
        if(p.addr)   baris.push(det('alamat', esc(p.addr)));
        if(p.phone)  baris.push(det('telefon', `<a href="tel:${esc(p.phone.replace(/[^0-9+]/g,''))}">${esc(p.phone)}</a>`));
        if(p.hours)  baris.push(det('waktu', esc(p.hours)));
        if(p.rating) baris.push(det('ulasan', `Google review: ${p.rating.toFixed(1)} bintang · ${p.reviews.toLocaleString('ms-MY')} ulasan`));
        if(p.special)baris.push(det('istimewa', `<b>Keistimewaan:</b> ${esc(p.special)}`));
        if(p.tips)   baris.push(det('tips', `<b>Tips:</b> ${esc(p.tips)}`));
        if(p.cost)   baris.push(det('kos', `<b>Kos:</b> ${esc(p.cost)}`));
        if(it.meta)  baris.push(det('nota', `<b>Nota:</b> ${esc(it.meta)}`));
        butiran = `<details class="det"><summary>Butiran</summary><ul class="det-list">${baris.join('')}</ul></details>`;
      } else {
        const meta = [it.meta, p && p.addr && (it.type!=='note') ? p.addr : '', p && p.hours ? 'Buka ' + p.hours : ''].filter(Boolean);
        metaP = meta.length ? `<div class="ti-meta">${metaHtml(meta, it.metaLink)}</div>` : '';
      }
      const amaran = p && p.halalNote ? `<div class="halal-note">${esc(p.halalNote)}</div>` : '';
      const cost = (!p || it.type==='note') && p && p.cost ? `<div class="ti-cost">${esc(p.cost)}</div>` : '';

      html += `<div class="ti d${n}">
        <div class="ti-time">${fmtT(it.t)}${it.e?`<span>– ${fmtT(it.e)}</span>`:''}</div>
        <div class="ti-body">
          <div class="ti-title">${ic}${num}<span>${esc(it.title)}</span></div>
          ${lede}${metaP}${badges}${amaran}${cost}${flags?`<div>${flags}</div>`:''}${butiran}${planB}${links}
        </div></div>`;
    });
    $('#timeline').innerHTML = html;
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
  let html = `<div class="lane-head"><span></span><span>Sabtu 12</span><span>Ahad 13</span><span>Isnin 14</span></div>`;
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
  $('#lane').innerHTML = html;
  $('#codekey').innerHTML = DATA.groups.map(g => `<span><b style="--g:${g.color}">${esc(g.id)}</b>${esc(g.label)}<em>${g.pax} org</em></span>`).join('');
  const total = DATA.groups.reduce((a,g)=>a+g.pax,0);
  const g1 = G('G1').pax;
  $('#headcount').innerHTML = `<div><b>${total-g1}</b><span>Sabtu, lepas 10.20 pg</span></div><div><b>${total}</b><span>Ahad, lepas 8.00 pg</span></div><div><b>${total}</b><span>Isnin, semua balik petang</span></div>`;
})();

/* ============================================================
   FLIGHTS
   ============================================================ */
(function flights(){
  const chip = w => { const [gid, nm] = w.split(':'); const g = G(gid); return `<span class="chip" style="--g:${g.color}">${esc(nm || g.label)}</span>`; };
  $('#board').innerHTML = DATA.flights.map(f => `<div class="board-row">
      <div class="t">${f.dep?fmtT(f.dep):'—'}${f.est?'<i class="est">anggaran</i>':''}<small>${esc(f.date)}</small></div>
      <div><div class="r">${esc(f.fromName)} → ${esc(f.toName)} <span>${f.arr?'tiba '+fmtT(f.arr):''}${f.no?(f.arr?', ':'')+esc(f.no):''}</span></div>
        <div class="who">${f.who.map(chip).join('')}</div>
        ${f.note?`<div class="note">${esc(f.note)}</div>`:''}</div></div>`).join('');
  $('#cut-title').innerHTML = `<svg class="cut-ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="13" r="8"/><path d="M12 9v4l2.6 1.6M9 2.4h6M18.6 6.4l1.4-1.4"/></svg>${esc(DATA.cutoff.title)}`;
  $('#cutoff').innerHTML = DATA.cutoff.rows.map(c => `<div><b>${fmtT(c.t)}</b><span>${esc(c.l)}</span><em>${esc(c.d)}</em></div>`).join('');
  $('#cut-foot').textContent = DATA.cutoff.foot;
  $('#kl-rule').textContent = DATA.klRule;
  $('#kl-list').innerHTML = DATA.klSide.map(k => { const g = G(k.g);
    const opts = k.opts.map(o => `<div class="opt${o.main?' main':''}">
        <div class="opt-h"><span class="opt-k">${esc(o.k)}</span><b>${esc(o.name)}</b>${o.main?'<em>Pilihan utama</em>':''}${o.link?'<i class="lk">berkait</i>':''}</div>
        <ul>${o.lines.map(l=>`<li>${esc(l)}</li>`).join('')}</ul>
        ${o.link?`<div class="opt-link">${esc(o.link)}</div>`:''}
      </div>`).join('');
    return `<div class="kl" style="--g:${g.color}"><h3>${esc(k.title)}<span>${esc(k.sub)}</span></h3>${opts}${k.foot?`<div class="kl-foot">${esc(k.foot)}</div>`:''}</div>`;
  }).join('');

  $('#seatnote').innerHTML = `<b>Tempat duduk pesawat.</b> AirAsia jual pilihan kerusi sebagai tambahan. Kalau tak beli, sistem beri secara rawak dan keluarga boleh terpisah. Untuk penerbangan 55 minit ini, cara paling murah ialah beritahu kaunter check-in yang ada anak kecil — mereka biasanya boleh susun supaya duduk bersebelahan tanpa caj.`;
})();

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
    $('#cars').innerHTML = sc.cars.map(c => {
      let n = 0;
      const rows = DATA.carRows.map(cols => {
        const cells = [];
        for(let k=0;k<cols;k++){
          const s = c.seats[n++] || '';
          if(s === 'BEG'){ cells.push(`<div class="seat bag">Beg</div>`); continue; }
          if(!s){ cells.push(`<div class="seat empty">kosong</div>`); continue; }
          const [gid, nm, tag, extra] = s.split(':'); const g = G(gid);
          const short = g.short || g.label;
          const sub = nm.split(' ').some(w => short.includes(w)) ? '' : short;
          cells.push(`<div class="seat f" style="--g:${g.color}"><b>${esc(nm)}</b>${sub?`<small>${esc(sub)}</small>`:''}${extra?`<small class="lap">${esc(extra)}</small>`:''}${tag==='D'?'<span class="dv">Pemandu mula</span>':''}</div>`);
        }
        return `<div class="row c${cols}">${cells.join('')}</div>`;
      }).join('');
      const ppl = c.seats.filter(s => s && s!=='BEG').length + c.seats.filter(s => (s.split(':')[3]||'')).length;
      const bags = c.seats.filter(s => s==='BEG').length;
      return `<div class="car"><h3>${esc(c.name)} <span class="sug">(Cadangan)</span><span>MPV 10 tempat</span></h3><div class="drv">Pemandu mula: <b>${esc(c.driver)}</b>. ${ppl} orang${bags?`, ${bags} ruang beg`:''}. Boleh ubah.</div><div class="cabin">${rows}</div></div>`;
    }).join('');
    const t = sc.third;
    $('#own-car').innerHTML = t
      ? `<span><i class="dot" style="background:${G(t.g).color}"></i><b>${esc(t.who)}</b> guna kenderaan sendiri. ${esc(t.text)} Pemandu: ${esc(t.driver)}.</span>`
      : `<span class="muted">Semua dalam 2 MPV pada peringkat ini.</span>`;
  }
  $('#legend').innerHTML = DATA.groups.map(g => `<span style="--g:${g.color}"><i></i>${esc(g.label)} (${g.pax})</span>`).join('');
})();

/* ============================================================
   STAY
   ============================================================ */
(function stay(){
  const s = DATA.stay, p = DATA.places.homestay;
  $('#stay').innerHTML = `<h3>${esc(s.name)}</h3><p>${esc(s.addr)}</p>
    <div class="facts">${s.facts.map(f=>`<div><b>${esc(f[0])}</b><span>${esc(f[1])}</span></div>`).join('')}</div>
    <p><b>Check-in</b> ${esc(s.checkin)}<br><b>Check-out</b> ${esc(s.checkout)}</p>
    <div class="ti-links" style="margin:10px 0 16px"><a href="${waze(p)}" target="_blank" rel="noopener">Waze</a><a href="${gmaps(p)}" target="_blank" rel="noopener">Google Maps</a></div>
    <h3 style="font-size:.95rem">Agihan bilik <span style="font-weight:500;color:var(--ink-2)">(cadangan)</span></h3>
    <div class="rooms">${s.rooms.map(r => { const g = r.g ? G(r.g) : null; return `<div class="room ${g?'':'vacant'}" style="--g:${g?g.color:'transparent'}"><b>Bilik ${r.n}</b>${esc(r.who)}${r.sub?`<br><small>${esc(r.sub)}</small>`:''}</div>`; }).join('')}</div>`;
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
$('#cost-tbl').innerHTML = `<thead><tr><th>Perkara</th><th class="num">Kadar</th></tr></thead><tbody>` + DATA.costs.map(c => `<tr><td>${esc(c.item)}<small>${esc(c.note||'')}</small></td><td class="num">${c.amt.split(' / ').map(esc).join('<br>')}</td></tr>`).join('') + `</tbody>`;
$('#road-km').textContent = DATA.jalan.km;
$('#toll-tbl').innerHTML = `<thead><tr><th>Tol</th><th>Kadar</th><th class="num">Jumlah</th></tr></thead><tbody>` + DATA.jalan.tolrows.map(r => `<tr><td>${esc(r.apa)}<small>${esc(r.bila)}</small></td><td>${esc(r.kadar)}</td><td class="num">${esc(r.total)}</td></tr>`).join('') + `</tbody>`;
$('#fuel-tbl').innerHTML = `<thead><tr><th>Bahan api</th><th class="num">Seliter</th><th class="num">1 kereta</th><th class="num">2 kereta</th></tr></thead><tbody>` + DATA.jalan.bahanapi.map(r => `<tr><td>${esc(r.jenis)}</td><td class="num">${esc(r.harga)}</td><td class="num">${esc(r.kereta)}</td><td class="num">${esc(r.total)}</td></tr>`).join('') + `</tbody>`;
$('#road-note').textContent = DATA.jalan.nota;
$('#road-rental').innerHTML = `<b>Kereta sewa.</b> ${esc(DATA.jalan.rental)}`;
$('#bag-note').textContent = DATA.bagasi.note;
$('#bag-ladder').innerHTML = DATA.bagasi.ladder.map((x,n) => `<div class="lad l${n}"><b>${esc(x[0])}</b><span>${esc(x[1])}</span></div>`).join('');
$('#bag-tbl').innerHTML = `<thead><tr><th>Peraturan</th><th>Butiran</th></tr></thead><tbody>` + DATA.bagasi.rules.map(r => `<tr><td>${esc(r[0])}</td><td>${esc(r[1])}</td></tr>`).join('') + `</tbody>`;
$('#bag-tip').innerHTML = `<b>Tip untuk kumpulan besar.</b> ${esc(DATA.bagasi.tip)}`;
$('#rain').innerHTML = DATA.rain.map(r => `<div><b>${esc(r.when)}</b><p>${esc(r.plan)}</p></div>`).join('');
$('#check').innerHTML = DATA.checklist.map(c => `<li><span class="ci"><svg viewBox="0 0 24 24" aria-hidden="true">${CHK_ICON[c.i]||CHK_ICON.beg}</svg></span><span>${esc(c.t)}</span></li>`).join('');
