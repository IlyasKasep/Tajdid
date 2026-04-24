import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-emerald-900 text-white py-12 mt-10 border-t-8 border-amber-400 relative overflow-hidden">
      {/* Dekorasi tipis di background */}
      <div className="absolute top-0 right-10 text-8xl opacity-5">🕌</div>

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-10 relative z-10">
        
        {/* Kolom 1: Info Sekolah */}
        <div>
          <h4 className="text-xl font-black mb-4 tracking-wide">AT-TAJDIED <span className="text-emerald-400">PORTAL</span></h4>
          <p className="text-emerald-200 text-sm leading-relaxed font-medium">
            Sarana informasi digital resmi Sekolah At-Tajdied untuk mewujudkan transparansi dan komunikasi yang efektif antara sekolah, orang tua, dan santri.
          </p>
        </div>

        {/* Kolom 2: Tautan Cepat */}
        <div>
          <h4 className="text-lg font-bold mb-5 border-b-2 border-emerald-700 pb-2 inline-block">Tautan Cepat</h4>
          <ul className="text-emerald-200 text-sm space-y-3 font-medium">
            <li><Link to="/tentang" className="hover:text-white hover:translate-x-1 inline-block transition-transform">Tentang Kami</Link></li>
            <li><Link to="/program" className="hover:text-white hover:translate-x-1 inline-block transition-transform">Program Tahfidz</Link></li>
            <li><Link to="/akademik" className="hover:text-white hover:translate-x-1 inline-block transition-transform">Informasi Akademik</Link></li>
            <li>
              {/* Link Kontak Kami (WhatsApp) */}
              <a 
                href="https://wa.me/6281234567890" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-2 text-amber-300 hover:text-white hover:translate-x-1 transition-all font-bold"
              >
                Kontak Kami (Hubungi Admin) 
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM11 19.93C7.06 19.43 4 16.05 4 12C4 7.95 7.06 4.57 11 4.07V19.93ZM13 4.07C16.94 4.57 20 7.95 20 12C20 16.05 16.94 19.43 13 19.93V4.07Z"/></svg>
              </a>
            </li>
          </ul>
        </div>

        {/* Kolom 3: Sosial Media */}
        <div>
          <h4 className="text-lg font-bold mb-5 border-b-2 border-emerald-700 pb-2 inline-block">Media Sosial</h4>
          <p className="text-emerald-200 text-sm mb-4">Ikuti keseruan kami di media sosial:</p>
          <div className="flex space-x-4">
            
            {/* Ikon Facebook */}
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-emerald-800 flex items-center justify-center hover:bg-blue-600 hover:-translate-y-1 transition-all shadow-lg">
              <svg className="w-5 h-5 fill-current text-white" viewBox="0 0 24 24">
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
              </svg>
            </a>

            {/* Ikon Instagram */}
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-emerald-800 flex items-center justify-center hover:bg-pink-600 hover:-translate-y-1 transition-all shadow-lg">
              <svg className="w-5 h-5 fill-current text-white" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
            </a>

            {/* Ikon YouTube */}
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-emerald-800 flex items-center justify-center hover:bg-red-600 hover:-translate-y-1 transition-all shadow-lg">
              <svg className="w-5 h-5 fill-current text-white" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>

          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-emerald-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-emerald-400 relative z-10">
        <p>&copy; {new Date().getFullYear()} Sekolah At-Tajdied. All Rights Reserved.</p>
        <p>Dibuat dengan ❤️ untuk generasi bangsa.</p>
      </div>
    </footer>
  );
}

export default Footer;