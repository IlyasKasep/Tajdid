import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Calendar,
  Check,
  Edit3,
  ExternalLink,
  Folder,
  FolderDown,
  FolderOpen,
  FolderPlus,
  Images,
  Lock,
  LogIn,
  LogOut,
  Mail,
  Megaphone,
  Menu,
  MessageSquareHeart,
  PanelLeftClose,
  PanelLeftOpen,
  PlayCircle,
  Plus,
  Star,
  Trash2,
  Upload,
  Users,
  X,
} from 'lucide-react';
import { supabase } from '../supabase';
import logoSekolah from '../assets/Logo_Persis.png';
import AdminLoginBackground from '../components/AdminLoginBackground';
import AdminSaran from './AdminSaran';

function Admin({ user, email, setEmail, password, setPassword, errorLogin, tanganiLogin, tanganiLogout }) {
  const [activeTab, setActiveTab] = useState('berita');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [unreadSaranCount, setUnreadSaranCount] = useState(0);

  // ==========================================
  // STATE PENYIMPANAN DATA LOKAL ADMIN
  // ==========================================
  const [beritaList, setBeritaList] = useState([]);
  const [pengurusList, setPengurusList] = useState([]);
  const [unduhanList, setUnduhanList] = useState([]);
  const [uploadingImage, setUploadingImage] = useState(false);

  // STATE KHUSUS FOLDER / ALBUM GALERI
  const [albumList, setAlbumList] = useState([]);
  const [activeAdminAlbum, setActiveAdminAlbum] = useState(null);
  const [albumPhotosAdmin, setAlbumPhotosAdmin] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({ current: 0, total: 0 });
  const [manualFotoUrl, setManualFotoUrl] = useState('');

  // ==========================================
  // STATE FORM INPUT
  // ==========================================
  const [formBerita, setFormBerita] = useState({ id: '', judul: '', kategori: 'Pengumuman', isi: '', gambar: '' });
  const [formPengurus, setFormPengurus] = useState({ id: '', nama: '', jabatan: '', foto: '', pendidikan: '', moto: '', deskripsi: '' });
  const [formUnduhan, setFormUnduhan] = useState({ id: '', nama: '', format: 'PDF', link: '' });
  const [formAlbum, setFormAlbum] = useState({ id: '', judul: '', tanggal: '', deskripsi: '', cover_foto: '' });

  // ==========================================
  // FUNGSI UPLOAD STORAGE SUPABASE
  // ==========================================
  const uploadFileToSupabase = async (file, folder = 'media') => {
    if (!file) return null;
    try {
      setUploadingImage(true);
      const fileExt = file.name.split('.').pop();
      const sanitizedName = file.name.replace(/[^a-zA-Z0-9]/g, '_');
      const filePath = `${folder}/${Date.now()}-${sanitizedName}.${fileExt}`;

      const { data, error: uploadError } = await supabase.storage
        .from('media-sekolah')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true,
        });

      if (uploadError) {
        console.error('Upload error:', uploadError);
        alert(`Gagal mengunggah file: ${uploadError.message}`);
        return null;
      }

      const { data: publicUrlData } = supabase.storage
        .from('media-sekolah')
        .getPublicUrl(data.path);

      return publicUrlData.publicUrl;
    } catch (err) {
      console.error('Unexpected upload error:', err);
      alert('Terjadi kesalahan saat mengunggah file.');
      return null;
    } finally {
      setUploadingImage(false);
    }
  };

  // ==========================================
  // FUNGSI KHUSUS FOLDER / ALBUM GALERI
  // ==========================================
  const fetchAlbums = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('galeri_album')
        .select(`
          *,
          galeri_foto (id, foto)
        `)
        .order('created_at', { ascending: false });
      if (error) throw error;
      setAlbumList(data || []);
      setActiveAdminAlbum((prev) => (prev ? (data || []).find((a) => a.id === prev.id) || prev : null));
    } catch (err) {
      console.error('Gagal mengambil data album:', err);
    }
  }, []);

  const fetchAlbumPhotos = async (albumId) => {
    try {
      const { data, error } = await supabase
        .from('galeri_foto')
        .select('*')
        .eq('album_id', albumId)
        .order('created_at', { ascending: false });
      if (error) throw error;
      setAlbumPhotosAdmin(data || []);
    } catch (err) {
      console.error('Gagal mengambil foto album:', err);
    }
  };

  const handleBukaFolder = (album) => {
    setActiveAdminAlbum(album);
    fetchAlbumPhotos(album.id);
  };

  const handleSimpanAlbum = async (e) => {
    e.preventDefault();
    try {
      const dataToSave = {
        judul: formAlbum.judul.trim(),
        tanggal: formAlbum.tanggal.trim(),
        deskripsi: formAlbum.deskripsi?.trim() || '',
      };
      if (formAlbum.cover_foto) {
        dataToSave.cover_foto = formAlbum.cover_foto;
      }

      if (formAlbum.id) {
        const { error } = await supabase
          .from('galeri_album')
          .update(dataToSave)
          .eq('id', formAlbum.id);
        if (error) throw error;
        alert('Informasi folder berhasil diperbarui!');
      } else {
        const { error } = await supabase
          .from('galeri_album')
          .insert([dataToSave]);
        if (error) throw error;
        alert('Folder kegiatan baru berhasil dibuat!');
      }

      setFormAlbum({ id: '', judul: '', tanggal: '', deskripsi: '', cover_foto: '' });
      fetchAlbums();
    } catch (err) {
      console.error('Gagal menyimpan album:', err);
      alert('Gagal menyimpan album: ' + (err.message || 'Terjadi kesalahan'));
    }
  };

  const handleHapusAlbum = async (albumId, albumJudul) => {
    if (window.confirm(`Yakin ingin menghapus folder "${albumJudul}" beserta semua foto di dalamnya?`)) {
      try {
        const { error } = await supabase.from('galeri_album').delete().eq('id', albumId);
        if (error) throw error;
        alert('Folder kegiatan berhasil dihapus!');
        if (activeAdminAlbum?.id === albumId) {
          setActiveAdminAlbum(null);
          setAlbumPhotosAdmin([]);
        }
        fetchAlbums();
      } catch (err) {
        console.error('Gagal menghapus album:', err);
        alert('Gagal menghapus album: ' + (err.message || 'Terjadi kesalahan'));
      }
    }
  };

  const handleMultiUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length || !activeAdminAlbum) return;

    setUploadingImage(true);
    setUploadProgress({ current: 0, total: files.length });

    try {
      let firstUploadedUrl = null;

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        setUploadProgress({ current: i + 1, total: files.length });

        const fileExt = file.name.split('.').pop();
        const sanitized = file.name.replace(/[^a-zA-Z0-9]/g, '_');
        const filePath = `galeri/${activeAdminAlbum.id}/${Date.now()}-${i}-${sanitized}.${fileExt}`;

        const { data, error: uploadErr } = await supabase.storage
          .from('media-sekolah')
          .upload(filePath, file, { cacheControl: '3600', upsert: true });

        if (!uploadErr && data) {
          const { data: publicUrlData } = supabase.storage
            .from('media-sekolah')
            .getPublicUrl(data.path);

          const photoUrl = publicUrlData.publicUrl;
          if (!firstUploadedUrl) firstUploadedUrl = photoUrl;

          await supabase.from('galeri_foto').insert([
            {
              album_id: activeAdminAlbum.id,
              foto: photoUrl,
              caption: '',
            },
          ]);
        }
      }

      if (!activeAdminAlbum.cover_foto && firstUploadedUrl) {
        await supabase
          .from('galeri_album')
          .update({ cover_foto: firstUploadedUrl })
          .eq('id', activeAdminAlbum.id);
      }

      alert(`Berhasil mengunggah ${files.length} foto ke folder "${activeAdminAlbum.judul}"!`);
      fetchAlbumPhotos(activeAdminAlbum.id);
      fetchAlbums();
    } catch (err) {
      console.error('Gagal upload multi foto:', err);
      alert('Terjadi kesalahan saat mengunggah foto.');
    } finally {
      setUploadingImage(false);
      setUploadProgress({ current: 0, total: 0 });
      e.target.value = '';
    }
  };

  const handleTambahFotoManual = async (url) => {
    if (!url || !activeAdminAlbum) return;
    try {
      const { error } = await supabase.from('galeri_foto').insert([
        {
          album_id: activeAdminAlbum.id,
          foto: url.trim(),
          caption: '',
        },
      ]);
      if (error) throw error;
      if (!activeAdminAlbum.cover_foto) {
        await supabase
          .from('galeri_album')
          .update({ cover_foto: url.trim() })
          .eq('id', activeAdminAlbum.id);
      }
      alert('Foto berhasil ditambahkan ke folder!');
      setManualFotoUrl('');
      fetchAlbumPhotos(activeAdminAlbum.id);
      fetchAlbums();
    } catch (err) {
      console.error('Gagal menambah foto:', err);
      alert('Gagal menambah foto: ' + (err.message || 'Terjadi kesalahan'));
    }
  };

  const handleHapusFoto = async (fotoId) => {
    if (window.confirm('Hapus foto ini dari folder?')) {
      try {
        const { error } = await supabase.from('galeri_foto').delete().eq('id', fotoId);
        if (error) throw error;
        alert('Foto terhapus!');
        if (activeAdminAlbum) {
          fetchAlbumPhotos(activeAdminAlbum.id);
          fetchAlbums();
        }
      } catch (err) {
        console.error('Gagal menghapus foto:', err);
        alert('Gagal menghapus foto: ' + (err.message || 'Terjadi kesalahan'));
      }
    }
  };

  const handleSetCover = async (fotoUrl) => {
    if (!activeAdminAlbum) return;
    try {
      const { error } = await supabase
        .from('galeri_album')
        .update({ cover_foto: fotoUrl })
        .eq('id', activeAdminAlbum.id);
      if (error) throw error;
      setActiveAdminAlbum((prev) => ({ ...prev, cover_foto: fotoUrl }));
      fetchAlbums();
      alert('Cover folder berhasil diperbarui!');
    } catch (err) {
      console.error('Gagal update cover:', err);
      alert('Gagal update cover.');
    }
  };

  // ==========================================
  // FUNGSI FETCH & CRUD GLOBAL
  // ==========================================
  const fetchData = async (koleksi, setter) => {
    try {
      const { data, error } = await supabase
        .from(koleksi)
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      setter(data || []);
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
        ['unduhan', setUnduhanList],
      ];

      await Promise.all(
        pasangan.map(async ([koleksi, setter]) => {
          try {
            const { data, error } = await supabase
              .from(koleksi)
              .select('*')
              .order('created_at', { ascending: false });
            if (error) throw error;
            if (aktif) setter(data || []);
          } catch (error) {
            console.error(`Gagal mengambil data ${koleksi}:`, error);
          }
        })
      );

      if (aktif) {
        fetchAlbums();
        try {
          const { count } = await supabase
            .from('saran')
            .select('*', { count: 'exact', head: true })
            .eq('dibaca', false);
          if (aktif && count !== null) setUnreadSaranCount(count);
        } catch {
          // ignore
        }
      }
    };

    muatSemuaData();
    return () => {
      aktif = false;
    };
  }, [user, fetchAlbums]);

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
        const { error } = await supabase.from(koleksi).update(dataToSave).eq('id', docId);
        if (error) throw error;
        alert('Data berhasil diperbarui!');
      } else {
        const { error } = await supabase.from(koleksi).insert([dataToSave]);
        if (error) throw error;
        alert('Data baru berhasil ditambahkan!');
      }

      fetchData(koleksi, setter);
      setFormData(resetState);
    } catch (error) {
      console.error(`Gagal menyimpan ${koleksi}:`, error);
      alert('Gagal menyimpan data: ' + (error.message || 'Terjadi kesalahan'));
    }
  };

  const handleHapus = async (koleksi, id, setter) => {
    if (window.confirm('Yakin ingin menghapus data ini secara permanen?')) {
      try {
        const { error } = await supabase.from(koleksi).delete().eq('id', id);
        if (error) throw error;
        alert('Data terhapus!');
        fetchData(koleksi, setter);
      } catch (error) {
        console.error(`Gagal menghapus ${koleksi}:`, error);
        alert('Gagal menghapus data: ' + (error.message || 'Terjadi kesalahan'));
      }
    }
  };

  // ==========================================
  // TAMPILAN LOGIN (Fullscreen Three.js + Logo, Tanpa Header & Footer)
  // ==========================================
  if (!user) {
    return (
      <div className="min-h-screen relative flex items-center justify-center px-4 py-8 overflow-hidden">
        <AdminLoginBackground />

        <div className="relative z-10 max-w-md w-full bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-3xl border-2 border-emerald-950 shadow-[5px_5px_0px_#fbbf24] sm:shadow-[8px_8px_0px_#fbbf24] p-5 sm:p-10 animate-fade-in">
          {/* Logo Sekolah & Judul */}
          <div className="text-center mb-6 sm:mb-8">
            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-4 rounded-2xl bg-white border-2 border-emerald-950 shadow-[3px_3px_0px_#0d9488] sm:shadow-[4px_4px_0px_#0d9488] p-1.5 sm:p-2 flex items-center justify-center">
              <img
                src={logoSekolah}
                alt="Logo RA Persis 175 At-Tajdid"
                className="w-full h-full object-contain"
              />
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-emerald-950 tracking-tight">ADMIN LOGIN</h1>
            <p className="text-slate-600 text-xs sm:text-sm font-medium mt-1">
              Masuk untuk mengelola konten website sekolah
            </p>
          </div>

          <form onSubmit={tanganiLogin} className="space-y-4 sm:space-y-5">
            <div>
              <label className="block text-[11px] sm:text-xs font-black uppercase tracking-wider text-emerald-950 mb-1.5">
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
                  className="w-full pl-11 pr-4 py-2.5 sm:py-3.5 bg-teal-50/70 border-2 border-emerald-950 rounded-xl focus:bg-white focus:ring-2 focus:ring-amber-400 outline-none font-semibold text-slate-900 text-sm sm:text-base"
                  placeholder="admin@attajdid.sch.id"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] sm:text-xs font-black uppercase tracking-wider text-emerald-950 mb-1.5">
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
                  className="w-full pl-11 pr-4 py-2.5 sm:py-3.5 bg-teal-50/70 border-2 border-emerald-950 rounded-xl focus:bg-white focus:ring-2 focus:ring-amber-400 outline-none font-semibold text-slate-900 text-sm sm:text-base"
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
              className="w-full inline-flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-black py-3 sm:py-4 rounded-xl border-2 border-emerald-950 shadow-[3px_3px_0px_#064e3b] sm:shadow-[4px_4px_0px_#064e3b] hover:shadow-[2px_2px_0px_#064e3b] hover:translate-x-[2px] hover:translate-y-[2px] transition-all text-sm sm:text-base cursor-pointer"
            >
              <LogIn size={18} />
              MASUK
            </button>
          </form>

          <div className="mt-5 sm:mt-6 pt-4 sm:pt-5 border-t border-emerald-950/15 text-center">
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
    {
      id: 'berita',
      label: 'Kelola Berita',
      icon: Megaphone,
      count: beritaList.length,
      activeClass: 'bg-teal-200',
    },
    {
      id: 'pengurus',
      label: 'Data Pengurus & Guru',
      icon: Users,
      count: pengurusList.length,
      activeClass: 'bg-emerald-200',
    },
    {
      id: 'galeri',
      label: 'Folder Galeri Foto',
      icon: Images,
      count: albumList.length,
      activeClass: 'bg-amber-300',
    },
    {
      id: 'download',
      label: 'File Download',
      icon: FolderDown,
      count: unduhanList.length,
      activeClass: 'bg-sky-200',
    },
    {
      id: 'saran',
      label: 'Kotak Saran Masuk',
      icon: MessageSquareHeart,
      count: unreadSaranCount > 0 ? `${unreadSaranCount} Baru` : null,
      activeClass: 'bg-rose-200',
      isAlert: unreadSaranCount > 0,
    },
  ];

  const activeTabInfo = navTabs.find((t) => t.id === activeTab) || navTabs[0];

  const inputClass =
    'w-full px-4 py-2.5 sm:py-3 bg-white rounded-xl border-2 border-emerald-950/25 focus:border-emerald-950 focus:ring-2 focus:ring-amber-400 outline-none font-medium text-slate-900 text-sm sm:text-base transition';

  return (
    <div className="h-screen bg-slate-100/70 flex flex-col lg:flex-row text-slate-900 font-sans antialiased overflow-hidden">
      {/* 1. BACKDROP MOBILE KETIKA SIDEBAR TERBUKA */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-emerald-950/60 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* 2. SIDEBAR KEKINIAN (BISA BUKA-TUTUP / COLLAPSIBLE - SELALU FULL HEIGHT & TERKUNCI DI VIEWPORT) */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 bg-white border-r-2 border-emerald-950 flex flex-col justify-between transition-all duration-300 ease-in-out lg:static lg:h-screen shrink-0 shadow-2xl lg:shadow-none ${
          mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } ${sidebarCollapsed ? 'lg:w-20' : 'lg:w-72 w-72'}`}
      >
        {/* SIDEBAR HEADER / BRANDING (Tepat h-16 selaras dengan topbar) */}
        {sidebarCollapsed ? (
          <div className="h-16 px-2 border-b-2 border-emerald-950/15 flex items-center justify-center shrink-0">
            <div className="w-10 h-10 rounded-xl bg-amber-300 border-2 border-emerald-950 p-1 flex items-center justify-center shadow-[2px_2px_0px_#064e3b]">
              <img
                src={logoSekolah}
                alt="Logo"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        ) : (
          <div className="h-16 px-4 border-b-2 border-emerald-950/15 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-amber-300 border-2 border-emerald-950 p-1 flex items-center justify-center shrink-0 shadow-[2px_2px_0px_#064e3b]">
                <img src={logoSekolah} alt="Logo" className="w-full h-full object-contain" />
              </div>
              <div className="min-w-0">
                <h1 className="text-xs font-black text-emerald-950 uppercase tracking-tight truncate">
                  RA PERSIS 175
                </h1>
                <p className="text-[10px] font-bold text-emerald-700 truncate">
                  Portal Admin
                </p>
              </div>
            </div>

            {/* Tombol Tutup di Mobile saja */}
            <button
              type="button"
              onClick={() => setMobileSidebarOpen(false)}
              className="lg:hidden p-1.5 rounded-lg border-2 border-emerald-950 text-emerald-950 hover:bg-rose-100 transition cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>
        )}

        {/* DAFTAR MENU NAVIGASI (Vertical Menu) */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden px-3 py-3 space-y-2">
          {!sidebarCollapsed && (
            <p className="px-3 text-[10px] font-black uppercase tracking-wider text-slate-500 mb-2">
              Menu Dashboard
            </p>
          )}

          {navTabs.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            if (sidebarCollapsed) {
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveTab(item.id)}
                  title={item.count !== undefined && item.count !== null ? `${item.label} (${item.count})` : item.label}
                  className={`w-11 h-11 mx-auto flex items-center justify-center rounded-xl border-2 transition-all cursor-pointer relative ${
                    isActive
                      ? `${item.activeClass} text-emerald-950 border-emerald-950 shadow-[2px_2px_0px_#064e3b]`
                      : 'bg-transparent text-slate-600 border-transparent hover:bg-slate-100 hover:text-emerald-950'
                  }`}
                >
                  <Icon size={19} className="shrink-0" />

                  {item.isAlert && (
                    <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white animate-pulse" />
                  )}
                </button>
              );
            }

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileSidebarOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 sm:py-3 rounded-xl font-black text-xs sm:text-sm border-2 transition-all cursor-pointer ${
                  isActive
                    ? `${item.activeClass} text-emerald-950 border-emerald-950 shadow-[3px_3px_0px_#064e3b] translate-x-1`
                    : 'bg-transparent text-slate-700 border-transparent hover:bg-slate-100 hover:text-emerald-950'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Icon size={18} className="shrink-0" />
                  <span className="truncate">{item.label}</span>
                </div>

                {item.count !== undefined && item.count !== null && (
                  <span
                    className={`text-[10px] font-black px-2 py-0.5 rounded-full border border-emerald-950 shrink-0 ${
                      item.isAlert
                        ? 'bg-rose-500 text-white animate-bounce'
                        : 'bg-white text-emerald-950'
                    }`}
                  >
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* SIDEBAR FOOTER / PROFIL ADMIN (Desain Konsisten, Modern & Terpadu) */}
        {!sidebarCollapsed ? (
          <div className="p-3 sm:p-4 border-t-2 border-emerald-950/15 bg-slate-50/90 shrink-0">
            {/* Kartu Profil Terpadu */}
            <div className="p-2.5 bg-white rounded-2xl border-2 border-emerald-950 shadow-[2px_2px_0px_#064e3b] flex items-center justify-between gap-2.5">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="relative shrink-0">
                  <div className="w-9 h-9 rounded-xl bg-emerald-800 text-white font-black text-xs flex items-center justify-center border-2 border-emerald-950 shadow-sm">
                    AD
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-black text-emerald-950 truncate leading-snug">
                    Administrator
                  </p>
                  <p className="text-[10px] font-semibold text-slate-500 truncate" title={user?.email}>
                    {user?.email || 'admin@attajdid.sch.id'}
                  </p>
                </div>
              </div>

              {/* Tombol Logout Rapi & Konsisten */}
              <button
                type="button"
                onClick={tanganiLogout}
                className="w-8 h-8 rounded-xl flex items-center justify-center text-slate-400 hover:text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-200 transition cursor-pointer shrink-0"
                title="Keluar / Logout"
              >
                <LogOut size={16} />
              </button>
            </div>
          </div>
        ) : (
          <div className="p-3 border-t-2 border-emerald-950/15 bg-slate-50/90 flex flex-col items-center gap-2.5 shrink-0">
            {/* Avatar Collapsed dengan Status Online */}
            <div
              className="relative cursor-default"
              title={`${user?.email || 'Administrator'} (Online • Super Admin)`}
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-800 text-white font-black text-xs flex items-center justify-center border-2 border-emerald-950 shadow-sm">
                AD
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full" />
            </div>

            {/* Logout Collapsed */}
            <button
              type="button"
              onClick={tanganiLogout}
              className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-500 hover:text-rose-600 hover:bg-rose-50 border-2 border-transparent hover:border-rose-200 transition cursor-pointer"
              title="Keluar / Logout"
            >
              <LogOut size={16} />
            </button>
          </div>
        )}
      </aside>

      {/* 3. MAIN WORKSPACE AREA (h-screen terpisah, konten memiliki scroll mandiri) */}
      <div className="flex-1 min-w-0 flex flex-col h-screen overflow-hidden bg-slate-50">
        {/* STICKY TOP NAVBAR (Tepat h-16 selaras sempurna dengan header sidebar) */}
        <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b-2 border-emerald-950/15 px-4 sm:px-6 h-16 shrink-0 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            {/* Hamburger button (Mobile) */}
            <button
              type="button"
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl bg-amber-300 hover:bg-amber-400 border-2 border-emerald-950 shadow-[2px_2px_0px_#064e3b] text-emerald-950 transition cursor-pointer"
              title="Buka Menu"
            >
              <Menu size={18} />
            </button>

            {/* Desktop Quick Toggle Sidebar Button (Satu-satunya tombol pembuka/penutup sidebar di desktop) */}
            <button
              type="button"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="hidden lg:flex items-center justify-center w-9 h-9 rounded-xl border-2 border-emerald-950/20 hover:border-emerald-950 bg-slate-50 hover:bg-amber-200 text-emerald-950 shadow-sm hover:shadow-[2px_2px_0px_#064e3b] transition cursor-pointer"
              title={sidebarCollapsed ? 'Perluas Sidebar' : 'Perkecil Sidebar'}
            >
              {sidebarCollapsed ? <PanelLeftOpen size={17} /> : <PanelLeftClose size={17} />}
            </button>

            {/* Breadcrumb Navigation */}
            <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
              <span className="hidden sm:inline">Admin</span>
              <span className="text-slate-300 hidden sm:inline">/</span>
              <span className="inline-flex items-center gap-1.5 font-black text-sm sm:text-base text-emerald-950">
                {activeTabInfo?.label}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Tanggal Hari Ini */}
            <div className="hidden md:inline-flex items-center gap-1.5 bg-slate-50 border border-emerald-950/20 px-3 py-1.5 rounded-xl text-xs font-bold text-emerald-950">
              <Calendar size={13} className="text-emerald-700" />
              <span>
                {new Date().toLocaleDateString('id-ID', {
                  weekday: 'short',
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </span>
            </div>

            {/* Shortcut Video Panduan Admin */}
            <Link
              to="/panduan"
              className="inline-flex items-center gap-1.5 bg-amber-300 hover:bg-amber-400 text-emerald-950 px-3 py-1.5 rounded-xl font-black border border-emerald-950 text-xs shadow-sm hover:shadow transition"
              title="Tonton Video Panduan Penggunaan & Pengenalan"
            >
              <PlayCircle size={14} className="fill-emerald-950 text-amber-300" />
              <span className="hidden sm:inline">Video Panduan</span>
            </Link>

            {/* Shortcut Lihat Website (Satu-satunya link ke website) */}
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 bg-teal-50 hover:bg-teal-100 text-emerald-950 px-3.5 py-1.5 rounded-xl font-black border border-emerald-950/30 text-xs shadow-sm hover:shadow transition"
            >
              <ExternalLink size={13} />
              <span className="hidden sm:inline">Lihat Website</span>
            </Link>
          </div>
        </header>

        {/* WORKSPACE CONTENT AREA (Scroll mandiri tanpa menggeser sidebar) */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-6xl mx-auto space-y-6">
            {/* KONTEN TAB UTAMA */}
            <main className="bg-white rounded-2xl sm:rounded-3xl border-2 border-emerald-950 shadow-[4px_4px_0px_#064e3b] sm:shadow-[6px_6px_0px_#064e3b] p-4 sm:p-6 md:p-8">

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
                  className="bg-slate-50 border-2 border-emerald-950/20 rounded-2xl p-5 sm:p-6 mb-8 space-y-4 shadow-sm"
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

                  <div className="space-y-2">
                    <label className="block text-[11px] sm:text-xs font-black uppercase text-emerald-950">
                      Foto Sampul Berita (Opsional)
                    </label>
                    <div className="flex flex-col sm:flex-row gap-2.5 items-stretch sm:items-center">
                      <label className="inline-flex items-center justify-center gap-2 bg-white hover:bg-emerald-50 text-emerald-950 px-4 py-2.5 rounded-xl border-2 border-emerald-950 font-extrabold text-xs shadow-[2px_2px_0px_#064e3b] cursor-pointer transition shrink-0">
                        <Upload size={15} />
                        <span>{uploadingImage ? 'Mengunggah...' : 'Pilih Foto dari Perangkat'}</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          disabled={uploadingImage}
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const url = await uploadFileToSupabase(file, 'berita');
                              if (url) setFormBerita((prev) => ({ ...prev, gambar: url }));
                            }
                          }}
                        />
                      </label>
                      <span className="text-xs font-bold text-slate-500 text-center sm:text-left">atau link:</span>
                      <input
                        type="url"
                        value={formBerita.gambar}
                        onChange={(e) => setFormBerita({ ...formBerita, gambar: e.target.value })}
                        placeholder="https://... (URL Foto)"
                        className={`flex-1 ${inputClass}`}
                      />
                    </div>
                    {formBerita.gambar && (
                      <div className="flex items-center gap-3 p-2 bg-white rounded-xl border-2 border-emerald-950/20 shadow-sm">
                        <img
                          src={formBerita.gambar}
                          alt="Preview"
                          className="w-12 h-12 object-cover rounded-lg border border-emerald-950 shrink-0"
                        />
                        <span className="text-xs font-bold text-emerald-900 truncate flex-1">
                          {formBerita.gambar}
                        </span>
                        <button
                          type="button"
                          onClick={() => setFormBerita((prev) => ({ ...prev, gambar: '' }))}
                          className="text-rose-600 hover:text-rose-800 text-xs font-black px-2 py-1"
                        >
                          Hapus
                        </button>
                      </div>
                    )}
                  </div>

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
                  className="bg-slate-50 border-2 border-emerald-950/20 rounded-2xl p-5 sm:p-6 mb-8 space-y-4 shadow-sm"
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
                  <div className="space-y-2">
                    <label className="block text-[11px] sm:text-xs font-black uppercase text-emerald-950">
                      Foto Pengurus / Guru
                    </label>
                    <div className="flex flex-col sm:flex-row gap-2.5 items-stretch sm:items-center">
                      <label className="inline-flex items-center justify-center gap-2 bg-white hover:bg-emerald-50 text-emerald-950 px-4 py-2.5 rounded-xl border-2 border-emerald-950 font-extrabold text-xs shadow-[2px_2px_0px_#064e3b] cursor-pointer transition shrink-0">
                        <Upload size={15} />
                        <span>{uploadingImage ? 'Mengunggah...' : 'Pilih Foto dari Perangkat'}</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          disabled={uploadingImage}
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const url = await uploadFileToSupabase(file, 'pengurus');
                              if (url) setFormPengurus((prev) => ({ ...prev, foto: url }));
                            }
                          }}
                        />
                      </label>
                      <span className="text-xs font-bold text-slate-500 text-center sm:text-left">atau link:</span>
                      <input
                        type="url"
                        value={formPengurus.foto}
                        onChange={(e) => setFormPengurus({ ...formPengurus, foto: e.target.value })}
                        placeholder="https://... (URL Foto)"
                        className={`flex-1 ${inputClass}`}
                        required
                      />
                    </div>
                    {formPengurus.foto && (
                      <div className="flex items-center gap-3 p-2 bg-white rounded-xl border-2 border-emerald-950/20 shadow-sm">
                        <img
                          src={formPengurus.foto}
                          alt="Preview"
                          className="w-12 h-12 rounded-full object-cover border border-emerald-950 shrink-0"
                        />
                        <span className="text-xs font-bold text-emerald-900 truncate flex-1">
                          {formPengurus.foto}
                        </span>
                        <button
                          type="button"
                          onClick={() => setFormPengurus((prev) => ({ ...prev, foto: '' }))}
                          className="text-rose-600 hover:text-rose-800 text-xs font-black px-2 py-1"
                        >
                          Hapus
                        </button>
                      </div>
                    )}
                  </div>
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
            {/* TAB 3: KELOLA FOLDER & ALBUM GALERI */}
            {/* ========================================================= */}
            {activeTab === 'galeri' && (
              <div className="animate-fade-in">
                {!activeAdminAlbum ? (
                  /* ========================================================= */
                  /* SUB-VIEW A: DAFTAR FOLDER KEGIATAN & FORM BUAT FOLDER */
                  /* ========================================================= */
                  <div>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6 border-b-2 border-emerald-950/15 pb-4">
                      <div>
                        <h3 className="text-xl sm:text-2xl font-black text-emerald-950">
                          FOLDER & ALBUM DOKUMENTASI
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1">
                          Foto dikelompokkan per kegiatan agar rapi seperti Google Drive & mudah dicari oleh wali murid.
                        </p>
                      </div>
                    </div>

                    {/* FORM BUAT / EDIT FOLDER KEGIATAN */}
                    <form
                      onSubmit={handleSimpanAlbum}
                      className="bg-slate-50 border-2 border-emerald-950/20 rounded-2xl p-5 sm:p-6 mb-8 space-y-4 shadow-sm"
                    >
                      <div className="flex items-center gap-2 text-emerald-950 font-black text-sm uppercase">
                        <FolderPlus size={18} />
                        <span>{formAlbum.id ? 'Edit Informasi Folder' : 'Buat Folder Kegiatan Baru'}</span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[11px] font-black uppercase text-emerald-950 mb-1">
                            Nama Kegiatan / Acara *
                          </label>
                          <input
                            type="text"
                            value={formAlbum.judul}
                            onChange={(e) => setFormAlbum({ ...formAlbum, judul: e.target.value })}
                            placeholder="cth: Manasik Haji Cilik 2026"
                            className={inputClass}
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-black uppercase text-emerald-950 mb-1">
                            Tanggal Kegiatan *
                          </label>
                          <input
                            type="text"
                            value={formAlbum.tanggal}
                            onChange={(e) => setFormAlbum({ ...formAlbum, tanggal: e.target.value })}
                            placeholder="cth: 14 November 2026"
                            className={inputClass}
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-black uppercase text-emerald-950 mb-1">
                          Deskripsi / Catatan Kegiatan (Opsional)
                        </label>
                        <textarea
                          value={formAlbum.deskripsi}
                          onChange={(e) => setFormAlbum({ ...formAlbum, deskripsi: e.target.value })}
                          placeholder="Keterangan singkat tentang kegiatan ananda di acara ini..."
                          className={inputClass}
                          rows="2"
                        />
                      </div>

                      <div className="flex flex-wrap gap-3 pt-1">
                        <button
                          type="submit"
                          className="bg-emerald-700 hover:bg-emerald-800 text-white font-black py-2.5 sm:py-3 px-6 rounded-xl border-2 border-emerald-950 shadow-[3px_3px_0px_#064e3b] cursor-pointer text-xs sm:text-sm"
                        >
                          {formAlbum.id ? 'Perbarui Folder' : '➕ Buat Folder Kegiatan'}
                        </button>
                        {formAlbum.id && (
                          <button
                            type="button"
                            onClick={() =>
                              setFormAlbum({ id: '', judul: '', tanggal: '', deskripsi: '', cover_foto: '' })
                            }
                            className="bg-white hover:bg-slate-100 text-emerald-950 px-5 py-2.5 rounded-xl font-extrabold border-2 border-emerald-950 cursor-pointer text-xs sm:text-sm"
                          >
                            Batal
                          </button>
                        )}
                      </div>
                    </form>

                    {/* DAFTAR FOLDER ALBUM */}
                    <div className="space-y-4">
                      <h4 className="font-black text-emerald-950 text-sm uppercase tracking-wider flex items-center gap-2">
                        <span>📁</span> Daftar Folder yang Tersedia ({albumList.length})
                      </h4>

                      {albumList.length === 0 ? (
                        <div className="bg-teal-50 border-2 border-dashed border-emerald-950/40 rounded-2xl p-8 text-center">
                          <p className="text-4xl mb-2">📂</p>
                          <h5 className="font-black text-emerald-950">Belum Ada Folder Kegiatan</h5>
                          <p className="text-xs text-slate-600 mt-1">
                            Buat folder pertama Anda menggunakan form di atas untuk mulai mengelompokkan foto kegiatan.
                          </p>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {albumList.map((album) => {
                            const totalFoto = album.galeri_foto?.length || 0;
                            const cover = album.cover_foto || album.galeri_foto?.[0]?.foto;

                            return (
                              <div
                                key={album.id}
                                className="bg-white rounded-2xl border-2 border-emerald-950 shadow-[4px_4px_0px_#064e3b] p-4 flex flex-col justify-between hover:shadow-[6px_6px_0px_#064e3b] transition"
                              >
                                <div>
                                  <div className="flex gap-3 items-start">
                                    <div className="w-16 h-16 rounded-xl border-2 border-emerald-950 overflow-hidden bg-amber-100 shrink-0 flex items-center justify-center">
                                      {cover ? (
                                        <img src={cover} alt="" className="w-full h-full object-cover" />
                                      ) : (
                                        <Folder size={28} className="text-amber-500" />
                                      )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <div className="flex flex-wrap items-center gap-1.5 mb-1">
                                        <span className="bg-amber-300 text-emerald-950 text-[10px] font-black px-2 py-0.5 rounded-md border border-emerald-950">
                                          {album.tanggal || 'Kegiatan'}
                                        </span>
                                        <span className="bg-teal-100 text-emerald-950 text-[10px] font-black px-2 py-0.5 rounded-md border border-emerald-950">
                                          {totalFoto} Foto
                                        </span>
                                      </div>
                                      <h4 className="font-extrabold text-emerald-950 text-sm truncate">
                                        {album.judul}
                                      </h4>
                                      {album.deskripsi && (
                                        <p className="text-xs text-slate-600 line-clamp-1 mt-0.5 font-medium">
                                          {album.deskripsi}
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                </div>

                                <div className="mt-4 pt-3 border-t-2 border-emerald-950/10 flex flex-wrap items-center gap-2">
                                  <button
                                    type="button"
                                    onClick={() => handleBukaFolder(album)}
                                    className="flex-1 inline-flex items-center justify-center gap-1.5 bg-emerald-700 hover:bg-emerald-800 text-white px-3.5 py-2 rounded-xl text-xs font-black border-2 border-emerald-950 shadow-[2px_2px_0px_#064e3b] transition cursor-pointer whitespace-nowrap"
                                  >
                                    <FolderOpen size={14} /> Buka & Upload Foto
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setFormAlbum(album);
                                      window.scrollTo({ top: 300, behavior: 'smooth' });
                                    }}
                                    className="inline-flex items-center gap-1 bg-sky-100 hover:bg-sky-200 text-emerald-950 px-3 py-2 rounded-xl text-xs font-black border-2 border-emerald-950 cursor-pointer"
                                    title="Edit Info Folder"
                                  >
                                    <Edit3 size={13} /> Edit
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleHapusAlbum(album.id, album.judul)}
                                    className="inline-flex items-center gap-1 bg-rose-500 hover:bg-rose-600 text-white px-3 py-2 rounded-xl text-xs font-black border-2 border-emerald-950 cursor-pointer"
                                    title="Hapus Folder Beserta Isinya"
                                  >
                                    <Trash2 size={13} />
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  /* ========================================================= */
                  /* SUB-VIEW B: DI DALAM FOLDER AKTIF (UPLOAD MULTI FOTO) */
                  /* ========================================================= */
                  <div>
                    {/* Header Navigasi Folder */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6 border-b-2 border-emerald-950/15 pb-4">
                      <button
                        type="button"
                        onClick={() => {
                          setActiveAdminAlbum(null);
                          setAlbumPhotosAdmin([]);
                        }}
                        className="inline-flex items-center gap-1.5 bg-amber-300 hover:bg-amber-400 text-emerald-950 px-4 py-2 rounded-xl font-black border-2 border-emerald-950 shadow-[3px_3px_0px_#064e3b] hover:shadow-[1px_1px_0px_#064e3b] hover:translate-x-[2px] hover:translate-y-[2px] transition text-xs cursor-pointer w-fit"
                      >
                        <ArrowLeft size={15} /> Kembali ke Daftar Folder
                      </button>

                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black bg-teal-100 border border-emerald-950 px-3 py-1 rounded-full text-emerald-950">
                          📁 Sedang di dalam: <strong>{activeAdminAlbum.judul}</strong>
                        </span>
                      </div>
                    </div>

                    {/* BANNER INFORMASI FOLDER */}
                    <div className="bg-teal-100/70 border-2 border-emerald-950 shadow-[4px_4px_0px_#064e3b] rounded-2xl p-4 sm:p-5 mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <div>
                        <div className="inline-flex items-center gap-1 text-[11px] font-black text-emerald-800 uppercase mb-1">
                          <Calendar size={13} /> {activeAdminAlbum.tanggal}
                        </div>
                        <h3 className="text-lg sm:text-xl font-black text-emerald-950">
                          {activeAdminAlbum.judul}
                        </h3>
                        {activeAdminAlbum.deskripsi && (
                          <p className="text-xs text-slate-700 font-medium mt-1">
                            {activeAdminAlbum.deskripsi}
                          </p>
                        )}
                      </div>
                      <div className="bg-white border-2 border-emerald-950 px-3.5 py-2 rounded-xl text-center shrink-0">
                        <p className="text-[10px] font-black uppercase text-emerald-800">Total Foto</p>
                        <p className="text-xl font-black text-emerald-950">{albumPhotosAdmin.length}</p>
                      </div>
                    </div>

                    {/* AREA UPLOAD FOTO MULTI-UPLOAD */}
                    <div className="bg-amber-50 border-2 border-dashed border-emerald-950 rounded-2xl p-5 sm:p-7 mb-8 text-center space-y-4">
                      <div className="max-w-md mx-auto space-y-2">
                        <div className="w-12 h-12 mx-auto rounded-full bg-amber-300 border-2 border-emerald-950 flex items-center justify-center text-emerald-950 shadow-[2px_2px_0px_#064e3b]">
                          <Upload size={22} />
                        </div>
                        <h4 className="font-black text-emerald-950 text-base">
                          Upload Foto ke Folder Ini
                        </h4>
                        <p className="text-xs text-slate-600 font-medium">
                          Anda bisa memilih <strong>banyak foto sekaligus</strong> (10, 20, atau lebih) dari laptop / HP. Foto akan langsung tersimpan ke folder ini.
                        </p>
                      </div>

                      {uploadingImage && (
                        <div className="bg-white border-2 border-emerald-950 p-4 rounded-xl max-w-sm mx-auto shadow-[3px_3px_0px_#064e3b] animate-pulse">
                          <p className="text-xs font-black text-emerald-950">
                            Sedang Mengunggah Foto: {uploadProgress.current} dari {uploadProgress.total} file...
                          </p>
                          <div className="w-full bg-emerald-100 rounded-full h-2.5 mt-2 overflow-hidden border border-emerald-950">
                            <div
                              className="bg-emerald-600 h-2.5 rounded-full transition-all duration-300"
                              style={{
                                width: `${(uploadProgress.current / (uploadProgress.total || 1)) * 100}%`,
                              }}
                            />
                          </div>
                        </div>
                      )}

                      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                        <label className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-emerald-950 px-6 py-3 rounded-xl border-2 border-emerald-950 font-black text-xs sm:text-sm shadow-[3px_3px_0px_#064e3b] cursor-pointer transition">
                          <Plus size={16} />
                          <span>Pilih Banyak Foto dari Perangkat</span>
                          <input
                            type="file"
                            multiple
                            accept="image/*"
                            className="hidden"
                            disabled={uploadingImage}
                            onChange={handleMultiUpload}
                          />
                        </label>
                      </div>

                      {/* Opsi Tambah Foto via Link URL jika ada */}
                      <div className="pt-3 border-t border-emerald-950/15 max-w-lg mx-auto">
                        <p className="text-[11px] font-bold text-slate-500 mb-1.5">
                          Atau masukkan link foto eksternal:
                        </p>
                        <div className="flex gap-2">
                          <input
                            type="url"
                            value={manualFotoUrl}
                            onChange={(e) => setManualFotoUrl(e.target.value)}
                            placeholder="https://... (URL Foto)"
                            className={`text-xs ${inputClass}`}
                          />
                          <button
                            type="button"
                            onClick={() => handleTambahFotoManual(manualFotoUrl)}
                            className="bg-white hover:bg-emerald-50 text-emerald-950 font-black px-4 py-2 rounded-xl border-2 border-emerald-950 text-xs shrink-0 cursor-pointer"
                          >
                            Simpan Link
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* GRID FOTO DI DALAM FOLDER */}
                    <div>
                      <h4 className="font-black text-emerald-950 text-sm uppercase tracking-wider mb-4 flex items-center justify-between">
                        <span>🖼️ Koleksi Foto di Folder ({albumPhotosAdmin.length})</span>
                        <span className="text-xs font-semibold text-slate-500 normal-case">
                          Klik ⭐ untuk jadikan foto sebagai cover folder
                        </span>
                      </h4>

                      {albumPhotosAdmin.length === 0 ? (
                        <div className="bg-white border-2 border-dashed border-emerald-950/40 rounded-2xl p-8 text-center">
                          <p className="text-3xl mb-1">📸</p>
                          <p className="text-xs font-bold text-slate-600">
                            Folder ini masih kosong. Silakan gunakan tombol upload di atas untuk menambahkan foto.
                          </p>
                        </div>
                      ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
                          {albumPhotosAdmin.map((photo) => {
                            const isCover = activeAdminAlbum.cover_foto === photo.foto;

                            return (
                              <div
                                key={photo.id}
                                className={`rounded-xl overflow-hidden border-2 border-emerald-950 bg-white shadow-[3px_3px_0px_#064e3b] flex flex-col group relative ${
                                  isCover ? 'ring-2 ring-amber-400' : ''
                                }`}
                              >
                                <div className="aspect-square overflow-hidden relative bg-slate-100">
                                  <img
                                    src={photo.foto}
                                    alt=""
                                    className="w-full h-full object-cover group-hover:scale-105 transition"
                                  />
                                  {isCover && (
                                    <div className="absolute top-1.5 left-1.5 bg-amber-300 border border-emerald-950 text-emerald-950 text-[10px] font-black px-2 py-0.5 rounded-md shadow-sm flex items-center gap-1">
                                      <Star size={10} className="fill-emerald-950" /> Cover
                                    </div>
                                  )}
                                </div>
                                <div className="p-2 bg-white flex items-center justify-between gap-1 border-t-2 border-emerald-950">
                                  {!isCover ? (
                                    <button
                                      type="button"
                                      onClick={() => handleSetCover(photo.foto)}
                                      className="text-[10px] font-black text-emerald-900 bg-amber-200 hover:bg-amber-300 px-2 py-1 rounded-lg border border-emerald-950 transition cursor-pointer flex items-center gap-1"
                                      title="Jadikan Foto Sampul Album"
                                    >
                                      <Star size={11} /> Cover
                                    </button>
                                  ) : (
                                    <span className="text-[10px] font-black text-emerald-700 px-1">
                                      Sampul Aktif
                                    </span>
                                  )}

                                  <button
                                    type="button"
                                    onClick={() => handleHapusFoto(photo.id)}
                                    className="text-white bg-rose-500 hover:bg-rose-600 p-1.5 rounded-lg border border-emerald-950 transition cursor-pointer"
                                    title="Hapus Foto"
                                  >
                                    <Trash2 size={12} />
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                )}
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
                  className="bg-slate-50 border-2 border-emerald-950/20 rounded-2xl p-5 sm:p-6 mb-8 space-y-4 shadow-sm"
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
                  <div className="space-y-2">
                    <label className="block text-[11px] sm:text-xs font-black uppercase text-emerald-950">
                      File Dokumen / Link Unduhan
                    </label>
                    <div className="flex flex-col sm:flex-row gap-2.5 items-stretch sm:items-center">
                      <label className="inline-flex items-center justify-center gap-2 bg-white hover:bg-emerald-50 text-emerald-950 px-4 py-2.5 rounded-xl border-2 border-emerald-950 font-extrabold text-xs shadow-[2px_2px_0px_#064e3b] cursor-pointer transition shrink-0">
                        <Upload size={15} />
                        <span>{uploadingImage ? 'Mengunggah...' : 'Pilih Berkas dari Perangkat'}</span>
                        <input
                          type="file"
                          className="hidden"
                          disabled={uploadingImage}
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const ext = file.name.split('.').pop().toUpperCase();
                              const url = await uploadFileToSupabase(file, 'unduhan');
                              if (url) {
                                setFormUnduhan((prev) => ({
                                  ...prev,
                                  link: url,
                                  format: ['PDF', 'DOCX', 'JPG'].includes(ext) ? ext : 'PDF',
                                  nama: prev.nama || file.name.replace(/\.[^/.]+$/, ''),
                                }));
                              }
                            }
                          }}
                        />
                      </label>
                      <span className="text-xs font-bold text-slate-500 text-center sm:text-left">atau link:</span>
                      <input
                        type="url"
                        value={formUnduhan.link}
                        onChange={(e) => setFormUnduhan({ ...formUnduhan, link: e.target.value })}
                        placeholder="https://... (Google Drive / Direct URL)"
                        className={`flex-1 ${inputClass}`}
                        required
                      />
                    </div>
                    {formUnduhan.link && (
                      <div className="flex items-center gap-3 p-2 bg-white rounded-xl border-2 border-emerald-950/20 shadow-sm">
                        <span className="text-xs font-bold text-emerald-900 truncate flex-1">
                          {formUnduhan.link}
                        </span>
                        <button
                          type="button"
                          onClick={() => setFormUnduhan((prev) => ({ ...prev, link: '' }))}
                          className="text-rose-600 hover:text-rose-800 text-xs font-black px-2 py-1"
                        >
                          Hapus
                        </button>
                      </div>
                    )}
                  </div>
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
  </div>
);
}

export default Admin;
