import React from 'react';

function Home({ berita = [], pengurus = [], galeri = [], bukutamu = [] }) {
  return (
    <div className="bg-sky-50 min-h-screen font-sans overflow-x-hidden">
      
      {/* ================= HERO SECTION (SELAMAT DATANG) ================= */}
      <section className="relative pt-20 pb-32 bg-gradient-to-b from-sky-300 to-sky-50 px-4">
        {/* Dekorasi Awan (Menggunakan emoji atau SVG sederhana) */}
        <div className="absolute top-10 left-10 text-6xl animate-bounce">☁️</div>
        <div className="absolute top-20 right-20 text-6xl animate-pulse">☀️</div>
        <div className="absolute bottom-10 right-10 text-6xl">🎈</div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-black text-white drop-shadow-[0_6px_0_rgba(2,132,199,1)] mb-6 tracking-wide">
            Selamat Datang di <br className="hidden md:block"/> <span className="text-amber-300">TK Ceria Kita!</span> 🌟
          </h1>
          <p className="text-xl md:text-2xl text-sky-800 font-bold max-w-2xl mx-auto mb-10 bg-white/50 backdrop-blur-sm p-4 rounded-3xl border-4 border-white border-dashed">
            Tempat bermain, belajar, dan tumbuh bersama dengan penuh kegembiraan! 🎨🧸🚌
          </p>
          <a href="#kegiatan" className="inline-block bg-rose-400 text-white font-extrabold text-2xl px-10 py-5 rounded-full hover:bg-rose-500 hover:-translate-y-2 transform transition-all duration-300 shadow-[0_8px_0_rgb(225,29,72,1)] active:translate-y-2 active:shadow-none">
            Yuk, Jalan-jalan! 🚀
          </a>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 space-y-32 pb-20 -mt-10 relative z-20">

        {/* ================= SECTION BERITA & KEGIATAN ================= */}
        <section id="kegiatan" className="relative">
          <div className="text-center mb-12">
             <h2 className="text-4xl font-black text-indigo-500 mb-4 inline-block bg-indigo-100 px-8 py-3 rounded-[3rem] border-4 border-indigo-300 shadow-sm">
                🎪 Papan Cerita & Kegiatan
             </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {berita.map((item, index) => (
              <div key={item.id || index} className="bg-white rounded-[3rem] p-6 border-4 border-indigo-200 shadow-[0_8px_0_rgb(199,210,254,1)] hover:-translate-y-2 transition-all group">
                {item.gambar ? (
                  <img src={item.gambar} alt={item.judul} className="w-full h-48 object-cover rounded-3xl border-4 border-indigo-50 mb-4 group-hover:scale-105 transition-transform" />
                ) : (
                  <div className="w-full h-48 bg-indigo-50 rounded-3xl border-4 border-indigo-100 mb-4 flex items-center justify-center text-5xl">🎨</div>
                )}
                <span className="inline-block bg-amber-300 text-amber-900 text-sm font-extrabold px-4 py-1.5 rounded-full mb-3 uppercase">
                  {item.kategori}
                </span>
                <h3 className="text-2xl font-black text-slate-700 mb-2 leading-tight">{item.judul}</h3>
                <p className="text-slate-500 font-medium line-clamp-3 mb-4">{item.isi}</p>
                <div className="text-indigo-400 font-bold text-sm flex items-center gap-2">
                  🗓️ {item.tanggal}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ================= SECTION PENGURUS (GURU) ================= */}
        <section className="bg-amber-100 rounded-[4rem] p-10 md:p-16 border-8 border-amber-300 relative">
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 text-7xl">👩‍🏫</div>
          <div className="text-center mb-12 mt-4">
             <h2 className="text-4xl font-black text-amber-700">Kenalan dengan Bunda Guru! 💖</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {pengurus.map((item, index) => (
              <div key={item.id || index} className="bg-white rounded-[3rem] p-6 border-4 border-amber-200 text-center shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all">
                <div className="w-32 h-32 mx-auto bg-amber-50 rounded-full border-8 border-amber-100 mb-4 overflow-hidden shadow-inner">
                  {item.foto ? (
                    <img src={item.foto} alt={item.nama} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-6xl flex items-center justify-center h-full">👤</span>
                  )}
                </div>
                <h3 className="text-xl font-black text-slate-700">{item.nama}</h3>
                <p className="inline-block bg-pink-100 text-pink-600 font-bold px-4 py-1 rounded-full text-sm mt-2">
                  {item.jabatan}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ================= SECTION GALERI ================= */}
        <section>
          <div className="text-center mb-12">
             <h2 className="text-4xl font-black text-pink-500 mb-4 inline-block bg-pink-100 px-8 py-3 rounded-[3rem] border-4 border-pink-300 shadow-sm">
                📸 Karya & Senyum Ceria
             </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-2">
            {galeri.map((item, index) => (
              <div key={item.id || index} className={`bg-white p-3 rounded-2xl border-4 border-pink-200 shadow-md transition-all hover:scale-110 hover:z-10 ${index % 2 === 0 ? 'rotate-2' : '-rotate-2'}`}>
                <img src={item.urlFoto} alt={item.judul} className="w-full h-40 md:h-48 object-cover rounded-xl border-2 border-pink-50 mb-3" />
                <h4 className="font-extrabold text-slate-700 text-center text-sm mb-2">{item.judul}</h4>
              </div>
            ))}
          </div>
        </section>

      </div>

      {/* ================= FOOTER LUCU ================= */}
      <footer className="bg-sky-400 pt-16 pb-8 border-t-8 border-sky-300 mt-20 text-center relative overflow-hidden">
        <div className="absolute -top-6 left-20 text-5xl">🏰</div>
        <div className="absolute -top-6 right-20 text-5xl">🌈</div>
        
        <h2 className="text-3xl font-black text-white mb-6">TK Ceria Kita</h2>
        <p className="text-sky-100 font-bold text-lg mb-8">Belajar seru, bermain asyik setiap hari!</p>
        <div className="bg-sky-500/50 inline-block px-8 py-3 rounded-full text-white font-bold">
          © {new Date().getFullYear()} Dibuat dengan ❤️ untuk Anak-Anak
        </div>
      </footer>

    </div>
  );
}

export default Home;