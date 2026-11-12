import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion as Motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  BookOpen,
  CalendarCheck,
  Check,
  FolderDown,
  HeartHandshake,
  Images,
  Mail,
  MapPin,
} from 'lucide-react';

// Import CSS Swiper
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// === DATA FOTO SLIDER HERO ===
const sliderData = [
  { src: '/img/polisi.jpeg', alt: 'Kegiatan edukasi profesi anak RA Persis 175 At-Tajdid' },
  { src: '/img/bartanam.jpeg', alt: 'Kegiatan berkebun dan belajar di alam RA Persis 175 At-Tajdid' },
  { src: '/img/manasik.jpeg', alt: 'Kegiatan manasik haji anak RA Persis 175 At-Tajdid' },
];

const highlightItems = [
  { label: 'Ijin Operasional Sejak 2010', Icon: CalendarCheck, iconColor: 'text-amber-300' },
  { label: 'Kurikulum Merdeka', Icon: BookOpen, iconColor: 'text-teal-300' },
  { label: 'Pendidikan Berbasis Cinta', Icon: HeartHandshake, iconColor: 'text-rose-300' },
  { label: 'Usia 4–6 Tahun', Icon: Award, iconColor: 'text-amber-300' },
  { label: 'Pasirjambu, Kab. Bandung', Icon: MapPin, iconColor: 'text-teal-300' },
];

const highlightSlides = [...highlightItems, ...highlightItems, ...highlightItems];

const poinMengenalkan = [
  'Akhlak mulia sejak dini',
  'Kemandirian dan rasa tanggung jawab',
  'Cinta kepada Allah, Rasul, sesama manusia, ilmu dan peduli lingkungan',
  'Kebiasaan baik dalam kehidupan sehari-hari',
];

const poinMengapaKami = [
  'Lingkungan belajar yang aman, nyaman, dan ramah anak',
  'Guru yang ramah, sabar, profesional, dan penuh kasih sayang',
  'Kegiatan kreatif, edukatif, dan menyenangkan setiap hari',
  'Penanaman nilai agama dan akhlak mulia sejak dini',
  'Pendekatan pembelajaran yang menghargai keunikan setiap anak',
  'Pembiasaan ibadah sederhana (doa, adab, dan kebiasaan baik)',
  'Pendampingan sesuai tahap tumbuh kembang anak',
];

const sorotanKegiatan = [
  {
    tag: 'Kurikulum Merdeka',
    tagColor: 'bg-teal-200 text-emerald-950',
    frameShadow: 'shadow-[8px_8px_0px_#0d9488]',
    judul: 'Belajar Melalui Bermain & Eksplorasi Aktif',
    deskripsi:
      'Setiap kegiatan dirancang untuk menumbuhkan rasa ingin tahu, kreativitas, serta perkembangan kognitif dan sosial-emosional anak secara menyenangkan.',
    gambar: '/img/diskusi.jpeg',
    alt: 'Kegiatan diskusi dan belajar bersama di RA At-Tajdid',
    ctaLabel: 'Lihat Galeri Kegiatan',
    ctaTo: '/galeri',
    reverse: false,
  },
  {
    tag: 'Nilai KeIslaman',
    tagColor: 'bg-rose-200 text-emerald-950',
    frameShadow: 'shadow-[8px_8px_0px_#f43f5e]',
    judul: 'Pembiasaan Ibadah, Adab & Akhlak Mulia',
    deskripsi:
      'Penanaman ketauhidan dan kebiasaan baik sehari-hari seperti doa, adab, dan praktik ibadah sederhana dilakukan penuh kasih sayang dan keteladanan.',
    gambar: '/img/wudhu.jpeg',
    alt: 'Pembiasaan praktik ibadah anak di RA At-Tajdid',
    ctaLabel: 'Lihat Kabar Sekolah',
    ctaTo: '/berita',
    reverse: true,
  },
  {
    tag: 'Tumbuh Kembang',
    tagColor: 'bg-amber-300 text-emerald-950',
    frameShadow: 'shadow-[8px_8px_0px_#f59e0b]',
    judul: 'Ruang Tumbuh yang Aman, Nyaman & Ramah Anak',
    deskripsi:
      'Didampingi oleh guru yang sabar, profesional, dan menghargai keunikan setiap anak sesuai tahap tumbuh kembangnya.',
    gambar: '/img/ayunan.jpeg',
    alt: 'Suasana bermain ceria anak di RA At-Tajdid',
    ctaLabel: 'Kenali Pengelola',
    ctaTo: '/biodata',
    reverse: false,
  },
];

const galeriSingkat = [
  '/img/main.jpeg',
  '/img/main2.jpeg',
  '/img/main3.jpeg',
  '/img/main4.jpeg',
  '/img/main5.jpeg',
  '/img/main6.jpeg',
  '/img/main7.jpeg',
  '/img/main8.jpeg',
];

const springPop = { type: 'spring', stiffness: 220, damping: 18 };

function Home() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="bg-teal-50 min-h-screen font-sans text-slate-800 overflow-x-hidden">
      {/* ================= 1. HERO SECTION ================= */}
      <section className="relative pt-10 pb-16 lg:pt-16 lg:pb-24 px-6 bg-gradient-to-b from-teal-50 via-emerald-50/60 to-teal-50 overflow-hidden">
        {/* Ornamen Ceria Anak TK Mengambang di Latar (Desktop) */}
        <Motion.div
          aria-hidden="true"
          animate={{ rotate: 360 }}
          transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
          className="hidden lg:block absolute top-8 left-8 text-5xl opacity-80 select-none pointer-events-none"
        >
          ☀️
        </Motion.div>
        <Motion.div
          aria-hidden="true"
          animate={{ y: [0, -10, 0], x: [0, 8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className="hidden lg:block absolute top-14 left-1/2 text-4xl opacity-75 select-none pointer-events-none"
        >
          ☁️
        </Motion.div>
        <Motion.div
          aria-hidden="true"
          animate={{ y: [0, -14, 0], rotate: [-6, 8, -6] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
          className="hidden lg:block absolute bottom-12 left-12 text-4xl opacity-85 select-none pointer-events-none"
        >
          🦋
        </Motion.div>
        <Motion.div
          aria-hidden="true"
          animate={{ y: [0, -12, 0], rotate: [-4, 4, -4] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="hidden lg:block absolute top-14 right-8 text-4xl opacity-85 select-none pointer-events-none"
        >
          🎈
        </Motion.div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-10 lg:gap-8 items-center relative z-10">
          {/* AREA TEKS KIRI */}
          <Motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...springPop, duration: 0.6 }}
            className="lg:col-span-6 text-center lg:text-left space-y-6"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-emerald-950 leading-[1.08] tracking-tight">
              Belajar Adalah <br />
              <span className="text-emerald-600">BERPETUALANG</span>
              <Motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 ml-3 align-middle rounded-full border-2 border-emerald-950 bg-amber-300 text-emerald-950 shadow-[2px_2px_0px_#064e3b]"
              >
                <ArrowRight size={22} strokeWidth={2.5} />
              </Motion.span>
            </h1>

            <p className="text-sm sm:text-base text-slate-600 max-w-lg mx-auto lg:mx-0 leading-relaxed font-medium">
              <strong className="text-emerald-900 block mb-1">RA PERSIS 175 AT-TAJDID</strong>
              Mewujudkan generasi bertakwa, cerdas, dan mandiri melalui pendidikan anak usia dini yang holistik. Bersama kami, potensi fitrah anak dikembangkan secara optimal demi mencetak pemimpin masa depan yang berakhlak mulia.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <Motion.a
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                href="https://bit.ly/PendaftaranOnlineRAattajdid"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-extrabold px-6 py-3.5 rounded-xl border-2 border-emerald-950 shadow-[4px_4px_0px_#064e3b] hover:shadow-[2px_2px_0px_#064e3b] transition-colors text-sm sm:text-base"
              >
                Daftar Sekarang
                <span className="w-6 h-6 rounded-full bg-emerald-950 text-white flex items-center justify-center">
                  <ArrowRight size={14} />
                </span>
              </Motion.a>

              <Motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.96 }}>
                <Link
                  to="/galeri"
                  className="inline-flex items-center gap-2 bg-white hover:bg-emerald-50 text-emerald-950 font-bold px-6 py-3.5 rounded-xl border-2 border-emerald-950 shadow-[4px_4px_0px_#0d9488] hover:shadow-[2px_2px_0px_#0d9488] transition-colors text-sm sm:text-base"
                >
                  Jelajahi Galeri
                </Link>
              </Motion.div>
            </div>
          </Motion.div>

          {/* AREA SLIDER KANAN (Arch Layered Frame seperti Referensi) */}
          <Motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ ...springPop, delay: 0.12 }}
            className="lg:col-span-6 relative flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-[340px] sm:max-w-[410px] pt-2 pr-2 pl-6 pb-4">
              {/* Layer Arch Dekoratif di Belakang */}
              <Motion.div
                animate={{ rotate: [-3, -1.5, -3] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="hidden sm:block absolute top-8 left-0 w-44 h-64 rounded-t-full rounded-b-2xl bg-amber-300 border-2 border-emerald-950 pointer-events-none"
              />

              {/* Frame Utama Arch berisi Swiper Slider */}
              <div className="relative z-10 w-full aspect-[4/4.3] rounded-t-[11rem] rounded-b-[2rem] border-2 border-emerald-950 shadow-[8px_8px_0px_#0d9488] overflow-hidden bg-white">
                <Swiper
                  modules={[Navigation, Pagination, Autoplay]}
                  navigation={true}
                  pagination={{ clickable: true }}
                  autoplay={{ delay: 5000, disableOnInteraction: false }}
                  loop={true}
                  onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                  className="w-full h-full hero-swiper"
                >
                  {sliderData.map((item, index) => (
                    <SwiperSlide key={index}>
                      <img src={item.src} alt={item.alt} className="w-full h-full object-cover" />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              {/* Indikator Slide & Lencana Checkmark */}
              <div className="relative z-20 -mt-5 flex items-center justify-between px-2">
                <Motion.div
                  key={activeIndex}
                  initial={{ scale: 0.9, opacity: 0.7 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={springPop}
                  className="bg-teal-200 text-emerald-950 text-xs font-extrabold px-4 py-1.5 rounded-full border-2 border-emerald-950 shadow-[2px_2px_0px_#064e3b]"
                >
                  Kegiatan RA • {activeIndex + 1} / {sliderData.length}
                </Motion.div>
                <Motion.div
                  animate={{ rotate: [0, -8, 8, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, repeatDelay: 2 }}
                  className="w-11 h-11 rounded-full bg-white border-2 border-emerald-950 shadow-[3px_3px_0px_#064e3b] flex items-center justify-center text-emerald-600"
                >
                  <Check size={20} strokeWidth={3} />
                </Motion.div>
              </div>
            </div>
          </Motion.div>
        </div>
      </section>

      {/* ================= 2. DARK HIGHLIGHT BAR (Slider Berjalan) ================= */}
      <section className="bg-emerald-950 text-white py-4 border-y-2 border-emerald-950 overflow-hidden">
        <Swiper
          modules={[Autoplay]}
          slidesPerView="auto"
          spaceBetween={48}
          loop={true}
          speed={4500}
          allowTouchMove={true}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          className="highlight-swiper"
        >
          {highlightSlides.map((item, idx) => {
            const IconComponent = item.Icon;
            return (
              <SwiperSlide key={idx} className="!w-auto">
                <div className="flex items-center gap-2.5 text-emerald-100 text-xs sm:text-sm font-bold tracking-wide whitespace-nowrap py-1">
                  <IconComponent size={18} className={item.iconColor} />
                  <span>{item.label}</span>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </section>

      {/* ================= 3. SELAMAT DATANG & 3 KARTU LAYANAN ================= */}
      <section className="py-20 px-6 bg-white border-b-2 border-emerald-950/10">
        <div className="max-w-6xl mx-auto">
          {/* Header Intro */}
          <Motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={springPop}
            className="text-center max-w-3xl mx-auto space-y-5 mb-14"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-emerald-950 leading-tight">
              Selamat Datang di <br className="hidden sm:block" />
              <span className="text-emerald-600">RA Persis 175 At Tajdid</span>
            </h2>

            <Motion.p
              whileHover={{ scale: 1.03 }}
              className="inline-block bg-teal-100 text-emerald-950 font-extrabold px-5 py-2 rounded-full text-xs sm:text-sm border-2 border-emerald-950 shadow-[3px_3px_0px_#0d9488]"
            >
              "Tempat Tumbuhnya Generasi Sehat, Cerdas, Bahagia & Berakhlak Mulia"
            </Motion.p>

            <div className="text-slate-600 text-sm sm:text-base leading-relaxed space-y-4 font-medium pt-2">
              <p>
                Setiap anak adalah amanah sekaligus anugerah dari Allah yang luar biasa. Kami percaya bahwa setiap anak istimewa dengan potensi luar biasa. Kami hadir sebagai ruang belajar yang aman, menyenangkan, dan penuh kasih sayang, di mana anak-anak dapat tumbuh dan berkembang secara optimal, baik secara kognitif, sosial-emosional, maupun spiritual.
              </p>
              <p>
                Dengan pendekatan <strong className="text-emerald-700">Kurikulum Merdeka</strong> yang dipadukan dengan nilai-nilai keIslaman dan pendidikan berbasis cinta, kami mengajak anak belajar melalui bermain, bereksplorasi dan berinteraksi secara aktif. Setiap kegiatan dirancang untuk menumbuhkan ketauhidan, rasa ingin tahu, kemandirian, serta karakter positif sejak dini.
              </p>
            </div>
          </Motion.div>

          {/* 3 Kartu Menu Bergaya Outlined Pastel dengan Spring Stagger */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* KARTU KONTAK */}
            <Motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ ...springPop, delay: 0 }}
              whileHover={{ y: -6, rotate: -1 }}
              className="flex"
            >
              <Link
                to="/kontak"
                className="w-full bg-teal-200/80 p-7 rounded-2xl border-2 border-emerald-950 shadow-[5px_5px_0px_#064e3b] hover:shadow-[8px_8px_0px_#064e3b] transition-shadow group flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-white border-2 border-emerald-950 shadow-[2px_2px_0px_#064e3b] flex items-center justify-center text-emerald-700 mb-6 group-hover:animate-bounce-slow">
                    <Mail size={24} />
                  </div>
                  <h3 className="font-black text-emerald-950 text-xl mb-2">Kontak Kami</h3>
                  <p className="text-slate-800 text-sm font-medium leading-relaxed">
                    Hubungi admin sekolah untuk informasi pendaftaran, jadwal kunjungan, maupun lokasi RA.
                  </p>
                </div>
                <span className="mt-6 inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-emerald-950">
                  Hubungi Sekarang <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </Motion.div>

            {/* KARTU GALERI */}
            <Motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ ...springPop, delay: 0.1 }}
              whileHover={{ y: -6, rotate: 1 }}
              className="flex"
            >
              <Link
                to="/galeri"
                className="w-full bg-rose-100 p-7 rounded-2xl border-2 border-emerald-950 shadow-[5px_5px_0px_#064e3b] hover:shadow-[8px_8px_0px_#064e3b] transition-shadow group flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-white border-2 border-emerald-950 shadow-[2px_2px_0px_#064e3b] flex items-center justify-center text-rose-600 mb-6 group-hover:animate-bounce-slow">
                    <Images size={24} />
                  </div>
                  <h3 className="font-black text-emerald-950 text-xl mb-2">Galeri Foto</h3>
                  <p className="text-slate-800 text-sm font-medium leading-relaxed">
                    Keceriaan aktivitas ananda saat bermain, belajar, dan berkegiatan kreatif di sekolah.
                  </p>
                </div>
                <span className="mt-6 inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-emerald-950">
                  Lihat Album <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </Motion.div>

            {/* KARTU DOWNLOAD */}
            <Motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ ...springPop, delay: 0.2 }}
              whileHover={{ y: -6, rotate: -1 }}
              className="flex"
            >
              <Link
                to="/download"
                className="w-full bg-amber-300 p-7 rounded-2xl border-2 border-emerald-950 shadow-[5px_5px_0px_#064e3b] hover:shadow-[8px_8px_0px_#064e3b] transition-shadow group flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-white border-2 border-emerald-950 shadow-[2px_2px_0px_#064e3b] flex items-center justify-center text-amber-600 mb-6 group-hover:animate-bounce-slow">
                    <FolderDown size={24} />
                  </div>
                  <h3 className="font-black text-emerald-950 text-xl mb-2">Download</h3>
                  <p className="text-slate-800 text-sm font-medium leading-relaxed">
                    Unduh berkas, panduan administrasi, hingga formulir keperluan sekolah dengan mudah.
                  </p>
                </div>
                <span className="mt-6 inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-emerald-950">
                  Buka Pusat Unduhan <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </Motion.div>
          </div>
        </div>
      </section>

      {/* ================= 4. BAND AMBER: MENGAPA MEMILIH KAMI & KAMI MENGENALKAN ================= */}
      <section className="bg-amber-300 py-20 px-6 border-b-2 border-emerald-950 relative overflow-hidden">
        {/* Ornamen Bintang & Krayon Ceria */}
        <Motion.div
          aria-hidden="true"
          animate={{ rotate: [-8, 8, -8], scale: [1, 1.08, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="hidden lg:block absolute top-8 right-12 text-4xl opacity-85 select-none pointer-events-none"
        >
          ⭐
        </Motion.div>
        <Motion.div
          aria-hidden="true"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
          className="hidden lg:block absolute bottom-8 right-12 text-4xl opacity-85 select-none pointer-events-none"
        >
          🎨
        </Motion.div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-12 items-start relative z-10">
          {/* Kolom Kiri: Foto + Kartu "Kami Mengenalkan" */}
          <Motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={springPop}
            className="lg:col-span-5 space-y-6 relative"
          >
            <div className="relative">
              {/* Pola garis dekoratif putih di belakang foto */}
              <div
                aria-hidden="true"
                className="hidden sm:grid grid-cols-5 gap-3 absolute -top-4 -left-4 w-44 h-44 pointer-events-none opacity-75"
              >
                {Array.from({ length: 20 }).map((_, idx) => (
                  <span key={idx} className="w-4 h-1.5 bg-white rounded-full -rotate-12 block" />
                ))}
              </div>

              <div className="relative z-10 bg-white p-2.5 rounded-3xl border-2 border-emerald-950 shadow-[7px_7px_0px_#064e3b]">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-emerald-50">
                  <img
                    src="/img/potbar.jpeg"
                    alt="Kebersamaan Guru dan Anak RA Persis 175 At Tajdid"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Kartu Poin: Kami Mengenalkan */}
            <div className="bg-white p-7 rounded-2xl border-2 border-emerald-950 shadow-[6px_6px_0px_#064e3b]">
              <h3 className="text-xl font-black text-emerald-950 mb-5 flex items-center gap-2.5">
                <span className="text-2xl inline-block animate-bounce-slow">🌱</span> Kami Mengenalkan:
              </h3>
              <ul className="space-y-3.5">
                {poinMengenalkan.map((item, idx) => (
                  <Motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ ...springPop, delay: idx * 0.08 }}
                    className="flex items-start gap-3"
                  >
                    <span className="w-6 h-6 rounded-full bg-teal-200 border border-emerald-950 text-emerald-950 flex items-center justify-center text-xs font-black shrink-0 mt-0.5">
                      ✓
                    </span>
                    <span className="text-slate-700 font-semibold text-sm sm:text-base leading-relaxed">
                      {item}
                    </span>
                  </Motion.li>
                ))}
              </ul>
            </div>
          </Motion.div>

          {/* Kolom Kanan: Heading "Mengapa Memilih Kami?" + List Stat-Style */}
          <div className="lg:col-span-7 space-y-6">
            <Motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={springPop}
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-emerald-950 leading-tight">
                Mengapa Memilih Kami?
              </h2>
            </Motion.div>

            <div className="divide-y-2 divide-emerald-950/15 bg-amber-200/60 rounded-2xl border-2 border-emerald-950 p-6 sm:p-8 shadow-[6px_6px_0px_#064e3b]">
              {poinMengapaKami.map((poin, i) => (
                <Motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ ...springPop, delay: i * 0.06 }}
                  className="py-3.5 first:pt-0 last:pb-0 flex items-start gap-4 sm:gap-6"
                >
                  <span className="text-2xl sm:text-3xl font-black text-emerald-950 tabular-nums shrink-0 leading-none pt-0.5">
                    0{i + 1}
                  </span>
                  <p className="text-slate-900 font-bold text-sm sm:text-base leading-relaxed">
                    {poin}
                  </p>
                </Motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= 5. KESERUAN KAMI (Alternating Rows + Grid 8 Foto) ================= */}
      <section className="py-20 px-6 bg-teal-50">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={springPop}
            className="text-center max-w-2xl mx-auto mb-16 relative"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-emerald-950 mb-3">
              Keseruan Kami <span className="inline-block animate-wiggle">📸</span>
            </h2>
            <p className="text-slate-600 font-medium text-sm sm:text-base">
              Momen belajar, bermain, beribadah, dan bertumbuh penuh keceriaan setiap hari di RA Persis 175 At-Tajdid.
            </p>
            <Motion.svg
              aria-hidden="true"
              animate={{ y: [0, -6, 0], rotate: [0, 5, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="hidden md:block w-14 h-14 text-teal-600 absolute -right-12 top-2"
              viewBox="0 0 64 64"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <path d="M8 16 C28 6, 40 24, 24 34 C14 40, 20 52, 46 46" />
              <path d="M40 40 L48 46 L41 53" />
            </Motion.svg>
          </Motion.div>

          {/* 3 Baris Zig-Zag Editorial */}
          <div className="space-y-14 mb-20">
            {sorotanKegiatan.map((item, idx) => (
              <Motion.div
                key={idx}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ ...springPop, delay: 0.05 }}
                className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center"
              >
                {/* Kolom Teks */}
                <div
                  className={`lg:col-span-6 space-y-4 ${
                    item.reverse ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <span
                    className={`inline-block ${item.tagColor} text-xs font-extrabold uppercase tracking-wider px-3.5 py-1 rounded-full border-2 border-emerald-950`}
                  >
                    {item.tag}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-emerald-950 leading-snug">
                    {item.judul}
                  </h3>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
                    {item.deskripsi}
                  </p>
                  <div className="pt-2">
                    <Motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} className="inline-block">
                      <Link
                        to={item.ctaTo}
                        className="inline-flex items-center gap-2 bg-white hover:bg-emerald-50 text-emerald-950 font-bold text-xs sm:text-sm px-5 py-2.5 rounded-full border-2 border-emerald-950 shadow-[3px_3px_0px_#064e3b] transition-colors"
                      >
                        {item.ctaLabel}
                        <ArrowRight size={15} />
                      </Link>
                    </Motion.div>
                  </div>
                </div>

                {/* Kolom Foto */}
                <div
                  className={`lg:col-span-6 ${
                    item.reverse ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <Motion.div
                    whileHover={{ y: -4, rotate: item.reverse ? -1 : 1 }}
                    transition={springPop}
                    className={`rounded-2xl border-2 border-emerald-950 bg-white p-2 ${item.frameShadow}`}
                  >
                    <div className="aspect-[16/10] rounded-xl overflow-hidden bg-slate-100">
                      <img
                        src={item.gambar}
                        alt={item.alt}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </Motion.div>
                </div>
              </Motion.div>
            ))}
          </div>

          {/* Grid 8 Foto Utama (Pop-in & Miring Ceria saat Hover) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
            {galeriSingkat.map((imgSrc, idx) => (
              <Motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9, y: 18 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ ...springPop, delay: (idx % 4) * 0.06 }}
                whileHover={{ y: -6, rotate: idx % 2 === 0 ? -2 : 2, scale: 1.03 }}
                className="aspect-square rounded-2xl overflow-hidden border-2 border-emerald-950 bg-white p-1.5 shadow-[4px_4px_0px_#064e3b] group"
              >
                <div className="w-full h-full rounded-xl overflow-hidden relative">
                  <img
                    src={imgSrc}
                    alt={`Kegiatan RA At-Tajdid ${idx + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </Motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.96 }} className="inline-block">
              <Link
                to="/galeri"
                className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-extrabold px-7 py-3.5 rounded-full border-2 border-emerald-950 shadow-[4px_4px_0px_#064e3b] hover:shadow-[2px_2px_0px_#064e3b] transition-colors text-sm sm:text-base"
              >
                Lihat Semua Foto
                <ArrowRight size={18} />
              </Link>
            </Motion.div>
          </div>
        </div>
      </section>

      {/* ================= 6. BAND TEAL: FILOSOFI & KOMITMEN ================= */}
      <section className="bg-teal-600 text-white py-20 px-6 border-y-2 border-emerald-950 relative overflow-hidden">
        <Motion.div
          aria-hidden="true"
          animate={{ y: [0, -10, 0], rotate: [-5, 5, -5] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
          className="hidden lg:block absolute top-10 left-10 text-4xl opacity-80 select-none pointer-events-none"
        >
          ✨
        </Motion.div>
        <Motion.div
          aria-hidden="true"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="hidden lg:block absolute bottom-10 right-10 text-4xl opacity-80 select-none pointer-events-none"
        >
          💛
        </Motion.div>

        <div className="max-w-5xl mx-auto relative z-10">
          <Motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={springPop}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Komitmen & Harapan Kami
            </h2>
          </Motion.div>

          <div className="grid md:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Foto Berbingkai di Kiri */}
            <Motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={springPop}
              whileHover={{ rotate: -1.5, scale: 1.02 }}
              className="md:col-span-5 flex justify-center"
            >
              <div className="bg-white p-2.5 rounded-3xl border-2 border-emerald-950 shadow-[7px_7px_0px_#fbbf24] max-w-xs w-full">
                <div className="aspect-[4/4.3] rounded-2xl overflow-hidden bg-teal-50">
                  <img
                    src="/img/guru.png"
                    alt="Guru dan Pengelola RA Persis 175 At-Tajdid"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </Motion.div>

            {/* Kutipan & Penjelasan di Kanan */}
            <Motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ ...springPop, delay: 0.1 }}
              className="md:col-span-7 space-y-5"
            >
              <blockquote className="text-lg sm:text-xl font-bold leading-relaxed text-white">
                "Kami tidak hanya mendidik anak untuk menjadi pintar, tetapi juga membimbing mereka menjadi pribadi yang beriman, berilmu, berakhlak, percaya diri, mandiri dan siap menghadapi masa depan."
              </blockquote>

              <p className="text-xl sm:text-2xl font-black text-amber-300">
                💛 Bersama kami, anak belajar dengan bahagia, tumbuh dengan cinta.
              </p>

              <div className="space-y-3 text-teal-50 text-sm sm:text-base leading-relaxed font-medium">
                <p>
                  Mari bergabung dan menjadi bagian dari keluarga besar RA Persis 175 At Tajdid. Kami berkomitmen mendampingi tumbuh kembang si kecil dengan penuh kasih sayang, kesabaran, dan nilai-nilai kebaikan.
                </p>
                <p>
                  Di sini, anak-anak belajar melalui bermain, tertawa, dan bereksplorasi dalam suasana yang nyaman dan menyenangkan. Belajar tidak harus kaku, karena dengan hati yang bahagia, anak akan lebih mudah menyerap ilmu dan tumbuh menjadi pribadi yang percaya diri. Kami ingin setiap langkah kecil ananda di sini menjadi bagian dari perjalanan besar mereka di masa depan.
                </p>
              </div>
            </Motion.div>
          </div>
        </div>
      </section>

      {/* ================= 7. BAND ROSE SOFT: AJAKAN PENDAFTARAN ================= */}
      <section className="bg-rose-100 py-16 px-6">
        <Motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={springPop}
          className="max-w-5xl mx-auto grid md:grid-cols-12 gap-8 items-center"
        >
          <div className="md:col-span-7 space-y-4">
            <h2 className="text-2xl sm:text-4xl font-black text-emerald-950 leading-tight">
              💛 Yuk, Ayah Bunda… temani tumbuh kembang si kecil bersama kami.
            </h2>
            <p className="inline-block bg-white text-emerald-950 font-extrabold px-5 py-2.5 rounded-full border-2 border-emerald-950 shadow-[3px_3px_0px_#064e3b] text-xs sm:text-sm">
              “Belajar dengan Ceria, Tumbuh dalam Cinta, Berakhlak Mulia” — RA At-Tajdid
            </p>
          </div>

          <div className="md:col-span-5 bg-white p-6 sm:p-7 rounded-2xl border-2 border-emerald-950 shadow-[6px_6px_0px_#064e3b] space-y-4">
            <p className="text-sm font-bold text-slate-700 leading-relaxed">
              Pendaftaran peserta didik baru terbuka untuk anak usia 4–6 tahun. Daftar online sekarang atau hubungi admin sekolah.
            </p>
            <div className="flex flex-col sm:flex-row md:flex-col gap-3">
              <Motion.a
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.96 }}
                href="https://bit.ly/PendaftaranOnlineRAattajdid"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-rose-500 hover:bg-rose-600 text-white font-black px-6 py-3.5 rounded-xl border-2 border-emerald-950 shadow-[4px_4px_0px_#064e3b] hover:shadow-[2px_2px_0px_#064e3b] transition-colors text-sm sm:text-base"
              >
                Daftar Sekarang 🚀
                <ArrowUpRight size={18} />
              </Motion.a>
              <div className="grid grid-cols-2 gap-3">
                <Link
                  to="/kontak"
                  className="inline-flex items-center justify-center bg-teal-100 hover:bg-teal-200 text-emerald-950 font-bold py-2.5 px-3 rounded-xl border-2 border-emerald-950 text-xs sm:text-sm transition-colors"
                >
                  Kontak Kami
                </Link>
                <Link
                  to="/saran"
                  className="inline-flex items-center justify-center bg-amber-200 hover:bg-amber-300 text-emerald-950 font-bold py-2.5 px-3 rounded-xl border-2 border-emerald-950 text-xs sm:text-sm transition-colors"
                >
                  Kotak Saran
                </Link>
              </div>
            </div>
          </div>
        </Motion.div>
      </section>

      {/* Custom Styling Swiper Hero & Highlight Bar */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .highlight-swiper .swiper-wrapper {
              transition-timing-function: linear !important;
            }
            .hero-swiper { --swiper-navigation-color: #064e3b; --swiper-pagination-color: #fbbf24; }
            .hero-swiper .swiper-button-next,
            .hero-swiper .swiper-button-prev {
              background: #ffffff;
              border: 2px solid #022c22;
              width: 36px;
              height: 36px;
              border-radius: 50%;
              box-shadow: 2px 2px 0px #064e3b;
              opacity: 0.9;
              transition: 0.2s;
            }
            .hero-swiper .swiper-button-next::after,
            .hero-swiper .swiper-button-prev::after {
              font-size: 14px;
              font-weight: 900;
            }
          `,
        }}
      />
    </div>
  );
}

export default Home;
