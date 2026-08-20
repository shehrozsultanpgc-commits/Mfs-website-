import React from 'react';
import { Image, ShieldCheck, Sparkles, Download, ExternalLink, Check } from 'lucide-react';

export const BrandAssetVisualGallery: React.FC = () => {
  return (
    <div className="w-full rounded-3xl border border-white/10 bg-[#07070A] p-6 sm:p-8 relative overflow-hidden font-sans my-10">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4 mb-6">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#E5C158]/15 border border-[#E5C158]/30 flex items-center justify-center text-[#E5C158]">
            <Image className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold font-poppins text-white flex items-center gap-2">
              Official Media &amp; Brand Visual Assets
              <span className="text-[10px] px-2 py-0.5 rounded bg-[#E5C158]/15 text-[#E5C158] font-mono">
                GOOGLE IMAGE INDEXED
              </span>
            </h3>
            <p className="text-[11px] text-neutral-400">
              High-resolution vector marks, official emblems, and brand visual identity assets.
            </p>
          </div>
        </div>
        <div className="text-xs font-mono text-neutral-400 flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-[#28C76F]" />
          <span>Brand Protection Active</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Asset 1: Primary Brand Card */}
        <div className="rounded-2xl border border-white/10 bg-black/50 p-4 space-y-3 hover:border-[#E5C158]/40 transition-colors">
          <div className="w-full aspect-[16/9] rounded-xl overflow-hidden bg-[#0A0A0F] border border-white/5 relative flex items-center justify-center">
            <img
              src="/og-image.svg"
              alt="MFS Growth Agency - Official Executive Digital Agency & Leadership"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div>
            <span className="text-[10px] font-mono text-[#E5C158] font-semibold block uppercase">
              Primary Brand Visual Card (1200x630)
            </span>
            <h4 className="text-xs font-bold text-white font-poppins">
              MFS Growth Agency Official Header
            </h4>
            <p className="text-[11px] text-neutral-400 mt-1">
              Used in Google Image Knowledge Cards and OpenGraph social shares.
            </p>
          </div>
        </div>

        {/* Asset 2: Gold Shield Emblem */}
        <div className="rounded-2xl border border-white/10 bg-black/50 p-4 space-y-3 hover:border-[#E5C158]/40 transition-colors">
          <div className="w-full aspect-[16/9] rounded-xl overflow-hidden bg-[#0A0A0F] border border-white/5 relative flex items-center justify-center p-4">
            <img
              src="/android-chrome-512x512.png"
              alt="MFS Growth Agency Official Gold Shield Emblem"
              className="w-24 h-24 object-contain drop-shadow-[0_4px_15px_rgba(229,193,88,0.3)]"
              loading="lazy"
            />
          </div>
          <div>
            <span className="text-[10px] font-mono text-[#28C76F] font-semibold block uppercase">
              Brand Shield Emblem (512x512)
            </span>
            <h4 className="text-xs font-bold text-white font-poppins">
              Official MFS Golden Crest
            </h4>
            <p className="text-[11px] text-neutral-400 mt-1">
              Symbolizing high precision, digital excellence, and verified growth.
            </p>
          </div>
        </div>

        {/* Asset 3: MFS Master Vector Symbol */}
        <div className="rounded-2xl border border-white/10 bg-black/50 p-4 space-y-3 hover:border-[#E5C158]/40 transition-colors sm:col-span-2 lg:col-span-1">
          <div className="w-full aspect-[16/9] rounded-xl overflow-hidden bg-[#0A0A0F] border border-white/5 relative flex items-center justify-center p-4">
            <img
              src="/mfs-brand-mark.svg"
              alt="MFS Growth Agency Hexa-Matrix Vector Mark"
              className="w-20 h-20 object-contain drop-shadow-[0_4px_15px_rgba(229,193,88,0.3)]"
              loading="lazy"
            />
          </div>
          <div>
            <span className="text-[10px] font-mono text-[#E5C158] font-semibold block uppercase">
              MFS Hexa-Matrix Vector Mark
            </span>
            <h4 className="text-xs font-bold text-white font-poppins">
              Official MFS Emblem Identity
            </h4>
            <p className="text-[11px] text-neutral-400 mt-1">
              The pure gold 3D isometric Hexa-Matrix emblem with floating core cube for all digital touchpoints.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
