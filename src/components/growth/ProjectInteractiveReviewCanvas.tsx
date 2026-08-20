import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  FileText,
  Presentation,
  CheckCircle2,
  Clock,
  Sparkles,
  MessageSquare,
  Send,
  Download,
  ShieldCheck,
  Zap,
  ArrowRight,
  AlertCircle,
  Plus,
  Trash2,
  Eye,
  Sliders,
  Award,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Lock,
} from 'lucide-react';

interface AnnotationPin {
  id: string;
  xPercent: number;
  yPercent: number;
  comment: string;
  author: string;
  timestamp: string;
  status: 'pending' | 'resolved';
}

interface ProjectInteractiveReviewCanvasProps {
  orderId?: string;
  serviceTitle?: string;
  onApproveProject?: () => void;
  onRequestRevision?: (comments: string[]) => void;
  onShowToast?: (message: string, type?: 'success' | 'error' | 'info' | 'warning') => void;
  onNavigatePage?: (page: string) => void;
}

export const ProjectInteractiveReviewCanvas: React.FC<ProjectInteractiveReviewCanvasProps> = ({
  orderId = 'MFS-ORD-7892',
  serviceTitle = 'Executive 10-Slide Pitch Deck Design',
  onApproveProject,
  onRequestRevision,
  onShowToast,
  onNavigatePage,
}) => {
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);
  const [annotations, setAnnotations] = useState<AnnotationPin[]>([
    {
      id: 'pin-1',
      xPercent: 35,
      yPercent: 28,
      comment: 'Please emphasize the $1.4M seed funding milestone in primary gold text.',
      author: 'Client',
      timestamp: '10:15 AM',
      status: 'resolved',
    },
    {
      id: 'pin-2',
      xPercent: 65,
      yPercent: 62,
      comment: 'Include the 3-year CAGR projection (+48%) on the right chart column.',
      author: 'Client',
      timestamp: '10:22 AM',
      status: 'pending',
    },
  ]);
  const [newCommentText, setNewCommentText] = useState<string>('');
  const [pendingPinCoords, setPendingPinCoords] = useState<{ x: number; y: number } | null>(null);
  const [isApproved, setIsApproved] = useState<boolean>(false);

  // Mock Deliverable Slides / Pages
  const DELIVERABLE_PAGES = [
    {
      id: 'slide-1',
      title: 'Slide 1: Executive Title & Market Thesis',
      tag: 'Executive Overview',
      visualContent: {
        headline: 'Next-Gen Cross-Border Liquidity Infrastructure',
        subhead: 'Bridging institutional capital with sub-second settlement and 85% reduced fee friction.',
        stats: ['$1.4M Seed Raised', '99.99% Uptime', '14 Institutional Partners'],
      },
    },
    {
      id: 'slide-2',
      title: 'Slide 2: Problem & Market Inefficiency',
      tag: 'Problem Validation',
      visualContent: {
        headline: 'Traditional Wire Networks Cost Businesses $48B Annually',
        subhead: 'Legacy correspondent banking introduces 3-5 day settlement latency and opaque 4.2% FX markups.',
        stats: ['3.8 Days Avg Delay', '4.2% Hidden FX Cost', '68% SME Dissatisfaction'],
      },
    },
    {
      id: 'slide-3',
      title: 'Slide 3: Business Model & Unit Economics',
      tag: 'Monetization Moats',
      visualContent: {
        headline: 'Scalable SaaS + 0.15% Protocol Volume Take Rate',
        subhead: 'High net revenue retention (142%) with 82% gross margins and negative churn dynamics.',
        stats: ['82% Gross Margin', '142% Net Retention', '$4.2k ACV'],
      },
    },
  ];

  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isApproved) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setPendingPinCoords({ x: Math.round(x), y: Math.round(y) });
  };

  const handleAddAnnotation = () => {
    if (!newCommentText.trim() || !pendingPinCoords) return;

    const newPin: AnnotationPin = {
      id: `pin-${Date.now()}`,
      xPercent: pendingPinCoords.x,
      yPercent: pendingPinCoords.y,
      comment: newCommentText.trim(),
      author: 'Client',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'pending',
    };

    setAnnotations((prev) => [...prev, newPin]);
    setNewCommentText('');
    setPendingPinCoords(null);
    if (onShowToast) {
      onShowToast('Pinpoint revision request added to deliverable canvas!', 'success');
    }
  };

  const handleDeleteAnnotation = (id: string) => {
    setAnnotations((prev) => prev.filter((pin) => pin.id !== id));
  };

  const handleSubmitAllRevisions = () => {
    const comments = annotations.map((a) => a.comment);
    if (onRequestRevision) {
      onRequestRevision(comments);
    }
    if (onShowToast) {
      onShowToast(`Structured revision request submitted with ${annotations.length} items. Designer assigned!`, 'success');
    }
  };

  const handleApproveDeliverable = () => {
    setIsApproved(true);
    if (onApproveProject) {
      onApproveProject();
    }
    if (onShowToast) {
      onShowToast('Deliverable approved! Master production zip generated.', 'success');
    }
  };

  const activePage = DELIVERABLE_PAGES[activeSlideIndex];

  return (
    <div className="min-h-screen bg-[#050507] text-white pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-neutral-400 mb-6">
          <button
            onClick={() => onNavigatePage ? onNavigatePage('home') : null}
            className="hover:text-[#E5C158] transition-colors cursor-pointer"
          >
            Home
          </button>
          <span>/</span>
          <button
            onClick={() => onNavigatePage ? onNavigatePage('dashboard') : null}
            className="hover:text-[#E5C158] transition-colors cursor-pointer"
          >
            Client Portal
          </button>
          <span>/</span>
          <span className="text-[#E5C158]">Interactive Review Canvas & Annotations</span>
        </div>

        {/* Header Bar */}
        <div className="p-6 rounded-3xl bg-[#0F0F16] border border-white/10 mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono font-bold text-[#E5C158] bg-[#E5C158]/10 px-2.5 py-0.5 rounded-full uppercase">
                {orderId}
              </span>
              <span className="text-xs text-neutral-400">
                • Version 1.2 (Active Production Review)
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold font-poppins text-white">
              {serviceTitle}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            {!isApproved ? (
              <>
                <button
                  onClick={handleSubmitAllRevisions}
                  disabled={annotations.length === 0}
                  className="py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold text-xs border border-white/10 flex items-center gap-2 transition-all cursor-pointer disabled:opacity-50"
                >
                  <MessageSquare className="w-4 h-4 text-[#E5C158]" />
                  <span>Submit Revisions ({annotations.length})</span>
                </button>

                <button
                  onClick={handleApproveDeliverable}
                  className="py-2.5 px-5 rounded-xl bg-gradient-to-r from-[#E5C158] to-[#D4AF37] hover:from-[#F0D27A] hover:to-[#E5C158] text-black font-bold text-xs font-poppins transition-all shadow-lg shadow-[#E5C158]/20 flex items-center gap-2 cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4 text-black" />
                  <span>Approve & Release Master Files</span>
                </button>
              </>
            ) : (
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Project Approved & Finalized</span>
              </div>
            )}
          </div>
        </div>

        {/* Workspace Canvas & Annotations Side-by-Side */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          {/* Left / Center Column: Interactive Visual Canvas */}
          <div className="lg:col-span-8 space-y-4">
            {/* Slide Navigation Controls */}
            <div className="flex items-center justify-between text-xs text-neutral-400 bg-[#0F0F16] p-3 rounded-2xl border border-white/10">
              <span className="font-semibold text-white">
                {activePage.title}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveSlideIndex((prev) => Math.max(0, prev - 1))}
                  disabled={activeSlideIndex === 0}
                  className="p-1.5 rounded-lg bg-[#050507] hover:text-[#E5C158] disabled:opacity-30 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="font-mono text-[#E5C158]">
                  {activeSlideIndex + 1} / {DELIVERABLE_PAGES.length}
                </span>
                <button
                  onClick={() => setActiveSlideIndex((prev) => Math.min(DELIVERABLE_PAGES.length - 1, prev + 1))}
                  disabled={activeSlideIndex === DELIVERABLE_PAGES.length - 1}
                  className="p-1.5 rounded-lg bg-[#050507] hover:text-[#E5C158] disabled:opacity-30 cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Clickable Mockup Stage */}
            <div
              onClick={handleCanvasClick}
              className="relative w-full aspect-video rounded-3xl bg-[#09090F] border-2 border-white/10 hover:border-[#E5C158]/50 transition-all shadow-2xl p-8 sm:p-12 flex flex-col justify-between cursor-crosshair overflow-hidden group select-none"
            >
              {/* Background Luxury Accent */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#E5C158]/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

              {/* Deliverable Mockup Content */}
              <div className="relative z-10 space-y-4">
                <span className="text-[11px] font-bold text-[#E5C158] bg-[#E5C158]/10 border border-[#E5C158]/20 px-3 py-1 rounded-full uppercase tracking-wider inline-block">
                  {activePage.tag}
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black font-poppins text-white leading-tight max-w-2xl">
                  {activePage.visualContent.headline}
                </h2>
                <p className="text-xs sm:text-sm text-neutral-300 max-w-xl leading-relaxed">
                  {activePage.visualContent.subhead}
                </p>
              </div>

              {/* Stats Visualizer Block */}
              <div className="relative z-10 grid grid-cols-3 gap-3 pt-6 border-t border-white/10">
                {activePage.visualContent.stats.map((st, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-[#0F0F16]/90 border border-white/5 text-center">
                    <span className="text-xs sm:text-sm font-bold text-[#E5C158] font-poppins block">
                      {st}
                    </span>
                    <span className="text-[10px] text-neutral-400 uppercase">Verified Metric</span>
                  </div>
                ))}
              </div>

              {/* Render Existing Annotation Pins */}
              {annotations.map((pin, idx) => (
                <div
                  key={pin.id}
                  style={{ left: `${pin.xPercent}%`, top: `${pin.yPercent}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group/pin pointer-events-auto"
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shadow-lg transition-transform group-hover/pin:scale-125 ${
                      pin.status === 'resolved'
                        ? 'bg-emerald-500 text-black shadow-emerald-500/30'
                        : 'bg-[#E5C158] text-black shadow-[#E5C158]/40 animate-pulse'
                    }`}
                  >
                    {idx + 1}
                  </div>

                  {/* Hover Tooltip */}
                  <div className="hidden group-hover/pin:block absolute left-1/2 -translate-x-1/2 bottom-9 w-48 p-2.5 rounded-xl bg-[#161622] border border-white/20 text-white text-[11px] shadow-2xl z-30 pointer-events-none">
                    <span className="font-bold text-[#E5C158] block mb-0.5">
                      Note #{idx + 1} ({pin.timestamp})
                    </span>
                    <p className="text-neutral-200">{pin.comment}</p>
                  </div>
                </div>
              ))}

              {/* Pending Click Pin Indicator */}
              {pendingPinCoords && (
                <div
                  style={{ left: `${pendingPinCoords.x}%`, top: `${pendingPinCoords.y}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none"
                >
                  <div className="w-8 h-8 rounded-full bg-red-500 text-white font-bold text-xs flex items-center justify-center shadow-lg shadow-red-500/50 animate-bounce">
                    +
                  </div>
                </div>
              )}

              {/* Help Overlay Hint */}
              <div className="absolute bottom-3 right-4 z-10 text-[10px] text-neutral-500 font-mono flex items-center gap-1.5 pointer-events-none">
                <Sliders className="w-3 h-3 text-[#E5C158]" />
                <span>Click anywhere on slide canvas to drop pinpoint note</span>
              </div>
            </div>

            {/* Prompt to Type Comment when Pin is dropped */}
            {pendingPinCoords && (
              <div className="p-4 rounded-2xl bg-[#0F0F16] border border-[#E5C158] shadow-xl space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#E5C158] flex items-center gap-1.5">
                    <Plus className="w-4 h-4" />
                    <span>Adding Pinpoint Revision at Coordinates ({pendingPinCoords.x}%, {pendingPinCoords.y}%)</span>
                  </span>
                  <button
                    onClick={() => setPendingPinCoords(null)}
                    className="text-neutral-400 hover:text-red-400 text-xs"
                  >
                    Cancel
                  </button>
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newCommentText}
                    onChange={(e) => setNewCommentText(e.target.value)}
                    placeholder="e.g., Change font to Bold, adjust figure margins, update footnote citation..."
                    className="flex-1 bg-[#050507] border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#E5C158]"
                    autoFocus
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleAddAnnotation();
                    }}
                  />
                  <button
                    onClick={handleAddAnnotation}
                    className="px-4 py-2 rounded-xl bg-[#E5C158] text-black font-bold text-xs hover:bg-[#F0D27A] transition-all cursor-pointer"
                  >
                    Save Note
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Revision Feed & Status List */}
          <div className="lg:col-span-4 p-6 rounded-3xl bg-[#0F0F16] border border-white/10 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <h3 className="text-sm font-bold font-poppins text-white flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-[#E5C158]" />
                <span>Revision Notes & Requests</span>
              </h3>
              <span className="text-xs font-mono text-[#E5C158] font-bold">
                {annotations.length} Pins
              </span>
            </div>

            {/* List of Annotations */}
            <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
              {annotations.length === 0 ? (
                <div className="p-6 rounded-2xl bg-[#08080C] text-center text-xs text-neutral-400">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
                  <span>No active revision notes. Canvas looks pristine! Click the deliverable to add feedback.</span>
                </div>
              ) : (
                annotations.map((pin, idx) => (
                  <div
                    key={pin.id}
                    className="p-3.5 rounded-xl bg-[#08080C] border border-white/5 space-y-2 group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-[#E5C158] text-black text-[10px] font-bold flex items-center justify-center">
                          {idx + 1}
                        </span>
                        <span className="text-[11px] font-bold text-neutral-300">
                          {pin.author} ({pin.timestamp})
                        </span>
                      </div>
                      <button
                        onClick={() => handleDeleteAnnotation(pin.id)}
                        className="text-neutral-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <p className="text-xs text-neutral-300 leading-relaxed pl-7">
                      {pin.comment}
                    </p>

                    <div className="pl-7 flex items-center gap-2">
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                          pin.status === 'resolved'
                            ? 'bg-emerald-500/10 text-emerald-400'
                            : 'bg-[#E5C158]/10 text-[#E5C158]'
                        }`}
                      >
                        {pin.status === 'resolved' ? 'Applied by Designer' : 'Pending Review'}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Quality Safeguards */}
            <div className="pt-4 border-t border-white/5 text-[11px] text-neutral-400 space-y-2">
              <div className="flex items-center gap-1.5 text-neutral-300 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Unlimited Revisions Guarantee</span>
              </div>
              <p>
                All formatting adjustments and typography refinements are processed within 12-24 hours at zero additional cost.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
