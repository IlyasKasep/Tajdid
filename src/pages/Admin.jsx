import React, { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc, addDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { 
  LayoutDashboard, Users, FileText, Mail, 
  Download, Settings, Menu, X, Sun, Moon, 
  LogOut, Plus, Edit2, Trash2, Phone, MessageCircle
} from 'lucide-react';

function Admin(props) {
  const {
    user, email, setEmail, password, setPassword, errorLogin, tanganiLogin, tanganiLogout,
    berita, judulBaru, setJudulBaru, kategoriBaru, setKategoriBaru,
    isiBaru, setIsiBaru, idEdit, batalEdit, mulaiEdit, hapusBerita
  } = props;

  // === UI STATE ===
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [prosesLoading, setProsesLoading] = useState(false);

  // === STATE PENGURUS ===
  const [listPengurus, setListPengurus] = useState([]);
  const [namaP, setNamaP] = useState('');
  const [jabatanP, setJabatanP] = useState('');
  const [ketP, setKetP] = useState('');
  const [urlFotoP, setUrlFotoP] = useState('');
  const [kontakP, setKontakP] = useState('');
  const [pendidikanP, setPendidikanP] = useState('');
  const [keahlianP, setKeahlianP] = useState('');
  const [mottoP, setMottoP] = useState('');
  const [idEditP, setIdEditP] = useState(null);

  // === STATE KONTAK (PENGGANTI BUKU TAMU) ===
  const [listKontak, setListKontak] = useState([]);

  // Ambil Data dari Firebase
  const ambilData = async () => {
    try {
      // Ambil Pengurus
      const snapP = await getDocs(collection(db, "pengurus"));
      setListPengurus(snapP.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      
      // Ambil Kontak (Sebelumnya Koleksi BukuTamu)
      const snapK = await getDocs(collection(db, "bukutamu")); 
      setListKontak(snapK.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (err) { console.error(err); }
  };

  useEffect(() => {
    ambilData();
  }, []);

  const hapusKontak = async (id) => {
    if (window.confirm("Hapus pesan kontak ini?")) {
      await deleteDoc(doc(db, "bukutamu", id));
      ambilData();
    }
  };

  // Logika Simpan Pengurus (Sama seperti sebelumnya)
  const simpanPengurus = async (e) => {
    e.preventDefault();
    setProsesLoading(true);
    const payload = {
      nama: namaP, jabatan: jabatanP, keterangan: ketP, foto: urlFotoP,
      kontak: kontakP, pendidikan: pendidikanP, keahlian: keahlianP, motto: mottoP,
      updatedAt: new Date().toISOString()
    };
    try {
      if (idEditP) { await updateDoc(doc(db, "pengurus", idEditP), payload); }
      else { await addDoc(collection(db, "pengurus"), payload); }
      resetFormP(); ambilData(); setShowForm(false);
    } catch (err) { alert("Gagal menyimpan"); }
    finally { setProsesLoading(false); }
  };

  const resetFormP = () => {
    setNamaP(''); setJabatanP(''); setKetP(''); setUrlFotoP('');
    setKontakP(''); setPendidikanP(''); setKeahlianP(''); setMottoP('');
    setIdEditP(null);
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 border border-slate-100 text-center">
          <h2 className="text-2xl font-black text-slate-800 mb-6">Admin Login</h2>
          <form onSubmit={tanganiLogin} className="space-y-4">
            <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email" className="w-full p-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-emerald-500" required />
            <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password" className="w-full p-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-emerald-500" required />
            <button className="w-full bg-emerald-600 text-white font-bold py-4 rounded-2xl hover:bg-emerald-700 transition">Masuk Panel</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-slate-950' : 'bg-slate-50'}`}>
      <div className="flex">
        {/* Sidebar */}
        <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-slate-900 border-r dark:border-slate-800 transition-transform lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="p-6 flex flex-col h-full">
            <div className="flex items-center gap-3 mb-10">
              <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white font-black">A</div>
              <span className="font-black text-xl dark:text-white uppercase tracking-tighter">AT-TAJDIED</span>
            </div>
            <nav className="flex-1 space-y-2">
              <button onClick={()=>setActiveTab('dashboard')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition ${activeTab==='dashboard' ? 'bg-emerald-50 text-emerald-600' : 'text-slate-400 hover:bg-slate-50'}`}><LayoutDashboard size={20}/> Dashboard</button>
              <button onClick={()=>setActiveTab('pengurus')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition ${activeTab==='pengurus' ? 'bg-emerald-50 text-emerald-600' : 'text-slate-400 hover:bg-slate-50'}`}><Users size={20}/> Pengurus & Guru</button>
              <button onClick={()=>setActiveTab('berita')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition ${activeTab==='berita' ? 'bg-emerald-50 text-emerald-600' : 'text-slate-400 hover:bg-slate-50'}`}><FileText size={20}/> Berita</button>
              <button onClick={()=>setActiveTab('kontak')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition ${activeTab==='kontak' ? 'bg-emerald-50 text-emerald-600' : 'text-slate-400 hover:bg-slate-50'}`}><Mail size={20}/> Pesan Kontak</button>
              <button onClick={()=>setActiveTab('download')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition ${activeTab==='download' ? 'bg-emerald-50 text-emerald-600' : 'text-slate-400 hover:bg-slate-50'}`}><Download size={20}/> Download</button>
            </nav>
            <button onClick={tanganiLogout} className="mt-auto flex items-center gap-3 px-4 py-3 text-rose-500 font-bold hover:bg-rose-50 rounded-xl transition"><LogOut size={20}/> Keluar</button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 lg:ml-64 p-4 md:p-8">
          <header className="flex justify-between items-center mb-8">
            <button onClick={()=>setIsSidebarOpen(!isSidebarOpen)} className="lg:hidden p-2 text-slate-500"><Menu/></button>
            <h2 className="text-2xl font-black text-slate-800 dark:text-white capitalize">{activeTab === 'kontak' ? 'Kontak Masuk' : activeTab}</h2>
            <button onClick={()=>setIsDarkMode(!isDarkMode)} className="p-3 bg-white dark:bg-slate-800 rounded-2xl shadow-sm dark:text-white">{isDarkMode ? <Sun/> : <Moon/>}</button>
          </header>

          {/* TAB KONTAK (PENGGANTI BUKU TAMU) */}
          {activeTab === 'kontak' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <p className="text-slate-500 font-medium">Pesan dari wali murid atau pengunjung website.</p>
              </div>
              <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden shadow-sm border border-slate-100 dark:border-slate-800">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 dark:bg-slate-800 text-slate-400 text-xs font-black uppercase tracking-widest">
                    <tr>
                      <th className="px-8 py-5">Pengirim</th>
                      <th className="px-8 py-5">Pesan / Masukan</th>
                      <th className="px-8 py-5">Tanggal</th>
                      <th className="px-8 py-5 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y dark:divide-slate-800">
                    {listKontak.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition">
                        <td className="px-8 py-5">
                          <p className="font-bold text-slate-800 dark:text-white">{item.nama}</p>
                          <p className="text-xs text-emerald-600 font-medium">{item.email || item.wa || 'Tanpa Kontak'}</p>
                        </td>
                        <td className="px-8 py-5">
                          <p className="text-sm text-slate-600 dark:text-slate-400 italic">"{item.pesan}"</p>
                        </td>
                        <td className="px-8 py-5">
                          <p className="text-xs font-bold text-slate-400">{item.tanggal || 'Baru'}</p>
                        </td>
                        <td className="px-8 py-5 text-right">
                          <button onClick={()=>hapusKontak(item.id)} className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition"><Trash2 size={18}/></button>
                        </td>
                      </tr>
                    ))}
                    {listKontak.length === 0 && (
                      <tr><td colSpan="4" className="p-10 text-center text-slate-400 italic">Belum ada pesan masuk.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Bagian Pengurus & Dashboard Tetap Ada */}
          {activeTab === 'pengurus' && (
             <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <p className="text-slate-500 font-medium">Kelola profil lengkap guru dan pengurus sekolah.</p>
                  <button onClick={()=>{resetFormP(); setShowForm(!showForm)}} className="bg-emerald-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-emerald-700 transition shadow-lg shadow-emerald-100">
                    {showForm ? <X size={20}/> : <Plus size={20}/>} {showForm ? 'Batal' : 'Tambah Guru'}
                  </button>
                </div>
                {/* Form Pengurus (Sama seperti sebelumnya) */}
                {showForm && (
                  <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 shadow-sm border border-slate-100 dark:border-slate-800">
                     <form onSubmit={simpanPengurus} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                           <input type="text" value={namaP} onChange={(e)=>setNamaP(e.target.value)} placeholder="Nama Lengkap" className="w-full p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border-none" required />
                           <input type="text" value={jabatanP} onChange={(e)=>setJabatanP(e.target.value)} placeholder="Jabatan" className="w-full p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border-none" required />
                           <input type="text" value={kontakP} onChange={(e)=>setKontakP(e.target.value)} placeholder="No WA / Email" className="w-full p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border-none" />
                           <input type="text" value={urlFotoP} onChange={(e)=>setUrlFotoP(e.target.value)} placeholder="URL Foto" className="w-full p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border-none" />
                        </div>
                        <div className="space-y-4">
                           <input type="text" value={pendidikanP} onChange={(e)=>setPendidikanP(e.target.value)} placeholder="Pendidikan" className="w-full p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border-none" />
                           <input type="text" value={keahlianP} onChange={(e)=>setKeahlianP(e.target.value)} placeholder="Keahlian" className="w-full p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border-none" />
                           <input type="text" value={mottoP} onChange={(e)=>setMottoP(e.target.value)} placeholder="Motto" className="w-full p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border-none" />
                           <textarea value={ketP} onChange={(e)=>setKetP(e.target.value)} placeholder="Overview" className="w-full p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border-none h-24"></textarea>
                        </div>
                        <button className="md:col-span-2 bg-emerald-600 text-white font-black py-4 rounded-2xl">Simpan Data</button>
                     </form>
                  </div>
                )}
                {/* List Table Pengurus (Thumbnail Foto, Nama, Jabatan) */}
                <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden shadow-sm border border-slate-100 dark:border-slate-800">
                  <table className="w-full text-left">
                    <tbody className="divide-y dark:divide-slate-800">
                      {listPengurus.map((item) => (
                        <tr key={item.id}>
                          <td className="px-8 py-5 flex items-center gap-4">
                            <img src={item.foto} className="w-12 h-12 rounded-xl object-cover" />
                            <p className="font-bold">{item.nama}</p>
                          </td>
                          <td className="px-8 py-5 text-emerald-600 font-bold uppercase text-xs">{item.jabatan}</td>
                          <td className="px-8 py-5 text-right flex justify-end gap-2">
                            <button onClick={()=>mulaiEditP(item)} className="p-2 text-blue-500"><Edit2 size={18}/></button>
                            <button onClick={async()=>{await deleteDoc(doc(db,"pengurus",item.id)); ambilData();}} className="p-2 text-rose-500"><Trash2 size={18}/></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
             </div>
          )}

          {activeTab === 'dashboard' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
                <p className="text-slate-400 font-bold text-xs uppercase mb-1">Pesan Kontak</p>
                <h3 className="text-4xl font-black text-slate-800">{listKontak.length}</h3>
              </div>
              <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
                <p className="text-slate-400 font-bold text-xs uppercase mb-1">Total Guru</p>
                <h3 className="text-4xl font-black text-slate-800">{listPengurus.length}</h3>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default Admin;