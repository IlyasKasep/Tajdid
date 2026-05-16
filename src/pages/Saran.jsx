import { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase'; // Sesuaikan path ini dengan lokasi file firebase Anda

function Saran() {
  const [formData, setFormData] = useState({
    nama: '',
    kontak: '',
    pesan: ''
  });
  const [status, setStatus] = useState('idle'); // idle, loading, success, error

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    try {
      // Menyimpan data ke collection "saran" di Firebase
      await addDoc(collection(db, 'saran'), {
        nama: formData.nama,
        kontak: formData.kontak, // Opsional (No HP/Email)
        pesan: formData.pesan,
        tanggal: serverTimestamp(), // Menyimpan waktu saat ini
        dibaca: false // Status untuk admin nanti (opsional)
      });
      
      setStatus('success');
      setFormData({ nama: '', kontak: '', pesan: '' }); // Kosongkan form

      // Kembalikan status ke idle setelah 3 detik
      setTimeout(() => setStatus('idle'), 3000);
    } catch (error) {
      console.error("Error menambahkan saran: ", error);
      setStatus('error');
    }
  };

  return (
    <main className="py-20 max-w-3xl mx-auto px-6 min-h-screen">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 uppercase tracking-widest">
          Kotak Saran
        </h2>
        <p className="text-emerald-600 mt-2 font-medium">
          Masukan Anda sangat berarti bagi kemajuan RA At-Tajdid. 
          <br/><span className="text-sm text-gray-500">(Pesan Anda bersifat rahasia dan hanya dibaca oleh pihak sekolah)</span>
        </p>
        <div className="w-24 h-1 bg-emerald-500 mx-auto mt-4 rounded-full"></div>
      </div>

      <div className="bg-white rounded-[2rem] shadow-xl p-8 md:p-10 border border-gray-100">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div>
            <label className="block text-gray-700 font-bold mb-2">Nama Anda (Opsional)</label>
            <input 
              type="text" 
              name="nama"
              value={formData.nama}
              onChange={handleChange}
              placeholder="Boleh dikosongkan jika ingin anonim"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-bold mb-2">No. HP / Email (Opsional)</label>
            <input 
              type="text" 
              name="kontak"
              value={formData.kontak}
              onChange={handleChange}
              placeholder="Agar kami bisa membalas jika diperlukan"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-bold mb-2">Pesan / Saran <span className="text-red-500">*</span></label>
            <textarea 
              name="pesan"
              value={formData.pesan}
              onChange={handleChange}
              required
              rows="5"
              placeholder="Tuliskan masukan, kritik, atau saran Anda di sini..."
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all resize-none"
            ></textarea>
          </div>

          {/* Alert Sukses */}
          {status === 'success' && (
            <div className="bg-emerald-50 text-emerald-600 p-4 rounded-xl font-medium text-center animate-bounce-slow">
              ✅ Terima kasih! Saran Anda berhasil dikirim.
            </div>
          )}

          {/* Alert Error */}
          {status === 'error' && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl font-medium text-center">
              ❌ Maaf, terjadi kesalahan jaringan. Silakan coba lagi.
            </div>
          )}

          <button 
            type="submit" 
            disabled={status === 'loading'}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-xl transition-colors duration-300 shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {status === 'loading' ? 'Mengirim...' : 'Kirim Saran'}
          </button>
        </form>
      </div>
    </main>
  );
}

export default Saran;