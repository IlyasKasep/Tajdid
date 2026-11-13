import { useState, useEffect, useCallback } from 'react';
import {
  ArrowLeft,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Folder,
  FolderOpen,
  Images,
  X,
  ZoomIn,
} from 'lucide-react';
import { supabase } from '../supabase';

function Galeri() {
  const [albums, setAlbums] = useState([]);
  const [activeAlbum, setActiveAlbum] = useState(null);
  const [albumPhotos, setAlbumPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingPhotos, setLoadingPhotos] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  useEffect(() => {
    let aktif = true;

    const ambilSemuaAlbum = async () => {
      try {
        const { data, error } = await supabase
          .from('galeri_album')
          .select(`
            *,
            galeri_foto (id, foto)
          `)
          .order('created_at', { ascending: false });

        if (error) throw error;
        if (aktif) setAlbums(data || []);
      } catch (err) {
        console.error('Gagal memuat album galeri:', err);
      } finally {
        if (aktif) setLoading(false);
      }
    };

    ambilSemuaAlbum();
    return () => {
      aktif = false;
    };
  }, []);

  // Buka folder kegiatan & muat seluruh foto di dalamnya
  const bukaAlbum = async (album) => {
    setActiveAlbum(album);
    setLoadingPhotos(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    try {
      const { data, error } = await supabase
        .from('galeri_foto')
        .select('*')
        .eq('album_id', album.id)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setAlbumPhotos(data || []);
    } catch (err) {
      console.error('Gagal memuat foto album:', err);
      setAlbumPhotos(album.galeri_foto || []);
    } finally {
      setLoadingPhotos(false);
    }
  };

  const kembaliKeDaftarAlbum = () => {
    setActiveAlbum(null);
    setAlbumPhotos([]);
    setLightboxIndex(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Navigasi Lightbox (Keyboard & Buttons)
  const nextPhoto = useCallback(() => {
    if (lightboxIndex !== null && albumPhotos.length > 0) {
      setLightboxIndex((prev) => (prev + 1) % albumPhotos.length);
    }
  }, [lightboxIndex, albumPhotos.length]);

  const prevPhoto = useCallback(() => {
    if (lightboxIndex !== null && albumPhotos.length > 0) {
      setLightboxIndex((prev) => (prev - 1 + albumPhotos.length) % albumPhotos.length);
    }
  }, [lightboxIndex, albumPhotos.length]);

  useEffect(() => {
    if (lightboxIndex === null) return undefined;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') nextPhoto();
      if (e.key === 'ArrowLeft') prevPhoto();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, nextPhoto, prevPhoto]);

  return (
    <main className="min-h-screen bg-teal-50 py-8 sm:py-14 px-4 sm:px-6 relative">
      <div className="max-w-6xl mx-auto">
        {/* ========================================================= */}
        {/* VIEW 1: DAFTAR FOLDER / ALBUM KEGIATAN */}
        {/* ========================================================= */}
        {!activeAlbum ? (
          <div>
            {/* Header Halaman */}
            <div className="text-center mb-8 sm:mb-14 space-y-2.5 sm:space-y-3">
              <span className="inline-flex items-center gap-1.5 bg-rose-200 text-emerald-950 text-[11px] sm:text-xs font-black uppercase tracking-widest px-3.5 sm:px-4 py-1.5 rounded-full border-2 border-emerald-950 shadow-[2px_2px_0px_#064e3b]">
                <Images size={14} /> Dokumentasi Kegiatan Sekolah
              </span>
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-emerald-950 tracking-tight">
                Galeri & Album Foto
              </h1>
              <p className="text-slate-600 font-medium text-xs sm:text-base max-w-xl mx-auto">
                Setiap momen belajar, bermain, dan bertumbuh ananda di RA Persis 175 At-Tajdid tertata rapi dalam album kegiatan.
              </p>
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-16 sm:py-24 text-emerald-800">
                <div className="w-10 h-10 sm:w-12 sm:h-12 border-4 border-emerald-200 border-t-emerald-700 rounded-full animate-spin mb-4" />
                <p className="font-bold animate-pulse text-sm">Menyiapkan album kegiatan...</p>
              </div>
            ) : albums.length === 0 ? (
              <div className="text-center py-14 sm:py-20 bg-white rounded-2xl sm:rounded-3xl border-2 border-emerald-950 shadow-[5px_5px_0px_#064e3b] sm:shadow-[7px_7px_0px_#064e3b] max-w-md mx-auto p-6">
                <p className="text-4xl sm:text-5xl mb-3">📁</p>
                <h3 className="font-black text-emerald-950 text-base sm:text-lg mb-1">Belum Ada Album Kegiatan</h3>
                <p className="text-slate-600 font-medium text-xs sm:text-sm">
                  Foto-foto kegiatan sekolah akan segera diunggah oleh pihak sekolah ke dalam folder album.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-7">
                {albums.map((album) => {
                  const totalFoto = album.galeri_foto?.length || 0;
                  const cover = album.cover_foto || album.galeri_foto?.[0]?.foto;

                  return (
                    <div
                      key={album.id}
                      onClick={() => bukaAlbum(album)}
                      className="group bg-white rounded-2xl border-2 border-emerald-950 shadow-[4px_4px_0px_#064e3b] sm:shadow-[6px_6px_0px_#064e3b] hover:-translate-y-1.5 hover:shadow-[8px_8px_0px_#064e3b] transition-all overflow-hidden flex flex-col cursor-pointer"
                    >
                      {/* Cover Album / Folder */}
                      <div className="aspect-[16/10] sm:aspect-[4/3] relative overflow-hidden bg-emerald-100/70 border-b-2 border-emerald-950">
                        {cover ? (
                          <img
                            src={cover}
                            alt={album.judul}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center text-emerald-900 bg-amber-50">
                            <Folder size={48} className="text-amber-500 mb-2 stroke-[1.5]" />
                            <span className="text-xs font-black uppercase tracking-wider text-emerald-950">
                              Album Kosong
                            </span>
                          </div>
                        )}

                        {/* Badge Tanggal Kegiatan */}
                        <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 bg-amber-300 border-2 border-emerald-950 px-2.5 sm:px-3 py-1 rounded-full shadow-[2px_2px_0px_#064e3b] flex items-center gap-1.5">
                          <Calendar size={12} className="text-emerald-950" />
                          <span className="text-[10px] sm:text-[11px] font-black text-emerald-950">
                            {album.tanggal || 'Kegiatan Sekolah'}
                          </span>
                        </div>

                        {/* Badge Jumlah Foto */}
                        <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 bg-white/95 backdrop-blur-sm border-2 border-emerald-950 px-2.5 py-1 rounded-full shadow-[2px_2px_0px_#064e3b] flex items-center gap-1.5">
                          <Images size={12} className="text-emerald-800" />
                          <span className="text-[10px] sm:text-[11px] font-black text-emerald-950">
                            {totalFoto} Foto
                          </span>
                        </div>

                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-emerald-950/40 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
                          <span className="inline-flex items-center gap-1.5 bg-amber-300 text-emerald-950 font-black text-xs px-4 py-2 rounded-full border-2 border-emerald-950 shadow-[3px_3px_0px_#064e3b] transform scale-95 group-hover:scale-100 transition">
                            <FolderOpen size={15} /> Buka Folder
                          </span>
                        </div>
                      </div>

                      {/* Info Folder */}
                      <div className="p-4 sm:p-5 flex flex-col flex-grow justify-between">
                        <div>
                          <h3 className="font-black text-emerald-950 text-base sm:text-lg mb-1.5 group-hover:text-emerald-700 transition line-clamp-2">
                            {album.judul}
                          </h3>
                          {album.deskripsi && (
                            <p className="text-slate-600 text-xs sm:text-sm font-medium line-clamp-2 leading-relaxed mb-3">
                              {album.deskripsi}
                            </p>
                          )}
                        </div>

                        <div className="pt-3 border-t-2 border-emerald-950/10 flex items-center justify-between mt-auto">
                          <span className="text-[11px] sm:text-xs font-black text-emerald-800 uppercase tracking-wider flex items-center gap-1">
                            <FolderOpen size={14} /> Lihat Foto
                          </span>
                          <span className="text-xs font-black text-emerald-950 bg-teal-100 border border-emerald-950 px-2.5 py-0.5 rounded-lg group-hover:bg-amber-300 transition">
                            ➔
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ) : (
          /* ========================================================= */
          /* VIEW 2: ISI FOLDER / FOTO-FOTO KEGIATAN */
          /* ========================================================= */
          <div className="animate-fade-in">
            {/* Tombol Kembali & Breadcrumb */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6 sm:mb-8 pb-4 border-b-2 border-emerald-950/15">
              <button
                type="button"
                onClick={kembaliKeDaftarAlbum}
                className="inline-flex items-center gap-2 bg-amber-300 hover:bg-amber-400 text-emerald-950 px-4 sm:px-5 py-2.5 rounded-xl font-black border-2 border-emerald-950 shadow-[3px_3px_0px_#064e3b] hover:shadow-[1px_1px_0px_#064e3b] hover:translate-x-[2px] hover:translate-y-[2px] transition text-xs sm:text-sm w-fit cursor-pointer"
              >
                <ArrowLeft size={16} /> Kembali ke Semua Folder
              </button>

              <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                <span>Galeri</span>
                <span>/</span>
                <span className="text-emerald-950 font-black truncate max-w-[200px] sm:max-w-none">
                  {activeAlbum.judul}
                </span>
              </div>
            </div>

            {/* Banner Info Folder yang Sedang Dibuka */}
            <div className="bg-white rounded-2xl sm:rounded-3xl border-2 border-emerald-950 shadow-[5px_5px_0px_#064e3b] sm:shadow-[7px_7px_0px_#064e3b] p-5 sm:p-8 mb-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 bg-amber-200 text-emerald-950 px-3 py-1 rounded-full border border-emerald-950 text-xs font-black mb-2.5">
                    <Calendar size={13} /> {activeAlbum.tanggal || 'Kegiatan Sekolah'}
                  </div>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-emerald-950">
                    {activeAlbum.judul}
                  </h2>
                  {activeAlbum.deskripsi && (
                    <p className="text-slate-600 text-xs sm:text-base font-medium mt-2 max-w-2xl leading-relaxed">
                      {activeAlbum.deskripsi}
                    </p>
                  )}
                </div>

                <div className="bg-teal-100 border-2 border-emerald-950 px-4 py-3 rounded-2xl shadow-[3px_3px_0px_#064e3b] shrink-0 text-center sm:text-right">
                  <p className="text-[10px] font-black uppercase text-emerald-800 tracking-wider">Total Koleksi</p>
                  <p className="text-xl sm:text-2xl font-black text-emerald-950">
                    {albumPhotos.length} Foto
                  </p>
                </div>
              </div>
            </div>

            {/* Grid Foto di dalam Folder */}
            {loadingPhotos ? (
              <div className="flex flex-col items-center justify-center py-16 text-emerald-800">
                <div className="w-10 h-10 border-4 border-emerald-200 border-t-emerald-700 rounded-full animate-spin mb-3" />
                <p className="font-bold text-sm">Memuat foto kegiatan...</p>
              </div>
            ) : albumPhotos.length === 0 ? (
              <div className="text-center py-12 sm:py-16 bg-white rounded-2xl sm:rounded-3xl border-2 border-emerald-950 shadow-[4px_4px_0px_#064e3b] p-6">
                <p className="text-4xl mb-2">📸</p>
                <h4 className="font-black text-emerald-950 text-base mb-1">Belum ada foto di album ini</h4>
                <p className="text-slate-600 text-xs sm:text-sm font-medium">
                  Pihak sekolah belum mengunggah foto ke dalam folder kegiatan ini.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
                {albumPhotos.map((item, idx) => (
                  <div
                    key={item.id}
                    onClick={() => setLightboxIndex(idx)}
                    className="bg-white rounded-2xl border-2 border-emerald-950 shadow-[3px_3px_0px_#064e3b] sm:shadow-[4px_4px_0px_#064e3b] hover:-translate-y-1 hover:shadow-[6px_6px_0px_#064e3b] transition-all overflow-hidden group cursor-pointer"
                  >
                    <div className="aspect-square overflow-hidden relative bg-slate-100">
                      <img
                        src={item.foto}
                        alt={item.caption || activeAlbum.judul}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-emerald-950/45 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
                        <span className="inline-flex items-center gap-1.5 bg-amber-300 text-emerald-950 font-black text-xs px-3 py-1.5 rounded-full border-2 border-emerald-950 shadow-[2px_2px_0px_#064e3b]">
                          <ZoomIn size={14} /> Perbesar
                        </span>
                      </div>
                    </div>

                    {item.caption && (
                      <div className="p-3 border-t-2 border-emerald-950 text-center">
                        <p className="text-xs font-bold text-emerald-950 line-clamp-1">{item.caption}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* ========================================================= */}
      {/* MODAL LIGHTBOX / FULL SCREEN PHOTO VIEWER */}
      {/* ========================================================= */}
      {lightboxIndex !== null && albumPhotos[lightboxIndex] && (
        <div
          className="fixed inset-0 z-[999] bg-emerald-950/92 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Tombol Tutup */}
          <button
            type="button"
            aria-label="Tutup pratinjau"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex(null);
            }}
            className="absolute top-3 right-3 sm:top-5 sm:right-5 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-amber-300 hover:bg-amber-400 text-emerald-950 border-2 border-emerald-950 shadow-[3px_3px_0px_#064e3b] flex items-center justify-center transition cursor-pointer z-10"
          >
            <X size={20} strokeWidth={2.5} />
          </button>

          {/* Navigasi Prev */}
          {albumPhotos.length > 1 && (
            <button
              type="button"
              aria-label="Foto sebelumnya"
              onClick={(e) => {
                e.stopPropagation();
                prevPhoto();
              }}
              className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/90 hover:bg-white text-emerald-950 border-2 border-emerald-950 shadow-[3px_3px_0px_#064e3b] flex items-center justify-center transition cursor-pointer z-10"
            >
              <ChevronLeft size={24} strokeWidth={2.5} />
            </button>
          )}

          {/* Area Foto Utama */}
          <div
            className="relative max-w-4xl max-h-[85vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={albumPhotos[lightboxIndex].foto}
              alt={albumPhotos[lightboxIndex].caption || 'Foto Dokumentasi'}
              className="max-w-full max-h-[75vh] rounded-xl sm:rounded-2xl border-2 sm:border-4 border-white shadow-2xl object-contain animate-zoom-in"
            />

            {/* Keterangan & Indikator Nomor Foto */}
            <div className="mt-3 sm:mt-4 text-center">
              <span className="inline-block bg-white/95 text-emerald-950 px-3.5 py-1 rounded-full font-black text-xs border border-emerald-950 shadow-md">
                Foto {lightboxIndex + 1} dari {albumPhotos.length}
              </span>
              {albumPhotos[lightboxIndex].caption && (
                <p className="text-white font-bold text-xs sm:text-sm mt-1.5 drop-shadow">
                  {albumPhotos[lightboxIndex].caption}
                </p>
              )}
            </div>
          </div>

          {/* Navigasi Next */}
          {albumPhotos.length > 1 && (
            <button
              type="button"
              aria-label="Foto selanjutnya"
              onClick={(e) => {
                e.stopPropagation();
                nextPhoto();
              }}
              className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/90 hover:bg-white text-emerald-950 border-2 border-emerald-950 shadow-[3px_3px_0px_#064e3b] flex items-center justify-center transition cursor-pointer z-10"
            >
              <ChevronRight size={24} strokeWidth={2.5} />
            </button>
          )}
        </div>
      )}
    </main>
  );
}

export default Galeri;
