import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase'; // Pastikan path ke firebase.js benar

function Berita() {
  const [daftarBerita, setDaftarBerita] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ambilBerita = async () => {
      try {
        // Mengambil data berita, diurutkan dari yang terbaru
        const q = query(collection(db, 'berita'), orderBy('tanggal', 'desc'));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setDaftarBerita(data);
      } catch (error) {
        console.error("Error fetching berita: ", error);
      } finally {
        setLoading(false);
      }
    };

    ambilBerita();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-20 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Header Halaman */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-slate-800 mb-4">
            Kabar <span className="text-emerald-600">RA At-Tajdid</span>
          </h1>
          <p className="text-slate-500 font-medium max-w-2xl mx-auto">
            Ikuti terus perkembangan kegiatan, prestasi, dan informasi terbaru dari sekolah kami.
          </p>
        </div>

        {/* Grid Berita */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {daftarBerita.map((item) => (
            <Link 
              key={item.id} 
              to={`/berita/${item.id}`} // Link dinamis menuju halaman detail
              className="group bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 flex flex-col"
            >
              {/* Bagian Gambar */}
              <div className="aspect-video relative overflow-hidden bg-slate-200">
                {item.gambar ? (
                  <img 
                    src={item.gambar} 
                    alt={item.judul} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-4xl">📸</div>
                )}
                {/* Badge Kategori/Tanggal */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-1 rounded-full shadow-sm">
                  <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">
                    {item.kategori || 'Kegiatan'}
                  </p>
                </div>
              </div>

              {/* Konten Teks */}
              <div className="p-8 flex flex-col flex-grow">
                <p className="text-slate-400 text-xs font-bold mb-3 uppercase tracking-tighter">
                  {item.tanggal || 'Baru Saja'}
                </p>
                <h3 className="text-xl font-black text-slate-800 mb-4 leading-tight group-hover:text-emerald-600 transition-colors">
                  {item.judul}
                </h3>
                <p className="text-slate-500 text-sm line-clamp-3 leading-relaxed mb-6">
                  {item.isi}
                </p>
                
                {/* Footer Kartu */}
                <div className="mt-auto pt-4 border-t border-slate-50 flex justify-between items-center">
                  <span className="text-emerald-600 font-bold text-sm">Baca Selengkapnya</span>
                  <span className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-all">
                    →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Jika berita kosong */}
        {daftarBerita.length === 0 && (
          <div className="text-center py-20 bg-white rounded-[3rem] border-2 border-dashed border-slate-200">
            <p className="text-slate-400 font-medium italic">Belum ada berita yang diterbitkan...</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Berita;