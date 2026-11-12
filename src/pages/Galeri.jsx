import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { Images, X, ZoomIn } from 'lucide-react';
import { db } from '../firebase';

function Galeri() {
  const [galeri, setGaleri] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImg, setSelectedImg] = useState(null);

  useEffect(() => {
    const ambilDataGaleri = async () => {
      try {
        const snap = await getDocs(collection(db, 'galeri'));
        const dataFormat = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setGaleri(dataFormat.reverse());
      } catch (error) {
        console.error('Gagal mengambil galeri:', error);
      } finally {
        setLoading(false);
      }
    };

    ambilDataGaleri();
  }, []);

  return (
    <main className="min-h-screen bg-teal-50 py-14 px-4 sm:px-6 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14 space-y-3">
          <span className="inline-flex items-center gap-1.5 bg-rose-200 text-emerald-950 text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full border-2 border-emerald-950 shadow-[2px_2px_0px_#064e3b]">
            <Images size={14} /> Dokumentasi Kegiatan
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-emerald-950 tracking-tight">
            Galeri Kegiatan
          </h1>
          <p className="text-slate-600 font-medium text-sm sm:text-base max-w-xl mx-auto">
            Kumpulan potret keceriaan ananda saat bermain, belajar, dan bertumbuh di RA Persis 175 At-Tajdid.
          </p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-emerald-800">
            <div className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-700 rounded-full animate-spin mb-4" />
            <p className="font-bold animate-pulse">Memuat foto...</p>
          </div>
        ) : galeri.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border-2 border-emerald-950 shadow-[6px_6px_0px_#064e3b]">
            <p className="text-4xl mb-3">📸</p>
            <p className="text-slate-600 font-bold">Belum ada foto kegiatan yang diunggah.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {galeri.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl border-2 border-emerald-950 shadow-[5px_5px_0px_#064e3b] hover:-translate-y-1 hover:shadow-[7px_7px_0px_#064e3b] transition-all overflow-hidden group cursor-pointer"
                onClick={() => setSelectedImg(item.foto)}
              >
                <div className="h-64 overflow-hidden relative border-b-2 border-emerald-950 bg-slate-100">
                  <img
                    src={item.foto}
                    alt={item.judul}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-emerald-950/45 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
                    <span className="inline-flex items-center gap-2 bg-amber-300 text-emerald-950 font-extrabold text-xs px-4 py-2 rounded-full border-2 border-emerald-950 shadow-[2px_2px_0px_#064e3b]">
                      <ZoomIn size={15} /> Perbesar Foto
                    </span>
                  </div>
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-extrabold text-emerald-950">{item.judul}</h3>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ================= MODAL FULL SCREEN ================= */}
      {selectedImg && (
        <div
          className="fixed inset-0 z-[999] bg-emerald-950/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-10"
          onClick={() => setSelectedImg(null)}
        >
          <button
            type="button"
            aria-label="Tutup pratinjau"
            className="absolute top-5 right-5 w-11 h-11 rounded-full bg-amber-300 text-emerald-950 border-2 border-emerald-950 shadow-[3px_3px_0px_#064e3b] flex items-center justify-center hover:bg-amber-400 transition"
          >
            <X size={22} strokeWidth={2.5} />
          </button>

          <img
            src={selectedImg}
            alt="Full Screen"
            className="max-w-full max-h-[85vh] rounded-2xl border-2 border-white shadow-2xl animate-zoom-in"
          />
        </div>
      )}
    </main>
  );
}

export default Galeri;
