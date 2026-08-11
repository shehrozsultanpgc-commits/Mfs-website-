import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  FileCode,
  Plus,
  Search,
  Edit3,
  Trash2,
  CheckCircle2,
  ShieldCheck,
  Eye,
  Copy,
  Archive,
  Layers,
  Settings,
  X,
  Save,
  Clock,
  Sparkles,
  ToggleLeft,
  ToggleRight,
  AlertCircle,
  ChevronDown
} from 'lucide-react';
import { Currency } from '../../types';

export interface FormField {
  id: string;
  label: string;
  type: 'text' | 'textarea' | 'email' | 'phone' | 'select' | 'file' | 'checkbox' | 'radio';
  placeholder?: string;
  required: boolean;
  options?: string[]; // for select/radio
}

export interface WebsiteForm {
  id: string;
  name: string;
  slug: string;
  formType: 'contact' | 'quote' | 'service_inquiry' | 'project_brief' | 'career' | 'newsletter' | 'ai_audit' | 'support' | 'custom';
  status: 'active' | 'draft' | 'disabled';
  totalSubmissions: number;
  lastSubmission: string;
  assignedTeam: string;
  notificationEmail: string;
  spamProtection: 'recaptcha_v3' | 'honeypot' | 'rate_limited';
  version: string;
  fields: FormField[];
}

interface CMSFormsManagerProps {
  currency: Currency;
  onShowToast?: (message: string) => void;
}

export const CMSFormsManager: React.FC<CMSFormsManagerProps> = ({
  currency,
  onShowToast,
}) => {
  const [forms, setForms] = useState<WebsiteForm[]>([
    {
      id: 'form-1',
      name: 'Primary Contact & Inquiry Form',
      slug: 'contact-form',
      formType: 'contact',
      status: 'active',
      totalSubmissions: 142,
      lastSubmission: '10 mins ago',
      assignedTeam: 'Client Support Team',
      notificationEmail: 'mfsmedia.agency@gmail.com',
      spamProtection: 'recaptcha_v3',
      version: 'v2.1',
      fields: [
        { id: 'f1', label: 'Full Name', type: 'text', required: true, placeholder: 'e.g. Shehroz Sultan' },
        { id: 'f2', label: 'Email Address', type: 'email', required: true, placeholder: 'e.g. client@domain.com' },
        { id: 'f3', label: 'Phone / WhatsApp', type: 'phone', required: true, placeholder: '+92 301 5323689' },
        { id: 'f4', label: 'Service Category', type: 'select', required: true, options: ['Presentation Design', 'Assignment Writing', 'Resume / CV', 'Report Formatting'] },
        { id: 'f5', label: 'Project Brief / Message', type: 'textarea', required: true, placeholder: 'Describe your project requirements...' },
      ],
    },
    {
      id: 'form-2',
      name: 'Instant Custom Quote & Scope Estimator',
      slug: 'quote-request-form',
      formType: 'quote',
      status: 'active',
      totalSubmissions: 98,
      lastSubmission: '1 hour ago',
      assignedTeam: 'Sales & Estimation Desk',
      notificationEmail: 'mfsmedia.agency@gmail.com',
      spamProtection: 'recaptcha_v3',
      version: 'v3.0',
      fields: [
        { id: 'q1', label: 'Full Name', type: 'text', required: true },
        { id: 'q2', label: 'Target Service', type: 'select', required: true, options: ['Executive Presentation', 'Academic Thesis/Assignment', 'ATS Resume Engineering'] },
        { id: 'q3', label: 'Estimated Slide/Page Count', type: 'text', required: true, placeholder: 'e.g. 15 slides or 3000 words' },
        { id: 'q4', label: 'Delivery Urgency SLA', type: 'select', required: true, options: ['Standard (3-5 Days)', 'Express 24h (+30%)', 'Priority 12h (+50%)'] },
        { id: 'q5', label: 'Attach Reference File (Optional)', type: 'file', required: false },
      ],
    },
    {
      id: 'form-3',
      name: 'Academic Assignment & Thesis Brief Form',
      slug: 'assignment-brief-form',
      formType: 'project_brief',
      status: 'active',
      totalSubmissions: 64,
      lastSubmission: '3 hours ago',
      assignedTeam: 'Academic Quality Lead',
      notificationEmail: 'mfsmedia.agency@gmail.com',
      spamProtection: 'recaptcha_v3',
      version: 'v1.4',
      fields: [
        { id: 'a1', label: 'Student / Client Name', type: 'text', required: true },
        { id: 'a2', label: 'University & Course Title', type: 'text', required: true },
        { id: 'a3', label: 'Referencing Format Required', type: 'select', required: true, options: ['APA 7th Edition', 'Harvard Style', 'MLA Format', 'IEEE'] },
        { id: 'a4', label: 'Upload Assignment Guidelines PDF', type: 'file', required: true },
      ],
    },
    {
      id: 'form-4',
      name: '50% Grand Launch Promo Newsletter Signup',
      slug: 'newsletter-signup',
      formType: 'newsletter',
      status: 'active',
      totalSubmissions: 280,
      lastSubmission: '25 mins ago',
      assignedTeam: 'Marketing Operations',
      notificationEmail: 'mfsmedia.agency@gmail.com',
      spamProtection: 'honeypot',
      version: 'v1.0',
      fields: [
        { id: 'n1', label: 'Email Address', type: 'email', required: true, placeholder: 'Enter your email for 50% discount code' },
      ],
    },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedForm, setSelectedForm] = useState<WebsiteForm | null>(null);
  const [isBuilderOpen, setIsBuilderOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const filteredForms = forms.filter(
    (f) =>
      f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.formType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.assignedTeam.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenBuilder = (form?: WebsiteForm) => {
    setSelectedForm(
      form || {
        id: `form-${Date.now()}`,
        name: 'New Custom Interactive Form',
        slug: 'custom-form',
        formType: 'custom',
        status: 'draft',
        totalSubmissions: 0,
        lastSubmission: 'Never',
        assignedTeam: 'Client Support Team',
        notificationEmail: 'mfsmedia.agency@gmail.com',
        spamProtection: 'recaptcha_v3',
        version: 'v1.0',
        fields: [
          { id: 'f1', label: 'Full Name', type: 'text', required: true },
          { id: 'f2', label: 'Email Address', type: 'email', required: true },
        ],
      }
    );
    setIsBuilderOpen(true);
  };

  const handleAddField = () => {
    if (!selectedForm) return;
    const newField: FormField = {
      id: `field-${Date.now()}`,
      label: 'New Field Label',
      type: 'text',
      required: false,
      placeholder: 'Enter response...',
    };
    setSelectedForm({
      ...selectedForm,
      fields: [...selectedForm.fields, newField],
    });
  };

  const handleRemoveField = (fieldId: string) => {
    if (!selectedForm) return;
    setSelectedForm({
      ...selectedForm,
      fields: selectedForm.fields.filter((f) => f.id !== fieldId),
    });
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedForm) return;

    const exists = forms.some((f) => f.id === selectedForm.id);
    if (exists) {
      setForms((prev) => prev.map((f) => (f.id === selectedForm.id ? selectedForm : f)));
      if (onShowToast) onShowToast(`Updated form schema "${selectedForm.name}" (${selectedForm.version})`);
    } else {
      setForms((prev) => [selectedForm, ...prev]);
      if (onShowToast) onShowToast(`Created new form "${selectedForm.name}"`);
    }
    setIsBuilderOpen(false);
  };

  const handleDuplicateForm = (form: WebsiteForm) => {
    const dup: WebsiteForm = {
      ...form,
      id: `form-${Date.now()}`,
      name: `${form.name} (Copy)`,
      totalSubmissions: 0,
      lastSubmission: 'Never',
      status: 'draft',
    };
    setForms((prev) => [dup, ...prev]);
    if (onShowToast) onShowToast(`Duplicated form "${form.name}"`);
  };

  const handleToggleStatus = (formId: string) => {
    setForms((prev) =>
      prev.map((f) => {
        if (f.id === formId) {
          const nextStatus = f.status === 'active' ? 'disabled' : 'active';
          if (onShowToast) onShowToast(`Toggled form "${f.name}" to ${nextStatus.toUpperCase()}`);
          return { ...f, status: nextStatus };
        }
        return f;
      })
    );
  };

  return (
    <div className="space-y-6">
      {/* HEADER BAR */}
      <div className="glass-card rounded-3xl border border-white/10 p-5 space-y-4 bg-[#0D0D12]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 font-mono text-[10px] font-bold border border-blue-500/30 uppercase">
                GLOBAL FORMS MANAGEMENT CENTER
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#28C76F]/10 text-[#28C76F] font-mono text-[10px] font-bold border border-[#28C76F]/30 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-[#28C76F]" />
                <span>SPAM PROTECTED</span>
              </span>
            </div>
            <h3 className="font-poppins font-bold text-white text-base mt-1">
              Website Forms, Builder & Validation Rules
            </h3>
            <p className="text-xs text-neutral-400">
              Manage inquiry forms, quote calculators, project brief schemas, validation requirements, and notification targets.
            </p>
          </div>

          <button
            onClick={() => handleOpenBuilder()}
            className="px-5 py-2.5 rounded-2xl bg-[#E5C158] text-black font-extrabold text-xs hover:bg-[#fce888] transition-all flex items-center gap-1.5 cursor-pointer shadow-lg shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Form</span>
          </button>
        </div>

        {/* SEARCH BAR */}
        <div className="pt-2 border-t border-white/10">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search website forms by name, category, or assigned team..."
              className="w-full bg-white/[0.04] border border-white/10 rounded-2xl pl-10 pr-4 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#E5C158]"
            />
          </div>
        </div>
      </div>

      {/* FORMS LIST GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredForms.map((form) => (
          <div
            key={form.id}
            className="glass-card rounded-3xl border border-white/10 p-5 space-y-4 bg-[#0D0D12] hover:border-[#E5C158]/50 transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="px-2.5 py-1 rounded-xl bg-white/5 border border-white/10 text-[#E5C158] font-mono text-[10px] font-bold uppercase">
                  {form.formType.replace('_', ' ')}
                </span>
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2.5 py-0.5 rounded-full font-mono text-[9px] font-bold uppercase border ${
                      form.status === 'active'
                        ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                        : 'bg-neutral-500/20 text-neutral-400 border-neutral-500/30'
                    }`}
                  >
                    {form.status}
                  </span>
                  <span className="text-neutral-500 font-mono text-[10px]">{form.version}</span>
                </div>
              </div>

              <strong className="text-white text-base font-bold block leading-tight">
                {form.name}
              </strong>

              <div className="grid grid-cols-2 gap-2 text-xs text-neutral-300 font-mono bg-white/[0.02] p-3 rounded-2xl border border-white/5">
                <div>
                  <span className="text-[10px] text-neutral-500 block uppercase">Submissions</span>
                  <strong className="text-white text-sm font-bold">{form.totalSubmissions}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-neutral-500 block uppercase">Last Activity</span>
                  <strong className="text-neutral-300 text-xs">{form.lastSubmission}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-neutral-500 block uppercase">Fields Count</span>
                  <strong className="text-amber-400 text-xs">{form.fields.length} Fields</strong>
                </div>
                <div>
                  <span className="text-[10px] text-neutral-500 block uppercase">Spam Guard</span>
                  <strong className="text-emerald-400 text-xs">{form.spamProtection}</strong>
                </div>
              </div>

              <div className="text-[10px] font-mono text-neutral-400">
                Assigned Team: <strong className="text-white">{form.assignedTeam}</strong>
              </div>
            </div>

            <div className="pt-3 border-t border-white/5 flex items-center justify-between">
              <button
                onClick={() => handleToggleStatus(form.id)}
                className="text-[10px] font-mono text-neutral-400 hover:text-white flex items-center gap-1 cursor-pointer"
              >
                {form.status === 'active' ? (
                  <ToggleRight className="w-4 h-4 text-emerald-400" />
                ) : (
                  <ToggleLeft className="w-4 h-4 text-neutral-500" />
                )}
                <span>Toggle Status</span>
              </button>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => {
                    setSelectedForm(form);
                    setIsPreviewOpen(true);
                  }}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white transition-colors cursor-pointer"
                  title="Preview Form Schema"
                >
                  <Eye className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => handleDuplicateForm(form)}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white transition-colors cursor-pointer"
                  title="Duplicate Form"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => handleOpenBuilder(form)}
                  className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-[#E5C158] hover:text-black text-white font-bold transition-all text-xs flex items-center gap-1 cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit Builder</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* FORM BUILDER MODAL */}
      <AnimatePresence>
        {isBuilderOpen && selectedForm && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-2xl bg-[#0D0D12] border border-white/10 rounded-3xl p-6 space-y-4 shadow-2xl my-8"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2 text-[#E5C158]">
                  <FileCode className="w-5 h-5" />
                  <h3 className="font-poppins font-bold text-white text-base">
                    Form Schema & Field Builder ({selectedForm.version})
                  </h3>
                </div>
                <button
                  onClick={() => setIsBuilderOpen(false)}
                  className="p-1 rounded-lg text-neutral-400 hover:text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveForm} className="space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-neutral-400 font-mono text-[10px] uppercase block mb-1">
                      Form Title
                    </label>
                    <input
                      type="text"
                      required
                      value={selectedForm.name}
                      onChange={(e) => setSelectedForm({ ...selectedForm, name: e.target.value })}
                      className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#E5C158] font-bold"
                    />
                  </div>

                  <div>
                    <label className="text-neutral-400 font-mono text-[10px] uppercase block mb-1">
                      Target Notification Email
                    </label>
                    <input
                      type="email"
                      required
                      value={selectedForm.notificationEmail}
                      onChange={(e) => setSelectedForm({ ...selectedForm, notificationEmail: e.target.value })}
                      className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#E5C158]"
                    />
                  </div>
                </div>

                {/* FIELDS LIST BUILDER */}
                <div className="space-y-2 border-t border-b border-white/10 py-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[#E5C158] font-mono text-[10px] uppercase font-bold">
                      Interactive Form Fields ({selectedForm.fields.length})
                    </span>
                    <button
                      type="button"
                      onClick={handleAddField}
                      className="px-3 py-1 rounded-xl bg-white/10 hover:bg-[#E5C158] hover:text-black text-white font-bold text-[10px] transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Add Field</span>
                    </button>
                  </div>

                  <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                    {selectedForm.fields.map((field, index) => (
                      <div
                        key={field.id}
                        className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[10px] font-mono text-neutral-400">Field #{index + 1}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveField(field.id)}
                            className="text-neutral-500 hover:text-red-400 text-[10px] cursor-pointer"
                          >
                            Remove
                          </button>
                        </div>

                        <div className="grid grid-cols-3 gap-2">
                          <input
                            type="text"
                            placeholder="Field Label"
                            value={field.label}
                            onChange={(e) => {
                              const updated = selectedForm.fields.map((f) =>
                                f.id === field.id ? { ...f, label: e.target.value } : f
                              );
                              setSelectedForm({ ...selectedForm, fields: updated });
                            }}
                            className="bg-black/50 border border-white/10 rounded-xl px-2.5 py-1.5 text-xs text-white"
                          />

                          <select
                            value={field.type}
                            onChange={(e) => {
                              const updated = selectedForm.fields.map((f) =>
                                f.id === field.id ? { ...f, type: e.target.value as any } : f
                              );
                              setSelectedForm({ ...selectedForm, fields: updated });
                            }}
                            className="bg-black/50 border border-white/10 rounded-xl px-2 py-1.5 text-xs text-white"
                          >
                            <option value="text">Text Input</option>
                            <option value="textarea">Textarea</option>
                            <option value="email">Email</option>
                            <option value="phone">Phone / WhatsApp</option>
                            <option value="select">Dropdown Select</option>
                            <option value="file">File Upload</option>
                          </select>

                          <label className="flex items-center gap-1.5 text-[10px] text-neutral-300 font-mono cursor-pointer">
                            <input
                              type="checkbox"
                              checked={field.required}
                              onChange={(e) => {
                                const updated = selectedForm.fields.map((f) =>
                                  f.id === field.id ? { ...f, required: e.target.checked } : f
                                );
                                setSelectedForm({ ...selectedForm, fields: updated });
                              }}
                              className="accent-[#E5C158]"
                            />
                            <span>Required Field</span>
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsBuilderOpen(false)}
                    className="px-4 py-2 rounded-xl bg-white/10 text-neutral-300 font-bold cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-[#E5C158] text-black font-extrabold shadow-lg cursor-pointer"
                  >
                    Save Form Schema
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* FORM PREVIEW MODAL */}
      <AnimatePresence>
        {isPreviewOpen && selectedForm && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg bg-[#0D0D12] border border-white/10 rounded-3xl p-6 space-y-4 shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2 text-[#E5C158]">
                  <Eye className="w-5 h-5" />
                  <h3 className="font-poppins font-bold text-white text-base">
                    Live Form Preview: {selectedForm.name}
                  </h3>
                </div>
                <button
                  onClick={() => setIsPreviewOpen(false)}
                  className="p-1 rounded-lg text-neutral-400 hover:text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 bg-white/[0.02] p-4 rounded-2xl border border-white/5 text-xs">
                {selectedForm.fields.map((f) => (
                  <div key={f.id} className="space-y-1">
                    <label className="text-neutral-300 font-mono text-[10px] block">
                      {f.label} {f.required && <span className="text-red-400">*</span>}
                    </label>
                    {f.type === 'textarea' ? (
                      <textarea
                        disabled
                        placeholder={f.placeholder || 'Textarea input...'}
                        className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-3 py-2 text-xs text-neutral-400"
                        rows={2}
                      />
                    ) : f.type === 'select' ? (
                      <div className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-3 py-2 text-xs text-neutral-400 flex justify-between items-center">
                        <span>{f.options?.[0] || 'Select option...'}</span>
                        <ChevronDown className="w-3.5 h-3.5" />
                      </div>
                    ) : (
                      <input
                        type="text"
                        disabled
                        placeholder={f.placeholder || `Enter ${f.label.toLowerCase()}...`}
                        className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-3 py-2 text-xs text-neutral-400"
                      />
                    )}
                  </div>
                ))}

                <button
                  disabled
                  className="w-full py-2.5 rounded-xl bg-[#E5C158]/50 text-black font-extrabold text-xs mt-2"
                >
                  Submit Form (Preview Mode)
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
