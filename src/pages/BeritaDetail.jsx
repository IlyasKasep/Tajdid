import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { ArrowLeft } from 'lucide-react';
import { db } from '../firebase';

function BeritaDetail() {
  const { id } = useParams();
  const [detailBerita, setDetailBerita] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ambilDetailBerita = async () => {
      try {
        const docRef = doc(db, 'berita', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setDetailBerita(docSnap.data());
        } else {
          console.log('Berita tidak ditemukan!');
        }
      } catch (error) {
        console.error('Error mengambil detail berita: ', error);
      } finally {
        setLoading(false);
      }
    };

    ambilDetailBerita();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-teal-50">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-emerald-200 border-t-emerald-700" />
      </div>
    );
  }

  if (!detailBerita) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-teal-50 px-6 space-y-4">
        <h2 className="text-2xl font-black text-emerald-950">Berita tidak ditemukan</h2>
        <Link
          to="/berita"
          className="bg-amber-300 text-emerald-950 font-extrabold px-5 py-2.5 rounded-xl border-2 border-emerald-950 shadow-[3px_3px_0px_#064e3b]"
        >
          Kembali ke Daftar Berita
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-teal-50 min-h-screen py-12 px-4 sm:px-6">
      <main className="max-w-4xl mx-auto">
        {/* Tombol Kembali */}
        <Link
          to="/berita"
          className="inline-flex items-center gap-2 bg-white text-emerald-950 font-extrabold px-4 py-2 rounded-full border-2 border-emerald-950 shadow-[3px_3px_0px_#064e3b] hover:bg-emerald-50 transition-all mb-8 text-sm"
        >
          <ArrowLeft size={16} /> Kembali ke Berita
        </Link>

        {/* Konten Detail */}
        <article className="bg-white rounded-3xl p-7 sm:p-10 md:p-12 border-2 border-emerald-950 shadow-[8px_8px_0px_#064e3b]">
          <div className="flex flex-wrap items-center gap-3 text-xs font-extrabold text-slate-600 mb-5">
            <span className="bg-amber-300 text-emerald-950 border-2 border-emerald-950 px-3.5 py-1 rounded-full uppercase tracking-widest text-[11px]">
              {detailBerita.kategori || 'Kegiatan'}
            </span>
            <span>{detailBerita.tanggal || 'Tanggal tidak tersedia'}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-emerald-950 mb-8 leading-tight">
            {detailBerita.judul}
          </h1>

          {detailBerita.gambar && (
            <div className="aspect-video w-full rounded-2xl overflow-hidden mb-8 border-2 border-emerald-950 shadow-[5px_5px_0px_#0d9488]">
              <img
                src={detailBerita.gambar}
                alt={detailBerita.judul}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="space-y-4 text-slate-700 text-base sm:text-lg leading-relaxed font-medium">
            {detailBerita.isi &&
              detailBerita.isi.split('\n').map((paragraf, index) => (
                <p key={index}>{paragraf}</p>
              ))}
          </div>
        </article>
      </main>
    </div>
  );
}

export default BeritaDetail;
