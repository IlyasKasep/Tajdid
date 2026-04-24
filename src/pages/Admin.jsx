import { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

const IMGBB_API_KEY = 'cb9b2aec11b80af3765d32f4d6f572da';

function Admin(props) {
  const {
    user, email, setEmail, password, setPassword, errorLogin, tanganiLogin, tanganiLogout,
    berita, judulBaru, setJudulBaru, kategoriBaru, setKategoriBaru,
    fileGambar, setFileGambar, urlGambarLama, isiBaru, setIsiBaru,
    idEdit, batalEdit, mulaiEdit, hapusBerita
  } = props;

  const [activeTab, setActiveTab] = useState('berita'); 
  const [prosesSimpanBeritaLokal, setProsesSimpanBeritaLokal] = useState(false);

  // --- Tambahan State untuk Link Manual ---
  const [urlManualBerita, setUrlManualBerita] = useState('');
  const [urlManualPengurus, setUrlManualPengurus] = useState('');
  const [urlManualGaleri, setUrlManualGaleri] = useState('');

  const [pengurus, setPengurus] = useState([]);
  const [nama, setNama] = useState('');
  const [jabatan, setJabatan] = useState('');
  const [fotoPengurus, setFotoPengurus] = useState(null);
  const [urlFotoLama, setUrlFotoLama] = useState('');
  const [idEditPengurus, setIdEditPengurus] = useState(null);
  const [prosesSimpanPengurus, setProsesSimpanPengurus] = useState(false);

  const [dataBukuTamu, setDataBukuTamu] = useState([]);
  const [dataGaleri, setDataGaleri] = useState([]);
  const [judulGaleri, setJudulGaleri] = useState('');
  const [fotoGaleri, setFotoGaleri] = useState(null);
  const [prosesSimpanGaleri, setProsesSimpanGaleri] = useState(false);

  // Fetch Data
  const ambilDataSemua = async () => {
    const snapP = await getDocs(collection(db, "pengurus"));
    setPengurus(snapP.docs.map(d => ({id: d.id, ...d.data()})));
    const snapB = await getDocs(collection(db, "bukutamu"));
    setDataBukuTamu(snapB.docs.map(d => ({id: d.id, ...d.data()})).reverse());
    const snapG = await getDocs(collection(db, "galeri"));
    setDataGaleri(snapG.docs.map(d => ({id: d.id, ...d.data()})).reverse());
  };

  useEffect(() => { if (user) ambilDataSemua(); }, [user]);

  const uploadFotoImgBB = async (file) => {
    const formData = new FormData();
    formData.append('image', file);
    try {
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, { method: 'POST', body: formData });
      const data = await res.json();
      return data.data.url;
    } catch (err) { return null; }
  };

  // === SIMPAN BERITA (LOGIKA BARU) ===
  const simpanBeritaFix = async (e) => {
    e.preventDefault();
    setProsesSimpanBeritaLokal(true);
    try {
      let urlFinal = urlGambarLama || '';

      // Cek: Apakah pakai link manual atau upload file?
      if (urlManualBerita) {
        urlFinal = urlManualBerita; // Gunakan link manual jika diisi
      } else if (fileGambar) {
        const urlBaru = await uploadFotoImgBB(fileGambar);
        if (urlBaru) urlFinal = urlBaru;
      }

      const dataObj = {
        judul: judulBaru,
        kategori: kategoriBaru,
        isi: isiBaru,
        gambar: urlFinal,
        tanggal: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
      };

      if (idEdit) {
        await updateDoc(doc(db, "berita", idEdit), dataObj);
      } else {
        await addDoc(collection(db, "berita"), dataObj);
      }
      
      alert("Berita Berhasil Disimpan!");
      window.location.reload(); // Refresh agar data muncul di dashboard
    } catch (err) { alert("Error simpan berita"); }
    setProsesSimpanBeritaLokal(false);
  };

  // === SIMPAN PENGURUS (LOGIKA BARU) ===
  const simpanPengurusFix = async (e) => {
    e.preventDefault();
    setProsesSimpanPengurus(true);
    try {
      let urlFinal = urlFotoLama || '';
      if (urlManualPengurus) {
        urlFinal = urlManualPengurus;
      } else if (fotoPengurus) {
        const urlBaru = await uploadFotoImgBB(fotoPengurus);
        if (urlBaru) urlFinal = urlBaru;
      }

      if (idEditPengurus) {
        await updateDoc(doc(db, "pengurus", idEditPengurus), { nama, jabatan, foto: urlFinal });
      } else {
        await addDoc(collection(db, "pengurus"), { nama, jabatan, foto: urlFinal });
      }
      alert("Data Pengurus Disimpan!");
      batalEditPengurus();
      ambilDataSemua();
      setUrlManualPengurus('');
    } catch (err) { alert("Error simpan pengurus"); }
    setProsesSimpanPengurus(false);
  };

  const batalEditPengurus = () => {
    setIdEditPengurus(null); setNama(''); setJabatan(''); setUrlFotoLama(''); setFotoPengurus(null);
  };

  // === SIMPAN GALERI (LOGIKA BARU) ===
  const simpanGaleriFix = async (e) => {
    e.preventDefault();
    setProsesSimpanGaleri(true);
    try {
      let urlFinal = '';
      if (urlManualGaleri) {
        urlFinal = urlManualGaleri;
      } else if (fotoGaleri) {
        urlFinal = await uploadFotoImgBB(fotoGaleri);
      }

      if (urlFinal) {
        await addDoc(collection(db, "galeri"), { judul: judulGaleri, urlFoto: urlFinal });
        alert("Foto Galeri Ditambahkan!");
        setJudulGaleri(''); setFotoGaleri(null); setUrlManualGaleri('');
        ambilDataSemua();
      } else {
        alert("Masukkan Link Foto atau Pilih File!");
      }
    } catch (err) { alert("Error simpan galeri"); }
    setProsesSimpanGaleri(false);
  };

  // UI RENDERING
  return (
    <section className="py-12 max-w-6xl mx-auto px-4 min-h-screen">
      {!user ? (
        <div className="bg-white p-8 rounded-xl shadow-2xl border-t-8 border-blue-800 max-w-md mx-auto mt-10">
          <h3 className="text-3xl font-extrabold text-blue-900 text-center mb-8">Admin Portal</h3>
          <form onSubmit={tanganiLogin} className="space-y-6">
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 border rounded" placeholder="Email" required />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 border rounded" placeholder="Password" required />
            <button className="w-full bg-blue-800 text-white font-bold py-3 rounded">Masuk</button>
          </form>
        </div>
      ) : (
        <div>
          <div className="flex flex-wrap gap-3 mb-10 border-b pb-4">
            <button onClick={() => setActiveTab('berita')} className={`px-6 py-2 font-bold rounded ${activeTab === 'berita' ? 'bg-blue-800 text-white' : 'bg-gray-100'}`}>Berita</button>
            <button onClick={() => setActiveTab('pengurus')} className={`px-6 py-2 font-bold rounded ${activeTab === 'pengurus' ? 'bg-blue-800 text-white' : 'bg-gray-100'}`}>Pengurus</button>
            <button onClick={() => setActiveTab('galeri')} className={`px-6 py-2 font-bold rounded ${activeTab === 'galeri' ? 'bg-blue-800 text-white' : 'bg-gray-100'}`}>Galeri</button>
            <button onClick={tanganiLogout} className="px-6 py-2 bg-red-600 text-white font-bold rounded">Keluar</button>
          </div>

          {activeTab === 'berita' && (
            <div className="bg-white p-6 rounded shadow border-t-4 border-blue-700">
              <h3 className="text-xl font-bold mb-4">Input Berita</h3>
              <form onSubmit={simpanBeritaFix} className="space-y-4">
                <input type="text" placeholder="Judul" value={judulBaru} onChange={(e) => setJudulBaru(e.target.value)} className="w-full p-2 border" required />
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold">Opsi 1: Link Foto Manual (Paste dari ImgBB)</label>
                    <input type="text" placeholder="https://i.ibb.co/..." value={urlManualBerita} onChange={(e) => setUrlManualBerita(e.target.value)} className="w-full p-2 border bg-yellow-50" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold">Opsi 2: Pilih File (Upload Otomatis)</label>
                    <input type="file" onChange={(e) => setFileGambar(e.target.files[0])} className="w-full p-2 border" />
                  </div>
                </div>
                <textarea placeholder="Isi Berita" value={isiBaru} onChange={(e) => setIsiBaru(e.target.value)} className="w-full p-2 border h-32" required></textarea>
                <button type="submit" disabled={prosesSimpanBeritaLokal} className="bg-blue-700 text-white px-6 py-2 rounded">
                  {prosesSimpanBeritaLokal ? 'Sedang Memproses...' : 'Simpan Berita'}
                </button>
              </form>
            </div>
          )}

          {activeTab === 'pengurus' && (
            <div className="bg-white p-6 rounded shadow border-t-4 border-blue-700">
              <h3 className="text-xl font-bold mb-4">Input Pengurus</h3>
              <form onSubmit={simpanPengurusFix} className="space-y-4">
                <input type="text" placeholder="Nama" value={nama} onChange={(e) => setNama(e.target.value)} className="w-full p-2 border" required />
                <input type="text" placeholder="Jabatan" value={jabatan} onChange={(e) => setJabatan(e.target.value)} className="w-full p-2 border" required />
                <div className="grid md:grid-cols-2 gap-4">
                  <input type="text" placeholder="Link Foto Manual" value={urlManualPengurus} onChange={(e) => setUrlManualPengurus(e.target.value)} className="w-full p-2 border bg-yellow-50" />
                  <input type="file" onChange={(e) => setFotoPengurus(e.target.files[0])} className="w-full p-2 border" />
                </div>
                <button type="submit" className="bg-blue-700 text-white px-6 py-2 rounded">Simpan Pengurus</button>
              </form>
            </div>
          )}

          {activeTab === 'galeri' && (
            <div className="bg-white p-6 rounded shadow border-t-4 border-blue-700">
              <h3 className="text-xl font-bold mb-4">Input Galeri</h3>
              <form onSubmit={simpanGaleriFix} className="space-y-4">
                <input type="text" placeholder="Judul Foto" value={judulGaleri} onChange={(e) => setJudulGaleri(e.target.value)} className="w-full p-2 border" required />
                <div className="grid md:grid-cols-2 gap-4">
                  <input type="text" placeholder="Link Foto Manual" value={urlManualGaleri} onChange={(e) => setUrlManualGaleri(e.target.value)} className="w-full p-2 border bg-yellow-50" />
                  <input type="file" onChange={(e) => setFotoGaleri(e.target.files[0])} className="w-full p-2 border" />
                </div>
                <button type="submit" className="bg-blue-700 text-white px-6 py-2 rounded">Upload Galeri</button>
              </form>
            </div>
          )}
        </div>
      )}
    </section>
  );
}

export default Admin;