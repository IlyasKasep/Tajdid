function Footer() {
    return (
      <footer className="bg-emerald-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8">
          <div>
            <h4 className="text-xl font-bold mb-4">AT-TAJDIED PORTAL</h4>
            <p className="text-emerald-200 text-sm leading-relaxed">
              Sarana informasi digital resmi Sekolah At-Tajdid untuk mewujudkan transparansi dan komunikasi yang efektif antara sekolah, orang tua, dan santri.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4">Tautan Cepat</h4>
            <ul className="text-emerald-200 text-sm space-y-2">
              <li><a href="#" className="hover:text-white">Tentang Kami</a></li>
              <li><a href="#" className="hover:text-white">Program Tahfidz</a></li>
              <li><a href="#" className="hover:text-white">Informasi Akademik</a></li>
              <li><a href="#" className="hover:text-white">Kontak Kami</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4">Media Sosial</h4>
            <div className="flex space-x-4 text-2xl">
              <a href="#" className="hover:text-emerald-400">FB</a>
              <a href="#" className="hover:text-emerald-400">IG</a>
              <a href="#" className="hover:text-emerald-400">YT</a>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-emerald-800 text-center text-sm text-emerald-400">
          &copy; {new Date().getFullYear()} Sekolah At-Tajdid. All Rights Reserved.
        </div>
      </footer>
    );
  }
  
  export default Footer;