import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { ArrowDownToLine, FolderDown } from 'lucide-react';
import { db } from '../firebase';

function Download() {
  const [unduhanList, setUnduhanList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ambilDataUnduhan = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'unduhan'));
        const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setUnduhanList(data);
      } catch (error) {
        console.error('Gagal mengambil data unduhan:', error);
      } finally {
        setLoading(false);
      }
    };

    ambilDataUnduhan();
  }, []);

  return (
    <div className="bg-teal-50 min-h-screen py-14 px-4 sm:px-6 font-sans text-slate-800">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14 space-y-3">
          <span className="inline-flex items-center gap-1.5 bg-amber-300 text-emerald-950 text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full border-2 border-emerald-950 shadow-[2px_2px_0px_#064e3b]">
            <FolderDown size={14} /> Pusat Unduhan
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-emerald-950 tracking-tight">
            Dokumen & Formulir
          </h1>
          <p className="text-slate-600 max-w-xl mx-auto text-sm sm:text-base font-medium">
            Temukan dan unduh berkas keperluan administrasi, formulir pendaftaran, hingga informasi sekolah di sini.
          </p>
        </div>

        {/* Indikator Loading */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-emerald-800">
            <div className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-700 rounded-full animate-spin mb-4" />
            <p className="font-bold animate-pulse">Menyiapkan dokumen...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {unduhanList.length > 0 ? (
              unduhanList.map((item) => (
                <a
                  key={item.id}
                  href={item.link}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-white p-6 rounded-2xl border-2 border-emerald-950 shadow-[5px_5px_0px_#064e3b] hover:-translate-y-1 hover:shadow-[7px_7px_0px_#064e3b] transition-all group flex flex-col items-center text-center"
                >
                  <div className="w-16 h-16 bg-sky-100 border-2 border-emerald-950 shadow-[2px_2px_0px_#064e3b] rounded-2xl flex items-center justify-center text-3xl mb-4 group-hover:scale-105 transition-transform">
                    {item.format === 'PDF' ? '📕' : item.format === 'DOCX' ? '📘' : '🖼️'}
                  </div>
                  <h3 className="font-extrabold text-lg text-emerald-950 mb-2">{item.nama}</h3>
                  <span className="bg-teal-100 text-emerald-950 border border-emerald-950 text-[11px] font-black uppercase px-3 py-1 rounded-full mb-5">
                    Format: {item.format}
                  </span>
                  <div className="mt-auto w-full inline-flex items-center justify-center gap-2 bg-amber-300 group-hover:bg-amber-400 text-emerald-950 font-extrabold py-3 rounded-xl border-2 border-emerald-950 transition-colors text-sm">
                    <ArrowDownToLine size={16} /> Unduh File
                  </div>
                </a>
              ))
            ) : (
              <div className="col-span-full text-center py-16 bg-white rounded-3xl border-2 border-emerald-950 shadow-[6px_6px_0px_#064e3b]">
                <span className="text-4xl block mb-4">📁</span>
                <p className="text-slate-600 font-bold">Belum ada file dokumen yang diunggah.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Download;
