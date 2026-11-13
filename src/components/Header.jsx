import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, LayoutGroup, motion as Motion } from 'framer-motion';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import logoSekolah from '../assets/Logo_Persis.png';

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsMobileMenuOpen((prev) => !prev);

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

  const handleNavClick = (path, closeMobile = false) => {
    if (closeMobile) setIsMobileMenuOpen(false);
    if (isPathActive(path) && location.pathname === path) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className="bg-teal-50/95 backdrop-blur-md border-b-2 border-emerald-950/15 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center py-2.5 sm:py-3.5 gap-3 sm:gap-4">
          {/* Logo */}
          <Link
            to="/"
            onClick={() => handleNavClick('/', true)}
            className="flex items-center gap-2.5 sm:gap-3 group shrink-0 min-w-0"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white border-2 border-emerald-950 shadow-[2px_2px_0px_#064e3b] p-1 flex items-center justify-center group-hover:-translate-y-0.5 transition-transform shrink-0">
              <img
                src={logoSekolah}
                alt="Logo RA Persis 175 At-Tajdid"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="min-w-0">
              <span className="block text-base sm:text-lg font-extrabold tracking-tight text-emerald-950 leading-none">
                AT-TAJDID
              </span>
              <span className="block text-[9px] sm:text-[10px] text-emerald-700 font-bold uppercase tracking-wider sm:tracking-widest mt-0.5 sm:mt-1 truncate max-w-[190px] xs:max-w-[240px] sm:max-w-none">
                Raudhatul Athfal Persis 175
              </span>
            </div>
          </Link>

          {/* Menu Desktop (Pill Style dengan Sliding Indicator Smooth) */}
          <LayoutGroup id="desktop-header-nav">
            <nav className="hidden lg:flex items-center gap-1" aria-label="Navigasi Utama">
              {menuItems.map((item) => {
                const isActive = isPathActive(item.path);
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => handleNavClick(item.path)}
                    className={`relative px-4 py-2 text-xs xl:text-sm font-bold rounded-full transition-colors duration-200 active:scale-95 ${
                      isActive
                        ? 'text-emerald-950'
                        : 'text-slate-700 hover:text-emerald-950 hover:bg-emerald-100/70'
                    }`}
                  >
                    {isActive && (
                      <Motion.span
                        layoutId="header-active-pill-desktop"
                        transition={{ type: 'spring', stiffness: 420, damping: 32, mass: 0.8 }}
                        className="absolute inset-0 rounded-full bg-white border-2 border-emerald-950 shadow-[2px_2px_0px_#064e3b]"
                        aria-hidden="true"
                      />
                    )}
                    <span className="relative z-10">{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          </LayoutGroup>

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
            aria-expanded={isMobileMenuOpen}
            className="lg:hidden p-2 rounded-xl bg-white border-2 border-emerald-950 text-emerald-950 shadow-[2px_2px_0px_#064e3b] active:scale-95 transition-transform shrink-0"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Menu Mobile Dropdown Smooth */}
      <AnimatePresence initial={false}>
        {isMobileMenuOpen && (
          <Motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden bg-white border-t-2 border-emerald-950/15 overflow-hidden max-h-[calc(100vh-4.5rem)] overflow-y-auto"
          >
            <LayoutGroup id="mobile-header-nav">
              <nav className="flex flex-col p-4 space-y-2 max-w-6xl mx-auto" aria-label="Navigasi Mobile">
                {menuItems.map((item) => {
                  const isActive = isPathActive(item.path);
                  return (
                    <Link
                      key={item.name}
                      to={item.path}
                      onClick={() => handleNavClick(item.path, true)}
                      className={`relative flex items-center justify-between px-4 py-3 text-sm font-bold rounded-xl transition-colors ${
                        isActive
                          ? 'text-emerald-950'
                          : 'bg-teal-50/60 text-slate-700 hover:bg-emerald-50'
                      }`}
                    >
                      {isActive && (
                        <Motion.span
                          layoutId="header-active-pill-mobile"
                          transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                          className="absolute inset-0 rounded-xl bg-emerald-100 border-2 border-emerald-950 shadow-[2px_2px_0px_#064e3b]"
                          aria-hidden="true"
                        />
                      )}
                      <span className="relative z-10">{item.name}</span>
                      {isActive && (
                        <span className="relative z-10 text-xs bg-amber-300 text-emerald-950 px-2 py-0.5 rounded-full border border-emerald-950">
                          Aktif
                        </span>
                      )}
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
            </LayoutGroup>
          </Motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Header;
