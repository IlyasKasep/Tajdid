import { Link } from 'react-router-dom';
import { ArrowLeft, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';

function Kontak() {
  return (
    <div className="bg-teal-50 min-h-screen font-sans pb-20 overflow-x-hidden">
      {/* ================= HEADER SECTION ================= */}
      <header className="relative pt-14 pb-16 px-6 bg-amber-300 border-b-2 border-emerald-950 text-center">
        <div className="max-w-4xl mx-auto relative z-10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-emerald-950 font-extrabold transition-all mb-6 bg-white px-4 py-2 rounded-full border-2 border-emerald-950 shadow-[3px_3px_0px_#064e3b] hover:bg-emerald-50 text-sm"
          >
            <ArrowLeft size={16} /> Kembali ke Beranda
          </Link>
          <h1 className="text-3xl sm:text-5xl font-black text-emerald-950 mb-4">
            Mari Bertegur Sapa! <span className="inline-block animate-wiggle">👋</span>
          </h1>
          <p className="text-slate-800 font-semibold max-w-xl mx-auto text-sm sm:text-base">
            Punya pertanyaan seputar pendaftaran atau kegiatan sekolah? Tim kami siap membantu Ayah & Bunda dengan senang hati.
          </p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 mt-12 relative z-20">
        <div className="grid lg:grid-cols-5 gap-8">
          {/* ================= INFO KONTAK (Kiri) ================= */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-7 sm:p-8 rounded-3xl border-2 border-emerald-950 shadow-[6px_6px_0px_#064e3b]">
              <h2 className="text-2xl font-black text-emerald-950 mb-7 flex items-center gap-3">
                <span className="bg-teal-200 border-2 border-emerald-950 p-2 rounded-xl text-xl">📞</span>
                Hubungi Kami
              </h2>

              <div className="space-y-6">
                {/* Alamat */}
                <div className="flex gap-4 group">
                  <div className="bg-teal-100 border-2 border-emerald-950 p-3 rounded-xl text-emerald-950 h-fit shrink-0">
                    <MapPin size={22} />
                  </div>
                  <div>
                    <p className="text-xs font-black text-emerald-700 uppercase tracking-widest mb-1">
                      Alamat Sekolah
                    </p>
                    <p className="text-slate-700 text-sm leading-relaxed font-medium">
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
                  className="flex gap-4 group"
                >
                  <div className="bg-emerald-200 border-2 border-emerald-950 p-3 rounded-xl text-emerald-950 group-hover:bg-emerald-300 transition-colors h-fit shrink-0">
                    <MessageCircle size={22} />
                  </div>
                  <div>
                    <p className="text-xs font-black text-emerald-700 uppercase tracking-widest mb-1">
                      WhatsApp Admin
                    </p>
                    <p className="text-emerald-950 font-extrabold group-hover:underline">
                      +62 878-2105-7917 (Ibu Ela)
                    </p>
                  </div>
                </a>

                {/* Email */}
                <div className="flex gap-4 group">
                  <div className="bg-rose-100 border-2 border-emerald-950 p-3 rounded-xl text-rose-700 h-fit shrink-0">
                    <Mail size={22} />
                  </div>
                  <div>
                    <p className="text-xs font-black text-rose-600 uppercase tracking-widest mb-1">
                      Email Resmi
                    </p>
                    <p className="text-slate-900 font-extrabold">helasni@gmail.com</p>
                  </div>
                </div>

                {/* Jam Operasional */}
                <div className="flex gap-4 group">
                  <div className="bg-amber-200 border-2 border-emerald-950 p-3 rounded-xl text-emerald-950 h-fit shrink-0">
                    <Clock size={22} />
                  </div>
                  <div>
                    <p className="text-xs font-black text-amber-700 uppercase tracking-widest mb-1">
                      Jam Belajar
                    </p>
                    <p className="text-slate-700 text-sm font-semibold">
                      Senin - Jumat: 07.30 - 12.00 WIB
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Badge Akreditasi */}
            <div className="bg-teal-600 p-7 rounded-3xl text-white border-2 border-emerald-950 shadow-[6px_6px_0px_#064e3b] text-center relative overflow-hidden">
              <div className="absolute top-2 right-3 opacity-25 text-5xl rotate-12">🎨</div>
              <h3 className="text-xl font-black mb-2">Terdaftar Sejak 2010</h3>
              <p className="text-teal-50 text-sm font-medium">
                Membangun generasi cerdas berakhlak mulia selama lebih dari 1 dekade.
              </p>
            </div>
          </div>

          {/* ================= GOOGLE MAPS (Kanan) ================= */}
          <div className="lg:col-span-3">
            <div className="bg-white p-3.5 rounded-3xl border-2 border-emerald-950 shadow-[7px_7px_0px_#064e3b] h-full relative group">
              <div className="w-full h-[420px] lg:h-full min-h-[500px] rounded-2xl overflow-hidden bg-slate-100 border-2 border-emerald-950 relative">
                <iframe
                  title="Lokasi RA At-Tajdid"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3108.6264484830467!2d107.4717579!3d-7.097503899999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68f315cd98db3b%3A0x87a663b4939a900e!2sRA%20Persis%20175%20At%20Tajdid!5e1!3m2!1sid!2sid!4v1777647154582!5m2!1sid!2sid"
                  className="w-full h-full border-0"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />

                {/* Floating Button Google Maps */}
                <div className="absolute bottom-5 left-5 right-5">
                  <a
                    href="https://www.google.com/maps/place/RA+Persis+175+At+Tajdid/"
                    target="_blank"
                    rel="noreferrer"
                    className="bg-amber-300 hover:bg-amber-400 text-emerald-950 border-2 border-emerald-950 px-6 py-3 rounded-xl shadow-[4px_4px_0px_#064e3b] flex items-center justify-center gap-2.5 font-black transition-all"
                  >
                    <MapPin size={20} className="text-rose-600" />
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
