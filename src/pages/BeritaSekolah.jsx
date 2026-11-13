import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Newspaper } from 'lucide-react';
import { supabase } from '../supabase';

function Berita() {
  const [daftarBerita, setDaftarBerita] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ambilBerita = async () => {
      try {
        const { data, error } = await supabase
          .from('berita')
          .select('*')
          .order('created_at', { ascending: false });
        if (error) throw error;
        setDaftarBerita(data || []);
      } catch (error) {
        console.error('Error fetching berita: ', error);
      } finally {
        setLoading(false);
      }
    };

    ambilBerita();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-teal-50">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-emerald-200 border-t-emerald-700" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-teal-50 py-8 sm:py-14 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header Halaman */}
        <div className="text-center mb-8 sm:mb-14 space-y-2.5 sm:space-y-3">
          <span className="inline-flex items-center gap-1.5 bg-teal-200 text-emerald-950 text-[11px] sm:text-xs font-black uppercase tracking-widest px-3.5 sm:px-4 py-1.5 rounded-full border-2 border-emerald-950 shadow-[2px_2px_0px_#064e3b]">
            <Newspaper size={14} /> Informasi & Pengumuman
          </span>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-emerald-950">
            Kabar <span className="text-emerald-600">RA At-Tajdid</span>
          </h1>
          <p className="text-slate-600 font-medium max-w-2xl mx-auto text-xs sm:text-base">
            Ikuti terus perkembangan kegiatan, prestasi, dan informasi terbaru dari sekolah kami.
          </p>
        </div>

        {/* Grid Berita */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {daftarBerita.map((item) => (
            <Link
              key={item.id}
              to={`/berita/${item.id}`}
              className="group bg-white rounded-2xl border-2 border-emerald-950 shadow-[4px_4px_0px_#064e3b] sm:shadow-[5px_5px_0px_#064e3b] hover:-translate-y-1 hover:shadow-[7px_7px_0px_#064e3b] transition-all overflow-hidden flex flex-col"
            >
              {/* Bagian Gambar */}
              <div className="aspect-video relative overflow-hidden bg-emerald-50 border-b-2 border-emerald-950">
                {item.gambar ? (
                  <img
                    src={item.gambar}
                    alt={item.judul}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-3xl sm:text-4xl">📸</div>
                )}
                <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 bg-amber-300 border-2 border-emerald-950 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full shadow-[2px_2px_0px_#064e3b]">
                  <p className="text-[9px] sm:text-[10px] font-black text-emerald-950 uppercase tracking-widest">
                    {item.kategori || 'Kegiatan'}
                  </p>
                </div>
              </div>

              {/* Konten Teks */}
              <div className="p-4 sm:p-6 flex flex-col flex-grow">
                <p className="text-emerald-700 text-[11px] sm:text-xs font-extrabold mb-1.5 sm:mb-2 uppercase tracking-wider">
                  {item.tanggal || 'Baru Saja'}
                </p>
                <h3 className="text-lg sm:text-xl font-black text-emerald-950 mb-2 sm:mb-3 leading-snug group-hover:text-emerald-700 transition-colors">
                  {item.judul}
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm line-clamp-3 leading-relaxed mb-4 sm:mb-6 font-medium">
                  {item.isi}
                </p>

                <div className="mt-auto pt-3 sm:pt-4 border-t-2 border-emerald-950/10 flex justify-between items-center">
                  <span className="text-emerald-950 font-extrabold text-xs sm:text-sm">Baca Selengkapnya</span>
                  <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-amber-300 border-2 border-emerald-950 text-emerald-950 flex items-center justify-center group-hover:bg-amber-400 transition-colors">
                    <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Jika berita kosong */}
        {daftarBerita.length === 0 && (
          <div className="text-center py-12 sm:py-20 bg-white rounded-2xl sm:rounded-3xl border-2 border-emerald-950 shadow-[4px_4px_0px_#064e3b] sm:shadow-[6px_6px_0px_#064e3b]">
            <p className="text-slate-500 font-bold italic text-sm sm:text-base">Belum ada berita yang diterbitkan...</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Berita;
