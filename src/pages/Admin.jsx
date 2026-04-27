import React, { useState, useEffect, useMemo } from 'react';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { 
  LayoutDashboard, Users, FileText, Image as ImageIcon, MessageSquare, 
  Download, BarChart2, Settings, Search, Bell, Menu, X, Sun, Moon, 
  LogOut, Plus, Edit2, Trash2, Bold, Italic, Underline
} from 'lucide-react';

function Admin(props) {
  const {
    user, email, setEmail, password, setPassword, errorLogin, tanganiLogin, tanganiLogout,
    berita, judulBaru, setJudulBaru, kategoriBaru, setKategoriBaru,
    isiBaru, setIsiBaru, idEdit, batalEdit, mulaiEdit, hapusBerita, urlGambarLama
  } = props;

  // === UI STATE (SaaS Features) ===
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showForm, setShowForm] = useState(false); // Untuk toggle form modal/card

  // === FIREBASE STATE ===
  const [prosesLoading, setProsesLoading] = useState(false);
  const [keteranganBaru, setKeteranganBaru] = useState('');
  const [linkBerita, setLinkBerita] = useState('');
  const [pengurus, setPengurus] = useState([]);
  const [namaP, setNamaP] = useState('');
  const [jabatanP, setJabatanP] = useState('');
  const [ketP, setKetP] = useState('');
  const [linkP, setLinkP] = useState('');
  const [idEditP, setIdEditP] = useState(null);
  const [dataDownload, setDataDownload] = useState([]);
  const [namaFileD, setNamaFileD] = useState('');
  const [linkD, setLinkD] = useState('');
  const [ketD, setKetD] = useState('');
  const [idEditD, setIdEditD] = useState(null);
  const [dataPolling, setDataPolling] = useState([]);
  const [pertanyaanPol, setPertanyaanPol] = useState('');
  const [opsiPol, setOpsiPol] = useState('');
  const [idEditPol, setIdEditPol] = useState(null);
  const [dataGaleri, setDataGaleri] = useState([]);
  const [judulG, setJudulG] = useState('');
  const [ketG, setKetG] = useState('');
  const [linkG, setLinkG] = useState('');
  const [idEditG, setIdEditG] = useState(null);
  const [dataBukuTamu, setDataBukuTamu] = useState([]);

  // Sinkronisasi link edit
  useEffect(() => {
    if (idEdit) { setLinkBerita(urlGambarLama || ''); setShowForm(true); } 
    else { setLinkBerita(''); }
  }, [idEdit, urlGambarLama]);

  // Read Data
  const ambilSemuaData = async () => {
    try {
      const snapP = await getDocs(collection(db, "pengurus")); setPengurus(snapP.docs.map(d => ({id: d.id, ...d.data()})));
      const snapD = await getDocs(collection(db, "download")); setDataDownload(snapD.docs.map(d => ({id: d.id, ...d.data()})));
      const snapPol = await getDocs(collection(db, "polling")); setDataPolling(snapPol.docs.map(d => ({id: d.id, ...d.data()})));
      const snapG = await getDocs(collection(db, "galeri")); setDataGaleri(snapG.docs.map(d => ({id: d.id, ...d.data()})).reverse());
      const snapBT = await getDocs(collection(db, "bukutamu")); setDataBukuTamu(snapBT.docs.map(d => ({id: d.id, ...d.data()})).reverse());
    } catch (error) { console.error(error); }
  };
  useEffect(() => { if (user) ambilSemuaData(); }, [user]);

  // === TOOLBAR TEXT EDITOR ===
  const applyFormat = (elementId, tag, stateValue, stateSetter) => {
    const el = document.getElementById(elementId);
    if (!el) return;
    const start = el.selectionStart, end = el.selectionEnd;
    const textBefore = stateValue.substring(0, start), selectedText = stateValue.substring(start, end), textAfter = stateValue.substring(end);
    stateSetter(`${textBefore}<${tag}>${selectedText}</${tag}>${textAfter}`);
    setTimeout(() => { el.focus(); el.setSelectionRange(start === end ? start + tag.length + 2 : start, start === end ? start + tag.length + 2 : end + (tag.length * 2) + 5); }, 0);
  };

  const FormatToolbar = ({ elementId, stateValue, stateSetter }) => (
    <div className="flex gap-1 mb-2 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg border border-slate-200 dark:border-slate-700 w-fit">
      <button type="button" onClick={() => applyFormat(elementId, 'b', stateValue, stateSetter)} className="p-1.5 hover:bg-white dark:hover:bg-slate-700 rounded text-slate-700 dark:text-slate-300 transition"><Bold size={16} /></button>
      <button type="button" onClick={() => applyFormat(elementId, 'i', stateValue, stateSetter)} className="p-1.5 hover:bg-white dark:hover:bg-slate-700 rounded text-slate-700 dark:text-slate-300 transition"><Italic size={16} /></button>
      <button type="button" onClick={() => applyFormat(elementId, 'u', stateValue, stateSetter)} className="p-1.5 hover:bg-white dark:hover:bg-slate-700 rounded text-slate-700 dark:text-slate-300 transition"><Underline size={16} /></button>
    </div>
  );

  // === CRUD FUNCTIONS ===
  const simpanBerita = async (e) => {
    e.preventDefault(); setProsesLoading(true);
    try {
      const dataObj = { judul: judulBaru, kategori: kategoriBaru, isi: isiBaru, keterangan: keteranganBaru, gambar: linkBerita, tanggal: new Date().toLocaleDateString('id-ID') };
      if (idEdit) await updateDoc(doc(db, "berita", idEdit), dataObj); else await addDoc(collection(db, "berita"), dataObj);
      batalEdit(); setLinkBerita(''); setKeteranganBaru(''); setShowForm(false); window.location.reload(); 
    } catch (error) { alert("Gagal!"); } setProsesLoading(false);
  };

  const simpanPengurus = async (e) => {
    e.preventDefault(); setProsesLoading(true);
    try {
      const dataObj = { nama: namaP, jabatan: jabatanP, keterangan: ketP, foto: linkP };
      if (idEditP) await updateDoc(doc(db, "pengurus", idEditP), dataObj); else await addDoc(collection(db, "pengurus"), dataObj);
      batalEditPengurus(); ambilSemuaData(); setShowForm(false);
    } catch (error) { alert("Gagal!"); } setProsesLoading(false);
  };
  const batalEditPengurus = () => { setIdEditP(null); setNamaP(''); setJabatanP(''); setLinkP(''); setKetP(''); setShowForm(false); };
  const hapusPengurus = async (id) => { if (window.confirm("Hapus?")) { await deleteDoc(doc(db, "pengurus", id)); ambilSemuaData(); } };

  const simpanGaleri = async (e) => {
    e.preventDefault(); setProsesLoading(true);
    try {
      const dataObj = { judul: judulG, keterangan: ketG, urlFoto: linkG };
      if (idEditG) await updateDoc(doc(db, "galeri", idEditG), dataObj); else await addDoc(collection(db, "galeri"), dataObj);
      batalEditGaleri(); ambilSemuaData(); setShowForm(false);
    } catch (error) { alert("Gagal!"); } setProsesLoading(false);
  };
  const mulaiEditGaleri = (item) => { setIdEditG(item.id); setJudulG(item.judul); setKetG(item.keterangan || ''); setLinkG(item.urlFoto); setShowForm(true); };
  const batalEditGaleri = () => { setIdEditG(null); setJudulG(''); setKetG(''); setLinkG(''); setShowForm(false); };
  const hapusGaleri = async (id) => { if (window.confirm("Hapus?")) { await deleteDoc(doc(db, "galeri", id)); ambilSemuaData(); } };

  const simpanDownload = async (e) => {
    e.preventDefault(); const dataObj = { judul: namaFileD, link: linkD, keterangan: ketD };
    if (idEditD) await updateDoc(doc(db, "download", idEditD), dataObj); else await addDoc(collection(db, "download"), dataObj);
    setIdEditD(null); setNamaFileD(''); setLinkD(''); setKetD(''); ambilSemuaData(); setShowForm(false);
  };
  const hapusDownload = async (id) => { if (window.confirm("Hapus?")) { await deleteDoc(doc(db, "download", id)); ambilSemuaData(); } };

  const hapusBukuTamu = async (id) => { if (window.confirm("Hapus pesan?")) { await deleteDoc(doc(db, "bukutamu", id)); ambilSemuaData(); } };
  const hapusPolling = async (id) => { if (window.confirm("Hapus polling?")) { await deleteDoc(doc(db, "polling", id)); ambilSemuaData(); } };

  // === SEARCH FILTER ===
  const filterData = (dataArray, key) => dataArray.filter(item => item[key]?.toLowerCase().includes(searchQuery.toLowerCase()));

  // ==========================================
  // VIEW: LOGIN (SAAS STYLE)
  // ==========================================
  if (!user) {
    return (
      <div className={`min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 transition-colors duration-300 ${isDarkMode ? 'dark' : ''}`}>
        <div className="bg-white dark:bg-slate-800 p-10 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-700 max-w-md w-full mx-4">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-200 dark:shadow-none">
              <LayoutDashboard className="text-white" size={32} />
            </div>
          </div>
          <h2 className="text-2xl font-black text-center text-slate-800 dark:text-white mb-2 tracking-tight">Portal Workspace</h2>
          <p className="text-center text-slate-500 dark:text-slate-400 text-sm mb-8">Masuk untuk mengelola sistem aplikasi</p>
          
          {errorLogin && <div className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-3 rounded-xl text-sm mb-6 font-medium text-center border border-red-100 dark:border-red-800/50">{errorLogin}</div>}
          
          <form onSubmit={tanganiLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Alamat Email</label>
              <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-slate-800 dark:text-white transition" placeholder="admin@sekolah.com" required />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Kata Sandi</label>
              <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-slate-800 dark:text-white transition" placeholder="••••••••" required />
            </div>
            <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl shadow-md transition-all active:scale-95 mt-4">
              Masuk Sekarang
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ==========================================
  // VIEW: DASHBOARD (SAAS STYLE)
  // ==========================================
  const menuItems = [
    { id: 'dashboard', label: 'Overview', icon: <LayoutDashboard size={20}/> },
    { id: 'berita', label: 'Artikel & Berita', icon: <FileText size={20}/> },
    { id: 'pengurus', label: 'Data Pengurus', icon: <Users size={20}/> },
    { id: 'galeri', label: 'Galeri Foto', icon: <ImageIcon size={20}/> },
    { id: 'download', label: 'File Download', icon: <Download size={20}/> },
    { id: 'polling', label: 'Polling Publik', icon: <BarChart2 size={20}/> },
    { id: 'bukutamu', label: 'Buku Tamu', icon: <MessageSquare size={20}/> },
  ];

  return (
    <div className={`min-h-screen flex transition-colors duration-300 ${isDarkMode ? 'dark bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-800'}`}>
      
      {/* --- SIDEBAR --- */}
      <aside className={`fixed z-20 inset-y-0 left-0 w-64 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0 transition duration-300 ease-in-out ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'} border-r flex flex-col shadow-sm`}>
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-md">
              <LayoutDashboard size={18} className="text-white" />
            </div>
            <span className="font-black text-xl tracking-tight">Workspace</span>
          </div>
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-slate-500"><X size={24} /></button>
        </div>
        <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
          <p className="px-4 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 mt-4">Menu Utama</p>
          {menuItems.map((item) => (
            <button key={item.id} onClick={() => { setActiveTab(item.id); setShowForm(false); setIsSidebarOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === item.id ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}>
              {item.icon} {item.label}
            </button>
          ))}
        </nav>
        <div className={`p-4 border-t ${isDarkMode ? 'border-slate-800' : 'border-slate-200'}`}>
          <button onClick={tanganiLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition">
            <LogOut size={20} /> Keluar Sesi
          </button>
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Navbar */}
        <header className={`sticky top-0 z-10 flex items-center justify-between px-6 py-4 backdrop-blur-md ${isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white/80 border-slate-200'} border-b shadow-sm`}>
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden text-slate-500"><Menu size={24} /></button>
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input type="text" placeholder="Cari data..." value={searchQuery} onChange={(e)=>setSearchQuery(e.target.value)} className={`pl-10 pr-4 py-2 w-64 rounded-full text-sm outline-none transition-all ${isDarkMode ? 'bg-slate-800 text-white focus:ring-slate-700' : 'bg-slate-100 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:shadow-sm'}`} />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => setIsDarkMode(!isDarkMode)} className={`p-2 rounded-full transition ${isDarkMode ? 'bg-slate-800 text-amber-400' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button className={`p-2 rounded-full transition relative ${isDarkMode ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-600'}`}>
              <Bell size={20} />
              <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-rose-500 border-2 border-white dark:border-slate-900 rounded-full"></span>
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-slate-200 dark:border-slate-700">
              <div className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm">A</div>
              <div className="hidden sm:block">
                <p className="text-sm font-bold leading-none">Admin Utama</p>
                <p className="text-xs text-slate-500 mt-1">Sistem Induk</p>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 lg:p-8">
          <div className="max-w-6xl mx-auto">
            
            {/* 1. DASHBOARD OVERVIEW */}
            {activeTab === 'dashboard' && (
              <div className="space-y-6 animate-fade-in-down">
                <div>
                  <h2 className="text-2xl font-black tracking-tight">Dashboard Overview</h2>
                  <p className="text-slate-500 dark:text-slate-400 mt-1">Ringkasan statistik data aplikasi Anda hari ini.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Stat Cards */}
                  {[
                    { label: 'Total Pengurus', count: pengurus.length, icon: <Users size={24}/>, color: 'text-blue-600', bg: 'bg-blue-100 dark:bg-blue-900/30' },
                    { label: 'Artikel & Berita', count: berita.length, icon: <FileText size={24}/>, color: 'text-emerald-600', bg: 'bg-emerald-100 dark:bg-emerald-900/30' },
                    { label: 'Foto Galeri', count: dataGaleri.length, icon: <ImageIcon size={24}/>, color: 'text-pink-600', bg: 'bg-pink-100 dark:bg-pink-900/30' },
                    { label: 'Pesan Buku Tamu', count: dataBukuTamu.length, icon: <MessageSquare size={24}/>, color: 'text-amber-600', bg: 'bg-amber-100 dark:bg-amber-900/30' }
                  ].map((stat, i) => (
                    <div key={i} className={`p-6 rounded-2xl border shadow-sm transition-all hover:shadow-md ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'}`}>
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm font-bold text-slate-500 dark:text-slate-400 mb-1">{stat.label}</p>
                          <h3 className="text-3xl font-black">{stat.count}</h3>
                        </div>
                        <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>{stat.icon}</div>
                      </div>
                    </div>
                  ))}
                </div>
                {/* Mock Chart Area */}
                <div className={`mt-8 p-6 rounded-2xl border shadow-sm ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'}`}>
                  <h3 className="font-bold mb-4 flex items-center gap-2"><BarChart2 size={18}/> Aktivitas Sistem Terbaru</h3>
                  <div className="h-48 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl flex items-center justify-center text-slate-400 font-medium">
                    Grafik Analitik (Segera Hadir)
                  </div>
                </div>
              </div>
            )}

            {/* 2. DYNAMIC CRUD SECTION (TABLE & FORM) */}
            {activeTab !== 'dashboard' && (
              <div className="animate-fade-in-down">
                
                {/* Header Action */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                  <div>
                    <h2 className="text-2xl font-black capitalize tracking-tight">Manajemen {activeTab}</h2>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Kelola data {activeTab} pada tabel di bawah.</p>
                  </div>
                  {activeTab !== 'bukutamu' && (
                    <button onClick={() => { setShowForm(!showForm); idEditP && batalEditPengurus(); idEdit && batalEdit(); idEditG && batalEditGaleri(); idEditD && setIdEditD(null); idEditPol && setIdEditPol(null); }} className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 shadow-md transition-all active:scale-95">
                      {showForm ? <X size={18}/> : <Plus size={18}/>} {showForm ? 'Tutup Form' : 'Tambah Data Baru'}
                    </button>
                  )}
                </div>

                {/* --- FORM CARD (SLIDE DOWN) --- */}
                {showForm && (
                  <div className={`mb-8 p-6 rounded-2xl border shadow-lg ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
                    <h3 className="text-lg font-black mb-6 border-b pb-4 dark:border-slate-700 flex items-center gap-2">
                      <Edit2 size={18} className="text-indigo-500"/> Form {activeTab}
                    </h3>
                    
                    {/* FORM PENGURUS */}
                    {activeTab === 'pengurus' && (
                      <form onSubmit={simpanPengurus} className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div><label className="block text-xs font-bold text-slate-500 mb-2">Nama Lengkap</label><input type="text" value={namaP} onChange={e=>setNamaP(e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500 outline-none" required /></div>
                          <div><label className="block text-xs font-bold text-slate-500 mb-2">Jabatan</label><input type="text" value={jabatanP} onChange={e=>setJabatanP(e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500 outline-none" required /></div>
                        </div>
                        <div><label className="block text-xs font-bold text-slate-500 mb-2">Link Foto URL</label><input type="text" value={linkP} onChange={e=>setLinkP(e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500 outline-none" /></div>
                        <div><label className="block text-xs font-bold text-slate-500 mb-2">Keterangan Profil</label><FormatToolbar elementId="ketP" stateValue={ketP} stateSetter={setKetP}/><textarea id="ketP" value={ketP} onChange={e=>setKetP(e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500 outline-none h-24" /></div>
                        <button type="submit" disabled={prosesLoading} className="bg-indigo-600 text-white font-bold py-2.5 px-6 rounded-xl shadow-md">{prosesLoading?'Menyimpan...':'Simpan Data'}</button>
                      </form>
                    )}

                    {/* FORM BERITA */}
                    {activeTab === 'berita' && (
                      <form onSubmit={simpanBerita} className="space-y-4">
                        <div><label className="block text-xs font-bold text-slate-500 mb-2">Judul Berita</label><input type="text" value={judulBaru} onChange={e=>setJudulBaru(e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-indigo-500" required /></div>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div><label className="block text-xs font-bold text-slate-500 mb-2">Kategori</label><select value={kategoriBaru} onChange={e=>setKategoriBaru(e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 outline-none"><option value="Pengumuman">Pengumuman</option><option value="Prestasi">Prestasi</option><option value="Kegiatan">Kegiatan</option></select></div>
                          <div><label className="block text-xs font-bold text-slate-500 mb-2">Link Gambar Cover URL</label><input type="text" value={linkBerita} onChange={e=>setLinkBerita(e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-indigo-500" /></div>
                        </div>
                        <div><label className="block text-xs font-bold text-slate-500 mb-2">Ringkasan Singkat</label><FormatToolbar elementId="ketB" stateValue={keteranganBaru} stateSetter={setKeteranganBaru}/><textarea id="ketB" value={keteranganBaru} onChange={e=>setKeteranganBaru(e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 outline-none h-20" /></div>
                        <div><label className="block text-xs font-bold text-slate-500 mb-2">Isi Artikel Lengkap</label><FormatToolbar elementId="isiB" stateValue={isiBaru} stateSetter={setIsiBaru}/><textarea id="isiB" value={isiBaru} onChange={e=>setIsiBaru(e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 outline-none h-40" required /></div>
                        <button type="submit" disabled={prosesLoading} className="bg-indigo-600 text-white font-bold py-2.5 px-6 rounded-xl shadow-md">{prosesLoading?'Menyimpan...':'Terbitkan Berita'}</button>
                      </form>
                    )}

                    {/* FORM GALERI */}
                    {activeTab === 'galeri' && (
                      <form onSubmit={simpanGaleri} className="space-y-4">
                        <div><label className="block text-xs font-bold text-slate-500 mb-2">Judul Foto</label><input type="text" value={judulG} onChange={e=>setJudulG(e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 outline-none" required /></div>
                        <div><label className="block text-xs font-bold text-slate-500 mb-2">Link Foto ImgBB/URL</label><input type="text" value={linkG} onChange={e=>setLinkG(e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 outline-none" required /></div>
                        <div><label className="block text-xs font-bold text-slate-500 mb-2">Keterangan Momen</label><FormatToolbar elementId="ketG" stateValue={ketG} stateSetter={setKetG}/><textarea id="ketG" value={ketG} onChange={e=>setKetG(e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 outline-none h-24" /></div>
                        <button type="submit" className="bg-indigo-600 text-white font-bold py-2.5 px-6 rounded-xl shadow-md">Upload ke Galeri</button>
                      </form>
                    )}

                    {/* FORM DOWNLOAD / POLLING */}
                    {activeTab === 'download' && (
                      <form onSubmit={simpanDownload} className="space-y-4">
                        <input type="text" placeholder="Nama Dokumen" value={namaFileD} onChange={e=>setNamaFileD(e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 outline-none" required />
                        <input type="text" placeholder="Link Google Drive" value={linkD} onChange={e=>setLinkD(e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 outline-none" required />
                        <textarea placeholder="Keterangan file" value={ketD} onChange={e=>setKetD(e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 outline-none" />
                        <button type="submit" className="bg-indigo-600 text-white font-bold py-2.5 px-6 rounded-xl shadow-md">Simpan Dokumen</button>
                      </form>
                    )}
                  </div>
                )}

                {/* --- DATA TABLE CARD --- */}
                <div className={`rounded-2xl border shadow-sm overflow-hidden ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className={`text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'bg-slate-900/50 text-slate-400' : 'bg-slate-50 text-slate-500'} border-b dark:border-slate-700`}>
                          <th className="px-6 py-4">Data Entry</th>
                          <th className="px-6 py-4">Detail Info</th>
                          <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
                        {/* RENDER TABLE ROWS BASED ON TAB */}
                        
                        {activeTab === 'pengurus' && filterData(pengurus, 'nama').map(item => (
                          <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition">
                            <td className="px-6 py-4 flex items-center gap-4">
                              <img src={item.foto || 'https://via.placeholder.com/150'} className="w-10 h-10 rounded-full object-cover border dark:border-slate-600" alt="avatar"/>
                              <div><p className="font-bold">{item.nama}</p><p className="text-xs text-slate-500">{item.id.slice(0,8)}</p></div>
                            </td>
                            <td className="px-6 py-4"><span className="inline-flex px-2.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">{item.jabatan}</span></td>
                            <td className="px-6 py-4 text-right space-x-2">
                              <button onClick={()=>{setIdEditP(item.id); setNamaP(item.nama); setJabatanP(item.jabatan); setKetP(item.keterangan||''); setLinkP(item.foto||''); setShowForm(true);}} className="p-2 text-slate-400 hover:text-indigo-600 bg-slate-100 hover:bg-indigo-50 dark:bg-slate-700 dark:hover:bg-indigo-900/30 rounded-lg transition"><Edit2 size={16}/></button>
                              <button onClick={()=>hapusPengurus(item.id)} className="p-2 text-slate-400 hover:text-rose-600 bg-slate-100 hover:bg-rose-50 dark:bg-slate-700 dark:hover:bg-rose-900/30 rounded-lg transition"><Trash2 size={16}/></button>
                            </td>
                          </tr>
                        ))}

                        {activeTab === 'berita' && filterData(berita, 'judul').map(item => (
                          <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition">
                            <td className="px-6 py-4">
                              <p className="font-bold line-clamp-1">{item.judul}</p>
                              <p className="text-xs text-slate-500 mt-1">{item.tanggal}</p>
                            </td>
                            <td className="px-6 py-4"><span className="inline-flex px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">{item.kategori}</span></td>
                            <td className="px-6 py-4 text-right space-x-2">
                              <button onClick={()=>{mulaiEdit(item); setShowForm(true);}} className="p-2 text-slate-400 hover:text-indigo-600 bg-slate-100 hover:bg-indigo-50 dark:bg-slate-700 rounded-lg transition"><Edit2 size={16}/></button>
                              <button onClick={()=>hapusBerita(item.id)} className="p-2 text-slate-400 hover:text-rose-600 bg-slate-100 hover:bg-rose-50 dark:bg-slate-700 rounded-lg transition"><Trash2 size={16}/></button>
                            </td>
                          </tr>
                        ))}

                        {activeTab === 'galeri' && filterData(dataGaleri, 'judul').map(item => (
                          <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition">
                            <td className="px-6 py-4 flex items-center gap-4">
                              <img src={item.urlFoto} className="w-16 h-12 rounded-lg object-cover border dark:border-slate-600" alt="gal"/>
                              <p className="font-bold">{item.judul}</p>
                            </td>
                            <td className="px-6 py-4 text-slate-500 text-sm italic">File Gambar Tersimpan</td>
                            <td className="px-6 py-4 text-right space-x-2">
                              <button onClick={()=>{mulaiEditGaleri(item);}} className="p-2 text-slate-400 hover:text-indigo-600 bg-slate-100 hover:bg-indigo-50 dark:bg-slate-700 rounded-lg transition"><Edit2 size={16}/></button>
                              <button onClick={()=>hapusGaleri(item.id)} className="p-2 text-slate-400 hover:text-rose-600 bg-slate-100 hover:bg-rose-50 dark:bg-slate-700 rounded-lg transition"><Trash2 size={16}/></button>
                            </td>
                          </tr>
                        ))}

                        {(activeTab === 'bukutamu' || activeTab === 'download' || activeTab === 'polling') && 
                          (activeTab === 'bukutamu' ? filterData(dataBukuTamu, 'nama') : activeTab === 'download' ? filterData(dataDownload, 'judul') : filterData(dataPolling, 'pertanyaan')).map(item => (
                          <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition">
                            <td className="px-6 py-4"><p className="font-bold">{item.nama || item.judul || item.pertanyaan}</p></td>
                            <td className="px-6 py-4 text-sm text-slate-500 line-clamp-1">{item.pesan || item.opsi || "Aset Web"}</td>
                            <td className="px-6 py-4 text-right">
                              <button onClick={() => activeTab==='bukutamu'?hapusBukuTamu(item.id):activeTab==='download'?hapusDownload(item.id):hapusPolling(item.id)} className="p-2 text-slate-400 hover:text-rose-600 bg-slate-100 hover:bg-rose-50 dark:bg-slate-700 rounded-lg transition"><Trash2 size={16}/></button>
                            </td>
                          </tr>
                        ))}

                      </tbody>
                    </table>
                  </div>
                  {/* Pagination Mockup */}
                  <div className={`p-4 border-t flex justify-between items-center text-sm text-slate-500 ${isDarkMode ? 'border-slate-700 bg-slate-900/30' : 'border-slate-100 bg-slate-50'}`}>
                    <span>Menampilkan data halaman 1</span>
                    <div className="flex gap-2">
                      <button className="px-3 py-1 rounded bg-white dark:bg-slate-800 border dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 transition">Prev</button>
                      <button className="px-3 py-1 rounded bg-white dark:bg-slate-800 border dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 transition">Next</button>
                    </div>
                  </div>
                </div>

              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Admin;