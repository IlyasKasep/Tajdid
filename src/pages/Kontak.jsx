import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';

function Kontak() {
  // Koordinat atau Nama Lokasi untuk Google Maps
  const mapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3959.2456717917485!2d107.46918297375399!3d-7.097498569581883!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68f315cd98db3b%3A0x87a663b4939a900e!2sRA%20Persis%20175%20At%20Tajdid!5e0!3m2!1sid!2sid!4v1777621321508!5m2!1sid!2sid";

  return (
    <div className="bg-teal-50 min-h-screen font-sans pb-20 overflow-x-hidden">
      
      {/* ================= HEADER SECTION ================= */}
      <header className="relative pt-20 pb-16 px-6 bg-gradient-to-b from-emerald-200 to-teal-50 overflow-hidden text-center">
        {/* Dekorasi Awan & Matahari */}
        <div className="absolute top-10 left-10 text-6xl animate-slow-spin opacity-20 select-none">☀️</div>
        <div className="absolute top-20 right-10 text-5xl animate-float opacity-30 select-none">☁️</div>
        
        <div className="max-w-4xl mx-auto relative z-10">
          <Link to="/" className="inline-flex items-center gap-2 text-emerald-700 font-bold hover:gap-3 transition-all mb-6 bg-white/50 px-4 py-2 rounded-full shadow-sm hover:bg-white">
            <ArrowLeft size={18} /> Kembali ke Beranda
          </Link>
          <h1 className="text-4xl md:text-5xl font-black text-slate-800 mb-4 drop-shadow-sm">
            Mari Bertegur Sapa! <span className="inline-block animate-wiggle">👋</span>
          </h1>
          <p className="text-slate-600 font-medium max-w-xl mx-auto">
            Punya pertanyaan seputar pendaftaran atau kegiatan sekolah? Tim kami siap membantu Ayah & Bunda dengan senang hati.
          </p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 -mt-10 relative z-20">
        <div className="grid lg:grid-cols-5 gap-8">
          
          {/* ================= INFO KONTAK (Kiri) ================= */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-8 rounded-[3rem] shadow-xl border-b-8 border-emerald-100 hover:-translate-y-1 transition-transform">
              <h2 className="text-2xl font-black text-slate-800 mb-8 flex items-center gap-3">
                <span className="bg-emerald-100 p-2 rounded-2xl text-2xl">📞</span> Hubungi Kami
              </h2>
              
              <div className="space-y-6">
                {/* Alamat */}
                <div className="flex gap-4 group">
                  <div className="bg-teal-50 p-3 rounded-2xl text-teal-600 group-hover:bg-teal-600 group-hover:text-white transition-colors h-fit">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-black text-teal-600 uppercase tracking-widest mb-1">Alamat Sekolah</p>
                    <p className="text-slate-600 text-sm leading-relaxed">
                    RA Persis 175 At Tajdid
                    Jl. Pasanggrahan, Pasirjambu, Kec. Pasirjambu, Kabupaten Bandung, Jawa Barat 40972
                    </p>
                  </div>
                </div>

                {/* WhatsApp */}
                <a href="https://wa.me/6287821057917" target="_blank" rel="noreferrer" className="flex gap-4 group">
                  <div className="bg-emerald-50 p-3 rounded-2xl text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors h-fit">
                    <MessageCircle size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-black text-emerald-600 uppercase tracking-widest mb-1">WhatsApp Admin</p>
                    <p className="text-slate-800 font-bold hover:underline">0812-3456-7890 (Ibu Ela)</p>
                  </div>
                </a>

                {/* Email */}
                <div className="flex gap-4 group">
                  <div className="bg-rose-50 p-3 rounded-2xl text-rose-500 group-hover:bg-rose-500 group-hover:text-white transition-colors h-fit">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-black text-rose-500 uppercase tracking-widest mb-1">Email Resmi</p>
                    <p className="text-slate-800 font-bold">ra.attajdid@gmail.com</p>
                  </div>
                </div>

                {/* Jam Operasional */}
                <div className="flex gap-4 group">
                  <div className="bg-amber-50 p-3 rounded-2xl text-amber-500 group-hover:bg-amber-500 group-hover:text-white transition-colors h-fit">
                    <Clock size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-black text-amber-500 uppercase tracking-widest mb-1">Jam Belajar</p>
                    <p className="text-slate-600 text-sm">Senin - Jumat: 07.30 - 11.00 WIB</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Badge Akreditasi/Hiasan */}
            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-8 rounded-[3rem] text-white shadow-lg text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-20 text-6xl rotate-12">🎨</div>
                <h3 className="text-xl font-black mb-2">Terdaftar Sejak 2010</h3>
                <p className="text-emerald-100 text-sm">Membangun generasi cerdas berakhlak mulia selama lebih dari 1 dekade.</p>
            </div>
          </div>

          {/* ================= GOOGLE MAPS (Kanan) ================= */}
          <div className="lg:col-span-3">
            <div className="bg-white p-4 rounded-[3rem] shadow-xl h-full border-4 border-white relative group">
              {/* Bingkai Luar */}
              <div className="w-full h-[400px] lg:h-full min-h-[500px] rounded-[2.2rem] overflow-hidden bg-slate-100 border-2 border-slate-50 relative">
                <iframe 
                  title="Lokasi RA At-Tajdid"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3108.6264484830467!2d107.4717579!3d-7.097503899999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68f315cd98db3b%3A0x87a663b4939a900e!2sRA%20Persis%20175%20At%20Tajdid!5e1!3m2!1sid!2sid!4v1777647154582!5m2!1sid!2sid"
                  className="w-full h-full border-0"
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
                
                {/* Floating Button Google Maps */}
                <div className="absolute bottom-6 left-6 right-6">
                    <a 
                      href="https://www.google.com/maps/place/RA+Persis+175+At+Tajdid/"
                      target="_blank"
                      rel="noreferrer"
                      className="bg-white/90 backdrop-blur px-6 py-3 rounded-2xl shadow-xl flex items-center justify-center gap-3 text-slate-800 font-black hover:bg-emerald-500 hover:text-white transition-all transform active:scale-95"
                    >
                      <MapPin size={20} className="text-rose-500 group-hover:text-white" />
                      Buka di Google Maps 🚀
                    </a>
                </div>
              </div>

              {/* Stiker Dekoratif */}
              <div className="absolute -top-6 -right-6 text-6xl animate-bounce-slow pointer-events-none">📍</div>
            </div>
          </div>

        </div>
      </main>

      {/* ================= CUSTOM CSS ANIMASI ================= */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }
        @keyframes slow-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes wiggle { 0%, 100% { transform: rotate(-5deg); } 50% { transform: rotate(5deg); } }
        @keyframes bounce-slow { 0%, 100%, 20%, 50%, 80% { transform: translateY(0); } 40% { transform: translateY(-15px); } 60% { transform: translateY(-5px); } }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-slow-spin { animation: slow-spin 20s linear infinite; }
        .animate-wiggle { animation: wiggle 2s ease-in-out infinite; }
        .animate-bounce-slow { animation: bounce-slow 3s infinite; }
      `}} />

    </div>
  );
}

export default Kontak;