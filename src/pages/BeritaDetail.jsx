import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase'; // Sesuaikan path dengan file firebase Anda

function BeritaDetail() {
  const { id } = useParams(); // Mengambil ID dari URL
  const [detailBerita, setDetailBerita] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ambilDetailBerita = async () => {
      try {
        const docRef = doc(db, 'berita', id); // Asumsi nama koleksi di Firebase adalah 'berita'
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setDetailBerita(docSnap.data());
        } else {
          console.log("Berita tidak ditemukan!");
        }
      } catch (error) {
        console.error("Error mengambil detail berita: ", error);
      } finally {
        setLoading(false);
      }
    };

    ambilDetailBerita();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (!detailBerita) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-slate-50">
        <h2 className="text-2xl font-bold text-slate-800">Berita tidak ditemukan</h2>
        <Link to="/berita" className="mt-4 text-emerald-600 hover:underline">Kembali ke Daftar Berita</Link>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen pt-10 pb-20">
      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* Tombol Kembali */}
        <Link to="/berita" className="inline-flex items-center text-emerald-600 font-bold mb-8 hover:-translate-x-2 transition-transform">
          <span className="mr-2">←</span> Kembali ke Berita
        </Link>

        {/* Konten Detail */}
        <article className="bg-white rounded-[3rem] p-8 md:p-12 shadow-xl border-t-8 border-emerald-500">
          <h1 className="text-3xl md:text-5xl font-black text-slate-800 mb-6 leading-tight">
            {detailBerita.judul}
          </h1>
          
          <div className="flex items-center gap-4 text-sm font-medium text-slate-500 mb-8 border-b border-slate-100 pb-6">
             <span className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full uppercase tracking-widest text-[10px]">
               Kegiatan
             </span>
             {/* Jika ada field tanggal di firebase: */}
             <span>{detailBerita.tanggal || "Tanggal tidak tersedia"}</span>
          </div>

          {detailBerita.gambar && (
            <div className="aspect-video w-full rounded-[2rem] overflow-hidden mb-10 shadow-md">
              <img 
                src={detailBerita.gambar} 
                alt={detailBerita.judul} 
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="prose prose-lg prose-slate max-w-none prose-p:leading-relaxed prose-p:text-slate-600">
            {/* Jika teks dari firebase berisi line break, map teks tersebut: */}
            {detailBerita.isi && detailBerita.isi.split('\n').map((paragraf, index) => (
              <p key={index} className="mb-4">
                {paragraf}
              </p>
            ))}
          </div>
        </article>
      </main>
    </div>
  );
}

export default BeritaDetail;