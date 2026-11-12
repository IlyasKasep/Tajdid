import { useEffect, useMemo, useState } from 'react';
import { collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';
import { CheckCircle2, RefreshCw, Trash2 } from 'lucide-react';
import { db } from '../firebase';

function formatTanggal(tanggal) {
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

function getTimeValue(tanggal) {
  if (!tanggal) return 0;

  try {
    const dateObject = typeof tanggal.toDate === 'function' ? tanggal.toDate() : new Date(tanggal);
    return Number.isNaN(dateObject.getTime()) ? 0 : dateObject.getTime();
  } catch {
    return 0;
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
      const querySnapshot = await getDocs(collection(db, 'saran'));
      const data = querySnapshot.docs.map((item) => ({ id: item.id, ...item.data() }));
      data.sort((a, b) => getTimeValue(b.tanggal) - getTimeValue(a.tanggal));
      setSaranList(data);
    } catch (err) {
      console.error('Gagal mengambil data saran:', err);
      setError('Data saran belum bisa dimuat. Cek koneksi internet atau aturan Firebase.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let aktif = true;

    const muatAwal = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'saran'));
        const data = querySnapshot.docs.map((item) => ({ id: item.id, ...item.data() }));
        data.sort((a, b) => getTimeValue(b.tanggal) - getTimeValue(a.tanggal));
        if (aktif) {
          setSaranList(data);
          setError('');
        }
      } catch (err) {
        console.error('Gagal mengambil data saran:', err);
        if (aktif) {
          setError('Data saran belum bisa dimuat. Cek koneksi internet atau aturan Firebase.');
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
      await updateDoc(doc(db, 'saran', item.id), {
        dibaca: !item.dibaca,
      });
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
      await deleteDoc(doc(db, 'saran', id));
      setSaranList((dataLama) => dataLama.filter((item) => item.id !== id));
      alert('Saran berhasil dihapus.');
    } catch (err) {
      console.error('Gagal menghapus saran:', err);
      alert('Saran gagal dihapus. Silakan coba lagi.');
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b-2 border-emerald-950/15 pb-5 mb-6">
        <div>
          <h3 className="text-xl sm:text-2xl font-black text-emerald-950">KOTAK SARAN MASUK</h3>
          <p className="text-sm text-slate-600 font-medium mt-1">
            Bagian ini dipakai admin untuk melihat kritik, masukan, dan saran yang dikirim dari halaman pengguna.
          </p>
        </div>

        <button
          type="button"
          onClick={ambilDataSaran}
          className="inline-flex items-center justify-center gap-2 bg-amber-300 hover:bg-amber-400 text-emerald-950 px-5 py-2.5 rounded-xl font-extrabold border-2 border-emerald-950 shadow-[3px_3px_0px_#064e3b] hover:shadow-[1px_1px_0px_#064e3b] hover:translate-x-[2px] hover:translate-y-[2px] transition-all disabled:opacity-60 text-sm shrink-0"
          disabled={loading}
        >
          <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
          {loading ? 'Memuat...' : 'Refresh Data'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-teal-100 border-2 border-emerald-950 shadow-[4px_4px_0px_#064e3b] rounded-2xl p-5">
          <p className="text-xs font-black text-emerald-900 uppercase tracking-wider">Total Saran</p>
          <p className="text-3xl font-black text-emerald-950 mt-1">{saranList.length}</p>
        </div>
        <div className="bg-amber-200 border-2 border-emerald-950 shadow-[4px_4px_0px_#064e3b] rounded-2xl p-5">
          <p className="text-xs font-black text-amber-900 uppercase tracking-wider">Belum Dibaca</p>
          <p className="text-3xl font-black text-emerald-950 mt-1">{jumlahBelumDibaca}</p>
        </div>
        <div className="bg-sky-100 border-2 border-emerald-950 shadow-[4px_4px_0px_#064e3b] rounded-2xl p-5">
          <p className="text-xs font-black text-sky-900 uppercase tracking-wider">Sudah Dibaca</p>
          <p className="text-3xl font-black text-emerald-950 mt-1">{saranList.length - jumlahBelumDibaca}</p>
        </div>
      </div>

      {error && (
        <div className="bg-rose-100 border-2 border-emerald-950 text-rose-900 p-4 rounded-2xl mb-5 font-bold shadow-[3px_3px_0px_#064e3b]">
          {error}
        </div>
      )}

      {loading && (
        <div className="bg-teal-50 border-2 border-emerald-950 rounded-2xl p-8 text-center text-emerald-950 font-extrabold">
          Sedang mengambil data saran...
        </div>
      )}

      {!loading && !error && saranList.length === 0 && (
        <div className="bg-teal-50 border-2 border-dashed border-emerald-950/40 rounded-2xl p-10 text-center">
          <p className="text-4xl mb-3">📭</p>
          <h4 className="font-black text-emerald-950">Belum ada saran masuk</h4>
          <p className="text-sm text-slate-600 font-medium mt-1">
            Kalau pengguna mengirim saran dari halaman Kotak Saran, datanya akan tampil di sini.
          </p>
        </div>
      )}

      <div className="space-y-4">
        {saranList.map((item) => (
          <div
            key={item.id}
            className={`rounded-2xl border-2 border-emerald-950 p-5 transition ${
              item.dibaca
                ? 'bg-white shadow-[4px_4px_0px_#064e3b]'
                : 'bg-amber-100/80 shadow-[5px_5px_0px_#f59e0b]'
            }`}
          >
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-2.5">
                  <span
                    className={`text-[10px] font-black uppercase px-3 py-1 rounded-full border border-emerald-950 ${
                      item.dibaca ? 'bg-sky-100 text-emerald-950' : 'bg-amber-300 text-emerald-950'
                    }`}
                  >
                    {item.dibaca ? 'Sudah dibaca' : 'Belum dibaca'}
                  </span>
                  <span className="text-xs text-slate-600 font-bold">{formatTanggal(item.tanggal)}</span>
                </div>

                <h4 className="font-black text-emerald-950 text-lg">
                  {item.nama?.trim() ? item.nama : 'Anonim'}
                </h4>
                <p className="text-xs text-emerald-700 font-extrabold mb-3">
                  {item.kontak?.trim() ? item.kontak : 'Kontak tidak dicantumkan'}
                </p>
                <p className="text-slate-800 leading-relaxed whitespace-pre-line bg-white rounded-xl p-4 border-2 border-emerald-950/20 font-medium">
                  {item.pesan}
                </p>
              </div>

              <div className="flex md:flex-col gap-2 md:min-w-[165px]">
                <button
                  type="button"
                  onClick={() => ubahStatusBaca(item)}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 text-emerald-950 bg-sky-100 hover:bg-sky-200 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold border-2 border-emerald-950 transition"
                >
                  <CheckCircle2 size={15} />
                  {item.dibaca ? 'Belum Dibaca' : 'Tandai Dibaca'}
                </button>
                <button
                  type="button"
                  onClick={() => hapusSaran(item.id)}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 text-white bg-rose-500 hover:bg-rose-600 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold border-2 border-emerald-950 transition"
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
