import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, ChevronRight } from 'lucide-react';

function BeritaSekolah({ berita = [] }) {
  return (
    <div className="bg-teal-50 min-h-screen font-sans pb-20 overflow-x-hidden">
      
      {/* ================= HEADER SECTION ================= */}
      <header className="relative pt-20 pb-16 px-6 bg-gradient-to-b from-emerald-200 to-teal-50 overflow-hidden">
        {/* Dekorasi Bergerak */}
        <div className="absolute top-10 left-10 text-5xl animate-bounce-slow opacity-30 select-none">🎈</div>
        <div className="absolute top-20 right-20 text-6xl animate-spin-slow opacity-20 select-none">🌻</div>
        <div className="absolute bottom-10 right-40 text-5xl animate-float opacity-30 select-none">🦋</div>
        
        <div className="max-w-6xl mx-auto relative z-10 text-center">
          <Link to="/" className="inline-flex items-center gap-2 text-emerald-700 font-bold hover:gap-3 transition-all mb-6 bg-white/50 px-4 py-2 rounded-full shadow-sm hover:bg-white">
            <ArrowLeft size={18} /> Kembali ke Beranda
          </Link>
          <h1 className="text-4xl md:text-5xl font-black text-slate-800 mb-4 drop-shadow-sm">
            Kabar & Keseruan di <br className="md:hidden" />
            <span className="text-emerald-600">RA At-Tajdid 🎪</span>
          </h1>
          <p className="text-slate-600 font-medium max-w-2xl mx-auto">
            Ikuti terus berbagai informasi terbaru, pengumuman, dan cerita seru dari kegiatan belajar bermain ananda.
          </p>
        </div>
      </header>

      {/* ================= CONTENT: LIST BERITA ================= */}
      <main className="max-w-6xl mx-auto px-6 -mt-8">
        {berita.length === 0 ? (
          // Tampilan jika belum ada berita
          <div className="bg-white rounded-[3rem] p-12 text-center shadow-xl border-t-8 border-slate-200">
            <div className="text-6xl mb-4 animate-bounce">📰</div>
            <h2 className="text-2xl font-black text-slate-700 mb-2">Belum Ada Berita</h2>
            <p className="text-slate-500">Nantikan kabar seru selanjutnya dari kami ya!</p>
          </div>
        ) : (
          // Tampilan Grid Berita
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {berita.map((item, idx) => (
              <div 
                key={item.id || idx} 
                className="bg-white rounded-[2.5rem] p-5 shadow-lg border-2 border-transparent hover:border-emerald-200 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col group"
              >
                {/* Gambar Berita */}
                <div className="aspect-[4/3] bg-teal-50 rounded-[2rem] overflow-hidden mb-5 relative">
                  {item.gambar ? (
                    <img 
                      src={item.gambar} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                      alt={item.judul} 
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-5xl bg-emerald-100">📸</div>
                  )}
                  {/* Badge Tanggal */}
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur text-emerald-700 text-xs font-black px-3 py-1.5 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-sm">
                    <Calendar size={14} />
                    {item.tanggal || "Terbaru"}
                  </div>
                </div>

                {/* Konten Berita */}
                <div className="flex-1 flex flex-col">
                  {/* Kategori (Opsional, jika ada) */}
                  {item.kategori && (
                    <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-500 mb-2">
                      {item.kategori}
                    </span>
                  )}
                  
                  <h3 className="font-black text-xl text-slate-800 mb-3 leading-snug group-hover:text-emerald-600 transition-colors">
                    {item.judul}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed line-clamp-3 mb-6 flex-1">
                    {item.isi}
                  </p>

                  {/* Tombol Baca (Hiasan) */}
                  <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between text-emerald-600 font-bold text-sm group-hover:text-emerald-500">
                    <span>Baca selengkapnya</span>
                    <span className="bg-emerald-50 p-1.5 rounded-full group-hover:bg-emerald-100 transition-colors">
                      <ChevronRight size={18} />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* ================= CUSTOM CSS ANIMASI ================= */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes bounce-slow { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 15s linear infinite; }
        .animate-bounce-slow { animation: bounce-slow 4s ease-in-out infinite; }
      `}} />

    </div>
  );
}

export default BeritaSekolah;