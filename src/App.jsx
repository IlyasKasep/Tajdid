import { useState, useEffect, useLayoutEffect, Suspense, lazy } from 'react';
import { supabase } from './supabase';
import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence, MotionConfig, motion as Motion } from 'framer-motion';

// Import Komponen & Halaman Publik (Langsung dimuat agar transisi menu header mulus tanpa jeda spinner)
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Biodata from './pages/Biodata';
import BiodataDetail from './pages/BiodataDetail';
import Galeri from './pages/Galeri';
import BeritaSekolah from './pages/BeritaSekolah';
import BeritaDetail from './pages/BeritaDetail';
import Download from './pages/Download';
import Kontak from './pages/Kontak';
import Saran from './pages/Saran';
import LogoPersis from "./assets/Logo_Persis.png";

// LAZY LOADING khusus halaman Admin (Memisahkan bundle Three.js dari halaman publik)
const Admin = lazy(() => import('./pages/Admin'));
const AdminSaran = lazy(() => import('./pages/AdminSaran'));

// Pemetaan urutan menu header untuk arah transisi halaman yang konsisten
const getMenuRouteIndex = (pathname) => {
  if (pathname === '/') return 0;
  if (pathname === '/biodata' || pathname === '/pengelola' || pathname.startsWith('/biodata/')) return 1;
  if (pathname === '/galeri') return 2;
  if (pathname === '/berita' || pathname.startsWith('/berita/')) return 3;
  if (pathname === '/download') return 4;
  if (pathname === '/kontak') return 5;
  if (pathname === '/saran') return 6;
  return -1;
};

const pageTransitionVariants = {
  initial: (direction) =>
    direction === 0
      ? { opacity: 0, y: 12 }
      : { opacity: 0, x: direction * 28 },
  animate: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
  },
  exit: (direction) =>
    direction === 0
      ? { opacity: 0, y: -10, transition: { duration: 0.16, ease: [0.4, 0, 1, 1] } }
      : { opacity: 0, x: direction * -28, transition: { duration: 0.16, ease: [0.4, 0, 1, 1] } },
};

// Reset posisi scroll tepat sebelum halaman baru muncul di layar (setelah halaman lama selesai exit)
function ScrollTopOnMount() {
  useLayoutEffect(() => {
    if (!window.location.hash) {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, []);
  return null;
}

// Komponen Tampilan Loading (Fallback untuk halaman Admin lazy)
const PageLoader = () => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] text-emerald-600">
    <div className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mb-4"></div>
    <p className="font-bold animate-pulse text-sm">Menyiapkan halaman...</p>
  </div>
);

function App() {
  const [berita, setBerita] = useState([]);

  // STATE AUTENTIKASI
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorLogin, setErrorLogin] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let aktif = true;
    const muatBeritaAwal = async () => {
      try {
        const { data, error } = await supabase
          .from('berita')
          .select('*')
          .order('created_at', { ascending: false });
        if (error) throw error;
        if (aktif) setBerita(data || []);
      } catch (error) {
        console.error("Gagal mengambil data:", error);
      }
    };
    muatBeritaAwal();

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (aktif) setUser(session?.user ?? null);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      aktif = false;
      subscription?.unsubscribe();
    };
  }, []);

  useEffect(() => {
    document.title = "RA Persis 175 At Tajdid";
  
    let favicon = document.querySelector("link[rel='icon']");
  
    if (!favicon) {
      favicon = document.createElement("link");
      favicon.rel = "icon";
      favicon.type = "image/png";
      document.head.appendChild(favicon);
    }
  
    favicon.href = LogoPersis;
  }, []);

  const tanganiLogin = async (e) => {
    e.preventDefault();
    setErrorLogin('');
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });
      if (error) throw error;
      setEmail('');
      setPassword('');
      navigate('/admin');
    } catch (err) {
      console.error("Login error:", err);
      setErrorLogin('Login gagal! Cek kembali email dan password Anda.');
    }
  };

  const tanganiLogout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      alert("Anda telah keluar dari sistem.");
      navigate('/');
    } catch (error) {
      console.error("Gagal Logout:", error);
    }
  };

  const [routeTransition, setRouteTransition] = useState(() => ({
    pathname: location.pathname,
    direction: 0,
  }));

  if (routeTransition.pathname !== location.pathname) {
    const prevIndex = getMenuRouteIndex(routeTransition.pathname);
    const nextIndex = getMenuRouteIndex(location.pathname);
    let direction = 0;

    if (prevIndex !== -1 && nextIndex !== -1 && prevIndex !== nextIndex) {
      direction = nextIndex > prevIndex ? 1 : -1;
    }

    setRouteTransition({
      pathname: location.pathname,
      direction,
    });
  }

  const isAdminPage = location.pathname.startsWith('/admin');

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-teal-50 font-sans flex flex-col text-slate-900">
        {/* HEADER GLOBAL (Disembunyikan pada halaman Admin login & dashboard) */}
        {!isAdminPage && <Header user={user} tanganiLogout={tanganiLogout} />}
        
        <div className="flex-grow overflow-x-clip">
          {/* Transisi antar halaman yang halus saat berpindah menu */}
          <AnimatePresence mode="wait" initial={false} custom={routeTransition.direction}>
            <Motion.div
              key={location.pathname}
              custom={routeTransition.direction}
              variants={pageTransitionVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <ScrollTopOnMount />
              {/* SUSPENSE menangani loading untuk halaman Admin lazy */}
              <Suspense fallback={<PageLoader />}>
                <Routes location={location}>
                  <Route path="/" element={<Home berita={berita} />} />
                  <Route path="/biodata" element={<Biodata />} />
                  <Route path="/pengelola" element={<Biodata />} />
                  <Route path="/biodata/:id" element={<BiodataDetail />} />
                  <Route path="/galeri" element={<Galeri />} />
                  <Route path="/berita" element={<BeritaSekolah berita={berita} />} />
                  <Route path="/berita/:id" element={<BeritaDetail />} />
                  <Route path="/download" element={<Download />} />
                  <Route path="/kontak" element={<Kontak />} />
                  <Route path="/saran" element={<Saran />} />
                  <Route
                    path="/admin/saran"
                    element={
                      user ? (
                        <div className="max-w-6xl mx-auto py-10 px-4 sm:px-6">
                          <div className="bg-white rounded-3xl border-2 border-emerald-950 shadow-[8px_8px_0px_#064e3b] p-6 md:p-10">
                            <AdminSaran />
                          </div>
                        </div>
                      ) : (
                        <Navigate to="/admin" replace />
                      )
                    }
                  />
                  <Route
                    path="/admin"
                    element={
                      <Admin
                        user={user}
                        email={email}
                        setEmail={setEmail}
                        password={password}
                        setPassword={setPassword}
                        errorLogin={errorLogin}
                        tanganiLogin={tanganiLogin}
                        tanganiLogout={tanganiLogout}
                      />
                    }
                  />
                </Routes>
              </Suspense>
            </Motion.div>
          </AnimatePresence>
        </div>

        {/* FOOTER GLOBAL (Disembunyikan pada halaman Admin login & dashboard) */}
        {!isAdminPage && <Footer />}
      </div>
    </MotionConfig>
  );
}

export default App;