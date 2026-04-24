import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

function Download() {
  const [dokumen, setDokumen] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ambilDataDokumen = async () => {
      try {
        const snap = await getDocs(collection(db, "download"));
        const dataFormat = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setDokumen(dataFormat.reverse());
      } catch (error) {
        console.error("Gagal mengambil data:", error);
      } finally {
        setLoading(false);
      }
    };
    ambilDataDokumen();
  }, []);

  return (
    <main className="py-16 max-w-5xl mx-auto px-4 min-h-screen">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 uppercase tracking-widest">Pusat Unduhan</h2>
        <p className="text-emerald-600 mt-2 font-medium">Download dokumen, formulir, dan informasi penting sekolah</p>
        <div className="w-24 h-1 bg-emerald-500 mx-auto mt-4"></div>
      </div>

      {loading ? (
        <p className="text-center text-gray-500 animate-pulse">Memuat daftar dokumen...</p>
      ) : (
        <div className="bg-white rounded-xl shadow-lg border-t-8 border-emerald-600 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-emerald-50 text-emerald-900 border-b-2 border-emerald-100">
                <th className="p-4 font-bold">Nama Dokumen</th>
                <th className="p-4 font-bold w-40 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {dokumen.map((item, index) => (
                <tr key={item.id} className={`border-b border-gray-100 hover:bg-gray-50 transition ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                  <td className="p-4 flex items-center gap-3">
                    <span className="text-2xl">📄</span>
                    <div>
                      <h4 className="font-bold text-gray-800">{item.namaFile}</h4>
                      <p className="text-xs text-gray-500">Diupload: {item.tanggal}</p>
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    <a 
                      href={item.linkFile} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold px-5 py-2 rounded transition shadow"
                    >
                      Download
                    </a>
                  </td>
                </tr>
              ))}
              {dokumen.length === 0 && (
                <tr>
                  <td colSpan="2" className="p-8 text-center text-gray-500 italic">Belum ada dokumen yang tersedia untuk diunduh.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}

export default Download;