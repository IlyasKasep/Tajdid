import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  Pause,
  RotateCcw,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  Sparkles,
  BookOpen,
  ShieldCheck,
  LayoutDashboard,
  UploadCloud,
  FolderHeart,
  MessageSquareHeart,
  CheckCircle2,
  ExternalLink,
  Lock,
  ArrowRight,
  ChevronRight,
  Printer,
  Download as DownloadIcon,
  Laptop,
  Smartphone,
  Info,
  Layers,
  Image as ImageIcon,
  KeyRound,
  PanelLeftClose,
  PanelLeftOpen,
  Send,
  Eye,
  FileText,
  Users
} from 'lucide-react';
import LogoPersis from '../assets/Logo_Persis.png';

// =========================================================================
// DATA CHAPTER VIDEO PANDUAN & PENGENALAN
// =========================================================================
const CHAPTERS = [
  {
    id: 0,
    title: 'Pengenalan Profil RA At-Tajdid',
    badge: 'Profil & Publik',
    icon: Sparkles,
    duration: 18,
    color: 'from-emerald-600 to-teal-700',
    subtitle:
      'Selamat datang di Website Resmi RA Persis 175 At-Tajdid Pasirjambu. Platform modern ramah anak yang dirancang untuk mengenalkan sekolah dan mempermudah akses informasi bagi santri & wali murid.',
    points: [
      'Desain ramah anak & islami berbasis Kurikulum Merdeka',
      'Responsif 100% di HP, tablet, dan laptop',
      'Terhubung dengan Google Search Console & SEO Google',
      'Navigasi ringkas: Berita, Galeri, Biodata Guru, PPDB, & Saran'
    ]
  },
  {
    id: 1,
    title: 'Akses & Kredensial Login Admin Baru',
    badge: 'Keamanan Akun',
    icon: KeyRound,
    duration: 20,
    color: 'from-amber-500 to-orange-600',
    subtitle:
      'Akses portal admin beralamat di /admin. Masukkan email resmi "Attajdid@gmail.com" dan password baru yang telah diamankan dengan enkripsi Supabase Cloud Auth.',
    points: [
      'Alamat Login: https://www.ra-attajdid-pasirjambu.sch.id/admin',
      'Email Resmi: Attajdid@gmail.com',
      'Password Baru: Persis175Pasjam',
      'Keamanan multi-session & auto-redirect ke dashboard'
    ]
  },
  {
    id: 2,
    title: 'Navigasi Sidebar Modern Buka-Tutup',
    badge: 'Tata Letak SaaS',
    icon: LayoutDashboard,
    duration: 20,
    color: 'from-sky-600 to-blue-700',
    subtitle:
      'Dashboard admin mengadopsi gaya SaaS terkini dengan sidebar lipat (collapsible). Cukup 1 tombol toggle di kiri atas untuk memaksimalkan ruang kerja saat mengelola data sekolah.',
    points: [
      '1 Tombol Toggle Tunggal di pojok kiri atas',
      'Mode ringkas (icon-only) dengan tooltip otomatis',
      'Kartu profil admin permanen di kiri bawah di semua menu',
      'Scroll mandiri: sidebar tetap kokoh saat konten panjang'
    ]
  },
  {
    id: 3,
    title: 'Kelola Berita & Supabase Storage',
    badge: 'Cloud Storage',
    icon: UploadCloud,
    duration: 22,
    color: 'from-teal-600 to-emerald-700',
    subtitle:
      'Unggah berita dan foto langsung dari perangkat (laptop/HP)! Foto otomatis tersimpan aman di Supabase Cloud Storage tanpa perlu membuka ImgBB atau situs pihak ketiga lagi.',
    points: [
      'Tombol "Pilih Foto dari Perangkat" langsung aktif',
      'Otomatis terunggah ke Cloud Bucket Supabase',
      'Bisa menyertakan link foto luar jika diinginkan',
      'Dukungan kategori: Berita, Pengumuman, dan Kegiatan'
    ]
  },
  {
    id: 4,
    title: 'Folder Galeri Foto & Download File',
    badge: 'Media & Dokumen',
    icon: FolderHeart,
    duration: 20,
    color: 'from-indigo-600 to-violet-700',
    subtitle:
      'Dokumentasi kegiatan santri tersimpan rapi dalam folder album. Admin dapat mengunggah banyak foto sekaligus, memilih foto sampul, serta membagikan file formulir PPDB.',
    points: [
      'Struktur album kegiatan (Manasik Haji, Pentas Seni, dll)',
      'Upload banyak foto sekaligus (Bulk Upload) dalam 1 kali klik',
      'Atur foto sampul (cover) folder galeri dengan mudah',
      'Kelola file unduhan formulir pendaftaran murid baru (PDF)'
    ]
  },
  {
    id: 5,
    title: 'Kotak Saran Wali Murid & Guru',
    badge: 'Komunikasi & Profil',
    icon: MessageSquareHeart,
    duration: 20,
    color: 'from-rose-500 to-pink-600',
    subtitle:
      'Pantau kritik, apresiasi, dan masukan dari wali murid secara real-time. Tandai saran yang telah dibaca dan kelola data profil guru pengajar RA Persis 175 At-Tajdid.',
    points: [
      'Dashboard kotak saran dengan statistik belum dibaca',
      'Tandai status "Sudah Dibaca" dengan satu klik',
      'Pembaruan data guru & tenaga kependidikan',
      'Terintegrasi penuh untuk kemajuan lembaga RA At-Tajdid'
    ]
  }
];

// Suara Sintesis Native Web Audio API (100% tanpa file eksternal)
const playNativeSound = (type, isMuted) => {
  if (isMuted) return;
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    if (ctx.state === 'suspended') ctx.resume();

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === 'click') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } else if (type === 'chime') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
      osc.frequency.exponentialRampToValueAtTime(783.99, ctx.currentTime + 0.18); // G5
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
      osc.start();
      osc.stop(ctx.currentTime + 0.35);
    } else if (type === 'success') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, ctx.currentTime); // A4
      osc.frequency.setValueAtTime(554.37, ctx.currentTime + 0.08); // C#5
      osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.16); // E5
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
      osc.start();
      osc.stop(ctx.currentTime + 0.4);
    }
  } catch (e) {
    // Abaikan jika browser memblokir audio
  }
};

// =========================================================================
// SUB-KOMPONEN KANVAS ANIMASI FRAMER MOTION
// =========================================================================

// SCENE 0: Pengenalan Website
function SceneIntro() {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-emerald-950 via-teal-900 to-slate-950 text-white overflow-hidden select-none">
      {/* Background Decorative Rings */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], rotate: [0, 90, 180] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        className="absolute w-[500px] h-[500px] rounded-full border border-teal-500/20 pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1.2, 1, 1.2], rotate: [180, 90, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className="absolute w-[350px] h-[350px] rounded-full border border-amber-400/20 pointer-events-none"
      />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-2xl">
        {/* Animated Badge & Logo */}
        <motion.div
          initial={{ scale: 0, rotate: -20, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.1 }}
          className="relative mb-4"
        >
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-white border-4 border-amber-300 p-2 shadow-[0_0_30px_rgba(251,191,36,0.4)] flex items-center justify-center">
            <img src={LogoPersis} alt="Logo Persis" className="w-full h-full object-contain" />
          </div>
          <motion.span
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute -top-2 -right-2 bg-amber-400 text-emerald-950 text-[10px] font-black px-2 py-0.5 rounded-full border-2 border-emerald-950 shadow-sm"
          >
            OFFICIAL
          </motion.span>
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <span className="inline-block px-3 py-1 bg-teal-800/80 border border-teal-400/40 rounded-full text-xs font-bold text-teal-200 uppercase tracking-widest mb-2">
            Raudhatul Athfal Persis 175
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-amber-300 tracking-tight leading-tight">
            AT-TAJDID PASIRJAMBU
          </h2>
          <p className="text-xs sm:text-sm text-teal-100/90 font-medium mt-1 max-w-lg">
            PAUD & TK Islam Ramah Anak • Berbasis Kurikulum Merdeka & Nilai-Nilai Qur'ani
          </p>
        </motion.div>

        {/* 4 Feature Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mt-6 w-full"
        >
          {[
            { label: 'Berita & Agenda', icon: FileText, color: 'bg-emerald-500/20 border-emerald-400/40' },
            { label: 'Galeri Santri', icon: ImageIcon, color: 'bg-sky-500/20 border-sky-400/40' },
            { label: 'Download PPDB', icon: DownloadIcon, color: 'bg-amber-500/20 border-amber-400/40' },
            { label: 'Kotak Saran Wali', icon: MessageSquareHeart, color: 'bg-rose-500/20 border-rose-400/40' }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 + idx * 0.12 }}
              className={`p-2.5 rounded-xl border backdrop-blur-sm flex flex-col items-center gap-1.5 text-center ${item.color}`}
            >
              <item.icon size={18} className="text-white" />
              <span className="text-[11px] font-bold text-white/95 leading-tight">{item.label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Website URL Pill */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-6 inline-flex items-center gap-2 bg-slate-900/90 border border-teal-400/40 px-4 py-1.5 rounded-full text-xs font-mono text-teal-300"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>https://www.ra-attajdid-pasirjambu.sch.id</span>
        </motion.div>
      </div>
    </div>
  );
}

// SCENE 1: Login & Kredensial Admin Baru
function SceneLogin() {
  const [typedEmail, setTypedEmail] = useState('');
  const [typedPass, setTypedPass] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);

  useEffect(() => {
    let t1, t2, t3;
    const targetEmail = 'Attajdid@gmail.com';
    const targetPass = 'Persis175Pasjam';

    // Animasi Mengetik Email
    let i = 0;
    t1 = setInterval(() => {
      if (i <= targetEmail.length) {
        setTypedEmail(targetEmail.slice(0, i));
        i++;
      } else {
        clearInterval(t1);
        // Lanjut ketik password
        let j = 0;
        t2 = setInterval(() => {
          if (j <= targetPass.length) {
            setTypedPass('•'.repeat(j));
            j++;
          } else {
            clearInterval(t2);
            // Tombol login ditekan
            t3 = setTimeout(() => {
              setLoginSuccess(true);
            }, 600);
          }
        }, 60);
      }
    }, 70);

    return () => {
      clearInterval(t1);
      clearInterval(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center p-6 bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 select-none overflow-hidden">
      {/* Animated Simulated Cursor */}
      <motion.div
        animate={{
          x: loginSuccess ? [140, 140] : [200, 40, 40, 60, 60],
          y: loginSuccess ? [110, 110] : [-80, -20, 30, 95, 95],
          scale: loginSuccess ? [1, 0.85, 1] : 1
        }}
        transition={{ duration: 5, ease: 'easeInOut' }}
        className="absolute z-30 pointer-events-none"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="drop-shadow-lg">
          <path
            d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87c.45 0 .67-.54.35-.85L5.85 2.36a.5.5 0 0 0-.35.85z"
            fill="#f59e0b"
            stroke="#064e3b"
            strokeWidth="1.5"
          />
        </svg>
      </motion.div>

      {/* Login Card Mockup */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-md bg-white rounded-3xl border-4 border-emerald-950 shadow-[8px_8px_0px_#064e3b] p-6 text-slate-800 relative"
      >
        {/* Top Header Card */}
        <div className="flex items-center gap-3 pb-4 mb-4 border-b-2 border-emerald-950/15">
          <div className="w-10 h-10 rounded-xl bg-amber-300 border-2 border-emerald-950 flex items-center justify-center p-1 shadow-sm">
            <Lock size={18} className="text-emerald-950" />
          </div>
          <div>
            <h3 className="text-sm font-black text-emerald-950 uppercase">Login Portal Admin</h3>
            <p className="text-[10px] font-bold text-slate-500">Kredensial Resmi RA At-Tajdid</p>
          </div>
        </div>

        {/* Form Mockup */}
        <div className="space-y-3">
          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">
              Email Administrator
            </label>
            <div className="h-10 px-3 bg-slate-50 rounded-xl border-2 border-emerald-950 flex items-center justify-between text-xs font-mono font-bold text-emerald-950">
              <span>{typedEmail || <span className="text-slate-400">Mengetik email...</span>}</span>
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="w-1.5 h-4 bg-emerald-600 inline-block"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">
              Password Akun Baru
            </label>
            <div className="h-10 px-3 bg-slate-50 rounded-xl border-2 border-emerald-950 flex items-center text-xs font-mono font-bold text-emerald-950 tracking-widest">
              <span>{typedPass || <span className="text-slate-400 tracking-normal text-[11px]">Mengetik password...</span>}</span>
            </div>
          </div>

          <motion.button
            animate={{
              scale: loginSuccess ? [1, 0.95, 1] : 1,
              backgroundColor: loginSuccess ? '#10b981' : '#047857'
            }}
            className="w-full h-11 rounded-xl text-white font-black text-xs uppercase tracking-wider border-2 border-emerald-950 shadow-[3px_3px_0px_#064e3b] flex items-center justify-center gap-2 mt-2"
          >
            {loginSuccess ? (
              <>
                <CheckCircle2 size={16} />
                <span>Autentikasi Berhasil!</span>
              </>
            ) : (
              <span>Masuk ke Dashboard</span>
            )}
          </motion.button>
        </div>

        {/* Kredensial Note Callout */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-4 p-2.5 bg-amber-50 rounded-xl border border-amber-300 text-[10px] text-amber-950 flex items-start gap-2"
        >
          <Info size={14} className="text-amber-700 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">Kredensial Aktif: </span>
            <code className="bg-amber-200 px-1 rounded font-bold">Attajdid@gmail.com</code> /{' '}
            <code className="bg-amber-200 px-1 rounded font-bold">Persis175Pasjam</code>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

// SCENE 2: Navigasi Sidebar Modern Buka-Tutup
function SceneSidebar() {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setCollapsed(true), 2400);
    const timer2 = setTimeout(() => setCollapsed(false), 5600);
    const timer3 = setTimeout(() => setCollapsed(true), 8800);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <div className="relative w-full h-full flex bg-slate-100 select-none overflow-hidden">
      {/* Mock Sidebar */}
      <motion.aside
        animate={{ width: collapsed ? 76 : 240 }}
        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
        className="h-full bg-white border-r-2 border-emerald-950/20 flex flex-col justify-between shrink-0 shadow-sm"
      >
        <div>
          {/* Header Sidebar */}
          <div className="h-14 px-3 flex items-center gap-2.5 border-b border-emerald-950/15">
            <div className="w-8 h-8 rounded-lg bg-white border-2 border-emerald-950 p-1 shrink-0 flex items-center justify-center">
              <img src={LogoPersis} alt="Logo" className="w-full h-full object-contain" />
            </div>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="min-w-0"
              >
                <h4 className="text-xs font-black text-emerald-950 truncate">RA PERSIS 175</h4>
                <p className="text-[9px] font-bold text-emerald-700 truncate">Portal Admin</p>
              </motion.div>
            )}
          </div>

          {/* Nav Items */}
          <div className="p-2 space-y-1">
            {[
              { label: 'Kelola Berita', icon: FileText, active: true },
              { label: 'Data Pengurus & Guru', icon: Users },
              { label: 'Folder Galeri Foto', icon: FolderHeart },
              { label: 'File Download', icon: DownloadIcon },
              { label: 'Kotak Saran Masuk', icon: MessageSquareHeart }
            ].map((menu, idx) => (
              <div
                key={idx}
                className={`flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-xs font-bold border ${
                  menu.active
                    ? 'bg-emerald-600 text-white border-emerald-950 shadow-sm'
                    : 'text-slate-600 border-transparent hover:bg-slate-100'
                } ${collapsed ? 'justify-center' : ''}`}
                title={menu.label}
              >
                <menu.icon size={16} className="shrink-0" />
                {!collapsed && <span className="truncate">{menu.label}</span>}
              </div>
            ))}
          </div>
        </div>

        {/* Profile Card Footer */}
        <div className="p-2 border-t border-emerald-950/15 bg-slate-50">
          {!collapsed ? (
            <div className="p-2 bg-white rounded-xl border border-emerald-950/20 flex items-center justify-between">
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-7 h-7 rounded-lg bg-emerald-800 text-white text-[10px] font-black flex items-center justify-center">
                  AD
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-black text-emerald-950 truncate">Administrator</p>
                  <p className="text-[9px] text-slate-500 truncate">Attajdid@gmail.com</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-8 h-8 mx-auto rounded-lg bg-emerald-800 text-white text-[10px] font-black flex items-center justify-center">
              AD
            </div>
          )}
        </div>
      </motion.aside>

      {/* Main Workspace Simulation */}
      <div className="flex-1 flex flex-col min-w-0 bg-slate-50">
        {/* Top Navbar */}
        <div className="h-14 px-4 bg-white border-b-2 border-emerald-950/15 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Toggle Button Simulated */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="w-8 h-8 rounded-lg bg-amber-200 border-2 border-emerald-950 flex items-center justify-center text-emerald-950 shadow-sm cursor-pointer"
            >
              {collapsed ? <PanelLeftOpen size={16} /> : <PanelLeftClose size={16} />}
            </motion.button>
            <span className="text-xs font-black text-emerald-950">
              Admin / <span className="text-emerald-700">Kelola Berita</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 bg-teal-50 border border-teal-200 rounded-lg text-[10px] font-bold text-teal-800">
              Mode: {collapsed ? 'Sidebar Ringkas (Icon)' : 'Sidebar Terbuka'}
            </span>
          </div>
        </div>

        {/* Content Preview */}
        <div className="p-4 flex-1 overflow-hidden flex flex-col justify-center items-center text-center">
          <motion.div
            key={collapsed ? 'col' : 'exp'}
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="p-6 bg-white rounded-2xl border-2 border-emerald-950 shadow-[4px_4px_0px_#064e3b] max-w-sm"
          >
            <div className="w-10 h-10 mx-auto rounded-xl bg-amber-100 border border-emerald-950/20 flex items-center justify-center mb-2">
              <LayoutDashboard size={20} className="text-amber-800" />
            </div>
            <h4 className="text-sm font-black text-emerald-950">Area Kerja Fleksibel</h4>
            <p className="text-xs text-slate-600 mt-1">
              Saat sidebar dilipat, workspace otomatis meluas sehingga admin lebih lega saat mengedit
              berita atau mengunggah banyak foto kegiatan.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// SCENE 3: Kelola Berita & Supabase Storage
function SceneNewsUpload() {
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    let p = 0;
    const interval = setInterval(() => {
      p += 10;
      if (p <= 100) {
        setUploadProgress(p);
      } else {
        clearInterval(interval);
      }
    }, 180);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center p-6 bg-slate-900 select-none overflow-hidden text-slate-800">
      <div className="w-full max-w-lg bg-white rounded-3xl border-4 border-emerald-950 shadow-[8px_8px_0px_#064e3b] p-5">
        <div className="flex items-center justify-between pb-3 border-b border-emerald-950/15 mb-4">
          <div className="flex items-center gap-2">
            <UploadCloud size={20} className="text-teal-700" />
            <h3 className="text-sm font-black text-emerald-950 uppercase">
              Upload Berita Langsung ke Cloud
            </h3>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
            Supabase Active
          </span>
        </div>

        {/* Mock Form Inputs */}
        <div className="space-y-3">
          <div>
            <div className="h-8 px-3 bg-slate-50 rounded-xl border border-emerald-950/30 flex items-center text-xs font-bold text-emerald-950">
              Praktek Sholat & Doa Bersama Santri RA At-Tajdid
            </div>
          </div>

          {/* Upload Button & Progress Animation */}
          <div className="p-3 bg-teal-50/70 rounded-2xl border-2 border-dashed border-teal-600/40">
            <div className="flex items-center justify-between text-xs font-bold mb-2">
              <span className="flex items-center gap-1.5 text-teal-900">
                <ImageIcon size={14} /> kegiatan_santri_sholat.jpg (1.8 MB)
              </span>
              <span className="font-mono text-teal-700">{uploadProgress}%</span>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden border border-emerald-950/20">
              <motion.div
                className="h-full bg-gradient-to-r from-teal-500 to-emerald-600 rounded-full"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>

            <p className="text-[10px] font-semibold text-teal-700 mt-2">
              {uploadProgress < 100
                ? 'Mengunggah file foto langsung ke Supabase Cloud Storage...'
                : '✓ Foto berhasil tersimpan di Storage! URL Publik dibuat otomatis.'}
            </p>
          </div>

          {/* Live Preview Card */}
          {uploadProgress >= 100 && (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="p-3 bg-emerald-50 rounded-xl border border-emerald-400 flex items-center gap-3"
            >
              <div className="w-12 h-12 rounded-lg bg-emerald-200 border border-emerald-950/30 flex items-center justify-center shrink-0">
                <ImageIcon size={22} className="text-emerald-800" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-black text-emerald-950 truncate">
                  Praktek Sholat & Doa Bersama Santri
                </p>
                <p className="text-[10px] text-emerald-700 font-semibold">
                  Tersedia di halaman publik berita sekolah
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

// SCENE 4: Folder Galeri Foto & Download Berkas
function SceneGalleryFolders() {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 select-none overflow-hidden text-white">
      <div className="w-full max-w-xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-300">
              Dokumentasi & Media
            </span>
            <h3 className="text-lg sm:text-xl font-black text-amber-300">
              Album Galeri Per Kegiatan & Download Berkas
            </h3>
          </div>
          <span className="px-3 py-1 bg-indigo-800/80 rounded-full text-xs font-bold border border-indigo-400/40">
            Multi-Upload Aktif
          </span>
        </div>

        {/* Folder Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            {
              title: 'Manasik Haji Cilik',
              count: '24 Foto',
              date: 'Okt 2026',
              color: 'from-amber-400 to-orange-500'
            },
            {
              title: 'Pentas Seni & Kreasi',
              count: '36 Foto',
              date: 'Sep 2026',
              color: 'from-emerald-400 to-teal-500'
            },
            {
              title: 'Rihlah Edukasi Alam',
              count: '18 Foto',
              date: 'Agu 2026',
              color: 'from-sky-400 to-blue-500'
            }
          ].map((album, idx) => (
            <motion.div
              key={idx}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 + idx * 0.15 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl border-2 border-white/20 p-3.5 flex flex-col justify-between hover:bg-white/15 transition-all shadow-md"
            >
              <div>
                <div
                  className={`w-9 h-9 rounded-xl bg-gradient-to-br ${album.color} text-emerald-950 flex items-center justify-center mb-2 shadow-sm`}
                >
                  <FolderHeart size={18} />
                </div>
                <h4 className="text-xs font-black text-white leading-snug">{album.title}</h4>
                <p className="text-[10px] text-indigo-200 mt-0.5">{album.date}</p>
              </div>

              <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-bold text-amber-300">
                <span>{album.count}</span>
                <span className="text-indigo-200">Buka Folder →</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Download Section Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-4 p-3 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-teal-400/20 text-teal-300 flex items-center justify-center">
              <DownloadIcon size={16} />
            </div>
            <div>
              <p className="text-xs font-bold text-white">Menu File Download Publik</p>
              <p className="text-[10px] text-slate-300">
                Unggah formulir pendaftaran PPDB (PDF/DOC) untuk wali murid
              </p>
            </div>
          </div>
          <span className="text-xs font-bold text-teal-300 bg-teal-900/60 px-2.5 py-1 rounded-lg border border-teal-500/30">
            Aktif
          </span>
        </motion.div>
      </div>
    </div>
  );
}

// SCENE 5: Kotak Saran & Data Guru
function SceneFeedbackAndStaff() {
  const [isRead, setIsRead] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsRead(true), 2800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center p-6 bg-slate-900 select-none overflow-hidden text-slate-800">
      <div className="w-full max-w-lg bg-white rounded-3xl border-4 border-emerald-950 shadow-[8px_8px_0px_#064e3b] p-5">
        <div className="flex items-center justify-between pb-3 border-b border-emerald-950/15 mb-4">
          <div className="flex items-center gap-2">
            <MessageSquareHeart size={20} className="text-rose-600" />
            <h3 className="text-sm font-black text-emerald-950 uppercase">
              Kotak Saran Masuk & Interaksi Wali
            </h3>
          </div>
          <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
            Realtime
          </span>
        </div>

        {/* Counter Cards */}
        <div className="grid grid-cols-3 gap-2 mb-3">
          <div className="p-2 bg-teal-50 rounded-xl border border-emerald-950/20 text-center">
            <span className="block text-[10px] font-bold text-slate-500">TOTAL</span>
            <span className="text-sm font-black text-emerald-950">12</span>
          </div>
          <div className="p-2 bg-amber-50 rounded-xl border border-emerald-950/20 text-center">
            <span className="block text-[10px] font-bold text-amber-700">BELUM BACA</span>
            <span className="text-sm font-black text-amber-900">{isRead ? '2' : '3'}</span>
          </div>
          <div className="p-2 bg-emerald-50 rounded-xl border border-emerald-950/20 text-center">
            <span className="block text-[10px] font-bold text-emerald-700">SUDAH BACA</span>
            <span className="text-sm font-black text-emerald-950">{isRead ? '10' : '9'}</span>
          </div>
        </div>

        {/* Saran Card */}
        <div className="p-3 bg-slate-50 rounded-2xl border-2 border-emerald-950/20 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-emerald-950">Ibu Siti Nurhaliza</span>
            <motion.span
              animate={{ scale: isRead ? [1.1, 1] : 1 }}
              className={`text-[9px] font-black px-2 py-0.5 rounded-full border ${
                isRead
                  ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                  : 'bg-amber-100 text-amber-800 border-amber-300 animate-pulse'
              }`}
            >
              {isRead ? 'Sudah Dibaca' : 'Baru Masuk'}
            </motion.span>
          </div>
          <p className="text-xs text-slate-600 italic">
            "Alhamdulillah kegiatan manasik haji kemarin sangat berkesan untuk ananda. Terima kasih
            para ustadzah RA At-Tajdid!"
          </p>
          <div className="pt-2 border-t border-slate-200 flex justify-end">
            <button
              type="button"
              className="text-[10px] font-black px-3 py-1 bg-emerald-600 text-white rounded-lg border border-emerald-950 shadow-sm"
            >
              {isRead ? '✓ Terbaca' : 'Tandai Sudah Dibaca'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// =========================================================================
// KOMPONEN UTAMA VIDEO PANDUAN DENGAN KONTROL & CHEATSHEET
// =========================================================================
export default function VideoPanduan() {
  const [currentChapter, setCurrentChapter] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0); // 0 to 100 within current chapter
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const playerContainerRef = useRef(null);

  const activeChapterData = CHAPTERS[currentChapter];

  // Handler Ganti Chapter
  const handleSelectChapter = useCallback(
    (index) => {
      setCurrentChapter(index);
      setProgress(0);
      playNativeSound('chime', isMuted);
    },
    [isMuted]
  );

  const handleNextChapter = useCallback(() => {
    if (currentChapter < CHAPTERS.length - 1) {
      handleSelectChapter(currentChapter + 1);
    } else {
      setIsPlaying(false);
      playNativeSound('success', isMuted);
    }
  }, [currentChapter, handleSelectChapter, isMuted]);

  const handlePrevChapter = useCallback(() => {
    if (currentChapter > 0) {
      handleSelectChapter(currentChapter - 1);
    } else {
      setProgress(0);
    }
  }, [currentChapter, handleSelectChapter]);

  // Loop Timer Animasi Playback
  useEffect(() => {
    if (!isPlaying) return;

    const intervalTime = 100; // ms
    const stepIncrement =
      (100 / (activeChapterData.duration * 10)) * playbackSpeed;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev + stepIncrement >= 100) {
          handleNextChapter();
          return 0;
        }
        return prev + stepIncrement;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isPlaying, activeChapterData.duration, playbackSpeed, handleNextChapter]);

  // Fullscreen Handler
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      playerContainerRef.current?.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFsChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space') {
        e.preventDefault();
        setIsPlaying((prev) => !prev);
        playNativeSound('click', isMuted);
      } else if (e.code === 'ArrowRight') {
        handleNextChapter();
      } else if (e.code === 'ArrowLeft') {
        handlePrevChapter();
      } else if (e.code === 'KeyM') {
        setIsMuted((prev) => !prev);
      } else if (e.code === 'KeyF') {
        toggleFullscreen();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNextChapter, handlePrevChapter, isMuted]);

  return (
    <div className="min-h-screen bg-teal-50/50 py-8 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border-2 border-emerald-950 shadow-[4px_4px_0px_#064e3b]">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-amber-300 border-2 border-emerald-950 shadow-[2px_2px_0px_#064e3b] p-1 flex items-center justify-center shrink-0">
              <img src={LogoPersis} alt="Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-900 px-2.5 py-0.5 rounded-full text-[10px] font-black tracking-wider uppercase mb-1">
                <Sparkles size={12} className="text-emerald-700" />
                Interaktif • Framer Motion Engine
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-emerald-950 leading-tight">
                Video Panduan Admin & Pengenalan Website
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 font-medium">
                Petunjuk lengkap cara menggunakan dashboard admin serta mengenal fitur website RA Persis 175 At-Tajdid.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Link
              to="/admin"
              className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-900 hover:bg-emerald-800 text-white rounded-xl font-black text-xs border-2 border-emerald-950 shadow-[2px_2px_0px_#f59e0b] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition"
            >
              <LayoutDashboard size={15} />
              <span>Buka Portal Admin</span>
            </Link>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* VIDEO PLAYER FRAME (16:9 NEO-BRUTALIST CINEMATIC CANVAS) */}
        {/* ========================================================================= */}
        <div
          ref={playerContainerRef}
          className="relative bg-slate-950 rounded-3xl border-4 border-emerald-950 shadow-[8px_8px_0px_#064e3b] overflow-hidden flex flex-col"
        >
          {/* Top Video Header Bar */}
          <div className="h-12 bg-slate-900/90 backdrop-blur-md px-4 flex items-center justify-between border-b border-white/10 z-20 text-white">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
              <span className="text-xs font-black tracking-wide truncate max-w-[220px] sm:max-w-none">
                Bab {currentChapter + 1} dari {CHAPTERS.length}: {activeChapterData.title}
              </span>
            </div>

            <div className="flex items-center gap-2 text-[10px] font-bold">
              <span className="hidden sm:inline-block px-2 py-0.5 rounded bg-emerald-900/60 text-emerald-300 border border-emerald-600/40">
                1080p 60FPS
              </span>
              <button
                type="button"
                onClick={toggleFullscreen}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
                title={isFullscreen ? 'Keluar Fullscreen (F)' : 'Layar Penuh (F)'}
              >
                {isFullscreen ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
              </button>
            </div>
          </div>

          {/* Main Visual Animation Canvas (Framer Motion Stage) */}
          <div className="relative aspect-video w-full overflow-hidden bg-slate-950 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentChapter}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.04 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="w-full h-full"
              >
                {currentChapter === 0 && <SceneIntro />}
                {currentChapter === 1 && <SceneLogin />}
                {currentChapter === 2 && <SceneSidebar />}
                {currentChapter === 3 && <SceneNewsUpload />}
                {currentChapter === 4 && <SceneGalleryFolders />}
                {currentChapter === 5 && <SceneFeedbackAndStaff />}
              </motion.div>
            </AnimatePresence>

            {/* Subtitle / Voiceover Narration Bar */}
            <div className="absolute bottom-3 left-4 right-4 z-20 pointer-events-none">
              <motion.div
                key={currentChapter}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-slate-900/85 backdrop-blur-md border border-white/20 rounded-2xl px-4 py-2.5 text-center shadow-lg"
              >
                <p className="text-xs sm:text-sm font-semibold text-white/95 leading-relaxed">
                  💬 {activeChapterData.subtitle}
                </p>
              </motion.div>
            </div>
          </div>

          {/* Bottom Player Controls & Timeline */}
          <div className="bg-slate-900 p-3 sm:p-4 border-t border-white/10 text-white z-20 space-y-3">
            {/* Timeline Progress Bar Scrubber with Chapter Notches */}
            <div className="relative w-full">
              <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden cursor-pointer relative">
                {/* Total Visual Progress */}
                <div
                  className="h-full bg-gradient-to-r from-teal-400 via-amber-300 to-emerald-400 transition-all duration-100 rounded-full"
                  style={{
                    width: `${((currentChapter + progress / 100) / CHAPTERS.length) * 100}%`
                  }}
                />
              </div>

              {/* Chapter Notches */}
              <div className="absolute inset-0 flex justify-between pointer-events-none px-0.5">
                {CHAPTERS.map((ch, idx) => (
                  <div
                    key={ch.id}
                    className={`w-1 h-2.5 ${
                      idx <= currentChapter ? 'bg-white/40' : 'bg-slate-700'
                    } rounded-full`}
                  />
                ))}
              </div>
            </div>

            {/* Control Buttons Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                {/* Play / Pause Button */}
                <button
                  type="button"
                  onClick={() => {
                    setIsPlaying(!isPlaying);
                    playNativeSound('click', isMuted);
                  }}
                  className="w-9 h-9 rounded-xl bg-amber-400 hover:bg-amber-300 text-emerald-950 font-black flex items-center justify-center border-2 border-emerald-950 shadow-[2px_2px_0px_#064e3b] transition cursor-pointer"
                  title={isPlaying ? 'Jeda (Spasi)' : 'Putar (Spasi)'}
                >
                  {isPlaying ? <Pause size={17} /> : <Play size={17} className="ml-0.5" />}
                </button>

                {/* Prev Chapter */}
                <button
                  type="button"
                  onClick={handlePrevChapter}
                  disabled={currentChapter === 0}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 border border-white/10 text-white transition cursor-pointer"
                  title="Bab Sebelumnya"
                >
                  <SkipBack size={15} />
                </button>

                {/* Next Chapter */}
                <button
                  type="button"
                  onClick={handleNextChapter}
                  disabled={currentChapter === CHAPTERS.length - 1}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 border border-white/10 text-white transition cursor-pointer"
                  title="Bab Berikutnya"
                >
                  <SkipForward size={15} />
                </button>

                {/* Replay Chapter */}
                <button
                  type="button"
                  onClick={() => {
                    setProgress(0);
                    setIsPlaying(true);
                  }}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-white/10 text-white transition cursor-pointer"
                  title="Ulangi Bab Ini"
                >
                  <RotateCcw size={15} />
                </button>

                {/* Timer Display */}
                <span className="font-mono text-[11px] text-slate-300 font-bold ml-1">
                  Bab {currentChapter + 1} / {CHAPTERS.length}
                </span>
              </div>

              {/* Speed & Sound Controls */}
              <div className="flex items-center gap-2">
                {/* Playback Speed Pill */}
                <div className="flex items-center bg-slate-800 rounded-xl p-0.5 border border-white/10">
                  {[1, 1.25, 1.5].map((spd) => (
                    <button
                      key={spd}
                      type="button"
                      onClick={() => setPlaybackSpeed(spd)}
                      className={`px-2 py-1 rounded-lg text-[10px] font-bold transition ${
                        playbackSpeed === spd
                          ? 'bg-amber-400 text-emerald-950 font-black'
                          : 'text-slate-300 hover:text-white'
                      }`}
                    >
                      {spd}x
                    </button>
                  ))}
                </div>

                {/* Mute / Unmute Button */}
                <button
                  type="button"
                  onClick={() => setIsMuted(!isMuted)}
                  className={`p-2 rounded-xl border border-white/10 transition cursor-pointer ${
                    isMuted
                      ? 'bg-rose-900/60 text-rose-300 border-rose-500/40'
                      : 'bg-slate-800 hover:bg-slate-700 text-white'
                  }`}
                  title={isMuted ? 'Buka Suara (M)' : 'Senyapkan Suara (M)'}
                >
                  {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* CHAPTER SELECTOR GRID (KLIK UNTUK LANGSUNG LOMPAT KE BAB TERTENTU) */}
        {/* ========================================================================= */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-base sm:text-lg font-black text-emerald-950 flex items-center gap-2">
              <Layers size={18} className="text-emerald-700" />
              Pilih Bab Video Panduan
            </h3>
            <span className="text-xs font-bold text-slate-500">
              Klik kartu bab untuk memutar langsung
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {CHAPTERS.map((ch, idx) => {
              const isActive = currentChapter === idx;
              const IconComp = ch.icon;
              return (
                <button
                  key={ch.id}
                  type="button"
                  onClick={() => handleSelectChapter(idx)}
                  className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between ${
                    isActive
                      ? 'bg-white border-emerald-950 shadow-[4px_4px_0px_#064e3b] -translate-y-1'
                      : 'bg-white/80 hover:bg-white border-emerald-950/20 hover:border-emerald-950 hover:shadow-sm'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className={`text-[10px] font-black px-2.5 py-0.5 rounded-full border ${
                          isActive
                            ? 'bg-amber-300 text-emerald-950 border-emerald-950'
                            : 'bg-slate-100 text-slate-700 border-slate-300'
                        }`}
                      >
                        {ch.badge}
                      </span>
                      <span className="text-[10px] font-bold text-slate-400">
                        {ch.duration} detik
                      </span>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <div
                        className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border-2 border-emerald-950 ${
                          isActive
                            ? 'bg-emerald-900 text-white shadow-sm'
                            : 'bg-teal-50 text-emerald-800'
                        }`}
                      >
                        <IconComp size={16} />
                      </div>
                      <div>
                        <h4 className="text-xs sm:text-sm font-black text-emerald-950 leading-snug">
                          {idx + 1}. {ch.title}
                        </h4>
                      </div>
                    </div>
                  </div>

                  {isActive && (
                    <div className="mt-3 pt-2 border-t border-emerald-950/15 flex items-center justify-between text-[11px] font-bold text-emerald-700">
                      <span className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                        Sedang Diputar
                      </span>
                      <span>{Math.round(progress)}%</span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* CHEATSHEET & RINGKASAN PANDUAN CEPAT (BISA DIBACA / DICETAK) */}
        {/* ========================================================================= */}
        <div className="bg-white rounded-3xl border-2 border-emerald-950 shadow-[6px_6px_0px_#064e3b] p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b-2 border-emerald-950/15">
            <div>
              <span className="text-xs font-black uppercase text-amber-600 tracking-wider">
                Dokumentasi Resmi
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-emerald-950">
                Cheatsheet Panduan Administrator RA At-Tajdid
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                Simpan atau cetak rangkuman ini sebagai panduan cepat operasional pengurus & guru.
              </p>
            </div>

            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-emerald-950 rounded-xl font-black text-xs border-2 border-emerald-950 shadow-[2px_2px_0px_#064e3b] transition cursor-pointer self-start sm:self-auto"
            >
              <Printer size={15} />
              <span>Cetak / Cetak PDF</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Box 1: Akun & Akses */}
            <div className="p-5 rounded-2xl bg-teal-50/60 border-2 border-emerald-950/20 space-y-3">
              <div className="flex items-center gap-2 text-emerald-950 font-black text-sm">
                <KeyRound size={18} className="text-emerald-700" />
                <h3>Akses & Login Admin</h3>
              </div>
              <ul className="text-xs text-slate-700 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-700 font-bold">•</span>
                  <span>
                    <strong>Alamat Login:</strong>{' '}
                    <code className="bg-white px-1.5 py-0.5 rounded border border-emerald-950/20 font-bold">
                      https://www.ra-attajdid-pasirjambu.sch.id/admin
                    </code>
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-700 font-bold">•</span>
                  <span>
                    <strong>Email:</strong>{' '}
                    <code className="bg-white px-1.5 py-0.5 rounded border border-emerald-950/20 font-bold">
                      Attajdid@gmail.com
                    </code>
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-700 font-bold">•</span>
                  <span>
                    <strong>Password Baru:</strong>{' '}
                    <code className="bg-white px-1.5 py-0.5 rounded border border-emerald-950/20 font-bold">
                      Persis175Pasjam
                    </code>
                  </span>
                </li>
              </ul>
            </div>

            {/* Box 2: Fitur Baru Supabase Cloud Storage */}
            <div className="p-5 rounded-2xl bg-amber-50/60 border-2 border-emerald-950/20 space-y-3">
              <div className="flex items-center gap-2 text-emerald-950 font-black text-sm">
                <UploadCloud size={18} className="text-amber-700" />
                <h3>Supabase Cloud Storage</h3>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                Anda tidak perlu lagi mengunggah foto ke situs ImgBB atau layanan eksternal. Gunakan
                tombol <strong>"Pilih Foto dari Perangkat"</strong> di menu Kelola Berita atau Folder
                Galeri. Foto otomatis tersimpan langsung di server cloud Supabase yang aman dan cepat.
              </p>
            </div>

            {/* Box 3: Buka Tutup Sidebar */}
            <div className="p-5 rounded-2xl bg-sky-50/60 border-2 border-emerald-950/20 space-y-3">
              <div className="flex items-center gap-2 text-emerald-950 font-black text-sm">
                <LayoutDashboard size={18} className="text-sky-700" />
                <h3>Navigasi Sidebar Ergonomis</h3>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                Gunakan tombol <strong>Panel Left</strong> di bagian kiri atas untuk melipat sidebar
                menjadi mode ringkas. Akun profil tetap berada permanen di pojok kiri bawah tanpa
                terdorong keluar layar saat membuka halaman berita atau album yang panjang.
              </p>
            </div>

            {/* Box 4: Folder Album & Kotak Saran */}
            <div className="p-5 rounded-2xl bg-rose-50/60 border-2 border-emerald-950/20 space-y-3">
              <div className="flex items-center gap-2 text-emerald-950 font-black text-sm">
                <MessageSquareHeart size={18} className="text-rose-700" />
                <h3>Folder Galeri & Kotak Saran</h3>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                Setiap kegiatan santri dapat dikelompokkan ke dalam folder album masing-masing dengan
                fitur <strong>unggah banyak foto sekaligus</strong>. Jangan lupa untuk memeriksa
                masukan dari wali santri di menu <strong>Kotak Saran Masuk</strong> secara berkala.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
