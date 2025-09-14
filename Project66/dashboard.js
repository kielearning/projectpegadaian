// Sidebar navigation
document.querySelectorAll('.menu a').forEach(link=>{
  link.addEventListener('click', e=>{
    e.preventDefault();
    document.querySelectorAll('.menu a').forEach(l=>l.classList.remove('active'));
    link.classList.add('active');
    const sectionId = link.dataset.section;
    document.querySelectorAll('.section').forEach(sec=>sec.classList.remove('active-section'));
    document.getElementById(sectionId).classList.add('active-section');
    document.getElementById('section-title').textContent = link.textContent.trim();
  });
});

// Simpan Absensi ke localStorage
let absensiList = JSON.parse(localStorage.getItem('absensiList'))||[];
function renderAbsensi(){
  const tbody=document.querySelector('#tabel-absen tbody');
  if(!tbody) return;
  tbody.innerHTML='';
  absensiList.forEach(row=>{
    const tr=document.createElement('tr');
    tr.innerHTML=`<td>${row.tanggal}</td><td>${row.status}</td>`;
    tbody.appendChild(tr);
  });
}
renderAbsensi();

const formAbsensi=document.getElementById('form-absensi');
if(formAbsensi){
  formAbsensi.addEventListener('submit', function(e){
    e.preventDefault();
    const tanggal=this.tanggal.value;
    const status=this.status.value;
    absensiList.push({tanggal,status});
    localStorage.setItem('absensiList',JSON.stringify(absensiList));
    renderAbsensi();
    document.getElementById('result-absensi').textContent='Absensi berhasil disimpan!';
    document.getElementById('result-absensi').style.display='block';
    this.reset();
  });
}

// Export CSV
function exportCSV(data, headers, filename){
  let csv=headers.join(',')+'\n';
  data.forEach(item=>{
    csv+=Object.values(item).join(',')+'\n';
  });
  const blob=new Blob([csv],{type:'text/csv'});
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a');
  a.href=url;a.download=filename;a.click();
  URL.revokeObjectURL(url);
}

// Kalender otomatis bulan ini
function generateCalendar(){
  const container=document.getElementById('calendar-container');
  if(!container) return;
  const days=['Min','Sen','Sel','Rab','Kam','Jum','Sab'];
  container.innerHTML='';
  days.forEach(d=>{
    const div=document.createElement('div');
    div.textContent=d;
    div.classList.add('header');
    container.appendChild(div);
  });

  let date=new Date();
  let year=date.getFullYear();
  let month=date.getMonth(); // 0–11
  let firstDay=new Date(year,month,1).getDay(); // hari pertama
  let daysInMonth=new Date(year,month+1,0).getDate();

  // kosong sebelum tanggal 1
  for(let i=0;i<firstDay;i++){
    const blank=document.createElement('div');
    container.appendChild(blank);
  }
  for(let i=1;i<=daysInMonth;i++){
    const day=document.createElement('div');
    day.textContent=i;
    container.appendChild(day);
  }
}
generateCalendar();

// Pengumuman contoh
const pengumuman=[
  {judul:'Rapat Bulanan',isi:'Rapat bulanan Pegadaian tanggal 20 September 2025 pukul 09.00'},
  {judul:'Libur Nasional',isi:'Tanggal 1 Oktober 2025 kantor Pegadaian tutup'},
  {judul:'Training Karyawan',isi:'Training Karyawan Baru 5 Oktober 2025 di Aula Pegadaian'}
];
const list=document.getElementById('pengumuman-list');
if(list){
  pengumuman.forEach(p=>{
    const li=document.createElement('li');
    li.innerHTML=`<strong>${p.judul}</strong><br>${p.isi}`;
    list.appendChild(li);
  });
}
// ambil username dari localStorage
const username = localStorage.getItem('username');
if (!username) {
  // kalau belum login langsung balik ke login
  window.location.href = 'login.html';
}
document.getElementById('usernameDisplay').textContent = 'Halo, ' + username + '!';

// tombol logout
document.getElementById('logoutBtn').addEventListener('click', () => {
  localStorage.removeItem('username');
  window.location.href = 'login.html';
});

// navigasi antar section
document.querySelectorAll('.menu a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    document.querySelectorAll('.menu a').forEach(a => a.classList.remove('active'));
    link.classList.add('active');
    const sectionId = link.getAttribute('data-section');
    document.querySelectorAll('.section').forEach(sec => sec.classList.remove('active-section'));
    document.getElementById(sectionId).classList.add('active-section');
    document.getElementById('section-title').textContent = link.textContent;
  });
});
