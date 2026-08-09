import React, { useState } from 'react';
import { PORTFOLIO_SAMPLES } from '../data/content';
import { Lock, Eye, X, Check, ExternalLink, Sparkles } from 'lucide-react';

interface PortfolioSectionProps {
  onShowToast: (msg: string) => void;
  onOpenOrderModal?: () => void;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({ onShowToast, onOpenOrderModal }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedSample, setSelectedSample] = useState<typeof PORTFOLIO_SAMPLES[0] | null>(null);

  const categories = ['All', 'Presentation Design', 'Assignment Writing', 'Resume Writing', 'Document Formatting', 'Infographics'];

  const filteredSamples = activeCategory === 'All' 
    ? PORTFOLIO_SAMPLES 
    : PORTFOLIO_SAMPLES.filter(s => s.category === activeCategory);

  const handleDownloadClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onShowToast('🔒 Downloads are disabled to protect client confidentiality & copyright.');
  };

  return (
    <section id="portfolio" className="py-24 relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="font-poppins text-xs font-bold uppercase tracking-widest text-[#E5C158] inline-block bg-[#E5C158]/10 border border-[#E5C158]/20 px-3 py-1 rounded-full">
            OUR COMPLETED WORK
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-poppins text-white">
            Client Work <span className="gold-pure-gradient">Showcase</span>
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            Explore authentic preview samples of custom presentation decks, academic papers, ATS resumes, and corporate document formatting.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#E5C158] text-black shadow-[0_0_15px_rgba(229,193,88,0.3)]'
                  : 'bg-white/[0.03] text-neutral-400 hover:text-white border border-white/5 hover:border-white/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Portfolio Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSamples.map((sample) => (
            <div
              key={sample.id}
              onClick={() => setSelectedSample(sample)}
              onContextMenu={handleDownloadClick}
              className="glass-card glass-card-hover rounded-2xl overflow-hidden border border-white/10 hover:border-[#E5C158]/40 cursor-pointer group flex flex-col justify-between transition-all duration-300"
            >
              <div>
                {/* Image Thumbnail Canvas */}
                <div className="w-full h-52 relative overflow-hidden bg-neutral-900">
                  <img
                    src={sample.image}
                    alt={sample.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050507] via-transparent to-transparent opacity-80" />

                  {/* Watermark Protection Tag */}
                  <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md border border-white/10 px-2.5 py-1 rounded-lg text-[10px] text-neutral-300 font-semibold flex items-center gap-1.5">
                    <Lock className="w-3 h-3 text-[#E5C158]" />
                    <span>Watermarked Preview</span>
                  </div>

                  {/* Category Pill */}
                  <div className="absolute top-3 right-3 bg-[#E5C158] text-black px-2.5 py-1 rounded-lg text-[10px] font-bold">
                    {sample.category}
                  </div>

                  {/* Quick View Hover Button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-xs">
                    <span className="px-4 py-2 rounded-xl bg-[#E5C158] text-black text-xs font-bold flex items-center gap-1.5 shadow-lg">
                      <Eye className="w-3.5 h-3.5" />
                      <span>Quick View Specs</span>
                    </span>
                  </div>
                </div>

                {/* Card Meta Info */}
                <div className="p-5 space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#E5C158] bg-[#E5C158]/10 border border-[#E5C158]/20 px-2 py-0.5 rounded">
                    {sample.clientType}
                  </span>
                  <h3 className="font-poppins font-bold text-white text-base group-hover:text-[#E5C158] transition-colors leading-snug">
                    {sample.title}
                  </h3>
                  <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                    {sample.summary}
                  </p>
                </div>
              </div>

              {/* Footer Scope Specs */}
              <div className="px-5 py-3 border-t border-white/5 bg-white/[0.01] flex items-center justify-between text-[11px] text-neutral-400 font-mono">
                <span>{sample.scope}</span>
                <span className="text-[#E5C158] font-bold">{sample.tools}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Quick View Modal */}
        {selectedSample && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
            <div className="bg-[#0F0F12] border-2 border-[#E5C158]/40 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl relative space-y-0">
              
              {/* Modal Header */}
              <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#E5C158]/10 text-[#E5C158] flex items-center justify-center font-bold">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-[#E5C158] uppercase tracking-wider block">
                      {selectedSample.category} • {selectedSample.clientType}
                    </span>
                    <h3 className="font-poppins font-bold text-white text-lg">
                      {selectedSample.title}
                    </h3>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedSample(null)}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Image Preview Area */}
              <div className="relative h-64 bg-black overflow-hidden border-b border-white/10">
                <img
                  src={selectedSample.image}
                  alt={selectedSample.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F12] via-transparent to-transparent" />
                
                {/* Diagonal Watermark Text overlay */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-25">
                  <span className="text-4xl font-extrabold font-poppins text-white uppercase tracking-widest -rotate-12 select-none">
                    MFS GROWTH PREVIEW
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs bg-black/80 backdrop-blur-md p-3 rounded-xl border border-white/10 text-neutral-300">
                  <span className="flex items-center gap-1.5 text-[#E5C158]">
                    <Lock className="w-3.5 h-3.5" />
                    Protected Client Deliverable
                  </span>
                  <span>Direct downloads restricted</span>
                </div>
              </div>

              {/* Modal Details Body */}
              <div className="p-6 space-y-4">
                <p className="text-sm text-neutral-300 leading-relaxed">
                  {selectedSample.summary}
                </p>

                <div className="grid grid-cols-2 gap-3 text-xs bg-white/[0.02] p-4 rounded-2xl border border-white/5 font-mono">
                  <div>
                    <span className="text-neutral-500 block text-[10px] uppercase">Deliverable Scope</span>
                    <span className="text-white font-bold">{selectedSample.scope}</span>
                  </div>
                  <div>
                    <span className="text-neutral-500 block text-[10px] uppercase">Software & Formats</span>
                    <span className="text-[#E5C158] font-bold">{selectedSample.tools}</span>
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    onClick={() => {
                      setSelectedSample(null);
                      if (onOpenOrderModal) onOpenOrderModal();
                    }}
                    className="w-full sm:flex-1 py-3.5 rounded-xl bg-[#E5C158] text-black font-extrabold text-xs hover:bg-[#fce888] transition-colors cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Order Similar Project</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={handleDownloadClick}
                    className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-white/5 border border-white/10 text-neutral-400 hover:text-white text-xs font-bold transition-colors cursor-pointer"
                  >
                    Attempt Download
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
