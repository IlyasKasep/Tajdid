import { useEffect, useMemo, useState } from 'react';
import { CheckCircle2, CheckCheck, Inbox, Mail, RefreshCw, Trash2 } from 'lucide-react';
import { supabase } from '../supabase';

function formatTanggal(item) {
  const tanggal = item?.tanggal || item?.created_at;
  if (!tanggal) return 'Tanggal tidak tersedia';

  try {
    const dateObject = typeof tanggal.toDate === 'function' ? tanggal.toDate() : new Date(tanggal);

    if (Number.isNaN(dateObject.getTime())) {
      return 'Tanggal tidak tersedia';
    }

    return dateObject.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return 'Tanggal tidak tersedia';
  }
}

function AdminSaran() {
  const [saranList, setSaranList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const ambilDataSaran = async () => {
    setLoading(true);
    setError('');

    try {
      const { data, error: err } = await supabase
        .from('saran')
        .select('*')
        .order('created_at', { ascending: false });

      if (err) throw err;
      setSaranList(data || []);
    } catch (err) {
      console.error('Gagal mengambil data saran:', err);
      setError('Data saran belum bisa dimuat. Cek koneksi internet atau Supabase.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let aktif = true;

    const muatAwal = async () => {
      try {
        const { data, error: err } = await supabase
          .from('saran')
          .select('*')
          .order('created_at', { ascending: false });

        if (err) throw err;
        if (aktif) {
          setSaranList(data || []);
          setError('');
        }
      } catch (err) {
        console.error('Gagal mengambil data saran:', err);
        if (aktif) {
          setError('Data saran belum bisa dimuat. Cek koneksi internet atau Supabase.');
        }
      } finally {
        if (aktif) {
          setLoading(false);
        }
      }
    };

    muatAwal();
    return () => {
      aktif = false;
    };
  }, []);

  const jumlahBelumDibaca = useMemo(
    () => saranList.filter((item) => !item.dibaca).length,
    [saranList]
  );

  const ubahStatusBaca = async (item) => {
    try {
      const { error: err } = await supabase
        .from('saran')
        .update({ dibaca: !item.dibaca })
        .eq('id', item.id);

      if (err) throw err;
      setSaranList((dataLama) =>
        dataLama.map((saran) =>
          saran.id === item.id ? { ...saran, dibaca: !item.dibaca } : saran
        )
      );
    } catch (err) {
      console.error('Gagal mengubah status saran:', err);
      alert('Status saran gagal diubah. Silakan coba lagi.');
    }
  };

  const hapusSaran = async (id) => {
    if (!window.confirm('Yakin ingin menghapus saran ini?')) return;

    try {
      const { error: err } = await supabase.from('saran').delete().eq('id', id);
      if (err) throw err;
      setSaranList((dataLama) => dataLama.filter((item) => item.id !== id));
      alert('Saran berhasil dihapus.');
    } catch (err) {
      console.error('Gagal menghapus saran:', err);
      alert('Saran gagal dihapus. Silakan coba lagi.');
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 sm:gap-4 border-b-2 border-emerald-950/15 pb-4 sm:pb-5 mb-5 sm:mb-6">
        <div>
          <h3 className="text-lg sm:text-2xl font-black text-emerald-950">KOTAK SARAN MASUK</h3>
          <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1">
            Bagian ini dipakai admin untuk melihat kritik, masukan, dan saran yang dikirim dari halaman pengguna.
          </p>
        </div>

        <button
          type="button"
          onClick={ambilDataSaran}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-amber-300 hover:bg-amber-400 text-emerald-950 px-4 sm:px-5 py-2.5 rounded-xl font-extrabold border-2 border-emerald-950 shadow-[3px_3px_0px_#064e3b] hover:shadow-[1px_1px_0px_#064e3b] hover:translate-x-[2px] hover:translate-y-[2px] transition-all disabled:opacity-60 text-xs sm:text-sm shrink-0"
          disabled={loading}
        >
          <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
          {loading ? 'Memuat...' : 'Refresh Data'}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6">
        <div className="bg-teal-50 border-2 border-emerald-950 shadow-[3px_3px_0px_#064e3b] rounded-2xl p-4 sm:p-5 flex items-center justify-between">
          <div>
            <p className="text-[11px] font-black text-emerald-900 uppercase tracking-wider">Total Saran</p>
            <p className="text-2xl sm:text-3xl font-black text-emerald-950 mt-1">{saranList.length}</p>
          </div>
          <div className="w-11 h-11 rounded-xl bg-teal-200 border-2 border-emerald-950 flex items-center justify-center text-emerald-950 shadow-[2px_2px_0px_#064e3b]">
            <Inbox size={20} />
          </div>
        </div>

        <div className="bg-amber-50 border-2 border-emerald-950 shadow-[3px_3px_0px_#064e3b] rounded-2xl p-4 sm:p-5 flex items-center justify-between">
          <div>
            <p className="text-[11px] font-black text-amber-900 uppercase tracking-wider">Belum Dibaca</p>
            <p className="text-2xl sm:text-3xl font-black text-emerald-950 mt-1">{jumlahBelumDibaca}</p>
          </div>
          <div className="w-11 h-11 rounded-xl bg-amber-300 border-2 border-emerald-950 flex items-center justify-center text-emerald-950 shadow-[2px_2px_0px_#064e3b]">
            <Mail size={20} />
          </div>
        </div>

        <div className="bg-sky-50 border-2 border-emerald-950 shadow-[3px_3px_0px_#064e3b] rounded-2xl p-4 sm:p-5 flex items-center justify-between">
          <div>
            <p className="text-[11px] font-black text-sky-900 uppercase tracking-wider">Sudah Dibaca</p>
            <p className="text-2xl sm:text-3xl font-black text-emerald-950 mt-1">{saranList.length - jumlahBelumDibaca}</p>
          </div>
          <div className="w-11 h-11 rounded-xl bg-sky-200 border-2 border-emerald-950 flex items-center justify-center text-emerald-950 shadow-[2px_2px_0px_#064e3b]">
            <CheckCheck size={20} />
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-rose-100 border-2 border-emerald-950 text-rose-900 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl mb-5 font-bold shadow-[3px_3px_0px_#064e3b] text-xs sm:text-sm">
          {error}
        </div>
      )}

      {loading && (
        <div className="bg-teal-50 border-2 border-emerald-950 rounded-2xl p-6 sm:p-8 text-center text-emerald-950 font-extrabold text-sm sm:text-base">
          Sedang mengambil data saran...
        </div>
      )}

      {!loading && !error && saranList.length === 0 && (
        <div className="bg-teal-50 border-2 border-dashed border-emerald-950/40 rounded-2xl p-6 sm:p-10 text-center">
          <p className="text-3xl sm:text-4xl mb-2 sm:mb-3">📭</p>
          <h4 className="font-black text-emerald-950 text-base sm:text-lg">Belum ada saran masuk</h4>
          <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1">
            Kalau pengguna mengirim saran dari halaman Kotak Saran, datanya akan tampil di sini.
          </p>
        </div>
      )}

      <div className="space-y-3.5 sm:space-y-4">
        {saranList.map((item) => (
          <div
            key={item.id}
            className={`rounded-xl sm:rounded-2xl border-2 border-emerald-950 p-4 sm:p-5 transition ${
              item.dibaca
                ? 'bg-white shadow-[3px_3px_0px_#064e3b] sm:shadow-[4px_4px_0px_#064e3b]'
                : 'bg-amber-100/80 shadow-[4px_4px_0px_#f59e0b] sm:shadow-[5px_5px_0px_#f59e0b]'
            }`}
          >
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3.5 sm:gap-4">
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span
                    className={`text-[9px] sm:text-[10px] font-black uppercase px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full border border-emerald-950 ${
                      item.dibaca ? 'bg-sky-100 text-emerald-950' : 'bg-amber-300 text-emerald-950'
                    }`}
                  >
                    {item.dibaca ? 'Sudah dibaca' : 'Belum dibaca'}
                  </span>
                  <span className="text-[11px] sm:text-xs text-slate-600 font-bold">{formatTanggal(item)}</span>
                </div>

                <h4 className="font-black text-emerald-950 text-base sm:text-lg">
                  {item.nama?.trim() ? item.nama : 'Anonim'}
                </h4>
                <p className="text-[11px] sm:text-xs text-emerald-700 font-extrabold mb-2.5 sm:mb-3">
                  {item.kontak?.trim() ? item.kontak : 'Kontak tidak dicantumkan'}
                </p>
                <p className="text-slate-800 leading-relaxed whitespace-pre-line bg-white rounded-xl p-3 sm:p-4 border-2 border-emerald-950/20 font-medium text-xs sm:text-base">
                  {item.pesan}
                </p>
              </div>

              <div className="flex sm:flex-row md:flex-col gap-2 w-full md:w-auto md:min-w-[150px]">
                <button
                  type="button"
                  onClick={() => ubahStatusBaca(item)}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 text-emerald-950 bg-sky-100 hover:bg-sky-200 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-extrabold border-2 border-emerald-950 transition"
                >
                  <CheckCircle2 size={15} />
                  {item.dibaca ? 'Belum Dibaca' : 'Tandai Dibaca'}
                </button>
                <button
                  type="button"
                  onClick={() => hapusSaran(item.id)}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 text-white bg-rose-500 hover:bg-rose-600 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-extrabold border-2 border-emerald-950 transition"
                >
                  <Trash2 size={15} />
                  Hapus
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminSaran;
