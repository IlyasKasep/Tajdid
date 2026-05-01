import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, GraduationCap, Heart, Star, Award } from 'lucide-react';

// === DATA LENGKAP PENGELOLA & GURU ===
const teamData = [
  {
    id: 1,
    nama: "Ela Helasni",
    jabatan: "Kepala RA",
    pendidikan: "S1 Kependidikan",
    moto: "Mendidik dengan hati, membangun karakter sejak dini.",
    deskripsi: "Sebagai pemimpin di RA Persis 175 At Tajdid, Ibu Ela berfokus pada pengembangan kurikulum yang ramah anak dan inovatif.",
    foto: "https://images.unsplash.com/photo-1544717297-fa95b3ee51f8?w=500&q=80",
    warna: "bg-emerald-500",
    ikon: "👑"
  },
  {
    id: 2,
    nama: "Siti Kuraesin, S.Pd.",
    jabatan: "Guru Kelas",
    pendidikan: "S1 Pendidikan Guru PAUD",
    moto: "Setiap anak adalah bintang yang bersinar dengan caranya sendiri.",
    deskripsi: "Ibu Siti adalah pengajar yang berpengalaman dalam metode belajar sambil bermain (Learning by Playing).",
    foto: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=500&q=80",
    warna: "bg-rose-500",
    ikon: "🎨"
  },
  {
    id: 3,
    nama: "Windi Wulandari Rahayu",
    jabatan: "Guru Kelas",
    pendidikan: "Diploma Kependidikan",
    moto: "Sabar dan kasih sayang adalah kunci utama mendidik anak.",
    deskripsi: "Ibu Windi sangat telaten dalam mendampingi tumbuh kembang emosional anak-anak di kelas.",
    foto: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&q=80",
    warna: "bg-sky-500",
    ikon: "🎈"
  },
  {
    id: 4,
    nama: "Mila Nur Amelia",
    jabatan: "Guru Pendamping",
    pendidikan: "Pendidikan Menengah Kependidikan",
    moto: "Ciptakan lingkungan belajar yang seru dan menyenangkan!",
    deskripsi: "Ibu Mila memiliki semangat tinggi dalam membimbing kreativitas anak melalui seni dan prakarya.",
    foto: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&q=80",
    warna: "bg-amber-500",
    ikon: "🚀"
  },
  {
    id: 5,
    nama: "Sucika Risalah Bonita",
    jabatan: "Guru Pendamping",
    pendidikan: "Pendidikan Menengah Kependidikan",
    moto: "Tanamkan kejujuran dan akhlak mulia setiap hari.",
    deskripsi: "Ibu Sucika berfokus pada pembiasaan adab dan doa harian bagi ananda di sekolah.",
    foto: "https://images.unsplash.com/photo-1554151228-14d9def656e4?w=500&q=80",
    warna: "bg-purple-500",
    ikon: "🌟"
  }
];

function BiodataDetail() {
  return (
    <div className="bg-teal-50 min-h-screen font-sans pb-20 overflow-x-hidden">
      
      {/* ================= HEADER SECTION ================= */}
      <header className="relative pt-20 pb-12 px-6 bg-gradient-to-b from-emerald-200 to-teal-50 overflow-hidden">
        {/* Dekorasi Bergerak */}
        <div className="absolute top-10 left-10 text-5xl animate-bounce-slow opacity-30">🌈</div>
        <div className="absolute top-20 right-20 text-6xl animate-spin-slow opacity-20">🌻</div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <Link to="/" className="inline-flex items-center gap-2 text-emerald-700 font-bold hover:gap-3 transition-all mb-6 bg-white/50 px-4 py-2 rounded-full shadow-sm">
            <ArrowLeft size={18} /> Kembali ke Beranda
          </Link>
          <h1 className="text-4xl md:text-5xl font-black text-slate-800 mb-4 drop-shadow-sm">
            Mengenal Lebih Dekat <br/>
            <span className="text-emerald-600">Pendidik At-Tajdied</span>
          </h1>
          <p className="text-slate-600 font-medium max-w-2xl mx-auto">
            Inilah wajah-wajah penuh kasih sayang yang mendampingi ananda dalam belajar, bermain, dan bertumbuh setiap hari.
          </p>
        </div>
      </header>

      {/* ================= CONTENT: TEACHER CARDS ================= */}
      <main className="max-w-6xl mx-auto px-6 -mt-8">
        <div className="grid gap-12 lg:gap-16">
          {teamData.map((staff, index) => (
            <div 
              key={staff.id} 
              className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-8 bg-white p-6 md:p-10 rounded-[3rem] shadow-xl border-b-8 border-slate-100 hover:shadow-2xl transition-all group`}
            >
              
              {/* Sisi Foto dengan Frame Lucu */}
              <div className="relative w-full max-w-[300px]">
                <div className={`absolute inset-0 ${staff.warna} rounded-[2.5rem] rotate-6 group-hover:rotate-0 transition-transform duration-500`}></div>
                <div className="relative bg-white p-3 rounded-[2.5rem] shadow-lg overflow-hidden aspect-[4/5]">
                  <img 
                    src={staff.foto} 
                    alt={staff.nama} 
                    className="w-full h-full object-cover rounded-[2rem] group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 right-4 text-4xl bg-white/90 p-2 rounded-2xl shadow-sm animate-wiggle">
                    {staff.ikon}
                  </div>
                </div>
              </div>

              {/* Sisi Detail Deskripsi */}
              <div className="flex-1 space-y-4 text-center lg:text-left">
                <div>
                  <h2 className="text-2xl md:text-3xl font-black text-slate-800 mb-1">{staff.nama}</h2>
                  <p className={`inline-block px-4 py-1 rounded-full text-white font-bold text-sm uppercase tracking-widest ${staff.warna}`}>
                    {staff.jabatan}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 bg-teal-50 p-3 rounded-2xl">
                    <GraduationCap className="text-teal-600" />
                    <div className="text-left">
                      <p className="text-[10px] text-teal-600 font-bold uppercase">Pendidikan</p>
                      <p className="text-sm font-bold text-slate-700">{staff.pendidikan}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-rose-50 p-3 rounded-2xl">
                    <Heart className="text-rose-500" />
                    <div className="text-left">
                      <p className="text-[10px] text-rose-500 font-bold uppercase">Moto</p>
                      <p className="text-sm font-bold text-slate-700">{staff.moto}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 p-6 rounded-[2rem] border-2 border-dashed border-slate-200">
                  <h4 className="font-black text-slate-800 text-sm mb-2 flex items-center gap-2 justify-center lg:justify-start">
                    <Star size={16} className="text-amber-500" /> Tentang Guru
                  </h4>
                  <p className="text-slate-600 leading-relaxed italic text-sm md:text-base">
                    "{staff.deskripsi}"
                  </p>
                </div>

                <div className="flex justify-center lg:justify-start gap-2 pt-2">
                   <div className="h-2 w-12 bg-teal-200 rounded-full"></div>
                   <div className="h-2 w-4 bg-rose-200 rounded-full"></div>
                </div>
              </div>

            </div>
          ))}
        </div>
      </main>

      {/* ================= FOOTER DECORATION ================= */}
      <footer className="mt-20 text-center">
        <div className="inline-block bg-white p-8 rounded-[3rem] shadow-lg border-2 border-emerald-100">
          <Award className="mx-auto text-emerald-500 mb-4" size={48} />
          <h3 className="text-xl font-black text-slate-800">Kami Siap Mendampingi Si Kecil!</h3>
          <p className="text-slate-500 text-sm mt-2">RA Persis 175 At Tajdid - Sejak 2010</p>
        </div>
      </footer>

      {/* ================= STYLING ANIMASI ================= */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes wiggle {
          0%, 100% { transform: rotate(-5deg); }
          50% { transform: rotate(5deg); }
        }
        .animate-bounce-slow { animation: bounce-slow 4s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 12s linear infinite; }
        .animate-wiggle { animation: wiggle 2s ease-in-out infinite; }
      `}} />

    </div>
  );
}

export default BiodataDetail;