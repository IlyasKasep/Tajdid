import { Link } from 'react-router-dom';
import { ArrowLeft, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';

function Kontak() {
  return (
    <div className="bg-teal-50 min-h-screen font-sans pb-12 sm:pb-20 overflow-x-hidden">
      {/* ================= HEADER SECTION ================= */}
      <header className="relative pt-8 pb-10 sm:pt-14 sm:pb-16 px-4 sm:px-6 bg-amber-300 border-b-2 border-emerald-950 text-center">
        <div className="max-w-4xl mx-auto relative z-10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-emerald-950 font-extrabold transition-all mb-4 sm:mb-6 bg-white px-3.5 sm:px-4 py-2 rounded-full border-2 border-emerald-950 shadow-[2px_2px_0px_#064e3b] sm:shadow-[3px_3px_0px_#064e3b] hover:bg-emerald-50 text-xs sm:text-sm"
          >
            <ArrowLeft size={16} /> Kembali ke Beranda
          </Link>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-emerald-950 mb-3 sm:mb-4">
            Mari Bertegur Sapa! <span className="inline-block animate-wiggle">👋</span>
          </h1>
          <p className="text-slate-800 font-semibold max-w-xl mx-auto text-xs sm:text-base leading-relaxed">
            Punya pertanyaan seputar pendaftaran atau kegiatan sekolah? Tim kami siap membantu Ayah & Bunda dengan senang hati.
          </p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 mt-8 sm:mt-12 relative z-20">
        <div className="grid lg:grid-cols-5 gap-6 sm:gap-8">
          {/* ================= INFO KONTAK (Kiri) ================= */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            <div className="bg-white p-5 sm:p-8 rounded-2xl sm:rounded-3xl border-2 border-emerald-950 shadow-[4px_4px_0px_#064e3b] sm:shadow-[6px_6px_0px_#064e3b]">
              <h2 className="text-xl sm:text-2xl font-black text-emerald-950 mb-5 sm:mb-7 flex items-center gap-2.5 sm:gap-3">
                <span className="bg-teal-200 border-2 border-emerald-950 p-1.5 sm:p-2 rounded-xl text-lg sm:text-xl">📞</span>
                Hubungi Kami
              </h2>

              <div className="space-y-4 sm:space-y-6">
                {/* Alamat */}
                <div className="flex gap-3 sm:gap-4 group">
                  <div className="bg-teal-100 border-2 border-emerald-950 p-2.5 sm:p-3 rounded-xl text-emerald-950 h-fit shrink-0">
                    <MapPin size={20} className="sm:w-[22px] sm:h-[22px]" />
                  </div>
                  <div>
                    <p className="text-[10px] sm:text-xs font-black text-emerald-700 uppercase tracking-widest mb-0.5 sm:mb-1">
                      Alamat Sekolah
                    </p>
                    <p className="text-slate-700 text-xs sm:text-sm leading-relaxed font-medium">
                      RA Persis 175 At Tajdid
                      <br />
                      Jl. Pasanggrahan, Pasirjambu, Kec. Pasirjambu, Kabupaten Bandung, Jawa Barat 40972
                    </p>
                  </div>
                </div>

                {/* WhatsApp */}
                <a
                  href="https://wa.me/6287821057917"
                  target="_blank"
                  rel="noreferrer"
                  className="flex gap-3 sm:gap-4 group"
                >
                  <div className="bg-emerald-200 border-2 border-emerald-950 p-2.5 sm:p-3 rounded-xl text-emerald-950 group-hover:bg-emerald-300 transition-colors h-fit shrink-0">
                    <MessageCircle size={20} className="sm:w-[22px] sm:h-[22px]" />
                  </div>
                  <div>
                    <p className="text-[10px] sm:text-xs font-black text-emerald-700 uppercase tracking-widest mb-0.5 sm:mb-1">
                      WhatsApp Admin
                    </p>
                    <p className="text-emerald-950 font-extrabold text-xs sm:text-sm md:text-base group-hover:underline">
                      +62 878-2105-7917 (Ibu Ela)
                    </p>
                  </div>
                </a>

                {/* Email */}
                <div className="flex gap-3 sm:gap-4 group">
                  <div className="bg-rose-100 border-2 border-emerald-950 p-2.5 sm:p-3 rounded-xl text-rose-700 h-fit shrink-0">
                    <Mail size={20} className="sm:w-[22px] sm:h-[22px]" />
                  </div>
                  <div>
                    <p className="text-[10px] sm:text-xs font-black text-rose-600 uppercase tracking-widest mb-0.5 sm:mb-1">
                      Email Resmi
                    </p>
                    <p className="text-slate-900 font-extrabold text-xs sm:text-sm md:text-base">helasni@gmail.com</p>
                  </div>
                </div>

                {/* Jam Operasional */}
                <div className="flex gap-3 sm:gap-4 group">
                  <div className="bg-amber-200 border-2 border-emerald-950 p-2.5 sm:p-3 rounded-xl text-emerald-950 h-fit shrink-0">
                    <Clock size={20} className="sm:w-[22px] sm:h-[22px]" />
                  </div>
                  <div>
                    <p className="text-[10px] sm:text-xs font-black text-amber-700 uppercase tracking-widest mb-0.5 sm:mb-1">
                      Jam Belajar
                    </p>
                    <p className="text-slate-700 text-xs sm:text-sm font-semibold">
                      Senin - Jumat: 07.30 - 12.00 WIB
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Badge Akreditasi */}
            <div className="bg-teal-600 p-5 sm:p-7 rounded-2xl sm:rounded-3xl text-white border-2 border-emerald-950 shadow-[4px_4px_0px_#064e3b] sm:shadow-[6px_6px_0px_#064e3b] text-center relative overflow-hidden">
              <div className="absolute top-2 right-3 opacity-25 text-4xl sm:text-5xl rotate-12 pointer-events-none">🎨</div>
              <h3 className="text-lg sm:text-xl font-black mb-1.5 sm:mb-2">Terdaftar Sejak 2010</h3>
              <p className="text-teal-50 text-xs sm:text-sm font-medium">
                Membangun generasi cerdas berakhlak mulia selama lebih dari 1 dekade.
              </p>
            </div>
          </div>

          {/* ================= GOOGLE MAPS (Kanan) ================= */}
          <div className="lg:col-span-3">
            <div className="bg-white p-2.5 sm:p-3.5 rounded-2xl sm:rounded-3xl border-2 border-emerald-950 shadow-[5px_5px_0px_#064e3b] sm:shadow-[7px_7px_0px_#064e3b] h-full relative group">
              <div className="w-full h-[320px] sm:h-[420px] lg:h-full min-h-[320px] sm:min-h-[450px] rounded-xl sm:rounded-2xl overflow-hidden bg-slate-100 border-2 border-emerald-950 relative">
                <iframe
                  title="Lokasi RA At-Tajdid"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3108.6264484830467!2d107.4717579!3d-7.097503899999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68f315cd98db3b%3A0x87a663b4939a900e!2sRA%20Persis%20175%20At%20Tajdid!5e1!3m2!1sid!2sid!4v1777647154582!5m2!1sid!2sid"
                  className="w-full h-full border-0"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />

                {/* Floating Button Google Maps */}
                <div className="absolute bottom-3 sm:bottom-5 left-3 sm:left-5 right-3 sm:right-5">
                  <a
                    href="https://www.google.com/maps/place/RA+Persis+175+At+Tajdid/"
                    target="_blank"
                    rel="noreferrer"
                    className="w-full bg-amber-300 hover:bg-amber-400 text-emerald-950 border-2 border-emerald-950 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl shadow-[3px_3px_0px_#064e3b] sm:shadow-[4px_4px_0px_#064e3b] flex items-center justify-center gap-2 sm:gap-2.5 font-black text-xs sm:text-base transition-all text-center"
                  >
                    <MapPin size={18} className="text-rose-600 shrink-0" />
                    Buka di Google Maps 🚀
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Kontak;
