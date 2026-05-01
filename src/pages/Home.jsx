import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Import CSS Swiper
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// === DATA FOTO & SLOGAN UNIK ANAK TK ===
const sliderData = [
  {
    src: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&q=80",
    slogan: "✨ Bermain dengan Hati, Belajar dengan Gembira!"
  },
  {
    src: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop",
    slogan: "🌟 Menjadi Bintang Kecil yang Berakhlak Mulia"
  },
  {
    src: "https://images.unsplash.com/photo-1587654062363-20a2ea0958b2?q=80&w=800&auto=format&fit=crop",
    slogan: "🚀 Eksplorasi Tanpa Batas, Tumbuh dengan Cerdas"
  }
];

function Home({ berita = [] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="bg-teal-50 min-h-screen font-sans text-slate-700 overflow-x-hidden">
      
      {/* ================= HERO SECTION ================= */}
      <section className="relative pt-12 pb-32 lg:pt-20 lg:pb-48 bg-gradient-to-b from-emerald-200 to-teal-50 px-6 overflow-hidden">
        
        {/* Dekorasi Bergerak */}
        <div className="hidden lg:block absolute top-10 left-10 text-6xl animate-slow-spin opacity-70 select-none">☀️</div>
        <div className="hidden lg:block absolute top-24 right-16 text-5xl animate-float opacity-80 select-none">🦋</div>
        <div className="hidden lg:block absolute bottom-20 left-20 text-7xl animate-float-delayed opacity-70 select-none">🐌</div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
          
          <div className="text-center lg:text-left space-y-6">
            <div className="inline-block bg-teal-600 text-white font-black px-4 py-1.5 rounded-full text-sm tracking-widest uppercase mb-2 shadow-sm animate-pulse-slow">
              RA PERSIS 175 AT TAJDID
            </div>
            <h1 className="text-4xl lg:text-6xl font-black text-slate-800 leading-tight">
              Dunia Ceria di <br />
              <span className="text-emerald-600 drop-shadow-sm">RA At-Tajdid!</span>
            </h1>
            <p className="text-base text-slate-600 max-w-md mx-auto lg:mx-0 leading-relaxed font-medium">
              Tempat tumbuhnya generasi sehat, cerdas, bahagia, dan berakhlak mulia sejak tahun 2010.
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-2">
              <Link to="/kontak" className="bg-rose-500 text-white font-black px-8 py-3.5 rounded-full hover:bg-rose-600 transition-all hover:scale-105 shadow-[0_4px_0_rgb(225,29,72,1)] active:translate-y-1 active:shadow-none">
                Daftar Sekarang 🚀
              </Link>
            </div>
          </div>

          {/* SWIPER SLIDER */}
          <div className="relative flex flex-col items-center group w-full">
            <div className="w-full aspect-[4/3] md:aspect-square max-w-[450px] rounded-[2.5rem] shadow-2xl overflow-hidden border-8 border-white bg-white relative">
              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                navigation={true}
                pagination={{ clickable: true }}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                loop={true}
                onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                className="w-full h-full rounded-[2rem] hero-swiper"
              >
                {sliderData.map((item, index) => (
                  <SwiperSlide key={index}>
                    <img src={item.src} alt="Kegiatan RA" className="w-full h-full object-cover" />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className="mt-6 text-center h-12 flex items-center justify-center w-full max-w-[400px]">
               <p key={activeIndex} className="text-teal-800 font-bold text-lg md:text-xl italic animate-bounce drop-shadow-sm">
                 {sliderData[activeIndex]?.slogan}
               </p>
            </div>
          </div>

        </div>
      </section>

      {/* ================= SECTION: PROFIL & PENGELOLA (UPDATED WITH LINKS) ================= */}
<section className="py-16 px-6 max-w-6xl mx-auto">
  <div className="bg-white rounded-[3rem] shadow-xl border-t-8 border-emerald-500 overflow-hidden">
    <div className="grid lg:grid-cols-2">
      
      {/* Sisi Kiri: Deskripsi */}
      <div className="p-8 md:p-12 space-y-6">
        <div className="flex items-center gap-3">
          <span className="text-4xl animate-bounce-slow">🏫</span>
          <h2 className="text-3xl font-black text-slate-800">Tentang Kami</h2>
        </div>
        <p className="text-slate-600 leading-relaxed text-lg">
          <strong className="text-emerald-600">RA Persis 175 At Tajdid</strong> adalah lembaga Pendidikan Anak Usia Dini untuk anak usia 4-6 tahun yang telah mendapat ijin operasional sejak tahun <span className="bg-emerald-100 px-2 py-0.5 rounded font-bold text-emerald-700">2010</span>. 
        </p>
        
        {/* Tim Pengelola */}
        <div className="pt-4 border-t border-slate-100">
          <h3 className="font-black text-slate-800 mb-4 flex items-center gap-2">
            <span className="text-xl">👩‍🏫</span> Tim Pengelola & Guru
          </h3>
          <div className="grid gap-4">
            {/* Link untuk Kepala RA */}
            <Link to="/biodata" className="flex items-center gap-4 bg-teal-50 p-3 rounded-2xl border border-teal-100 hover:bg-teal-100 transition-all hover:scale-[1.02] group/item">
              <div className="w-12 h-12 bg-teal-600 rounded-full flex items-center justify-center text-white font-bold shadow-sm group-hover/item:rotate-12 transition-transform">EH</div>
              <div>
                <p className="text-[10px] text-teal-600 font-bold uppercase tracking-wider">Kepala RA</p>
                <p className="font-bold text-slate-800 group-hover/item:text-teal-700">Ela Helasni</p>
              </div>
              <span className="ml-auto text-teal-300 group-hover/item:text-teal-600 pr-2">❯</span>
            </Link>

            <div className="flex flex-wrap gap-2">
              {['Siti Kuraesin, S.Pd.', 'Windi Wulandari Rahayu', 'Mila Nur Amelia', 'Sucika Risalah Bonita'].map((nama, i) => (
                <Link 
                  key={i} 
                  to="/biodata" 
                  className="bg-white border border-slate-200 px-3 py-1.5 rounded-xl text-sm font-medium text-slate-700 hover:border-emerald-400 hover:bg-emerald-50 hover:text-emerald-700 transition-all hover:-translate-y-1"
                >
                  {nama}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Sisi Kanan: Foto Bersama (Clickable) */}
      <Link to="/biodata" className="bg-emerald-50 p-8 flex items-center justify-center relative overflow-hidden group/photo">
         {/* Ornamen belakang foto */}
         <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-200/50 rounded-full -mr-16 -mt-16 animate-float"></div>
         
         <div className="relative z-10 w-full">
            <div className="bg-white p-3 rounded-[2rem] shadow-2xl rotate-2 group-hover/photo:rotate-0 group-hover/photo:scale-105 transition-all duration-500">
              <div className="aspect-[4/3] rounded-[1.5rem] overflow-hidden bg-slate-200 relative">
                 <img 
                  src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80" 
                  alt="Foto Pengelola RA At Tajdid" 
                  className="w-full h-full object-cover"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover/photo:opacity-100 transition-opacity"></div>
                 <div className="absolute bottom-4 left-0 right-0 text-center">
                    <p className="text-white font-black text-xs uppercase tracking-[0.2em] drop-shadow-md">
                      Klik untuk Lihat Biodata ❤️
                    </p>
                 </div>
              </div>
            </div>
            {/* Stiker Dekorasi */}
            <div className="absolute -top-4 -right-4 text-5xl animate-wiggle">⭐</div>
         </div>
      </Link>

    </div>
  </div>
</section>

      {/* ================= MENU KARTU (3 KOLOM) ================= */}
      <section className="py-12 px-6 max-w-6xl mx-auto -mt-20 relative z-20">
        {/* max-w-4xl agar gridnya lebih lebar menampung 3 kartu */}
        <div className="grid grid-cols-2 md:grid-cols-3 max-w-4xl mx-auto gap-4 lg:gap-6">
          
          {/* KARTU KONTAK */}
          <Link to="/kontak" className="bg-white p-6 md:p-8 rounded-[2.5rem] text-center shadow-lg border-b-8 border-emerald-100 hover:border-emerald-400 hover:animate-wiggle transition-all group">
            <div className="text-5xl md:text-6xl mb-4 group-hover:scale-110 transition-transform">📧</div>
            <h3 className="font-black text-slate-800 text-sm md:text-base uppercase tracking-wider mb-2">Kontak Kami</h3>
            <p className="hidden md:block text-[10px] text-slate-500 font-medium">Hubungi admin sekolah</p>
          </Link>

          {/* KARTU GALERI (BARU - DI TENGAH) */}
          <Link to="/galeri" className="bg-white p-6 md:p-8 rounded-[2.5rem] text-center shadow-lg border-b-8 border-amber-100 hover:border-amber-400 hover:animate-wiggle transition-all group">
            <div className="text-5xl md:text-6xl mb-4 group-hover:scale-110 transition-transform">📸</div>
            <h3 className="font-black text-slate-800 text-sm md:text-base uppercase tracking-wider mb-2">Galeri Foto</h3>
            <p className="hidden md:block text-[10px] text-slate-500 font-medium">Keceriaan aktivitas ananda</p>
          </Link>

          {/* KARTU DOWNLOAD */}
          <Link to="/download" className="bg-white p-6 md:p-8 rounded-[2.5rem] text-center shadow-lg border-b-8 border-sky-100 hover:border-sky-400 hover:animate-wiggle transition-all group">
            <div className="text-5xl md:text-6xl mb-4 group-hover:scale-110 transition-transform">📁</div>
            <h3 className="font-black text-slate-800 text-sm md:text-base uppercase tracking-wider mb-2">Download</h3>
            <p className="hidden md:block text-[10px] text-slate-500 font-medium">Unduh berkas & formulir</p>
          </Link>

        </div>
      </section>

      {/* ================= BERITA ================= */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <div className="flex justify-between items-end mb-10">
          <h2 className="text-3xl lg:text-4xl font-black text-slate-800">Berita Sekolah <span className="inline-block animate-bounce-slow">🎪</span></h2>
          <Link to="/berita" className="text-emerald-600 font-bold text-sm hover:underline">Lihat Semua</Link>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {berita.slice(0, 3).map((item, idx) => (
           <Link 
           to="/berita" 
           key={idx} 
           className="bg-white rounded-[2rem] p-4 shadow-sm border-2 border-transparent hover:border-emerald-100 hover:shadow-xl transition-all block group"
         >
           <div className="aspect-video bg-teal-50 rounded-2xl overflow-hidden mb-4 relative">
             {item.gambar && <img src={item.gambar} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={item.judul} />}
           </div>
           <h3 className="font-bold text-slate-800 mb-2 leading-tight group-hover:text-emerald-600 transition-colors">{item.judul}</h3>
           <p className="text-slate-500 text-xs line-clamp-2">{item.isi}</p>
         </Link>
          ))}
        </div>
      </section>  

      {/* ================= FOOTER ================= */}
      <footer className="bg-emerald-800 pt-20 pb-10 border-t-8 border-teal-400 text-white text-center relative overflow-hidden mt-10">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-black mb-2 italic">“Belajar dengan Ceria, Tumbuh dalam Cinta”</h2>
          <p className="text-teal-300 font-black text-sm tracking-widest uppercase mb-6 bg-teal-900/50 inline-block px-4 py-1 rounded-full tracking-[0.2em]">RA At-Tajdid</p>
          <div className="pt-8 border-t border-emerald-700/50 text-[10px] opacity-60 uppercase tracking-widest">
            © {new Date().getFullYear()} RA Persis 175 At Tajdid
          </div>
        </div>
      </footer>

      {/* ================= CUSTOM CSS ANIMASI ================= */}
      <style dangerouslySetInnerHTML={{ __html: `
        .hero-swiper { --swiper-navigation-color: #0f766e; --swiper-pagination-color: #ffffff; }
        .hero-swiper .swiper-button-next, .hero-swiper .swiper-button-prev { background: white; width: 35px; height: 35px; border-radius: 50%; box-shadow: 0 4px 6px rgba(0,0,0,0.1); opacity: 0; transition: 0.3s; }
        .hero-swiper:hover .swiper-button-next, .hero-swiper:hover .swiper-button-prev { opacity: 1; }
        @keyframes slow-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }
        @keyframes wiggle { 0%, 100% { transform: rotate(-3deg); } 50% { transform: rotate(3deg); } }
        @keyframes pulse-slow { 0%, 100% { opacity: 1; } 50% { opacity: 0.7; } }
        @keyframes bounce-slow { 0%, 100%, 20%, 50%, 80% { transform: translateY(0); } 40% { transform: translateY(-10px); } 60% { transform: translateY(-5px); } }
        .animate-slow-spin { animation: slow-spin 15s linear infinite; }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-delayed { animation: float 6s ease-in-out infinite 3s; }
        .animate-wiggle { animation: wiggle 0.5s ease-in-out infinite; }
        .animate-pulse-slow { animation: pulse-slow 4s infinite; }
        .animate-bounce-slow { animation: bounce-slow 2s infinite; }
      `}} />

    </div>
  );
}

export default Home;