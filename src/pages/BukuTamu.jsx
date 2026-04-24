import { useState, useEffect } from 'react';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db } from '../firebase';

function BukuTamu() {
  const [tamu, setTamu] = useState([]);
  const [nama, setNama] = useState('');
  const [asal, setAsal] = useState('');
  const [pesan, setPesan] = useState('');
  const [loading, setLoading] = useState(false);

  const ambilDataTamu = async () => {
    try {
      const snap = await getDocs(collection(db, "bukutamu"));
      const dataFormat = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      // Membalik urutan agar pesan terbaru ada di atas
      setTamu(dataFormat.reverse()); 
    } catch (error) {
      console.error("Gagal mengambil data buku tamu:", error);
    }
  };

  useEffect(() => {
    ambilDataTamu();
  }, []);

  const kirimPesan = async (e) => {
    e.preventDefault();
    if (!nama || !pesan) return alert("Nama dan Pesan wajib diisi!");
    
    setLoading(true);
    try {
      await addDoc(collection(db, "bukutamu"), {
        nama,
        asal: asal || 'Masyarakat Umum',
        pesan,
        tanggal: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
      });
      alert("Terima kasih! Pesan Anda telah tercatat di Buku Tamu.");
      setNama(''); setAsal(''); setPesan('');
      ambilDataTamu(); // Refresh daftar pesan
    } catch (error) {
      alert("Gagal mengirim pesan, coba lagi nanti.");
    }
    setLoading(false);
  };

  return (
    <main className="py-16 max-w-7xl mx-auto px-4 min-h-screen">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 uppercase tracking-widest">Buku Tamu</h2>
        <p className="text-emerald-600 mt-2 font-medium">Tinggalkan jejak, pesan, atau saran untuk At-Tajdied</p>
        <div className="w-24 h-1 bg-emerald-500 mx-auto mt-4"></div>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-start">
        {/* KOLOM KIRI: FORM ISI BUKU TAMU */}
        <div className="bg-white p-8 rounded-xl shadow-lg border-t-8 border-emerald-600">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">📝 Isi Buku Tamu</h3>
          <form onSubmit={kirimPesan} className="space-y-5">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Nama Lengkap *</label>
              <input type="text" value={nama} onChange={(e) => setNama(e.target.value)} className="w-full px-4 py-3 border rounded focus:ring-2 focus:ring-emerald-500 outline-none bg-gray-50" placeholder="Masukkan nama Anda..." required />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Instansi / Asal Daerah</label>
              <input type="text" value={asal} onChange={(e) => setAsal(e.target.value)} className="w-full px-4 py-3 border rounded focus:ring-2 focus:ring-emerald-500 outline-none bg-gray-50" placeholder="Contoh: Alumni 2020 / Bandung" />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Pesan / Kesan *</label>
              <textarea value={pesan} onChange={(e) => setPesan(e.target.value)} rows="5" className="w-full px-4 py-3 border rounded focus:ring-2 focus:ring-emerald-500 outline-none bg-gray-50" placeholder="Tulis pesan Anda di sini..." required></textarea>
            </div>
            <button type="submit" disabled={loading} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded transition shadow-md disabled:opacity-50">
              {loading ? 'Mengirim Pesan...' : 'Kirim Pesan'}
            </button>
          </form>
        </div>

        {/* KOLOM KANAN: DAFTAR PESAN TAMU */}
        <div>
          <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <span>💬</span> Pesan Pengunjung ({tamu.length})
          </h3>
          <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
            {tamu.map((item) => (
              <div key={item.id} className="bg-white p-5 rounded-lg shadow-md border-l-4 border-emerald-400">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-bold text-gray-800 text-lg">{item.nama}</h4>
                    <span className="text-xs font-semibold bg-emerald-100 text-emerald-800 px-2 py-1 rounded">{item.asal}</span>
                  </div>
                  <span className="text-xs text-gray-400">{item.tanggal}</span>
                </div>
                <p className="text-gray-600 text-sm mt-3 italic">"{item.pesan}"</p>
              </div>
            ))}
            {tamu.length === 0 && (
              <div className="text-center py-10 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                <p className="text-gray-500 italic">Jadilah orang pertama yang mengisi buku tamu!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default BukuTamu;