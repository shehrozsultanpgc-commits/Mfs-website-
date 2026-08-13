import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  CheckCircle2, 
  Server, 
  Wifi, 
  ShieldCheck, 
  Globe, 
  RefreshCw, 
  Eye, 
  EyeOff, 
  X, 
  Zap, 
  Database,
  ArrowLeft,
  Lock
} from 'lucide-react';
import { MFSLogo } from '../../components/common/MFSLogo';
import { useAuth } from '../../context/AuthContext';

interface AdminLoginProps {
  onLoginSuccess: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess }) => {
  const { setDemoUserRole } = useAuth();
  
  // Secret PIN Trapdoor Modal State
  const [isPinModalOpen, setIsPinModalOpen] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [pinError, setPinError] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);

  // Live time for decoy status page
  const [lastRefreshed, setLastRefreshed] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setLastRefreshed(now.toUTCString());
    };
    updateTime();
    const interval = setInterval(updateTime, 15000);
    return () => clearInterval(interval);
  }, []);

  const handleLogoClick = () => {
    setPinError(null);
    setPinInput('');
    setIsPinModalOpen(true);
  };

  const handleVerifyPin = (e: React.FormEvent) => {
    e.preventDefault();
    setPinError(null);
    setIsVerifying(true);

    const masterPin = import.meta.env.VITE_ADMIN_PIN || '03116191234';

    setTimeout(() => {
      const cleanedInput = pinInput.trim();
      if (cleanedInput === '03116191234' || cleanedInput === masterPin || cleanedInput === '112364') {
        sessionStorage.setItem('adminPinVerified', 'true');
        setDemoUserRole('super_admin');
        setIsVerifying(false);
        setIsPinModalOpen(false);
        onLoginSuccess();
      } else {
        setPinError('Access Denied: Invalid Security PIN.');
        setIsVerifying(false);
      }
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#050507] text-white flex flex-col font-sans selection:bg-[#E5C158]/30 selection:text-[#E5C158]">
      {/* Decoy Public Status Header */}
      <header className="border-b border-[#1A1A22] bg-[#0A0A0F]/80 backdrop-blur-md sticky top-0 z-40 px-4 sm:px-8 py-3 flex items-center justify-between">
        <div 
          onClick={handleLogoClick}
          className="flex items-center gap-3 cursor-pointer group select-none py-1 px-2 rounded-xl hover:bg-white/[0.03] transition-colors"
          title="MFS Growth System Status"
        >
          <MFSLogo size={34} className="group-hover:scale-105 transition-transform duration-200" />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-white font-bold text-sm tracking-tight group-hover:text-[#E5C158] transition-colors">
                MFS GROWTH AGENCY
              </span>
              <span className="text-[9px] bg-[#E5C158]/10 text-[#E5C158] border border-[#E5C158]/30 px-1.5 py-0.5 rounded font-mono uppercase tracking-wider">
                System Status
              </span>
            </div>
            <span className="text-[10px] text-neutral-400 block font-mono">
              Global Infrastructure Network Diagnostics
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 sm:gap-6">
          <div className="hidden sm:flex items-center gap-2 text-xs text-neutral-400 font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>100% Operational</span>
          </div>

          <a
            href="/"
            className="flex items-center gap-1.5 text-xs text-neutral-300 hover:text-[#E5C158] transition-colors bg-[#1A1A22] hover:bg-[#23232F] border border-white/10 px-3 py-1.5 rounded-lg font-medium"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Main Website</span>
          </a>
        </div>
      </header>

      {/* Main Decoy Body */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-8 py-8 space-y-8">
        {/* Banner Section */}
        <div className="bg-gradient-to-r from-[#0F0F16] via-[#14141F] to-[#0F0F16] border border-[#232332] rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#E5C158]/5 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>All Global Nodes Healthy</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Public Infrastructure & Network Diagnostics
              </h1>
              <p className="text-xs sm:text-sm text-neutral-400 max-w-2xl">
                Real-time telemetry, edge network response rates, API availability, and system uptime metrics across MFS Growth Agency international server clusters.
              </p>
            </div>

            <div className="text-left sm:text-right font-mono text-xs text-neutral-400 space-y-1 bg-[#0A0A0F]/60 p-3 rounded-xl border border-white/5">
              <div className="text-[10px] text-neutral-500 uppercase tracking-widest">Last Network Telemetry Update</div>
              <div className="text-white font-semibold">{lastRefreshed || 'Syncing UTC...'}</div>
              <div className="text-[10px] text-emerald-400 flex items-center justify-start sm:justify-end gap-1">
                <RefreshCw className="w-3 h-3 animate-spin" />
                <span>Auto-refreshed every 15s</span>
              </div>
            </div>
          </div>
        </div>

        {/* System Health Overview Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-[#0F0F16] border border-[#232332] rounded-xl p-4 space-y-1.5">
            <div className="flex items-center justify-between text-neutral-400 text-xs font-mono">
              <span>Overall Uptime</span>
              <Activity className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-bold text-white font-mono">99.99%</div>
            <div className="text-[10px] text-neutral-500">30-Day SLA Standard</div>
          </div>

          <div className="bg-[#0F0F16] border border-[#232332] rounded-xl p-4 space-y-1.5">
            <div className="flex items-center justify-between text-neutral-400 text-xs font-mono">
              <span>API Latency</span>
              <Zap className="w-4 h-4 text-[#E5C158]" />
            </div>
            <div className="text-2xl font-bold text-[#E5C158] font-mono">14 ms</div>
            <div className="text-[10px] text-neutral-500">Global Edge Average</div>
          </div>

          <div className="bg-[#0F0F16] border border-[#232332] rounded-xl p-4 space-y-1.5">
            <div className="flex items-center justify-between text-neutral-400 text-xs font-mono">
              <span>Active Clusters</span>
              <Server className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-2xl font-bold text-white font-mono">12 / 12</div>
            <div className="text-[10px] text-neutral-500">100% Online</div>
          </div>

          <div className="bg-[#0F0F16] border border-[#232332] rounded-xl p-4 space-y-1.5">
            <div className="flex items-center justify-between text-neutral-400 text-xs font-mono">
              <span>Security Shield</span>
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-bold text-emerald-400 font-mono">TLS 1.3</div>
            <div className="text-[10px] text-neutral-500">Encrypted (RSA 4096-bit)</div>
          </div>
        </div>

        {/* Public Services Table */}
        <div className="bg-[#0F0F16] border border-[#232332] rounded-2xl overflow-hidden shadow-xl">
          <div className="p-5 border-b border-[#1A1A26] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Database className="w-4 h-4 text-[#E5C158]" />
              <h2 className="text-sm font-bold text-white tracking-wide">
                Agency Service Health Matrix
              </h2>
            </div>
            <span className="text-xs text-neutral-500 font-mono">All Systems Green</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#141420] text-neutral-400 font-mono text-[11px] border-b border-[#232332]">
                  <th className="py-3 px-5">Service Component</th>
                  <th className="py-3 px-5">Operational Status</th>
                  <th className="py-3 px-5">Avg Response</th>
                  <th className="py-3 px-5 text-right">Uptime Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1A1A26] text-neutral-300">
                <tr className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3.5 px-5 font-semibold text-white">Core Web Application Platform</td>
                  <td className="py-3.5 px-5">
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[11px] font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                      Operational
                    </span>
                  </td>
                  <td className="py-3.5 px-5 font-mono text-neutral-400">12 ms</td>
                  <td className="py-3.5 px-5 font-mono text-right text-white">99.99%</td>
                </tr>

                <tr className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3.5 px-5 font-semibold text-white">MFS AI Assistant & Voice Gateway</td>
                  <td className="py-3.5 px-5">
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[11px] font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                      Operational
                    </span>
                  </td>
                  <td className="py-3.5 px-5 font-mono text-neutral-400">24 ms</td>
                  <td className="py-3.5 px-5 font-mono text-right text-white">100.0%</td>
                </tr>

                <tr className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3.5 px-5 font-semibold text-white">File Vault & Document Processing</td>
                  <td className="py-3.5 px-5">
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[11px] font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                      Operational
                    </span>
                  </td>
                  <td className="py-3.5 px-5 font-mono text-neutral-400">18 ms</td>
                  <td className="py-3.5 px-5 font-mono text-right text-white">99.98%</td>
                </tr>

                <tr className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3.5 px-5 font-semibold text-white">EasyPaisa & JazzCash Payment Webhooks</td>
                  <td className="py-3.5 px-5">
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[11px] font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                      Operational
                    </span>
                  </td>
                  <td className="py-3.5 px-5 font-mono text-neutral-400">8 ms</td>
                  <td className="py-3.5 px-5 font-mono text-right text-white">100.0%</td>
                </tr>

                <tr className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3.5 px-5 font-semibold text-white">Automated Order Dispatcher & Alerts</td>
                  <td className="py-3.5 px-5">
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[11px] font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                      Operational
                    </span>
                  </td>
                  <td className="py-3.5 px-5 font-mono text-neutral-400">11 ms</td>
                  <td className="py-3.5 px-5 font-mono text-right text-white">100.0%</td>
                </tr>

                <tr className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3.5 px-5 font-semibold text-white">Analytics & Performance Diagnostics</td>
                  <td className="py-3.5 px-5">
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[11px] font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                      Operational
                    </span>
                  </td>
                  <td className="py-3.5 px-5 font-mono text-neutral-400">15 ms</td>
                  <td className="py-3.5 px-5 font-mono text-right text-white">99.95%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Global Edge Node Latencies */}
        <div className="bg-[#0F0F16] border border-[#232332] rounded-2xl p-5 space-y-4 shadow-xl">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-cyan-400" />
            <h2 className="text-sm font-bold text-white tracking-wide">
              Global CDN Edge Regions
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 font-mono text-xs">
            <div className="bg-[#141420] border border-white/5 rounded-xl p-3 text-center space-y-1">
              <div className="text-neutral-400 text-[10px]">Karachi (KHI-01)</div>
              <div className="text-emerald-400 font-bold">6 ms</div>
              <div className="text-[9px] text-neutral-500">Operational</div>
            </div>

            <div className="bg-[#141420] border border-white/5 rounded-xl p-3 text-center space-y-1">
              <div className="text-neutral-400 text-[10px]">Lahore (LHE-01)</div>
              <div className="text-emerald-400 font-bold">8 ms</div>
              <div className="text-[9px] text-neutral-500">Operational</div>
            </div>

            <div className="bg-[#141420] border border-white/5 rounded-xl p-3 text-center space-y-1">
              <div className="text-neutral-400 text-[10px]">Frankfurt (FRA)</div>
              <div className="text-emerald-400 font-bold">28 ms</div>
              <div className="text-[9px] text-neutral-500">Operational</div>
            </div>

            <div className="bg-[#141420] border border-white/5 rounded-xl p-3 text-center space-y-1">
              <div className="text-neutral-400 text-[10px]">Singapore (SIN)</div>
              <div className="text-emerald-400 font-bold">32 ms</div>
              <div className="text-[9px] text-neutral-500">Operational</div>
            </div>

            <div className="bg-[#141420] border border-white/5 rounded-xl p-3 text-center space-y-1">
              <div className="text-neutral-400 text-[10px]">London (LHR)</div>
              <div className="text-emerald-400 font-bold">35 ms</div>
              <div className="text-[9px] text-neutral-500">Operational</div>
            </div>

            <div className="bg-[#141420] border border-white/5 rounded-xl p-3 text-center space-y-1">
              <div className="text-neutral-400 text-[10px]">New York (JFK)</div>
              <div className="text-emerald-400 font-bold">42 ms</div>
              <div className="text-[9px] text-neutral-500">Operational</div>
            </div>
          </div>
        </div>

        {/* Maintenance Log */}
        <div className="bg-[#0F0F16] border border-[#232332] rounded-xl p-4 flex items-center justify-between text-xs text-neutral-400">
          <div className="flex items-center gap-2">
            <Wifi className="w-4 h-4 text-emerald-400" />
            <span>Scheduled Maintenance: No active or upcoming maintenance windows.</span>
          </div>
          <span className="font-mono text-[10px] text-neutral-500">Status ID: #MFS-NET-OPERATIONAL</span>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#1A1A22] py-6 px-4 text-center text-xs text-neutral-500 font-mono">
        <p>© 2026 MFS Growth Agency • Infrastructure Operations & Health Diagnostics</p>
      </footer>

      {/* SECRET MASTER PIN TRAPDOOR MODAL */}
      {isPinModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div 
            className="max-w-sm w-full bg-[#0F0F14] border border-[#232332] rounded-2xl p-6 text-center space-y-5 shadow-2xl relative animate-in fade-in zoom-in duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsPinModalOpen(false)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white transition-colors cursor-pointer p-1"
              title="Close"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-12 h-12 bg-[#E5C158]/10 border border-[#E5C158]/30 rounded-full flex items-center justify-center mx-auto text-[#E5C158]">
              <Lock className="w-6 h-6" />
            </div>

            <div>
              <h3 className="text-base font-bold text-white mb-1">
                Security Clearance
              </h3>
              <p className="text-xs text-neutral-400">
                Enter Master Authorization PIN to continue.
              </p>
            </div>

            {pinError && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs p-2.5 rounded-lg text-left font-mono">
                {pinError}
              </div>
            )}

            <form onSubmit={handleVerifyPin} className="space-y-4">
              <div className="relative">
                <input
                  type={showPin ? 'text' : 'password'}
                  required
                  autoFocus
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  placeholder="Master PIN"
                  className="w-full bg-[#1A1A1F] border border-[#2A2B35] rounded-xl px-4 py-3 text-center tracking-[0.25em] text-white placeholder-gray-600 focus:outline-none focus:border-[#E5C158] transition-colors text-base font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPin(!showPin)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white transition-colors cursor-pointer p-1"
                  title={showPin ? 'Hide PIN' : 'Show PIN'}
                >
                  {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsPinModalOpen(false)}
                  className="w-1/2 bg-[#1A1A22] text-neutral-300 font-medium py-2.5 px-3 rounded-xl hover:bg-[#23232F] transition-colors text-xs cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isVerifying || !pinInput.trim()}
                  className="w-1/2 bg-[#E5C158] text-black font-bold py-2.5 px-3 rounded-xl hover:bg-[#D4AF37] transition-colors text-xs uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2"
                >
                  {isVerifying ? (
                    <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    'Verify PIN'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};


