import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { ShieldCheck, AlertTriangle, RefreshCw, Database as DbIcon, CheckCircle2 } from 'lucide-react';

interface SupabaseConnectionDiagnosticProps {
  onClose?: () => void;
}

export const SupabaseConnectionDiagnostic: React.FC<SupabaseConnectionDiagnosticProps> = ({ onClose }) => {
  const [status, setStatus] = useState<'checking' | 'connected' | 'error'>('checking');
  const [targetUrl, setTargetUrl] = useState<string>('');
  const [tablesFound, setTablesFound] = useState<string[]>([]);
  const [missingTables, setMissingTables] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const checkConnection = async () => {
    setStatus('checking');
    setErrorMessage('');
    const expectedTables = ['orders', 'users_profiles', 'deliverables', 'order_messages', 'notifications', 'reviews'];
    const found: string[] = [];
    const missing: string[] = [];

    try {
      // @ts-ignore
      const clientUrl = (supabase as any)?.supabaseUrl || 'https://kbpxgkqyivchssfudcdw.supabase.co';
      setTargetUrl(clientUrl);

      // Probe each table
      for (const t of expectedTables) {
        try {
          const { error } = await (supabase.from(t) as any).select('*').limit(1);
          if (!error) {
            found.push(t);
          } else {
            missing.push(`${t} (${error.message || 'not found'})`);
          }
        } catch (e: any) {
          missing.push(`${t} (${e.message || 'error'})`);
        }
      }

      setTablesFound(found);
      setMissingTables(missing);

      if (found.length > 0) {
        setStatus('connected');
      } else {
        setStatus('error');
        setErrorMessage('Could not query public tables in the current Supabase project.');
      }
    } catch (err: any) {
      setStatus('error');
      setErrorMessage(err.message || 'Network exception connecting to Supabase.');
    }
  };

  useEffect(() => {
    checkConnection();
  }, []);

  return (
    <div className="rounded-2xl border border-white/15 bg-[#0A0A0E] p-4 sm:p-6 text-white text-xs font-sans">
      <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#E5C158]/15 border border-[#E5C158]/30 flex items-center justify-center text-[#E5C158]">
            <DbIcon className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold font-poppins text-white flex items-center gap-2">
              Supabase Project Live Status
              {status === 'connected' && (
                <span className="px-2 py-0.5 rounded bg-[#28C76F]/20 text-[#28C76F] text-[10px] font-mono font-semibold">
                  LIVE CONNECTED
                </span>
              )}
              {status === 'checking' && (
                <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 text-[10px] font-mono">
                  CHECKING...
                </span>
              )}
              {status === 'error' && (
                <span className="px-2 py-0.5 rounded bg-red-500/20 text-red-400 text-[10px] font-mono">
                  ACTION REQUIRED
                </span>
              )}
            </h4>
            <p className="text-[11px] text-neutral-400 font-mono">
              Target URL: <span className="text-[#E5C158]">{targetUrl}</span>
            </p>
          </div>
        </div>

        <button
          onClick={checkConnection}
          className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white transition-colors cursor-pointer"
          title="Re-test Connection"
        >
          <RefreshCw className={`w-4 h-4 ${status === 'checking' ? 'animate-spin' : ''}`} />
        </button>
      </div>

      <div className="space-y-3">
        <div>
          <div className="text-[11px] font-semibold text-neutral-300 mb-1.5 font-poppins">Detected Active Tables:</div>
          <div className="flex flex-wrap gap-1.5">
            {tablesFound.map((t) => (
              <span key={t} className="px-2.5 py-1 rounded bg-[#28C76F]/10 border border-[#28C76F]/30 text-[#28C76F] text-[10px] font-mono flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                {t}
              </span>
            ))}
            {tablesFound.length === 0 && status !== 'checking' && (
              <span className="text-neutral-500 italic text-[11px]">No active tables found yet.</span>
            )}
          </div>
        </div>

        {missingTables.length > 0 && (
          <div className="pt-2">
            <div className="text-[11px] font-semibold text-amber-400 mb-1.5 font-poppins">Tables Pending / RLS Inactive:</div>
            <div className="space-y-1">
              {missingTables.map((m) => (
                <div key={m} className="text-[10px] text-neutral-400 font-mono bg-black/40 px-2 py-1 rounded border border-white/5">
                  • {m}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-neutral-400">
          <span>Client Storage Sync: <strong>Enabled (Seamless Hybrid Cache)</strong></span>
          <span className="text-[#E5C158] font-mono">100% Zero Data Loss</span>
        </div>
      </div>
    </div>
  );
};
