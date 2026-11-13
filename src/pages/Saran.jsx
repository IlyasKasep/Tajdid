import { useState } from 'react';
import { MessageSquareHeart, Send } from 'lucide-react';
import { supabase } from '../supabase';

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
      const { error: insertError } = await supabase.from('saran').insert([
        {
          nama: formData.nama,
          kontak: formData.kontak,
          pesan: formData.pesan,
          dibaca: false,
        },
      ]);

      if (insertError) throw insertError;

      setStatus('success');
      setFormData({ nama: '', kontak: '', pesan: '' });

      setTimeout(() => setStatus('idle'), 3000);
    } catch (error) {
      console.error('Error menambahkan saran: ', error);
      setStatus('error');
    }
  };

  return (
    <main className="min-h-screen bg-teal-50 py-8 sm:py-14 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8 sm:mb-12 space-y-2.5 sm:space-y-3">
          <span className="inline-flex items-center gap-1.5 bg-rose-200 text-emerald-950 text-[11px] sm:text-xs font-black uppercase tracking-widest px-3.5 sm:px-4 py-1.5 rounded-full border-2 border-emerald-950 shadow-[2px_2px_0px_#064e3b]">
            <MessageSquareHeart size={14} /> Aspirasi & Masukan
          </span>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-emerald-950 tracking-tight">
            Kotak Saran
          </h1>
          <p className="text-emerald-800 font-semibold text-xs sm:text-base leading-relaxed">
            Masukan Anda sangat berarti bagi kemajuan RA At-Tajdid.
            <br />
            <span className="text-[11px] sm:text-sm text-slate-600 font-medium">
              (Pesan Anda bersifat rahasia dan hanya dibaca oleh pihak sekolah)
            </span>
          </p>
        </div>

        <div className="bg-white rounded-2xl sm:rounded-3xl border-2 border-emerald-950 shadow-[5px_5px_0px_#064e3b] sm:shadow-[8px_8px_0px_#064e3b] p-5 sm:p-10">
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div>
              <label className="block text-emerald-950 font-extrabold text-xs sm:text-sm mb-1.5 sm:mb-2">
                Nama Anda (Opsional)
              </label>
              <input
                type="text"
                name="nama"
                value={formData.nama}
                onChange={handleChange}
                placeholder="Boleh dikosongkan jika ingin anonim"
                className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl border-2 border-emerald-950 bg-teal-50/40 focus:bg-white focus:ring-2 focus:ring-amber-400 outline-none transition-all font-medium text-sm sm:text-base"
              />
            </div>

            <div>
              <label className="block text-emerald-950 font-extrabold text-xs sm:text-sm mb-1.5 sm:mb-2">
                No. HP / Email (Opsional)
              </label>
              <input
                type="text"
                name="kontak"
                value={formData.kontak}
                onChange={handleChange}
                placeholder="Agar kami bisa membalas jika diperlukan"
                className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl border-2 border-emerald-950 bg-teal-50/40 focus:bg-white focus:ring-2 focus:ring-amber-400 outline-none transition-all font-medium text-sm sm:text-base"
              />
            </div>

            <div>
              <label className="block text-emerald-950 font-extrabold text-xs sm:text-sm mb-1.5 sm:mb-2">
                Pesan / Saran <span className="text-rose-600">*</span>
              </label>
              <textarea
                name="pesan"
                value={formData.pesan}
                onChange={handleChange}
                required
                rows="5"
                placeholder="Tuliskan masukan, kritik, atau saran Anda di sini..."
                className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl border-2 border-emerald-950 bg-teal-50/40 focus:bg-white focus:ring-2 focus:ring-amber-400 outline-none transition-all resize-none font-medium text-sm sm:text-base"
              />
            </div>

            {/* Alert Sukses */}
            {status === 'success' && (
              <div className="bg-emerald-100 border-2 border-emerald-950 text-emerald-950 p-3.5 sm:p-4 rounded-xl font-bold text-center text-xs sm:text-sm">
                ✅ Terima kasih! Saran Anda berhasil dikirim.
              </div>
            )}

            {/* Alert Error */}
            {status === 'error' && (
              <div className="bg-rose-100 border-2 border-emerald-950 text-rose-800 p-3.5 sm:p-4 rounded-xl font-bold text-center text-xs sm:text-sm">
                ❌ Maaf, terjadi kesalahan jaringan. Silakan coba lagi.
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full inline-flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-black py-3 sm:py-4 rounded-xl border-2 border-emerald-950 shadow-[3px_3px_0px_#064e3b] sm:shadow-[4px_4px_0px_#064e3b] hover:shadow-[2px_2px_0px_#064e3b] hover:translate-x-[2px] hover:translate-y-[2px] transition-all disabled:opacity-70 disabled:cursor-not-allowed text-sm sm:text-base"
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
