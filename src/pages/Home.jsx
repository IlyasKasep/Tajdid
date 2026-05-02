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
    src: "https://i.pinimg.com/736x/71/33/41/713341b70a80652e7fe057de2cca8de4.jpg",
    slogan: "✨ Bermain dengan Hati, Belajar dengan Gembira!"
  },
  {
    src: "https://i.pinimg.com/736x/aa/3b/9a/aa3b9a64432539d78c68de336e001209.jpg",
    slogan: "🌟 Menjadi Bintang Kecil yang Berakhlak Mulia"
  },
  {
    src: "https://i.pinimg.com/1200x/b2/07/b5/b207b540c15b176d252ff575eb9612cb.jpg",
    slogan: "🚀 Eksplorasi Tanpa Batas, Tumbuh dengan Cerdas"
  }
];

function Home({ berita = [] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="bg-teal-50 min-h-screen font-sans text-slate-700 overflow-x-hidden">
      
      {/* ================= HERO SECTION ================= */}
      <section className="relative pt-8 pb-16 lg:pt-20 lg:pb-48 bg-gradient-to-b from-emerald-200 to-teal-50 px-6 overflow-hidden">
        
        {/* Dekorasi Bergerak (Hanya tampil di layar besar) */}
        <div className="hidden lg:block absolute top-10 left-10 text-6xl animate-slow-spin opacity-70 select-none">☀️</div>
        <div className="hidden lg:block absolute top-24 right-16 text-5xl animate-float opacity-80 select-none">🦋</div>
        <div className="hidden lg:block absolute bottom-20 left-20 text-7xl animate-float-delayed opacity-70 select-none">🐌</div>

        {/* Ubah gap-12 menjadi gap-8 lg:gap-12 agar jarak atas-bawah pas di mobile */}
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-12 items-center relative z-10">
          
          {/* AREA TEKS */}
          <div className="text-center lg:text-left space-y-4 lg:space-y-6">
            <div className="inline-block bg-teal-600 text-white font-black px-3 py-1 lg:px-4 lg:py-1.5 rounded-full text-xs lg:text-sm tracking-widest uppercase mb-1 shadow-sm animate-pulse-slow">
              RA PERSIS 175 AT TAJDID
            </div>
            {/* Ukuran font disesuaikan: text-3xl untuk mobile, text-6xl untuk laptop */}
            <h1 className="text-3xl lg:text-6xl font-black text-slate-800 leading-tight">
              Belajar Adalah <br className="hidden lg:block" /> 
              <span className="text-emerald-600 drop-shadow-sm">PETUALANGAN</span>
            </h1>
            <p className="text-sm lg:text-base text-slate-600 max-w-[280px] md:max-w-md mx-auto lg:mx-0 leading-relaxed font-medium">
              RA AT-TAJDID<br></br>
              Tempat tumbuhnya generasi sehat, cerdas, bahagia, dan berakhlak mulia sejak tahun 2010.
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-2">
              <Link to="https://bit.ly/PendaftaranOnlineRAattajdid" className="bg-rose-500 text-white font-black px-6 py-3 lg:px-8 lg:py-3.5 rounded-full hover:bg-rose-600 transition-all hover:scale-105 shadow-[0_4px_0_rgb(225,29,72,1)] active:translate-y-1 active:shadow-none text-sm lg:text-base">
                Daftar Sekarang 🚀
              </Link>
            </div>
          </div>

          {/* SWIPER SLIDER */}
          <div className="relative flex flex-col items-center group w-full mt-2 lg:mt-0">
            {/* Ukuran max-width slider dikecilkan di mobile (max-w-[320px]) dan border dipertipis (border-4) */}
            <div className="w-full aspect-[4/3] md:aspect-square max-w-[320px] lg:max-w-[450px] rounded-[2rem] lg:rounded-[2.5rem] shadow-2xl overflow-hidden border-4 lg:border-8 border-white bg-white relative">
              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                navigation={true}
                pagination={{ clickable: true }}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                loop={true}
                onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                className="w-full h-full rounded-[1.5rem] lg:rounded-[2rem] hero-swiper"
              >
                {sliderData.map((item, index) => (
                  <SwiperSlide key={index}>
                    <img src={item.src} alt="Kegiatan RA" className="w-full h-full object-cover" />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            {/* Deskripsi slogan disesuaikan margin dan font-nya untuk mobile */}
            <div className="mt-4 lg:mt-6 text-center h-10 lg:h-12 flex items-center justify-center w-full max-w-[320px] lg:max-w-[400px] px-2">
               <p key={activeIndex} className="text-teal-800 font-bold text-sm lg:text-xl italic animate-bounce drop-shadow-sm leading-snug">
                 {sliderData[activeIndex]?.slogan}
               </p>
            </div>
          </div>

        </div>
      </section>

      {/* ================= SECTION BARU: DESKRIPSI & PROFIL LENGKAP ================= */}
      <section className="py-16 px-6 max-w-6xl mx-auto relative z-10">
        <div className="bg-white rounded-[3rem] shadow-xl border-t-8 border-emerald-500 overflow-hidden relative group">
          
          {/* Dekorasi Latar Belakang */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-bl-[100%] pointer-events-none transition-transform duration-700 group-hover:scale-110"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-amber-50 rounded-tr-[100%] pointer-events-none transition-transform duration-700 group-hover:scale-110"></div>
          
          <div className="p-8 md:p-12 lg:p-16 space-y-12 relative z-10">
            
            {/* 1. Header & Intro Paragraf */}
            <div className="text-center space-y-6 max-w-4xl mx-auto">
              <h2 className="text-3xl lg:text-4xl font-black text-slate-800 leading-tight">
                Selamat Datang di <br className="hidden md:block"/>
                <span className="text-emerald-600">RA Persis 175 At Tajdid</span>
              </h2>
              <p className="inline-block bg-teal-100 text-teal-800 font-bold px-6 py-2 rounded-full text-sm md:text-base border border-teal-200">
                "Tempat Tumbuhnya Generasi Sehat, Cerdas, Bahagia & Berakhlak Mulia"
              </p>
              
              <div className="text-slate-600 leading-relaxed space-y-5 text-justify md:text-center font-medium mt-6">
                <p>
                  Setiap anak adalah amanah sekaligus anugerah dari Allah yang luar biasa. Kami percaya bahwa setiap anak istimewa dengan potensi luar biasa. Kami hadir sebagai ruang belajar yang aman, menyenangkan, dan penuh kasih sayang, di mana anak-anak dapat tumbuh dan berkembang secara optimal, baik secara kognitif, sosial-emosional, maupun spiritual.
                </p>
                <p>
                  Dengan pendekatan <strong className="text-emerald-600">Kurikulum Merdeka</strong> yang dipadukan dengan nilai-nilai keIslaman dan pendidikan berbasis cinta, kami mengajak anak belajar melalui bermain, bereksplorasi dan berinteraksi secara aktif. Setiap kegiatan dirancang untuk menumbuhkan ketauhidan, rasa ingin tahu, kemandirian, serta karakter positif sejak dini.
                </p>
              </div>
            </div>

            {/* 2. Grid Dua Kolom (Poin-Poin) */}
            <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
              
              {/* Kolom Kiri: Kami Mengenalkan */}
              <div className="bg-teal-50/80 p-8 rounded-[2rem] border border-teal-100 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-black text-teal-800 mb-6 flex items-center gap-3">
                  <span className="text-3xl animate-bounce-slow">🌱</span> Kami Mengenalkan:
                </h3>
                <ul className="space-y-4">
                  {[
                    "Akhlak mulia sejak dini",
                    "Kemandirian dan rasa tanggung jawab",
                    "Cinta kepada Allah, Rasul, sesama manusia, ilmu dan peduli lingkungan",
                    "Kebiasaan baik dalam kehidupan sehari-hari"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="bg-teal-200 text-teal-700 w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0 mt-0.5 font-black">✓</div>
                      <span className="text-slate-700 font-medium leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Kolom Kanan: Mengapa Memilih Kami */}
              <div className="bg-amber-50/80 p-8 rounded-[2rem] border border-amber-100 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-black text-amber-800 mb-6 flex items-center gap-3">
                  <span className="text-3xl animate-wiggle">⭐</span> Mengapa Memilih Kami?
                </h3>
                <ul className="space-y-4">
                  {[
                    "Lingkungan belajar yang aman, nyaman, dan ramah anak",
                    "Guru yang ramah, sabar, profesional, dan penuh kasih sayang",
                    "Kegiatan kreatif, edukatif, dan menyenangkan setiap hari",
                    "Penanaman nilai agama dan akhlak mulia sejak dini",
                    "Pendekatan pembelajaran yang menghargai keunikan setiap anak",
                    "Pembiasaan ibadah sederhana (doa, adab, dan kebiasaan baik)",
                    "Pendampingan sesuai tahap tumbuh kembang anak"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="bg-amber-200 text-amber-700 w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0 mt-0.5 font-black">✓</div>
                      <span className="text-slate-700 font-medium leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* 3. Penutup & Call to Action Soft */}
            <div className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-[2.5rem] p-8 md:p-12 text-white text-center shadow-xl relative overflow-hidden">
              {/* Ornamen Background */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-16 -mt-16 animate-slow-spin"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-yellow-300/10 rounded-full -ml-10 -mb-10 animate-float"></div>
              
              <div className="relative z-10 max-w-3xl mx-auto">
                <p className="text-lg md:text-xl font-semibold mb-6">
                  "Kami tidak hanya mendidik anak untuk menjadi pintar, tetapi juga membimbing mereka menjadi pribadi yang beriman, berilmu, berakhlak, percaya diri, mandiri dan siap menghadapi masa depan."
                </p>
                <h4 className="text-2xl lg:text-3xl font-black text-yellow-300 mb-8 drop-shadow-md">
                  💛 Bersama kami, anak belajar dengan bahagia, tumbuh dengan cinta.
                </h4>
                
                <div className="space-y-4 text-emerald-50 mb-10 text-sm md:text-base leading-relaxed">
                  <p>
                    Mari bergabung dan menjadi bagian dari keluarga besar RA Persis 175 At Tajdid. Kami berkomitmen mendampingi tumbuh kembang si kecil dengan penuh kasih sayang, kesabaran, dan nilai-nilai kebaikan.
                  </p>
                  <p>
                    Di sini, anak-anak belajar melalui bermain, tertawa, dan bereksplorasi dalam suasana yang nyaman dan menyenangkan. Belajar tidak harus kaku, karena dengan hati yang bahagia, anak akan lebih mudah menyerap ilmu dan tumbuh menjadi pribadi yang percaya diri. Kami ingin setiap langkah kecil ananda di sini menjadi bagian dari perjalanan besar mereka di masa depan.
                  </p>
                </div>

                <div className="border-t border-white/20 pt-8">
                  <p className="font-bold text-lg md:text-xl mb-5">
                    💛 Yuk, Ayah Bunda… temani tumbuh kembang si kecil bersama kami.
                  </p>
                  <div className="inline-block bg-white text-emerald-800 font-black px-6 py-3 rounded-full shadow-lg border-2 border-emerald-100 hover:scale-105 transition-transform duration-300">
                    “Belajar dengan Ceria, Tumbuh dalam Cinta, Berakhlak Mulia”
                  </div>
                </div>
              </div>
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
          <strong className="text-emerald-600">RA Persis 175 At Tajdid</strong> merupakan lembaga Pendidikan Anak Usia Dini untuk anak usia 4-6 tahun yang telah mendapat ijin operasional sejak tahun <span className="bg-emerald-100 px-2 py-0.5 rounded font-bold text-emerald-700">2010</span>. 
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