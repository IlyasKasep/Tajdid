import { useState, useEffect } from 'react';
import { collection, getDocs, doc, updateDoc, increment } from 'firebase/firestore';
import { db } from '../firebase';

function Polling() {
  const [polling, setPolling] = useState([]);
  const [loading, setLoading] = useState(true);
  const [suaraMasuk, setSuaraMasuk] = useState([]); // Menyimpan histori vote pengunjung agar tidak double-vote

  const ambilDataPolling = async () => {
    try {
      const snap = await getDocs(collection(db, "polling"));
      setPolling(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })).reverse());
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    ambilDataPolling();
  }, []);

  const kirimSuara = async (idPolling, fieldSuara) => {
    if (suaraMasuk.includes(idPolling)) {
      return alert("Anda sudah memberikan suara pada jajak pendapat ini. Terima kasih!");
    }
    
    try {
      const pollingRef = doc(db, "polling", idPolling);
      // Firebase Increment: Menambah jumlah suara langsung di database
      await updateDoc(pollingRef, {
        [fieldSuara]: increment(1)
      });
      alert("Terima kasih atas partisipasi Anda!");
      setSuaraMasuk([...suaraMasuk, idPolling]); // Kunci agar tidak bisa vote lagi
      ambilDataPolling(); // Refresh hasil secara langsung
    } catch (error) {
      alert("Gagal mengirim suara. Pastikan koneksi stabil.");
    }
  };

  // Menghitung persentase bar
  const hitungPersen = (suara, total) => {
    if (total === 0) return 0;
    return Math.round((suara / total) * 100);
  };

  return (
    <main className="py-16 max-w-5xl mx-auto px-4 min-h-screen">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 uppercase tracking-widest">Jajak Pendapat</h2>
        <p className="text-emerald-600 mt-2 font-medium">Suara Anda sangat berarti bagi kemajuan At-Tajdied</p>
        <div className="w-24 h-1 bg-emerald-500 mx-auto mt-4"></div>
      </div>

      {loading ? (
        <p className="text-center text-gray-500 animate-pulse">Memuat data polling...</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-8">
          {polling.map((item) => {
            const totalSuara = item.suara1 + item.suara2 + item.suara3;
            const sudahVote = suaraMasuk.includes(item.id);

            return (
              <div key={item.id} className="bg-white p-8 rounded-xl shadow-lg border-t-8 border-emerald-600">
                <h3 className="text-xl font-bold text-gray-800 mb-6 leading-relaxed">Q: "{item.pertanyaan}"</h3>
                
                <div className="space-y-4">
                  {/* Opsi 1 */}
                  <div>
                    <button onClick={() => kirimSuara(item.id, 'suara1')} disabled={sudahVote} className="w-full text-left font-semibold text-gray-700 bg-gray-50 hover:bg-emerald-50 border border-gray-200 p-3 rounded mb-1 transition disabled:cursor-not-allowed">
                      {item.opsi1}
                    </button>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div className="bg-emerald-500 h-3 rounded-full transition-all duration-1000" style={{ width: `${hitungPersen(item.suara1, totalSuara)}%` }}></div>
                    </div>
                    <p className="text-xs text-right mt-1 text-gray-500">{hitungPersen(item.suara1, totalSuara)}% ({item.suara1} Suara)</p>
                  </div>

                  {/* Opsi 2 */}
                  <div>
                    <button onClick={() => kirimSuara(item.id, 'suara2')} disabled={sudahVote} className="w-full text-left font-semibold text-gray-700 bg-gray-50 hover:bg-emerald-50 border border-gray-200 p-3 rounded mb-1 transition disabled:cursor-not-allowed">
                      {item.opsi2}
                    </button>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div className="bg-blue-500 h-3 rounded-full transition-all duration-1000" style={{ width: `${hitungPersen(item.suara2, totalSuara)}%` }}></div>
                    </div>
                    <p className="text-xs text-right mt-1 text-gray-500">{hitungPersen(item.suara2, totalSuara)}% ({item.suara2} Suara)</p>
                  </div>

                  {/* Opsi 3 */}
                  <div>
                    <button onClick={() => kirimSuara(item.id, 'suara3')} disabled={sudahVote} className="w-full text-left font-semibold text-gray-700 bg-gray-50 hover:bg-emerald-50 border border-gray-200 p-3 rounded mb-1 transition disabled:cursor-not-allowed">
                      {item.opsi3}
                    </button>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div className="bg-amber-500 h-3 rounded-full transition-all duration-1000" style={{ width: `${hitungPersen(item.suara3, totalSuara)}%` }}></div>
                    </div>
                    <p className="text-xs text-right mt-1 text-gray-500">{hitungPersen(item.suara3, totalSuara)}% ({item.suara3} Suara)</p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100 text-center">
                  <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full">Total Partisipan: {totalSuara} Suara</span>
                </div>
              </div>
            );
          })}
          
          {polling.length === 0 && (
            <div className="col-span-full text-center py-12 bg-white rounded-lg border border-dashed border-gray-300">
              <p className="text-gray-400 italic">Belum ada jajak pendapat yang aktif saat ini.</p>
            </div>
          )}
        </div>
      )}
    </main>
  );
}

export default Polling;