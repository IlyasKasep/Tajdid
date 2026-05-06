import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { db } from '../firebase'; // Pastikan path ke firebase.js benar

{/* ================= SECTION: PROFIL & PENGELOLA (UPDATED WITH LINKS) ================= */}
<section className="py-16 px-6 max-w-6xl mx-auto">
  <div className="bg-white rounded-[3rem] shadow-xl border-t-8 border-emerald-500 overflow-hidden">
    <div className="grid lg:grid-cols-2">
      
      {/* Sisi Kiri: Deskripsi */}
      <div className="p-8 md:p-12 space-y-6">
        <div className="flex items-center gap-3">
          <span className="text-4xl animate-bounce-slow">🏫</span>
          <h2 className="text-3xl font-black text-slate-800">Tentang Kami</h2>
        </div>
        <p className="text-slate-600 leading-relaxed text-lg">
          <strong className="text-emerald-600">RA Persis 175 At Tajdid</strong> merupakan lembaga Pendidikan Anak Usia Dini untuk anak usia 4-6 tahun yang telah mendapat ijin operasional sejak tahun <span className="bg-emerald-100 px-2 py-0.5 rounded font-bold text-emerald-700">2010</span>. 
        </p>
        
        {/* Tim Pengelola */}
        <div className="pt-4 border-t border-slate-100">
          <h3 className="font-black text-slate-800 mb-4 flex items-center gap-2">
            <span className="text-xl">👩‍🏫</span> Tim Pengelola & Guru
          </h3>
          <div className="grid gap-4">
            {/* Link untuk Kepala RA */}
            <Link to="/biodata" className="flex items-center gap-4 bg-teal-50 p-3 rounded-2xl border border-teal-100 hover:bg-teal-100 transition-all hover:scale-[1.02] group/item">
              <div className="w-12 h-12 bg-teal-600 rounded-full flex items-center justify-center text-white font-bold shadow-sm group-hover/item:rotate-12 transition-transform">EH</div>
              <div>
                <p className="text-[10px] text-teal-600 font-bold uppercase tracking-wider">Kepala RA</p>
                <p className="font-bold text-slate-800 group-hover/item:text-teal-700">Ela Helasni</p>
              </div>
              <span className="ml-auto text-teal-300 group-hover/item:text-teal-600 pr-2">❯</span>
            </Link>

            <div className="flex flex-wrap gap-2">
              {['Siti Kuraesin, S.Pd.', 'Windi Wulandari Rahayu', 'Mila Nur Amelia', 'Sucika Risalah Bonita'].map((nama, i) => (
                <Link 
                  key={i} 
                  to="/biodata" 
                  className="bg-white border border-slate-200 px-3 py-1.5 rounded-xl text-sm font-medium text-slate-700 hover:border-emerald-400 hover:bg-emerald-50 hover:text-emerald-700 transition-all hover:-translate-y-1"
                >
                  {nama}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Sisi Kanan: Foto Bersama (Clickable) */}
      <Link to="/biodata" className="bg-emerald-50 p-8 flex items-center justify-center relative overflow-hidden group/photo">
         {/* Ornamen belakang foto */}
         <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-200/50 rounded-full -mr-16 -mt-16 animate-float"></div>
         
         <div className="relative z-10 w-full">
            <div className="bg-white p-3 rounded-[2rem] shadow-2xl rotate-2 group-hover/photo:rotate-0 group-hover/photo:scale-105 transition-all duration-500">
              <div className="aspect-[4/3] rounded-[1.5rem] overflow-hidden bg-slate-200 relative">
                 <img 
                  src="https://i.pinimg.com/736x/df/fd/3c/dffd3c56e49f41c63899eb47372925af.jpg" 
                  alt="Foto Pengelola RA At Tajdid" 
                  className="w-full h-full object-cover"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover/photo:opacity-100 transition-opacity"></div>
                 <div className="absolute bottom-4 left-0 right-0 text-center">
                    <p className="text-white font-black text-xs uppercase tracking-[0.2em] drop-shadow-md">
                      Klik untuk Lihat Biodata ❤️
                    </p>
                 </div>
              </div>
            </div>
            {/* Stiker Dekorasi */}
            <div className="absolute -top-4 -right-4 text-5xl animate-wiggle">⭐</div>
         </div>
      </Link>

    </div>
  </div>
</section>

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
          Profil Pengelola & Guru
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