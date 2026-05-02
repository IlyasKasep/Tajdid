import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logoSekolah from '../assets/Logo_Persis.png';

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation(); // Mendeteksi halaman saat ini

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  // Sesuaikan path ini dengan yang ada di App.jsx
  const menuItems = [
    { name: 'HOME', path: '/' },
    { name: 'PENGURUS', path: '/biodata' },
    { name: 'GALERI', path: '/galeri' },
    { name: 'BERITA', path: '/berita' }, // Tambahkan ini
    { name: 'DOWNLOAD', path: '/download' },
    { name: 'KONTAK', path: '/kontak' }, // Tambahkan ini
  ];

  return (
    <>
      <header className="bg-gradient-to-r from-emerald-700 via-teal-600 to-emerald-800 bg-[length:200%_auto] animate-gradient-x text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
            <a href='Admin.jsx'>
              <img src={logoSekolah} alt="Logo" className="h-14 w-14 object-contain hover:scale-105 transition" />
              </a>
              <div>
                <h1 className="text-xl font-extrabold tracking-wide">AT-TAJDID</h1>
                <p className="text-[10px] text-emerald-200 font-medium uppercase tracking-widest"> Raudhatul Athfal Persis 175</p>
              </div>
            </Link>

            {/* Menu Desktop */}
            <nav className="hidden lg:flex items-center space-x-1">
              {menuItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link 
                    key={item.name} 
                    to={item.path} 
                    className={`px-4 py-2 text-sm font-bold rounded-lg transition-all relative
                      ${isActive ? 'bg-white/20 text-white' : 'hover:bg-emerald-800 text-emerald-50'}`}
                  >
                    {item.name}
                    {/* Garis bawah penanda aktif */}
                    {isActive && (
                      <span className="absolute bottom-1 left-4 right-4 h-0.5 bg-yellow-300 rounded-full"></span>
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Tombol Mobile */}
            <button onClick={toggleMenu} className="lg:hidden p-2">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" strokeWidth={2} strokeLinecap="round" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" strokeWidth={2} strokeLinecap="round" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Menu Mobile Dropdown */}
        <div className={`lg:hidden bg-emerald-900 transition-all duration-300 overflow-hidden ${isMobileMenuOpen ? 'max-h-screen' : 'max-h-0'}`}>
          <nav className="flex flex-col p-4 space-y-2">
            {menuItems.map((item) => (
              <Link 
                key={item.name} 
                to={item.path} 
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-4 py-3 text-sm font-bold rounded-xl ${location.pathname === item.path ? 'bg-emerald-700 text-white' : 'text-emerald-100'}`}
              >
                {item.name} {location.pathname === item.path && '📍'}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes gradient-x {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-x { animation: gradient-x 8s ease-in-out infinite; }
      `}} />
    </>
  );
}

export default Header;