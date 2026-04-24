import { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

// === API KEY IMGBB ANDA ===
const IMGBB_API_KEY = 'cb9b2aec11b80af3765d32f4d6f572da';

function Admin(props) {
  // === PROPS DARI APP.JSX (UNTUK BERITA & LOGIN) ===
  const {
    user, email, setEmail, password, setPassword, errorLogin, tanganiLogin,tanganiLogout,
    berita, judulBaru, setJudulBaru, kategoriBaru, setKategoriBaru,
    fileGambar, setFileGambar, urlGambarLama, isiBaru, setIsiBaru,
    idEdit, batalEdit, mulaiEdit, hapusBerita
    // simpanAtauUpdateBerita & prosesSimpan tidak kita pakai lagi karena kita buat khusus di bawah
  } = props;

  // === STATE UNTUK MENU TABS ===
  const [activeTab, setActiveTab] = useState('berita'); 

  // === STATE LOKAL UNTUK LOADING BERITA ===
  const [prosesSimpanBeritaLokal, setProsesSimpanBeritaLokal] = useState(false);

  // === STATE KHUSUS PENGURUS ===
  const [pengurus, setPengurus] = useState([]);
  const [nama, setNama] = useState('');
  const [jabatan, setJabatan] = useState('');
  const [fotoPengurus, setFotoPengurus] = useState(null);
  const [urlFotoLama, setUrlFotoLama] = useState('');
  const [idEditPengurus, setIdEditPengurus] = useState(null);
  const [prosesSimpanPengurus, setProsesSimpanPengurus] = useState(false);

  // === STATE KHUSUS BUKU TAMU ===
  const [dataBukuTamu, setDataBukuTamu] = useState([]);

  // === STATE KHUSUS GALERI ===
  const [dataGaleri, setDataGaleri] = useState([]);
  const [judulGaleri, setJudulGaleri] = useState('');
  const [fotoGaleri, setFotoGaleri] = useState(null);
  const [prosesSimpanGaleri, setProsesSimpanGaleri] = useState(false);

  // === STATE KHUSUS DOWNLOAD ===
  const [dataDownload, setDataDownload] = useState([]);
  const [namaFile, setNamaFile] = useState('');
  const [linkFile, setLinkFile] = useState('');

  // === FUNGSI PENGAMBILAN DATA (READ) ===
  const ambilDataPengurus = async () => {
    try {
      const snap = await getDocs(collection(db, "pengurus"));
      setPengurus(snap.docs.map(d => ({id: d.id, ...d.data()})));
    } catch (error) { console.error(error); }
  };

  const ambilDataBukuTamu = async () => {
    try {
      const snap = await getDocs(collection(db, "bukutamu"));
      setDataBukuTamu(snap.docs.map(d => ({id: d.id, ...d.data()})).reverse());
    } catch (error) { console.error(error); }
  };

  const ambilDataGaleri = async () => {
    try {
      const snap = await getDocs(collection(db, "galeri"));
      setDataGaleri(snap.docs.map(d => ({id: d.id, ...d.data()})).reverse());
    } catch (error) { console.error(error); }
  };
  
  const ambilDataDownload = async () => {
    try {
      const snap = await getDocs(collection(db, "download"));
      setDataDownload(snap.docs.map(d => ({id: d.id, ...d.data()})).reverse());
    } catch (error) { console.error(error); }
  };

  // Muat semua data hanya ketika admin berhasil login
  useEffect(() => {
    if (user) {
      ambilDataPengurus();
      ambilDataBukuTamu();
      ambilDataGaleri(); 
      ambilDataDownload();
    }
  }, [user]);

  // === FUNGSI UPLOAD FOTO KE IMGBB ===
  const uploadFotoImgBB = async (file) => {
    const formData = new FormData();
    formData.append('image', file);
    try {
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, { method: 'POST', body: formData });
      const data = await res.json();
      return data.data.url; // Ini akan menghasilkan URL online foto Anda
    } catch (err) {
      alert("Gagal mengunggah foto. Pastikan koneksi internet stabil.");
      return null;
    }
  };

  // === FUNGSI BARU: SIMPAN BERITA DENGAN IMGBB ===
  const simpanBeritaDenganImgBB = async (e) => {
    e.preventDefault();
    if (!judulBaru || !isiBaru) return alert("Judul dan Isi wajib diisi!");
    setProsesSimpanBeritaLokal(true);

    try {
      let urlFinal = urlGambarLama || '';

      // 1. Upload ke ImgBB dulu (jika ada file yang dipilih)
      if (fileGambar) {
        const urlBaru = await uploadFotoImgBB(fileGambar);
        if (urlBaru) {
            urlFinal = urlBaru;
        } else {
            setProsesSimpanBeritaLokal(false); 
            return; 
        }
      }

      // 2. Simpan URL foto tersebut ke Firebase
      if (idEdit) {
        await updateDoc(doc(db, "berita", idEdit), {
          judul: judulBaru,
          kategori: kategoriBaru,
          isi: isiBaru,
          gambar: urlFinal,
          tanggal: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
        });
        alert("Berita diperbarui!");
      } else {
        await addDoc(collection(db, "berita"), {
          judul: judulBaru,
          kategori: kategoriBaru,
          isi: isiBaru,
          gambar: urlFinal,
          tanggal: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
        });
        alert("Berita baru ditambahkan!");
      }

      // 3. Reset form
      batalEdit(); 
      // 4. Reload paksa agar data terbaru muncul di tampilan Dashboard (App.jsx)
      window.location.reload();

    } catch (error) { 
        alert("Gagal menyimpan berita!"); 
    }
    setProsesSimpanBeritaLokal(false);
  };

  // === CRUD PENGURUS ===
  const simpanAtauUpdatePengurus = async (e) => {
    e.preventDefault();
    if (!nama || !jabatan) return alert("Nama dan Jabatan wajib diisi!");
    setProsesSimpanPengurus(true);
    try {
      let urlFinal = urlFotoLama;
      if (fotoPengurus) {
        const urlBaru = await uploadFotoImgBB(fotoPengurus);
        if (urlBaru) urlFinal = urlBaru;
        else { setProsesSimpanPengurus(false); return; }
      }
      if (idEditPengurus) {
        await updateDoc(doc(db, "pengurus", idEditPengurus), { nama, jabatan, foto: urlFinal });
        alert("Data pengurus diperbarui!");
      } else {
        await addDoc(collection(db, "pengurus"), { nama, jabatan, foto: urlFinal });
        alert("Pengurus baru ditambahkan!");
      }
      batalEditPengurus(); 
      ambilDataPengurus();
    } catch (error) { alert("Gagal menyimpan data!"); }
    setProsesSimpanPengurus(false);
  };

  const mulaiEditPengurus = (item) => {
    setIdEditPengurus(item.id); setNama(item.nama); setJabatan(item.jabatan);
    setUrlFotoLama(item.foto || ''); setFotoPengurus(null);
  };

  const batalEditPengurus = () => {
    setIdEditPengurus(null); setNama(''); setJabatan(''); setUrlFotoLama(''); setFotoPengurus(null);
  };

  const hapusPengurus = async (id) => {
    if (window.confirm("Hapus pengurus ini?")) {
      await deleteDoc(doc(db, "pengurus", id));
      ambilDataPengurus();
    }
  };

  // === HAPUS BUKU TAMU ===
  const hapusPesanTamu = async (id) => {
    if (window.confirm("Yakin ingin menghapus pesan ini dari buku tamu?")) {
      await deleteDoc(doc(db, "bukutamu", id));
      alert("Pesan berhasil dihapus!");
      ambilDataBukuTamu();
    }
  };

  // === CRUD GALERI ===
  const simpanGaleri = async (e) => {
    e.preventDefault();
    if (!judulGaleri || !fotoGaleri) return alert("Judul dan Foto wajib diisi!");
    setProsesSimpanGaleri(true);
    try {
      const urlBaru = await uploadFotoImgBB(fotoGaleri);
      if (urlBaru) {
        await addDoc(collection(db, "galeri"), { judul: judulGaleri, urlFoto: urlBaru });
        alert("Foto berhasil diunggah ke Galeri!");
        setJudulGaleri(''); setFotoGaleri(null);
        ambilDataGaleri();
      }
    } catch (error) { alert("Gagal mengunggah foto."); }
    setProsesSimpanGaleri(false);
  };

  const hapusGaleri = async (id) => {
    if (window.confirm("Hapus foto ini dari galeri?")) {
      await deleteDoc(doc(db, "galeri", id));
      ambilDataGaleri();
    }
  }; 

  // === CRUD DOWNLOAD ===
  const simpanDownload = async (e) => {
    e.preventDefault();
    if (!namaFile || !linkFile) return alert("Semua kolom wajib diisi!");
    try {
      await addDoc(collection(db, "download"), { 
        namaFile, 
        linkFile,
        tanggal: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
      });
      alert("Link Download berhasil ditambahkan!");
      setNamaFile(''); setLinkFile('');
      ambilDataDownload();
    } catch (error) { alert("Gagal menyimpan data."); }
  };

  const hapusDownload = async (id) => {
    if (window.confirm("Hapus dokumen ini?")) {
      await deleteDoc(doc(db, "download", id));
      ambilDataDownload();
    }
  };

  // === TAMPILAN ANTARMUKA ADMIN ===
  return (
    <section className="py-12 max-w-6xl mx-auto px-4 min-h-screen">
      {!user ? (
        // FORM LOGIN (TEMA BIRU)
        <div className="bg-white p-8 rounded-xl shadow-2xl border-t-8 border-blue-800 max-w-md mx-auto mt-10">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-extrabold text-blue-900 tracking-tight">Admin Portal</h3>
            <p className="text-blue-600 font-medium mt-2">Silakan login untuk mengelola sistem</p>
          </div>
          {errorLogin && <p className="text-red-500 text-sm mb-4 text-center bg-red-50 p-3 rounded font-semibold border border-red-200">{errorLogin}</p>}
          <form onSubmit={tanganiLogin} className="space-y-6">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Email Akses</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-600 outline-none bg-gray-50 transition" placeholder="admin@sekolah.com" required />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Kata Sandi</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-600 outline-none bg-gray-50 transition" placeholder="••••••••" required />
            </div>
            <button type="submit" className="w-full bg-blue-800 text-white font-bold py-3.5 rounded hover:bg-blue-900 transition duration-300 shadow-lg">Masuk ke Dasbor</button>
          </form>
        </div>
      ) : (
        // DASBOR UTAMA ADMIN
        <div>
          {/* TABS NAVIGASI MENU (TEMA BIRU MODERN) */}
          <div className="flex flex-wrap gap-3 mb-10 border-b-2 border-gray-200 pb-4">
            <button onClick={() => setActiveTab('berita')} className={`px-6 py-2.5 font-bold rounded-md transition duration-300 ${activeTab === 'berita' ? 'bg-blue-800 text-white shadow-md' : 'bg-white text-gray-600 border border-gray-300 hover:bg-blue-50 hover:text-blue-800'}`}>📰 Kelola Berita</button>
            <button onClick={() => setActiveTab('pengurus')} className={`px-6 py-2.5 font-bold rounded-md transition duration-300 ${activeTab === 'pengurus' ? 'bg-blue-800 text-white shadow-md' : 'bg-white text-gray-600 border border-gray-300 hover:bg-blue-50 hover:text-blue-800'}`}>👥 Kelola Biodata</button>
            <button onClick={() => setActiveTab('bukutamu')} className={`px-6 py-2.5 font-bold rounded-md transition duration-300 ${activeTab === 'bukutamu' ? 'bg-blue-800 text-white shadow-md' : 'bg-white text-gray-600 border border-gray-300 hover:bg-blue-50 hover:text-blue-800'}`}>📖 Buku Tamu</button>
            <button onClick={() => setActiveTab('galeri')} className={`px-6 py-2.5 font-bold rounded-md transition duration-300 ${activeTab === 'galeri' ? 'bg-blue-800 text-white shadow-md' : 'bg-white text-gray-600 border border-gray-300 hover:bg-blue-50 hover:text-blue-800'}`}>📸 Galeri Foto</button>
            <button 
              onClick={tanganiLogout} 
              className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-md shadow-md transition flex items-center gap-2"
            >
              🚪 Keluar
            </button>
          </div>

          {/* ======================= TAB 1: KELOLA BERITA ======================= */}
          {activeTab === 'berita' && (
            <div className="space-y-8">
              <div className={`bg-white p-8 rounded-xl shadow-md border-t-8 ${idEdit ? 'border-amber-500' : 'border-blue-700'}`}>
                <h3 className={`text-2xl font-extrabold mb-6 pb-4 border-b border-gray-100 ${idEdit ? 'text-amber-600' : 'text-blue-800'}`}>
                  {idEdit ? '✏️ Edit Berita/Pengumuman' : '📝 Tulis Berita Baru'}
                </h3>
                {/* PERHATIAN: Di bawah ini kita menggunakan simpanBeritaDenganImgBB */}
                <form onSubmit={simpanBeritaDenganImgBB} className="space-y-6">
                  <div>
                    <label className="block text-gray-700 font-bold mb-2">Judul</label>
                    <input type="text" value={judulBaru} onChange={(e) => setJudulBaru(e.target.value)} className="w-full px-4 py-3 border rounded bg-gray-50 focus:ring-2 focus:ring-blue-600 outline-none" required />
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 font-bold mb-2">Kategori</label>
                      <select value={kategoriBaru} onChange={(e) => setKategoriBaru(e.target.value)} className="w-full px-4 py-3 border rounded bg-gray-50 focus:ring-2 focus:ring-blue-600 outline-none">
                        <option value="Pengumuman">Pengumuman</option>
                        <option value="Prestasi">Prestasi</option>
                        <option value="Akademik">Akademik</option>
                        <option value="Kegiatan">Kegiatan</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-gray-700 font-bold mb-2">Gambar Cover</label>
                      <input type="file" accept="image/*" onChange={(e) => setFileGambar(e.target.files[0])} className="w-full px-4 py-2 border rounded bg-gray-50" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-700 font-bold mb-2">Isi Konten</label>
                    <textarea value={isiBaru} onChange={(e) => setIsiBaru(e.target.value)} rows="5" className="w-full px-4 py-3 border rounded bg-gray-50 focus:ring-2 focus:ring-blue-600 outline-none" required></textarea>
                  </div>
                  <div className="flex gap-4">
                    <button type="submit" disabled={prosesSimpanBeritaLokal} className="flex-1 bg-blue-700 hover:bg-blue-800 transition text-white font-bold py-3 rounded disabled:opacity-50 shadow-md">
                      {prosesSimpanBeritaLokal ? 'Memproses dan Mengunggah Foto...' : 'Simpan Berita'}
                    </button>
                    {idEdit && <button type="button" onClick={batalEdit} className="w-1/3 bg-gray-400 hover:bg-gray-500 transition text-white font-bold py-3 rounded">Batal</button>}
                  </div>
                </form>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200">
                <h3 className="text-xl font-extrabold text-gray-800 mb-6 flex items-center gap-2">📂 Daftar Publikasi</h3>
                <div className="space-y-4">
                  {berita.map((item) => (
                    <div key={item.id} className="border border-gray-200 p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 rounded-lg bg-gray-50 hover:bg-blue-50 transition">
                      <div className="flex-1">
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded font-bold">{item.kategori}</span>
                        <h4 className="font-bold text-gray-800 mt-2 text-lg">{item.judul}</h4>
                        <p className="text-sm text-gray-500 mt-1">{item.tanggal}</p>
                      </div>
                      <div className="flex gap-2 w-full md:w-auto">
                        <button onClick={() => mulaiEdit(item)} className="flex-1 md:flex-none px-6 py-2 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded transition">Edit</button>
                        <button onClick={() => hapusBerita(item.id)} className="flex-1 md:flex-none px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-bold rounded transition">Hapus</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ======================= TAB 2: KELOLA PENGURUS ======================= */}
          {activeTab === 'pengurus' && (
            <div className="space-y-8">
              <div className={`bg-white p-8 rounded-xl shadow-md border-t-8 ${idEditPengurus ? 'border-amber-500' : 'border-blue-700'}`}>
                <h3 className={`text-2xl font-extrabold mb-6 pb-4 border-b border-gray-100 ${idEditPengurus ? 'text-amber-600' : 'text-blue-800'}`}>
                  {idEditPengurus ? '✏️ Edit Biodata' : '👤 Tambah Pengurus Baru'}
                </h3>
                <form onSubmit={simpanAtauUpdatePengurus} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 font-bold mb-2">Nama Lengkap</label>
                      <input type="text" value={nama} onChange={(e) => setNama(e.target.value)} className="w-full px-4 py-3 border rounded bg-gray-50 focus:ring-2 focus:ring-blue-600 outline-none" required />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-bold mb-2">Jabatan</label>
                      <input type="text" value={jabatan} onChange={(e) => setJabatan(e.target.value)} className="w-full px-4 py-3 border rounded bg-gray-50 focus:ring-2 focus:ring-blue-600 outline-none" required />
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-700 font-bold mb-2">Foto (Opsional)</label>
                    <input type="file" accept="image/*" onChange={(e) => setFotoPengurus(e.target.files[0])} className="w-full px-4 py-2 border rounded bg-gray-50" />
                  </div>
                  <div className="flex gap-4">
                    <button type="submit" disabled={prosesSimpanPengurus} className="flex-1 bg-blue-700 hover:bg-blue-800 transition text-white font-bold py-3 rounded disabled:opacity-50 shadow-md">
                      {prosesSimpanPengurus ? 'Menyimpan...' : 'Simpan Biodata'}
                    </button>
                    {idEditPengurus && <button type="button" onClick={batalEditPengurus} className="w-1/3 bg-gray-400 hover:bg-gray-500 transition text-white font-bold py-3 rounded">Batal</button>}
                  </div>
                </form>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200">
                <h3 className="text-xl font-extrabold text-gray-800 mb-6">📂 Database Pengurus</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {pengurus.map((item) => (
                    <div key={item.id} className="border border-gray-200 p-4 flex gap-4 items-center rounded-lg bg-gray-50 hover:shadow-md transition">
                      {item.foto ? (
                        <img src={item.foto} className="w-16 h-16 rounded-full object-cover border-2 border-blue-200" alt="foto" />
                      ) : (
                        <div className="w-16 h-16 bg-blue-100 text-blue-500 rounded-full flex items-center justify-center text-2xl">👤</div>
                      )}
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-800">{item.nama}</h4>
                        <p className="text-sm text-blue-600 font-semibold">{item.jabatan}</p>
                        <div className="flex gap-2 mt-2">
                          <button onClick={() => mulaiEditPengurus(item)} className="text-xs px-3 py-1 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded">Edit</button>
                          <button onClick={() => hapusPengurus(item.id)} className="text-xs px-3 py-1 bg-red-500 hover:bg-red-600 text-white font-bold rounded">Hapus</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ======================= TAB 3: BUKU TAMU ======================= */}
          {activeTab === 'bukutamu' && (
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200">
              <h3 className="text-2xl font-extrabold text-blue-900 mb-6 border-b border-gray-100 pb-4">📖 Moderasi Pesan Pengunjung</h3>
              <div className="space-y-4">
                {dataBukuTamu.map((item) => (
                  <div key={item.id} className="border border-gray-200 p-5 rounded-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gray-50 hover:bg-blue-50 transition">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <h4 className="font-bold text-gray-800">{item.nama}</h4>
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded font-bold">{item.asal}</span>
                        <span className="text-xs text-gray-500">{item.tanggal}</span>
                      </div>
                      <p className="text-gray-700 text-sm italic">"{item.pesan}"</p>
                    </div>
                    <button onClick={() => hapusPesanTamu(item.id)} className="w-full md:w-auto px-5 py-2 bg-white text-red-600 border border-red-500 hover:bg-red-500 hover:text-white font-bold rounded transition">Hapus Pesan</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ======================= TAB 4: GALERI FOTO ======================= */}
          {activeTab === 'galeri' && (
            <div className="space-y-8">
              <div className="bg-white p-8 rounded-xl shadow-md border-t-8 border-blue-700">
                <h3 className="text-2xl font-extrabold text-blue-800 mb-6 border-b border-gray-100 pb-4">📸 Upload Momen Baru</h3>
                <form onSubmit={simpanGaleri} className="space-y-6">
                  <div>
                     <label className="block text-gray-700 font-bold mb-2">Judul Kegiatan / Keterangan</label>
                     <input type="text" value={judulGaleri} onChange={(e) => setJudulGaleri(e.target.value)} className="w-full px-4 py-3 border rounded bg-gray-50 focus:ring-2 focus:ring-blue-600 outline-none" required />
                  </div>
                  <div>
                     <label className="block text-gray-700 font-bold mb-2">Pilih Foto</label>
                     <input type="file" accept="image/*" onChange={(e) => setFotoGaleri(e.target.files[0])} className="w-full px-4 py-2 border rounded bg-gray-50" required />
                  </div>
                  <button type="submit" disabled={prosesSimpanGaleri} className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-3.5 rounded transition shadow-md disabled:opacity-50">
                    {prosesSimpanGaleri ? 'Mengunggah Foto...' : 'Upload ke Galeri'}
                  </button>
                </form>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200">
                <h3 className="text-xl font-extrabold text-gray-800 mb-6">📂 Database Foto Galeri</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {dataGaleri.map((item) => (
                    <div key={item.id} className="border border-gray-200 p-3 rounded-lg bg-white shadow-sm hover:shadow-md transition flex flex-col group relative overflow-hidden">
                      <img src={item.urlFoto} alt={item.judul} className="h-40 w-full object-cover rounded mb-3" />
                      <p className="text-sm font-bold text-gray-800 text-center truncate px-2 mb-10">{item.judul}</p>
                      <button onClick={() => hapusGaleri(item.id)} className="absolute bottom-0 left-0 right-0 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-bold opacity-0 group-hover:opacity-100 transition duration-300">Hapus Foto</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>
      )}
    </section>
  );
}

export default Admin;