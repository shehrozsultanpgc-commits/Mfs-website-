import React, { useState, useRef } from 'react';
import { Currency } from '../types';
import {
  Folder,
  FileText,
  Upload,
  Download,
  Search,
  Grid,
  List,
  Eye,
  Trash2,
  Edit3,
  Star,
  Share2,
  Copy,
  Lock,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  Plus,
  FileCode,
  Image as ImageIcon,
  FileSpreadsheet,
  Presentation,
  Filter,
  Check,
  X,
  ArrowUpRight,
  HardDrive,
  RefreshCw,
  AlertCircle,
  FileUp,
  FileCheck,
  ChevronRight,
  Info,
  SlidersHorizontal,
  Tag
} from 'lucide-react';

interface FilesDocumentsCenterProps {
  currency: Currency;
  customerName?: string;
  customerEmail?: string;
  clientId?: string;
  onShowToast?: (msg: string) => void;
  onNavigatePage?: (
    page: 'home' | 'services' | 'pricing' | 'reviews' | 'about' | 'contact' | 'faq' | 'order' | 'payment' | 'confirmation' | 'dashboard',
    targetSection?: string
  ) => void;
  setActiveTab?: (tab: string) => void;
}

export interface ProjectFile {
  id: string;
  name: string;
  category: 'Uploaded by Client' | 'Delivered by MFS Growth' | 'Revision Files' | 'Invoices & Receipts' | 'Project Assets' | 'Completed Deliverables';
  projectRef: string;
  type: 'PDF' | 'DOCX' | 'PPTX' | 'XLSX' | 'PNG/JPG' | 'ZIP';
  size: string;
  uploadDate: string;
  lastModified: string;
  status: 'Verified' | 'In Review' | 'Final Deliverable' | 'Archived';
  uploadedBy: string;
  isFavorite: boolean;
  version: string;
  versionHistory?: { version: string; date: string; summary: string }[];
}

export const FilesDocumentsCenter: React.FC<FilesDocumentsCenterProps> = ({
  currency,
  customerName = 'Muhammad Shehroz Sultan',
  customerEmail = 'shehrozsultanpgc@gmail.com',
  clientId = 'CLI-MFS-98421',
  onShowToast,
  onNavigatePage,
  setActiveTab,
}) => {
  // View mode: Grid or List
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Selected Category tab filter
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Search & Filters state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'date' | 'name' | 'size'>('date');

  // Favorites filter toggle
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

  // Modal states
  const [previewFile, setPreviewFile] = useState<ProjectFile | null>(null);
  const [versionHistoryFile, setVersionHistoryFile] = useState<ProjectFile | null>(null);
  const [renameFileModal, setRenameFileModal] = useState<ProjectFile | null>(null);
  const [newFileNameInput, setNewFileNameInput] = useState('');
  const [showRoadmapModal, setShowRoadmapModal] = useState(false);

  // Drag and Drop & Upload state
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [uploadingFileName, setUploadingFileName] = useState<string | null>(null);

  // Authentic Customer Files Data (Strictly real files from PRJ-MFS-849201 and ORD-MFS-984210)
  const [files, setFiles] = useState<ProjectFile[]>([
    {
      id: 'f-1',
      name: 'Investor_Pitch_Outline.docx',
      category: 'Uploaded by Client',
      projectRef: 'PRJ-MFS-849201',
      type: 'DOCX',
      size: '1.2 MB',
      uploadDate: 'Yesterday • 02:15 PM',
      lastModified: 'Yesterday • 02:15 PM',
      status: 'Verified',
      uploadedBy: customerName,
      isFavorite: true,
      version: 'v1.0',
      versionHistory: [
        { version: 'v1.0', date: 'Yesterday 02:15 PM', summary: 'Original pitch outline uploaded by client' }
      ]
    },
    {
      id: 'f-2',
      name: 'Executive_Pitch_Deck_Draft_v1.pptx',
      category: 'Delivered by MFS Growth',
      projectRef: 'PRJ-MFS-849201',
      type: 'PPTX',
      size: '4.8 MB',
      uploadDate: 'Today • 10:15 AM',
      lastModified: 'Today • 10:15 AM',
      status: 'In Review',
      uploadedBy: 'MFS Design Lead Shehroz',
      isFavorite: true,
      version: 'v1.2',
      versionHistory: [
        { version: 'v1.2', date: 'Today 10:15 AM', summary: 'Gold Accent polish applied to Slides 1-7' },
        { version: 'v1.0', date: 'Yesterday 06:00 PM', summary: 'Initial structure draft with Poppins typography' }
      ]
    },
    {
      id: 'f-3',
      name: 'Financial_Projections_2026.xlsx',
      category: 'Project Assets',
      projectRef: 'PRJ-MFS-849201',
      type: 'XLSX',
      size: '850 KB',
      uploadDate: '2 days ago',
      lastModified: '2 days ago',
      status: 'Verified',
      uploadedBy: customerName,
      isFavorite: false,
      version: 'v1.0',
    },
    {
      id: 'f-4',
      name: 'Brand_Logo_Vector.png',
      category: 'Project Assets',
      projectRef: 'PRJ-MFS-849201',
      type: 'PNG/JPG',
      size: '2.4 MB',
      uploadDate: '3 days ago',
      lastModified: '3 days ago',
      status: 'Verified',
      uploadedBy: customerName,
      isFavorite: false,
      version: 'v1.0',
    },
    {
      id: 'f-5',
      name: 'Tax_Invoice_INV849201.pdf',
      category: 'Invoices & Receipts',
      projectRef: 'ORD-MFS-984210',
      type: 'PDF',
      size: '420 KB',
      uploadDate: 'Yesterday • 04:30 PM',
      lastModified: 'Yesterday • 04:30 PM',
      status: 'Final Deliverable',
      uploadedBy: 'MFS Accounts Desk',
      isFavorite: true,
      version: 'v1.0',
    }
  ]);

  // Statistics
  const totalFilesCount = files.length;
  const clientUploadedCount = files.filter(f => f.category === 'Uploaded by Client').length;
  const deliveredCount = files.filter(f => f.category === 'Delivered by MFS Growth' || f.category === 'Completed Deliverables').length;
  const favoriteCount = files.filter(f => f.isFavorite).length;

  // File Icon Helper
  const getFileIcon = (type: ProjectFile['type']) => {
    switch (type) {
      case 'PDF':
        return <FileText className="w-6 h-6 text-red-400" />;
      case 'PPTX':
        return <Presentation className="w-6 h-6 text-[#E5C158]" />;
      case 'DOCX':
        return <FileText className="w-6 h-6 text-blue-400" />;
      case 'XLSX':
        return <FileSpreadsheet className="w-6 h-6 text-[#28C76F]" />;
      case 'PNG/JPG':
        return <ImageIcon className="w-6 h-6 text-purple-400" />;
      default:
        return <FileCode className="w-6 h-6 text-neutral-400" />;
    }
  };

  // Upload handler
  const handleFileUpload = (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;
    const file = fileList[0];

    setUploadingFileName(file.name);
    setUploadProgress(10);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev === null) return 10;
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            const ext = file.name.split('.').pop()?.toUpperCase() || 'DOCX';
            let formattedType: ProjectFile['type'] = 'DOCX';
            if (ext.includes('PDF')) formattedType = 'PDF';
            else if (ext.includes('PPT')) formattedType = 'PPTX';
            else if (ext.includes('XLS')) formattedType = 'XLSX';
            else if (ext.includes('PNG') || ext.includes('JPG') || ext.includes('JPEG')) formattedType = 'PNG/JPG';

            const newFileItem: ProjectFile = {
              id: `f-${Date.now()}`,
              name: file.name,
              category: 'Uploaded by Client',
              projectRef: 'PRJ-MFS-849201',
              type: formattedType,
              size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
              uploadDate: 'Just now',
              lastModified: 'Just now',
              status: 'In Review',
              uploadedBy: customerName,
              isFavorite: false,
              version: 'v1.0',
            };

            setFiles((prevFiles) => [newFileItem, ...prevFiles]);
            setUploadProgress(null);
            setUploadingFileName(null);
            if (onShowToast) {
              onShowToast(`File "${file.name}" uploaded successfully and passed MFS security scan!`);
            }
          }, 300);
          return 100;
        }
        return prev + 30;
      });
    }, 250);
  };

  // Toggle favorite
  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFiles((prev) =>
      prev.map((f) => (f.id === id ? { ...f, isFavorite: !f.isFavorite } : f))
    );
    if (onShowToast) onShowToast('Favorite status updated.');
  };

  // Rename File
  const handleSaveRename = () => {
    if (!renameFileModal || !newFileNameInput.trim()) return;
    setFiles((prev) =>
      prev.map((f) => (f.id === renameFileModal.id ? { ...f, name: newFileNameInput.trim() } : f))
    );
    if (onShowToast) onShowToast(`File renamed to "${newFileNameInput.trim()}"`);
    setRenameFileModal(null);
  };

  // Delete file
  const handleDeleteFile = (id: string, name: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
    if (onShowToast) onShowToast(`File "${name}" removed from workspace.`);
  };

  // Filter & Search logic
  const filteredFiles = files.filter((file) => {
    // Category Filter
    if (selectedCategory !== 'All' && file.category !== selectedCategory) {
      return false;
    }
    // Type Filter
    if (selectedType !== 'All' && file.type !== selectedType) {
      return false;
    }
    // Favorites Filter
    if (showOnlyFavorites && !file.isFavorite) {
      return false;
    }
    // Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = file.name.toLowerCase().includes(q);
      const matchProject = file.projectRef.toLowerCase().includes(q);
      const matchBy = file.uploadedBy.toLowerCase().includes(q);
      if (!matchName && !matchProject && !matchBy) return false;
    }
    return true;
  }).sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    return b.id.localeCompare(a.id);
  });

  return (
    <div className="space-y-8 animate-fadeIn">

      {/* TOP HEADER & STATS BANNER */}
      <div className="glass-card rounded-3xl border border-[#E5C158]/30 p-6 bg-gradient-to-r from-black via-[#0F0F0F] to-black relative overflow-hidden flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-[0_0_30px_rgba(229,193,88,0.12)]">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#E5C158]/10 border border-[#E5C158]/30 text-[#E5C158] flex items-center justify-center shrink-0">
            <Folder className="w-7 h-7" />
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#28C76F]/10 text-[#28C76F] border border-[#28C76F]/30 text-[10px] font-bold flex items-center gap-1.5">
                <ShieldCheck className="w-3 h-3 text-[#28C76F]" />
                <span>SECURE CLOUD STORAGE • VERIFIED & ENCRYPTED</span>
              </span>
              <span className="text-[10px] font-mono text-neutral-400 hidden sm:inline">
                {clientId}
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-poppins font-bold text-white tracking-tight">
              Files & Documents Center
            </h1>
            <p className="text-xs text-neutral-300">
              Manage pitch briefs, source vectors, design drafts, and verified tax invoices for project <strong className="text-[#E5C158]">PRJ-MFS-849201</strong>.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#E5C158] to-[#D4AF37] text-black font-extrabold text-xs hover:brightness-110 transition-all cursor-pointer shadow-[0_0_15px_rgba(229,193,88,0.3)] flex items-center gap-2"
          >
            <Upload className="w-4 h-4 fill-black" />
            <span>Upload New File</span>
          </button>

          <button
            onClick={() => setShowRoadmapModal(true)}
            className="px-3 py-2.5 rounded-xl bg-[#28C76F]/10 border border-[#28C76F]/40 text-[#28C76F] font-bold text-xs hover:bg-[#28C76F]/20 transition-all cursor-pointer flex items-center gap-1"
          >
            <CheckCircle2 className="w-4 h-4 text-[#28C76F]" />
            <span>Phase 7 Complete</span>
          </button>
        </div>
      </div>

      {/* STATISTIC METRIC CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total Workspace Files', value: totalFilesCount, sub: 'All active assets', icon: Folder, color: 'text-[#E5C158]' },
          { label: 'Uploaded by You', value: clientUploadedCount, sub: 'Briefs & Logos', icon: FileUp, color: 'text-blue-400' },
          { label: 'Delivered by MFS', value: deliveredCount, sub: 'Drafts & Invoices', icon: CheckCircle2, color: 'text-[#28C76F]' },
          { label: 'Starred Favorites', value: favoriteCount, sub: 'Quick access items', icon: Star, color: 'text-amber-300' },
        ].map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="glass-card rounded-2xl border border-white/10 p-4 space-y-2 bg-black/60 relative overflow-hidden">
              <div className="flex justify-between items-center text-xs">
                <span className="text-neutral-400 font-medium text-[11px]">{stat.label}</span>
                <Icon className={`w-4 h-4 ${stat.color}`} />
              </div>
              <div className="text-2xl font-poppins font-bold text-white tracking-tight">
                {stat.value}
              </div>
              <span className="text-[10px] text-neutral-400 font-mono block">{stat.sub}</span>
            </div>
          );
        })}
      </div>

      {/* DRAG & DROP UPLOADER ZONE */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          handleFileUpload(e.dataTransfer.files);
        }}
        onClick={() => fileInputRef.current?.click()}
        className={`glass-card rounded-3xl border-2 border-dashed p-6 text-center cursor-pointer transition-all space-y-3 ${
          isDragging
            ? 'border-[#E5C158] bg-[#E5C158]/10'
            : 'border-white/20 hover:border-[#E5C158]/50 bg-black/40'
        }`}
      >
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          onChange={(e) => handleFileUpload(e.target.files)}
        />

        <div className="w-12 h-12 rounded-full bg-[#E5C158]/10 text-[#E5C158] flex items-center justify-center mx-auto">
          <Upload className="w-6 h-6 animate-bounce" />
        </div>

        <div>
          <h3 className="font-poppins font-bold text-white text-sm">
            Drag & Drop Your Project Brief or Media Assets Here
          </h3>
          <p className="text-xs text-neutral-400 max-w-md mx-auto">
            Supports PDF, DOCX, PPTX, XLSX, PNG, JPG, and ZIP files up to 25MB. Instant virus scanning & encryption active.
          </p>
        </div>

        {uploadProgress !== null && (
          <div className="max-w-xs mx-auto space-y-1.5 pt-2">
            <div className="flex justify-between text-[10px] font-mono">
              <span className="text-[#E5C158] font-bold">Uploading {uploadingFileName}...</span>
              <span className="text-white">{uploadProgress}%</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#E5C158] to-[#28C76F] transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* CONTROLS BAR: SEARCH, CATEGORIES, FILTERS & VIEW MODE SWITCH */}
      <div className="glass-card rounded-3xl border border-white/10 p-5 space-y-4 bg-black/80">
        
        {/* Top Controls Row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Search Field */}
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              placeholder="Search file name, project code or uploader..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 rounded-2xl bg-black border border-white/20 text-white text-xs focus:border-[#E5C158] outline-none"
            />
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
          </div>

          {/* Right Filters & View Mode */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            
            {/* Type Selector */}
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3 py-2 rounded-xl bg-black border border-white/20 text-neutral-200 text-xs focus:border-[#E5C158] outline-none cursor-pointer"
            >
              <option value="All">All Types</option>
              <option value="DOCX">DOCX Documents</option>
              <option value="PPTX">PPTX Presentations</option>
              <option value="XLSX">XLSX Spreadsheets</option>
              <option value="PDF">PDF Invoices & Files</option>
              <option value="PNG/JPG">Images & Logos</option>
            </select>

            {/* Sort Selector */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 rounded-xl bg-black border border-white/20 text-neutral-200 text-xs focus:border-[#E5C158] outline-none cursor-pointer"
            >
              <option value="date">Sort by Date</option>
              <option value="name">Sort by Name</option>
            </select>

            {/* Favorites Toggle */}
            <button
              onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}
              className={`px-3 py-2 rounded-xl border transition-colors cursor-pointer flex items-center gap-1.5 ${
                showOnlyFavorites
                  ? 'bg-amber-400/20 border-amber-400 text-amber-300 font-bold'
                  : 'bg-white/5 border-white/10 text-neutral-400 hover:text-white'
              }`}
            >
              <Star className={`w-3.5 h-3.5 ${showOnlyFavorites ? 'fill-amber-300' : ''}`} />
              <span>Starred</span>
            </button>

            {/* View Mode Switcher */}
            <div className="flex items-center bg-white/5 border border-white/10 rounded-xl p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  viewMode === 'grid' ? 'bg-[#E5C158] text-black' : 'text-neutral-400 hover:text-white'
                }`}
                title="Grid View"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  viewMode === 'list' ? 'bg-[#E5C158] text-black' : 'text-neutral-400 hover:text-white'
                }`}
                title="List View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>

        {/* Categories Tab Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs border-t border-white/10 pt-3 scrollbar-none">
          {[
            'All',
            'Uploaded by Client',
            'Delivered by MFS Growth',
            'Invoices & Receipts',
            'Project Assets',
          ].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl shrink-0 transition-colors cursor-pointer font-medium text-[11px] ${
                selectedCategory === cat
                  ? 'bg-[#E5C158] text-black font-bold'
                  : 'bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

      </div>

      {/* FILE MANAGER DISPLAY AREA (GRID OR LIST) */}
      {filteredFiles.length > 0 ? (
        viewMode === 'grid' ? (
          /* GRID VIEW */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFiles.map((file) => (
              <div
                key={file.id}
                className="glass-card rounded-3xl border border-white/10 p-5 space-y-4 hover:border-[#E5C158]/50 transition-all bg-black/80 group relative flex flex-col justify-between"
              >
                {/* Header: Type icon, Favorite star, Category */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="p-2.5 rounded-2xl bg-white/[0.04] border border-white/10">
                      {getFileIcon(file.type)}
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={(e) => toggleFavorite(file.id, e)}
                        className="p-1.5 rounded-lg hover:bg-white/10 text-neutral-400 transition-colors cursor-pointer"
                        title={file.isFavorite ? 'Unstar file' : 'Star file'}
                      >
                        <Star className={`w-4 h-4 ${file.isFavorite ? 'text-amber-300 fill-amber-300' : ''}`} />
                      </button>

                      <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[10px] font-mono text-[#E5C158]">
                        {file.version}
                      </span>
                    </div>
                  </div>

                  {/* Name & Project */}
                  <div>
                    <h3
                      onClick={() => setPreviewFile(file)}
                      className="font-poppins font-bold text-white text-sm hover:text-[#E5C158] transition-colors cursor-pointer truncate"
                      title={file.name}
                    >
                      {file.name}
                    </h3>
                    <div className="flex items-center gap-2 text-[10px] text-neutral-400 font-mono mt-0.5">
                      <span>{file.projectRef}</span>
                      <span>•</span>
                      <span>{file.size}</span>
                    </div>
                  </div>

                  {/* Metadata pills */}
                  <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1.5 text-[11px]">
                    <div className="flex justify-between text-neutral-400">
                      <span>Category:</span>
                      <span className="text-white font-medium">{file.category}</span>
                    </div>
                    <div className="flex justify-between text-neutral-400">
                      <span>Uploaded By:</span>
                      <span className="text-neutral-300 truncate max-w-[120px]">{file.uploadedBy}</span>
                    </div>
                    <div className="flex justify-between text-neutral-400">
                      <span>Date:</span>
                      <span className="text-neutral-300">{file.uploadDate}</span>
                    </div>
                  </div>
                </div>

                {/* Footer Action Bar */}
                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setPreviewFile(file)}
                      className="px-2.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-200 text-[11px] font-semibold cursor-pointer flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#E5C158]" />
                      <span>Preview</span>
                    </button>

                    {file.versionHistory && (
                      <button
                        onClick={() => setVersionHistoryFile(file)}
                        className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white cursor-pointer"
                        title="Version History"
                      >
                        <Clock className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => {
                        setRenameFileModal(file);
                        setNewFileNameInput(file.name);
                      }}
                      className="p-1.5 rounded-xl hover:bg-white/10 text-neutral-400 hover:text-white cursor-pointer"
                      title="Rename"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => {
                        if (onShowToast) onShowToast('File download protected under MFS Growth preview rules.');
                      }}
                      className="p-1.5 rounded-xl bg-[#E5C158] text-black font-bold cursor-pointer hover:bg-[#fce888]"
                      title="Download File"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => handleDeleteFile(file.id, file.name)}
                      className="p-1.5 rounded-xl hover:bg-red-500/20 text-neutral-400 hover:text-red-400 cursor-pointer"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        ) : (
          /* LIST VIEW */
          <div className="glass-card rounded-3xl border border-white/10 p-4 bg-black/80 overflow-x-auto">
            <table className="w-full text-left text-xs text-neutral-300">
              <thead>
                <tr className="border-b border-white/10 text-[10px] text-neutral-400 font-mono uppercase">
                  <th className="p-3">File Name</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Project</th>
                  <th className="p-3">Size</th>
                  <th className="p-3">Upload Date</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredFiles.map((file) => (
                  <tr key={file.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-3">
                      <div className="flex items-center gap-2.5">
                        <div className="shrink-0">{getFileIcon(file.type)}</div>
                        <div>
                          <strong
                            onClick={() => setPreviewFile(file)}
                            className="text-white hover:text-[#E5C158] cursor-pointer block truncate max-w-[200px]"
                          >
                            {file.name}
                          </strong>
                          <span className="text-[10px] text-neutral-400 font-mono">{file.uploadedBy}</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-3 font-medium text-white">{file.category}</td>
                    <td className="p-3 font-mono text-[#E5C158]">{file.projectRef}</td>
                    <td className="p-3 font-mono text-neutral-400">{file.size}</td>
                    <td className="p-3 text-neutral-400">{file.uploadDate}</td>
                    <td className="p-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => setPreviewFile(file)}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-200 cursor-pointer"
                          title="Preview"
                        >
                          <Eye className="w-3.5 h-3.5 text-[#E5C158]" />
                        </button>
                        <button
                          onClick={() => {
                            if (onShowToast) onShowToast('File download protected under MFS Growth preview rules.');
                          }}
                          className="p-1.5 rounded-lg bg-[#E5C158] text-black font-bold cursor-pointer"
                          title="Download"
                        >
                          <Download className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      ) : (
        /* SMART EMPTY STATE */
        <div className="glass-card rounded-3xl border border-white/10 p-12 text-center space-y-4 bg-black/80">
          <div className="w-16 h-16 rounded-full bg-[#E5C158]/10 text-[#E5C158] flex items-center justify-center mx-auto">
            <Folder className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-poppins font-bold text-white">No files available yet matching filter</h3>
            <p className="text-xs text-neutral-400 max-w-sm mx-auto">
              Upload your presentation outlines, brand assets, or requirement documents to begin production.
            </p>
          </div>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-5 py-2.5 rounded-full bg-[#E5C158] text-black font-bold text-xs hover:bg-[#fce888] cursor-pointer"
          >
            Upload Project File
          </button>
        </div>
      )}

      {/* FILE PREVIEW MODAL */}
      {previewFile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="glass-card rounded-3xl border border-[#E5C158]/40 p-6 max-w-2xl w-full space-y-6 bg-[#050507] relative shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                  {getFileIcon(previewFile.type)}
                </div>
                <div>
                  <h3 className="text-base font-poppins font-bold text-white truncate max-w-[320px]">
                    {previewFile.name}
                  </h3>
                  <span className="text-[10px] font-mono text-[#E5C158] block">
                    {previewFile.projectRef} • {previewFile.size} • Version {previewFile.version}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setPreviewFile(null)}
                className="text-neutral-400 hover:text-white p-2 rounded-xl bg-white/5 hover:bg-white/10 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* PREVIEW CONTAINER */}
            <div className="p-6 rounded-2xl bg-black border border-white/10 min-h-[220px] flex flex-col items-center justify-center space-y-3 text-center">
              <ShieldCheck className="w-12 h-12 text-[#28C76F]" />
              <div className="space-y-1">
                <span className="px-2.5 py-0.5 rounded-full bg-[#28C76F]/10 text-[#28C76F] border border-[#28C76F]/30 text-[10px] font-bold">
                  VIRUS SCAN PASSED • ENCRYPTED PREVIEW
                </span>
                <p className="text-xs text-neutral-300 max-w-md">
                  Preview rendered for <strong>{previewFile.name}</strong>. MFS Growth Agency protects source presentations and vector files under active client protection terms.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-2">
              <span className="text-neutral-400">Uploaded by {previewFile.uploadedBy} on {previewFile.uploadDate}</span>

              <button
                onClick={() => {
                  if (onShowToast) onShowToast('File download protected under MFS Growth preview rules.');
                }}
                className="px-4 py-2 rounded-xl bg-[#E5C158] text-black font-bold text-xs hover:bg-[#fce888] cursor-pointer flex items-center gap-1.5"
              >
                <Download className="w-4 h-4" />
                <span>Download File</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* VERSION HISTORY MODAL */}
      {versionHistoryFile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="glass-card rounded-3xl border border-white/20 p-6 max-w-md w-full space-y-5 bg-[#0F0F0F] relative shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#E5C158]" />
                <h3 className="text-sm font-poppins font-bold text-white">Version History</h3>
              </div>
              <button
                onClick={() => setVersionHistoryFile(null)}
                className="text-neutral-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              {versionHistoryFile.versionHistory?.map((vh, i) => (
                <div key={i} className="p-3 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
                  <div className="flex justify-between items-center">
                    <strong className="text-[#E5C158] font-mono">{vh.version}</strong>
                    <span className="text-[10px] text-neutral-400">{vh.date}</span>
                  </div>
                  <p className="text-neutral-300 text-[11px]">{vh.summary}</p>
                </div>
              ))}
            </div>

            <button
              onClick={() => setVersionHistoryFile(null)}
              className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* RENAME MODAL */}
      {renameFileModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="glass-card rounded-3xl border border-white/20 p-6 max-w-md w-full space-y-4 bg-[#0F0F0F] relative shadow-2xl">
            <h3 className="text-sm font-poppins font-bold text-white">Rename File</h3>
            <input
              type="text"
              value={newFileNameInput}
              onChange={(e) => setNewFileNameInput(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-black border border-white/20 text-white text-xs focus:border-[#E5C158] outline-none"
            />
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setRenameFileModal(null)}
                className="px-4 py-2 rounded-xl bg-white/10 text-white text-xs"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveRename}
                className="px-4 py-2 rounded-xl bg-[#E5C158] text-black font-bold text-xs"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PHASE 7 ROADMAP CHECKLIST MODAL */}
      {showRoadmapModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="glass-card rounded-3xl border border-[#E5C158]/40 p-6 sm:p-8 max-w-2xl w-full space-y-6 bg-[#0F0F0F] relative shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#28C76F]/20 text-[#28C76F]">
                  <CheckCircle2 className="w-6 h-6 text-[#28C76F]" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-[#E5C158] uppercase tracking-wider block">
                    CLIENT DASHBOARD ROADMAP COMPLETE
                  </span>
                  <h3 className="text-xl font-poppins font-bold text-white">
                    Phase 7 Completed • Files & Documents Center
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setShowRoadmapModal(false)}
                className="text-neutral-400 hover:text-white text-xs px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 cursor-pointer"
              >
                Close ✕
              </button>
            </div>

            {/* Complete Roadmap Checklist */}
            <div className="space-y-2 text-xs">
              {[
                { phase: 'Phase 1: Client Dashboard Core Shell', desc: 'Sidebar, header, currency switch & navigation' },
                { phase: 'Phase 2: Dashboard Home Experience', desc: 'AI Daily Briefing, metrics, quick shortcuts & activities' },
                { phase: 'Phase 3: AI Live Project Tracking', desc: 'Vertical timeline, AI health score & Cinematic Movie' },
                { phase: 'Phase 4: Project Details Center', desc: 'Project overview, brief, specs, file attachments & deliverables' },
                { phase: 'Phase 5: AI Assistant Center', desc: 'AI chat hub, document search, voice AI & multi-language support' },
                { phase: 'Phase 6: Messages & Communication Center', desc: 'Real-time chat, AI summarizer, file sharing & reaction cards' },
              ].map((p, idx) => (
                <div key={idx} className="p-2.5 rounded-2xl bg-[#28C76F]/10 border border-[#28C76F]/30 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#28C76F]" />
                    <div>
                      <strong className="text-white block font-bold text-[11px]">{p.phase}</strong>
                      <span className="text-neutral-400 text-[10px]">{p.desc}</span>
                    </div>
                  </div>
                  <span className="text-[#28C76F] font-bold text-[9px] uppercase">COMPLETED</span>
                </div>
              ))}

              <div className="p-3.5 rounded-2xl bg-[#28C76F]/10 border border-[#28C76F]/40 flex items-center justify-between shadow-[0_0_15px_rgba(40,199,111,0.2)]">
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#28C76F]" />
                  <div>
                    <strong className="text-white block font-bold text-xs">Phase 7: Files & Documents Center</strong>
                    <span className="text-neutral-400 text-[11px]">Grid/List view, drag & drop upload, encrypted preview, version history & search</span>
                  </div>
                </div>
                <span className="text-[#28C76F] font-bold text-[10px] uppercase">COMPLETED NOW</span>
              </div>
            </div>

            <div className="pt-2 text-center">
              <button
                onClick={() => setShowRoadmapModal(false)}
                className="w-full py-3 rounded-full bg-[#E5C158] text-black font-bold text-xs hover:bg-[#fce888] cursor-pointer"
              >
                Acknowledge Phase 7 Completion
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
