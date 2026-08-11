import React, { useState } from 'react';
import { Currency } from '../../types';
import {
  Calendar,
  Clock,
  Video,
  User,
  Plus,
  CheckCircle2,
  ExternalLink,
  Sparkles,
  FileText,
  Search,
  Check,
  X,
  Play,
  Share2,
  Users,
  Building2,
  Globe,
  AlertCircle
} from 'lucide-react';

interface CRMMeetingScheduleCenterProps {
  currency: Currency;
  onShowToast: (msg: string) => void;
}

export interface ClientMeeting {
  id: string; // e.g., 'MTG-2026-901'
  title: string;
  type: 'Discovery Call' | 'Strategy Meeting' | 'Project Review' | 'Final Delivery';
  clientName: string;
  clientCompany: string;
  date: string;
  time: string;
  duration: string;
  platform: 'Google Meet' | 'Zoom' | 'WhatsApp Video' | 'Microsoft Teams';
  meetingLink: string;
  participants: string[];
  status: 'upcoming' | 'completed' | 'cancelled';
  notes?: string;
  recordingUrl?: string;
}

export const CRMMeetingScheduleCenter: React.FC<CRMMeetingScheduleCenterProps> = ({
  currency,
  onShowToast
}) => {
  const [meetings, setMeetings] = useState<ClientMeeting[]>([
    {
      id: 'MTG-2026-901',
      title: 'VC Pitch Deck Strategy & Financial Model Alignment',
      type: 'Strategy Meeting',
      clientName: 'Muhammad Shehroz Sultan',
      clientCompany: 'MFS International',
      date: '2026-07-28',
      time: '04:00 PM PKT',
      duration: '45 mins',
      platform: 'Google Meet',
      meetingLink: 'https://meet.google.com/mfs-growth-vc-deck',
      participants: ['Muhammad Shehroz Sultan', 'Shehroz Sultan (Agency Owner)', 'Lead AI Visualizer'],
      status: 'upcoming',
      notes: 'Focus on Dubai VC valuation expectations, dark gold typography theme, and slide 12 interactive financial model.'
    },
    {
      id: 'MTG-2026-880',
      title: 'Academic Manuscript Formatting Review Call',
      type: 'Project Review',
      clientName: 'Dr. Tariq Mahmood',
      clientCompany: 'Medical Institute',
      date: '2026-07-25',
      time: '02:00 PM PKT',
      duration: '30 mins',
      platform: 'Zoom',
      meetingLink: 'https://zoom.us/j/910283910283',
      participants: ['Dr. Tariq Mahmood', 'Senior Academic Editor'],
      status: 'completed',
      notes: 'Manuscript approved in full. Client confirmed APA 7th style citations.',
      recordingUrl: 'https://mfs-growth.agency/recordings/MTG-2026-880.mp4'
    }
  ]);

  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [mTitle, setMTitle] = useState('');
  const [mClient, setMClient] = useState('');
  const [mType, setMType] = useState<ClientMeeting['type']>('Discovery Call');
  const [mDate, setMDate] = useState('');
  const [mTime, setMTime] = useState('');
  const [mPlatform, setMPlatform] = useState<ClientMeeting['platform']>('Google Meet');

  const handleScheduleMeeting = () => {
    if (!mTitle || !mClient || !mDate) {
      onShowToast('Please fill required meeting fields.');
      return;
    }

    const newMtg: ClientMeeting = {
      id: `MTG-2026-${Math.floor(100 + Math.random() * 900)}`,
      title: mTitle,
      type: mType,
      clientName: mClient,
      clientCompany: 'Client Organization',
      date: mDate,
      time: mTime || '03:00 PM PKT',
      duration: '30 mins',
      platform: mPlatform,
      meetingLink: `https://meet.google.com/mfs-${Math.floor(1000 + Math.random() * 9000)}`,
      participants: [mClient, 'Shehroz Sultan (MFS Agency Lead)'],
      status: 'upcoming',
      notes: 'Scheduled via MFS Enterprise CRM Meeting Hub.'
    };

    setMeetings([newMtg, ...meetings]);
    setIsScheduleModalOpen(false);
    setMTitle('');
    setMClient('');
    onShowToast(`📅 Meeting scheduled and synced with ${mPlatform}!`);
  };

  return (
    <div className="space-y-6 text-white animate-fade-in">
      {/* HEADER */}
      <div className="glass-card rounded-2xl border border-white/10 p-6 bg-gradient-to-r from-neutral-900/90 via-black to-[#0F0F0F] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-extrabold bg-[#E5C158]/10 text-[#E5C158] border border-[#E5C158]/30 uppercase tracking-wider flex items-center gap-1">
              <Calendar className="w-3 h-3 text-[#E5C158]" />
              MEETING & SCHEDULE CENTER
            </span>
            <span className="text-xs text-neutral-400 font-mono">Google Calendar & Zoom Hub</span>
          </div>
          <h2 className="text-xl font-black text-white mt-1">Client Consultation & Review Meetings</h2>
          <p className="text-xs text-neutral-400">
            Schedule strategy sessions, discovery calls, and final deliverable walkthroughs with integrated meeting links.
          </p>
        </div>

        <button
          onClick={() => setIsScheduleModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#E5C158] to-[#D4AF37] text-black font-bold text-xs uppercase tracking-wider hover:opacity-90 flex items-center gap-2 shadow-[0_0_15px_rgba(229,193,88,0.2)]"
        >
          <Plus className="w-4 h-4 text-black" />
          Schedule Client Call
        </button>
      </div>

      {/* PLATFORM INTEGRATIONS BAR */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { name: 'Google Calendar', status: 'Connected', color: 'border-emerald-500/40 text-emerald-400 bg-emerald-500/10' },
          { name: 'Google Meet', status: 'Active Ready', color: 'border-emerald-500/40 text-emerald-400 bg-emerald-500/10' },
          { name: 'Zoom Video', status: 'API Configured', color: 'border-sky-500/40 text-sky-400 bg-sky-500/10' },
          { name: 'Microsoft Teams', status: 'Placeholder', color: 'border-white/10 text-neutral-400 bg-white/5' }
        ].map((p, idx) => (
          <div key={idx} className="p-3 rounded-xl glass-card border border-white/10 bg-neutral-900/60 flex items-center justify-between text-xs">
            <span className="font-bold text-white">{p.name}</span>
            <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${p.color}`}>
              {p.status}
            </span>
          </div>
        ))}
      </div>

      {/* MEETINGS CARDS GRID */}
      <div className="space-y-4">
        {meetings.map((mtg) => (
          <div
            key={mtg.id}
            className="p-5 rounded-2xl glass-card border border-white/10 bg-neutral-900/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:border-[#E5C158]/40 transition-all"
          >
            <div className="space-y-1.5 flex-1">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] font-bold text-[#E5C158] bg-[#E5C158]/10 px-2 py-0.5 rounded border border-[#E5C158]/30">
                  {mtg.id}
                </span>
                <span className="text-[10px] font-bold text-neutral-300 bg-white/5 px-2 py-0.5 rounded border border-white/10">
                  {mtg.type}
                </span>
                <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded border ${
                  mtg.status === 'completed'
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                    : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                }`}>
                  {mtg.status}
                </span>
              </div>

              <h3 className="font-extrabold text-white text-sm">{mtg.title}</h3>
              <p className="text-xs text-neutral-400 flex items-center gap-2">
                <User className="w-3.5 h-3.5 text-neutral-500" />
                {mtg.clientName} ({mtg.clientCompany})
              </p>

              {mtg.notes && (
                <p className="text-xs text-neutral-300 bg-black/40 p-2.5 rounded-xl border border-white/5 mt-2">
                  <span className="text-[#E5C158] font-bold">Meeting Agenda / Notes:</span> {mtg.notes}
                </p>
              )}
            </div>

            {/* RIGHT SIDE DETAILS & LINK */}
            <div className="flex flex-col items-end gap-2 text-xs border-t md:border-t-0 md:border-l border-white/10 pt-3 md:pt-0 md:pl-6 shrink-0 w-full md:w-auto">
              <div className="text-right">
                <span className="text-neutral-400 text-[11px] block">{mtg.date} • {mtg.time}</span>
                <span className="font-semibold text-white text-xs">{mtg.duration} via {mtg.platform}</span>
              </div>

              <a
                href={mtg.meetingLink}
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#E5C158] to-[#D4AF37] text-black font-bold text-xs uppercase tracking-wider hover:opacity-90 flex items-center gap-1.5 transition-all"
              >
                <Video className="w-3.5 h-3.5 text-black" />
                Join {mtg.platform}
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* SCHEDULE MODAL */}
      {isScheduleModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          <div className="glass-card rounded-3xl border border-white/20 bg-[#0A0A0C] w-full max-w-md p-6 space-y-4 relative">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="font-extrabold text-white text-base flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#E5C158]" />
                Schedule Client Meeting
              </h3>
              <button onClick={() => setIsScheduleModalOpen(false)} className="text-neutral-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-neutral-400 block mb-1">Meeting Title *</label>
                <input
                  type="text"
                  value={mTitle}
                  onChange={(e) => setMTitle(e.target.value)}
                  placeholder="e.g. VC Pitch Deck Review or Strategy Session"
                  className="w-full bg-black/60 border border-white/10 rounded-xl p-2.5 text-white focus:border-[#E5C158]/50"
                />
              </div>

              <div>
                <label className="text-neutral-400 block mb-1">Client Name *</label>
                <input
                  type="text"
                  value={mClient}
                  onChange={(e) => setMClient(e.target.value)}
                  placeholder="e.g. Muhammad Shehroz Sultan"
                  className="w-full bg-black/60 border border-white/10 rounded-xl p-2.5 text-white focus:border-[#E5C158]/50"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-neutral-400 block mb-1">Type</label>
                  <select
                    value={mType}
                    onChange={(e) => setMType(e.target.value as any)}
                    className="w-full bg-black/60 border border-white/10 rounded-xl p-2.5 text-white focus:border-[#E5C158]/50"
                  >
                    <option value="Discovery Call">Discovery Call</option>
                    <option value="Strategy Meeting">Strategy Meeting</option>
                    <option value="Project Review">Project Review</option>
                    <option value="Final Delivery">Final Delivery</option>
                  </select>
                </div>

                <div>
                  <label className="text-neutral-400 block mb-1">Platform</label>
                  <select
                    value={mPlatform}
                    onChange={(e) => setMPlatform(e.target.value as any)}
                    className="w-full bg-black/60 border border-white/10 rounded-xl p-2.5 text-white focus:border-[#E5C158]/50"
                  >
                    <option value="Google Meet">Google Meet</option>
                    <option value="Zoom">Zoom</option>
                    <option value="WhatsApp Video">WhatsApp Video</option>
                    <option value="Microsoft Teams">Microsoft Teams</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-neutral-400 block mb-1">Date *</label>
                  <input
                    type="date"
                    value={mDate}
                    onChange={(e) => setMDate(e.target.value)}
                    className="w-full bg-black/60 border border-white/10 rounded-xl p-2.5 text-white focus:border-[#E5C158]/50"
                  />
                </div>

                <div>
                  <label className="text-neutral-400 block mb-1">Time</label>
                  <input
                    type="text"
                    value={mTime}
                    onChange={(e) => setMTime(e.target.value)}
                    placeholder="04:00 PM PKT"
                    className="w-full bg-black/60 border border-white/10 rounded-xl p-2.5 text-white focus:border-[#E5C158]/50"
                  />
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-end gap-2">
              <button
                onClick={() => setIsScheduleModalOpen(false)}
                className="px-4 py-2 rounded-xl glass-card border border-white/10 text-neutral-400 hover:text-white text-xs"
              >
                Cancel
              </button>
              <button
                onClick={handleScheduleMeeting}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#E5C158] to-[#D4AF37] text-black font-bold text-xs uppercase tracking-wider hover:opacity-90"
              >
                Schedule & Sync
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
