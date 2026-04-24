import { Link } from 'react-router-dom';

function Home({ berita }) {
  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* 1. HERO SECTION */}
      <section className="relative h-[600px] flex items-center overflow-hidden">
        {/* Background Image with Green Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="public/Logo_Persis.png" 
            className="w-full h-full object-cover"
            alt="School Building"
          />
          <div className="absolute inset-0 bg-emerald-900/80"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 w-full">
          <div className="max-w-2xl text-white">
            <h5 className="text-emerald-300 font-bold tracking-[0.3em] uppercase mb-4 text-sm animate-pulse">Welcome to At-Tajdied</h5>
            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
              Membangun <br /> <span className="text-emerald-300">Generasi Qur'ani</span>
            </h1>
            <p className="text-lg opacity-90 mb-8 font-light leading-relaxed border-l-4 border-emerald-400 pl-4">
              Mewujudkan pendidikan Islam yang unggul, beradab, dan modern untuk masa depan buah hati Anda yang lebih gemilang.
            </p>
            <div className="flex gap-4">
              <button className="bg-white text-emerald-800 px-8 py-4 rounded-md font-bold hover:bg-emerald-50 transition shadow-xl">LIHAT PROGRAM</button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-md font-bold hover:bg-white hover:text-emerald-800 transition">HUBUNGI KAMI</button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THREE FEATURE CARDS (Overlaying) */}
      <section className="relative z-20 -mt-20 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 shadow-2xl rounded-xl overflow-hidden">
          
          {/* Card 1: Tahfidz */}
          <Link to="/tahfidz" className="bg-emerald-600 p-10 text-white flex flex-col items-center text-center group hover:bg-emerald-500 transition cursor-pointer">
            <div className="text-5xl mb-4 group-hover:scale-110 transition">📖</div>
            <h3 className="text-xl font-bold mb-3 uppercase tracking-wider">Tahfidz Al-Qur'an</h3>
            <p className="text-sm opacity-90 leading-relaxed mb-4">Program unggulan menghafal Al-Qur'an dengan metode yang menyenangkan bagi siswa.</p>
            <span className="text-xs font-black border-b-2 border-emerald-300 pb-1 group-hover:text-emerald-200">BACA LEBIH LANJUT →</span>
          </Link>

          {/* Card 2: Sains */}
          <Link to="/sains" className="bg-emerald-700 p-10 text-white flex flex-col items-center text-center group hover:bg-emerald-600 transition cursor-pointer border-x border-white/10">
            <div className="text-5xl mb-4 group-hover:scale-110 transition">🧪</div>
            <h3 className="text-xl font-bold mb-3 uppercase tracking-wider">Sains & Akademik</h3>
            <p className="text-sm opacity-90 leading-relaxed mb-4">Membiasakan nalar kritis siswa melalui kurikulum yang terintegrasi nilai Islam.</p>
            <span className="text-xs font-black border-b-2 border-emerald-300 pb-1 group-hover:text-emerald-200">BACA LEBIH LANJUT →</span>
          </Link>

          {/* Card 3: Ekskul */}
          <Link to="/ekskul" className="bg-emerald-800 p-10 text-white flex flex-col items-center text-center group hover:bg-emerald-700 transition cursor-pointer">
            <div className="text-5xl mb-4 group-hover:scale-110 transition">🥋</div>
            <h3 className="text-xl font-bold mb-3 uppercase tracking-wider">Ekstrakurikuler</h3>
            <p className="text-sm opacity-90 leading-relaxed mb-4">Beragam kegiatan minat bakat mulai dari olahraga, seni, hingga kepanduan.</p>
            <span className="text-xs font-black border-b-2 border-emerald-300 pb-1 group-hover:text-emerald-200">BACA LEBIH LANJUT →</span>
          </Link>

        </div>
      </section>

      {/* 3. LATEST NEWS SECTION */}
      <section className="py-24 max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-black text-gray-800">Berita Terkini</h2>
            <div className="w-20 h-2 bg-emerald-600 mt-2"></div>
          </div>
          <button className="text-emerald-700 font-bold hover:underline text-sm uppercase tracking-widest">Lihat Semua Berita</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {berita.slice(0, 3).map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-2xl transition duration-500 flex flex-col">
              <div className="h-56 overflow-hidden relative bg-gray-100">
                {item.gambar ? (
                  <img src={item.gambar} alt={item.judul} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-4xl">📰</div>
                )}
                <div className="absolute top-4 left-4 bg-emerald-600 text-white text-[10px] font-black px-3 py-1 rounded uppercase shadow">
                  {item.kategori}
                </div>
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <p className="text-emerald-600 text-xs font-bold mb-3 uppercase tracking-widest">{item.tanggal || 'Baru Saja'}</p>
                <h3 className="text-xl font-bold text-gray-800 mb-4 leading-snug group-hover:text-emerald-700 transition line-clamp-2">{item.judul}</h3>
                <p className="text-gray-500 text-sm mb-6 line-clamp-3 leading-relaxed flex-1">{item.isi}</p>
                <button className="mt-auto w-fit bg-emerald-50 text-emerald-800 border border-emerald-100 px-6 py-2 rounded font-bold text-xs group-hover:bg-emerald-700 group-hover:text-white transition">BACA SELENGKAPNYA</button>
              </div>
            </div>
          ))}

          {berita.length === 0 && (
            <div className="col-span-3 text-center py-16 bg-gray-50 rounded-lg border border-dashed border-gray-300">
              <p className="text-gray-500 italic">Belum ada pengumuman hari ini.</p>
            </div>
          )}
        </div>
      </section>

      {/* 4. CTA SECTION */}
      <section className="bg-emerald-50 py-16 border-y border-emerald-100">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-black text-emerald-900 mb-4">Siap Bergabung Bersama At-Tajdied?</h2>
          <p className="text-emerald-700 mb-8 font-medium">Pendaftaran Tahun Ajaran Baru telah dibuka. Dapatkan informasi selengkapnya sekarang.</p>
          <button className="bg-emerald-700 text-white px-10 py-4 rounded-full font-black shadow-lg hover:bg-emerald-800 transition uppercase tracking-widest">Informasi Pendaftaran</button>
        </div>
      </section>

    </div>
  );
}

export default Home;