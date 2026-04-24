import { useState } from 'react';
import { Link } from 'react-router-dom';

import logoSekolah from '../assets/Logo_Persis.png';
function Header() {
  // State untuk mengontrol apakah menu mobile sedang terbuka atau tertutup
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Fungsi untuk membalikkan state (buka/tutup)
  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-emerald-700 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          
          {/* Logo & Judul Sekolah */}
          <Link to="/" className="flex items-center gap-3">
            
            {/* BAGIAN INI YANG DIUBAH: Hapus div bg-white, langsung gunakan tag img */}
            <img 
  src={logoSekolah} 
  alt="Logo At-Tajdied" 
  className="h-14 w-14 object-contain hover:scale-105 transition" 
/>

            <div>
              <h1 className="text-xl font-extrabold tracking-wide">AT-TAJDIED</h1>
              <p className="text-[10px] sm:text-xs text-emerald-200 font-medium tracking-widest">Islamic School</p>
            </div>
          </Link>

          {/* ========================================= */}
          {/* MENU DESKTOP (Sembunyi di layar kecil)    */}
          {/* ========================================= */}
          <nav className="hidden lg:flex items-center space-x-1">
            <Link to="/" className="px-4 py-2 text-sm font-bold hover:bg-emerald-800 rounded transition">HOME</Link>
            <Link to="/biodata" className="px-4 py-2 text-sm font-bold hover:bg-emerald-800 rounded transition">PENGURUS</Link>
            <Link to="/galeri" className="px-4 py-2 text-sm font-bold hover:bg-emerald-800 rounded transition">GALERI</Link>
            <Link to="/bukutamu" className="px-4 py-2 text-sm font-bold hover:bg-emerald-800 rounded transition">BUKU TAMU</Link>
            <Link to="/polling" className="px-4 py-2 text-sm font-bold hover:bg-emerald-800 rounded transition">POLLING</Link>
            <Link to="/chat" className="px-4 py-2 text-sm font-bold hover:bg-emerald-800 rounded transition text-yellow-300">FORUM CHAT</Link>
            <Link to="/download" className="px-4 py-2 text-sm font-bold hover:bg-emerald-800 rounded transition text-emerald-200">DOWNLOAD</Link>
            <div className="h-6 w-[1px] bg-emerald-500 mx-2"></div>
          </nav>

          {/* ========================================= */}
          {/* TOMBOL HAMBURGER (Hanya tampil di Mobile) */}
          {/* ========================================= */}
          <button 
            onClick={toggleMenu} 
            className="lg:hidden p-2 text-emerald-100 hover:text-white hover:bg-emerald-600 rounded focus:outline-none transition"
            aria-label="Toggle Menu"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                // Ikon Silang (X) jika menu terbuka
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                // Ikon Garis Tiga (Hamburger) jika menu tertutup
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* ========================================= */}
      {/* MENU DROPDOWN MOBILE (Tampil jika ditekan)*/}
      {/* ========================================= */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-emerald-800 border-t border-emerald-600 shadow-inner animate-fade-in-down">
          <nav className="flex flex-col px-4 pt-2 pb-6 space-y-1">
            <Link to="/" onClick={toggleMenu} className="block px-4 py-3 text-sm font-bold hover:bg-emerald-700 rounded transition">HOME</Link>
            <Link to="/biodata" onClick={toggleMenu} className="block px-4 py-3 text-sm font-bold hover:bg-emerald-700 rounded transition">PENGURUS</Link>
            <Link to="/galeri" onClick={toggleMenu} className="block px-4 py-3 text-sm font-bold hover:bg-emerald-700 rounded transition">GALERI</Link>
            <Link to="/bukutamu" onClick={toggleMenu} className="block px-4 py-3 text-sm font-bold hover:bg-emerald-700 rounded transition">BUKU TAMU</Link>
            <Link to="/polling" onClick={toggleMenu} className="block px-4 py-3 text-sm font-bold hover:bg-emerald-700 rounded transition">POLLING</Link>
            <Link to="/chat" onClick={toggleMenu} className="block px-4 py-3 text-sm font-bold text-yellow-300 hover:bg-emerald-700 rounded transition">FORUM CHAT</Link>
            <Link to="/download" onClick={toggleMenu} className="block px-4 py-3 text-sm font-bold text-emerald-200 hover:bg-emerald-700 rounded transition">DOWNLOAD</Link>
            
            <div className="my-3 border-t border-emerald-600/50"></div>
            
            <Link to="/admin" onClick={toggleMenu} className="block text-center bg-emerald-500 px-5 py-3 rounded text-sm font-black hover:bg-white hover:text-emerald-800 transition shadow-md mt-2">
              LOGIN ADMIN
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;