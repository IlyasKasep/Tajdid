import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase'; // Sesuaikan path jika berbeda
import { motion } from 'framer-motion';
import { ArrowLeft, Mail, GraduationCap, Brain, MessageSquareQuote } from 'lucide-react';

function BiodataDetail() {
  const { id } = useParams(); // Mengambil ID dari URL
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ambilDetail = async () => {
      try {
        const docRef = doc(db, "pengurus", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setData(docSnap.data());
        } else {
          console.log("Data tidak ditemukan!");
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };
    ambilDetail();
  }, [id]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-emerald-500"></div>
    </div>
  );

  if (!data) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 p-8 text-center">
      <div className="text-8xl mb-8">👤</div>
      <h2 className="text-3xl font-black text-slate-800 dark:text-slate-100">Data Tidak Ditemukan</h2>
      <p className="text-slate-500 dark:text-slate-400 mt-2 max-w-sm">
        Biodata guru yang Anda cari mungkin telah dihapus atau tidak tersedia di database.
      </p>
      <button 
        onClick={() => navigate('/biodata')}
        className="mt-8 flex items-center gap-2 text-emerald-600 font-bold hover:underline"
      >
        <ArrowLeft size={18} /> Kembali ke Daftar
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans text-slate-700 dark:text-slate-300 pb-24">
      {/* Tombol Kembali di Atas */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-10">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-bold text-sm mb-12"
        >
          <ArrowLeft size={18} /> Kembali ke Daftar
        </button>
      </div>

      <motion.main 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        
        {/* Kolom Kiri: Kartu Profil Utama */}
        <div className="md:col-span-1 space-y-8">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col items-center text-center">
            {/* Foto Profil Lingkaran Besar */}
            <div className="w-40 h-40 rounded-full object-cover mb-6 border-4 border-white dark:border-slate-800 shadow-md overflow-hidden bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
              {data.foto ? (
                <img src={data.foto} alt={data.nama} className="w-full h-full object-cover" />
              ) : (
                <div className="text-5xl opacity-30">👤</div>
              )}
            </div>
            {/* Nama & Peran */}
            <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-1 leading-tight capitalize">
              {data.nama}
            </h1>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-8 capitalize">
              {data.jabatan || 'Staff Pengajar RA At-Tajdied'}
            </p>
            
            {/* Bagian Kontak */}
            <div className="w-full text-left border-t border-slate-100 dark:border-slate-800 pt-6">
              <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3">
                Informasi Kontak
              </h4>
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-purple-700 dark:text-purple-400" />
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                  {data.kontak || 'Email/No. HP Belum Tersedia'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Kolom Kanan: Kartu Konten Biodata Lengkap */}
        <div className="md:col-span-2">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 md:p-10 shadow-sm border border-slate-100 dark:border-slate-800 h-full">
            
            {/* Bagian Overview (Paragraf Teks) */}
            <div className="mb-12">
              <span className="inline-block bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 px-4 py-1.5 rounded-full text-xs font-semibold mb-3">
                Overview
              </span>
              <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                {data.keterangan || "Wali Kelas Kelompok B di RA At-Tajdied yang sabar, ceria, dan sangat menyayangi anak-anak. Beliau memiliki pengalaman luas dalam menciptakan suasana belajar yang menyenangkan sambil menanamkan nilai-nilai Islami dasar pada si kecil."}
              </p>
            </div>

            {/* Bagian Details (Field Data) */}
            <div>
              <span className="inline-block bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 px-4 py-1.5 rounded-full text-xs font-semibold mb-6">
                Details
              </span>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6 text-sm">
                
                {/* Field 1 (Pendidikan) */}
                <div className="flex justify-between items-center pb-3 border-b border-slate-100 dark:border-slate-800/50">
                  <div className="flex items-center gap-3">
                    <GraduationCap size={16} className="text-purple-700 dark:text-purple-400" />
                    <p className="font-medium text-slate-500 dark:text-slate-400">Pendidikan</p>
                  </div>
                  <p className="font-semibold text-slate-800 dark:text-slate-100 text-right capitalize">
                    {data.pendidikan || 'S1 PGPAUD / Pendidikan Islam'}
                  </p>
                </div>

                {/* Field 2 (Keahlian) */}
                <div className="flex justify-between items-center pb-3 border-b border-slate-100 dark:border-slate-800/50">
                  <div className="flex items-center gap-3">
                    <Brain size={16} className="text-purple-700 dark:text-purple-400" />
                    <p className="font-medium text-slate-500 dark:text-slate-400">Keahlian</p>
                  </div>
                  <p className="font-semibold text-slate-800 dark:text-slate-100 text-right capitalize">
                    {data.keahlian || 'Mendongeng & Kreativitas'}
                  </p>
                </div>

                {/* Field 3 (Motto) */}
                <div className="flex justify-between items-center pb-3 border-b border-slate-100 dark:border-slate-800/50 sm:col-span-2">
                  <div className="flex items-center gap-3 pr-6">
                    <MessageSquareQuote size={16} className="text-purple-700 dark:text-purple-400" />
                    <p className="font-medium text-slate-500 dark:text-slate-400">Motto</p>
                  </div>
                  <p className="font-semibold text-slate-800 dark:text-slate-100 italic leading-snug max-w-md text-right">
                    "{data.motto || 'Membimbing anak dengan cinta, membangun masa depan dengan akhlak.'}"
                  </p>
                </div>

              </div>
            </div>

          </div>
        </div>

      </motion.main>
    </div>
  );
}

export default BiodataDetail;