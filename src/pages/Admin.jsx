import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import {
  ArrowLeft,
  Edit3,
  ExternalLink,
  FolderDown,
  Images,
  Lock,
  LogIn,
  LogOut,
  Mail,
  Megaphone,
  MessageSquareHeart,
  Trash2,
  Users,
} from 'lucide-react';
import { db } from '../firebase';
import logoSekolah from '../assets/Logo_Persis.png';
import AdminLoginBackground from '../components/AdminLoginBackground';
import AdminSaran from './AdminSaran';

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
      const data = querySnapshot.docs.map((item) => ({ id: item.id, ...item.data() }));
      setter(data);
    } catch (error) {
      console.error(`Gagal mengambil data ${koleksi}:`, error);
    }
  };

  useEffect(() => {
    if (!user) return undefined;
    let aktif = true;

    const muatSemuaData = async () => {
      const pasangan = [
        ['berita', setBeritaList],
        ['pengurus', setPengurusList],
        ['galeri', setGaleriList],
        ['unduhan', setUnduhanList],
      ];

      await Promise.all(
        pasangan.map(async ([koleksi, setter]) => {
          try {
            const querySnapshot = await getDocs(collection(db, koleksi));
            const data = querySnapshot.docs.map((item) => ({ id: item.id, ...item.data() }));
            if (aktif) setter(data);
          } catch (error) {
            console.error(`Gagal mengambil data ${koleksi}:`, error);
          }
        })
      );
    };

    muatSemuaData();
    return () => {
      aktif = false;
    };
  }, [user]);

  const handleSimpan = async (e, koleksi, formData, setFormData, setter, resetState) => {
    e.preventDefault();
    try {
      const dataToSave = { ...formData };
      const docId = dataToSave.id;
      delete dataToSave.id;

      if (koleksi === 'berita' && !docId) {
        dataToSave.tanggal = new Date().toLocaleDateString('id-ID', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        });
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
      console.error(`Gagal menyimpan ${koleksi}:`, error);
      alert('Gagal menyimpan data!');
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
  // TAMPILAN LOGIN (Fullscreen Three.js + Logo, Tanpa Header & Footer)
  // ==========================================
  if (!user) {
    return (
      <div className="min-h-screen relative flex items-center justify-center px-4 py-10 overflow-hidden">
        <AdminLoginBackground />

        <div className="relative z-10 max-w-md w-full bg-white/95 backdrop-blur-md rounded-3xl border-2 border-emerald-950 shadow-[8px_8px_0px_#fbbf24] p-8 sm:p-10 animate-fade-in">
          {/* Logo Sekolah & Judul */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-white border-2 border-emerald-950 shadow-[4px_4px_0px_#0d9488] p-2 flex items-center justify-center">
              <img
                src={logoSekolah}
                alt="Logo RA Persis 175 At-Tajdid"
                className="w-full h-full object-contain"
              />
            </div>
            <h1 className="text-3xl font-black text-emerald-950 tracking-tight">ADMIN LOGIN</h1>
            <p className="text-slate-600 text-sm font-medium mt-1">
              Masuk untuk mengelola konten website sekolah
            </p>
          </div>

          <form onSubmit={tanganiLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-emerald-950 mb-1.5">
                Email Admin
              </label>
              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-700 pointer-events-none"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 bg-teal-50/70 border-2 border-emerald-950 rounded-xl focus:bg-white focus:ring-2 focus:ring-amber-400 outline-none font-semibold text-slate-900"
                  placeholder="admin@attajdid.sch.id"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-emerald-950 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-700 pointer-events-none"
                />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 bg-teal-50/70 border-2 border-emerald-950 rounded-xl focus:bg-white focus:ring-2 focus:ring-amber-400 outline-none font-semibold text-slate-900"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {errorLogin && (
              <div className="bg-rose-100 border-2 border-emerald-950 text-rose-900 text-xs text-center font-extrabold p-3 rounded-xl">
                {errorLogin}
              </div>
            )}

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-black py-4 rounded-xl border-2 border-emerald-950 shadow-[4px_4px_0px_#064e3b] hover:shadow-[2px_2px_0px_#064e3b] hover:translate-x-[2px] hover:translate-y-[2px] transition-all cursor-pointer"
            >
              <LogIn size={18} />
              MASUK
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-emerald-950/15 text-center">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs font-extrabold text-emerald-800 hover:text-emerald-950 hover:underline"
            >
              <ArrowLeft size={14} /> Kembali ke Beranda
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // DASHBOARD ADMIN (Desain Neo-Brutalist Terbaru)
  // ==========================================
  const navTabs = [
    { id: 'berita', label: 'Kelola Berita', icon: Megaphone, activeClass: 'bg-teal-200' },
    { id: 'pengurus', label: 'Data Pengurus & Guru', icon: Users, activeClass: 'bg-emerald-200' },
    { id: 'galeri', label: 'Galeri Foto', icon: Images, activeClass: 'bg-amber-300' },
    { id: 'download', label: 'File Download', icon: FolderDown, activeClass: 'bg-sky-200' },
    { id: 'saran', label: 'Kotak Saran Masuk', icon: MessageSquareHeart, activeClass: 'bg-rose-200' },
  ];

  const inputClass =
    'w-full px-4 py-3 bg-white rounded-xl border-2 border-emerald-950 outline-none focus:ring-2 focus:ring-amber-400 font-medium text-slate-900';

  return (
    <div className="bg-teal-50 min-h-screen py-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* HEADER DASHBOARD */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 bg-white p-6 rounded-3xl border-2 border-emerald-950 shadow-[6px_6px_0px_#064e3b]">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-300 border-2 border-emerald-950 p-1.5 flex items-center justify-center shrink-0">
              <img src={logoSekolah} alt="Logo RA At-Tajdid" className="w-full h-full object-contain" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-emerald-950">Dashboard Admin</h2>
              <p className="text-slate-600 text-sm font-medium mt-0.5">
                Masuk sebagai:{' '}
                <span className="inline-block bg-teal-100 border border-emerald-950 px-2.5 py-0.5 rounded-full font-extrabold text-emerald-950 text-xs ml-1">
                  {user.email}
                </span>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 bg-teal-100 hover:bg-teal-200 text-emerald-950 px-5 py-3 rounded-xl font-black border-2 border-emerald-950 shadow-[4px_4px_0px_#064e3b] hover:shadow-[2px_2px_0px_#064e3b] hover:translate-x-[2px] hover:translate-y-[2px] transition-all text-sm"
            >
              <ArrowLeft size={16} />
              Lihat Website
            </Link>
            <button
              type="button"
              onClick={tanganiLogout}
              className="inline-flex items-center justify-center gap-2 bg-rose-500 hover:bg-rose-600 text-white px-6 py-3 rounded-xl font-black border-2 border-emerald-950 shadow-[4px_4px_0px_#064e3b] hover:shadow-[2px_2px_0px_#064e3b] hover:translate-x-[2px] hover:translate-y-[2px] transition-all text-sm cursor-pointer"
            >
              <LogOut size={16} />
              LOGOUT
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* SIDEBAR NAVIGASI */}
          <aside className="w-full lg:w-1/4 space-y-2.5">
            {navTabs.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-5 py-3.5 rounded-2xl font-extrabold text-sm border-2 border-emerald-950 transition-all cursor-pointer ${
                    isActive
                      ? `${item.activeClass} text-emerald-950 shadow-[4px_4px_0px_#064e3b] lg:translate-x-1.5`
                      : 'bg-white text-slate-700 hover:bg-emerald-50 shadow-[2px_2px_0px_#064e3b]'
                  }`}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </aside>

          {/* AREA KONTEN UTAMA */}
          <main className="w-full lg:w-3/4 bg-white rounded-3xl border-2 border-emerald-950 shadow-[8px_8px_0px_#064e3b] p-6 md:p-10">
            {/* PANDUAN UPLOAD GAMBAR */}
            {activeTab !== 'saran' && (
              <div className="bg-sky-100 border-2 border-emerald-950 shadow-[4px_4px_0px_#064e3b] p-5 rounded-2xl mb-8 flex gap-4 items-start">
                <div className="text-3xl shrink-0">💡</div>
                <div>
                  <h4 className="font-black text-emerald-950 mb-1">Panduan Upload Foto / Gambar</h4>
                  <p className="text-sm text-slate-800 leading-relaxed font-medium">
                    Untuk mengunggah gambar (Berita, Pengurus, Galeri), silakan upload foto Anda terlebih dahulu ke situs penyedia gambar gratis:{' '}
                    <a
                      href="https://imgbb.com/"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 bg-amber-300 hover:bg-amber-400 text-emerald-950 px-3 py-1 rounded-lg border-2 border-emerald-950 font-extrabold text-xs mx-1 transition"
                    >
                      Buka ImgBB <ExternalLink size={12} />
                    </a>{' '}
                    Setelah diupload, <strong>salin "Direct Link" (Tautan Langsung)</strong> dari ImgBB dan{' '}
                    <strong>tempelkan (paste)</strong> pada kolom isian Link Foto di bawah.
                  </p>
                </div>
              </div>
            )}

            {/* ========================================================= */}
            {/* TAB 1: KELOLA BERITA */}
            {/* ========================================================= */}
            {activeTab === 'berita' && (
              <div className="animate-fade-in">
                <h3 className="text-xl sm:text-2xl font-black text-emerald-950 mb-6 border-b-2 border-emerald-950/15 pb-4">
                  KELOLA BERITA & PENGUMUMAN
                </h3>

                <form
                  onSubmit={(e) =>
                    handleSimpan(e, 'berita', formBerita, setFormBerita, setBeritaList, {
                      id: '',
                      judul: '',
                      kategori: 'Pengumuman',
                      isi: '',
                      gambar: '',
                    })
                  }
                  className="bg-teal-100/70 border-2 border-emerald-950 shadow-[5px_5px_0px_#064e3b] p-6 rounded-2xl mb-8 space-y-4"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      value={formBerita.judul}
                      onChange={(e) => setFormBerita({ ...formBerita, judul: e.target.value })}
                      placeholder="Judul Berita..."
                      className={inputClass}
                      required
                    />
                    <select
                      value={formBerita.kategori}
                      onChange={(e) => setFormBerita({ ...formBerita, kategori: e.target.value })}
                      className={inputClass}
                    >
                      <option value="Pengumuman">Pengumuman</option>
                      <option value="Kegiatan">Kegiatan</option>
                      <option value="Prestasi">Prestasi</option>
                    </select>
                  </div>

                  <input
                    type="url"
                    value={formBerita.gambar}
                    onChange={(e) => setFormBerita({ ...formBerita, gambar: e.target.value })}
                    placeholder="Paste Link Gambar dari ImgBB (Opsional)"
                    className={inputClass}
                  />

                  <textarea
                    value={formBerita.isi}
                    onChange={(e) => setFormBerita({ ...formBerita, isi: e.target.value })}
                    placeholder="Isi berita..."
                    className={inputClass}
                    rows="4"
                    required
                  />

                  <div className="flex flex-wrap gap-3">
                    <button
                      type="submit"
                      className="bg-amber-400 hover:bg-amber-300 text-emerald-950 px-7 py-3 rounded-xl font-black border-2 border-emerald-950 shadow-[3px_3px_0px_#064e3b] transition cursor-pointer"
                    >
                      {formBerita.id ? 'Update Berita' : 'Terbitkan Berita'}
                    </button>
                    {formBerita.id && (
                      <button
                        type="button"
                        onClick={() =>
                          setFormBerita({ id: '', judul: '', kategori: 'Pengumuman', isi: '', gambar: '' })
                        }
                        className="bg-white hover:bg-slate-100 text-emerald-950 px-6 py-3 rounded-xl font-extrabold border-2 border-emerald-950 cursor-pointer"
                      >
                        Batal
                      </button>
                    )}
                  </div>
                </form>

                <div className="space-y-3">
                  {beritaList.map((item) => (
                    <div
                      key={item.id}
                      className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 p-4 bg-white border-2 border-emerald-950 rounded-2xl shadow-[4px_4px_0px_#064e3b]"
                    >
                      <div className="flex items-center gap-4">
                        {item.gambar && (
                          <img
                            src={item.gambar}
                            className="w-14 h-14 object-cover rounded-xl border-2 border-emerald-950 shrink-0"
                            alt="berita"
                          />
                        )}
                        <div>
                          <h5 className="font-extrabold text-emerald-950 text-sm sm:text-base line-clamp-1">
                            {item.judul}
                          </h5>
                          <p className="text-[11px] text-emerald-700 font-black uppercase mt-0.5">
                            {item.kategori} • {item.tanggal}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={() => setFormBerita(item)}
                          className="inline-flex items-center gap-1 text-emerald-950 bg-sky-100 hover:bg-sky-200 px-3.5 py-2 rounded-xl text-xs font-extrabold border-2 border-emerald-950 transition cursor-pointer"
                        >
                          <Edit3 size={14} /> Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleHapus('berita', item.id, setBeritaList)}
                          className="inline-flex items-center gap-1 text-white bg-rose-500 hover:bg-rose-600 px-3.5 py-2 rounded-xl text-xs font-extrabold border-2 border-emerald-950 transition cursor-pointer"
                        >
                          <Trash2 size={14} /> Hapus
                        </button>
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
                <h3 className="text-xl sm:text-2xl font-black text-emerald-950 mb-6 border-b-2 border-emerald-950/15 pb-4">
                  DATA PENGURUS & GURU
                </h3>
                <form
                  onSubmit={(e) =>
                    handleSimpan(e, 'pengurus', formPengurus, setFormPengurus, setPengurusList, {
                      id: '',
                      nama: '',
                      jabatan: '',
                      foto: '',
                      pendidikan: '',
                      moto: '',
                      deskripsi: '',
                    })
                  }
                  className="bg-emerald-100/80 border-2 border-emerald-950 shadow-[5px_5px_0px_#064e3b] p-6 rounded-2xl mb-8 space-y-4"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      value={formPengurus.nama}
                      onChange={(e) => setFormPengurus({ ...formPengurus, nama: e.target.value })}
                      placeholder="Nama Lengkap"
                      className={inputClass}
                      required
                    />
                    <input
                      type="text"
                      value={formPengurus.jabatan}
                      onChange={(e) => setFormPengurus({ ...formPengurus, jabatan: e.target.value })}
                      placeholder="Jabatan (cth: Kepala RA)"
                      className={inputClass}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      value={formPengurus.pendidikan}
                      onChange={(e) => setFormPengurus({ ...formPengurus, pendidikan: e.target.value })}
                      placeholder="Pendidikan"
                      className={inputClass}
                      required
                    />
                    <input
                      type="text"
                      value={formPengurus.moto}
                      onChange={(e) => setFormPengurus({ ...formPengurus, moto: e.target.value })}
                      placeholder="Moto Guru"
                      className={inputClass}
                      required
                    />
                  </div>
                  <input
                    type="url"
                    value={formPengurus.foto}
                    onChange={(e) => setFormPengurus({ ...formPengurus, foto: e.target.value })}
                    placeholder="Paste Link Foto ImgBB (https://i.ibb.co/...)"
                    className={inputClass}
                    required
                  />
                  <textarea
                    value={formPengurus.deskripsi}
                    onChange={(e) => setFormPengurus({ ...formPengurus, deskripsi: e.target.value })}
                    placeholder="Biografi singkat..."
                    className={inputClass}
                    rows="4"
                    required
                  />
                  <div className="flex flex-wrap gap-3">
                    <button
                      type="submit"
                      className="bg-amber-400 hover:bg-amber-300 text-emerald-950 font-black py-3 px-7 rounded-xl border-2 border-emerald-950 shadow-[3px_3px_0px_#064e3b] transition cursor-pointer"
                    >
                      {formPengurus.id ? 'Update Profil Guru' : 'Simpan Profil Guru'}
                    </button>
                    {formPengurus.id && (
                      <button
                        type="button"
                        onClick={() =>
                          setFormPengurus({
                            id: '',
                            nama: '',
                            jabatan: '',
                            foto: '',
                            pendidikan: '',
                            moto: '',
                            deskripsi: '',
                          })
                        }
                        className="bg-white hover:bg-slate-100 text-emerald-950 px-6 py-3 rounded-xl font-extrabold border-2 border-emerald-950 cursor-pointer"
                      >
                        Batal
                      </button>
                    )}
                  </div>
                </form>

                <div className="space-y-3">
                  {pengurusList.map((item) => (
                    <div
                      key={item.id}
                      className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 p-4 bg-white border-2 border-emerald-950 rounded-2xl shadow-[4px_4px_0px_#064e3b]"
                    >
                      <div className="flex items-center gap-4">
                        {item.foto && (
                          <img
                            src={item.foto}
                            className="w-12 h-12 rounded-full object-cover border-2 border-emerald-950 shrink-0"
                            alt=""
                          />
                        )}
                        <div>
                          <h4 className="font-extrabold text-emerald-950">{item.nama}</h4>
                          <p className="text-[11px] text-emerald-700 font-black uppercase">{item.jabatan}</p>
                        </div>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={() => setFormPengurus(item)}
                          className="inline-flex items-center gap-1 text-emerald-950 bg-sky-100 hover:bg-sky-200 px-3.5 py-2 rounded-xl text-xs font-extrabold border-2 border-emerald-950 cursor-pointer"
                        >
                          <Edit3 size={14} /> Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleHapus('pengurus', item.id, setPengurusList)}
                          className="inline-flex items-center gap-1 text-white bg-rose-500 hover:bg-rose-600 px-3.5 py-2 rounded-xl text-xs font-extrabold border-2 border-emerald-950 cursor-pointer"
                        >
                          <Trash2 size={14} /> Hapus
                        </button>
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
                <h3 className="text-xl sm:text-2xl font-black text-emerald-950 mb-6 border-b-2 border-emerald-950/15 pb-4">
                  GALERI FOTO KEGIATAN
                </h3>
                <form
                  onSubmit={(e) =>
                    handleSimpan(e, 'galeri', formGaleri, setFormGaleri, setGaleriList, {
                      id: '',
                      judul: '',
                      foto: '',
                    })
                  }
                  className="bg-amber-200/80 border-2 border-emerald-950 shadow-[5px_5px_0px_#064e3b] p-6 rounded-2xl mb-8 space-y-4"
                >
                  <input
                    type="text"
                    value={formGaleri.judul}
                    onChange={(e) => setFormGaleri({ ...formGaleri, judul: e.target.value })}
                    placeholder="Judul Kegiatan"
                    className={inputClass}
                    required
                  />
                  <input
                    type="url"
                    value={formGaleri.foto}
                    onChange={(e) => setFormGaleri({ ...formGaleri, foto: e.target.value })}
                    placeholder="Paste Link Foto ImgBB"
                    className={inputClass}
                    required
                  />
                  <div className="flex flex-wrap gap-3">
                    <button
                      type="submit"
                      className="bg-emerald-700 hover:bg-emerald-800 text-white font-black py-3 px-7 rounded-xl border-2 border-emerald-950 shadow-[3px_3px_0px_#064e3b] cursor-pointer"
                    >
                      {formGaleri.id ? 'Update Foto' : 'Upload ke Galeri'}
                    </button>
                    {formGaleri.id && (
                      <button
                        type="button"
                        onClick={() => setFormGaleri({ id: '', judul: '', foto: '' })}
                        className="bg-white hover:bg-slate-100 text-emerald-950 px-6 py-3 rounded-xl font-extrabold border-2 border-emerald-950 cursor-pointer"
                      >
                        Batal
                      </button>
                    )}
                  </div>
                </form>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                  {galeriList.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-2xl overflow-hidden border-2 border-emerald-950 shadow-[4px_4px_0px_#064e3b] bg-white flex flex-col"
                    >
                      <img src={item.foto} className="w-full aspect-square object-cover border-b-2 border-emerald-950" alt="Galeri" />
                      <div className="p-3.5 flex flex-col gap-3 flex-grow justify-between">
                        <p className="text-emerald-950 text-xs font-extrabold line-clamp-2">{item.judul}</p>
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => setFormGaleri(item)}
                            className="flex-1 bg-sky-100 hover:bg-sky-200 text-emerald-950 text-xs font-extrabold py-2 rounded-lg border-2 border-emerald-950 cursor-pointer"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => handleHapus('galeri', item.id, setGaleriList)}
                            className="flex-1 bg-rose-500 hover:bg-rose-600 text-white text-xs font-extrabold py-2 rounded-lg border-2 border-emerald-950 cursor-pointer"
                          >
                            Hapus
                          </button>
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
                <h3 className="text-xl sm:text-2xl font-black text-emerald-950 mb-6 border-b-2 border-emerald-950/15 pb-4">
                  FILE UNDUHAN & FORMULIR
                </h3>
                <form
                  onSubmit={(e) =>
                    handleSimpan(e, 'unduhan', formUnduhan, setFormUnduhan, setUnduhanList, {
                      id: '',
                      nama: '',
                      format: 'PDF',
                      link: '',
                    })
                  }
                  className="bg-sky-100/80 border-2 border-emerald-950 shadow-[5px_5px_0px_#064e3b] p-6 rounded-2xl mb-8 space-y-4"
                >
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <input
                      type="text"
                      value={formUnduhan.nama}
                      onChange={(e) => setFormUnduhan({ ...formUnduhan, nama: e.target.value })}
                      placeholder="Nama Dokumen"
                      className={`md:col-span-3 ${inputClass}`}
                      required
                    />
                    <select
                      value={formUnduhan.format}
                      onChange={(e) => setFormUnduhan({ ...formUnduhan, format: e.target.value })}
                      className={inputClass}
                    >
                      <option value="PDF">PDF</option>
                      <option value="DOCX">DOCX / Word</option>
                      <option value="JPG">JPG / Gambar</option>
                    </select>
                  </div>
                  <input
                    type="url"
                    value={formUnduhan.link}
                    onChange={(e) => setFormUnduhan({ ...formUnduhan, link: e.target.value })}
                    placeholder="Paste Link Dokumen (Google Drive, dll)"
                    className={inputClass}
                    required
                  />
                  <div className="flex flex-wrap gap-3">
                    <button
                      type="submit"
                      className="bg-amber-400 hover:bg-amber-300 text-emerald-950 font-black py-3 px-7 rounded-xl border-2 border-emerald-950 shadow-[3px_3px_0px_#064e3b] cursor-pointer"
                    >
                      {formUnduhan.id ? 'Update File' : 'Tambah File'}
                    </button>
                    {formUnduhan.id && (
                      <button
                        type="button"
                        onClick={() => setFormUnduhan({ id: '', nama: '', format: 'PDF', link: '' })}
                        className="bg-white hover:bg-slate-100 text-emerald-950 px-6 py-3 rounded-xl font-extrabold border-2 border-emerald-950 cursor-pointer"
                      >
                        Batal
                      </button>
                    )}
                  </div>
                </form>

                <div className="space-y-3">
                  {unduhanList.map((item) => (
                    <div
                      key={item.id}
                      className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 p-4 bg-white border-2 border-emerald-950 rounded-2xl shadow-[4px_4px_0px_#064e3b]"
                    >
                      <div>
                        <h5 className="font-extrabold text-emerald-950 text-sm sm:text-base">{item.nama}</h5>
                        <span className="inline-block mt-1 text-[10px] text-emerald-950 font-black uppercase bg-sky-100 border border-emerald-950 px-2.5 py-0.5 rounded-full">
                          {item.format}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2 items-center shrink-0">
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-emerald-800 hover:text-emerald-950 font-extrabold underline mr-2"
                        >
                          Test Link <ExternalLink size={12} />
                        </a>
                        <button
                          type="button"
                          onClick={() => setFormUnduhan(item)}
                          className="inline-flex items-center gap-1 text-emerald-950 bg-sky-100 hover:bg-sky-200 px-3.5 py-2 rounded-xl text-xs font-extrabold border-2 border-emerald-950 cursor-pointer"
                        >
                          <Edit3 size={14} /> Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleHapus('unduhan', item.id, setUnduhanList)}
                          className="inline-flex items-center gap-1 text-white bg-rose-500 hover:bg-rose-600 px-3.5 py-2 rounded-xl text-xs font-extrabold border-2 border-emerald-950 cursor-pointer"
                        >
                          <Trash2 size={14} /> Hapus
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ========================================================= */}
            {/* TAB 5: KELOLA SARAN MASUK */}
            {/* ========================================================= */}
            {activeTab === 'saran' && <AdminSaran />}
          </main>
        </div>
      </div>
    </div>
  );
}

export default Admin;
