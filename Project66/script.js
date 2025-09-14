// Mengecek status login
function checkLogin(){
  if(localStorage.getItem('loggedIn') !== 'true'){
    window.location.href = 'login.html';
  }
}

// Logout
function logout(){
  localStorage.removeItem('loggedIn');
  window.location.href = 'login.html';
}

// Navigasi antar section
function showSection(sectionId){
  document.querySelectorAll('.content-section').forEach(sec => sec.style.display='none');
  document.getElementById(sectionId).style.display='block';
}

// Data arrays
let absensiList = [];
let izinList = [];
let cutiList = [];
let biodata = {};

// Absensi
document.getElementById('absensiForm').addEventListener('submit', e=>{
  e.preventDefault();
  const form = new FormData(e.target);
  absensiList.push({
    tanggal: form.get('tanggal'),
    status: form.get('status')
  });
  alert('Absensi tersimpan');
  e.target.reset();
});

// Izin
document.getElementById('izinForm').addEventListener('submit', e=>{
  e.preventDefault();
  const form = new FormData(e.target);
  izinList.push({
    tanggal: form.get('tanggal'),
    keterangan: form.get('keterangan')
  });
  alert('Izin tersimpan');
  e.target.reset();
});

// Cuti
document.getElementById('cutiForm').addEventListener('submit', e=>{
  e.preventDefault();
  const form = new FormData(e.target);
  cutiList.push({
    tanggalAwal: form.get('tanggalAwal'),
    tanggalAkhir: form.get('tanggalAkhir'),
    keterangan: form.get('keterangan')
  });
  alert('Cuti tersimpan');
  e.target.reset();
});

// Biodata
document.getElementById('biodataForm').addEventListener('submit', e=>{
  e.preventDefault();
  const form = new FormData(e.target);
  biodata = {
    nama: form.get('nama'),
    email: form.get('email'),
    telepon: form.get('telepon')
  };
  alert('Biodata diperbarui');
});

// Tampilkan data di tabel
function renderTables(){
  // absensi
  let absHtml = '<tr><th>Tanggal</th><th>Status</th></tr>';
  absensiList.forEach(a=>{
    absHtml += `<tr><td>${a.tanggal}</td><td>${a.status}</td></tr>`;
  });
  document.getElementById('absensiTable').innerHTML = absHtml;

  // izin
  let izinHtml = '<tr><th>Tanggal</th><th>Keterangan</th></tr>';
  izinList.forEach(i=>{
    izinHtml += `<tr><td>${i.tanggal}</td><td>${i.keterangan}</td></tr>`;
  });
  document.getElementById('izinTable').innerHTML = izinHtml;

  // cuti
  let cutiHtml = '<tr><th>Tanggal Awal</th><th>Tanggal Akhir</th><th>Keterangan</th></tr>';
  cutiList.forEach(c=>{
    cutiHtml += `<tr><td>${c.tanggalAwal}</td><td>${c.tanggalAkhir}</td><td>${c.keterangan}</td></tr>`;
  });
  document.getElementById('cutiTable').innerHTML = cutiHtml;
}

// panggil render setiap kali klik menu Data
document.querySelector("li[onclick=\"showSection('data')\"]").addEventListener('click', renderTables);

// Export CSV
function exportCSV(){
  let csv = 'Absensi\nTanggal,Status\n';
  absensiList.forEach(a=>csv += `${a.tanggal},${a.status}\n`);
  csv += '\nIzin\nTanggal,Keterangan\n';
  izinList.forEach(i=>csv += `${i.tanggal},${i.keterangan}\n`);
  csv += '\nCuti\nTanggal Awal,Tanggal Akhir,Keterangan\n';
  cutiList.forEach(c=>csv += `${c.tanggalAwal},${c.tanggalAkhir},${c.keterangan}\n`);

  const blob = new Blob([csv], {type: 'text/csv'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'data_pegawai.csv';
  a.click();
  URL.revokeObjectURL(url);
}
