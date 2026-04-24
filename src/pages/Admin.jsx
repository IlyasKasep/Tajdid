import { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';

function Admin(props) {
  const { user, email, setEmail, password, setPassword, tanganiLogin, tanganiLogout } = props;

  // --- 1. STATE MANAGEMENT ---
  const [activeTab, setActiveTab] = useState('pengurus');
  const [loading, setLoading] = useState(false);

  // State Data (Read)
  const [dataPengurus, setDataPengurus] = useState([]);
  const [dataDownload, setDataDownload] = useState([]);
  const [dataBerita, setDataBerita] = useState([]);
  const [dataPolling, setDataPolling] = useState([]);
  const [dataFoto, setDataFoto] = useState([]);
  const [dataBukuTamu, setDataBukuTamu] = useState([]);

  // State Input Form
  const [idEdit, setIdEdit] = useState(null);
  const [form, setForm] = useState({
    nama: '', jabatan: '', link: '', keterangan: '', 
    judul: '', isi: '', kategori: '', pertanyaan: '', opsi: ''
  });

  // --- 2. FUNGSI AMBIL DATA (READ) ---
  const ambilSemuaData = async () => {
    setLoading(true);
    try {
      const qPengurus = await getDocs(collection(db, "pengurus"));
      setDataPengurus(qPengurus.docs.map(d => ({ id: d.id, ...d.data() })));

      const qDownload = await getDocs(collection(db, "download"));
      setDataDownload(qDownload.docs.map(d => ({ id: d.id, ...d.data() })));

      const qBerita = await getDocs(collection(db, "berita"));
      setDataBerita(qBerita.docs.map(d => ({ id: d.id, ...d.data() })));

      const qPolling = await getDocs(collection(db, "polling"));
      setDataPolling(qPolling.docs.map(d => ({ id: d.id, ...d.data() })));

      const qFoto = await getDocs(collection(db, "galeri"));
      setDataFoto(qFoto.docs.map(d => ({ id: d.id, ...d.data() })));

      const qBukuTamu = await getDocs(collection(db, "bukutamu"));
      setDataBukuTamu(qBukuTamu.docs.map(d => ({ id: d.id, ...d.data() })));
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  useEffect(() => { if (user) ambilSemuaData(); }, [user]);

  // --- 3. FUNGSI CRUD GLOBAL ---
  const resetForm = () => {
    setForm({ nama: '', jabatan: '', link: '', keterangan: '', judul: '', isi: '', kategori: '', pertanyaan: '', opsi: '' });
    setIdEdit(null);
  };

  const simpanData = async (e, koleksi, dataObj) => {
    e.preventDefault();
    try {
      if (idEdit) {
        await updateDoc(doc(db, koleksi, idEdit), dataObj);
        alert("Data berhasil diupdate!");
      } else {
        await addDoc(collection(db, koleksi), { ...dataObj, tanggal: new Date().toLocaleDateString('id-ID') });
        alert("Data berhasil ditambah!");
      }
      resetForm();
      ambilSemuaData();
    } catch (e) { alert("Gagal menyimpan data"); }
  };

  const hapusData = async (id, koleksi) => {
    if (window.confirm("Hapus data ini?")) {
      await deleteDoc(doc(db, koleksi, id));
      ambilSemuaData();
    }
  };

  const mulaiEdit = (item) => {
    setIdEdit(item.id);
    setForm({ ...item });
    window.scrollTo(0, 0);
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full border-t-8 border-blue-900">
          <h2 className="text-2xl font-bold text-center mb-6">Admin Panel Login</h2>
          <form onSubmit={tanganiLogin} className="space-y-4">
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" required />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" required />
            <button className="w-full bg-blue-900 text-white font-bold py-3 rounded-lg hover:bg-blue-800 transition">MASUK</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <section className="py-10 max-w-7xl mx-auto px-4 min-h-screen bg-gray-50">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-black text-blue-900 uppercase tracking-tighter">Sistem Manajemen Admin</h1>
        <button onClick={tanganiLogout} className="bg-red-600 text-white px-6 py-2 rounded-full font-bold hover:bg-red-700 shadow-md">Logout</button>
      </div>

      {/* --- NAVIGASI TAB --- */}
      <div className="flex flex-wrap gap-2 mb-8 bg-white p-2 rounded-xl shadow-sm border border-gray-200">
        {[
          { id: 'pengurus', label: '7. Biodata Pengurus' },
          { id: 'download', label: '8. Download File' },
          { id: 'berita', label: '9. Berita & Artikel' },
          { id: 'polling', label: '10. Polling' },
          { id: 'galeri', label: '11. Manajemen Foto' },
          { id: 'bukutamu', label: '12. Buku Tamu' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => { setActiveTab(tab.id); resetForm(); }}
            className={`px-4 py-2 rounded-lg font-bold text-sm transition ${activeTab === tab.id ? 'bg-blue-900 text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* --- KOLOM KIRI: FORM INPUT --- */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-2xl shadow-xl border-t-4 border-blue-900 sticky top-10">
            <h2 className="font-black text-xl mb-6 text-gray-800 uppercase italic">
              {idEdit ? `Update ${activeTab}` : `Input ${activeTab}`}
            </h2>
            
            <form className="space-y-4" onSubmit={(e) => {
              let data = {};
              if (activeTab === 'pengurus') data = { nama: form.nama, jabatan: form.jabatan, link: form.link, keterangan: form.keterangan };
              if (activeTab === 'download') data = { judul: form.judul, link: form.link, keterangan: form.keterangan };
              if (activeTab === 'berita') data = { judul: form.judul, isi: form.isi, link: form.link, keterangan: form.keterangan };
              if (activeTab === 'polling') data = { pertanyaan: form.pertanyaan, opsi: form.opsi, keterangan: form.keterangan };
              if (activeTab === 'galeri') data = { judul: form.judul, link: form.link, keterangan: form.keterangan };
              if (activeTab === 'bukutamu') data = { nama: form.nama, isi: form.isi, keterangan: form.keterangan };
              simpanData(e, activeTab === 'galeri' ? 'galeri' : activeTab, data);
            }}>

              {/* INPUT DINAMIS BERDASARKAN TAB */}
              {(activeTab === 'pengurus' || activeTab === 'bukutamu') && (
                <input type="text" placeholder="Nama Lengkap" value={form.nama} onChange={(e) => setForm({ ...form, nama: e.target.value })} className="w-full p-3 border rounded-lg" required />
              )}
              {activeTab === 'pengurus' && (
                <input type="text" placeholder="Jabatan" value={form.jabatan} onChange={(e) => setForm({ ...form, jabatan: e.target.value })} className="w-full p-3 border rounded-lg" required />
              )}
              {(activeTab === 'download' || activeTab === 'berita' || activeTab === 'galeri') && (
                <input type="text" placeholder="Judul / Nama File" value={form.judul} onChange={(e) => setForm({ ...form, judul: e.target.value })} className="w-full p-3 border rounded-lg" required />
              )}
              {activeTab === 'polling' && (
                <input type="text" placeholder="Pertanyaan Polling" value={form.pertanyaan} onChange={(e) => setForm({ ...form, pertanyaan: e.target.value })} className="w-full p-3 border rounded-lg" required />
              )}
              {activeTab === 'polling' && (
                <input type="text" placeholder="Opsi Jawaban (Pisah dengan koma)" value={form.opsi} onChange={(e) => setForm({ ...form, opsi: e.target.value })} className="w-full p-3 border rounded-lg" />
              )}
              {(activeTab === 'berita' || activeTab === 'bukutamu') && (
                <textarea placeholder="Isi Pesan / Artikel" value={form.isi} onChange={(e) => setForm({ ...form, isi: e.target.value })} className="w-full p-3 border rounded-lg h-32" required></textarea>
              )}
              {activeTab !== 'bukutamu' && activeTab !== 'polling' && (
                <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                  <label className="text-xs font-bold text-yellow-700 uppercase">Link Manual (ImgBB/Drive/Lainnya)</label>
                  <input type="text" placeholder="https://..." value={form.link} onChange={(e) => setForm({ ...form, link: e.target.value })} className="w-full p-2 border-b border-yellow-300 bg-transparent outline-none" required />
                </div>
              )}
              
              <input type="text" placeholder="Keterangan Tambahan" value={form.keterangan} onChange={(e) => setForm({ ...form, keterangan: e.target.value })} className="w-full p-3 border rounded-lg" />

              <div className="flex gap-2 pt-4">
                <button type="submit" className="flex-1 bg-blue-900 text-white font-black py-3 rounded-xl shadow-lg hover:scale-105 transition uppercase italic">Simpan Data</button>
                {idEdit && <button type="button" onClick={resetForm} className="bg-gray-400 text-white px-4 rounded-xl">Batal</button>}
              </div>
            </form>
          </div>
        </div>

        {/* --- KOLOM KANAN: DAFTAR DATA (READ/DELETE) --- */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="font-bold text-gray-500 uppercase tracking-widest text-sm mb-4">Database: {activeTab}</h2>
          
          {loading ? <p>Memuat data...</p> : (
            <div className="grid grid-cols-1 gap-4">
              {/* RENDER LIST BERDASARKAN TAB */}
              {(activeTab === 'pengurus' ? dataPengurus : 
                activeTab === 'download' ? dataDownload : 
                activeTab === 'berita' ? dataBerita : 
                activeTab === 'polling' ? dataPolling : 
                activeTab === 'galeri' ? dataFoto : dataBukuTamu).map((item) => (
                <div key={item.id} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:shadow-md transition">
                  <div className="flex gap-4 items-center">
                    {item.link && (item.link.includes('ibb') || item.link.includes('jpg')) ? (
                       <img src={item.link} className="w-16 h-16 rounded-lg object-cover bg-gray-200" alt="" />
                    ) : (
                      <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center text-blue-900 font-bold uppercase">{activeTab.charAt(0)}</div>
                    )}
                    <div>
                      <h4 className="font-black text-gray-800 leading-tight">{item.nama || item.judul || item.pertanyaan}</h4>
                      <p className="text-xs text-blue-600 font-bold uppercase">{item.jabatan || item.tanggal}</p>
                      <p className="text-sm text-gray-500 line-clamp-1 italic">{item.keterangan || item.isi || 'Tidak ada keterangan'}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 w-full md:w-auto">
                    <button onClick={() => mulaiEdit(item)} className="flex-1 md:flex-none px-4 py-2 bg-amber-100 text-amber-700 rounded-lg font-bold text-xs hover:bg-amber-200">EDIT</button>
                    <button onClick={() => hapusData(item.id, activeTab === 'galeri' ? 'galeri' : activeTab)} className="flex-1 md:flex-none px-4 py-2 bg-red-100 text-red-700 rounded-lg font-bold text-xs hover:bg-red-200">HAPUS</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Admin;