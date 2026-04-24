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
  const [linkBerita, setLinkBerita] = useState(''); // State khusus link berita

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


  // ==================== FUNGSI CRUD (MENGGUNAKAN LINK) ====================

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
      await addDoc(collection(db, "galeri"), { judul: judulG, keterangan: ketG, urlFoto: linkG });
      alert("Foto berhasil ditambahkan ke Galeri!");
      setJudulG(''); setKetG(''); setLinkG('');
      ambilSemuaData();
    } catch (error) { alert("Gagal menyimpan foto."); }
    setProsesLoading(false);
  };
  const hapusGaleri = async (id) => { if (window.confirm("Hapus foto?")) { await deleteDoc(doc(db, "galeri", id)); ambilSemuaData(); } };

  // 6. BUKU TAMU
  const hapusBukuTamu = async (id) => { if (window.confirm("Hapus pesan?")) { await deleteDoc(doc(db, "bukutamu", id)); ambilSemuaData(); } };


  // ==================== TAMPILAN ANTARMUKA ====================
  return (
    <section className="py-12 max-w-6xl mx-auto px-4 min-h-screen">
      {!user ? (
        // FORM LOGIN
        <div className="bg-white p-8 rounded-xl shadow-2xl border-t-8 border-blue-800 max-w-md mx-auto mt-10">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-extrabold text-blue-900 tracking-tight">Admin Portal</h3>
            <p className="text-blue-600 font-medium mt-2">Silakan login untuk mengelola sistem</p>
          </div>
          {errorLogin && <p className="text-red-500 text-sm mb-4 text-center bg-red-50 p-3 rounded font-semibold border border-red-200">{errorLogin}</p>}
          <form onSubmit={tanganiLogin} className="space-y-6">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Email Akses</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-600 outline-none bg-gray-50 transition" required />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Kata Sandi</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-600 outline-none bg-gray-50 transition" required />
            </div>
            <button type="submit" className="w-full bg-blue-800 text-white font-bold py-3.5 rounded hover:bg-blue-900 transition duration-300 shadow-lg">Masuk ke Dasbor</button>
          </form>
        </div>
      ) : (
        // DASBOR UTAMA ADMIN
        <div>
          {/* TABS MENU */}
          <div className="flex flex-wrap gap-2 mb-10 border-b-2 border-gray-200 pb-4">
            <button onClick={() => setActiveTab('pengurus')} className={`px-4 py-2 font-bold rounded-md transition duration-300 ${activeTab === 'pengurus' ? 'bg-blue-800 text-white shadow-md' : 'bg-white text-gray-600 border border-gray-300 hover:bg-blue-50'}`}>👥 Pengurus</button>
            <button onClick={() => setActiveTab('download')} className={`px-4 py-2 font-bold rounded-md transition duration-300 ${activeTab === 'download' ? 'bg-blue-800 text-white shadow-md' : 'bg-white text-gray-600 border border-gray-300 hover:bg-blue-50'}`}>📁 Download</button>
            <button onClick={() => setActiveTab('berita')} className={`px-4 py-2 font-bold rounded-md transition duration-300 ${activeTab === 'berita' ? 'bg-blue-800 text-white shadow-md' : 'bg-white text-gray-600 border border-gray-300 hover:bg-blue-50'}`}>📰 Berita</button>
            <button onClick={() => setActiveTab('polling')} className={`px-4 py-2 font-bold rounded-md transition duration-300 ${activeTab === 'polling' ? 'bg-blue-800 text-white shadow-md' : 'bg-white text-gray-600 border border-gray-300 hover:bg-blue-50'}`}>📊 Polling</button>
            <button onClick={() => setActiveTab('galeri')} className={`px-4 py-2 font-bold rounded-md transition duration-300 ${activeTab === 'galeri' ? 'bg-blue-800 text-white shadow-md' : 'bg-white text-gray-600 border border-gray-300 hover:bg-blue-50'}`}>📸 Galeri</button>
            <button onClick={() => setActiveTab('bukutamu')} className={`px-4 py-2 font-bold rounded-md transition duration-300 ${activeTab === 'bukutamu' ? 'bg-blue-800 text-white shadow-md' : 'bg-white text-gray-600 border border-gray-300 hover:bg-blue-50'}`}>📖 Buku Tamu</button>
            <button onClick={tanganiLogout} className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-md shadow-md ml-auto">🚪 Keluar</button>
          </div>

          {/* === TAB 1: PENGURUS === */}
          {activeTab === 'pengurus' && (
            <div className="space-y-8">
              <div className="bg-white p-8 rounded-xl shadow-md border-t-8 border-blue-700">
                <h3 className="text-2xl font-extrabold text-blue-800 mb-6">👤 {idEditP ? 'Edit' : 'Tambah'} Biodata Pengurus</h3>
                <form onSubmit={simpanPengurus} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <input type="text" placeholder="Nama Lengkap" value={namaP} onChange={(e)=>setNamaP(e.target.value)} className="w-full px-4 py-3 border rounded bg-gray-50 outline-none" required />
                    <input type="text" placeholder="Jabatan" value={jabatanP} onChange={(e)=>setJabatanP(e.target.value)} className="w-full px-4 py-3 border rounded bg-gray-50 outline-none" required />
                  </div>
                  <input type="text" placeholder="Keterangan (Opsional)" value={ketP} onChange={(e)=>setKetP(e.target.value)} className="w-full px-4 py-3 border rounded bg-gray-50 outline-none" />
                  <div>
                    <label className="block font-bold text-gray-700 mb-2">Tautan (Link) Foto Pengurus</label>
                    <input type="text" placeholder="Paste link foto berakhiran .jpg/.png di sini..." value={linkP} onChange={(e)=>setLinkP(e.target.value)} className="w-full px-4 py-3 border rounded bg-blue-50 text-blue-800 outline-none border-blue-200" required />
                  </div>
                  <div className="flex gap-4">
                    <button type="submit" disabled={prosesLoading} className="flex-1 bg-blue-700 text-white font-bold py-3 rounded">{prosesLoading ? 'Menyimpan...' : 'Simpan Data'}</button>
                    {idEditP && <button type="button" onClick={batalEditPengurus} className="bg-gray-400 text-white px-6 rounded">Batal</button>}
                  </div>
                </form>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-md">
                <h3 className="text-xl font-bold mb-4">Database Pengurus</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {pengurus.map(item => (
                    <div key={item.id} className="border p-4 rounded-lg flex gap-4 items-center bg-gray-50">
                      {item.foto ? <img src={item.foto} className="w-16 h-16 rounded-full object-cover" alt="foto" /> : <div className="w-16 h-16 bg-blue-100 rounded-full"></div>}
                      <div className="flex-1">
                        <h4 className="font-bold">{item.nama}</h4>
                        <p className="text-sm text-blue-600">{item.jabatan}</p>
                        <p className="text-xs text-gray-500">{item.keterangan}</p>
                        <div className="flex gap-2 mt-2">
                          <button onClick={()=>{setIdEditP(item.id); setNamaP(item.nama); setJabatanP(item.jabatan); setKetP(item.keterangan || ''); setLinkP(item.foto || '')}} className="text-xs px-3 py-1 bg-amber-500 text-white rounded">Edit</button>
                          <button onClick={()=>hapusPengurus(item.id)} className="text-xs px-3 py-1 bg-red-500 text-white rounded">Hapus</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* === TAB 2: DOWNLOAD === */}
          {activeTab === 'download' && (
            <div className="space-y-8">
              <div className="bg-white p-8 rounded-xl shadow-md border-t-8 border-blue-700">
                <h3 className="text-2xl font-extrabold text-blue-800 mb-6">📁 Tambah File Download</h3>
                <form onSubmit={simpanDownload} className="space-y-4">
                  <input type="text" placeholder="Nama Dokumen" value={namaFileD} onChange={(e)=>setNamaFileD(e.target.value)} className="w-full px-4 py-3 border rounded bg-gray-50" required />
                  <input type="text" placeholder="Link Google Drive / Tautan File" value={linkD} onChange={(e)=>setLinkD(e.target.value)} className="w-full px-4 py-3 border rounded bg-blue-50 border-blue-200" required />
                  <input type="text" placeholder="Keterangan" value={ketD} onChange={(e)=>setKetD(e.target.value)} className="w-full px-4 py-3 border rounded bg-gray-50" />
                  <button type="submit" className="w-full bg-blue-700 text-white font-bold py-3 rounded">Simpan Dokumen</button>
                </form>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-md">
                {dataDownload.map(item => (
                  <div key={item.id} className="border p-4 rounded mb-2 flex justify-between items-center">
                    <div>
                      <p className="font-bold">{item.judul}</p>
                      <a href={item.link} className="text-sm text-blue-500 underline" target="_blank" rel="noreferrer">Lihat Link</a>
                    </div>
                    <button onClick={()=>hapusDownload(item.id)} className="px-4 py-2 bg-red-500 text-white rounded font-bold text-sm">Hapus</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* === TAB 3: BERITA === */}
          {activeTab === 'berita' && (
            <div className="space-y-8">
              <div className="bg-white p-8 rounded-xl shadow-md border-t-8 border-blue-700">
                <h3 className="text-2xl font-extrabold text-blue-800 mb-6">📝 Tulis Berita / Artikel</h3>
                <form onSubmit={simpanBerita} className="space-y-4">
                  <input type="text" placeholder="Judul Berita" value={judulBaru} onChange={(e)=>setJudulBaru(e.target.value)} className="w-full px-4 py-3 border rounded bg-gray-50" required />
                  <div className="grid md:grid-cols-2 gap-4">
                    <select value={kategoriBaru} onChange={(e)=>setKategoriBaru(e.target.value)} className="w-full px-4 py-3 border rounded bg-gray-50">
                      <option value="Pengumuman">Pengumuman</option>
                      <option value="Prestasi">Prestasi</option>
                      <option value="Kegiatan">Kegiatan</option>
                    </select>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 mb-1">Link Gambar Cover (Berakhiran .jpg/.png)</label>
                      <input type="text" placeholder="https://i.ibb.co/..." value={linkBerita} onChange={(e)=>setLinkBerita(e.target.value)} className="w-full px-4 py-3 border rounded bg-blue-50 border-blue-200 outline-none" required />
                    </div>
                  </div>
                  <input type="text" placeholder="Keterangan / Ringkasan Pendek" value={keteranganBaru} onChange={(e)=>setKeteranganBaru(e.target.value)} className="w-full px-4 py-3 border rounded bg-gray-50" />
                  <textarea placeholder="Isi Konten Berita" value={isiBaru} onChange={(e)=>setIsiBaru(e.target.value)} className="w-full px-4 py-3 border rounded h-32 bg-gray-50" required></textarea>
                  <div className="flex gap-4">
                    <button type="submit" disabled={prosesLoading} className="flex-1 bg-blue-700 text-white font-bold py-3 rounded">{prosesLoading ? 'Menyimpan...' : 'Simpan Berita'}</button>
                    {idEdit && <button type="button" onClick={batalEdit} className="bg-gray-400 text-white px-6 rounded">Batal</button>}
                  </div>
                </form>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-md">
                {berita.map(item => (
                  <div key={item.id} className="border-b p-4 flex justify-between items-center">
                    <div>
                      <h4 className="font-bold">{item.judul}</h4>
                      <p className="text-sm text-gray-500">{item.tanggal} - {item.kategori}</p>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={()=>mulaiEdit(item)} className="px-4 py-2 bg-amber-500 text-white rounded text-sm font-bold">Edit</button>
                      <button onClick={()=>hapusBerita(item.id)} className="px-4 py-2 bg-red-500 text-white rounded text-sm font-bold">Hapus</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* === TAB 4: POLLING === */}
          {activeTab === 'polling' && (
            <div className="space-y-8">
              <div className="bg-white p-8 rounded-xl shadow-md border-t-8 border-blue-700">
                <h3 className="text-2xl font-extrabold text-blue-800 mb-6">📊 Buat Polling</h3>
                <form onSubmit={simpanPolling} className="space-y-4">
                  <input type="text" placeholder="Pertanyaan Polling (Contoh: Apa kegiatan favoritmu?)" value={pertanyaanPol} onChange={(e)=>setPertanyaanPol(e.target.value)} className="w-full px-4 py-3 border rounded bg-gray-50" required />
                  <input type="text" placeholder="Pilihan Jawaban (Pisahkan dengan Koma. Contoh: Olahraga,Seni,Pramuka)" value={opsiPol} onChange={(e)=>setOpsiPol(e.target.value)} className="w-full px-4 py-3 border rounded bg-gray-50" required />
                  <button type="submit" className="w-full bg-blue-700 text-white font-bold py-3 rounded">Simpan Polling</button>
                </form>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-md">
                {dataPolling.map(item => (
                  <div key={item.id} className="border p-4 rounded mb-2 flex justify-between items-center">
                    <div><p className="font-bold">{item.pertanyaan}</p><p className="text-sm text-gray-500">Opsi: {item.opsi}</p></div>
                    <button onClick={()=>hapusPolling(item.id)} className="px-4 py-2 bg-red-500 text-white rounded font-bold text-sm">Hapus</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* === TAB 5: GALERI === */}
          {activeTab === 'galeri' && (
            <div className="space-y-8">
              <div className="bg-white p-8 rounded-xl shadow-md border-t-8 border-blue-700">
                <h3 className="text-2xl font-extrabold text-blue-800 mb-6">📸 Tambah Foto Galeri</h3>
                <form onSubmit={simpanGaleri} className="space-y-4">
                  <input type="text" placeholder="Judul Foto" value={judulG} onChange={(e)=>setJudulG(e.target.value)} className="w-full px-4 py-3 border rounded bg-gray-50" required />
                  <input type="text" placeholder="Keterangan Tambahan" value={ketG} onChange={(e)=>setKetG(e.target.value)} className="w-full px-4 py-3 border rounded bg-gray-50" />
                  <div>
                    <label className="block text-gray-700 font-bold mb-2">Tautan (Link) Foto Direct (Berakhiran .jpg/.png)</label>
                    <input type="text" placeholder="Paste link foto dari ImgBB di sini..." value={linkG} onChange={(e)=>setLinkG(e.target.value)} className="w-full px-4 py-3 border rounded bg-blue-50 border-blue-200 outline-none" required />
                  </div>
                  <button type="submit" disabled={prosesLoading} className="w-full bg-blue-700 text-white font-bold py-3 rounded">{prosesLoading ? 'Menyimpan...' : 'Simpan ke Galeri'}</button>
                </form>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-md">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {dataGaleri.map(item => (
                    <div key={item.id} className="border p-2 rounded-lg bg-gray-50">
                      <img src={item.urlFoto} className="h-32 w-full object-cover rounded mb-2" alt={item.judul} />
                      <p className="text-sm font-bold text-center truncate">{item.judul}</p>
                      <button onClick={()=>hapusGaleri(item.id)} className="w-full mt-2 py-1 bg-red-600 text-white text-xs font-bold rounded">Hapus</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* === TAB 6: BUKU TAMU === */}
          {activeTab === 'bukutamu' && (
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200">
              <h3 className="text-2xl font-extrabold text-blue-900 mb-6">📖 Daftar Buku Tamu</h3>
              <div className="space-y-4">
                {dataBukuTamu.map((item) => (
                  <div key={item.id} className="border p-5 rounded-lg flex justify-between bg-gray-50">
                    <div>
                      <h4 className="font-bold">{item.nama} <span className="text-xs bg-blue-100 text-blue-800 px-2 rounded">{item.asal}</span></h4>
                      <p className="text-gray-700 text-sm mt-1">"{item.pesan}"</p>
                    </div>
                    <button onClick={() => hapusBukuTamu(item.id)} className="px-4 py-2 bg-red-500 text-white font-bold rounded text-sm">Hapus</button>
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