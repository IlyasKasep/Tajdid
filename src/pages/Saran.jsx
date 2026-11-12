import { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { MessageSquareHeart, Send } from 'lucide-react';
import { db } from '../firebase';

function Saran() {
  const [formData, setFormData] = useState({
    nama: '',
    kontak: '',
    pesan: '',
  });
  const [status, setStatus] = useState('idle'); // idle, loading, success, error

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    try {
      await addDoc(collection(db, 'saran'), {
        nama: formData.nama,
        kontak: formData.kontak,
        pesan: formData.pesan,
        tanggal: serverTimestamp(),
        dibaca: false,
      });

      setStatus('success');
      setFormData({ nama: '', kontak: '', pesan: '' });

      setTimeout(() => setStatus('idle'), 3000);
    } catch (error) {
      console.error('Error menambahkan saran: ', error);
      setStatus('error');
    }
  };

  return (
    <main className="min-h-screen bg-teal-50 py-14 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12 space-y-3">
          <span className="inline-flex items-center gap-1.5 bg-rose-200 text-emerald-950 text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full border-2 border-emerald-950 shadow-[2px_2px_0px_#064e3b]">
            <MessageSquareHeart size={14} /> Aspirasi & Masukan
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-emerald-950 tracking-tight">
            Kotak Saran
          </h1>
          <p className="text-emerald-800 font-semibold text-sm sm:text-base">
            Masukan Anda sangat berarti bagi kemajuan RA At-Tajdid.
            <br />
            <span className="text-xs sm:text-sm text-slate-600 font-medium">
              (Pesan Anda bersifat rahasia dan hanya dibaca oleh pihak sekolah)
            </span>
          </p>
        </div>

        <div className="bg-white rounded-3xl border-2 border-emerald-950 shadow-[8px_8px_0px_#064e3b] p-7 sm:p-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-emerald-950 font-extrabold text-sm mb-2">
                Nama Anda (Opsional)
              </label>
              <input
                type="text"
                name="nama"
                value={formData.nama}
                onChange={handleChange}
                placeholder="Boleh dikosongkan jika ingin anonim"
                className="w-full px-4 py-3 rounded-xl border-2 border-emerald-950 bg-teal-50/40 focus:bg-white focus:ring-2 focus:ring-amber-400 outline-none transition-all font-medium"
              />
            </div>

            <div>
              <label className="block text-emerald-950 font-extrabold text-sm mb-2">
                No. HP / Email (Opsional)
              </label>
              <input
                type="text"
                name="kontak"
                value={formData.kontak}
                onChange={handleChange}
                placeholder="Agar kami bisa membalas jika diperlukan"
                className="w-full px-4 py-3 rounded-xl border-2 border-emerald-950 bg-teal-50/40 focus:bg-white focus:ring-2 focus:ring-amber-400 outline-none transition-all font-medium"
              />
            </div>

            <div>
              <label className="block text-emerald-950 font-extrabold text-sm mb-2">
                Pesan / Saran <span className="text-rose-600">*</span>
              </label>
              <textarea
                name="pesan"
                value={formData.pesan}
                onChange={handleChange}
                required
                rows="5"
                placeholder="Tuliskan masukan, kritik, atau saran Anda di sini..."
                className="w-full px-4 py-3 rounded-xl border-2 border-emerald-950 bg-teal-50/40 focus:bg-white focus:ring-2 focus:ring-amber-400 outline-none transition-all resize-none font-medium"
              />
            </div>

            {/* Alert Sukses */}
            {status === 'success' && (
              <div className="bg-emerald-100 border-2 border-emerald-950 text-emerald-950 p-4 rounded-xl font-bold text-center">
                ✅ Terima kasih! Saran Anda berhasil dikirim.
              </div>
            )}

            {/* Alert Error */}
            {status === 'error' && (
              <div className="bg-rose-100 border-2 border-emerald-950 text-rose-800 p-4 rounded-xl font-bold text-center">
                ❌ Maaf, terjadi kesalahan jaringan. Silakan coba lagi.
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full inline-flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-black py-4 rounded-xl border-2 border-emerald-950 shadow-[4px_4px_0px_#064e3b] hover:shadow-[2px_2px_0px_#064e3b] hover:translate-x-[2px] hover:translate-y-[2px] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <Send size={18} />
              {status === 'loading' ? 'Mengirim...' : 'Kirim Saran'}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

export default Saran;
