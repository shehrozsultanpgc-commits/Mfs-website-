import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  HardDrive,
  Cloud,
  Database,
  CheckCircle2,
  RefreshCw,
  Archive,
  Trash2,
  Zap,
  TrendingUp,
  ShieldCheck,
  Server,
  Layers,
  FileCheck
} from 'lucide-react';
import { Currency } from '../../../types';

interface CMSStorageManagementDashboardProps {
  currency: Currency;
  onShowToast?: (message: string) => void;
}

export const CMSStorageManagementDashboard: React.FC<CMSStorageManagementDashboardProps> = ({
  currency,
  onShowToast,
}) => {
  const [cloudProviders, setCloudProviders] = useState([
    {
      id: 'supabase',
      name: 'Supabase Storage',
      role: 'Primary File Vault',
      status: 'active',
      used: '1.42 GB',
      bucketName: 'mfs-media-production-v1',
      region: 'eu-central-1 (Frankfurt)',
    },
    {
      id: 'cloudflare',
      name: 'Cloudflare R2 CDN',
      role: 'Global Edge Cache (280+ PoPs)',
      status: 'active',
      used: '1.42 GB (Synced)',
      bucketName: 'cdn.mfsgrowth.agency',
      region: 'Global Anycast Edge',
    },
    {
      id: 'aws',
      name: 'AWS S3 Cold Storage',
      role: 'Disaster Recovery Snapshot',
      status: 'synced',
      used: '1.42 GB',
      bucketName: 'mfs-disaster-recovery-backup',
      region: 'us-east-1 (N. Virginia)',
    },
    {
      id: 'gcp',
      name: 'Google Cloud Storage',
      role: 'Enterprise Archival & Analytics',
      status: 'standby',
      used: '0.00 GB',
      bucketName: 'mfs-enterprise-analytics-vault',
      region: 'asia-east1 (Taiwan)',
    },
  ]);

  const largestFiles = [
    { name: 'MFS-Press-Kit-2026.zip', category: 'ZIP Package', size: '24.5 MB', uploaded: '2026-07-25' },
    { name: 'Hero-Digital-Loop-Background.mp4', category: 'Video', size: '18.4 MB', uploaded: '2026-07-24' },
    { name: 'Fintech-Pitch-Deck-Full-Preview.pdf', category: 'PDF Document', size: '8.1 MB', uploaded: '2026-07-22' },
    { name: 'Corporate-Profile-Interactive.pdf', category: 'PDF Document', size: '5.6 MB', uploaded: '2026-07-20' },
  ];

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="glass-card rounded-2xl border border-white/10 p-6 bg-gradient-to-br from-[#121212] via-[#101A24] to-[#0D0D12] relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
              <HardDrive className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-poppins font-black text-xl text-white">
                  Storage Management & Multi-Cloud CDN Control
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/30 text-[10px] font-mono font-bold">
                  99.99% Availability
                </span>
              </div>
              <p className="text-xs text-neutral-400 mt-1">
                Executive storage telemetry, multi-cloud synchronization (Supabase, R2, S3, GCS), and edge CDN management.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => onShowToast?.('Cloudflare CDN Edge Cache purged globally.')}
              className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-all flex items-center gap-2 border border-white/10 cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5 text-[#E5C158]" />
              <span>Purge CDN Cache</span>
            </button>
            <button
              onClick={() => onShowToast?.('Disaster Recovery Multi-Cloud Backup initialized.')}
              className="px-3.5 py-2 rounded-xl bg-[#E5C158] text-black font-extrabold text-xs hover:bg-[#fce888] transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(229,193,88,0.2)] cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Trigger Sync</span>
            </button>
          </div>
        </div>
      </div>

      {/* STORAGE USAGE CAPACITY CARD */}
      <div className="glass-card rounded-2xl border border-white/10 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs text-neutral-400 font-mono">TOTAL ALLOCATED CAPACITY</div>
            <div className="text-2xl font-black text-white font-poppins mt-0.5">
              1.42 GB <span className="text-sm font-normal text-neutral-400">/ 50.00 GB (2.84% Used)</span>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full bg-[#28C76F]/10 text-[#28C76F] border border-[#28C76F]/30 font-mono text-xs font-bold">
            48.58 GB Free
          </span>
        </div>

        {/* PROGRESS BAR */}
        <div className="w-full h-3 rounded-full bg-black/60 border border-white/10 overflow-hidden flex">
          <div className="h-full bg-blue-500" style={{ width: '1.2%' }} title="Images (600 MB)" />
          <div className="h-full bg-purple-500" style={{ width: '0.9%' }} title="Videos (450 MB)" />
          <div className="h-full bg-[#E5C158]" style={{ width: '0.5%' }} title="Documents (250 MB)" />
          <div className="h-full bg-[#28C76F]" style={{ width: '0.24%' }} title="Animations & Assets (120 MB)" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono pt-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
            <span className="text-neutral-300">Images: 600 MB</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
            <span className="text-neutral-300">Videos: 450 MB</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#E5C158]" />
            <span className="text-neutral-300">Documents: 250 MB</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#28C76F]" />
            <span className="text-neutral-300">Animations: 120 MB</span>
          </div>
        </div>
      </div>

      {/* CLOUD PROVIDERS STATUS GRID */}
      <div className="glass-card rounded-2xl border border-white/10 p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2.5">
            <Cloud className="w-5 h-5 text-blue-400" />
            <h3 className="font-poppins font-bold text-sm text-white">
              Multi-Cloud Storage & CDN Synchronization Status
            </h3>
          </div>
          <span className="text-[11px] text-neutral-400 font-mono">4 Providers Configured</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {cloudProviders.map((provider) => (
            <div
              key={provider.id}
              className="glass-card rounded-xl border border-white/10 p-4 bg-black/40 space-y-3 hover:border-blue-500/40 transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="font-bold text-sm text-white">{provider.name}</div>
                <span className="px-2.5 py-0.5 rounded-full bg-[#28C76F]/10 text-[#28C76F] border border-[#28C76F]/30 text-[10px] font-mono font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#28C76F] animate-pulse" />
                  <span>{provider.status.toUpperCase()}</span>
                </span>
              </div>

              <div className="text-xs text-neutral-400">{provider.role}</div>

              <div className="pt-2 border-t border-white/10 text-[11px] font-mono text-neutral-300 space-y-1">
                <div className="flex justify-between">
                  <span className="text-neutral-500">Bucket:</span>
                  <span>{provider.bucketName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Region:</span>
                  <span>{provider.region}</span>
                </div>
                <div className="flex justify-between font-bold text-[#E5C158]">
                  <span>Synced Volume:</span>
                  <span>{provider.used}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* LARGEST FILES TABLE */}
      <div className="glass-card rounded-2xl border border-white/10 p-6 space-y-4">
        <div className="font-poppins font-bold text-sm text-white border-b border-white/10 pb-3">
          Largest Storage Consumers (Top 4)
        </div>

        <div className="space-y-2">
          {largestFiles.map((file, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl bg-black/40 border border-white/10 flex items-center justify-between gap-4 text-xs"
            >
              <div className="flex items-center gap-3">
                <Server className="w-4 h-4 text-[#E5C158] shrink-0" />
                <div>
                  <div className="font-bold text-white">{file.name}</div>
                  <div className="text-[10px] text-neutral-400 font-mono">{file.category} • Uploaded {file.uploaded}</div>
                </div>
              </div>

              <div className="font-mono font-bold text-[#E5C158] bg-white/5 px-2.5 py-1 rounded-lg border border-white/10">
                {file.size}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
