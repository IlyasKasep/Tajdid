import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
// import { Link } from 'react-router-dom'; // Di-comment jika tidak digunakan
import { db } from '../firebase'; 

function Biodata() {
  const [pengurus, setPengurus] = useState([]);

  useEffect(() => {
    const ambilData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'pengurus'));
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setPengurus(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    ambilData();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 pt-10">
      
      {/* ================= 1. SECTION: PROFIL & PENGELOLA (PINDAHAN DARI HOME) ================= */}
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
              
              {/* Tim Pengelola Singkat */}
              <div className="pt-4 border-t border-slate-100">
                <h3 className="font-black text-slate-800 mb-4 flex items-center gap-2">
                  <span className="text-xl">👩‍🏫</span> Struktur Inti
                </h3>
                <div className="grid gap-4">
                  {/* Link ke detail dinonaktifkan (di-comment) */}
                  {/* <Link to="/biodata" ...> */}
                  <div className="flex items-center gap-4 bg-teal-50 p-3 rounded-2xl border border-teal-100">
                    <div className="w-12 h-12 bg-teal-600 rounded-full flex items-center justify-center text-white font-bold shadow-sm">EH</div>
                    <div>
                      <p className="text-[10px] text-teal-600 font-bold uppercase tracking-wider">Kepala RA</p>
                      <p className="font-bold text-slate-800">Ela Helasni</p>
                    </div>
                  </div>
                  {/* </Link> */}

                  <div className="flex flex-wrap gap-2">
                    {['Siti Kuraesin, S.Pd.', 'Windi Wulandari Rahayu', 'Mila Nur Amelia', 'Sucika Risalah Bonita'].map((nama, i) => (
                      <div key={i} className="bg-white border border-slate-200 px-3 py-1.5 rounded-xl text-sm font-medium text-slate-700">
                        {nama}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Sisi Kanan: Foto Bersama */}
            <div className="bg-emerald-50 p-8 flex items-center justify-center relative overflow-hidden group/photo">
               <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-200/50 rounded-full -mr-16 -mt-16 animate-float"></div>
               <div className="relative z-10 w-full">
                  <div className="bg-white p-3 rounded-[2rem] shadow-2xl rotate-2">
                    <div className="aspect-[4/3] rounded-[1.5rem] overflow-hidden bg-slate-200 relative">
                       <img 
                        src="/img/guru.png" 
                        alt="Foto Pengelola RA At Tajdid" 
                        className="w-full h-full object-cover"
                       />
                    </div>
                  </div>
                  <div className="absolute -top-4 -right-4 text-5xl animate-wiggle">⭐</div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 2. SECTION: DAFTAR PENGURUS LENGKAP ================= */}
      <section className="py-12 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black text-slate-800 mb-4">Guru & Staff Kami</h2>
          <p className="text-slate-500 font-medium">Mengenal lebih dekat para pendidik di RA At-Tajdid</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pengurus.map((item) => (
            /* Bagian Link ke detail di-comment agar kartu tidak bisa diklik */
            /* <Link key={item.id} to={`/biodata/${item.id}`} className="group"> */
            <div key={item.id} className="bg-white rounded-[2.5rem] shadow-md overflow-hidden border border-slate-100 transition-all duration-300">
              {/* Foto Profile */}
              <div className="aspect-square relative overflow-hidden bg-slate-100">
                {item.foto ? (
                  <img src={item.foto} alt={item.nama} className="w-full h-full object-cover shadow-inner" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-6xl opacity-20">👤</div>
                )}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-1 rounded-full shadow-sm">
                   <p className="text-[10px] font-black text-emerald-600 uppercase tracking-tighter">
                     {item.jabatan || 'Staff'}
                   </p>
                </div>
              </div>

              {/* Detail */}
              <div className="p-8">
                <h3 className="font-black text-xl text-slate-800 mb-2 uppercase tracking-tight">
                  {item.nama}
                </h3>
                <div className="mt-4 pt-4 border-t border-slate-50">
                  <p className="text-slate-500 text-sm leading-relaxed italic">
                    {item.keterangan || "Guru berdedikasi di RA At-Tajdied."}
                  </p>
                </div>
              </div>
            </div>
            /* </Link> */
          ))}

          {pengurus.length === 0 && (
            <div className="col-span-full text-center py-20 bg-white rounded-[3rem] border-2 border-dashed border-slate-200">
              <p className="text-slate-400 font-medium italic">Data pengurus belum tersedia...</p>
            </div>
          )}
        </div>
      </section>

    </div>
  );
}

export default Biodata;