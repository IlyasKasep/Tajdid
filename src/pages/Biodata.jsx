import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase'; // Memanggil koneksi database

function Biodata() {
  const [pengurus, setPengurus] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ambilDataPengurus = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "pengurus"));
        const dataFormat = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));
        setPengurus(dataFormat);
      } catch (error) {
        console.error("Gagal mengambil data pengurus:", error);
      } finally {
        setLoading(false);
      }
    };

    ambilDataPengurus();
  }, []);

  return (
    <main className="py-16 max-w-7xl mx-auto px-4 min-h-screen">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 uppercase tracking-widest">Susunan Pengurus</h2>
        <p className="text-emerald-600 mt-2 font-medium">Sekolah Persatuan Islam At-Tajdid</p>
        <div className="w-24 h-1 bg-emerald-500 mx-auto mt-4"></div>
      </div>

      {loading ? (
        <p className="text-center text-gray-500 animate-pulse">Memuat data pengurus...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {pengurus.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 group">
              <div className="h-64 bg-emerald-50 relative overflow-hidden">
                {item.foto ? (
                  <img src={item.foto} alt={item.nama} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-6xl">👤</div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/80 to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex items-end justify-center pb-4">
                  <span className="text-white font-semibold tracking-wider text-sm">AT-TAJDIED</span>
                </div>
              </div>
              <div className="p-6 text-center">
                <h3 className="font-extrabold text-xl text-gray-800 mb-1 uppercase">{item.nama}</h3>
                <p className="text-emerald-600 font-semibold text-sm tracking-wide bg-emerald-50 inline-block px-3 py-1 rounded-full">{item.jabatan}</p>
              </div>
            </div>
          ))}
          
          {pengurus.length === 0 && (
            <div className="col-span-full text-center py-12 bg-white rounded-lg border border-dashed border-gray-300">
              <p className="text-gray-400 text-lg italic">Belum ada data pengurus yang ditambahkan.</p>
            </div>
          )}
        </div>
      )}
    </main>
  );
}

export default Biodata;