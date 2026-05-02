import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase'; // Sesuaikan path jika berbeda

function Download() {
  const [unduhanList, setUnduhanList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ambilDataUnduhan = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'unduhan'));
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setUnduhanList(data);
      } catch (error) {
        console.error("Gagal mengambil data unduhan:", error);
      } finally {
        setLoading(false);
      }
    };

    ambilDataUnduhan();
  }, []);

  return (
    <div className="bg-sky-50 min-h-screen py-16 px-4 font-sans text-slate-800">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Halaman */}
        <div className="text-center mb-12">
          <div className="inline-block bg-sky-200 text-sky-800 font-black px-4 py-1.5 rounded-full text-sm uppercase tracking-widest mb-4">
            Pusat Unduhan
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
            Dokumen & Formulir
          </h1>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            Temukan dan unduh berbagai berkas keperluan administrasi, formulir pendaftaran, hingga brosur RA At-Tajdid di sini.
          </p>
        </div>

        {/* Indikator Loading */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-sky-600">
            <div className="w-12 h-12 border-4 border-sky-200 border-t-sky-600 rounded-full animate-spin mb-4"></div>
            <p className="font-bold animate-pulse">Menyiapkan dokumen...</p>
          </div>
        ) : (
          /* List Dokumen */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {unduhanList.length > 0 ? (
              unduhanList.map((item) => (
                <a 
                  key={item.id} 
                  href={item.link} 
                  target="_blank" 
                  rel="noreferrer"
                  className="bg-white p-6 rounded-[2rem] shadow-sm border border-sky-100 hover:border-sky-300 hover:shadow-xl hover:-translate-y-2 transition-all group flex flex-col items-center text-center"
                >
                  <div className="w-16 h-16 bg-sky-100 text-sky-600 rounded-2xl flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">
                    {item.format === 'PDF' ? '📕' : item.format === 'DOCX' ? '📘' : '🖼️'}
                  </div>
                  <h3 className="font-bold text-lg text-slate-800 mb-2">{item.nama}</h3>
                  <span className="bg-slate-100 text-slate-500 text-xs font-black uppercase px-3 py-1 rounded-md mb-4">
                    Format: {item.format}
                  </span>
                  <div className="mt-auto w-full bg-sky-50 text-sky-700 font-bold py-3 rounded-xl group-hover:bg-sky-600 group-hover:text-white transition-colors">
                    Unduh File ↓
                  </div>
                </a>
              ))
            ) : (
              <div className="col-span-full text-center py-16 bg-white rounded-3xl border-2 border-dashed border-sky-200">
                <span className="text-4xl block mb-4">📁</span>
                <p className="text-slate-500 font-bold">Belum ada file dokumen yang diunggah.</p>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}

export default Download;