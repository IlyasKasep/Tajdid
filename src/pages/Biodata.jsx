import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { db } from '../firebase'; // Pastikan path ke firebase.js benar

function Biodata() {
  const [pengurus, setPengurus] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ambilData = async () => {
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

    ambilData();
  }, []);

  return (
    <main className="py-16 max-w-7xl mx-auto px-4 min-h-screen bg-slate-50">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-black text-slate-800 uppercase tracking-widest">
          Profil Pengurus & Guru
        </h2>
        <p className="text-emerald-600 mt-2 font-bold italic">RA At-Tajdied</p>
        <div className="w-24 h-1.5 bg-emerald-500 mx-auto mt-4 rounded-full"></div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pengurus.map((item) => (
            <Link 
            to={`/biodata/${item.id}`} // 2. Ini akan mengarahkan ke ID unik guru
            key={item.id} 
            className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-xl transition-all block">
            <div key={item.id} className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 group">
              {/* Bagian Foto */}
              <div className="h-72 bg-slate-100 relative overflow-hidden">
                {item.foto ? (
                  <img 
                    src={item.foto} 
                    alt={item.nama} 
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-6xl opacity-20">👤</div>
                )}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-1 rounded-full shadow-sm">
                   <p className="text-[10px] font-black text-emerald-600 uppercase tracking-tighter">
                     {item.jabatan || 'Staff'}
                   </p>
                </div>
              </div>

              {/* Bagian Detail Lengkap */}
              <div className="p-8">
                <h3 className="font-black text-xl text-slate-800 mb-2 uppercase tracking-tight">
                  {item.nama}
                </h3>
                
                {/* Menampilkan Keterangan/Biodata yang sebelumnya tidak muncul */}
                <div className="mt-4 pt-4 border-t border-slate-50">
                  <p className="text-slate-500 text-sm leading-relaxed italic">
                    {item.keterangan || "Guru berdedikasi di RA At-Tajdied."}
                  </p>
                </div>
              </div>
            </div>
            </Link>
          ))}

          {pengurus.length === 0 && (
            <div className="col-span-full text-center py-20 bg-white rounded-[3rem] border-2 border-dashed border-slate-200">
              <p className="text-slate-400 font-medium italic">Data pengurus belum tersedia.</p>
            </div>
          )}
        </div>
      )}
    </main>
  );
}

export default Biodata;