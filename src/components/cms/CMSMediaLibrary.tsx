import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Folder,
  File,
  Image as ImageIcon,
  Video,
  FileText,
  Upload,
  Search,
  Filter,
  Grid,
  List,
  FolderPlus,
  Trash2,
  Tag,
  Star,
  Download,
  Eye,
  Info,
  Layers,
  Sparkles,
  X,
  Plus,
  CheckCircle2,
  Cloud,
  HardDrive,
  Copy,
  ExternalLink,
  Shield,
  FileCheck,
  Archive,
  RefreshCw,
  MoreVertical,
  Award,
  Film,
  Brain,
  MapPin,
  Wand2,
  BarChart2
} from 'lucide-react';
import { Currency } from '../../types';
import { CMSBrandAssetCenter } from './dam/CMSBrandAssetCenter';
import { CMSMotionGraphicsCenter } from './dam/CMSMotionGraphicsCenter';
import { CMSDownloadCenter } from './dam/CMSDownloadCenter';
import { CMSAssetUsageIntelligence } from './dam/CMSAssetUsageIntelligence';
import { CMSWebsiteAssetMapping } from './dam/CMSWebsiteAssetMapping';
import { CMSStorageManagementDashboard } from './dam/CMSStorageManagementDashboard';
import { CMSFutureCreativeAiHub } from './dam/CMSFutureCreativeAiHub';

export interface MediaAsset {
  id: string;
  name: string;
  fileType: 'image' | 'video' | 'pdf' | 'doc' | 'svg' | 'lottie';
  mimeType: string;
  fileSize: string;
  url: string;
  thumbnailUrl: string;
  folder: string;
  uploadedBy: string;
  uploadDate: string;
  tags: string[];
  usageCount: number;
  lastUsedPage: string;
  isFavorite: boolean;
  status: 'active' | 'archived';
}

interface CMSMediaLibraryProps {
  currency: Currency;
  onShowToast?: (message: string) => void;
}

export const CMSMediaLibrary: React.FC<CMSMediaLibraryProps> = ({
  currency,
  onShowToast,
}) => {
  // DAM Sub-Tab State
  const [damTab, setDamTab] = useState<
    'library' | 'brand' | 'motion' | 'downloads' | 'intelligence' | 'mapping' | 'storage' | 'creative_ai'
  >('library');

  // Folder Tree Structure
  const [folders, setFolders] = useState<string[]>([
    'All Assets',
    'Hero Banners & Videos',
    'Project Work Samples',
    'Logos & Branding',
    'Team & Avatars',
    'Marketing & Ads',
    'PDF Documents',
    'Icons & SVGs',
  ]);
  const [selectedFolder, setSelectedFolder] = useState<string>('All Assets');

  // Media Items State
  const [assets, setAssets] = useState<MediaAsset[]>([
    {
      id: 'asset-1',
      name: 'MFS-Grand-Launch-Gold-Logo.svg',
      fileType: 'svg',
      mimeType: 'image/svg+xml',
      fileSize: '45 KB',
      url: '/logo.svg',
      thumbnailUrl: '/logo.svg',
      folder: 'Logos & Branding',
      uploadedBy: 'Muhammad Shehroz Sultan',
      uploadDate: '2026-07-26 12:00 PKT',
      tags: ['logo', 'brand', 'gold', 'mfs'],
      usageCount: 14,
      lastUsedPage: 'Homepage Header & Footer',
      isFavorite: true,
      status: 'active',
    },
    {
      id: 'asset-2',
      name: 'Executive-Pitch-Deck-Sample-01.pdf',
      fileType: 'pdf',
      mimeType: 'application/pdf',
      fileSize: '4.2 MB',
      url: '/samples/pitch-deck-preview.pdf',
      thumbnailUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=500&q=80',
      folder: 'Project Work Samples',
      uploadedBy: 'Shehroz Sultan',
      uploadDate: '2026-07-25 15:30 PKT',
      tags: ['pitch deck', 'sample', 'watermarked', 'our work'],
      usageCount: 8,
      lastUsedPage: 'Our Work Section',
      isFavorite: true,
      status: 'active',
    },
    {
      id: 'asset-3',
      name: 'Hero-Digital-Loop-Background.mp4',
      fileType: 'video',
      mimeType: 'video/mp4',
      fileSize: '18.4 MB',
      url: 'https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-screens-41555-large.mp4',
      thumbnailUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&q=80',
      folder: 'Hero Banners & Videos',
      uploadedBy: 'Shehroz Sultan',
      uploadDate: '2026-07-24 10:15 PKT',
      tags: ['hero video', 'digital loop', 'dark theme'],
      usageCount: 3,
      lastUsedPage: 'Homepage Hero',
      isFavorite: false,
      status: 'active',
    },
    {
      id: 'asset-4',
      name: 'Academic-Research-Paper-Template.pdf',
      fileType: 'pdf',
      mimeType: 'application/pdf',
      fileSize: '1.8 MB',
      url: '/samples/academic-sample.pdf',
      thumbnailUrl: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=500&q=80',
      folder: 'Project Work Samples',
      uploadedBy: 'MFS Academic Team',
      uploadDate: '2026-07-22 09:00 PKT',
      tags: ['academic', 'apa style', 'harvard', 'assignment'],
      usageCount: 5,
      lastUsedPage: 'Services & Our Work',
      isFavorite: false,
      status: 'active',
    },
    {
      id: 'asset-5',
      name: 'Shehroz-Sultan-Founder-Avatar.jpg',
      fileType: 'image',
      mimeType: 'image/jpeg',
      fileSize: '240 KB',
      url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&q=80',
      thumbnailUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&q=80',
      folder: 'Team & Avatars',
      uploadedBy: 'Shehroz Sultan',
      uploadDate: '2026-07-20 14:00 PKT',
      tags: ['avatar', 'founder', 'team', 'shehroz'],
      usageCount: 6,
      lastUsedPage: 'About Us & Contact',
      isFavorite: true,
      status: 'active',
    },
    {
      id: 'asset-6',
      name: '50-Percent-Off-Grand-Launch-Banner.png',
      fileType: 'image',
      mimeType: 'image/png',
      fileSize: '512 KB',
      url: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=500&q=80',
      thumbnailUrl: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=500&q=80',
      folder: 'Marketing & Ads',
      uploadedBy: 'Marketing Lead',
      uploadDate: '2026-07-18 11:20 PKT',
      tags: ['promo', '50% off', 'grand launch', 'banner'],
      usageCount: 12,
      lastUsedPage: 'Pricing & Order Page',
      isFavorite: true,
      status: 'active',
    },
  ]);

  // View mode & filters
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [selectedAsset, setSelectedAsset] = useState<MediaAsset | null>(null);
  const [isDetailDrawerOpen, setIsDetailDrawerOpen] = useState(false);
  const [isNewFolderModalOpen, setIsNewFolderModalOpen] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [storageProvider, setStorageProvider] = useState<'local' | 'supabase' | 'r2' | 's3'>('supabase');

  // Filter Assets
  const filteredAssets = assets.filter((asset) => {
    const matchesFolder = selectedFolder === 'All Assets' || asset.folder === selectedFolder;
    const matchesSearch =
      asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
      asset.uploadedBy.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === 'all' || asset.fileType === typeFilter;
    return matchesFolder && matchesSearch && matchesType;
  });

  // Handlers
  const handleToggleFavorite = (id: string) => {
    setAssets((prev) =>
      prev.map((a) => {
        if (a.id === id) {
          const nextFav = !a.isFavorite;
          if (onShowToast) onShowToast(`${nextFav ? 'Added to' : 'Removed from'} Favorites`);
          return { ...a, isFavorite: nextFav };
        }
        return a;
      })
    );
  };

  const handleSimulateUpload = () => {
    const newAsset: MediaAsset = {
      id: `asset-${Date.now()}`,
      name: `Uploaded-Asset-${Math.floor(Math.random() * 1000)}.png`,
      fileType: 'image',
      mimeType: 'image/png',
      fileSize: '320 KB',
      url: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=500&q=80',
      thumbnailUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=500&q=80',
      folder: selectedFolder === 'All Assets' ? 'Marketing & Ads' : selectedFolder,
      uploadedBy: 'Muhammad Shehroz Sultan',
      uploadDate: new Date().toISOString().replace('T', ' ').substring(0, 16) + ' PKT',
      tags: ['new upload', 'mfs asset'],
      usageCount: 0,
      lastUsedPage: 'None Yet',
      isFavorite: false,
      status: 'active',
    };
    setAssets((prev) => [newAsset, ...prev]);
    if (onShowToast) onShowToast(`Uploaded "${newAsset.name}" to DAM media library!`);
  };

  const handleCreateFolder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFolderName) return;
    if (!folders.includes(newFolderName)) {
      setFolders((prev) => [...prev, newFolderName]);
      if (onShowToast) onShowToast(`Created media folder "${newFolderName}"`);
    }
    setNewFolderName('');
    setIsNewFolderModalOpen(false);
  };

  const handleDeleteAsset = (id: string, name: string) => {
    setAssets((prev) => prev.filter((a) => a.id !== id));
    setIsDetailDrawerOpen(false);
    if (onShowToast) onShowToast(`Deleted asset "${name}"`);
  };

  return (
    <div className="space-y-6">
      {/* HEADER BAR & CLOUD STORAGE BADGE */}
      <div className="glass-card rounded-3xl border border-white/10 p-5 space-y-4 bg-[#0D0D12]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 font-mono text-[10px] font-bold border border-blue-500/30 uppercase">
                DIGITAL ASSET MANAGEMENT (DAM)
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#28C76F]/10 text-[#28C76F] font-mono text-[10px] font-bold border border-[#28C76F]/30 flex items-center gap-1">
                <Cloud className="w-3 h-3 text-[#28C76F]" />
                <span>CLOUD STORAGE SYNC</span>
              </span>
            </div>
            <h3 className="font-poppins font-bold text-white text-base mt-1">
              Enterprise Media Library
            </h3>
            <p className="text-xs text-neutral-400">
              Centralized asset repository for images, videos, pitch deck samples, PDFs, vector logos, and brand graphics.
            </p>
          </div>

          {/* Storage Provider Selector */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-[10px] font-mono text-neutral-400 uppercase hidden md:inline">Storage Backend:</span>
            <select
              value={storageProvider}
              onChange={(e) => {
                const val = e.target.value as any;
                setStorageProvider(val);
                if (onShowToast) onShowToast(`Switched active cloud storage provider to ${val.toUpperCase()}`);
              }}
              className="bg-white/[0.04] border border-white/10 rounded-2xl px-3 py-2 text-xs text-[#E5C158] font-mono font-bold focus:outline-none"
            >
              <option value="supabase" className="bg-black text-white">Supabase Storage CDN</option>
              <option value="r2" className="bg-black text-white">Cloudflare R2 Bucket</option>
              <option value="s3" className="bg-black text-white">AWS S3 Media Bucket</option>
              <option value="local" className="bg-black text-white">Local Server Storage</option>
            </select>

            <button
              onClick={handleSimulateUpload}
              className="px-4 py-2.5 rounded-2xl bg-[#E5C158] text-black font-extrabold text-xs hover:bg-[#fce888] transition-all flex items-center gap-1.5 cursor-pointer shadow-lg shrink-0"
            >
              <Upload className="w-4 h-4" />
              <span>Upload Media</span>
            </button>
          </div>
        </div>

        {/* DAM MODULE SUB-NAVIGATION */}
        <div className="pt-2 border-t border-white/10 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {[
            { id: 'library', label: 'Media Library', icon: Layers },
            { id: 'brand', label: 'Brand Asset Center', icon: Award },
            { id: 'motion', label: 'Motion & Animations', icon: Film },
            { id: 'downloads', label: 'Download Center', icon: Download },
            { id: 'intelligence', label: 'Usage Intelligence', icon: Brain },
            { id: 'mapping', label: 'Website Asset Map', icon: MapPin },
            { id: 'storage', label: 'Storage & Multi-Cloud', icon: HardDrive },
            { id: 'creative_ai', label: 'Future Creative AI', icon: Wand2 },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = damTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setDamTab(tab.id as any)}
                className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 border shrink-0 text-xs cursor-pointer ${
                  isActive
                    ? 'bg-[#E5C158] text-black border-[#E5C158] font-extrabold shadow-[0_0_15px_rgba(229,193,88,0.3)]'
                    : 'glass-card text-neutral-400 border-white/10 hover:text-white hover:border-white/20 font-bold'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-black' : 'text-[#E5C158]'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TOOLBAR & SEARCH (FOR MEDIA LIBRARY) */}
        {damTab === 'library' && (
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 pt-2 border-t border-white/10">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search assets by file name, tags, or author..."
                className="w-full bg-white/[0.04] border border-white/10 rounded-2xl pl-10 pr-4 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#E5C158]"
              />
            </div>
            {/* View Mode Toggle */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-xl transition-all ${
                  viewMode === 'grid' ? 'bg-[#E5C158] text-black' : 'bg-white/5 text-neutral-400 hover:text-white'
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-xl transition-all ${
                  viewMode === 'list' ? 'bg-[#E5C158] text-black' : 'bg-white/5 text-neutral-400 hover:text-white'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* RENDER ACTIVE DAM SUB-TAB */}
      {damTab === 'brand' && (
        <CMSBrandAssetCenter currency={currency} onShowToast={onShowToast} />
      )}

      {damTab === 'motion' && (
        <CMSMotionGraphicsCenter currency={currency} onShowToast={onShowToast} />
      )}

      {damTab === 'downloads' && (
        <CMSDownloadCenter currency={currency} onShowToast={onShowToast} />
      )}

      {damTab === 'intelligence' && (
        <CMSAssetUsageIntelligence currency={currency} onShowToast={onShowToast} />
      )}

      {damTab === 'mapping' && (
        <CMSWebsiteAssetMapping currency={currency} onShowToast={onShowToast} />
      )}

      {damTab === 'storage' && (
        <CMSStorageManagementDashboard currency={currency} onShowToast={onShowToast} />
      )}

      {damTab === 'creative_ai' && (
        <CMSFutureCreativeAiHub currency={currency} onShowToast={onShowToast} />
      )}

      {/* MEDIA LIBRARY FOLDER TREE & ASSET GRID */}
      {damTab === 'library' && (
        <div className="space-y-4">
          {/* TOOLBAR FILTER CONTROLS */}
          <div className="flex items-center justify-between gap-3 overflow-x-auto pb-1 scrollbar-none">
            <div className="flex items-center gap-2">
              {/* File Type Filter */}
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="bg-white/[0.04] border border-white/10 rounded-xl px-3 py-2 text-xs text-neutral-300 font-mono focus:outline-none shrink-0"
              >
                <option value="all" className="bg-black">All File Types</option>
                <option value="image" className="bg-black">Images (PNG/JPG)</option>
                <option value="video" className="bg-black">Videos (MP4)</option>
                <option value="pdf" className="bg-black">PDF Documents</option>
                <option value="svg" className="bg-black">SVG Vectors</option>
              </select>
            </div>
          </div>

          {/* MAIN LAYOUT: SIDEBAR FOLDERS + ASSET GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* FOLDER SIDEBAR */}
        <div className="glass-card rounded-3xl border border-white/10 p-4 space-y-3 bg-[#0D0D12]">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <span className="font-poppins font-bold text-white text-xs uppercase font-mono tracking-wider">
              Folders
            </span>
            <button
              onClick={() => setIsNewFolderModalOpen(true)}
              className="p-1 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white cursor-pointer"
              title="Create New Folder"
            >
              <FolderPlus className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-1">
            {folders.map((folder) => {
              const count =
                folder === 'All Assets'
                  ? assets.length
                  : assets.filter((a) => a.folder === folder).length;
              const isSelected = selectedFolder === folder;
              return (
                <button
                  key={folder}
                  onClick={() => setSelectedFolder(folder)}
                  className={`w-full px-3 py-2.5 rounded-2xl text-xs transition-all flex items-center justify-between cursor-pointer ${
                    isSelected
                      ? 'bg-[#E5C158] text-black font-bold shadow-md'
                      : 'text-neutral-300 hover:bg-white/[0.04] hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <Folder className={`w-4 h-4 shrink-0 ${isSelected ? 'text-black' : 'text-[#E5C158]'}`} />
                    <span className="truncate">{folder}</span>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded-full font-mono text-[10px] font-bold ${
                      isSelected ? 'bg-black/20 text-black' : 'bg-white/10 text-neutral-400'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ASSETS CONTAINER (GRID OR TABLE) */}
        <div className="lg:col-span-3 space-y-4">
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {filteredAssets.map((asset) => (
                <div
                  key={asset.id}
                  className="glass-card rounded-2xl border border-white/10 overflow-hidden bg-[#0D0D12] hover:border-[#E5C158]/50 transition-all group flex flex-col justify-between"
                >
                  {/* Thumbnail Container */}
                  <div className="relative h-36 bg-black/40 overflow-hidden flex items-center justify-center">
                    {asset.fileType === 'image' || asset.fileType === 'svg' ? (
                      <img
                        src={asset.thumbnailUrl}
                        alt={asset.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : asset.fileType === 'video' ? (
                      <div className="relative w-full h-full flex items-center justify-center bg-purple-950/30">
                        <Video className="w-10 h-10 text-purple-400" />
                        <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/80 text-white font-mono text-[9px]">
                          VIDEO
                        </span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center p-4 text-center space-y-1">
                        <FileText className="w-10 h-10 text-blue-400" />
                        <span className="text-[10px] text-neutral-400 font-mono uppercase">
                          {asset.mimeType.split('/')[1] || 'PDF'}
                        </span>
                      </div>
                    )}

                    {/* Top Overlay Controls */}
                    <div className="absolute top-2 right-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleFavorite(asset.id);
                        }}
                        className={`p-1.5 rounded-lg backdrop-blur-md cursor-pointer ${
                          asset.isFavorite
                            ? 'bg-[#E5C158] text-black'
                            : 'bg-black/60 text-white hover:text-[#E5C158]'
                        }`}
                      >
                        <Star className="w-3.5 h-3.5 fill-current" />
                      </button>
                    </div>

                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/70 backdrop-blur-md font-mono text-[9px] text-white">
                      {asset.fileSize}
                    </span>
                  </div>

                  {/* Body Info */}
                  <div className="p-3 space-y-2 flex-1 flex flex-col justify-between">
                    <div>
                      <strong className="text-white font-bold text-xs line-clamp-1 block group-hover:text-[#E5C158] transition-colors">
                        {asset.name}
                      </strong>
                      <p className="text-[10px] text-neutral-400 font-mono line-clamp-1">
                        Folder: {asset.folder}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[10px] text-neutral-400">
                      <span>Used in {asset.usageCount} places</span>
                      <button
                        onClick={() => {
                          setSelectedAsset(asset);
                          setIsDetailDrawerOpen(true);
                        }}
                        className="text-[#E5C158] hover:underline font-bold cursor-pointer"
                      >
                        Inspect
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {filteredAssets.length === 0 && (
                <div className="col-span-full py-12 text-center text-neutral-400 space-y-2 bg-[#0D0D12] rounded-2xl border border-white/10">
                  <ImageIcon className="w-8 h-8 mx-auto text-neutral-600" />
                  <p className="font-poppins text-sm text-white font-bold">No Assets Found</p>
                  <p className="text-xs text-neutral-500 max-w-xs mx-auto">
                    No files match your current search criteria or folder selection. Upload a new asset to get started.
                  </p>
                </div>
              )}
            </div>
          ) : (
            /* LIST / TABLE VIEW */
            <div className="glass-card rounded-3xl border border-white/10 overflow-hidden bg-[#0D0D12]">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-white/[0.03] text-neutral-400 font-mono uppercase text-[10px] border-b border-white/10">
                    <tr>
                      <th className="py-3 px-4">Asset Name</th>
                      <th className="py-3 px-4">Type & Size</th>
                      <th className="py-3 px-4">Folder</th>
                      <th className="py-3 px-4">Uploaded By</th>
                      <th className="py-3 px-4">Usage</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-neutral-300">
                    {filteredAssets.map((asset) => (
                      <tr key={asset.id} className="hover:bg-white/[0.02] transition-colors">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-lg bg-black/40 overflow-hidden shrink-0 flex items-center justify-center border border-white/10">
                              {asset.fileType === 'image' || asset.fileType === 'svg' ? (
                                <img src={asset.thumbnailUrl} alt={asset.name} className="w-full h-full object-cover" />
                              ) : (
                                <FileText className="w-4 h-4 text-blue-400" />
                              )}
                            </div>
                            <strong className="text-white font-bold line-clamp-1">{asset.name}</strong>
                          </div>
                        </td>

                        <td className="py-3 px-4 font-mono text-[11px]">
                          <span className="uppercase text-[#E5C158] font-bold">{asset.fileType}</span> • {asset.fileSize}
                        </td>

                        <td className="py-3 px-4 text-neutral-300">{asset.folder}</td>
                        <td className="py-3 px-4 font-mono text-[10px] text-neutral-400">{asset.uploadedBy}</td>
                        <td className="py-3 px-4 font-mono text-[11px] text-white font-bold">{asset.usageCount} refs</td>

                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() => {
                              setSelectedAsset(asset);
                              setIsDetailDrawerOpen(true);
                            }}
                            className="px-3 py-1 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-[10px] cursor-pointer"
                          >
                            Inspect
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )}

      {/* ASSET DETAIL DRAWER MODAL */}
      <AnimatePresence>
        {isDetailDrawerOpen && selectedAsset && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-end p-4">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="w-full max-w-md h-full bg-[#0D0D12] border-l border-white/10 rounded-3xl p-6 space-y-5 overflow-y-auto shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2">
                  <Info className="w-5 h-5 text-[#E5C158]" />
                  <h3 className="font-poppins font-bold text-white text-base">Asset Inspector</h3>
                </div>
                <button
                  onClick={() => setIsDetailDrawerOpen(false)}
                  className="p-1 rounded-lg text-neutral-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Preview Box */}
              <div className="h-48 rounded-2xl bg-black/60 border border-white/10 overflow-hidden flex items-center justify-center p-2 relative">
                {selectedAsset.fileType === 'image' || selectedAsset.fileType === 'svg' ? (
                  <img src={selectedAsset.thumbnailUrl} alt={selectedAsset.name} className="max-h-full max-w-full object-contain" />
                ) : (
                  <FileText className="w-16 h-16 text-blue-400" />
                )}
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="text-neutral-400 font-mono text-[10px] uppercase block">File Name</label>
                  <p className="text-white font-bold font-mono text-sm break-all">{selectedAsset.name}</p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div>
                    <label className="text-neutral-400 font-mono text-[10px] uppercase block">File Type</label>
                    <p className="text-white font-mono uppercase">{selectedAsset.fileType}</p>
                  </div>
                  <div>
                    <label className="text-neutral-400 font-mono text-[10px] uppercase block">File Size</label>
                    <p className="text-white font-mono">{selectedAsset.fileSize}</p>
                  </div>
                </div>

                <div>
                  <label className="text-neutral-400 font-mono text-[10px] uppercase block">Public CDN URL</label>
                  <div className="flex items-center gap-2 mt-1">
                    <input
                      type="text"
                      readOnly
                      value={`https://cdn.mfsgrowth.online${selectedAsset.url}`}
                      className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-3 py-1.5 text-[10px] font-mono text-neutral-300"
                    />
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(`https://cdn.mfsgrowth.online${selectedAsset.url}`);
                        if (onShowToast) onShowToast('Copied CDN URL to clipboard!');
                      }}
                      className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white cursor-pointer"
                      title="Copy URL"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-neutral-400 font-mono text-[10px] uppercase block">Tags</label>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {selectedAsset.tags.map((t) => (
                      <span key={t} className="px-2 py-0.5 rounded bg-white/10 text-[#E5C158] font-mono text-[10px]">
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-white/10 space-y-1">
                  <label className="text-neutral-400 font-mono text-[10px] uppercase block">Usage Metadata</label>
                  <p className="text-neutral-300">Active on: <strong className="text-white">{selectedAsset.lastUsedPage}</strong></p>
                  <p className="text-neutral-300">Uploaded by: <strong className="text-white">{selectedAsset.uploadedBy}</strong></p>
                  <p className="text-neutral-300">Upload date: <strong className="text-white">{selectedAsset.uploadDate}</strong></p>
                </div>
              </div>

              <div className="pt-4 flex justify-between gap-3 border-t border-white/10">
                <button
                  onClick={() => handleDeleteAsset(selectedAsset.id, selectedAsset.name)}
                  className="px-4 py-2 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/30 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Delete Asset</span>
                </button>

                <button
                  onClick={() => setIsDetailDrawerOpen(false)}
                  className="px-5 py-2 rounded-xl bg-[#E5C158] text-black font-extrabold text-xs cursor-pointer"
                >
                  Done
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* CREATE NEW FOLDER MODAL */}
      <AnimatePresence>
        {isNewFolderModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-sm bg-[#0D0D12] border border-white/10 rounded-3xl p-6 space-y-4 shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2 text-[#E5C158]">
                  <FolderPlus className="w-5 h-5" />
                  <h3 className="font-poppins font-bold text-white text-base">Create Folder</h3>
                </div>
                <button
                  onClick={() => setIsNewFolderModalOpen(false)}
                  className="p-1 rounded-lg text-neutral-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateFolder} className="space-y-3">
                <div>
                  <label className="text-neutral-400 font-mono text-[10px] uppercase block mb-1">
                    Folder Name
                  </label>
                  <input
                    type="text"
                    required
                    value={newFolderName}
                    onChange={(e) => setNewFolderName(e.target.value)}
                    placeholder="e.g., Seasonal Campaigns"
                    className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-4 py-2 text-xs text-white focus:outline-none focus:border-[#E5C158]"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsNewFolderModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-white/10 text-neutral-300 text-xs font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-[#E5C158] text-black font-extrabold text-xs shadow-lg"
                  >
                    Create
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
