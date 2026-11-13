import { Link } from 'react-router-dom';
import { MapPin, Clock, ArrowUpRight } from 'lucide-react';
import logoSekolah from '../assets/Logo_Persis.png';

function Footer() {
  return (
    <footer className="bg-emerald-950 text-white py-10 sm:py-14 border-t-4 border-amber-400 relative overflow-hidden">
      {/* Dekorasi latar tipis */}
      <div className="absolute -top-12 -right-12 w-56 h-56 rounded-full bg-emerald-900/50 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 grid md:grid-cols-3 gap-8 sm:gap-10 relative z-10">
        {/* Info Sekolah */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-11 h-11 rounded-xl bg-white p-1 border-2 border-amber-400 flex items-center justify-center shrink-0">
              <img
                src={logoSekolah}
                alt="Logo RA Persis 175 At-Tajdid"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h4 className="text-lg font-extrabold tracking-wide text-white leading-tight">
                RA PERSIS 175 <span className="text-amber-300">AT-TAJDID</span>
              </h4>
              <p className="text-[11px] text-emerald-300 font-semibold uppercase tracking-widest">
                Pasirjambu • Sejak 2010
              </p>
            </div>
          </div>
          <p className="text-emerald-200 text-sm leading-relaxed font-medium">
            Tempat tumbuhnya generasi sehat, cerdas, bahagia, dan berakhlak mulia. Kami hadir sebagai ruang belajar yang aman, menyenangkan, dan penuh kasih sayang untuk buah hati Anda.
          </p>
        </div>

        {/* Kolom 2: Tautan Cepat & WhatsApp */}
        <div>
          <h4 className="text-base font-extrabold mb-4 sm:mb-5 pb-2 border-b-2 border-emerald-800 inline-block text-amber-300 uppercase tracking-wider">
            Tautan Cepat
          </h4>

          <ul className="text-emerald-100 text-sm mb-6 grid grid-cols-2 gap-x-4 gap-y-2.5 font-semibold">
            <li><Link to="/" className="hover:text-amber-300 hover:translate-x-1 inline-block transition-transform">Home</Link></li>
            <li><Link to="/biodata" className="hover:text-amber-300 hover:translate-x-1 inline-block transition-transform">Pengelola</Link></li>
            <li><Link to="/galeri" className="hover:text-amber-300 hover:translate-x-1 inline-block transition-transform">Galeri</Link></li>
            <li><Link to="/berita" className="hover:text-amber-300 hover:translate-x-1 inline-block transition-transform">Berita</Link></li>
            <li><Link to="/download" className="hover:text-amber-300 hover:translate-x-1 inline-block transition-transform">Download</Link></li>
            <li><Link to="/kontak" className="hover:text-amber-300 hover:translate-x-1 inline-block transition-transform">Kontak</Link></li>
            <li><Link to="/saran" className="hover:text-amber-300 hover:translate-x-1 inline-block transition-transform">Kotak Saran</Link></li>
          </ul>

          <a
            href="https://wa.me/6287821057917"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-300 text-emerald-950 px-5 py-3 rounded-xl transition-all font-extrabold text-sm border-2 border-emerald-950 shadow-[3px_3px_0px_#0d9488] text-center"
          >
            <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.432h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
            </svg>
            Hubungi via WhatsApp
            <ArrowUpRight size={15} />
          </a>
        </div>

        {/* Kolom 3: Lokasi & Waktu */}
        <div>
          <h4 className="text-base font-extrabold mb-4 sm:mb-5 pb-2 border-b-2 border-emerald-800 inline-block text-amber-300 uppercase tracking-wider">
            Lokasi & Waktu
          </h4>
          <div className="text-emerald-100 text-sm font-medium space-y-4">
            <div className="flex items-start gap-3">
              <div className="bg-emerald-900 p-2 rounded-lg text-amber-300 shrink-0 mt-0.5">
                <MapPin size={18} />
              </div>
              <p className="leading-relaxed">
                <strong className="text-white block">RA Persis 175 At Tajdid</strong>
                Jl. Pasanggrahan, Pasirjambu, Kec. Pasirjambu, Kabupaten Bandung, Jawa Barat 40972
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-emerald-900 p-2 rounded-lg text-amber-300 shrink-0 mt-0.5">
                <Clock size={18} />
              </div>
              <p>
                <strong className="text-white block">Senin - Jumat</strong>
                07:30 - 12:00 WIB
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-8 sm:mt-12 pt-6 border-t border-emerald-800/80 flex flex-col md:flex-row justify-between items-center gap-3 text-center md:text-left text-xs font-medium text-emerald-300 relative z-10">
        <p>&copy; {new Date().getFullYear()} RA Persis 175 At-Tajdid. All Rights Reserved.</p>
        <p>Dibuat dengan penuh cinta untuk generasi sehat, cerdas & berakhlak mulia.</p>
      </div>
    </footer>
  );
}

export default Footer;
