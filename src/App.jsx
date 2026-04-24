import { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { db, auth } from './firebase';
import { Routes, Route, useNavigate } from 'react-router-dom';


// MENGIMPOR KOMPONEN DAN HALAMAN YANG BARU KITA BUAT
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Admin from './pages/Admin';
import Biodata from './pages/Biodata';
import BukuTamu from './pages/BukuTamu';
import Galeri from './pages/Galeri';
import Download from './pages/Download';
import Polling from './pages/Polling';
import Chat from './pages/Chat';
import Tahfidz from './pages/Tahfidz';
import Sains from './pages/Sains';
import Ekskul from './pages/Ekskul';

// === API KEY IMGBB ===
const IMGBB_API_KEY = 'cb9b2aec11b80af3765d32f4d6f572da '; 

function App() {
  // STATE DATA
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

  // FUNGSI-FUNGSI DATABASE & AUTENTIKASI
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
    } catch (error) {
      setErrorLogin('Login gagal! Cek kembali email dan password Anda.');
    }
  };

  const tanganiLogout = () => {
  signOut(auth).then(() => {
    alert("Anda telah keluar dari sistem.");
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
      alert("Gagal mengunggah foto. Pastikan koneksi internet stabil.");
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
        await addDoc(collection(db, "berita"), { judul: judulBaru, isi: isiBaru, kategori: kategoriBaru, gambar: urlGambarFinal, tanggal: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) });
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
    if (window.confirm("Yakin ingin menghapus pengumuman ini secara permanen?")) {
      await deleteDoc(doc(db, "berita", idBerita));
      alert("Berita berhasil dihapus!");
      ambilDataBerita(); 
    }
  };

  // TAMPILAN UTAMA (SANGAT BERSIH KARENA SUDAH DIPISAH)
  return (
    <div className="min-h-screen bg-gray-100 font-sans flex flex-col">
      <Header user={user} tanganiLogout={tanganiLogout} />
      
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home berita={berita} />} />
          <Route path="/biodata" element={<Biodata />} />
          <Route path="/bukutamu" element={<BukuTamu />} />
          <Route path="/galeri" element={<Galeri />} />
          <Route path="/download" element={<Download />} />
          <Route path="/polling" element={<Polling />} />
          <Route path="/Chat" element={<Chat />} />
          <Route path="/tahfidz" element={<Tahfidz />} />
          <Route path="/sains" element={<Sains />} />
          <Route path="/ekskul" element={<Ekskul />} />
          <Route path="/admin" element={
            <Admin 
              user={user} email={email} setEmail={setEmail} password={password} setPassword={setPassword} 
              errorLogin={errorLogin} tanganiLogin={tanganiLogin} berita={berita} judulBaru={judulBaru} 
              setJudulBaru={setJudulBaru} kategoriBaru={kategoriBaru} setKategoriBaru={setKategoriBaru} 
              fileGambar={fileGambar} setFileGambar={setFileGambar} urlGambarLama={urlGambarLama} 
              isiBaru={isiBaru} setIsiBaru={setIsiBaru} simpanAtauUpdateBerita={simpanAtauUpdateBerita} 
              prosesSimpan={prosesSimpan} idEdit={idEdit} batalEdit={batalEdit} mulaiEdit={mulaiEdit} 
              hapusBerita={hapusBerita}tanganiLogout={tanganiLogout}
            />
          } />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;