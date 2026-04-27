import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronRight, 
  Folder, 
  FolderOpen, 
  FileText, 
  User, 
  GraduationCap, 
  Briefcase, 
  Brain, 
  Phone,
  Search,
  Maximize2,
  Minimize2
} from 'lucide-react';

// ==========================================
// 1. DATA MOCK (Struktur Hierarki)
// ==========================================
const biodataData = [
  {
    id: 'pribadi',
    label: 'Data Pribadi',
    icon: <User size={18} />,
    children: [
      { id: 'p1', label: 'Nama Lengkap: Bunda Aisyah S.Pd' },
      { id: 'p2', label: 'Tanggal Lahir: 17 Agustus 1990' },
      { id: 'p3', label: 'Alamat: Jl. Pendidikan No. 1, Bandung' },
      { id: 'p4', label: 'Status: Menikah' }
    ]
  },
  {
    id: 'pendidikan',
    label: 'Pendidikan',
    icon: <GraduationCap size={18} />,
    children: [
      { id: 'edu1', label: 'SD Negeri 1 Bandung (1997 - 2003)' },
      { id: 'edu2', label: 'SMP Negeri 5 Bandung (2003 - 2006)' },
      { id: 'edu3', label: 'SMA Negeri 3 Bandung (2006 - 2009)' },
      { id: 'edu4', label: 'S1 PGPAUD Universitas Pendidikan Indonesia (2009 - 2013)' }
    ]
  },
  {
    id: 'pengalaman',
    label: 'Pengalaman',
    icon: <Briefcase size={18} />,
    children: [
      { id: 'exp1', label: 'Guru Pendamping TK Ceria (2013 - 2015)' },
      { id: 'exp2', label: 'Wali Kelas RA At-Tajdied (2015 - Sekarang)' },
      { id: 'exp3', label: 'Koordinator Kurikulum PAUD (2020 - Sekarang)' }
    ]
  },
  {
    id: 'skill',
    label: 'Skill',
    icon: <Brain size={18} />,
    children: [
      { 
        id: 'hardskill', 
        label: 'Hard Skill',
        children: [
          { id: 'hs1', label: 'Penyusunan RPPH & RPPM' },
          { id: 'hs2', label: 'Bermain Musik (Piano & Gitar)' },
          { id: 'hs3', label: 'Desain Grafis Dasar (Canva)' }
        ]
      },
      { 
        id: 'softskill', 
        label: 'Soft Skill',
        children: [
          { id: 'ss1', label: 'Komunikasi Anak Usia Dini' },
          { id: 'ss2', label: 'Problem Solving' },
          { id: 'ss3', label: 'Storytelling & Puppet Show' }
        ]
      }
    ]
  },
  {
    id: 'kontak',
    label: 'Kontak',
    icon: <Phone size={18} />,
    children: [
      { id: 'c1', label: 'Email: aisyah.pendidik@gmail.com' },
      { id: 'c2', label: 'WhatsApp: +62 812-3456-7890' },
      { id: 'c3', label: 'Instagram: @aisyah.story' }
    ]
  }
];

// ==========================================
// 2. KOMPONEN: Profile Header
// ==========================================
const ProfileHeader = () => (
  <div className="flex items-center gap-5 p-6 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-t-2xl z-10 relative">
    <div className="relative">
      <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/50 border-2 border-emerald-500 overflow-hidden flex items-center justify-center">
        <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Aisyah&backgroundColor=d1fae5" alt="Avatar" className="w-full h-full object-cover" />
      </div>
      <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white dark:border-slate-900 rounded-full"></div>
    </div>
    <div>
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 leading-tight">Bunda Aisyah, S.Pd</h2>
      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Wali Kelas Kelompok B</p>
      <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
        Aktif Mengajar
      </div>
    </div>
  </div>
);

// ==========================================
// 3. KOMPONEN: Tree Node (Recursive)
// ==========================================
const TreeNode = ({ node, level = 0, searchQuery, expandAll }) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = node.children && node.children.length > 0;

  // Efek untuk otomatis membuka node jika mode expandAll aktif atau sedang mencari
  useEffect(() => {
    if (expandAll || searchQuery.length > 0) setIsOpen(true);
    else setIsOpen(false);
  }, [expandAll, searchQuery]);

  // Fungsi Highlight Text
  const highlightText = (text, query) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, index) => 
      part.toLowerCase() === query.toLowerCase() ? 
        <mark key={index} className="bg-amber-200 dark:bg-amber-500/40 text-slate-900 dark:text-slate-100 rounded-sm px-0.5">{part}</mark> : part
    );
  };

  // Cek apakah node cocok dengan pencarian
  const isMatch = searchQuery && node.label.toLowerCase().includes(searchQuery.toLowerCase());

  return (
    <div className="select-none">
      <motion.div 
        onClick={() => hasChildren && setIsOpen(!isOpen)}
        className={`flex items-center gap-2 py-1.5 px-2 rounded-lg cursor-pointer transition-colors
          ${hasChildren ? 'hover:bg-slate-100 dark:hover:bg-slate-800/50' : 'hover:bg-transparent'}
          ${isMatch ? 'bg-emerald-50 dark:bg-emerald-900/20' : ''}
        `}
        style={{ paddingLeft: `${level * 16 + 8}px` }}
        whileHover={hasChildren ? { x: 2 } : {}}
      >
        {/* Ikon Expand/Collapse */}
        <div className="w-4 h-4 flex items-center justify-center text-slate-400">
          {hasChildren && (
            <motion.div animate={{ rotate: isOpen ? 90 : 0 }} transition={{ duration: 0.2 }}>
              <ChevronRight size={16} />
            </motion.div>
          )}
        </div>

        {/* Ikon Node (Folder/File) */}
        <div className={`text-slate-500 dark:text-slate-400 ${hasChildren ? 'text-emerald-600 dark:text-emerald-400' : ''}`}>
          {node.icon ? node.icon : (hasChildren ? (isOpen ? <FolderOpen size={16}/> : <Folder size={16}/>) : <FileText size={16} className="text-slate-400 opacity-70"/>)}
        </div>

        {/* Label Node */}
        <span className={`text-sm tracking-wide ${hasChildren ? 'font-semibold text-slate-700 dark:text-slate-200' : 'text-slate-600 dark:text-slate-400'}`}>
          {highlightText(node.label, searchQuery)}
        </span>
      </motion.div>

      {/* Children Node Rendering dengan Framer Motion */}
      <AnimatePresence initial={false}>
        {hasChildren && isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden relative"
          >
            {/* Garis Konektor Hierarki */}
            <div 
              className="absolute left-0 top-0 bottom-0 w-px bg-slate-200 dark:bg-slate-700/60" 
              style={{ marginLeft: `${level * 16 + 15}px` }}
            ></div>
            
            <div className="py-1">
              {node.children.map((child) => (
                <TreeNode 
                  key={child.id} 
                  node={child} 
                  level={level + 1} 
                  searchQuery={searchQuery}
                  expandAll={expandAll}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ==========================================
// 4. KOMPONEN UTAMA: BiodataTree
// ==========================================
export default function BiodataTree() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandAll, setExpandAll] = useState(false);

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 flex items-center justify-center p-6 font-sans">
      
      {/* Container Utama */}
      <div className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] border border-slate-200/60 dark:border-slate-800 flex flex-col">
        
        {/* Header Profil */}
        <ProfileHeader />

        {/* Toolbar Interaksi (Search & Expand) */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-800/60 flex items-center justify-between gap-4 bg-slate-50/50 dark:bg-slate-900/50 z-0">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Cari pengalaman, skill, dsb..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 text-slate-700 dark:text-slate-200 transition-shadow"
            />
          </div>
          <button 
            onClick={() => setExpandAll(!expandAll)}
            className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-emerald-600 transition-colors"
            title={expandAll ? "Collapse All" : "Expand All"}
          >
            {expandAll ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
            <span className="hidden sm:inline font-medium">{expandAll ? 'Tutup Semua' : 'Buka Semua'}</span>
          </button>
        </div>

        {/* Area Render Tree Explorer */}
        <div className="p-4 overflow-y-auto max-h-[500px] custom-scrollbar">
          {biodataData.map((node) => (
            <TreeNode 
              key={node.id} 
              node={node} 
              searchQuery={searchQuery} 
              expandAll={expandAll} 
            />
          ))}
        </div>
        
      </div>
    </div>
  );
}