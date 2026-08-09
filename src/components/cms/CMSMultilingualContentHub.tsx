import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Languages,
  Globe,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Search,
  RefreshCw,
  Eye,
  Bot,
  Layers,
  ArrowRight,
  Sliders,
  Check,
  X
} from 'lucide-react';
import { Currency } from '../../types';

interface CMSMultilingualContentHubProps {
  currency: Currency;
  onShowToast?: (message: string) => void;
}

export interface TranslationKey {
  id: string;
  key: string;
  section: 'homepage' | 'services' | 'blog' | 'pricing' | 'legal' | 'navigation';
  englishText: string;
  urduText: string;
  arabicText: string;
  frenchText: string;
  germanText: string;
  spanishText: string;
  status: 'fully_translated' | 'partial' | 'missing' | 'in_ai_queue';
  lastUpdated: string;
}

export const CMSMultilingualContentHub: React.FC<CMSMultilingualContentHubProps> = ({
  currency,
  onShowToast,
}) => {
  // Supported Languages List
  const languages = [
    { code: 'en', name: 'English (US/UK)', flag: '🇬🇧', status: 'Primary (100%)' },
    { code: 'ur', name: 'Urdu (Pakistan)', flag: '🇵🇰', status: 'Active (94%)' },
    { code: 'ar', name: 'Arabic (Middle East)', flag: '🇦🇪', status: 'Active (88%)' },
    { code: 'fr', name: 'French (Europe)', flag: '🇫🇷', status: 'Stage 2 Queue (65%)' },
    { code: 'de', name: 'German (Europe)', flag: '🇩🇪', status: 'Stage 2 Queue (50%)' },
    { code: 'es', name: 'Spanish (Latin Am/US)', flag: '🇪🇸', status: 'Stage 2 Queue (42%)' },
  ];

  // Translation Strings Table State
  const [translationKeys, setTranslationKeys] = useState<TranslationKey[]>([
    {
      id: 'tk-1',
      key: 'hero.tagline',
      section: 'homepage',
      englishText: 'Helping Students & Professionals Grow with High-Quality Digital Solutions.',
      urduText: 'طلباء اور پیشہ ور افراد کو معیاری ڈیجیٹل حل کے ساتھ آگے بڑھنے میں مدد کرنا۔',
      arabicText: 'مساعدة الطلاب والمهنيين على النمو من خلال حلول رقمية عالية الجودة.',
      frenchText: 'Aider les étudiants et les professionnels à grandir avec des solutions numériques de haute qualité.',
      germanText: 'Unterstützung von Studenten und Fachkräften beim Wachstum mit hochwertigen digitalen Lösungen.',
      spanishText: 'Ayudando a estudiantes y profesionales a crecer con soluciones digitales de alta calidad.',
      status: 'fully_translated',
      lastUpdated: '2026-07-26 12:00 PKT',
    },
    {
      id: 'tk-2',
      key: 'offer.grand_launch',
      section: 'pricing',
      englishText: '50% Grand Launch Discount active across all services.',
      urduText: 'تمام سروسز پر 50٪ گرینڈ لانچ ڈسکاؤنٹ فعال ہے۔',
      arabicText: 'خصم الإطلاق الكبير بنسبة 50٪ نشط عبر جميع الخدمات.',
      frenchText: 'Remise de lancement de 50% active sur tous les services.',
      germanText: '50% Eröffnungsrabatt auf alle Dienstleistungen aktiv.',
      spanishText: 'Descuento de gran lanzamiento del 50% activo en todos los servicios.',
      status: 'fully_translated',
      lastUpdated: '2026-07-25 15:30 PKT',
    },
    {
      id: 'tk-3',
      key: 'services.presentation_design',
      section: 'services',
      englishText: 'Executive pitch decks, academic slide decks & corporate presentations.',
      urduText: 'ایگزیکٹو پچ ڈیکس، تعلیمی سلائیڈ ڈیکس اور کارپوریٹ پریزنٹیشنز۔',
      arabicText: 'عروض تقديمية تنفيذية وعروض أكاديمية وعروض الشركات.',
      frenchText: 'Présentations exécutives, supports de cours et présentations d\'entreprise.',
      germanText: 'Ablaufpräsentationen für Führungskräfte, akademische Folien & Unternehmenspräsentationen.',
      spanishText: 'Presentaciones ejecutivas, diapositivas académicas y presentaciones corporativas.',
      status: 'partial',
      lastUpdated: '2026-07-24 18:40 PKT',
    },
    {
      id: 'tk-4',
      key: 'legal.disclaimer_watermark',
      section: 'legal',
      englishText: 'Sample items under "Our Work" are for secured preview only.',
      urduText: 'ہمارے کام کے تحت نمونہ جات صرف محفوظ پیش نظارہ کے لیے ہیں۔',
      arabicText: 'العينات الموضحة ضمن "أعمالنا" هي للمعاينة الآمنة فقط.',
      frenchText: 'Les exemples sous "Notre Travail" sont réservés à l\'aperçu sécurisé.',
      germanText: 'Muster unter "Unsere Arbeit" dienen nur der gesicherten Vorschau.',
      spanishText: 'Los elementos de muestra en "Nuestro Trabajo" son solo para vista previa protegida.',
      status: 'fully_translated',
      lastUpdated: '2026-07-22 10:15 PKT',
    },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSection, setSelectedSection] = useState('all');
  const [previewLanguage, setPreviewLanguage] = useState<'en' | 'ur' | 'ar' | 'fr' | 'de' | 'es'>('en');
  const [selectedKey, setSelectedKey] = useState<TranslationKey | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  const filteredKeys = translationKeys.filter((tk) => {
    const matchesSearch =
      tk.key.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tk.englishText.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tk.urduText.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSection = selectedSection === 'all' || tk.section === selectedSection;
    return matchesSearch && matchesSection;
  });

  const handleOpenEditor = (tk: TranslationKey) => {
    setSelectedKey(tk);
    setIsEditorOpen(true);
  };

  const handleRunAiTranslation = () => {
    if (onShowToast) onShowToast('AI Translation Engine queued for English → Urdu, Arabic, French, German, Spanish!');
  };

  return (
    <div className="space-y-6">
      {/* HEADER BAR */}
      <div className="glass-card rounded-3xl border border-white/10 p-5 space-y-4 bg-[#0D0D12]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-400 font-mono text-[10px] font-bold border border-purple-500/30 uppercase">
                MULTILINGUAL CONTENT HUB
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#28C76F]/10 text-[#28C76F] font-mono text-[10px] font-bold border border-[#28C76F]/30 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-[#28C76F]" />
                <span>STAGE 2 TRANSLATION ARCHITECTURE READY</span>
              </span>
            </div>
            <h3 className="font-poppins font-bold text-white text-base mt-1">
              Internationalization & Multilingual Translation Operations
            </h3>
            <p className="text-xs text-neutral-400">
              Manage multi-language translations for English, Urdu, Arabic, French, German, and Spanish with missing string alerts and AI translation queues.
            </p>
          </div>

          <button
            onClick={handleRunAiTranslation}
            className="px-5 py-2.5 rounded-2xl bg-[#E5C158] text-black font-extrabold text-xs hover:bg-[#fce888] transition-all flex items-center gap-1.5 cursor-pointer shadow-lg shrink-0"
          >
            <Sparkles className="w-4 h-4" />
            <span>Auto-Translate Missing Strings</span>
          </button>
        </div>

        {/* SUPPORTED LANGUAGES STATUS CARDS */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-2 border-t border-white/10">
          {languages.map((lang) => (
            <div
              key={lang.code}
              onClick={() => setPreviewLanguage(lang.code as any)}
              className={`p-3 rounded-2xl border transition-all cursor-pointer ${
                previewLanguage === lang.code
                  ? 'bg-[#E5C158]/10 border-[#E5C158] shadow-[0_0_15px_rgba(229,193,88,0.2)]'
                  : 'bg-white/[0.02] border-white/10 hover:border-white/20'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-lg">{lang.flag}</span>
                <span className="text-[9px] font-mono font-bold text-[#E5C158] uppercase">
                  {lang.code}
                </span>
              </div>
              <strong className="text-white text-xs font-bold block mt-1 line-clamp-1">
                {lang.name}
              </strong>
              <span className="text-[10px] text-neutral-400 font-mono block mt-0.5">
                {lang.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* SEARCH, FILTERS & LIVE TRANSLATION PREVIEW */}
      <div className="glass-card rounded-3xl border border-white/10 p-5 space-y-4 bg-[#0D0D12]">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search translation keys, English text, Urdu, Arabic..."
              className="w-full bg-white/[0.04] border border-white/10 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#E5C158]"
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
              className="bg-white/[0.04] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-neutral-300 font-mono focus:outline-none"
            >
              <option value="all" className="bg-black">All Website Sections</option>
              <option value="homepage" className="bg-black">Homepage</option>
              <option value="services" className="bg-black">Services</option>
              <option value="pricing" className="bg-black">Pricing & Discounts</option>
              <option value="blog" className="bg-black">Blog & CMS</option>
              <option value="legal" className="bg-black">Legal & Policies</option>
            </select>
          </div>
        </div>

        {/* TRANSLATION KEYS TABLE */}
        <div className="overflow-x-auto rounded-2xl border border-white/10">
          <table className="w-full text-left text-xs">
            <thead className="bg-white/[0.03] text-neutral-400 font-mono uppercase text-[10px] border-b border-white/10">
              <tr>
                <th className="py-3 px-4">Translation Key</th>
                <th className="py-3 px-4">Section</th>
                <th className="py-3 px-4">English Master String</th>
                <th className="py-3 px-4">Selected Language Output ({previewLanguage.toUpperCase()})</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-neutral-300">
              {filteredKeys.map((tk) => {
                const langText =
                  previewLanguage === 'en'
                    ? tk.englishText
                    : previewLanguage === 'ur'
                    ? tk.urduText
                    : previewLanguage === 'ar'
                    ? tk.arabicText
                    : previewLanguage === 'fr'
                    ? tk.frenchText
                    : previewLanguage === 'de'
                    ? tk.germanText
                    : tk.spanishText;

                return (
                  <tr key={tk.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3.5 px-4 font-mono text-[#E5C158] font-bold">
                      {tk.key}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-[10px] uppercase text-neutral-400">
                      {tk.section}
                    </td>
                    <td className="py-3.5 px-4 text-white max-w-xs font-sans">
                      {tk.englishText}
                    </td>
                    <td className="py-3.5 px-4 text-emerald-400 font-sans max-w-xs" dir={previewLanguage === 'ur' || previewLanguage === 'ar' ? 'rtl' : 'ltr'}>
                      {langText || <span className="text-red-400 italic font-mono text-[10px]">Missing Translation</span>}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono text-[10px] font-bold border border-emerald-500/30 uppercase">
                        {tk.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => handleOpenEditor(tk)}
                        className="px-3 py-1 rounded-xl bg-white/5 hover:bg-[#E5C158]/20 text-neutral-300 hover:text-[#E5C158] transition-colors cursor-pointer font-bold text-[11px]"
                      >
                        Edit Translations
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* TRANSLATION EDITOR MODAL */}
      <AnimatePresence>
        {isEditorOpen && selectedKey && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-2xl bg-[#0D0D12] border border-white/10 rounded-3xl p-6 space-y-5 shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2 text-[#E5C158]">
                  <Globe className="w-5 h-5" />
                  <h3 className="font-poppins font-bold text-white text-base">
                    Edit Translation: {selectedKey.key}
                  </h3>
                </div>
                <button
                  onClick={() => setIsEditorOpen(false)}
                  className="p-1 rounded-lg text-neutral-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="text-neutral-400 font-mono text-[10px] uppercase block mb-1">
                    English (Master Text)
                  </label>
                  <input
                    type="text"
                    value={selectedKey.englishText}
                    onChange={(e) => setSelectedKey({ ...selectedKey, englishText: e.target.value })}
                    className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#E5C158]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-neutral-400 font-mono text-[10px] uppercase block mb-1">
                      Urdu Translation (🇵🇰)
                    </label>
                    <input
                      type="text"
                      dir="rtl"
                      value={selectedKey.urduText}
                      onChange={(e) => setSelectedKey({ ...selectedKey, urduText: e.target.value })}
                      className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#E5C158]"
                    />
                  </div>

                  <div>
                    <label className="text-neutral-400 font-mono text-[10px] uppercase block mb-1">
                      Arabic Translation (🇦🇪)
                    </label>
                    <input
                      type="text"
                      dir="rtl"
                      value={selectedKey.arabicText}
                      onChange={(e) => setSelectedKey({ ...selectedKey, arabicText: e.target.value })}
                      className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#E5C158]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-neutral-400 font-mono text-[10px] uppercase block mb-1">
                      French (🇫🇷)
                    </label>
                    <input
                      type="text"
                      value={selectedKey.frenchText}
                      onChange={(e) => setSelectedKey({ ...selectedKey, frenchText: e.target.value })}
                      className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#E5C158]"
                    />
                  </div>

                  <div>
                    <label className="text-neutral-400 font-mono text-[10px] uppercase block mb-1">
                      German (🇩🇪)
                    </label>
                    <input
                      type="text"
                      value={selectedKey.germanText}
                      onChange={(e) => setSelectedKey({ ...selectedKey, germanText: e.target.value })}
                      className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#E5C158]"
                    />
                  </div>

                  <div>
                    <label className="text-neutral-400 font-mono text-[10px] uppercase block mb-1">
                      Spanish (🇪🇸)
                    </label>
                    <input
                      type="text"
                      value={selectedKey.spanishText}
                      onChange={(e) => setSelectedKey({ ...selectedKey, spanishText: e.target.value })}
                      className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#E5C158]"
                    />
                  </div>
                </div>

                <div className="pt-4 flex justify-end gap-3 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setIsEditorOpen(false)}
                    className="px-5 py-2.5 rounded-2xl bg-white/10 text-neutral-300 font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setTranslationKeys((prev) =>
                        prev.map((k) => (k.id === selectedKey.id ? selectedKey : k))
                      );
                      if (onShowToast) onShowToast(`Saved translations for "${selectedKey.key}"`);
                      setIsEditorOpen(false);
                    }}
                    className="px-6 py-2.5 rounded-2xl bg-[#E5C158] text-black font-extrabold shadow-lg hover:bg-[#fce888]"
                  >
                    Save Translation Strings
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
