import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase'; 

function Admin({ user, email, setEmail, password, setPassword, errorLogin, tanganiLogin, tanganiLogout }) {

  const [activeTab, setActiveTab] = useState('berita');

  // ==========================================
  // STATE PENYIMPANAN DATA LOKAL ADMIN
  // ==========================================
  const [beritaList, setBeritaList] = useState([]);
  const [pengurusList, setPengurusList] = useState([]);
  const [galeriList, setGaleriList] = useState([]);
  const [unduhanList, setUnduhanList] = useState([]);

  // ==========================================
  // STATE FORM INPUT (Semua menggunakan Link URL)
  // ==========================================
  const [formBerita, setFormBerita] = useState({ id: '', judul: '', kategori: 'Pengumuman', isi: '', gambar: '' });
  const [formPengurus, setFormPengurus] = useState({ id: '', nama: '', jabatan: '', foto: '', pendidikan: '', moto: '', deskripsi: '' });
  const [formGaleri, setFormGaleri] = useState({ id: '', judul: '', foto: '' });
  const [formUnduhan, setFormUnduhan] = useState({ id: '', nama: '', format: 'PDF', link: '' });

  // ==========================================
  // FUNGSI FETCH & CRUD GLOBAL
  // ==========================================
  const fetchData = async (koleksi, setter) => {
    try {
      const querySnapshot = await getDocs(collection(db, koleksi));
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setter(data);
    } catch (error) {
      console.error(`Gagal mengambil data ${koleksi}:`, error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchData('berita', setBeritaList);
      fetchData('pengurus', setPengurusList);
      fetchData('galeri', setGaleriList);
      fetchData('unduhan', setUnduhanList);
    }
  }, [user]);

  const handleSimpan = async (e, koleksi, formData, setFormData, setter, resetState) => {
    e.preventDefault();
    try {
      const dataToSave = { ...formData };
      const docId = dataToSave.id;
      delete dataToSave.id;

      // Khusus Berita: Tambahkan tanggal otomatis saat baru dibuat
      if (koleksi === 'berita' && !docId) {
        dataToSave.tanggal = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
      }

      if (docId) {
        await updateDoc(doc(db, koleksi, docId), dataToSave);
        alert('Data berhasil diperbarui!');
      } else {
        await addDoc(collection(db, koleksi), dataToSave);
        alert('Data baru berhasil ditambahkan!');
      }
      
      fetchData(koleksi, setter);
      setFormData(resetState);
    } catch (error) {
      alert(`Gagal menyimpan data!`);
    }
  };

  const handleHapus = async (koleksi, id, setter) => {
    if (window.confirm('Yakin ingin menghapus data ini secara permanen?')) {
      await deleteDoc(doc(db, koleksi, id));
      alert('Data terhapus!');
      fetchData(koleksi, setter);
    }
  };

  // ==========================================
  // TAMPILAN LOGIN
  // ==========================================
  if (!user) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-gray-100 px-4">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-10 border border-emerald-100">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-black text-emerald-800 tracking-tight">ADMIN LOGIN</h2>
            <p className="text-gray-500 text-sm mt-2">Kelola Konten RA At-Tajdid</p>
          </div>
          <form onSubmit={tanganiLogin} className="space-y-6">
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-5 py-4 bg-emerald-50 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="Email" required />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-5 py-4 bg-emerald-50 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="Password" required />
            {errorLogin && <div className="text-red-500 text-xs text-center font-bold bg-red-50 p-2 rounded-lg">{errorLogin}</div>}
            <button type="submit" className="w-full bg-emerald-600 text-white font-black py-4 rounded-2xl shadow-lg hover:bg-emerald-700 transition">MASUK</button>
          </form>
        </div>
      </div>
    );
  }

  // ==========================================
  // DASHBOARD ADMIN
  // ==========================================
  return (
    <div className="max-w-7xl mx-auto p-4 lg:p-8 min-h-screen">
      {/* HEADER DASHBOARD */}
      <div className="flex flex-col md:flex-row justify-between mb-8 gap-4 bg-white p-6 rounded-3xl shadow-sm border border-emerald-50">
        <div>
          <h2 className="text-2xl font-black text-emerald-900">Dashboard Admin</h2>
          <p className="text-gray-500 text-sm">Masuk sebagai: <span className="font-bold text-emerald-600">{user.email}</span></p>
        </div>
        <button onClick={tanganiLogout} className="bg-red-50 text-red-600 px-6 py-3 rounded-2xl font-black hover:bg-red-600 hover:text-white transition">LOGOUT</button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* SIDEBAR NAVIGASI */}
        <aside className="lg:w-1/4 space-y-2">
          {[
            { id: 'berita', label: '📢 Kelola Berita' },
            { id: 'pengurus', label: '👥 Data Pengurus & Guru' },
            { id: 'galeri', label: '📸 Galeri Foto' },
            { id: 'download', label: '📂 File Download' },
          ].map((item) => (
            <button
              key={item.id} onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-6 py-4 rounded-2xl font-bold text-sm transition-all ${
                activeTab === item.id ? 'bg-emerald-600 text-white shadow-lg translate-x-2' : 'bg-white text-gray-500 hover:bg-emerald-50'
              }`}
            >
              {item.label}
            </button>
          ))}
        </aside>

        {/* AREA KONTEN UTAMA */}
        <main className="lg:w-3/4 bg-white rounded-3xl shadow-sm border border-emerald-50 p-6 md:p-10">
          
          {/* KETERANGAN / PANDUAN UPLOAD GAMBAR (Tampil di semua tab) */}
          <div className="bg-blue-50 border border-blue-200 p-5 rounded-2xl mb-8 flex gap-4 items-start shadow-sm">
            <div className="text-3xl animate-bounce-slow">💡</div>
            <div>
              <h4 className="font-black text-blue-900 mb-1">Panduan Upload Foto / Gambar</h4>
              <p className="text-sm text-blue-800 leading-relaxed">
                Untuk mengunggah gambar (Berita, Pengurus, Galeri), silakan upload foto Anda terlebih dahulu ke situs penyedia gambar gratis: 
                <a href="https://imgbb.com/" target="_blank" rel="noreferrer" className="inline-block bg-blue-600 text-white px-3 py-1 rounded-md font-bold text-xs mx-2 hover:bg-blue-700 transition"> Buka ImgBB ↗</a>
                Setelah diupload, <strong>salin "Direct Link" (Tautan Langsung)</strong> dari ImgBB dan <strong>tempelkan (paste)</strong> pada kolom isian Link Foto di bawah.
              </p>
            </div>
          </div>

          {/* ========================================================= */}
          {/* TAB 1: KELOLA BERITA */}
          {/* ========================================================= */}
          {activeTab === 'berita' && (
            <div className="animate-fade-in">
              <h3 className="text-xl font-black text-emerald-800 mb-6 border-b pb-4">KELOLA BERITA & PENGUMUMAN</h3>
              
              <form onSubmit={(e) => handleSimpan(e, 'berita', formBerita, setFormBerita, setBeritaList, { id: '', judul: '', kategori: 'Pengumuman', isi: '', gambar: '' })} className="bg-gray-50 p-6 rounded-2xl mb-8 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="text" value={formBerita.judul} onChange={(e) => setFormBerita({...formBerita, judul: e.target.value})} placeholder="Judul Berita..." className="w-full px-4 py-3 bg-white rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-emerald-500" required />
                    <select value={formBerita.kategori} onChange={(e) => setFormBerita({...formBerita, kategori: e.target.value})} className="w-full px-4 py-3 bg-white rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-emerald-500">
                      <option value="Pengumuman">Pengumuman</option>
                      <option value="Kegiatan">Kegiatan</option>
                      <option value="Prestasi">Prestasi</option>
                    </select>
                  </div>
                  
                  {/* INPUT LINK GAMBAR IMGBB */}
                  <input type="url" value={formBerita.gambar} onChange={(e) => setFormBerita({...formBerita, gambar: e.target.value})} placeholder="Paste Link Gambar dari ImgBB (Opsional)" className="w-full px-4 py-3 bg-white rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-emerald-500 text-emerald-700" />
                  
                  <textarea value={formBerita.isi} onChange={(e) => setFormBerita({...formBerita, isi: e.target.value})} placeholder="Isi berita..." className="w-full px-4 py-3 bg-white rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-emerald-500" rows="4" required></textarea>
                  
                  <div className="flex gap-2">
                    <button type="submit" className="bg-emerald-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-emerald-700 transition">
                      {formBerita.id ? 'Update Berita' : 'Terbitkan Berita'}
                    </button>
                    {formBerita.id && <button type="button" onClick={() => setFormBerita({ id: '', judul: '', kategori: 'Pengumuman', isi: '', gambar: '' })} className="bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-bold">Batal</button>}
                  </div>
              </form>

              <div className="space-y-3">
                {beritaList.map((item) => (
                  <div key={item.id} className="flex justify-between items-center p-4 bg-white border rounded-2xl hover:shadow-md transition">
                    <div className="flex items-center gap-4">
                      {item.gambar && <img src={item.gambar} className="w-12 h-12 object-cover rounded-lg" alt="berita" />}
                      <div>
                        <h5 className="font-bold text-gray-800 text-sm line-clamp-1">{item.judul}</h5>
                        <p className="text-[10px] text-emerald-600 font-bold uppercase">{item.kategori} • {item.tanggal}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => setFormBerita(item)} className="text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg text-sm font-bold hover:bg-blue-600 hover:text-white transition">Edit</button>
                      <button onClick={() => handleHapus('berita', item.id, setBeritaList)} className="text-red-600 bg-red-50 px-3 py-1.5 rounded-lg text-sm font-bold hover:bg-red-600 hover:text-white transition">Hapus</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 2: PENGURUS & BIODATA */}
          {/* ========================================================= */}
          {activeTab === 'pengurus' && (
            <div className="animate-fade-in">
              <h3 className="text-xl font-black text-emerald-800 mb-6 border-b pb-4">DATA PENGURUS & GURU</h3>
              <form onSubmit={(e) => handleSimpan(e, 'pengurus', formPengurus, setFormPengurus, setPengurusList, { id: '', nama: '', jabatan: '', foto: '', pendidikan: '', moto: '', deskripsi: '' })} className="bg-emerald-50 p-6 rounded-2xl mb-8 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input type="text" value={formPengurus.nama} onChange={(e) => setFormPengurus({...formPengurus, nama: e.target.value})} placeholder="Nama Lengkap" className="w-full px-4 py-3 bg-white rounded-xl border border-gray-200 outline-none" required />
                  <input type="text" value={formPengurus.jabatan} onChange={(e) => setFormPengurus({...formPengurus, jabatan: e.target.value})} placeholder="Jabatan (cth: Kepala RA)" className="w-full px-4 py-3 bg-white rounded-xl border border-gray-200 outline-none" required />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input type="text" value={formPengurus.pendidikan} onChange={(e) => setFormPengurus({...formPengurus, pendidikan: e.target.value})} placeholder="Pendidikan" className="w-full px-4 py-3 bg-white rounded-xl border border-gray-200 outline-none" required />
                  <input type="text" value={formPengurus.moto} onChange={(e) => setFormPengurus({...formPengurus, moto: e.target.value})} placeholder="Moto Guru" className="w-full px-4 py-3 bg-white rounded-xl border border-gray-200 outline-none" required />
                </div>
                <input type="url" value={formPengurus.foto} onChange={(e) => setFormPengurus({...formPengurus, foto: e.target.value})} placeholder="Paste Link Foto ImgBB (https://i.ibb.co/...)" className="w-full px-4 py-3 bg-white rounded-xl border border-gray-200 outline-none text-emerald-700" required />
                <textarea value={formPengurus.deskripsi} onChange={(e) => setFormPengurus({...formPengurus, deskripsi: e.target.value})} placeholder="Biografi singkat..." className="w-full px-4 py-3 bg-white rounded-xl border border-gray-200 outline-none" rows="4" required></textarea>
                <div className="flex gap-2">
                  <button type="submit" className="bg-emerald-600 text-white font-bold py-3 px-8 rounded-xl hover:bg-emerald-700 transition">
                    {formPengurus.id ? 'Update Profil Guru' : 'Simpan Profil Guru'}
                  </button>
                  {formPengurus.id && <button type="button" onClick={() => setFormPengurus({ id: '', nama: '', jabatan: '', foto: '', pendidikan: '', moto: '', deskripsi: '' })} className="bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-bold">Batal</button>}
                </div>
              </form>
              <div className="space-y-3">
                {pengurusList.map((item) => (
                  <div key={item.id} className="flex justify-between items-center p-4 bg-white border rounded-2xl">
                    <div className="flex items-center gap-4">
                      {item.foto && <img src={item.foto} className="w-12 h-12 rounded-full object-cover" alt="" />}
                      <div><h4 className="font-bold text-gray-800">{item.nama}</h4><p className="text-[10px] text-emerald-600 font-bold uppercase">{item.jabatan}</p></div>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => setFormPengurus(item)} className="text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg text-sm font-bold">Edit</button>
                      <button onClick={() => handleHapus('pengurus', item.id, setPengurusList)} className="text-red-600 bg-red-50 px-3 py-1.5 rounded-lg text-sm font-bold">Hapus</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 3: KELOLA GALERI */}
          {/* ========================================================= */}
          {activeTab === 'galeri' && (
            <div className="animate-fade-in">
              <h3 className="text-xl font-black text-amber-600 mb-6 border-b pb-4">GALERI FOTO KEGIATAN</h3>
              <form onSubmit={(e) => handleSimpan(e, 'galeri', formGaleri, setFormGaleri, setGaleriList, { id: '', judul: '', foto: '' })} className="bg-amber-50 p-6 rounded-2xl mb-8 space-y-4">
                  <input type="text" value={formGaleri.judul} onChange={(e) => setFormGaleri({...formGaleri, judul: e.target.value})} placeholder="Judul Kegiatan" className="w-full px-4 py-3 bg-white rounded-xl outline-none" required />
                  <input type="url" value={formGaleri.foto} onChange={(e) => setFormGaleri({...formGaleri, foto: e.target.value})} placeholder="Paste Link Foto ImgBB" className="w-full px-4 py-3 bg-white rounded-xl outline-none text-amber-700" required />
                  <div className="flex gap-2">
                    <button type="submit" className="bg-amber-500 text-white font-bold py-3 px-8 rounded-xl">{formGaleri.id ? 'Update Foto' : 'Upload ke Galeri'}</button>
                    {formGaleri.id && <button type="button" onClick={() => setFormGaleri({ id: '', judul: '', foto: '' })} className="bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-bold">Batal</button>}
                  </div>
              </form>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {galeriList.map((item) => (
                  <div key={item.id} className="relative group rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                    <img src={item.foto} className="w-full aspect-square object-cover" alt="Galeri" />
                    <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition flex flex-col justify-center items-center gap-2 p-2">
                      <p className="text-white text-xs font-bold mb-2">{item.judul}</p>
                      <div className="flex gap-2">
                        <button onClick={() => setFormGaleri(item)} className="bg-blue-500 text-white text-xs px-3 py-1.5 rounded-lg">Edit</button>
                        <button onClick={() => handleHapus('galeri', item.id, setGaleriList)} className="bg-red-500 text-white text-xs px-3 py-1.5 rounded-lg">Hapus</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 4: KELOLA DOWNLOAD */}
          {/* ========================================================= */}
          {activeTab === 'download' && (
            <div className="animate-fade-in">
              <h3 className="text-xl font-black text-blue-600 mb-6 border-b pb-4">FILE UNDUHAN & FORMULIR</h3>
              <form onSubmit={(e) => handleSimpan(e, 'unduhan', formUnduhan, setFormUnduhan, setUnduhanList, { id: '', nama: '', format: 'PDF', link: '' })} className="bg-blue-50 p-6 rounded-2xl mb-8 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <input type="text" value={formUnduhan.nama} onChange={(e) => setFormUnduhan({...formUnduhan, nama: e.target.value})} placeholder="Nama Dokumen" className="md:col-span-3 w-full px-4 py-3 bg-white rounded-xl outline-none" required />
                    <select value={formUnduhan.format} onChange={(e) => setFormUnduhan({...formUnduhan, format: e.target.value})} className="w-full px-4 py-3 bg-white rounded-xl outline-none">
                      <option value="PDF">PDF</option>
                      <option value="DOCX">DOCX / Word</option>
                      <option value="JPG">JPG / Gambar</option>
                    </select>
                  </div>
                  <input type="url" value={formUnduhan.link} onChange={(e) => setFormUnduhan({...formUnduhan, link: e.target.value})} placeholder="Paste Link Dokumen (Google Drive, dll)" className="w-full px-4 py-3 bg-white rounded-xl outline-none text-blue-700" required />
                  <div className="flex gap-2">
                    <button type="submit" className="bg-blue-500 text-white font-bold py-3 px-8 rounded-xl">{formUnduhan.id ? 'Update File' : 'Tambah File'}</button>
                    {formUnduhan.id && <button type="button" onClick={() => setFormUnduhan({ id: '', nama: '', format: 'PDF', link: '' })} className="bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-bold">Batal</button>}
                  </div>
              </form>
              <div className="space-y-3">
                {unduhanList.map((item) => (
                  <div key={item.id} className="flex justify-between items-center p-4 bg-white border rounded-2xl">
                    <div>
                      <h5 className="font-bold text-gray-800 text-sm">{item.nama}</h5>
                      <span className="text-[10px] text-blue-600 font-black uppercase bg-blue-50 px-2 py-0.5 rounded">{item.format}</span>
                    </div>
                    <div className="flex gap-2 items-center">
                      <a href={item.link} target="_blank" rel="noreferrer" className="text-[10px] text-gray-500 hover:text-green-600 font-bold underline mr-2">Test Link</a>
                      <button onClick={() => setFormUnduhan(item)} className="text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg text-sm font-bold">Edit</button>
                      <button onClick={() => handleHapus('unduhan', item.id, setUnduhanList)} className="text-red-600 bg-red-50 px-3 py-1.5 rounded-lg text-sm font-bold">Hapus</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}

export default Admin;