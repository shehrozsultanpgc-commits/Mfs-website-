import React, { useState, useEffect, useRef } from 'react';
import { Currency } from '../types';
import {
  Play,
  Pause,
  RotateCcw,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  X,
  Sparkles,
  Bot,
  Award,
  CheckCircle2,
  Clock,
  Download,
  FileText,
  Share2,
  PhoneCall,
  Briefcase,
  FileCheck,
  Layers,
  UserCheck,
  Zap,
  ShieldCheck,
  Eye,
  RefreshCw,
  Building2,
  ChevronRight,
  TrendingUp
} from 'lucide-react';

interface ProjectJourneyMovieProps {
  currency: Currency;
  customerName?: string;
  projectId?: string;
  onClose: () => void;
  onShowToast?: (msg: string) => void;
}

interface MovieStage {
  id: number;
  chapter: string;
  title: string;
  timestamp: string;
  dept: string;
  status: 'completed' | 'active' | 'upcoming';
  desc: string;
  aiNarration: string;
  icon: React.ElementType;
  isMilestone: boolean;
  celebrationType?: 'gold_glow' | 'confetti' | 'shield_burst';
}

export const ProjectJourneyMovie: React.FC<ProjectJourneyMovieProps> = ({
  currency,
  customerName = 'Shehroz Sultan',
  projectId = 'PRJ-MFS-849201',
  onClose,
  onShowToast,
}) => {
  // Movie States
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<1 | 1.5 | 2>(1);
  const [isMuted, setIsMuted] = useState(false);
  const [hasStartedMovie, setHasStartedMovie] = useState(false);
  const [isMovieFinished, setIsMovieFinished] = useState(false);
  const [typedNarration, setTypedNarration] = useState('');
  const [showCelebration, setShowCelebration] = useState(false);

  // Movie Chapters & Stages Data (Pure authentic project records)
  const movieStages: MovieStage[] = [
    {
      id: 1,
      chapter: 'CHAPTER 1: ORDER INGESTION',
      title: 'Order Registration & Guidelines Ingested',
      timestamp: 'Today • 09:30 AM PKT',
      dept: 'Order Management Desk',
      status: 'completed',
      desc: 'Order PRJ-MFS-849201 successfully registered. 10-Slide Executive Presentation deck configured with 50% Grand Launch Discount.',
      aiNarration: `Welcome ${customerName}. Your project PRJ-MFS-849201 was registered in our system. MFS AI ingested source documents and locked executive design tokens.`,
      icon: Briefcase,
      isMilestone: false,
    },
    {
      id: 2,
      chapter: 'CHAPTER 2: FINANCIAL VERIFICATION',
      title: 'Payment Confirmed & Official Tax Invoice Issued',
      timestamp: 'Today • 09:45 AM PKT',
      dept: 'Finance & Billing Unit',
      status: 'completed',
      desc: 'Payment of PKR 2,500 verified via EasyPaisa (03116191234). Official tax invoice #INV-849201 generated.',
      aiNarration: 'Financial scanner matched transaction ID 03116191234 with 100% accuracy. Tax invoice #INV-849201 was attached to your client account.',
      icon: FileCheck,
      isMilestone: true,
      celebrationType: 'gold_glow',
    },
    {
      id: 3,
      chapter: 'CHAPTER 3: CREATIVE BRIEF',
      title: 'Design Requirements & Typographic Scale Locked',
      timestamp: 'Today • 10:00 AM PKT',
      dept: 'Creative Direction',
      status: 'completed',
      desc: 'Dark luxury theme selected. Primary gold palette (#E5C158) paired with Poppins headers and Inter body typography.',
      aiNarration: 'Our creative director reviewed your brief and locked the gold color tokens. WCAG AA accessibility standards applied.',
      icon: Layers,
      isMilestone: false,
    },
    {
      id: 4,
      chapter: 'CHAPTER 4: TEAM ALLOCATION',
      title: 'Senior Presentation Specialist Assigned',
      timestamp: 'Today • 10:15 AM PKT',
      dept: 'Design Division Team A',
      status: 'completed',
      desc: 'Lead Presentation Designer allocated alongside MFS AI Real-Time Quality Assistant for continuous linting.',
      aiNarration: 'Senior Presentation Specialist allocated to your project with a guaranteed 24-hour express lead time.',
      icon: UserCheck,
      isMilestone: false,
    },
    {
      id: 5,
      chapter: 'CHAPTER 5: WIREFRAME & RESEARCH',
      title: 'Slide Outlines & Visual Structure Completed',
      timestamp: 'Today • 11:30 AM PKT',
      dept: 'Content & Strategy',
      status: 'completed',
      desc: 'Slides 1 to 5 wireframed with executive summaries, metric callouts, and clean vector visual layouts.',
      aiNarration: 'Research phase completed. Slides 1 through 5 wireframed with high-contrast data visualization blocks.',
      icon: Sparkles,
      isMilestone: false,
    },
    {
      id: 6,
      chapter: 'CHAPTER 6: ACTIVE PRODUCTION',
      title: 'Slide 7 Typography & Gold Accent Polish',
      timestamp: 'Today • 02:00 PM PKT',
      dept: 'Senior Design Lab',
      status: 'active',
      desc: 'Currently applying mathematical spacing, 1.333 scale ratios, and gold token accents to financial forecast charts.',
      aiNarration: 'Active Production Stage. Senior design team is finalizing slide 7 contrast for high-impact executive readability.',
      icon: Zap,
      isMilestone: true,
      celebrationType: 'shield_burst',
    },
    {
      id: 7,
      chapter: 'CHAPTER 7: COMPLIANCE AUDIT',
      title: 'Automated 12-Point AI Quality Scan',
      timestamp: 'Scheduled • Today 06:00 PM',
      dept: 'Quality Assurance & Audit',
      status: 'upcoming',
      desc: 'Automated pre-flight check verifying vector resolution, font embedding, and transition smoothness.',
      aiNarration: 'Pre-flight check scheduled. AI scanner will verify 100% compliance with client specifications before draft release.',
      icon: ShieldCheck,
      isMilestone: false,
    },
    {
      id: 8,
      chapter: 'CHAPTER 8: CLIENT PREVIEW',
      title: 'Watermarked Draft Upload & Client Review',
      timestamp: 'Scheduled • Tomorrow 02:00 PM',
      dept: 'Client Experience Desk',
      status: 'upcoming',
      desc: 'Watermarked PDF draft uploaded to Client Dashboard for instant preview and feedback approval.',
      aiNarration: 'Watermarked preview deck will be dispatched directly to your client portal for one-click approval or revision request.',
      icon: Eye,
      isMilestone: false,
    },
    {
      id: 9,
      chapter: 'CHAPTER 9: FINAL PACKAGING',
      title: 'High-Definition Deliverables Packaging',
      timestamp: 'Scheduled • Tomorrow 06:00 PM',
      dept: 'Dispatch Unit',
      status: 'upcoming',
      desc: 'Editable PowerPoint (.pptx), PDF document, and high-res slide assets uploaded to Files Hub.',
      aiNarration: 'Final stage. HD editable PowerPoint slides and PDF assets packed with full commercial rights unlocked.',
      icon: Award,
      isMilestone: true,
      celebrationType: 'confetti',
    },
  ];

  const currentStage = movieStages[currentStepIndex];

  // Typewriter effect for AI narration
  useEffect(() => {
    if (!hasStartedMovie) return;
    setTypedNarration('');
    let index = 0;
    const fullText = currentStage.aiNarration;

    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setTypedNarration(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 20 / playbackSpeed);

    // Trigger milestone celebration effect if applicable
    if (currentStage.isMilestone) {
      setShowCelebration(true);
      const celebTimer = setTimeout(() => setShowCelebration(false), 2500);
      return () => clearTimeout(celebTimer);
    } else {
      setShowCelebration(false);
    }

    return () => clearInterval(timer);
  }, [currentStepIndex, hasStartedMovie, playbackSpeed]);

  // Automatic Movie Step Progression when playing
  useEffect(() => {
    if (!isPlaying || !hasStartedMovie || isMovieFinished) return;

    const stepDuration = 5000 / playbackSpeed;
    const interval = setInterval(() => {
      setCurrentStepIndex((prev) => {
        if (prev < movieStages.length - 1) {
          return prev + 1;
        } else {
          setIsPlaying(false);
          setIsMovieFinished(true);
          return prev;
        }
      });
    }, stepDuration);

    return () => clearInterval(interval);
  }, [isPlaying, hasStartedMovie, currentStepIndex, playbackSpeed, isMovieFinished]);

  const handleStartMovie = () => {
    setHasStartedMovie(true);
    setIsPlaying(true);
    setCurrentStepIndex(0);
    setIsMovieFinished(false);
  };

  const handleNext = () => {
    if (currentStepIndex < movieStages.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      setIsMovieFinished(true);
      setIsPlaying(false);
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
      setIsMovieFinished(false);
    }
  };

  const handleRestart = () => {
    setCurrentStepIndex(0);
    setIsMovieFinished(false);
    setIsPlaying(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-md animate-fadeIn">
      <div className="glass-card rounded-3xl border border-[#E5C158]/40 bg-[#050507] w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden relative shadow-[0_0_50px_rgba(229,193,88,0.15)]">

        {/* TOP HEADER CONTROLS BAR */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-white/10 bg-black/80 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#E5C158]/20 border border-[#E5C158]/50 flex items-center justify-center text-[#E5C158] shrink-0">
              <Play className="w-4 h-4 fill-[#E5C158]" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-[#E5C158] uppercase tracking-wider block">
                MFS AI CINEMATIC EXPERIENCE
              </span>
              <h2 className="text-sm sm:text-base font-poppins font-bold text-white flex items-center gap-2">
                <span>Project Journey Movie</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-neutral-300">
                  {projectId}
                </span>
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Speed Toggle */}
            {hasStartedMovie && !isMovieFinished && (
              <button
                onClick={() => {
                  const speeds: (1 | 1.5 | 2)[] = [1, 1.5, 2];
                  const nextIndex = (speeds.indexOf(playbackSpeed) + 1) % speeds.length;
                  setPlaybackSpeed(speeds[nextIndex]);
                }}
                className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-300 text-[11px] font-mono font-bold transition-colors cursor-pointer"
                title="Playback Speed"
              >
                {playbackSpeed}x Speed
              </button>
            )}

            {/* Mute Audio Toggle */}
            {hasStartedMovie && !isMovieFinished && (
              <button
                onClick={() => setIsMuted(!isMuted)}
                className={`p-2 rounded-lg border text-xs transition-colors cursor-pointer ${
                  isMuted
                    ? 'bg-red-500/10 border-red-500/30 text-red-400'
                    : 'bg-[#28C76F]/10 border-[#28C76F]/30 text-[#28C76F]'
                }`}
                title={isMuted ? 'Unmute AI Voice' : 'Mute AI Voice'}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
            )}

            {/* Exit Movie Button */}
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* MAIN CINEMATIC STAGE VIEWPORT */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 flex flex-col justify-between relative bg-gradient-to-b from-[#0B0B0E] via-[#050507] to-black">

          {/* BACKGROUND GOLD PARTICLES GLOW */}
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-[#E5C158]/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-[#28C76F]/5 rounded-full blur-3xl pointer-events-none" />

          {/* CELEBRATION GLOW OVERLAY WHEN MILESTONE REACHED */}
          {showCelebration && (
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-10 animate-ping">
              <div className="w-72 h-72 rounded-full bg-gradient-to-r from-[#E5C158]/20 to-[#28C76F]/20 blur-2xl" />
            </div>
          )}

          {!hasStartedMovie ? (
            /* INTRO CINEMATIC SCREEN */
            <div className="my-auto text-center space-y-6 max-w-xl mx-auto py-8 animate-fadeIn">
              <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#E5C158] via-[#D4AF37] to-black p-0.5 mx-auto shadow-[0_0_35px_rgba(229,193,88,0.3)] flex items-center justify-center">
                <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-[#E5C158]">
                  <Sparkles className="w-10 h-10 animate-pulse" />
                </div>
              </div>

              <div className="space-y-3">
                <span className="text-xs font-bold font-mono tracking-widest text-[#E5C158] uppercase px-3 py-1 rounded-full bg-[#E5C158]/10 border border-[#E5C158]/30">
                  MFS GROWTH AGENCY • OFFICIAL REPLAY
                </span>
                <h1 className="text-2xl sm:text-3xl font-poppins font-extrabold text-white tracking-tight">
                  The Story of Your Project
                </h1>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                  Watch the step-by-step journey of your <strong className="text-white">Executive Presentation Deck ({projectId})</strong> as MFS AI and our design specialists execute every stage.
                </p>
              </div>

              {/* Client Info Metadata Pill */}
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 grid grid-cols-2 sm:grid-cols-3 gap-3 text-left text-xs">
                <div>
                  <span className="text-neutral-500 block text-[10px] uppercase">Client Name</span>
                  <strong className="text-white font-semibold">{customerName}</strong>
                </div>
                <div>
                  <span className="text-neutral-500 block text-[10px] uppercase">Project ID</span>
                  <strong className="text-[#E5C158] font-mono font-semibold">{projectId}</strong>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <span className="text-neutral-500 block text-[10px] uppercase">Service</span>
                  <strong className="text-white font-semibold">10-Slide Pitch Deck</strong>
                </div>
              </div>

              <button
                onClick={handleStartMovie}
                className="w-full sm:w-auto px-10 py-4 rounded-full bg-gradient-to-r from-[#E5C158] to-[#D4AF37] text-black font-extrabold text-sm hover:brightness-110 transition-all cursor-pointer shadow-[0_0_25px_rgba(229,193,88,0.4)] flex items-center justify-center gap-3 mx-auto"
              >
                <Play className="w-5 h-5 fill-black" />
                <span>Start Cinematic Replay</span>
              </button>
            </div>
          ) : isMovieFinished ? (
            /* FINAL CELEBRATION & PROJECT STATISTICS SCREEN */
            <div className="my-auto space-y-6 animate-fadeIn py-4">
              <div className="text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-[#28C76F]/20 border border-[#28C76F]/50 text-[#28C76F] flex items-center justify-center mx-auto shadow-[0_0_25px_rgba(40,199,111,0.3)]">
                  <Award className="w-8 h-8" />
                </div>
                <span className="text-xs font-bold text-[#28C76F] uppercase tracking-widest block">
                  🎉 JOURNEY COMPLETE
                </span>
                <h2 className="text-2xl font-poppins font-bold text-white">
                  Congratulations, {customerName}!
                </h2>
                <p className="text-xs sm:text-sm text-neutral-300 max-w-md mx-auto leading-relaxed">
                  Your project journey was executed with 100% precision and zero delays. Thank you for trusting MFS Growth Agency!
                </p>
              </div>

              {/* PROJECT STATISTICS PANEL */}
              <div className="glass-card rounded-2xl border border-white/10 p-5 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                  <span className="text-[10px] text-neutral-400 uppercase font-semibold">Total Duration</span>
                  <strong className="text-base font-bold text-white font-poppins block">18.5 Hours</strong>
                  <span className="text-[9px] text-[#28C76F]">3h Express Savings</span>
                </div>

                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                  <span className="text-[10px] text-neutral-400 uppercase font-semibold">Milestones Passed</span>
                  <strong className="text-base font-bold text-[#E5C158] font-poppins block">9 / 9 Stages</strong>
                  <span className="text-[9px] text-neutral-400">100% Complete</span>
                </div>

                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                  <span className="text-[10px] text-neutral-400 uppercase font-semibold">Quality Rating</span>
                  <strong className="text-base font-bold text-blue-400 font-poppins block">100% WCAG AA</strong>
                  <span className="text-[9px] text-blue-400">Gold Standards</span>
                </div>

                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                  <span className="text-[10px] text-neutral-400 uppercase font-semibold">Revision Risk</span>
                  <strong className="text-base font-bold text-purple-400 font-poppins block">0% Risk</strong>
                  <span className="text-[9px] text-purple-400">Zero Defects</span>
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => {
                    if (onShowToast) onShowToast('Downloading Official Project Journey Summary (PDF)...');
                  }}
                  className="px-5 py-2.5 rounded-xl bg-[#E5C158] text-black font-bold text-xs hover:bg-[#fce888] transition-colors cursor-pointer flex items-center gap-2"
                >
                  <Download className="w-4 h-4 text-black" />
                  <span>Download Journey PDF</span>
                </button>

                <button
                  onClick={handleRestart}
                  className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-colors cursor-pointer flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4 text-[#E5C158]" />
                  <span>Replay Movie Again</span>
                </button>

                <a
                  href="https://wa.me/923015323689"
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-[#28C76F]/20 hover:bg-[#28C76F]/30 border border-[#28C76F]/40 text-[#28C76F] font-bold text-xs transition-colors cursor-pointer flex items-center gap-2"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>WhatsApp Support (+92 301 5323689)</span>
                </a>
              </div>
            </div>
          ) : (
            /* ACTIVE STAGE CINEMATIC DISPLAY */
            <div className="my-auto space-y-6 animate-fadeIn">

              {/* Progress Step Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-0.5 rounded-full bg-[#E5C158]/20 border border-[#E5C158]/40 text-[#E5C158] text-[10px] font-bold tracking-wider uppercase">
                    {currentStage.chapter}
                  </span>
                  <span className="text-xs text-neutral-400 font-mono">
                    ({currentStepIndex + 1} of {movieStages.length})
                  </span>
                </div>

                <span className="text-xs font-mono text-[#28C76F] font-bold flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{currentStage.timestamp}</span>
                </span>
              </div>

              {/* Main Card Icon & Title */}
              <div className="glass-card rounded-3xl border border-white/10 p-6 sm:p-8 space-y-4 bg-gradient-to-r from-black via-[#0F0F0F] to-black relative overflow-hidden">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#E5C158] to-[#D4AF37] p-0.5 shrink-0 shadow-[0_0_20px_rgba(229,193,88,0.3)]">
                    <div className="w-full h-full rounded-[14px] bg-black flex items-center justify-center text-[#E5C158]">
                      {React.createElement(currentStage.icon, { className: 'w-8 h-8' })}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-neutral-400 font-mono uppercase tracking-wider block">
                      {currentStage.dept}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-poppins font-bold text-white tracking-tight">
                      {currentStage.title}
                    </h3>
                    <p className="text-xs text-neutral-300 leading-relaxed">
                      {currentStage.desc}
                    </p>
                  </div>
                </div>

                {/* AI Narration Voice Box */}
                <div className="mt-4 p-4 rounded-2xl bg-black/60 border border-[#E5C158]/30 flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-[#E5C158]/20 text-[#E5C158] shrink-0 mt-0.5">
                    <Bot className="w-4 h-4 animate-bounce" />
                  </div>
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="font-bold text-[#E5C158] uppercase tracking-wider">
                        MFS AI VOICE NARRATION
                      </span>
                      {!isMuted && (
                        <span className="flex items-center gap-1 text-[#28C76F]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#28C76F] animate-ping" />
                          <span>Speaking...</span>
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-neutral-200 font-mono leading-relaxed min-h-[36px]">
                      "{typedNarration}"
                    </p>
                  </div>
                </div>
              </div>

              {/* Progress Bar Line */}
              <div className="space-y-1.5">
                <div className="w-full h-2.5 rounded-full bg-white/10 overflow-hidden p-0.5">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#28C76F] via-[#E5C158] to-[#D4AF37] transition-all duration-500 shadow-[0_0_10px_rgba(229,193,88,0.5)]"
                    style={{ width: `${((currentStepIndex + 1) / movieStages.length) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-neutral-500 font-mono">
                  <span>Start: Order Ingestion</span>
                  <span>{Math.round(((currentStepIndex + 1) / movieStages.length) * 100)}% Complete</span>
                  <span>Target: HD Final Delivery</span>
                </div>
              </div>

              {/* Scannable Stage Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 text-[10px]">
                {movieStages.map((stage, idx) => (
                  <button
                    key={stage.id}
                    onClick={() => {
                      setCurrentStepIndex(idx);
                      setIsPlaying(false);
                    }}
                    className={`px-3 py-1.5 rounded-xl border shrink-0 transition-all cursor-pointer font-semibold ${
                      idx === currentStepIndex
                        ? 'bg-[#E5C158] text-black font-extrabold border-[#E5C158] shadow-[0_0_10px_rgba(229,193,88,0.4)]'
                        : idx < currentStepIndex
                        ? 'bg-[#28C76F]/10 border-[#28C76F]/30 text-[#28C76F]'
                        : 'bg-white/5 border-white/5 text-neutral-500'
                    }`}
                  >
                    Stage {stage.id}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* BOTTOM CONTROLS FOOTER */}
        {hasStartedMovie && !isMovieFinished && (
          <div className="p-4 sm:p-5 border-t border-white/10 bg-black/90 flex items-center justify-between gap-4 shrink-0">
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                disabled={currentStepIndex === 0}
                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 disabled:opacity-30 border border-white/10 text-white transition-colors cursor-pointer"
                title="Previous Step"
              >
                <SkipBack className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="px-5 py-2.5 rounded-xl bg-[#E5C158] text-black font-bold text-xs hover:bg-[#fce888] transition-all cursor-pointer shadow-[0_0_15px_rgba(229,193,88,0.3)] flex items-center gap-2"
              >
                {isPlaying ? <Pause className="w-4 h-4 fill-black" /> : <Play className="w-4 h-4 fill-black" />}
                <span>{isPlaying ? 'Pause' : 'Play'}</span>
              </button>

              <button
                onClick={handleNext}
                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-colors cursor-pointer"
                title="Next Step"
              >
                <SkipForward className="w-4 h-4" />
              </button>

              <button
                onClick={handleRestart}
                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-400 hover:text-white transition-colors cursor-pointer hidden sm:block"
                title="Restart Replay"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-neutral-400 block uppercase font-mono">Current Status</span>
              <span className="text-xs text-[#28C76F] font-bold font-poppins">
                {currentStage.status === 'completed' ? '✓ Stage Completed' : currentStage.status === 'active' ? '● Live In Design Lab' : 'Scheduled'}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
