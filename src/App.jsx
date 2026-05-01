import { useState, useEffect, Suspense, lazy } from 'react';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { db, auth } from './firebase';
import { Routes, Route, useNavigate } from 'react-router-dom';

// Import Komponen Global (Langsung dimuat karena selalu muncul)
import Header from './components/Header';
import Footer from './components/Footer';

// MENGGUNAKAN LAZY LOADING: Halaman hanya dimuat saat diklik (Mencegah Blank Putih)
const Home = lazy(() => import('./pages/Home'));
const Admin = lazy(() => import('./pages/Admin'));
const Biodata = lazy(() => import('./pages/Biodata'));
const BeritaSekolah = lazy(() => import('./pages/BeritaSekolah'));
const Galeri = lazy(() => import('./pages/Galeri'));
const Download = lazy(() => import('./pages/Download'));
const Kontak = lazy(() => import('./pages/Kontak'));
const BiodataDetail = lazy(() => import('./pages/BiodataDetail'));

// Komponen Tampilan Loading (Fallback)
const PageLoader = () => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] text-emerald-600">
    <div className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mb-4"></div>
    <p className="font-bold animate-pulse text-sm">Menyiapkan halaman...</p>
  </div>
);

// === API KEY IMGBB ===
const IMGBB_API_KEY = 'cb9b2aec11b80af3765d32f4d6f572da '; 

function App() {
  // STATE DATA (Dipertahankan dari kode lama Anda)
  const [berita, setBerita] = useState([]);
  const [judulBaru, setJudulBaru] = useState('');
  const [isiBaru, setIsiBaru] = useState('');
  const [kategoriBaru, setKategoriBaru] = useState('Pengumuman');
  const [fileGambar, setFileGambar] = useState(null);
  const [urlGambarLama, setUrlGambarLama] = useState('');
  const [prosesSimpan, setProsesSimpan] = useState(false);
  const [idEdit, setIdEdit] = useState(null); 

  // STATE AUTENTIKASI
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorLogin, setErrorLogin] = useState('');

  const navigate = useNavigate();

  // FUNGSI-FUNGSI DATABASE & AUTENTIKASI (Dipertahankan dari kode lama Anda)
  const ambilDataBerita = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "berita"));
      const dataFormat = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setBerita(dataFormat);
    } catch (error) {
      console.error("Gagal mengambil data:", error);
    }
  };

  useEffect(() => {
    ambilDataBerita();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => setUser(currentUser));
    return () => unsubscribe();
  }, []);

  const tanganiLogin = async (e) => {
    e.preventDefault();
    setErrorLogin('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setEmail(''); setPassword('');
      navigate('/admin'); // Arahkan ke admin setelah login sukses
    } catch (error) {
      setErrorLogin('Login gagal! Cek kembali email dan password Anda.');
    }
  };

  const tanganiLogout = () => {
    signOut(auth).then(() => {
      alert("Anda telah keluar dari sistem.");
      navigate('/'); // Arahkan ke home setelah logout
    }).catch((error) => {
      console.error("Gagal Logout:", error);
    });
  };  

  const uploadFotoKeImgBB = async (foto) => {
    const formData = new FormData();
    formData.append('image', foto);
    try {
      const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, { method: 'POST', body: formData });
      const data = await response.json();
      return data.data.url; 
    } catch (error) {
      alert("Gagal mengunggah foto.");
      return null;
    }
  };

  const simpanAtauUpdateBerita = async (e) => {
    e.preventDefault();
    if (!judulBaru || !isiBaru) return alert("Judul dan Isi tidak boleh kosong!");
    setProsesSimpan(true);
    try {
      let urlGambarFinal = urlGambarLama; 
      if (fileGambar) {
        const urlBaru = await uploadFotoKeImgBB(fileGambar);
        if (urlBaru) urlGambarFinal = urlBaru;
        else { setProsesSimpan(false); return; }
      }

      if (idEdit) {
        await updateDoc(doc(db, "berita", idEdit), { judul: judulBaru, isi: isiBaru, kategori: kategoriBaru, gambar: urlGambarFinal });
        alert("Berita berhasil diperbarui!");
      } else {
        await addDoc(collection(db, "berita"), { 
          judul: judulBaru, 
          isi: isiBaru, 
          kategori: kategoriBaru, 
          gambar: urlGambarFinal, 
          tanggal: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) 
        });
        alert("Pengumuman berhasil diunggah!");
      }
      batalEdit(); ambilDataBerita();
    } catch (error) {
      alert("Gagal memproses data!");
    }
    setProsesSimpan(false);
  };

  const mulaiEdit = (item) => {
    setIdEdit(item.id); setJudulBaru(item.judul); setIsiBaru(item.isi); setKategoriBaru(item.kategori || 'Pengumuman');
    setUrlGambarLama(item.gambar || ''); setFileGambar(null); window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const batalEdit = () => {
    setIdEdit(null); setJudulBaru(''); setIsiBaru(''); setKategoriBaru('Pengumuman'); setFileGambar(null); setUrlGambarLama('');
  };

  const hapusBerita = async (idBerita) => {
    if (window.confirm("Yakin ingin menghapus pengumuman ini?")) {
      await deleteDoc(doc(db, "berita", idBerita));
      alert("Berita berhasil dihapus!");
      ambilDataBerita(); 
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans flex flex-col">
      {/* HEADER GLOBAL */}
      <Header user={user} tanganiLogout={tanganiLogout} />
      
      <div className="flex-grow pt-4">
        {/* SUSPENSE membungkus Routes untuk menangani loading saat pindah halaman */}
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home berita={berita} />} />
            <Route path="/biodata" element={<Biodata />} />
            <Route path="/biodata/:id" element={<BiodataDetail />} />
            <Route path="/galeri" element={<Galeri />} />
            <Route path="/berita" element={<BeritaSekolah berita={berita} />} />
            <Route path="/download" element={<Download />} />
            <Route path="/kontak" element={<Kontak />} />
            <Route path="/admin" element={
              <Admin 
                user={user} email={email} setEmail={setEmail} password={password} setPassword={setPassword} 
                errorLogin={errorLogin} tanganiLogin={tanganiLogin} berita={berita} judulBaru={judulBaru} 
                setJudulBaru={setJudulBaru} kategoriBaru={kategoriBaru} setKategoriBaru={setKategoriBaru} 
                fileGambar={fileGambar} setFileGambar={setFileGambar} urlGambarLama={urlGambarLama} 
                isiBaru={isiBaru} setIsiBaru={setIsiBaru} simpanAtauUpdateBerita={simpanAtauUpdateBerita} 
                prosesSimpan={prosesSimpan} idEdit={idEdit} batalEdit={batalEdit} mulaiEdit={mulaiEdit} 
                hapusBerita={hapusBerita} tanganiLogout={tanganiLogout}
              />
            } />
          </Routes>
        </Suspense>
      </div>

      {/* FOOTER GLOBAL */}
      <Footer />
    </div>
  );
}

export default App;