import { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

function Admin(props) {
  const {
    user, email, setEmail, password, setPassword, errorLogin, tanganiLogin, tanganiLogout,
    berita, judulBaru, setJudulBaru, kategoriBaru, setKategoriBaru,
    isiBaru, setIsiBaru, idEdit, batalEdit, mulaiEdit, hapusBerita
  } = props;

  // --- STATE MANAGEMENT ---
  const [activeTab, setActiveTab] = useState('berita'); 
  
  // State Input Manual
  const [urlFotoManual, setUrlFotoManual] = useState('');
  const [keteranganBaru, setKeteranganBaru] = useState(''); // Kolom Keterangan

  // State Pengurus
  const [pengurus, setPengurus] = useState([]);
  const [namaP, setNamaP] = useState('');
  const [jabatanP, setJabatanP] = useState('');
  const [linkFotoP, setLinkFotoP] = useState('');
  const [ketP, setKetP] = useState('');
  const [idEditP, setIdEditP] = useState(null);

  // State Galeri
  const [galeri, setGaleri] = useState([]);
  const [judulG, setJudulG] = useState('');
  const [linkFotoG, setLinkFotoG] = useState('');
  const [ketG, setKetG] = useState('');

  // --- FUNGSI AMBIL DATA (READ) ---
  const ambilSemuaData = async () => {
    const snapP = await getDocs(collection(db, "pengurus"));
    setPengurus(snapP.docs.map(d => ({id: d.id, ...d.data()})));
    
    const snapG = await getDocs(collection(db, "galeri"));
    setGaleri(snapG.docs.map(d => ({id: d.id, ...d.data()})).reverse());
  };

  useEffect(() => { if (user) ambilSemuaData(); }, [user]);

  // === 1. CRUD BERITA (Gunakan Props dari App.jsx + Tambahan Link Manual) ===
  const simpanBerita = async (e) => {
    e.preventDefault();
    try {
      const data = {
        judul: judulBaru,
        kategori: kategoriBaru,
        isi: isiBaru,
        gambar: urlFotoManual, // Link dari ImgBB manual
        keterangan: keteranganBaru,
        tanggal: new Date().toLocaleDateString('id-ID')
      };

      if (idEdit) {
        await updateDoc(doc(db, "berita", idEdit), data);
        alert("Berita Berhasil Diupdate!");
      } else {
        await addDoc(collection(db, "berita"), data);
        alert("Berita Berhasil Ditambah!");
      }
      window.location.reload(); // Refresh total agar sinkron
    } catch (err) { alert("Gagal simpan berita"); }
  };

  // === 2. CRUD PENGURUS ===
  const simpanPengurus = async (e) => {
    e.preventDefault();
    const data = { nama: namaP, jabatan: jabatanP, foto: linkFotoP, keterangan: ketP };
    if (idEditP) {
      await updateDoc(doc(db, "pengurus", idEditP), data);
    } else {
      await addDoc(collection(db, "pengurus"), data);
    }
    alert("Data Pengurus Berhasil!");
    setNamaP(''); setJabatanP(''); setLinkFotoP(''); setKetP(''); setIdEditP(null);
    ambilSemuaData();
  };

  const hapusPengurus = async (id) => {
    if(window.confirm("Hapus data ini?")) {
      await deleteDoc(doc(db, "pengurus", id));
      ambilSemuaData();
    }
  };

  // === 3. CRUD GALERI ===
  const simpanGaleri = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "galeri"), { judul: judulG, urlFoto: linkFotoG, keterangan: ketG });
    alert("Galeri Berhasil!");
    setJudulG(''); setLinkFotoG(''); setKetG('');
    ambilSemuaData();
  };

  const hapusGaleri = async (id) => {
    if(window.confirm("Hapus foto ini?")) {
      await deleteDoc(doc(db, "galeri", id));
      ambilSemuaData();
    }
  };

  return (
    <section className="py-12 max-w-6xl mx-auto px-4">
      {!user ? (
        <div className="bg-white p-8 rounded shadow-md max-w-md mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
          <form onSubmit={tanganiLogin} className="space-y-4">
            <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} className="w-full p-2 border" />
            <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} className="w-full p-2 border" />
            <button className="w-full bg-blue-800 text-white py-2 rounded">Login</button>
          </form>
        </div>
      ) : (
        <div>
          {/* TAB NAVIGASI */}
          <div className="flex gap-4 mb-8 border-b pb-2">
            <button onClick={() => setActiveTab('berita')} className={`pb-2 px-4 ${activeTab === 'berita' ? 'border-b-4 border-blue-800 font-bold' : ''}`}>Berita</button>
            <button onClick={() => setActiveTab('pengurus')} className={`pb-2 px-4 ${activeTab === 'pengurus' ? 'border-b-4 border-blue-800 font-bold' : ''}`}>Pengurus</button>
            <button onClick={() => setActiveTab('galeri')} className={`pb-2 px-4 ${activeTab === 'galeri' ? 'border-b-4 border-blue-800 font-bold' : ''}`}>Galeri</button>
            <button onClick={tanganiLogout} className="ml-auto text-red-600 font-bold">Logout</button>
          </div>

          {/* === KONTEN CRUD BERITA === */}
          {activeTab === 'berita' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-50 p-6 rounded border">
                <h3 className="font-bold mb-4 text-lg">{idEdit ? 'Edit Berita' : 'Tambah Berita'}</h3>
                <form onSubmit={simpanBerita} className="space-y-3">
                  <input type="text" placeholder="Judul" value={judulBaru} onChange={(e)=>setJudulBaru(e.target.value)} className="w-full p-2 border" required />
                  <input type="text" placeholder="Paste Link Foto ImgBB di sini" value={urlFotoManual} onChange={(e)=>setUrlFotoManual(e.target.value)} className="w-full p-2 border bg-yellow-50" />
                  <input type="text" placeholder="Keterangan Singkat" value={keteranganBaru} onChange={(e)=>setKeteranganBaru(e.target.value)} className="w-full p-2 border" />
                  <textarea placeholder="Isi Berita Lengkap" value={isiBaru} onChange={(e)=>setIsiBaru(e.target.value)} className="w-full p-2 border h-32"></textarea>
                  <button className="bg-blue-800 text-white px-4 py-2 rounded w-full">Simpan Berita</button>
                </form>
              </div>
              <div className="space-y-2">
                <h3 className="font-bold mb-4">Daftar Berita (Read/Update/Delete)</h3>
                {berita.map(b => (
                  <div key={b.id} className="p-3 bg-white border flex justify-between items-center rounded">
                    <span>{b.judul}</span>
                    <div className="flex gap-2">
                      <button onClick={()=>mulaiEdit(b)} className="text-amber-600 text-sm font-bold">Edit</button>
                      <button onClick={()=>hapusBerita(b.id)} className="text-red-600 text-sm font-bold">Hapus</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* === KONTEN CRUD PENGURUS === */}
          {activeTab === 'pengurus' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-50 p-6 rounded border">
                <h3 className="font-bold mb-4 text-lg">Input Data Pengurus</h3>
                <form onSubmit={simpanPengurus} className="space-y-3">
                  <input type="text" placeholder="Nama Lengkap" value={namaP} onChange={(e)=>setNamaP(e.target.value)} className="w-full p-2 border" required />
                  <input type="text" placeholder="Jabatan" value={jabatanP} onChange={(e)=>setJabatanP(e.target.value)} className="w-full p-2 border" required />
                  <input type="text" placeholder="Link Foto Manual" value={linkFotoP} onChange={(e)=>setLinkFotoP(e.target.value)} className="w-full p-2 border bg-yellow-50" />
                  <input type="text" placeholder="Keterangan" value={ketP} onChange={(e)=>setKetP(e.target.value)} className="w-full p-2 border" />
                  <button className="bg-green-700 text-white px-4 py-2 rounded w-full">Simpan Pengurus</button>
                </form>
              </div>
              <div className="space-y-2">
                <h3 className="font-bold mb-4">Daftar Pengurus</h3>
                {pengurus.map(p => (
                  <div key={p.id} className="p-3 bg-white border flex justify-between items-center rounded">
                    <div>
                      <p className="font-bold">{p.nama}</p>
                      <p className="text-xs text-gray-500">{p.jabatan}</p>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={()=>{setIdEditP(p.id); setNamaP(p.nama); setJabatanP(p.jabatan); setLinkFotoP(p.foto); setKetP(p.keterangan)}} className="text-amber-600 text-sm font-bold">Edit</button>
                      <button onClick={()=>hapusPengurus(p.id)} className="text-red-600 text-sm font-bold">Hapus</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* === KONTEN CRUD GALERI === */}
          {activeTab === 'galeri' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-50 p-6 rounded border">
                <h3 className="font-bold mb-4 text-lg">Tambah Foto Galeri</h3>
                <form onSubmit={simpanGaleri} className="space-y-3">
                  <input type="text" placeholder="Judul Kegiatan" value={judulG} onChange={(e)=>setJudulG(e.target.value)} className="w-full p-2 border" required />
                  <input type="text" placeholder="Link Foto ImgBB" value={linkFotoG} onChange={(e)=>setLinkFotoG(e.target.value)} className="w-full p-2 border bg-yellow-50" required />
                  <input type="text" placeholder="Keterangan" value={ketG} onChange={(e)=>setKetG(e.target.value)} className="w-full p-2 border" />
                  <button className="bg-purple-700 text-white px-4 py-2 rounded w-full">Tambah ke Galeri</button>
                </form>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {galeri.map(g => (
                  <div key={g.id} className="p-2 border bg-white rounded relative">
                    <img src={g.urlFoto} alt={g.judul} className="h-20 w-full object-cover rounded" />
                    <button onClick={()=>hapusGaleri(g.id)} className="absolute top-1 right-1 bg-red-600 text-white text-[10px] px-1 rounded">X</button>
                    <p className="text-[10px] mt-1 truncate">{g.judul}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}

export default Admin;