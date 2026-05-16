import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

function Galeri() {
  const [galeri, setGaleri] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // State baru untuk menyimpan foto yang sedang diperbesar
  const [selectedImg, setSelectedImg] = useState(null);

  const ambilDataGaleri = async () => {
    try {
      const snap = await getDocs(collection(db, "galeri"));
      const dataFormat = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setGaleri(dataFormat.reverse()); 
    } catch (error) {
      console.error("Gagal mengambil galeri:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    ambilDataGaleri();
  }, []);

  return (
    <main className="py-16 max-w-7xl mx-auto px-4 min-h-screen relative">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 uppercase tracking-widest">Galeri</h2>
        <div className="w-24 h-1 bg-emerald-500 mx-auto mt-4 rounded-full"></div>
      </div>

      {loading ? (
        <p className="text-center animate-pulse">Memuat foto...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {galeri.map((item) => (
            <div 
              key={item.id} 
              className="bg-white rounded-xl shadow-md overflow-hidden group cursor-pointer"
              onClick={() => setSelectedImg(item.foto)} // Set foto saat diklik
            >
              <div className="h-64 overflow-hidden relative">
                <img 
                  src={item.foto} // Sudah disesuaikan ke 'foto'
                  alt={item.judul} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
                  <span className="text-white font-bold border-2 border-white px-4 py-2 rounded">Perbesar Foto 🔍</span>
                </div>
              </div>
              <div className="p-4 text-center border-t border-gray-100">
                <h3 className="font-bold text-gray-800">{item.judul}</h3>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ================= MODAL FULL SCREEN ================= */}
      {selectedImg && (
        <div 
          className="fixed inset-0 z-[999] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-10"
          onClick={() => setSelectedImg(null)} // Klik di mana saja untuk menutup
        >
          {/* Tombol Tutup */}
          <button className="absolute top-5 right-5 text-white text-4xl font-bold hover:text-emerald-400">&times;</button>
          
          <img 
            src={selectedImg} 
            alt="Full Screen" 
            className="max-w-full max-h-full rounded-lg shadow-2xl animate-zoom-in"
          />
        </div>
      )}
    </main>
  );
}

export default Galeri;