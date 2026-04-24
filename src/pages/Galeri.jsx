import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

function Galeri() {
  const [galeri, setGaleri] = useState([]);
  const [loading, setLoading] = useState(true);

  const ambilDataGaleri = async () => {
    try {
      const snap = await getDocs(collection(db, "galeri"));
      const dataFormat = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      // Urutkan berdasarkan yang terbaru
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
    <main className="py-16 max-w-7xl mx-auto px-4 min-h-screen">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 uppercase tracking-widest">Galeri Kegiatan</h2>
        <p className="text-emerald-600 mt-2 font-medium">Dokumentasi aktivitas dan momen berharga di At-Tajdied</p>
        <div className="w-24 h-1 bg-emerald-500 mx-auto mt-4"></div>
      </div>

      {loading ? (
        <p className="text-center text-gray-500 animate-pulse">Memuat foto...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {galeri.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow-md overflow-hidden group">
              <div className="h-64 overflow-hidden relative">
                <img 
                  src={item.urlFoto} 
                  alt={item.judul} 
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
                  <span className="text-white font-bold border-2 border-white px-4 py-2 rounded">Lihat Foto</span>
                </div>
              </div>
              <div className="p-4 text-center border-t border-gray-100">
                <h3 className="font-bold text-gray-800">{item.judul}</h3>
              </div>
            </div>
          ))}
          
          {galeri.length === 0 && (
            <div className="col-span-full text-center py-16 bg-gray-50 rounded-lg border border-dashed border-gray-300">
              <p className="text-gray-500 italic">Belum ada foto di galeri.</p>
            </div>
          )}
        </div>
      )}
    </main>
  );
}

export default Galeri;