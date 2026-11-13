function Biodata() {
  return (
    <div className="min-h-screen bg-teal-50 py-8 sm:py-14 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* ================= SECTION: PROFIL & PENGELOLA ================= */}
        <section>
          <div className="bg-white rounded-2xl sm:rounded-3xl border-2 border-emerald-950 shadow-[5px_5px_0px_#064e3b] sm:shadow-[8px_8px_0px_#064e3b] overflow-hidden">
            <div className="grid lg:grid-cols-2">
              {/* Sisi Kiri: Deskripsi */}
              <div className="p-5 sm:p-8 md:p-12 space-y-5 sm:space-y-6">
                <div className="inline-flex items-center gap-2 bg-amber-300 text-emerald-950 px-3.5 sm:px-4 py-1.5 rounded-full border-2 border-emerald-950 text-xs font-black uppercase tracking-widest">
                  🏫 Profil & Pengelola
                </div>

                <h1 className="text-2xl sm:text-4xl font-black text-emerald-950 leading-tight">
                  Tentang Kami
                </h1>

                <p className="text-slate-600 leading-relaxed text-sm sm:text-lg font-medium">
                  <strong className="text-emerald-700">RA Persis 175 At Tajdid</strong> merupakan lembaga Pendidikan Anak Usia Dini untuk anak usia 4-6 tahun yang telah mendapat ijin operasional sejak tahun{' '}
                  <span className="bg-amber-200 border border-emerald-950 px-2 py-0.5 rounded-lg font-extrabold text-emerald-950">
                    2010
                  </span>
                  .
                </p>

                {/* Tim Pengelola Singkat */}
                <div className="pt-4 sm:pt-5 border-t-2 border-emerald-950/10">
                  <h2 className="font-black text-emerald-950 mb-3.5 sm:mb-4 flex items-center gap-2 text-base sm:text-lg">
                    <span>👩‍🏫</span> Struktur Inti
                  </h2>
                  <div className="grid gap-3.5 sm:gap-4">
                    <div className="flex items-center gap-3.5 sm:gap-4 bg-teal-100/80 p-3 sm:p-3.5 rounded-2xl border-2 border-emerald-950 shadow-[3px_3px_0px_#064e3b]">
                      <div className="w-11 h-11 sm:w-12 sm:h-12 bg-emerald-700 border-2 border-emerald-950 rounded-full flex items-center justify-center text-white font-black shadow-sm shrink-0">
                        EH
                      </div>
                      <div>
                        <p className="text-[10px] text-emerald-800 font-black uppercase tracking-wider">
                          Kepala RA
                        </p>
                        <p className="font-extrabold text-emerald-950 text-sm sm:text-base">Ela Helasni</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 sm:gap-2.5">
                      {[
                        'Siti Kuraesin, S.Pd.',
                        'Windi Wulandari Rahayu',
                        'Mila Nur Amelia',
                        'Sucika Risalah Bonita',
                      ].map((nama, i) => (
                        <div
                          key={i}
                          className="bg-white border-2 border-emerald-950 shadow-[2px_2px_0px_#0d9488] px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-bold text-slate-800"
                        >
                          {nama}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Sisi Kanan: Foto Bersama */}
              <div className="bg-amber-300 p-5 sm:p-8 md:p-10 flex items-center justify-center relative overflow-hidden border-t-2 lg:border-t-0 lg:border-l-2 border-emerald-950">
                <div className="relative z-10 w-full max-w-md">
                  <div className="bg-white p-2.5 sm:p-3 rounded-2xl sm:rounded-3xl border-2 border-emerald-950 shadow-[5px_5px_0px_#064e3b] sm:shadow-[7px_7px_0px_#064e3b]">
                    <div className="aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden bg-slate-100 relative">
                      <img
                        src="/img/guru.png"
                        alt="Foto Pengelola RA At Tajdid"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="absolute -top-3 -right-2 sm:-top-4 sm:-right-3 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white border-2 border-emerald-950 shadow-[2px_2px_0px_#064e3b] sm:shadow-[3px_3px_0px_#064e3b] flex items-center justify-center text-xl sm:text-2xl animate-wiggle">
                    ⭐
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Biodata;
