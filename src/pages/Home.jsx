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
  HeartHandshake,
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
  { label: 'Pembelajaran Mendalam', Icon: BookOpen, iconColor: 'text-teal-300' },
  { label: 'Kurikulum Berbasis Cinta', Icon: HeartHandshake, iconColor: 'text-rose-300' },
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
    tag: 'Pembelajaran Mendalam',
    tagColor: 'bg-teal-200 text-emerald-950',
    frameShadow: 'shadow-[8px_8px_0px_#0d9488]',
    judul: 'Belajar Melalui Bermain & Eksplorasi Aktif',
    deskripsi:
      'Setiap kegiatan dirancang untuk menumbuhkan rasa ingin tahu, kreativitas, serta perkembangan kognitif dan sosial-emosional anak secara menyenangkan.',
    gambar: '/img/diskusi.jpeg',
    alt: 'Kegiatan diskusi dan belajar bersama di RA At-Tajdid',
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
  return (
    <div className="bg-teal-50 min-h-screen font-sans text-slate-800 overflow-x-hidden">
      {/* ================= 1. HERO SECTION ================= */}
      <section className="relative pt-6 pb-12 sm:pt-10 sm:pb-16 lg:pt-16 lg:pb-24 px-4 sm:px-6 bg-gradient-to-b from-teal-50 via-emerald-50/60 to-teal-50 overflow-hidden">
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

        <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-6 lg:gap-8 items-center relative z-10">
          {/* AREA TEKS KIRI */}
          <Motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...springPop, duration: 0.6 }}
            className="lg:col-span-6 text-center lg:text-left space-y-3.5 sm:space-y-6"
          >
            {/* Badge Nama Sekolah */}
            <div>
              <span className="inline-flex items-center gap-1.5 bg-amber-300 text-emerald-950 font-black px-3.5 py-1 rounded-full border-2 border-emerald-950 shadow-[2px_2px_0px_#064e3b] text-[11px] sm:text-xs uppercase tracking-wider">
                <span>⭐</span> RA PERSIS 175 AT-TAJDID
              </span>
            </div>

            <h1 className="text-2xl xs:text-3xl sm:text-5xl lg:text-6xl font-black text-emerald-950 leading-[1.15] sm:leading-[1.08] tracking-tight">
              Belajar Adalah <br />
              <span className="text-emerald-600 inline-flex items-center justify-center lg:justify-start gap-1.5 sm:gap-3">
                <span>BERPETUALANG</span>
                <Motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                  className="inline-flex items-center justify-center w-7 h-7 sm:w-11 sm:h-11 rounded-full border-2 border-emerald-950 bg-amber-300 text-emerald-950 shadow-[2px_2px_0px_#064e3b] shrink-0 align-middle"
                >
                  <ArrowRight size={14} className="sm:hidden" strokeWidth={2.5} />
                  <ArrowRight size={22} className="hidden sm:block" strokeWidth={2.5} />
                </Motion.span>
              </span>
            </h1>

            <p className="text-xs sm:text-base text-slate-600 max-w-lg mx-auto lg:mx-0 leading-relaxed font-medium px-1 sm:px-0">
              Mewujudkan generasi bertakwa, cerdas, dan mandiri melalui pendidikan anak usia dini yang holistik. Bersama kami, potensi fitrah anak dikembangkan secara optimal demi mencetak pemimpin masa depan yang berakhlak mulia.
            </p>
          </Motion.div>

          {/* AREA SLIDER KANAN (Arch Layered Frame Responsif) */}
          <Motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ ...springPop, delay: 0.12 }}
            className="lg:col-span-6 relative flex justify-center lg:justify-end w-full mt-2 sm:mt-0"
          >
            <div className="relative w-full max-w-[270px] xs:max-w-[300px] sm:max-w-[410px] mx-auto lg:mr-0 pt-2 pb-3 px-2 sm:pl-6 sm:pr-2">
              {/* Layer Arch Dekoratif di Belakang */}
              <Motion.div
                animate={{ rotate: [-3, -1.5, -3] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="hidden sm:block absolute top-8 left-0 w-44 h-64 rounded-t-full rounded-b-2xl bg-amber-300 border-2 border-emerald-950 pointer-events-none"
              />

              {/* Frame Utama Arch berisi Swiper Slider */}
              <div className="relative z-10 w-full aspect-[4/4.3] rounded-t-[6.5rem] sm:rounded-t-[11rem] rounded-b-[1.5rem] sm:rounded-b-[2rem] border-2 border-emerald-950 shadow-[5px_5px_0px_#0d9488] sm:shadow-[8px_8px_0px_#0d9488] overflow-hidden bg-white">
                <Swiper
                  modules={[Navigation, Pagination, Autoplay]}
                  navigation={true}
                  pagination={{ clickable: true }}
                  autoplay={{ delay: 5000, disableOnInteraction: false }}
                  loop={true}
                  className="w-full h-full hero-swiper"
                >
                  {sliderData.map((item, index) => (
                    <SwiperSlide key={index}>
                      <img src={item.src} alt={item.alt} className="w-full h-full object-cover" />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </Motion.div>
        </div>
      </section>

      {/* ================= 2. DARK HIGHLIGHT BAR (Slider Berjalan) ================= */}
      <section className="bg-emerald-950 text-white py-3.5 sm:py-4 border-y-2 border-emerald-950 overflow-hidden">
        <Swiper
          modules={[Autoplay]}
          slidesPerView="auto"
          spaceBetween={28}
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
                <div className="flex items-center gap-2 text-emerald-100 text-xs sm:text-sm font-bold tracking-wide whitespace-nowrap py-1">
                  <IconComponent size={16} className={`${item.iconColor} sm:w-[18px] sm:h-[18px]`} />
                  <span>{item.label}</span>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </section>

      {/* ================= 3. SELAMAT DATANG & 3 KARTU LAYANAN ================= */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 bg-white border-b-2 border-emerald-950/10">
        <div className="max-w-6xl mx-auto">
          {/* Header Intro */}
          <Motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={springPop}
            className="text-center max-w-3xl mx-auto space-y-4 sm:space-y-5 mb-10 sm:mb-14"
          >
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-emerald-950 leading-tight">
              Selamat Datang di <br className="hidden sm:block" />
              <span className="text-emerald-600">RA Persis 175 At Tajdid</span>
            </h2>

            <Motion.p
              whileHover={{ scale: 1.02 }}
              className="inline-block max-w-full bg-teal-100 text-emerald-950 font-extrabold px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm border-2 border-emerald-950 shadow-[2px_2px_0px_#0d9488] sm:shadow-[3px_3px_0px_#0d9488] leading-normal"
            >
              "Tempat Tumbuhnya Generasi Sehat, Cerdas, Bahagia & Berakhlak Mulia"
            </Motion.p>

            <div className="text-slate-600 text-sm sm:text-base leading-relaxed space-y-3 sm:space-y-4 font-medium pt-1 sm:pt-2">
              <p>
                Setiap anak adalah amanah sekaligus anugerah dari Allah yang luar biasa. Kami percaya bahwa setiap anak istimewa dengan potensi luar biasa. Kami hadir sebagai ruang belajar yang aman, menyenangkan, dan penuh kasih sayang, di mana anak-anak dapat tumbuh dan berkembang secara optimal, baik secara kognitif, sosial-emosional, maupun spiritual.
              </p>
              <p>
                Dengan pendekatan <strong className="text-emerald-700">pembelajaran mendalam</strong> yang dipadukan dengan nilai-nilai keIslaman dan <strong className="text-emerald-700">kurikulum berbasis cinta</strong>, kami mengajak anak belajar melalui bermain, bereksplorasi dan berinteraksi secara aktif. Setiap kegiatan dirancang untuk menumbuhkan ketauhidan, rasa ingin tahu, kemandirian, serta karakter positif sejak dini.
              </p>
            </div>
          </Motion.div>
        </div>
      </section>

      {/* ================= 4. BAND AMBER: MENGAPA MEMILIH KAMI & KAMI MENGENALKAN ================= */}
      <section className="bg-amber-300 py-12 sm:py-20 px-4 sm:px-6 border-b-2 border-emerald-950 relative overflow-hidden">
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

        <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-8 lg:gap-12 items-start relative z-10">
          {/* Kolom Kiri: Foto + Kartu "Kami Mengenalkan" */}
          <Motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={springPop}
            className="lg:col-span-5 space-y-5 sm:space-y-6 relative w-full"
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

              <div className="relative z-10 bg-white p-2 sm:p-2.5 rounded-2xl sm:rounded-3xl border-2 border-emerald-950 shadow-[5px_5px_0px_#064e3b] sm:shadow-[7px_7px_0px_#064e3b]">
                <div className="aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden bg-emerald-50">
                  <img
                    src="/img/potbar.jpeg"
                    alt="Kebersamaan Guru dan Anak RA Persis 175 At Tajdid"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Kartu Poin: Kami Mengenalkan */}
            <div className="bg-white p-5 sm:p-7 rounded-2xl border-2 border-emerald-950 shadow-[4px_4px_0px_#064e3b] sm:shadow-[6px_6px_0px_#064e3b]">
              <h3 className="text-lg sm:text-xl font-black text-emerald-950 mb-4 sm:mb-5 flex items-center gap-2 sm:gap-2.5">
                <span className="text-xl sm:text-2xl inline-block animate-bounce-slow">🌱</span> Kami Mengenalkan:
              </h3>
              <ul className="space-y-3 sm:space-y-3.5">
                {poinMengenalkan.map((item, idx) => (
                  <Motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ ...springPop, delay: idx * 0.08 }}
                    className="flex items-start gap-2.5 sm:gap-3"
                  >
                    <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-teal-200 border border-emerald-950 text-emerald-950 flex items-center justify-center text-xs font-black shrink-0 mt-0.5">
                      ✓
                    </span>
                    <span className="text-slate-700 font-semibold text-xs sm:text-sm md:text-base leading-relaxed">
                      {item}
                    </span>
                  </Motion.li>
                ))}
              </ul>
            </div>
          </Motion.div>

          {/* Kolom Kanan: Heading "Mengapa Memilih Kami?" + List Stat-Style */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6 w-full">
            <Motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={springPop}
            >
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-emerald-950 leading-tight">
                Mengapa Memilih Kami?
              </h2>
            </Motion.div>

            <div className="divide-y-2 divide-emerald-950/15 bg-amber-200/60 rounded-2xl border-2 border-emerald-950 p-4 sm:p-7 shadow-[4px_4px_0px_#064e3b] sm:shadow-[6px_6px_0px_#064e3b]">
              {poinMengapaKami.map((poin, i) => (
                <Motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ ...springPop, delay: i * 0.06 }}
                  className="py-3 sm:py-3.5 first:pt-0 last:pb-0 flex items-start gap-3 sm:gap-5"
                >
                  <span className="text-xl sm:text-3xl font-black text-emerald-950 tabular-nums shrink-0 leading-none pt-0.5">
                    0{i + 1}
                  </span>
                  <p className="text-slate-900 font-bold text-xs sm:text-sm md:text-base leading-relaxed">
                    {poin}
                  </p>
                </Motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= 5. KESERUAN KAMI (Alternating Rows + Grid 8 Foto) ================= */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 bg-teal-50">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={springPop}
            className="text-center max-w-2xl mx-auto mb-10 sm:mb-16 relative"
          >
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-emerald-950 mb-2 sm:mb-3">
              Keseruan Kami <span className="inline-block animate-wiggle">📸</span>
            </h2>
            <p className="text-slate-600 font-medium text-xs sm:text-sm md:text-base">
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
          <div className="space-y-10 sm:space-y-14 mb-12 sm:mb-20">
            {sorotanKegiatan.map((item, idx) => (
              <Motion.div
                key={idx}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ ...springPop, delay: 0.05 }}
                className="grid lg:grid-cols-12 gap-5 sm:gap-8 lg:gap-12 items-center"
              >
                {/* Kolom Teks */}
                <div
                  className={`lg:col-span-6 space-y-3 sm:space-y-4 ${
                    item.reverse ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <span
                    className={`inline-block ${item.tagColor} text-[11px] sm:text-xs font-extrabold uppercase tracking-wider px-3 sm:px-3.5 py-1 rounded-full border-2 border-emerald-950`}
                  >
                    {item.tag}
                  </span>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-emerald-950 leading-snug">
                    {item.judul}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm md:text-base leading-relaxed font-medium">
                    {item.deskripsi}
                  </p>
                </div>

                {/* Kolom Foto */}
                <div
                  className={`lg:col-span-6 ${
                    item.reverse ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <Motion.div
                    whileHover={{ y: -3, rotate: item.reverse ? -1 : 1 }}
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

          {/* Grid 8 Foto Utama */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
            {galeriSingkat.map((imgSrc, idx) => (
              <Motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9, y: 18 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ ...springPop, delay: (idx % 4) * 0.06 }}
                whileHover={{ y: -4, rotate: idx % 2 === 0 ? -2 : 2, scale: 1.03 }}
                className="aspect-square rounded-2xl overflow-hidden border-2 border-emerald-950 bg-white p-1 sm:p-1.5 shadow-[3px_3px_0px_#064e3b] sm:shadow-[4px_4px_0px_#064e3b] group"
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

          <div className="text-center mt-8 sm:mt-12">
            <Motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.96 }} className="inline-block w-full sm:w-auto">
              <Link
                to="/galeri"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-extrabold px-6 sm:px-7 py-3 sm:py-3.5 rounded-full border-2 border-emerald-950 shadow-[3px_3px_0px_#064e3b] sm:shadow-[4px_4px_0px_#064e3b] hover:shadow-[2px_2px_0px_#064e3b] transition-colors text-xs sm:text-base text-center"
              >
                Lihat Semua Foto
                <ArrowRight size={17} />
              </Link>
            </Motion.div>
          </div>
        </div>
      </section>

      {/* ================= 6. BAND TEAL: FILOSOFI & KOMITMEN ================= */}
      <section className="bg-teal-600 text-white py-12 sm:py-20 px-4 sm:px-6 border-y-2 border-emerald-950 relative overflow-hidden">
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
            className="text-center mb-8 sm:mb-12"
          >
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Komitmen & Harapan Kami
            </h2>
          </Motion.div>

          <div className="grid md:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center">
            {/* Foto Berbingkai di Kiri */}
            <Motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={springPop}
              whileHover={{ rotate: -1.5, scale: 1.02 }}
              className="md:col-span-5 flex justify-center w-full"
            >
              <div className="bg-white p-2 sm:p-2.5 rounded-2xl sm:rounded-3xl border-2 border-emerald-950 shadow-[5px_5px_0px_#fbbf24] sm:shadow-[7px_7px_0px_#fbbf24] max-w-xs w-full">
                <div className="aspect-[4/4.3] rounded-xl sm:rounded-2xl overflow-hidden bg-teal-50">
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
              className="md:col-span-7 space-y-4 sm:space-y-5"
            >
              <blockquote className="text-base sm:text-xl font-bold leading-relaxed text-white">
                "Kami tidak hanya mendidik anak untuk menjadi pintar, tetapi juga membimbing mereka menjadi pribadi yang beriman, berilmu, berakhlak, percaya diri, mandiri dan siap menghadapi masa depan."
              </blockquote>

              <p className="text-lg sm:text-2xl font-black text-amber-300">
                💛 Bersama kami, anak belajar dengan bahagia, tumbuh dengan cinta.
              </p>

              <div className="space-y-3 text-teal-50 text-xs sm:text-sm md:text-base leading-relaxed font-medium">
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
      <section className="bg-rose-100 py-10 sm:py-16 px-4 sm:px-6">
        <Motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={springPop}
          className="max-w-5xl mx-auto grid md:grid-cols-12 gap-6 sm:gap-8 items-center"
        >
          <div className="md:col-span-7 space-y-3 sm:space-y-4">
            <h2 className="text-xl sm:text-3xl md:text-4xl font-black text-emerald-950 leading-tight">
              💛 Yuk, Ayah Bunda… temani tumbuh kembang si kecil bersama kami.
            </h2>
            <p className="inline-block max-w-full bg-white text-emerald-950 font-extrabold px-4 sm:px-5 py-2 sm:py-2.5 rounded-full border-2 border-emerald-950 shadow-[2px_2px_0px_#064e3b] sm:shadow-[3px_3px_0px_#064e3b] text-xs sm:text-sm leading-normal">
              “Belajar dengan Ceria, Tumbuh dalam Cinta, Berakhlak Mulia” — RA At-Tajdid
            </p>
          </div>

          <div className="md:col-span-5 bg-white p-5 sm:p-7 rounded-2xl border-2 border-emerald-950 shadow-[5px_5px_0px_#064e3b] sm:shadow-[6px_6px_0px_#064e3b] space-y-4">
            <p className="text-xs sm:text-sm font-bold text-slate-700 leading-relaxed">
              Pendaftaran peserta didik baru terbuka untuk anak usia 4–6 tahun. Daftar online sekarang atau hubungi admin sekolah.
            </p>
            <div className="flex flex-col gap-3">
              {/* Tombol Aksi Utama (Dipindahkan dari Hero ke CTA Bawah) */}
              <div className="flex flex-col sm:flex-row gap-2.5">
                <Motion.a
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  href="https://bit.ly/PendaftaranOnlineRAattajdid"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-black px-4 py-3 rounded-xl border-2 border-emerald-950 shadow-[3px_3px_0px_#064e3b] transition-all text-xs sm:text-sm text-center"
                >
                  <span>Daftar Sekarang</span>
                  <ArrowUpRight size={16} />
                </Motion.a>

                <Link
                  to="/galeri"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 bg-white hover:bg-emerald-50 text-emerald-950 font-extrabold px-4 py-3 rounded-xl border-2 border-emerald-950 shadow-[3px_3px_0px_#064e3b] transition-all text-xs sm:text-sm text-center"
                >
                  Jelajahi Galeri
                </Link>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <Link
                  to="/kontak"
                  className="inline-flex items-center justify-center bg-teal-100 hover:bg-teal-200 text-emerald-950 font-bold py-2.5 px-3 rounded-xl border-2 border-emerald-950 text-xs transition-colors text-center shadow-[2px_2px_0px_#064e3b]"
                >
                  Kontak Kami
                </Link>
                <Link
                  to="/saran"
                  className="inline-flex items-center justify-center bg-amber-200 hover:bg-amber-300 text-emerald-950 font-bold py-2.5 px-3 rounded-xl border-2 border-emerald-950 text-xs transition-colors text-center shadow-[2px_2px_0px_#064e3b]"
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
