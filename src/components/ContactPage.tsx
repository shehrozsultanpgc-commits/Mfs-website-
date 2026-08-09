import React, { useState } from 'react';
import { CONTACT_CARDS, FAQS } from '../data/content';
import { sendActionNotificationEmail } from '../lib/emailNotificationService';
import {
  Mail,
  Headset,
  Phone,
  Clock,
  MapPin,
  MessageSquare,
  Sparkles,
  Send,
  Upload,
  CheckCircle2,
  Globe,
  Instagram,
  Facebook,
  Bot,
  Mic,
  ArrowRight,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  X,
  FileText,
  PhoneCall,
  ExternalLink
} from 'lucide-react';

interface ContactPageProps {
  onOpenOrderModal: () => void;
  onOpenAIChat?: (mode?: 'chat' | 'voice') => void;
  onShowToast?: (msg: string) => void;
  onNavigatePage?: (page: 'home' | 'services' | 'pricing' | 'reviews' | 'about' | 'contact', targetSection?: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  onOpenOrderModal,
  onOpenAIChat,
  onShowToast,
  onNavigatePage,
}) => {
  // Contact Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('Pakistan');
  const [service, setService] = useState('Presentation Design');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Mini FAQ Accordion State
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-1');
  const [isAllFaqsModalOpen, setIsAllFaqsModalOpen] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 25 * 1024 * 1024) {
        if (onShowToast) onShowToast('File size must be under 25MB');
        return;
      }
      setUploadedFile(file);
      if (onShowToast) onShowToast(`Attached file: ${file.name}`);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !message) {
      if (onShowToast) onShowToast('Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);

    // Dispatch automated email notification (Client confirmation + Admin alert)
    await sendActionNotificationEmail({
      actionType: 'contact_inquiry',
      actionTitle: `Inquiry: ${subject || service || 'General Contact Request'}`,
      clientName: fullName,
      clientEmail: email,
      clientPhone: phone,
      subject: subject || service,
      details: `Service: ${service}\nCountry: ${country}\n\nMessage:\n${message}`,
    }).catch(() => null);

    setIsSubmitting(false);
    setFormSubmitted(true);
    if (onShowToast) {
      onShowToast('🎉 Thank you! Your inquiry & confirmation emails have been dispatched.');
    }
  };

  const handleSendWhatsApp = () => {
    const text = `Hello MFS Growth Agency!%0A%0A*Name:* ${fullName || 'Client'}%0A*Country:* ${country}%0A*Service:* ${service}%0A*Subject:* ${subject || 'General Inquiry'}%0A*Message:* ${message || 'I would like to inquire about your services.'}`;
    window.open(`https://wa.me/923015323689?text=${text}`, '_blank');
  };

  const preferredContactMethods = [
    {
      title: 'WhatsApp Support',
      desc: 'Instant 24/7 direct chat support for urgent project inquiries & quote estimates.',
      icon: <MessageSquare className="w-6 h-6 text-[#28C76F]" />,
      actionText: 'Chat on WhatsApp',
      actionUrl: 'https://wa.me/923015323689',
      badge: 'Fastest Response',
      badgeColor: 'bg-[#28C76F]/10 text-[#28C76F] border-[#28C76F]/20',
    },
    {
      title: 'Email Inquiry',
      desc: 'Send detailed project guidelines, scope documents, or corporate presentation briefs.',
      icon: <Mail className="w-6 h-6 text-[#E5C158]" />,
      actionText: 'Email Us Directly',
      actionUrl: 'mailto:mfsmedia.agency@gmail.com',
      badge: 'Formal Briefs',
      badgeColor: 'bg-[#E5C158]/10 text-[#E5C158] border-[#E5C158]/20',
    },
    {
      title: 'MFS AI Chatbot',
      desc: 'Smart 24/7 assistant answering service questions in English, Urdu & Roman Urdu.',
      icon: <Bot className="w-6 h-6 text-[#E5C158]" />,
      actionText: 'Open AI Assistant',
      onClick: () => onOpenAIChat?.('chat'),
      badge: 'Instant AI',
      badgeColor: 'bg-[#E5C158]/10 text-[#E5C158] border-[#E5C158]/20',
    },
    {
      title: 'AI Voice Assistant',
      desc: 'Interactive voice widget for hands-free audio assistance and instant service help.',
      icon: <Mic className="w-6 h-6 text-[#28C76F]" />,
      actionText: 'Launch Voice Assistant',
      onClick: () => onOpenAIChat?.('voice'),
      badge: 'Voice AI',
      badgeColor: 'bg-[#28C76F]/10 text-[#28C76F] border-[#28C76F]/20',
    },
    {
      title: 'Direct Phone Call',
      desc: 'Speak directly with our client coordination desk in Islamabad, Pakistan (PKT).',
      icon: <PhoneCall className="w-6 h-6 text-[#E5C158]" />,
      actionText: 'Call +92 301 5323689',
      actionUrl: 'tel:+923015323689',
      badge: 'Direct Phone',
      badgeColor: 'bg-[#E5C158]/10 text-[#E5C158] border-[#E5C158]/20',
    },
  ];

  return (
    <div className="w-full pt-28 pb-20 animate-fadeIn">
      {/* 1. Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E5C158]/10 border border-[#E5C158]/30 text-[#E5C158] text-xs font-semibold mb-6">
          <Sparkles className="w-4 h-4" />
          <span>24/7 GLOBAL CLIENT SUPPORT</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-poppins font-bold tracking-tight text-white mb-6 max-w-4xl mx-auto leading-tight">
          Let's Build Something <span className="gradient-gold-text">Exceptional Together</span>
        </h1>

        <p className="text-neutral-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed mb-8">
          Have a question about our Presentation Design, Assignment Writing, or ATS Resume services? Reach out to MFS Growth Agency. Our team is online 24/7 to assist you.
        </p>

        {/* Quick Contact Badges */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-neutral-300">
          <span className="inline-flex items-center gap-1.5 bg-white/[0.03] border border-white/10 px-3.5 py-1.5 rounded-full">
            <Clock className="w-3.5 h-3.5 text-[#E5C158]" />
            <span>Response Time: &lt; 15 Minutes</span>
          </span>
          <span className="inline-flex items-center gap-1.5 bg-white/[0.03] border border-white/10 px-3.5 py-1.5 rounded-full">
            <MapPin className="w-3.5 h-3.5 text-[#28C76F]" />
            <span>Islamabad, Pakistan</span>
          </span>
          <span className="inline-flex items-center gap-1.5 bg-white/[0.03] border border-white/10 px-3.5 py-1.5 rounded-full">
            <Globe className="w-3.5 h-3.5 text-[#E5C158]" />
            <span>Languages: EN, Urdu, Roman Urdu</span>
          </span>
        </div>
      </section>

      {/* 2. Choose Your Preferred Contact Method Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="font-poppins text-xs font-bold uppercase tracking-widest text-[#E5C158] block mb-2">
            EFFORTLESS COMMUNICATION
          </span>
          <h2 className="text-2xl sm:text-4xl font-poppins font-bold text-white mb-3">
            Choose Your Preferred Contact Method
          </h2>
          <p className="text-neutral-300 text-xs sm:text-sm">
            Select the most convenient channel below for instant assistance from MFS Growth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {preferredContactMethods.map((method, idx) => (
            <div
              key={idx}
              className="glass-card rounded-2xl border border-white/10 p-5 flex flex-col justify-between hover:border-[#E5C158]/40 transition-all duration-300 group hover:shadow-[0_8px_25px_rgba(0,0,0,0.5)]"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/10 group-hover:scale-110 transition-transform">
                    {method.icon}
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${method.badgeColor}`}>
                    {method.badge}
                  </span>
                </div>

                <h3 className="font-poppins font-bold text-white text-sm mb-2 group-hover:text-[#E5C158] transition-colors">
                  {method.title}
                </h3>
                <p className="text-xs text-neutral-300 leading-relaxed mb-6">{method.desc}</p>
              </div>

              {method.actionUrl ? (
                <a
                  href={method.actionUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2.5 px-3 rounded-xl bg-white/[0.05] border border-white/10 text-white font-semibold text-xs hover:bg-[#E5C158] hover:text-[#050507] hover:border-[#E5C158] transition-all flex items-center justify-center gap-1.5 cursor-pointer text-center"
                >
                  <span>{method.actionText}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              ) : (
                <button
                  onClick={method.onClick}
                  className="w-full py-2.5 px-3 rounded-xl bg-white/[0.05] border border-white/10 text-white font-semibold text-xs hover:bg-[#E5C158] hover:text-[#050507] hover:border-[#E5C158] transition-all flex items-center justify-center gap-1.5 cursor-pointer text-center"
                >
                  <span>{method.actionText}</span>
                  <Sparkles className="w-3.5 h-3.5 text-[#E5C158] group-hover:text-[#050507]" />
                </button>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 3. Contact Form & Details Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Contact Info & Official Accounts (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-card rounded-2xl border border-white/10 p-6 space-y-6">
              <h3 className="text-lg font-poppins font-bold text-white border-b border-white/10 pb-4">
                Official Contact Information
              </h3>

              {/* Email 1 */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#E5C158]/10 border border-[#E5C158]/30 flex items-center justify-center text-[#E5C158] shrink-0 mt-0.5">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-semibold text-neutral-400 block uppercase tracking-wider">Business Email</span>
                  <a href="mailto:mfsmedia.agency@gmail.com" className="text-xs font-mono text-white hover:text-[#E5C158] transition-colors break-all">
                    mfsmedia.agency@gmail.com
                  </a>
                </div>
              </div>

              {/* Email 2 */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#28C76F]/10 border border-[#28C76F]/30 flex items-center justify-center text-[#28C76F] shrink-0 mt-0.5">
                  <Headset className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-semibold text-neutral-400 block uppercase tracking-wider">Support Email</span>
                  <a href="mailto:shehrozsultanpgc@gmail.com" className="text-xs font-mono text-white hover:text-[#28C76F] transition-colors break-all">
                    shehrozsultanpgc@gmail.com
                  </a>
                </div>
              </div>

              {/* Phone / WhatsApp */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#E5C158]/10 border border-[#E5C158]/30 flex items-center justify-center text-[#E5C158] shrink-0 mt-0.5">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-semibold text-neutral-400 block uppercase tracking-wider">Phone / WhatsApp</span>
                  <a href="https://wa.me/923015323689" target="_blank" rel="noreferrer" className="text-xs font-mono text-[#E5C158] font-bold hover:underline">
                    +92 301 5323689
                  </a>
                  <span className="text-[10px] text-neutral-400 block">Islamabad, Pakistan (PKT)</span>
                </div>
              </div>

              {/* Business Location */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#28C76F]/10 border border-[#28C76F]/30 flex items-center justify-center text-[#28C76F] shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-semibold text-neutral-400 block uppercase tracking-wider">Agency Location</span>
                  <p className="text-xs text-white">Islamabad, Pakistan — Serving Clients Worldwide</p>
                </div>
              </div>

              {/* Support Hours */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#E5C158]/10 border border-[#E5C158]/30 flex items-center justify-center text-[#E5C158] shrink-0 mt-0.5">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-semibold text-neutral-400 block uppercase tracking-wider">Working Hours</span>
                  <p className="text-xs text-white font-semibold">24 Hours Online Support (PKT)</p>
                  <span className="text-[10px] text-[#28C76F] font-bold">● Active Now</span>
                </div>
              </div>
            </div>

            {/* Social Media Card */}
            <div className="glass-card rounded-2xl border border-white/10 p-6">
              <h4 className="text-xs font-bold text-neutral-300 uppercase tracking-wider mb-4">Official Social Handles</h4>
              <div className="flex items-center gap-4">
                <a
                  href="https://instagram.com/mfsgrowth"
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 p-3 rounded-xl bg-white/[0.03] border border-white/10 hover:border-[#E5C158] flex items-center justify-center gap-2 text-xs text-white hover:text-[#E5C158] transition-all"
                >
                  <Instagram className="w-4 h-4 text-[#E5C158]" />
                  <span>@mfsgrowth</span>
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 p-3 rounded-xl bg-white/[0.03] border border-white/10 hover:border-[#E5C158] flex items-center justify-center gap-2 text-xs text-white hover:text-[#E5C158] transition-all"
                >
                  <Facebook className="w-4 h-4 text-[#28C76F]" />
                  <span>MFS Growth</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right: Premium Interactive Contact Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="glass-card rounded-3xl border border-white/10 p-6 sm:p-8 relative">
              <div className="mb-6">
                <h3 className="text-xl font-poppins font-bold text-white mb-2">Send Us a Direct Message</h3>
                <p className="text-xs text-neutral-400">
                  Fill in your project requirements below. Our client coordinator will review and reply within 15 minutes.
                </p>
              </div>

              {formSubmitted ? (
                <div className="py-12 text-center space-y-4 animate-fadeIn">
                  <div className="w-16 h-16 rounded-full bg-[#28C76F]/20 border border-[#28C76F]/40 flex items-center justify-center mx-auto text-[#28C76F]">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-poppins font-bold text-white">Message Received!</h4>
                  <p className="text-xs text-neutral-300 max-w-md mx-auto leading-relaxed">
                    Thank you, <strong className="text-white">{fullName}</strong>! Your inquiry regarding <span className="text-[#E5C158]">{service}</span> has been logged successfully. We will email you shortly.
                  </p>
                  <div className="pt-4 flex items-center justify-center gap-3">
                    <button
                      onClick={() => setFormSubmitted(false)}
                      className="px-5 py-2.5 rounded-xl bg-white/10 text-white text-xs font-semibold hover:bg-white/20 transition-all cursor-pointer"
                    >
                      Send Another Message
                    </button>
                    <button
                      onClick={handleSendWhatsApp}
                      className="px-5 py-2.5 rounded-xl bg-[#28C76F] text-black text-xs font-bold hover:bg-[#34e082] transition-all cursor-pointer flex items-center gap-2"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Chat on WhatsApp</span>
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Shehroz Sultan"
                        className="w-full bg-black/50 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#E5C158]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. name@example.com"
                        className="w-full bg-black/50 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#E5C158]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1">Phone / WhatsApp</label>
                      <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+92 301 5323689"
                        className="w-full bg-black/50 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#E5C158]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1">Country</label>
                      <select
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="w-full bg-black/50 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#E5C158]"
                      >
                        <option value="Pakistan">Pakistan 🇵🇰</option>
                        <option value="UAE">UAE 🇦🇪</option>
                        <option value="Saudi Arabia">Saudi Arabia 🇸🇦</option>
                        <option value="United Kingdom">United Kingdom 🇬🇧</option>
                        <option value="United States">United States 🇺🇸</option>
                        <option value="Canada">Canada 🇨🇦</option>
                        <option value="Australia">Australia 🇦🇺</option>
                        <option value="Germany">Germany 🇩🇪</option>
                        <option value="International">Other Country</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1">Service Required</label>
                      <select
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        className="w-full bg-black/50 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#E5C158]"
                      >
                        <option value="Presentation Design">Presentation Design</option>
                        <option value="Assignment Writing">Assignment Writing</option>
                        <option value="ATS Resume Engineering">ATS Resume Engineering</option>
                        <option value="CV Design & Cover Letter">CV Design & Cover Letter</option>
                        <option value="Research Reports">Research Reports</option>
                        <option value="Investor Pitch Decks">Investor Pitch Decks</option>
                        <option value="Proposal Writing">Proposal Writing</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">Subject</label>
                    <input
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="e.g. Urgent 15-Slide Presentation Deck for Tomorrow"
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#E5C158]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">Project Details & Guidelines *</label>
                    <textarea
                      required
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Describe your project deadline, word/slide count, academic referencing style, or formatting guidelines..."
                      className="w-full bg-black/50 border border-white/10 rounded-xl p-3.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#E5C158]"
                    />
                  </div>

                  {/* File Upload Attachment */}
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">Attach Brief or Guidelines (Optional)</label>
                    <div className="relative border border-dashed border-white/20 rounded-xl p-3 text-center bg-black/30 hover:border-[#E5C158]/50 transition-colors">
                      <input
                        type="file"
                        onChange={handleFileChange}
                        accept=".pdf,.docx,.pptx,.png,.jpg,.zip"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <div className="flex items-center justify-center gap-2 text-xs text-neutral-400">
                        <Upload className="w-4 h-4 text-[#E5C158]" />
                        <span>{uploadedFile ? `Attached: ${uploadedFile.name}` : 'Click to attach PDF, DOCX, PPTX, or ZIP (Max 25MB)'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Submit Buttons */}
                  <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 rounded-xl bg-[#E5C158] text-[#050507] font-bold text-xs hover:bg-[#fce888] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg disabled:opacity-50"
                    >
                      <Send className="w-4 h-4" />
                      <span>{isSubmitting ? 'Sending Message...' : 'Send Message'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleSendWhatsApp}
                      className="w-full py-3 rounded-xl bg-[#28C76F] text-black font-bold text-xs hover:bg-[#32e080] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Send via WhatsApp</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Interactive Google Maps Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="glass-card rounded-3xl border border-white/10 p-6 sm:p-8 relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs text-[#E5C158] font-bold mb-1">
                <MapPin className="w-4 h-4" />
                <span>AGENCY HEADQUARTERS LOCATION</span>
              </div>
              <h3 className="text-xl font-poppins font-bold text-white">MFS Growth Agency — Islamabad, Pakistan</h3>
              <p className="text-xs text-neutral-400 mt-0.5">
                Providing round-the-clock digital service delivery to clients locally and internationally.
              </p>
            </div>

            <a
              href="https://maps.google.com/?q=Islamabad,Pakistan"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-[#E5C158] hover:text-[#050507] text-white text-xs font-semibold transition-all inline-flex items-center gap-2 shrink-0"
            >
              <span>Open in Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Map Embed Container */}
          <div className="w-full h-72 sm:h-96 rounded-2xl overflow-hidden border border-white/10 relative bg-[#121212]">
            <iframe
              title="MFS Growth Agency Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d212442.20456102604!2d72.9329986348602!3d33.61637222476717!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dfbfd07891722f%3A0x6059515c3bdb02b6!2sIslamabad%2C%20Islamabad%20Capital%20Territory%2C%20Pakistan!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'grayscale(0.8) contrast(1.2) invert(0.9)' }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-md border border-white/10 p-3 rounded-xl text-xs text-white max-w-xs">
              <span className="text-[#E5C158] font-bold block mb-0.5">MFS Growth Agency</span>
              <span className="text-neutral-300 block text-[11px]">Islamabad, Capital Territory, Pakistan</span>
              <span className="text-[#28C76F] text-[10px] block font-semibold mt-1">● 24/7 Online Support Center</span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Mini FAQ Preview Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="font-poppins text-xs font-bold uppercase tracking-widest text-[#E5C158] block mb-2">
            FREQUENTLY ASKED QUESTIONS
          </span>
          <h2 className="text-2xl sm:text-3xl font-poppins font-bold text-white mb-2">
            Quick Inquiries & Answers
          </h2>
          <p className="text-xs text-neutral-300">
            Find immediate answers regarding order submission, payment confirmation, and delivery speeds.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-3 mb-8">
          {FAQS.slice(0, 4).map((faq) => {
            const isOpen = openFaqId === faq.id;
            return (
              <div
                key={faq.id}
                className="glass-card rounded-xl border border-white/10 overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                  className="w-full p-4 text-left flex items-center justify-between text-xs sm:text-sm font-poppins font-bold text-white hover:text-[#E5C158] transition-colors"
                >
                  <span>{faq.question}</span>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-[#E5C158]" /> : <ChevronDown className="w-4 h-4 text-neutral-400" />}
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 text-xs text-neutral-300 leading-relaxed border-t border-white/5 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <button
            onClick={() => setIsAllFaqsModalOpen(true)}
            className="px-6 py-2.5 rounded-full bg-white/[0.05] border border-white/10 text-white font-semibold text-xs hover:bg-[#E5C158] hover:text-black hover:border-[#E5C158] transition-all cursor-pointer inline-flex items-center gap-2"
          >
            <span>View All FAQs</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* 6. Final Call to Action */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card rounded-3xl border border-[#E5C158]/30 p-8 sm:p-12 text-center relative overflow-hidden bg-gradient-to-r from-[#E5C158]/10 via-transparent to-black">
          <h2 className="text-2xl sm:text-4xl font-poppins font-bold text-white mb-4">
            Need Immediate Assistance with Your Project?
          </h2>
          <p className="text-neutral-300 text-xs sm:text-sm max-w-xl mx-auto mb-8 leading-relaxed">
            Our team is ready to assist you right now. Take advantage of our <strong className="text-[#E5C158]">50% Grand Launch Discount</strong> on all presentation design and academic writing orders.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onOpenOrderModal}
              className="px-8 py-3.5 rounded-full bg-[#E5C158] text-[#050507] font-bold text-xs hover:bg-[#fce888] transition-all shadow-xl cursor-pointer inline-flex items-center gap-2"
            >
              <span>Place Order Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={handleSendWhatsApp}
              className="px-8 py-3.5 rounded-full bg-[#28C76F] text-black font-bold text-xs hover:bg-[#34e082] transition-all shadow-xl cursor-pointer inline-flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Direct WhatsApp Chat</span>
            </button>
            <button
              onClick={() => onOpenAIChat?.('chat')}
              className="px-8 py-3.5 rounded-full bg-white/[0.05] border border-white/10 text-white font-bold text-xs hover:bg-white/10 transition-all shadow-xl cursor-pointer inline-flex items-center gap-2"
            >
              <Bot className="w-4 h-4 text-[#E5C158]" />
              <span>Ask AI Chatbot</span>
            </button>
            <button
              onClick={() => onOpenAIChat?.('voice')}
              className="px-8 py-3.5 rounded-full bg-white/[0.05] border border-white/10 text-white font-bold text-xs hover:bg-white/10 transition-all shadow-xl cursor-pointer inline-flex items-center gap-2"
            >
              <Mic className="w-4 h-4 text-[#28C76F]" />
              <span>Voice Assistant</span>
            </button>
          </div>
        </div>
      </section>

      {/* 7. All FAQs Modal */}
      {isAllFaqsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="glass-card rounded-2xl border border-white/20 p-6 sm:p-8 max-w-2xl w-full relative max-h-[85vh] overflow-y-auto">
            <button
              onClick={() => setIsAllFaqsModalOpen(false)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-poppins font-bold text-white mb-2">Frequently Asked Questions</h3>
            <p className="text-xs text-neutral-400 mb-6">
              Complete guide to MFS Growth Agency services, payment options, and revisions.
            </p>

            <div className="space-y-4 text-left">
              {FAQS.map((faq) => (
                <div key={faq.id} className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-2">
                  <h4 className="font-poppins font-bold text-xs text-[#E5C158]">{faq.question}</h4>
                  <p className="text-xs text-neutral-300 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
