import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { ArrowLeft } from 'lucide-react';
import { db } from '../firebase';

function BiodataDetail() {
  const { id } = useParams();
  const [profil, setProfil] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfil = async () => {
      try {
        const docRef = doc(db, 'pengurus', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProfil(docSnap.data());
        } else {
          console.log('Dokumen tidak ditemukan!');
        }
      } catch (error) {
        console.error('Gagal mengambil data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfil();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[60vh] bg-teal-50 flex items-center justify-center">
        <p className="text-emerald-800 font-extrabold animate-pulse">Memuat data pengurus...</p>
      </div>
    );
  }

  if (!profil) {
    return (
      <div className="min-h-[60vh] bg-teal-50 flex flex-col items-center justify-center space-y-4 px-6">
        <h2 className="text-2xl font-black text-emerald-950">Data Tidak Ditemukan</h2>
        <Link
          to="/biodata"
          className="bg-amber-400 text-emerald-950 px-6 py-2.5 rounded-xl font-extrabold border-2 border-emerald-950 shadow-[3px_3px_0px_#064e3b]"
        >
          Kembali ke Daftar Pengurus
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-teal-50 py-12 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        {/* Tombol Kembali */}
        <div className="mb-8">
          <Link
            to="/biodata"
            className="inline-flex items-center gap-2 bg-white text-emerald-950 font-extrabold px-4 py-2 rounded-full border-2 border-emerald-950 shadow-[3px_3px_0px_#064e3b] hover:bg-emerald-50 transition-all text-sm"
          >
            <ArrowLeft size={16} /> Kembali
          </Link>
        </div>

        <div className="bg-white rounded-3xl border-2 border-emerald-950 shadow-[8px_8px_0px_#064e3b] p-7 sm:p-10 md:p-12 flex flex-col md:flex-row gap-10 items-start">
          {/* BAGIAN KIRI: Foto */}
          <div className="w-full md:w-1/3 shrink-0">
            <div className="bg-amber-300 p-3 rounded-3xl border-2 border-emerald-950 shadow-[5px_5px_0px_#064e3b] relative">
              {profil.foto ? (
                <img
                  src={profil.foto}
                  alt={profil.nama}
                  className="w-full h-auto aspect-[3/4] object-cover rounded-2xl border-2 border-emerald-950 bg-white"
                />
              ) : (
                <div className="w-full aspect-[3/4] bg-white rounded-2xl border-2 border-emerald-950 flex items-center justify-center">
                  <span className="text-slate-400 font-bold">Tanpa Foto</span>
                </div>
              )}
              <div className="absolute -top-3 -right-3 bg-white p-2 rounded-full border-2 border-emerald-950 shadow-[2px_2px_0px_#064e3b] text-lg">
                👑
              </div>
            </div>
          </div>

          {/* BAGIAN KANAN: Detail Informasi */}
          <div className="w-full md:w-2/3 space-y-6">
            <div>
              <span className="inline-block bg-teal-200 text-emerald-950 px-4 py-1 rounded-full text-xs font-black tracking-widest uppercase border-2 border-emerald-950 mb-3">
                {profil.jabatan}
              </span>
              <h1 className="text-3xl sm:text-4xl font-black text-emerald-950">{profil.nama}</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Box Pendidikan */}
              <div className="bg-teal-50 border-2 border-emerald-950 shadow-[3px_3px_0px_#0d9488] p-5 rounded-2xl">
                <p className="text-[11px] text-emerald-700 font-black uppercase tracking-widest mb-1 flex items-center gap-2">
                  🎓 Pendidikan
                </p>
                <p className="font-bold text-slate-900">{profil.pendidikan || 'Belum diisi'}</p>
              </div>

              {/* Box Moto */}
              <div className="bg-rose-50 border-2 border-emerald-950 shadow-[3px_3px_0px_#f43f5e] p-5 rounded-2xl">
                <p className="text-[11px] text-rose-600 font-black uppercase tracking-widest mb-1 flex items-center gap-2">
                  🤍 Moto
                </p>
                <p className="font-bold text-slate-900 italic">"{profil.moto || 'Belum diisi'}"</p>
              </div>
            </div>

            {/* Box Tentang Guru */}
            <div className="border-2 border-emerald-950 bg-amber-50 p-6 rounded-2xl shadow-[4px_4px_0px_#f59e0b]">
              <h3 className="font-black text-emerald-950 flex items-center gap-2 mb-3">
                ⭐ Tentang Guru
              </h3>
              <p className="text-slate-700 leading-relaxed font-medium italic">
                "{profil.deskripsi}"
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BiodataDetail;
