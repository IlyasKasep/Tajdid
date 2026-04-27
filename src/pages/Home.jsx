import React from 'react';
import { Link } from 'react-router-dom';

function Home({ berita = [], pengurus = [], galeri = [] }) {
  return (
    // Background utama menggunakan warna mint green yang sangat lembut
    <div className="bg-teal-50 min-h-screen font-sans text-slate-700 overflow-x-hidden">
      
      {/* ================= HERO SECTION (DUNIA PETUALANGAN MINT GREEN) ================= */}
      <section className="relative pt-12 pb-32 lg:pt-20 lg:pb-48 bg-gradient-to-b from-emerald-200 to-teal-50 px-6 overflow-hidden">
        
        {/* Elemen Mengambang (Awan, Matahari, Karakter) */}
        <div className="absolute top-8 left-10 text-6xl animate-[bounce_3s_infinite] opacity-80">☁️</div>
        <div className="absolute top-20 right-12 text-7xl animate-[spin_10s_linear_infinite] opacity-90">☀️</div>
        <div className="absolute bottom-32 left-24 text-5xl animate-[bounce_4s_infinite]">🎈</div>
        <div className="absolute top-40 left-1/2 text-4xl animate-pulse opacity-50">✨</div>
        <div className="absolute bottom-20 right-20 text-6xl hover:scale-125 transition-transform cursor-pointer">🦋</div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
          
          {/* Teks Hero */}
          <div className="text-center lg:text-left space-y-6">
            <div className="inline-block bg-white text-emerald-600 font-black px-5 py-2 rounded-full text-sm tracking-widest uppercase mb-2 shadow-sm border-2 border-emerald-100 hover:rotate-3 transition-transform">
              🎒 Yuk, Mulai Petualangan!
            </div>
            <h1 className="text-5xl lg:text-6xl font-black text-slate-800 leading-[1.2]">
              Dunia Ceria di <br />
              <span className="text-emerald-600 drop-shadow-md">RA At-Tajdied!</span>
            </h1>
            <p className="text-lg text-slate-600 font-medium max-w-md mx-auto lg:mx-0 bg-white/40 backdrop-blur-sm p-4 rounded-3xl border-2 border-white/50 shadow-sm">
              Tempat di mana si kecil bermain, berimajinasi, dan belajar nilai-nilai Islami dengan penuh kegembiraan setiap hari.
            </p>
            <div className="pt-6">
              <button className="bg-rose-400 text-white font-black text-xl px-10 py-4 rounded-full hover:bg-rose-500 hover:scale-105 active:scale-95 transform transition-all shadow-[0_8px_0_rgb(190,18,60,1)] active:translate-y-2 active:shadow-none">
                Daftar Sekarang 🚀
              </button>
            </div>
          </div>

          {/* Ilustrasi Lingkaran Magis */}
          <div className="relative flex justify-center mt-12 lg:mt-0 group">
            <div className="absolute w-72 h-72 lg:w-96 lg:h-96 bg-yellow-200 rounded-full mix-blend-multiply filter blur-2xl opacity-60 group-hover:scale-110 transition-transform duration-700"></div>
            <div className="absolute w-72 h-72 lg:w-96 lg:h-96 bg-teal-200 rounded-full mix-blend-multiply filter blur-2xl opacity-60 translate-x-10 translate-y-10 group-hover:-translate-x-4 transition-transform duration-700"></div>
            
            <div className="relative w-72 h-72 lg:w-96 lg:h-96 bg-white border-8 border-white rounded-[3rem] shadow-2xl flex items-center justify-center text-8xl overflow-hidden group-hover:rotate-2 transition-all duration-500">
              {/* Karakter yang melompat di dalam kotak */}
              <span className="animate-bounce">👦👧</span>
            </div>
            
            <div className="absolute -bottom-6 -left-6 bg-amber-400 text-amber-900 font-black px-6 py-6 rounded-full border-4 border-white shadow-xl hover:rotate-12 hover:scale-110 transition-all cursor-pointer">
              <p className="text-center leading-tight">Since<br/>2010</p>
            </div>
          </div>
        </div>

        {/* --- SHAPE DIVIDER AWAN --- */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none rotate-180">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-16 lg:h-24 text-teal-50 fill-current">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
          </svg>
        </div>
      </section>

      {/* ================= FITUR MENU (EFEK MELOMPAT/BOUNCING) ================= */}
      <section className="py-20 px-6 max-w-6xl mx-auto -mt-10 relative z-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-black text-emerald-800 mb-4">Jelajahi Dunia Kami! 🗺️</h2>
          <p className="text-emerald-600 font-bold bg-emerald-100 inline-block px-6 py-2 rounded-full border-2 border-emerald-200">Klik kartu di bawah untuk mulai bermain</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Kartu Buku Tamu */}
          <Link to="/bukutamu" className="group bg-white rounded-[2.5rem] p-6 text-center border-4 border-rose-100 hover:border-rose-300 shadow-lg hover:shadow-2xl hover:-translate-y-4 hover:rotate-2 transition-all duration-300 relative">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-20 h-6 bg-rose-300/80 rounded-full rotate-[-3deg]"></div>
            <div className="text-6xl mb-4 group-hover:animate-[bounce_1s_infinite]">📖</div>
            <h3 className="text-2xl font-black text-rose-500 mb-2">Buku Tamu</h3>
            <p className="font-medium text-slate-500 text-sm">Tinggalkan sapaan manis untuk teman-teman RA At-Tajdied!</p>
          </Link>

          {/* Kartu Polling */}
          <Link to="/polling" className="group bg-white rounded-[2.5rem] p-6 text-center border-4 border-amber-100 hover:border-amber-300 shadow-lg hover:shadow-2xl hover:-translate-y-4 hover:-rotate-2 transition-all duration-300 relative mt-8 lg:mt-0">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-20 h-6 bg-amber-300/80 rounded-full rotate-[4deg]"></div>
            <div className="text-6xl mb-4 group-hover:animate-[bounce_1s_infinite]">📊</div>
            <h3 className="text-2xl font-black text-amber-500 mb-2">Polling</h3>
            <p className="font-medium text-slate-500 text-sm">Bantu kami memilih kegiatan seru berikutnya.</p>
          </Link>

          {/* Kartu Forum Chat */}
          <Link to="/chat" className="group bg-white rounded-[2.5rem] p-6 text-center border-4 border-sky-100 hover:border-sky-300 shadow-lg hover:shadow-2xl hover:-translate-y-4 hover:rotate-2 transition-all duration-300 relative">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-20 h-6 bg-sky-300/80 rounded-full rotate-[-2deg]"></div>
            <div className="text-6xl mb-4 group-hover:animate-[bounce_1s_infinite]">💬</div>
            <h3 className="text-2xl font-black text-sky-500 mb-2">Forum Chat</h3>
            <p className="font-medium text-slate-500 text-sm">Ruang ngobrol asyik ayah, bunda, dan bunda guru.</p>
          </Link>

          {/* Kartu Download */}
          <Link to="/download" className="group bg-white rounded-[2.5rem] p-6 text-center border-4 border-emerald-100 hover:border-emerald-300 shadow-lg hover:shadow-2xl hover:-translate-y-4 hover:-rotate-2 transition-all duration-300 relative mt-8 lg:mt-0">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-20 h-6 bg-emerald-300/80 rounded-full rotate-[3deg]"></div>
            <div className="text-6xl mb-4 group-hover:animate-[bounce_1s_infinite]">📁</div>
            <h3 className="text-2xl font-black text-emerald-500 mb-2">Kotak Harta</h3>
            <p className="font-medium text-slate-500 text-sm">Unduh materi belajar dan lembar mewarnai di sini.</p>
          </Link>
        </div>
      </section>

      {/* ================= BIODATA GURU (KARTU MENGGEMASKAN) ================= */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="text-4xl font-black text-slate-800">Kenalan dengan Bunda! 💖</h2>
            <p className="text-emerald-500 font-bold mt-2">Pendidik super sabar yang siap menemani si kecil</p>
          </div>
          <Link to="/biodata" className="bg-emerald-100 text-emerald-700 border-2 border-emerald-200 px-8 py-3 rounded-full font-bold hover:bg-emerald-500 hover:text-white transition-all shadow-sm hover:shadow-md hover:-translate-y-1">Lihat Semua Guru</Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pt-10">
          {pengurus.slice(0, 4).map((item, idx) => (
            <div key={idx} className="bg-white p-6 border-4 border-teal-100 rounded-[3rem] text-center shadow-lg hover:-translate-y-3 hover:shadow-xl hover:border-teal-300 transition-all duration-300 relative group">
              <div className="w-28 h-28 mx-auto rounded-full bg-emerald-50 border-4 border-emerald-200 shadow-inner overflow-hidden -mt-16 mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                {item.foto ? (
                   <img src={item.foto} alt={item.nama} className="w-full h-full object-cover" />
                ) : (
                   <div className="w-full h-full flex items-center justify-center text-5xl">👩‍🏫</div>
                )}
              </div>
              <h3 className="text-xl font-black text-slate-700 group-hover:text-emerald-600 transition-colors">{item.nama}</h3>
              <p className="inline-block mt-2 bg-yellow-100 text-yellow-700 text-xs font-bold px-3 py-1.5 rounded-full">{item.jabatan}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= BERITA & KEGIATAN (PAPAN CERITA) ================= */}
      <section className="py-24 bg-emerald-50/50 px-6 border-y-8 border-emerald-100 relative overflow-hidden">
        {/* Ornamen Mengambang */}
        <div className="absolute top-10 right-10 text-6xl opacity-40 animate-[spin_12s_linear_infinite]">⭐</div>
        <div className="absolute bottom-10 left-10 text-6xl opacity-40 animate-bounce">🎨</div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-emerald-800">Papan Cerita & Kabar Seru 🎪</h2>
            <p className="text-emerald-600 font-medium mt-2">Jangan lewatkan momen seru dari sekolah kita!</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {berita.slice(0, 3).map((item, idx) => (
              <div key={idx} className="bg-white rounded-[2.5rem] overflow-hidden shadow-lg border-4 border-white hover:border-emerald-200 hover:-translate-y-3 hover:shadow-2xl transition-all duration-300 group cursor-pointer">
                <div className="h-48 bg-teal-100 relative overflow-hidden">
                  {item.gambar ? (
                    <img src={item.gambar} alt={item.judul} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-5xl group-hover:scale-125 transition-transform duration-500">📸</div>
                  )}
                  {/* Pita Label Kategori */}
                  <div className="absolute top-4 left-4 bg-rose-400 text-white text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-md">
                    {item.kategori || 'Kegiatan'}
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-black text-slate-800 mb-3 leading-tight group-hover:text-emerald-600 transition-colors">{item.judul}</h3>
                  <p className="text-slate-500 text-sm line-clamp-3 mb-6 leading-relaxed">{item.isi}</p>
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-400 bg-slate-50 w-fit px-3 py-1.5 rounded-lg">
                    <span>📅</span> {item.tanggal}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= GALERI KARYA (POLAROID EFEK HOVER KENCANG) ================= */}
      <section className="py-24 px-6 max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-black text-slate-800 mb-4">Galeri Momen Indah 🖼️</h2>
        <p className="text-slate-500 font-medium mb-16 bg-white inline-block px-6 py-2 rounded-full border border-slate-200 shadow-sm">Karya hebat dan senyum manis anak-anak RA At-Tajdied</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-4 md:px-0">
          {galeri.slice(0, 4).map((item, idx) => (
            // Polaroid Card
            <div key={idx} className={`bg-white p-3 pb-8 rounded-xl shadow-xl relative hover:scale-110 hover:z-30 hover:rotate-0 transition-all duration-300 cursor-pointer ${idx % 2 === 0 ? 'rotate-3' : '-rotate-3'}`}>
              <div className={`absolute -top-4 left-1/2 -translate-x-1/2 w-12 h-6 rounded-sm ${idx % 2 === 0 ? 'bg-sky-200/90' : 'bg-pink-200/90'} rotate-1`}></div> {/* Washi Tape */}
              <div className="w-full h-40 md:h-48 bg-slate-100 border border-slate-200 mb-4 overflow-hidden rounded-md">
                {item.urlFoto ? (
                  <img src={item.urlFoto} alt={item.judul} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-4xl">🎨</div>
                )}
              </div>
              <p className="font-black text-sm text-slate-700 leading-tight handwriting-font">{item.judul}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-16">
           <Link to="/galeri" className="inline-flex items-center gap-2 bg-emerald-500 text-white font-black text-lg px-8 py-4 rounded-full hover:bg-emerald-600 transition-transform hover:scale-105 active:scale-95 shadow-[0_6px_0_rgb(5,150,105,1)] active:translate-y-1 active:shadow-none">
             Lihat Semua Koleksi Foto 📸
           </Link>
        </div>
      </section>

      {/* ================= FOOTER SEDERHANA (HANYA MUNCUL JIKA TIDAK ADA COMPONENT FOOTER) ================= */}
      <footer className="bg-emerald-800 pt-16 pb-8 border-t-8 border-teal-400 text-center relative overflow-hidden mt-10">
        <div className="absolute -top-4 right-10 text-6xl opacity-10 animate-pulse">⭐️</div>
        <div className="absolute top-10 left-10 text-6xl opacity-10 animate-bounce">🎈</div>
        
        <h2 className="text-3xl font-black text-white mb-2">RA AT-TAJDIED</h2>
        <p className="text-teal-300 font-black text-sm tracking-widest uppercase mb-6 bg-teal-900/50 inline-block px-4 py-1 rounded-full">Islamic School</p>
        <p className="text-emerald-100/70 text-sm max-w-md mx-auto mb-8 font-medium">
          Menemani langkah kecil anak-anak menuju masa depan yang cerdas, kreatif, dan berakhlak mulia.
        </p>
        <div className="text-emerald-400 text-xs font-bold border-t border-emerald-700 pt-8 w-full max-w-4xl mx-auto">
          © {new Date().getFullYear()} RA AT-TAJDIED. Bermain & Belajar Sepenuh Hati. ❤️
        </div>
      </footer>

    </div>
  );
}

export default Home;