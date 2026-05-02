import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
// Import Firebase Firestore
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase'; // Pastikan path ini sesuai dengan letak file firebase.js Anda

function BiodataDetail() {
  // Mengambil ID dari URL (misal: /biodata/brxAa7G...)
  const { id } = useParams(); 
  
  // State untuk menyimpan data yang ditarik dari Firebase
  const [profil, setProfil] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfil = async () => {
      try {
        // Asumsi data disimpan di koleksi bernama 'biodata_detail'
        const docRef = doc(db, 'pengurus', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProfil(docSnap.data());
        } else {
          console.log("Dokumen tidak ditemukan!");
        }
      } catch (error) {
        console.error("Gagal mengambil data:", error);
      } finally {
        setLoading(false); // Matikan loading setelah selesai
      }
    };

    fetchProfil();
  }, [id]);

  // Tampilan saat data sedang ditarik
  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-emerald-700 font-bold animate-pulse">Memuat data pengurus...</p>
      </div>
    );
  }

  // Tampilan jika ID tidak valid / data tidak ada di Firebase
  if (!profil) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <h2 className="text-2xl font-bold text-gray-700">Data Tidak Ditemukan</h2>
        <Link to="/biodata" className="bg-emerald-600 text-white px-6 py-2 rounded-lg font-bold">Kembali ke Daftar Pengurus</Link>
      </div>
    );
  }

  // Tampilan Utama (Menyesuaikan gambar UI Anda)
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      
      {/* Tombol Kembali */}
      <div className="mb-8">
        <Link to="/biodata" className="text-emerald-700 hover:text-emerald-900 font-bold flex items-center gap-2">
          <span>&larr;</span> Kembali
        </Link>
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-xl p-8 md:p-12 flex flex-col md:flex-row gap-10 items-start">
        
        {/* BAGIAN KIRI: Foto */}
        <div className="w-full md:w-1/3 flex-shrink-0">
          <div className="bg-gray-50 p-4 rounded-[2rem] shadow-inner relative">
            {profil.foto ? (
              <img 
                src={profil.foto} 
                alt={profil.nama} 
                className="w-full h-auto aspect-[3/4] object-cover rounded-[1.5rem]"
              />
            ) : (
              <div className="w-full aspect-[3/4] bg-gray-200 rounded-[1.5rem] flex items-center justify-center">
                <span className="text-gray-400">Tanpa Foto</span>
              </div>
            )}
            {/* Hiasan Ikon (opsional, jika Anda menggunakan ikon mahkota di gambar) */}
            <div className="absolute top-8 right-0 translate-x-1/2 bg-white p-2 rounded-xl shadow-md">
              👑
            </div>
          </div>
        </div>

        {/* BAGIAN KANAN: Detail Informasi */}
        <div className="w-full md:w-2/3 space-y-6">
          
          <div>
            <h1 className="text-4xl font-black text-gray-900 mb-2">{profil.nama}</h1>
            <span className="inline-block bg-emerald-500 text-white px-4 py-1.5 rounded-full text-sm font-bold tracking-widest uppercase">
              {profil.jabatan}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Box Pendidikan */}
            <div className="bg-emerald-50/50 border border-emerald-100 p-5 rounded-2xl">
              <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-widest mb-1 flex items-center gap-2">
                🎓 Pendidikan
              </p>
              <p className="font-bold text-gray-800">{profil.pendidikan || 'Belum diisi'}</p>
            </div>
            
            {/* Box Moto */}
            <div className="bg-rose-50/50 border border-rose-100 p-5 rounded-2xl">
              <p className="text-[10px] text-rose-500 font-bold uppercase tracking-widest mb-1 flex items-center gap-2">
                🤍 Moto
              </p>
              <p className="font-bold text-gray-800 italic">"{profil.moto || 'Belum diisi'}"</p>
            </div>
          </div>

          {/* Box Tentang Guru */}
          <div className="border-2 border-dashed border-gray-200 p-6 rounded-3xl bg-gray-50 mt-4">
            <h3 className="font-bold text-gray-800 flex items-center gap-2 mb-3">
              ⭐ Tentang Guru
            </h3>
            <p className="text-gray-600 leading-relaxed italic">
              "{profil.deskripsi}"
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default BiodataDetail;