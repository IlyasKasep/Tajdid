import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import logoSekolah from '../assets/Logo_Persis.png';

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const menuItems = [
    { name: 'Home', path: '/' },
    { name: 'Pengelola', path: '/biodata' },
    { name: 'Galeri', path: '/galeri' },
    { name: 'Berita', path: '/berita' },
    { name: 'Download', path: '/download' },
    { name: 'Kontak', path: '/kontak' },
    { name: 'Saran', path: '/saran' },
  ];

  const isPathActive = (path) => {
    if (path === '/') return location.pathname === '/';
    if (path === '/biodata' && location.pathname === '/pengelola') return true;
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  return (
    <header className="bg-teal-50/95 backdrop-blur-md border-b-2 border-emerald-950/15 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center py-3.5 gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group shrink-0">
            <div className="w-11 h-11 rounded-xl bg-white border-2 border-emerald-950 shadow-[2px_2px_0px_#064e3b] p-1 flex items-center justify-center group-hover:-translate-y-0.5 transition-transform">
              <img
                src={logoSekolah}
                alt="Logo RA Persis 175 At-Tajdid"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <span className="block text-lg font-extrabold tracking-tight text-emerald-950 leading-none">
                AT-TAJDID
              </span>
              <span className="block text-[10px] text-emerald-700 font-bold uppercase tracking-widest mt-1">
                Raudhatul Athfal Persis 175
              </span>
            </div>
          </Link>

          {/* Menu Desktop (Pill Style seperti Referensi) */}
          <nav className="hidden lg:flex items-center gap-1">
            {menuItems.map((item) => {
              const isActive = isPathActive(item.path);
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`px-3.5 py-1.5 text-xs xl:text-sm font-bold rounded-full transition-all ${
                    isActive
                      ? 'bg-white text-emerald-950 border-2 border-emerald-950 shadow-[2px_2px_0px_#064e3b]'
                      : 'text-slate-700 hover:text-emerald-950 hover:bg-emerald-100/70 border-2 border-transparent'
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* CTA Desktop Kanan */}
          <div className="hidden lg:flex items-center shrink-0">
            <a
              href="https://bit.ly/PendaftaranOnlineRAattajdid"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-emerald-900 hover:bg-emerald-800 text-white text-xs xl:text-sm font-bold px-4 py-2.5 rounded-xl border-2 border-emerald-950 shadow-[3px_3px_0px_#f59e0b] hover:shadow-[1px_1px_0px_#f59e0b] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
            >
              Daftar Sekarang
              <ArrowUpRight size={16} />
            </a>
          </div>

          {/* Tombol Mobile */}
          <button
            type="button"
            onClick={toggleMenu}
            aria-label="Toggle Menu Navigasi"
            className="lg:hidden p-2 rounded-xl bg-white border-2 border-emerald-950 text-emerald-950 shadow-[2px_2px_0px_#064e3b]"
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Menu Mobile Dropdown */}
      <div
        className={`lg:hidden bg-white border-t-2 border-emerald-950/15 transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen ? 'max-h-[32rem]' : 'max-h-0 border-t-0'
        }`}
      >
        <nav className="flex flex-col p-4 space-y-2 max-w-6xl mx-auto">
          {menuItems.map((item) => {
            const isActive = isPathActive(item.path);
            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center justify-between px-4 py-3 text-sm font-bold rounded-xl border-2 transition-all ${
                  isActive
                    ? 'bg-emerald-100 text-emerald-950 border-emerald-950 shadow-[2px_2px_0px_#064e3b]'
                    : 'bg-teal-50/60 text-slate-700 border-transparent hover:border-emerald-950/20'
                }`}
              >
                <span>{item.name}</span>
                {isActive && <span className="text-xs bg-amber-300 text-emerald-950 px-2 py-0.5 rounded-full border border-emerald-950">Aktif</span>}
              </Link>
            );
          })}
          <a
            href="https://bit.ly/PendaftaranOnlineRAattajdid"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsMobileMenuOpen(false)}
            className="mt-2 flex items-center justify-center gap-2 bg-amber-400 text-emerald-950 font-extrabold text-sm px-4 py-3 rounded-xl border-2 border-emerald-950 shadow-[3px_3px_0px_#064e3b]"
          >
            Daftar Sekarang <ArrowUpRight size={16} />
          </a>
        </nav>
      </div>
    </header>
  );
}

export default Header;
