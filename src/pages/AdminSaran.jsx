import { useEffect, useMemo, useState } from 'react';
import { collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';
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
  } catch (error) {
    return 'Tanggal tidak tersedia';
  }
}

function getTimeValue(tanggal) {
  if (!tanggal) return 0;

  try {
    const dateObject = typeof tanggal.toDate === 'function' ? tanggal.toDate() : new Date(tanggal);
    return Number.isNaN(dateObject.getTime()) ? 0 : dateObject.getTime();
  } catch (error) {
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
    ambilDataSaran();
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
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b pb-5 mb-6">
        <div>
          <h3 className="text-xl font-black text-emerald-800">KOTAK SARAN MASUK</h3>
          <p className="text-sm text-gray-500 mt-1">
            Bagian ini dipakai admin untuk melihat kritik, masukan, dan saran yang dikirim dari halaman pengguna.
          </p>
        </div>

        <button
          type="button"
          onClick={ambilDataSaran}
          className="bg-emerald-600 text-white px-5 py-3 rounded-xl font-bold hover:bg-emerald-700 transition disabled:opacity-60"
          disabled={loading}
        >
          {loading ? 'Memuat...' : 'Refresh Data'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-5">
          <p className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Total Saran</p>
          <p className="text-3xl font-black text-emerald-900 mt-1">{saranList.length}</p>
        </div>
        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5">
          <p className="text-xs font-bold text-amber-600 uppercase tracking-wider">Belum Dibaca</p>
          <p className="text-3xl font-black text-amber-700 mt-1">{jumlahBelumDibaca}</p>
        </div>
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5">
          <p className="text-xs font-bold text-blue-600 uppercase tracking-wider">Sudah Dibaca</p>
          <p className="text-3xl font-black text-blue-700 mt-1">{saranList.length - jumlahBelumDibaca}</p>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-2xl mb-5 font-medium">
          {error}
        </div>
      )}

      {loading && (
        <div className="bg-gray-50 border border-gray-100 rounded-2xl p-8 text-center text-gray-500 font-bold">
          Sedang mengambil data saran...
        </div>
      )}

      {!loading && !error && saranList.length === 0 && (
        <div className="bg-gray-50 border border-dashed border-gray-300 rounded-2xl p-10 text-center">
          <p className="text-4xl mb-3">📭</p>
          <h4 className="font-black text-gray-700">Belum ada saran masuk</h4>
          <p className="text-sm text-gray-500 mt-1">Kalau pengguna mengirim saran dari halaman Kotak Saran, datanya akan tampil di sini.</p>
        </div>
      )}

      <div className="space-y-4">
        {saranList.map((item) => (
          <div
            key={item.id}
            className={`rounded-2xl border p-5 transition ${
              item.dibaca ? 'bg-white border-gray-100' : 'bg-amber-50 border-amber-200 shadow-sm'
            }`}
          >
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-full ${
                    item.dibaca ? 'bg-blue-50 text-blue-600' : 'bg-amber-200 text-amber-800'
                  }`}>
                    {item.dibaca ? 'Sudah dibaca' : 'Belum dibaca'}
                  </span>
                  <span className="text-xs text-gray-400 font-bold">{formatTanggal(item.tanggal)}</span>
                </div>

                <h4 className="font-black text-gray-800 text-lg">
                  {item.nama?.trim() ? item.nama : 'Anonim'}
                </h4>
                <p className="text-xs text-emerald-600 font-bold mb-3">
                  {item.kontak?.trim() ? item.kontak : 'Kontak tidak dicantumkan'}
                </p>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line bg-white/70 rounded-xl p-4 border border-gray-100">
                  {item.pesan}
                </p>
              </div>

              <div className="flex md:flex-col gap-2 md:min-w-[150px]">
                <button
                  type="button"
                  onClick={() => ubahStatusBaca(item)}
                  className="flex-1 text-blue-600 bg-blue-50 px-4 py-2 rounded-xl text-sm font-bold hover:bg-blue-600 hover:text-white transition"
                >
                  {item.dibaca ? 'Tandai Belum Dibaca' : 'Tandai Dibaca'}
                </button>
                <button
                  type="button"
                  onClick={() => hapusSaran(item.id)}
                  className="flex-1 text-red-600 bg-red-50 px-4 py-2 rounded-xl text-sm font-bold hover:bg-red-600 hover:text-white transition"
                >
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
