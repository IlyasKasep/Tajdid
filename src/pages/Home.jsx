import React from 'react';
import { Link } from 'react-router-dom';

function Home({ berita = [], pengurus = [], galeri = [] }) {
  return (
    // Background warna krem hangat seperti di gambar referensi
    <div className="bg-[#fefaf3] min-h-screen font-sans text-slate-700 overflow-x-hidden">
      
      {/* ================= HERO SECTION (AWAN & KECERIAAN) ================= */}
      <section className="relative pt-12 pb-32 lg:pt-20 lg:pb-48 bg-[#fff0d4] px-6">
        {/* Dekorasi Mengambang */}
        <div className="absolute top-10 left-10 text-5xl animate-bounce">☀️</div>
        <div className="absolute top-24 right-16 text-5xl animate-pulse">🦋</div>
        <div className="absolute bottom-20 left-20 text-6xl">🐌</div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <div className="text-center lg:text-left space-y-6">
            <div className="inline-block bg-rose-400 text-white font-black px-4 py-1.5 rounded-full text-sm tracking-widest uppercase mb-2 rotate-[-2deg]">
              Belajar itu Petualangan! 🚀
            </div>
            <h1 className="text-5xl lg:text-6xl font-black text-slate-800 leading-[1.1]">
              Awal yang Bahagia <br />
              <span className="text-emerald-500">untuk Si Kecil!</span>
            </h1>
            <p className="text-lg text-slate-600 font-medium max-w-md mx-auto lg:mx-0">
            Melalui kegiatan yang kreatif, islami, dan menyenangkan, kami percaya bahwa pendidikan usia dini adalah fondasi penting untuk membentuk generasi yang beriman, berilmu, dan berakhlak baik. RA At-Tajdied bukan sekadar tempat belajar, tetapi rumah kedua bagi anak-anak untuk tumbuh dengan bahagia dan penuh kasih sayang.
            </p>
            <div className="pt-4">
              <button className="bg-amber-400 text-amber-900 font-black text-xl px-8 py-4 rounded-full hover:bg-amber-500 hover:-translate-y-2 transform transition-all shadow-[0_6px_0_rgb(180,83,9,1)] active:translate-y-2 active:shadow-none">
                Daftar Sekarang!
              </button>
            </div>
          </div>

          {/* Placeholder untuk Gambar Anak Bahagia */}
          <div className="relative flex justify-center mt-10 lg:mt-0">
            {/* Lingkaran Background */}
            <div className="absolute w-80 h-80 bg-amber-200 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
            <div className="relative w-72 h-72 lg:w-96 lg:h-96 bg-white border-8 border-white rounded-[3rem] shadow-2xl flex items-center justify-center text-8xl overflow-hidden rotate-3 hover:rotate-0 transition-all duration-500">
              <span className="animate-bounce">👦👧</span>
              {/* Note: Anda bisa mengganti div ini dengan tag <img> anak TK asli */}
            </div>
            <div className="absolute -bottom-6 -right-6 bg-emerald-400 text-white font-black px-6 py-6 rounded-full border-4 border-white shadow-xl rotate-12">
              <p className="text-center leading-tight">Since<br/>2010</p>
            </div>
          </div>
        </div>

        {/* --- SHAPE DIVIDER AWAN DI BAWAH HERO --- */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none rotate-180">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-16 lg:h-24 text-[#fefaf3] fill-current">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
          </svg>
        </div>
      </section>

      {/* ================= FITUR SEKOLAH (LINK DARI HEADER) ================= */}
      <section className="py-20 px-6 max-w-6xl mx-auto -mt-10 relative z-20">
        <div className="text-center mb-16">
          <p className="text-amber-500 font-bold mb-2">Bermain Sambil Belajar</p>
          <h2 className="text-4xl lg:text-5xl font-black text-slate-800">Jelajahi Dunia Kami!</h2>
        </div>

        {/* Kartu Warna-warni (Buku Tamu, Polling, Chat, Download) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Menu Buku Tamu */}
          <Link to="/bukutamu" className="bg-rose-400 rounded-[2rem] p-6 text-white text-center hover:-translate-y-3 transition-transform shadow-xl relative group">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-rose-200/80 rotate-[-4deg]"></div> {/* Selotip */}
            <div className="text-6xl mb-4 group-hover:animate-bounce">📖</div>
            <h3 className="text-2xl font-black mb-2">Buku Tamu</h3>
            <p className="font-medium text-rose-100 text-sm">Tinggalkan sapaan dan pesan manis untuk sekolah kami!</p>
          </Link>

          {/* Menu Polling */}
          <Link to="/polling" className="bg-amber-400 rounded-[2rem] p-6 text-amber-900 text-center hover:-translate-y-3 transition-transform shadow-xl relative group mt-8 lg:mt-0">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-amber-200/80 rotate-[3deg]"></div> {/* Selotip */}
            <div className="text-6xl mb-4 group-hover:animate-bounce">📊</div>
            <h3 className="text-2xl font-black mb-2">Polling</h3>
            <p className="font-medium text-amber-800/80 text-sm">Ikuti jejak pendapat dan bantu kami jadi lebih baik.</p>
          </Link>

          {/* Menu Forum Chat */}
          <Link to="/chat" className="bg-sky-400 rounded-[2rem] p-6 text-white text-center hover:-translate-y-3 transition-transform shadow-xl relative group">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-sky-200/80 rotate-[-2deg]"></div> {/* Selotip */}
            <div className="text-6xl mb-4 group-hover:animate-bounce">💬</div>
            <h3 className="text-2xl font-black mb-2">Forum Chat</h3>
            <p className="font-medium text-sky-100 text-sm">Ruang diskusi seru untuk ayah, bunda, dan para guru.</p>
          </Link>

          {/* Menu Download */}
          <Link to="/download" className="bg-emerald-400 rounded-[2rem] p-6 text-white text-center hover:-translate-y-3 transition-transform shadow-xl relative group mt-8 lg:mt-0">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-emerald-200/80 rotate-[5deg]"></div> {/* Selotip */}
            <div className="text-6xl mb-4 group-hover:animate-bounce">📁</div>
            <h3 className="text-2xl font-black mb-2">Download</h3>
            <p className="font-medium text-emerald-100 text-sm">Unduh materi belajar, formulir, dan brosur sekolah.</p>
          </Link>
        </div>
      </section>

      {/* ================= BIODATA PENGURUS ================= */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <p className="text-emerald-500 font-bold mb-2">Pendidik Penuh Kasih Sayang</p>
            <h2 className="text-4xl font-black text-slate-800">Kenalan dengan Bunda Guru!</h2>
          </div>
          <Link to="/biodata" className="bg-slate-800 text-white px-6 py-3 rounded-full font-bold hover:bg-slate-700 transition">Lihat Semua Guru</Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {pengurus.slice(0, 4).map((item, idx) => (
            <div key={idx} className="bg-white p-4 border-4 border-amber-100 rounded-3xl text-center shadow-lg hover:-translate-y-2 transition relative">
              <div className="w-24 h-24 mx-auto rounded-full bg-emerald-100 border-4 border-white shadow-md overflow-hidden -mt-10 mb-4">
                {item.foto ? (
                   <img src={item.foto} alt={item.nama} className="w-full h-full object-cover" />
                ) : (
                   <div className="w-full h-full flex items-center justify-center text-4xl">👩‍🏫</div>
                )}
              </div>
              <h3 className="text-xl font-black text-slate-700">{item.nama}</h3>
              <p className="text-sm font-bold text-amber-500 mt-1 mb-2">{item.jabatan}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= BERITA & KEGIATAN (PAPAN CERITA) ================= */}
      <section className="py-20 bg-sky-50 px-6 border-y-8 border-sky-100 relative overflow-hidden">
        {/* Hiasan Latar */}
        <div className="absolute top-10 right-10 text-6xl opacity-30">🪁</div>
        
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-slate-800">Papan Cerita & Kegiatan</h2>
            <p className="text-sky-700 font-medium mt-2">Ikuti keseruan dan informasi terbaru dari At-Tajdied</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {berita.slice(0, 3).map((item, idx) => (
              <div key={idx} className="bg-white rounded-[2rem] overflow-hidden shadow-lg border-4 border-sky-100 hover:scale-105 transition-transform">
                <div className="h-48 bg-sky-200 relative">
                  {item.gambar ? (
                    <img src={item.gambar} alt={item.judul} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-5xl">🎨</div>
                  )}
                  {/* Selotip Hiasan Foto */}
                  <div className="absolute -top-2 -right-4 w-16 h-6 bg-sky-300/80 rotate-45"></div>
                </div>
                <div className="p-6">
                  <span className="bg-amber-100 text-amber-600 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wide">{item.kategori || 'Kegiatan'}</span>
                  <h3 className="text-xl font-black text-slate-800 mt-4 mb-2 leading-tight">{item.judul}</h3>
                  <p className="text-slate-500 text-sm line-clamp-2 mb-4">{item.isi}</p>
                  <p className="text-xs font-bold text-slate-400">📅 {item.tanggal}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= GALERI KARYA (POLAROID STYLE) ================= */}
      <section className="py-24 px-6 max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-black text-slate-800 mb-2">Galeri Momen Indah</h2>
        <p className="text-slate-500 font-medium mb-12">Senyum ceria dan karya hebat anak-anak At-Tajdied</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {galeri.slice(0, 4).map((item, idx) => (
            <div key={idx} className={`bg-white p-3 pb-8 rounded-lg shadow-xl relative hover:scale-110 hover:z-10 transition-all ${idx % 2 === 0 ? 'rotate-3' : '-rotate-3'}`}>
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-6 bg-pink-200/80 rotate-1"></div> {/* Selotip Polaroid */}
              <div className="w-full h-40 bg-slate-100 border border-slate-200 mb-3 overflow-hidden">
                {item.urlFoto ? (
                  <img src={item.urlFoto} alt={item.judul} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-3xl">📸</div>
                )}
              </div>
              <p className="font-black text-sm text-slate-700 leading-tight">{item.judul}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-12">
           <Link to="/galeri" className="inline-block bg-pink-400 text-white font-black px-8 py-3 rounded-full hover:bg-pink-500 transition shadow-[0_4px_0_rgb(219,39,119,1)] active:translate-y-1 active:shadow-none">Lihat Semua Foto</Link>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-slate-800 pt-16 pb-8 border-t-8 border-amber-400 text-center relative overflow-hidden mt-10">
        <div className="absolute -top-4 right-1/4 text-6xl opacity-20">⭐️</div>
        <h2 className="text-3xl font-black text-white mb-2">AT-TAJDIED</h2>
        <p className="text-emerald-300 font-medium text-sm tracking-widest uppercase mb-6">Islamic School</p>
        <p className="text-slate-400 text-sm max-w-md mx-auto mb-8">
          Membentuk generasi penerus yang cerdas, kreatif, dan berakhlak mulia.
        </p>
        <div className="text-slate-500 text-sm font-bold border-t border-slate-700 pt-8 w-full max-w-4xl mx-auto">
          © {new Date().getFullYear()} AT-TAJDIED. Dibuat dengan ❤️ untuk si buah hati.
        </div>
      </footer>

    </div>
  );
}

export default Home;