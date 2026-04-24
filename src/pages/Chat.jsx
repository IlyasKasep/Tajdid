import { useState, useEffect } from 'react';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db } from '../firebase';

function Chat() {
  const [pesanChat, setPesanChat] = useState([]);
  const [namaPengirim, setNamaPengirim] = useState('');
  const [teksPesan, setTeksPesan] = useState('');
  const [loading, setLoading] = useState(false);

  const ambilDataChat = async () => {
    try {
      const snap = await getDocs(collection(db, "chat"));
      const dataFormat = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      // Urutkan berdasarkan waktu masuk
      setPesanChat(dataFormat.sort((a, b) => a.timestamp - b.timestamp));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    ambilDataChat();
    // Refresh otomatis setiap 5 detik agar mirip real-time
    const interval = setInterval(() => ambilDataChat(), 5000);
    return () => clearInterval(interval);
  }, []);

  const kirimPesan = async (e) => {
    e.preventDefault();
    if (!namaPengirim || !teksPesan) return;
    setLoading(true);
    try {
      await addDoc(collection(db, "chat"), {
        nama: namaPengirim,
        pesan: teksPesan,
        waktu: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
        timestamp: new Date().getTime() // untuk urutan
      });
      setTeksPesan(''); // Kosongkan input setelah kirim
      ambilDataChat();
    } catch (error) {
      alert("Gagal mengirim pesan.");
    }
    setLoading(false);
  };

  return (
    <main className="py-12 max-w-4xl mx-auto px-4 min-h-screen">
      <div className="bg-white rounded-xl shadow-2xl border-t-8 border-emerald-600 overflow-hidden flex flex-col h-[80vh]">
        
        {/* Header Chat */}
        <div className="bg-emerald-50 p-6 border-b border-emerald-100 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-black text-emerald-900">💬 Forum Diskusi Terbuka</h2>
            <p className="text-sm text-emerald-600 font-medium mt-1">Ruang tanya jawab wali murid, siswa, dan guru.</p>
          </div>
          <span className="bg-emerald-200 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full animate-pulse">Live</span>
        </div>

        {/* Ruang Chat (Isi Pesan) */}
        <div className="flex-1 p-6 overflow-y-auto bg-gray-50 space-y-4">
          {pesanChat.map((item) => (
            <div key={item.id} className="bg-white p-4 rounded-lg rounded-tl-none shadow-sm border border-gray-100 max-w-[80%]">
              <div className="flex items-baseline gap-2 mb-1">
                <h4 className="font-bold text-emerald-800 text-sm">{item.nama}</h4>
                <span className="text-[10px] text-gray-400">{item.waktu}</span>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">{item.pesan}</p>
            </div>
          ))}
          {pesanChat.length === 0 && (
            <div className="text-center text-gray-400 italic mt-10">Belum ada obrolan. Jadilah yang pertama menyapa!</div>
          )}
        </div>

        {/* Form Kirim Pesan */}
        <div className="bg-white p-4 border-t border-gray-200">
          <form onSubmit={kirimPesan} className="flex flex-col sm:flex-row gap-3">
            <input 
              type="text" value={namaPengirim} onChange={(e) => setNamaPengirim(e.target.value)} 
              className="w-full sm:w-1/4 px-4 py-3 border rounded-full bg-gray-50 focus:ring-2 focus:ring-emerald-500 outline-none text-sm" 
              placeholder="Nama Anda..." required 
            />
            <div className="flex-1 flex gap-2">
              <input 
                type="text" value={teksPesan} onChange={(e) => setTeksPesan(e.target.value)} 
                className="flex-1 px-4 py-3 border rounded-full bg-gray-50 focus:ring-2 focus:ring-emerald-500 outline-none text-sm" 
                placeholder="Ketik pesan..." required 
              />
              <button type="submit" disabled={loading} className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3 rounded-full transition shadow-md disabled:opacity-50">
                {loading ? '...' : 'Kirim'}
              </button>
            </div>
          </form>
        </div>

      </div>
    </main>
  );
}

export default Chat;