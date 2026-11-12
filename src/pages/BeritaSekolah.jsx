import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { ArrowRight, Newspaper } from 'lucide-react';
import { db } from '../firebase';

function Berita() {
  const [daftarBerita, setDaftarBerita] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ambilBerita = async () => {
      try {
        const q = query(collection(db, 'berita'), orderBy('tanggal', 'desc'));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setDaftarBerita(data);
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
    <div className="min-h-screen bg-teal-50 py-14 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header Halaman */}
        <div className="text-center mb-14 space-y-3">
          <span className="inline-flex items-center gap-1.5 bg-teal-200 text-emerald-950 text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full border-2 border-emerald-950 shadow-[2px_2px_0px_#064e3b]">
            <Newspaper size={14} /> Informasi & Pengumuman
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-emerald-950">
            Kabar <span className="text-emerald-600">RA At-Tajdid</span>
          </h1>
          <p className="text-slate-600 font-medium max-w-2xl mx-auto text-sm sm:text-base">
            Ikuti terus perkembangan kegiatan, prestasi, dan informasi terbaru dari sekolah kami.
          </p>
        </div>

        {/* Grid Berita */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {daftarBerita.map((item) => (
            <Link
              key={item.id}
              to={`/berita/${item.id}`}
              className="group bg-white rounded-2xl border-2 border-emerald-950 shadow-[5px_5px_0px_#064e3b] hover:-translate-y-1 hover:shadow-[7px_7px_0px_#064e3b] transition-all overflow-hidden flex flex-col"
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
                  <div className="w-full h-full flex items-center justify-center text-4xl">📸</div>
                )}
                <div className="absolute top-3 left-3 bg-amber-300 border-2 border-emerald-950 px-3 py-1 rounded-full shadow-[2px_2px_0px_#064e3b]">
                  <p className="text-[10px] font-black text-emerald-950 uppercase tracking-widest">
                    {item.kategori || 'Kegiatan'}
                  </p>
                </div>
              </div>

              {/* Konten Teks */}
              <div className="p-6 flex flex-col flex-grow">
                <p className="text-emerald-700 text-xs font-extrabold mb-2 uppercase tracking-wider">
                  {item.tanggal || 'Baru Saja'}
                </p>
                <h3 className="text-xl font-black text-emerald-950 mb-3 leading-snug group-hover:text-emerald-700 transition-colors">
                  {item.judul}
                </h3>
                <p className="text-slate-600 text-sm line-clamp-3 leading-relaxed mb-6 font-medium">
                  {item.isi}
                </p>

                <div className="mt-auto pt-4 border-t-2 border-emerald-950/10 flex justify-between items-center">
                  <span className="text-emerald-950 font-extrabold text-sm">Baca Selengkapnya</span>
                  <span className="w-8 h-8 rounded-full bg-amber-300 border-2 border-emerald-950 text-emerald-950 flex items-center justify-center group-hover:bg-amber-400 transition-colors">
                    <ArrowRight size={15} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Jika berita kosong */}
        {daftarBerita.length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl border-2 border-emerald-950 shadow-[6px_6px_0px_#064e3b]">
            <p className="text-slate-500 font-bold italic">Belum ada berita yang diterbitkan...</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Berita;
