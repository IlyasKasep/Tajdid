import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileText, Download, FileArchive, Calendar, ClipboardList } from 'lucide-react';

function DownloadPage() {
  // Data contoh berkas yang bisa diunduh
  const daftarUnduhan = [
    {
      id: 1,
      nama: "Profil Sekolah 2024",
      ukuran: "2.4 MB",
      format: "PDF",
      deskripsi: "Mengenal lebih dalam visi, misi, dan fasilitas RA At-Tajdid.",
      warna: "border-emerald-200 text-emerald-600 bg-emerald-50",
      ikon: <FileText size={32} />
    },
    {
      id: 2,
      nama: "Formulir Pendaftaran",
      ukuran: "1.1 MB",
      format: "PDF",
      deskripsi: "Formulir cetak untuk pendaftaran siswa baru tahun ajaran 2024/2025.",
      warna: "border-rose-200 text-rose-500 bg-rose-50",
      ikon: <ClipboardList size={32} />
    },
    {
      id: 3,
      nama: "Kalender Akademik",
      ukuran: "850 KB",
      format: "PDF",
      deskripsi: "Jadwal kegiatan belajar, hari libur, dan acara penting sekolah.",
      warna: "border-sky-200 text-sky-500 bg-sky-50",
      ikon: <Calendar size={32} />
    },
    {
      id: 4,
      nama: "Brosur Sekolah",
      ukuran: "5.2 MB",
      format: "JPG",
      deskripsi: "Ringkasan informasi sekolah dalam bentuk brosur menarik.",
      warna: "border-amber-200 text-amber-500 bg-amber-50",
      ikon: <FileArchive size={32} />
    }
  ];

  return (
    <div className="bg-teal-50 min-h-screen font-sans pb-20 overflow-x-hidden">
      
      {/* ================= HEADER SECTION ================= */}
      <header className="relative pt-20 pb-16 px-6 bg-gradient-to-b from-emerald-200 to-teal-50 overflow-hidden text-center">
        {/* Dekorasi Bergerak */}
        <div className="absolute top-10 left-10 text-5xl animate-bounce-slow opacity-20 select-none">🎈</div>
        <div className="absolute top-20 right-20 text-6xl animate-spin-slow opacity-20 select-none">🌈</div>
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-7xl animate-float opacity-10 select-none">📁</div>
        
        <div className="max-w-4xl mx-auto relative z-10">
          <Link to="/" className="inline-flex items-center gap-2 text-emerald-700 font-bold hover:gap-3 transition-all mb-6 bg-white/50 px-4 py-2 rounded-full shadow-sm hover:bg-white">
            <ArrowLeft size={18} /> Kembali ke Beranda
          </Link>
          <h1 className="text-4xl md:text-5xl font-black text-slate-800 mb-4 drop-shadow-sm">
            Pusat Unduhan <br />
            <span className="text-emerald-600">RA At-Tajdid 📁</span>
          </h1>
          <p className="text-slate-600 font-medium max-w-xl mx-auto">
            Temukan dan unduh berbagai dokumen penting seputar kegiatan sekolah dan administrasi pendaftaran di sini.
          </p>
        </div>
      </header>

      {/* ================= CONTENT: DOWNLOAD LIST ================= */}
      <main className="max-w-5xl mx-auto px-6 -mt-8 relative z-20">
        <div className="grid gap-6">
          {daftarUnduhan.map((file) => (
            <div 
              key={file.id}
              className="bg-white rounded-[2.5rem] p-6 md:p-8 shadow-xl border-b-8 border-slate-100 flex flex-col md:flex-row items-center gap-6 group hover:shadow-2xl transition-all"
            >
              {/* Ikon Berkas */}
              <div className={`w-20 h-20 rounded-[1.8rem] flex items-center justify-center border-2 ${file.warna} group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                {file.ikon}
              </div>

              {/* Info Berkas */}
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-xl font-black text-slate-800 mb-1">{file.nama}</h3>
                <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-3">
                   <span className="bg-slate-100 text-slate-500 text-[10px] font-black px-2 py-1 rounded-md uppercase">{file.format}</span>
                   <span className="bg-slate-100 text-slate-500 text-[10px] font-black px-2 py-1 rounded-md uppercase">{file.ukuran}</span>
                </div>
                <p className="text-slate-500 text-sm leading-relaxed max-w-lg">
                  {file.deskripsi}
                </p>
              </div>

              {/* Tombol Download */}
              <button className="w-full md:w-auto bg-emerald-500 text-white px-8 py-4 rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-emerald-600 transition-all shadow-[0_4px_0_rgb(16,185,129)] active:translate-y-1 active:shadow-none">
                <Download size={20} /> Unduh Berkas
              </button>
            </div>
          ))}
        </div>

        {/* Info Tambahan */}
        <div className="mt-12 bg-amber-50 border-2 border-dashed border-amber-200 rounded-[2.5rem] p-8 text-center">
            <p className="text-amber-800 font-bold italic">
              "Kesulitan mengunduh berkas? Ayah & Bunda bisa langsung menghubungi Admin Sekolah melalui WhatsApp."
            </p>
        </div>
      </main>

      {/* ================= CUSTOM CSS ANIMASI ================= */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes bounce-slow { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 15s linear infinite; }
        .animate-bounce-slow { animation: bounce-slow 4s ease-in-out infinite; }
      `}} />

    </div>
  );
}

export default DownloadPage;