import { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

function Admin(props) {
  const {
    user, email, setEmail, password, setPassword, errorLogin, tanganiLogin, tanganiLogout,
    berita, judulBaru, setJudulBaru, kategoriBaru, setKategoriBaru,
    isiBaru, setIsiBaru, idEdit, batalEdit, mulaiEdit, hapusBerita, urlGambarLama
  } = props;

  const [activeTab, setActiveTab] = useState('pengurus');
  const [prosesLoading, setProsesLoading] = useState(false);

  // === STATE BERITA ===
  const [keteranganBaru, setKeteranganBaru] = useState('');
  const [linkBerita, setLinkBerita] = useState('');

  // Sinkronisasi link saat tombol Edit Berita diklik
  useEffect(() => {
    if (idEdit) { setLinkBerita(urlGambarLama || ''); } 
    else { setLinkBerita(''); }
  }, [idEdit, urlGambarLama]);

  // === STATE PENGURUS ===
  const [pengurus, setPengurus] = useState([]);
  const [namaP, setNamaP] = useState('');
  const [jabatanP, setJabatanP] = useState('');
  const [ketP, setKetP] = useState('');
  const [linkP, setLinkP] = useState('');
  const [idEditP, setIdEditP] = useState(null);

  // === STATE DOWNLOAD ===
  const [dataDownload, setDataDownload] = useState([]);
  const [namaFileD, setNamaFileD] = useState('');
  const [linkD, setLinkD] = useState('');
  const [ketD, setKetD] = useState('');
  const [idEditD, setIdEditD] = useState(null);

  // === STATE POLLING ===
  const [dataPolling, setDataPolling] = useState([]);
  const [pertanyaanPol, setPertanyaanPol] = useState('');
  const [opsiPol, setOpsiPol] = useState('');
  const [idEditPol, setIdEditPol] = useState(null);

  // === STATE GALERI ===
  const [dataGaleri, setDataGaleri] = useState([]);
  const [judulG, setJudulG] = useState('');
  const [ketG, setKetG] = useState('');
  const [linkG, setLinkG] = useState('');
  const [idEditG, setIdEditG] = useState(null);

  // === STATE BUKU TAMU ===
  const [dataBukuTamu, setDataBukuTamu] = useState([]);

  // === AMBIL DATA (READ) ===
  const ambilSemuaData = async () => {
    try {
      const snapP = await getDocs(collection(db, "pengurus"));
      setPengurus(snapP.docs.map(d => ({id: d.id, ...d.data()})));
      
      const snapD = await getDocs(collection(db, "download"));
      setDataDownload(snapD.docs.map(d => ({id: d.id, ...d.data()})));

      const snapPol = await getDocs(collection(db, "polling"));
      setDataPolling(snapPol.docs.map(d => ({id: d.id, ...d.data()})));

      const snapG = await getDocs(collection(db, "galeri"));
      setDataGaleri(snapG.docs.map(d => ({id: d.id, ...d.data()})).reverse());

      const snapBT = await getDocs(collection(db, "bukutamu"));
      setDataBukuTamu(snapBT.docs.map(d => ({id: d.id, ...d.data()})).reverse());
    } catch (error) { console.error(error); }
  };

  useEffect(() => { if (user) ambilSemuaData(); }, [user]);


  // ==================== FUNGSI FORMATTING TEXT (BOLD, ITALIC, UNDERLINE) ====================
  const applyFormat = (elementId, tag, stateValue, stateSetter) => {
    const el = document.getElementById(elementId);
    if (!el) return;
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const textBefore = stateValue.substring(0, start);
    const selectedText = stateValue.substring(start, end);
    const textAfter = stateValue.substring(end);

    const newText = `${textBefore}<${tag}>${selectedText}</${tag}>${textAfter}`;
    stateSetter(newText);

    setTimeout(() => {
      el.focus();
      if (start === end) {
        el.setSelectionRange(start + tag.length + 2, start + tag.length + 2);
      } else {
        el.setSelectionRange(start, end + (tag.length * 2) + 5);
      }
    }, 0);
  };

  // Komponen Toolbar Format Kecil
  const FormatToolbar = ({ elementId, stateValue, stateSetter }) => (
    <div className="flex gap-1 mb-2 bg-slate-50 p-1 rounded-md border border-slate-200 w-fit shadow-sm">
      <button type="button" onClick={() => applyFormat(elementId, 'b', stateValue, stateSetter)} className="w-8 h-8 flex items-center justify-center bg-white border border-slate-200 rounded hover:bg-slate-100 font-bold text-slate-700 transition" title="Bold (Tebal)">B</button>
      <button type="button" onClick={() => applyFormat(elementId, 'i', stateValue, stateSetter)} className="w-8 h-8 flex items-center justify-center bg-white border border-slate-200 rounded hover:bg-slate-100 italic font-serif text-slate-700 transition" title="Italic (Miring)">I</button>
      <button type="button" onClick={() => applyFormat(elementId, 'u', stateValue, stateSetter)} className="w-8 h-8 flex items-center justify-center bg-white border border-slate-200 rounded hover:bg-slate-100 underline text-slate-700 transition" title="Underline (Garis Bawah)">U</button>
    </div>
  );


  // ==================== FUNGSI CRUD ====================

  // 1. BERITA
  const simpanBerita = async (e) => {
    e.preventDefault();
    if (!judulBaru || !isiBaru) return alert("Judul dan Isi wajib diisi!");
    setProsesLoading(true);
    try {
      const dataObj = {
        judul: judulBaru, kategori: kategoriBaru, isi: isiBaru, keterangan: keteranganBaru, gambar: linkBerita,
        tanggal: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
      };

      if (idEdit) {
        await updateDoc(doc(db, "berita", idEdit), dataObj);
        alert("Berita diperbarui!");
      } else {
        await addDoc(collection(db, "berita"), dataObj);
        alert("Berita baru ditambahkan!");
      }
      batalEdit(); setLinkBerita(''); setKeteranganBaru('');
      window.location.reload(); 
    } catch (error) { alert("Gagal menyimpan berita!"); }
    setProsesLoading(false);
  };

  // 2. PENGURUS
  const simpanPengurus = async (e) => {
    e.preventDefault();
    setProsesLoading(true);
    try {
      const dataObj = { nama: namaP, jabatan: jabatanP, keterangan: ketP, foto: linkP };
      if (idEditP) {
        await updateDoc(doc(db, "pengurus", idEditP), dataObj);
        alert("Data pengurus diperbarui!");
      } else {
        await addDoc(collection(db, "pengurus"), dataObj);
        alert("Pengurus ditambahkan!");
      }
      batalEditPengurus(); ambilSemuaData();
    } catch (error) { alert("Gagal menyimpan data!"); }
    setProsesLoading(false);
  };
  const batalEditPengurus = () => { setIdEditP(null); setNamaP(''); setJabatanP(''); setLinkP(''); setKetP(''); };
  const hapusPengurus = async (id) => { if (window.confirm("Hapus data?")) { await deleteDoc(doc(db, "pengurus", id)); ambilSemuaData(); } };

  // 3. DOWNLOAD
  const simpanDownload = async (e) => {
    e.preventDefault();
    const dataObj = { judul: namaFileD, link: linkD, keterangan: ketD };
    if (idEditD) {
      await updateDoc(doc(db, "download", idEditD), dataObj);
    } else {
      await addDoc(collection(db, "download"), dataObj);
    }
    alert("Data tersimpan!");
    setIdEditD(null); setNamaFileD(''); setLinkD(''); setKetD('');
    ambilSemuaData();
  };
  const hapusDownload = async (id) => { if (window.confirm("Hapus file?")) { await deleteDoc(doc(db, "download", id)); ambilSemuaData(); } };

  // 4. POLLING
  const simpanPolling = async (e) => {
    e.preventDefault();
    const dataObj = { pertanyaan: pertanyaanPol, opsi: opsiPol };
    if (idEditPol) {
      await updateDoc(doc(db, "polling", idEditPol), dataObj);
    } else {
      await addDoc(collection(db, "polling"), dataObj);
    }
    alert("Polling tersimpan!");
    setIdEditPol(null); setPertanyaanPol(''); setOpsiPol('');
    ambilSemuaData();
  };
  const hapusPolling = async (id) => { if (window.confirm("Hapus polling?")) { await deleteDoc(doc(db, "polling", id)); ambilSemuaData(); } };

  // 5. GALERI
  const simpanGaleri = async (e) => {
    e.preventDefault();
    if (!linkG) return alert("Masukkan Link Foto terlebih dahulu!");
    setProsesLoading(true);
    try {
      const dataObj = { judul: judulG, keterangan: ketG, urlFoto: linkG };
      if (idEditG) {
        await updateDoc(doc(db, "galeri", idEditG), dataObj);
        alert("Foto berhasil diperbarui!");
      } else {
        await addDoc(collection(db, "galeri"), dataObj);
        alert("Foto berhasil ditambahkan ke Galeri!");
      }
      batalEditGaleri();
      ambilSemuaData();
    } catch (error) { alert("Gagal menyimpan foto."); }
    setProsesLoading(false);
  };
  
  const mulaiEditGaleri = (item) => {
    setIdEditG(item.id);
    setJudulG(item.judul || '');
    setKetG(item.keterangan || '');
    setLinkG(item.urlFoto || '');
    window.scrollTo({ top: 0, behavior: 'smooth' }); 
  };

  const batalEditGaleri = () => { setIdEditG(null); setJudulG(''); setKetG(''); setLinkG(''); };
  const hapusGaleri = async (id) => { if (window.confirm("Hapus foto?")) { await deleteDoc(doc(db, "galeri", id)); ambilSemuaData(); } };

  // 6. BUKU TAMU
  const hapusBukuTamu = async (id) => { if (window.confirm("Hapus pesan?")) { await deleteDoc(doc(db, "bukutamu", id)); ambilSemuaData(); } };


  // ==================== TAMPILAN ANTARMUKA ELEGANT ====================
  return (
    <section className="bg-slate-50 min-h-screen font-sans text-slate-800">
      {!user ? (
        // FORM LOGIN ELEGANT
        <div className="flex items-center justify-center min-h-screen px-4">
          <div className="bg-white p-10 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 max-w-md w-full">
            <div className="text-center mb-10">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4">🔐</div>
              <h3 className="text-2xl font-black text-slate-800 tracking-tight">Admin Workspace</h3>
              <p className="text-slate-500 text-sm mt-2">Masuk untuk mengelola sistem portal</p>
            </div>
            {errorLogin && <p className="text-red-600 text-sm mb-6 text-center bg-red-50 p-3 rounded-lg font-medium border border-red-100">{errorLogin}</p>}
            <form onSubmit={tanganiLogin} className="space-y-5">
              <div>
                <label className="block text-slate-700 text-sm font-bold mb-2">Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition bg-slate-50 focus:bg-white" placeholder="admin@sekolah.com" required />
              </div>
              <div>
                <label className="block text-slate-700 text-sm font-bold mb-2">Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition bg-slate-50 focus:bg-white" placeholder="••••••••" required />
              </div>
              <button type="submit" className="w-full bg-emerald-600 text-white font-bold py-3.5 rounded-xl hover:bg-emerald-700 transition shadow-md shadow-emerald-200 mt-4">Login ke Dashboard</button>
            </form>
          </div>
        </div>
      ) : (
        // DASBOR UTAMA ADMIN ELEGANT
        <div className="max-w-7xl mx-auto px-4 py-8">
          
          {/* HEADER DASHBOARD */}
          <div className="flex flex-col md:flex-row justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-8 gap-4">
            <div>
              <h2 className="text-2xl font-black text-slate-800">Administrator Panel</h2>
              <p className="text-slate-500 text-sm">Selamat datang, kelola konten website dengan mudah.</p>
            </div>
            <button onClick={tanganiLogout} className="px-6 py-2.5 bg-slate-100 hover:bg-red-50 text-slate-700 hover:text-red-600 font-bold text-sm rounded-lg transition border border-slate-200 hover:border-red-200 shadow-sm">
              Keluar Sesi
            </button>
          </div>

          {/* TABS MENU ELEGANT */}
          <div className="flex overflow-x-auto space-x-2 mb-8 bg-white p-2 rounded-xl shadow-sm border border-slate-200 hide-scrollbar">
            {[
              { id: 'pengurus', label: '👥 Data Pengurus' },
              { id: 'download', label: '📁 File Download' },
              { id: 'berita', label: '📰 Berita & Artikel' },
              { id: 'polling', label: '📊 Polling' },
              { id: 'galeri', label: '📸 Galeri Foto' },
              { id: 'bukutamu', label: '📖 Buku Tamu' },
            ].map(tab => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id)} 
                className={`px-5 py-2.5 text-sm font-bold rounded-lg transition whitespace-nowrap ${activeTab === tab.id ? 'bg-emerald-600 text-white shadow-md' : 'bg-transparent text-slate-600 hover:bg-slate-100'}`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* ==================================================== */}
          {/* ================= KONTEN TAB ======================= */}
          {/* ==================================================== */}
          <div className="grid lg:grid-cols-12 gap-8">
            
            {/* --- KOLOM KIRI (FORM) --- */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* === TAB 1: PENGURUS (FORM) === */}
              {activeTab === 'pengurus' && (
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                  <h3 className="text-lg font-black text-slate-800 mb-6 pb-4 border-b border-slate-100">{idEditP ? 'Edit Data Pengurus' : 'Tambah Pengurus Baru'}</h3>
                  <form onSubmit={simpanPengurus} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Nama Lengkap</label>
                      <input type="text" value={namaP} onChange={(e)=>setNamaP(e.target.value)} className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none transition" required />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Jabatan</label>
                      <input type="text" value={jabatanP} onChange={(e)=>setJabatanP(e.target.value)} className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none transition" required />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Keterangan (Mendukung Format Text)</label>
                      <FormatToolbar elementId="ket-pengurus" stateValue={ketP} stateSetter={setKetP} />
                      <textarea id="ket-pengurus" value={ketP} onChange={(e)=>setKetP(e.target.value)} className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none transition h-24" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Link Foto (ImgBB .jpg/.png)</label>
                      <input type="text" value={linkP} onChange={(e)=>setLinkP(e.target.value)} className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none transition" required />
                    </div>
                    <div className="flex gap-3 pt-4">
                      <button type="submit" disabled={prosesLoading} className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-lg transition">{prosesLoading ? 'Menyimpan...' : 'Simpan Data'}</button>
                      {idEditP && <button type="button" onClick={batalEditPengurus} className="px-5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg transition">Batal</button>}
                    </div>
                  </form>
                </div>
              )}

              {/* === TAB 3: BERITA (FORM) === */}
              {activeTab === 'berita' && (
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                  <h3 className="text-lg font-black text-slate-800 mb-6 pb-4 border-b border-slate-100">{idEdit ? 'Edit Berita / Artikel' : 'Tulis Berita Baru'}</h3>
                  <form onSubmit={simpanBerita} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Judul Artikel</label>
                      <input type="text" value={judulBaru} onChange={(e)=>setJudulBaru(e.target.value)} className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none transition" required />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Kategori</label>
                        <select value={kategoriBaru} onChange={(e)=>setKategoriBaru(e.target.value)} className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none transition">
                          <option value="Pengumuman">Pengumuman</option>
                          <option value="Prestasi">Prestasi</option>
                          <option value="Kegiatan">Kegiatan</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Link Gambar Cover</label>
                        <input type="text" value={linkBerita} onChange={(e)=>setLinkBerita(e.target.value)} className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none transition" required />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Ringkasan (Keterangan Pendek)</label>
                      <FormatToolbar elementId="ket-berita" stateValue={keteranganBaru} stateSetter={setKeteranganBaru} />
                      <textarea id="ket-berita" value={keteranganBaru} onChange={(e)=>setKeteranganBaru(e.target.value)} className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none transition h-20" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Isi Konten Berita Lengkap</label>
                      <FormatToolbar elementId="isi-berita" stateValue={isiBaru} stateSetter={setIsiBaru} />
                      <textarea id="isi-berita" value={isiBaru} onChange={(e)=>setIsiBaru(e.target.value)} className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none transition h-40" required></textarea>
                    </div>
                    <div className="flex gap-3 pt-4">
                      <button type="submit" disabled={prosesLoading} className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-lg transition">{prosesLoading ? 'Menyimpan...' : 'Simpan Berita'}</button>
                      {idEdit && <button type="button" onClick={batalEdit} className="px-5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg transition">Batal</button>}
                    </div>
                  </form>
                </div>
              )}

              {/* === TAB GALERI (FORM) === */}
              {activeTab === 'galeri' && (
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                  <h3 className="text-lg font-black text-slate-800 mb-6 pb-4 border-b border-slate-100">{idEditG ? 'Edit Foto Galeri' : 'Tambah Foto Galeri'}</h3>
                  <form onSubmit={simpanGaleri} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Judul Foto</label>
                      <input type="text" value={judulG} onChange={(e)=>setJudulG(e.target.value)} className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none transition" required />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Keterangan Tambahan</label>
                      <FormatToolbar elementId="ket-galeri" stateValue={ketG} stateSetter={setKetG} />
                      <textarea id="ket-galeri" value={ketG} onChange={(e)=>setKetG(e.target.value)} className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none transition h-24" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Link Foto (ImgBB .jpg/.png)</label>
                      <input type="text" value={linkG} onChange={(e)=>setLinkG(e.target.value)} className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none transition" required />
                    </div>
                    <div className="flex gap-3 pt-4">
                      <button type="submit" disabled={prosesLoading} className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-lg transition">{prosesLoading ? 'Menyimpan...' : 'Simpan Foto'}</button>
                      {idEditG && <button type="button" onClick={batalEditGaleri} className="px-5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg transition">Batal</button>}
                    </div>
                  </form>
                </div>
              )}

               {/* === TAB DOWNLOAD & POLLING & BUKU TAMU (FORM RINGKAS) === */}
               {activeTab === 'download' && (
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                  <h3 className="text-lg font-black text-slate-800 mb-6 pb-4 border-b border-slate-100">Tambah File Download</h3>
                  <form onSubmit={simpanDownload} className="space-y-4">
                    <input type="text" placeholder="Nama Dokumen" value={namaFileD} onChange={(e)=>setNamaFileD(e.target.value)} className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" required />
                    <input type="text" placeholder="Link Google Drive / Tautan File" value={linkD} onChange={(e)=>setLinkD(e.target.value)} className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" required />
                    <textarea placeholder="Keterangan Singkat" value={ketD} onChange={(e)=>setKetD(e.target.value)} className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none h-24" />
                    <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-lg transition">Simpan Dokumen</button>
                  </form>
                </div>
              )}

              {activeTab === 'polling' && (
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                  <h3 className="text-lg font-black text-slate-800 mb-6 pb-4 border-b border-slate-100">Buat Polling Baru</h3>
                  <form onSubmit={simpanPolling} className="space-y-4">
                    <input type="text" placeholder="Pertanyaan Polling" value={pertanyaanPol} onChange={(e)=>setPertanyaanPol(e.target.value)} className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" required />
                    <input type="text" placeholder="Opsi Jawaban (Koma Pisah)" value={opsiPol} onChange={(e)=>setOpsiPol(e.target.value)} className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" required />
                    <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-lg transition">Terbitkan Polling</button>
                  </form>
                </div>
              )}

            </div>

            {/* --- KOLOM KANAN (DATA VIEW) --- */}
            <div className="lg:col-span-7">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 min-h-full">
                <h3 className="text-lg font-black text-slate-800 mb-6 pb-4 border-b border-slate-100 flex items-center justify-between">
                  <span>Database Tersimpan</span>
                  <span className="text-xs bg-slate-100 text-slate-500 px-3 py-1 rounded-full font-bold">Kategori: {activeTab.toUpperCase()}</span>
                </h3>

                {/* LIST PENGURUS */}
                {activeTab === 'pengurus' && (
                  <div className="grid sm:grid-cols-2 gap-4">
                    {pengurus.map(item => (
                      <div key={item.id} className="border border-slate-100 p-4 rounded-xl flex gap-4 items-center hover:shadow-md transition bg-slate-50/50">
                        {item.foto ? <img src={item.foto} className="w-14 h-14 rounded-full object-cover shadow-sm border-2 border-white" alt="foto" /> : <div className="w-14 h-14 bg-slate-200 rounded-full"></div>}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-slate-800 truncate">{item.nama}</h4>
                          <p className="text-xs text-emerald-600 font-medium mb-2">{item.jabatan}</p>
                          <div className="flex gap-2">
                            <button onClick={()=>{setIdEditP(item.id); setNamaP(item.nama); setJabatanP(item.jabatan); setKetP(item.keterangan || ''); setLinkP(item.foto || '')}} className="text-[10px] px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-md font-bold transition">Edit</button>
                            <button onClick={()=>hapusPengurus(item.id)} className="text-[10px] px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-md font-bold transition">Hapus</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* LIST BERITA */}
                {activeTab === 'berita' && (
                  <div className="space-y-3">
                    {berita.map(item => (
                      <div key={item.id} className="border border-slate-100 p-4 rounded-xl flex justify-between items-center hover:shadow-md transition bg-slate-50/50">
                        <div className="flex-1 pr-4">
                          <h4 className="font-bold text-slate-800 truncate">{item.judul}</h4>
                          <p className="text-xs text-slate-500 mt-1">{item.tanggal} • {item.kategori}</p>
                        </div>
                        <div className="flex gap-2 flex-shrink-0">
                          <button onClick={()=>mulaiEdit(item)} className="text-[11px] px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-md font-bold transition">Edit</button>
                          <button onClick={()=>hapusBerita(item.id)} className="text-[11px] px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-md font-bold transition">Hapus</button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* GRID GALERI */}
                {activeTab === 'galeri' && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {dataGaleri.map(item => (
                      <div key={item.id} className="border border-slate-100 p-2 rounded-xl hover:shadow-md transition bg-slate-50/50 group relative">
                        <img src={item.urlFoto} className="h-32 w-full object-cover rounded-lg mb-3" alt={item.judul} />
                        <p className="text-xs font-bold text-slate-800 text-center truncate px-1 mb-2">{item.judul}</p>
                        <div className="absolute inset-0 bg-white/90 opacity-0 group-hover:opacity-100 transition flex flex-col justify-center items-center gap-2 rounded-xl backdrop-blur-sm">
                          <button onClick={()=>mulaiEditGaleri(item)} className="px-6 py-2 bg-slate-800 text-white text-xs font-bold rounded-md">Edit</button>
                          <button onClick={()=>hapusGaleri(item.id)} className="px-6 py-2 bg-red-600 text-white text-xs font-bold rounded-md">Hapus</button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* LIST DOWNLOAD, POLLING, BUKUTAMU */}
                {(activeTab === 'download' || activeTab === 'polling' || activeTab === 'bukutamu') && (
                  <div className="space-y-3">
                    {(activeTab === 'download' ? dataDownload : activeTab === 'polling' ? dataPolling : dataBukuTamu).map(item => (
                      <div key={item.id} className="border border-slate-100 p-4 rounded-xl flex justify-between items-center hover:shadow-md transition bg-slate-50/50">
                        <div>
                          <h4 className="font-bold text-slate-800">{item.judul || item.pertanyaan || item.nama}</h4>
                          <p className="text-xs text-slate-500 mt-1">{item.opsi || item.pesan || "Data tersimpan"}</p>
                        </div>
                        <button onClick={() => activeTab === 'download' ? hapusDownload(item.id) : activeTab === 'polling' ? hapusPolling(item.id) : hapusBukuTamu(item.id)} className="text-[11px] px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-md font-bold transition">Hapus</button>
                      </div>
                    ))}
                  </div>
                )}

              </div>
            </div>
            
          </div>
        </div>
      )}
    </section>
  );
}

export default Admin;