import React, { useState, useEffect } from 'react';
import {
  Activity,
  Server,
  Shield,
  AlertTriangle,
  Cpu,
  HardDrive,
  Database,
  Zap,
  RefreshCw,
  Radio,
  CheckCircle2,
  XCircle,
  Clock,
  ShieldAlert,
  Lock,
  Terminal,
  Sliders,
  Layers,
  Eye,
  Download,
  Play,
  Pause,
  Power,
  RotateCcw,
  FileText,
  Search,
  Filter,
  Bell,
  UserCheck,
  ShieldCheck,
  Wifi,
  Globe,
  Box,
  Cloud,
  ArrowUpRight,
  ChevronRight,
  Check,
  Sparkles,
  Plus,
  AlertCircle,
  Info,
  ExternalLink,
  Calendar,
  Key,
  UserCog,
  DatabaseZap,
  Tag,
  Share2,
  Trash2,
  Edit3,
  X,
  MessageSquare
} from 'lucide-react';
import { Currency } from '../types';

interface EnterprisePlatformOperationsCenterProps {
  currency: Currency;
  onShowToast?: (message: string) => void;
  onNavigateTab?: (tab: string) => void;
}

type OpsSubTab =
  | 'exec_overview'
  | 'monitoring'
  | 'incidents'
  | 'maintenance'
  | 'backups'
  | 'releases'
  | 'audit_logs'
  | 'soc'
  | 'notifications'
  | 'future_hub';

interface ServiceHealthItem {
  id: string;
  name: string;
  category: 'Infrastructure' | 'Database' | 'Security' | 'AI' | 'Services' | 'Core';
  status: 'Operational' | 'Degraded' | 'Outage' | 'Maintenance';
  healthPercent: number;
  responseTimeMs: number;
  lastIncident: string;
  lastRestart: string;
  availability: string;
}

interface IncidentItem {
  id: string;
  title: string;
  description: string;
  severity: 'Information' | 'Low' | 'Medium' | 'High' | 'Critical';
  affectedService: string;
  assignedEngineer: string;
  status: 'Investigating' | 'Identified' | 'Monitoring' | 'Resolved';
  createdAt: string;
  resolvedAt?: string;
  resolutionNotes?: string;
  rootCausePlaceholder: string;
}

interface AuditLogEntry {
  id: string;
  timestamp: string;
  actorName: string;
  actorRole: string;
  category:
    | 'User Login'
    | 'Admin Action'
    | 'Configuration Change'
    | 'Permission Change'
    | 'Content Publishing'
    | 'AI Prompt Update'
    | 'Payment Action'
    | 'Workflow Execution'
    | 'File Upload'
    | 'Security Event';
  actionDetail: string;
  ipAddress: string;
  severity: 'Info' | 'Notice' | 'Warning' | 'Critical';
  status: 'SUCCESS' | 'FAILED' | 'BLOCKED';
}

interface OperationalAlert {
  id: string;
  title: string;
  category: 'Security' | 'Payments' | 'AI' | 'CMS' | 'CRM' | 'Orders' | 'Finance' | 'Storage' | 'Performance' | 'Integrations';
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  message: string;
  timestamp: string;
  acknowledged: boolean;
  assignedTo: string;
}

export const EnterprisePlatformOperationsCenter: React.FC<EnterprisePlatformOperationsCenterProps> = ({
  currency,
  onShowToast,
  onNavigateTab,
}) => {
  const [subTab, setSubTab] = useState<OpsSubTab>('exec_overview');
  const [isLivePingActive, setIsLivePingActive] = useState<boolean>(true);
  const [lastRefreshedAt, setLastRefreshedAt] = useState<string>('Just now');
  const [readOnlyMode, setReadOnlyMode] = useState<boolean>(false);
  const [maintenanceMode, setMaintenanceMode] = useState<boolean>(false);
  const [maintenanceBannerText, setMaintenanceBannerText] = useState<string>(
    'System Maintenance Scheduled for 03:00 AM PKT. All Services Operational.'
  );

  // Modals state
  const [selectedIncident, setSelectedIncident] = useState<IncidentItem | null>(null);
  const [isCreateIncidentModalOpen, setIsCreateIncidentModalOpen] = useState<boolean>(false);
  const [isBackupModalOpen, setIsBackupModalOpen] = useState<boolean>(false);
  const [isRollbackModalOpen, setIsRollbackModalOpen] = useState<boolean>(false);
  const [newIncidentForm, setNewIncidentForm] = useState({
    title: '',
    severity: 'Medium' as IncidentItem['severity'],
    affectedService: 'Express API Backend Engine',
    description: '',
  });

  // Search & Filter States
  const [incidentSearch, setIncidentSearch] = useState('');
  const [incidentSeverityFilter, setIncidentSeverityFilter] = useState('all');
  const [auditSearch, setAuditSearch] = useState('');
  const [auditCategoryFilter, setAuditCategoryFilter] = useState('all');
  const [alertCategoryFilter, setAlertCategoryFilter] = useState('all');

  // Mock Monitoring Data
  const [services, setServices] = useState<ServiceHealthItem[]>([
    {
      id: 'srv-001',
      name: 'Frontend Web Applet (Vite/React)',
      category: 'Infrastructure',
      status: 'Operational',
      healthPercent: 99.9,
      responseTimeMs: 18,
      lastIncident: 'None in 30 days',
      lastRestart: '2 days ago',
      availability: '99.99%',
    },
    {
      id: 'srv-002',
      name: 'Express API Gateway Engine',
      category: 'Core',
      status: 'Operational',
      healthPercent: 99.8,
      responseTimeMs: 34,
      lastIncident: '3 days ago (Resolved)',
      lastRestart: '12 hours ago',
      availability: '99.98%',
    },
    {
      id: 'srv-003',
      name: 'Supabase PostgreSQL DB Cluster',
      category: 'Database',
      status: 'Operational',
      healthPercent: 100,
      responseTimeMs: 12,
      lastIncident: 'None in 60 days',
      lastRestart: '7 days ago',
      availability: '99.99%',
    },
    {
      id: 'srv-004',
      name: 'Firebase Auth & Role Security',
      category: 'Security',
      status: 'Operational',
      healthPercent: 100,
      responseTimeMs: 22,
      lastIncident: 'None in 90 days',
      lastRestart: 'Managed Cloud',
      availability: '100%',
    },
    {
      id: 'srv-005',
      name: 'Encrypted Cloud Storage (GCP Vault)',
      category: 'Infrastructure',
      status: 'Operational',
      healthPercent: 99.7,
      responseTimeMs: 45,
      lastIncident: '5 days ago (Info)',
      lastRestart: 'Managed Cloud',
      availability: '99.95%',
    },
    {
      id: 'srv-006',
      name: 'Gemini 1.5 Pro AI Gateway',
      category: 'AI',
      status: 'Operational',
      healthPercent: 99.5,
      responseTimeMs: 180,
      lastIncident: '1 day ago (Rate Soft Cap)',
      lastRestart: '4 hours ago',
      availability: '99.90%',
    },
    {
      id: 'srv-007',
      name: 'Payment Integration Proxy (PKR/USD)',
      category: 'Services',
      status: 'Operational',
      healthPercent: 99.9,
      responseTimeMs: 65,
      lastIncident: '2 days ago (Webhook Delay)',
      lastRestart: '1 day ago',
      availability: '99.97%',
    },
    {
      id: 'srv-008',
      name: 'Resend Email SMTP Service',
      category: 'Services',
      status: 'Operational',
      healthPercent: 99.8,
      responseTimeMs: 110,
      lastIncident: 'None in 14 days',
      lastRestart: 'Managed API',
      availability: '99.96%',
    },
    {
      id: 'srv-009',
      name: 'WhatsApp & SMS Alert Gateway',
      category: 'Services',
      status: 'Degraded',
      healthPercent: 94.2,
      responseTimeMs: 420,
      lastIncident: 'Active (Upstream Provider latency)',
      lastRestart: '30 mins ago',
      availability: '98.50%',
    },
    {
      id: 'srv-010',
      name: 'Workflow & Order State Machine',
      category: 'Core',
      status: 'Operational',
      healthPercent: 100,
      responseTimeMs: 15,
      lastIncident: 'None in 45 days',
      lastRestart: '12 hours ago',
      availability: '99.99%',
    },
    {
      id: 'srv-011',
      name: 'Enterprise CMS Engine',
      category: 'Core',
      status: 'Operational',
      healthPercent: 99.9,
      responseTimeMs: 25,
      lastIncident: 'None in 20 days',
      lastRestart: '12 hours ago',
      availability: '99.98%',
    },
    {
      id: 'srv-012',
      name: 'Enterprise CRM Command Hub',
      category: 'Core',
      status: 'Operational',
      healthPercent: 99.9,
      responseTimeMs: 28,
      lastIncident: 'None in 20 days',
      lastRestart: '12 hours ago',
      availability: '99.98%',
    },
    {
      id: 'srv-013',
      name: 'Automation & Business Trigger Engine',
      category: 'Services',
      status: 'Operational',
      healthPercent: 99.6,
      responseTimeMs: 50,
      lastIncident: 'Yesterday (Handled)',
      lastRestart: '6 hours ago',
      availability: '99.92%',
    },
  ]);

  // Mock Incidents
  const [incidents, setIncidents] = useState<IncidentItem[]>([
    {
      id: 'INC-2026-089',
      title: 'WhatsApp & SMS Gateway Upstream Response Delay',
      description: 'Upstream SMS provider experiencing temporary dispatch delays for OTP and order notifications.',
      severity: 'Medium',
      affectedService: 'WhatsApp & SMS Alert Gateway',
      assignedEngineer: 'DevOps Team Lead',
      status: 'Monitoring',
      createdAt: '2026-07-27 02:15 PKT',
      rootCausePlaceholder: 'Upstream vendor infrastructure congestion during peak broadcast hours.',
    },
    {
      id: 'INC-2026-088',
      title: 'Gemini Voice AI Soft Token Quota Warning',
      description: 'High volume of audio queries triggered soft warning threshold on Gemini 1.5 Flash endpoint.',
      severity: 'Low',
      affectedService: 'Gemini 1.5 Pro AI Gateway',
      assignedEngineer: 'AI Infrastructure Architect',
      status: 'Resolved',
      createdAt: '2026-07-26 18:40 PKT',
      resolvedAt: '2026-07-26 19:10 PKT',
      resolutionNotes: 'Auto-scaled token allocation pool and enabled caching layer for standard FAQ prompts.',
      rootCausePlaceholder: 'Concurrent student queries during active launch promotion.',
    },
    {
      id: 'INC-2026-087',
      title: 'EasyPaisa Webhook Signature Verification Timeout',
      description: 'Transient timeout on webhook callback endpoint for order payment receipts.',
      severity: 'Medium',
      affectedService: 'Payment Integration Proxy (PKR/USD)',
      assignedEngineer: 'Senior Financial Systems Engineer',
      status: 'Resolved',
      createdAt: '2026-07-25 11:05 PKT',
      resolvedAt: '2026-07-25 11:22 PKT',
      resolutionNotes: 'Increased HTTP timeout threshold from 3000ms to 6000ms and added retry queue.',
      rootCausePlaceholder: 'EasyPaisa sandbox gateway network packet re-routing.',
    },
    {
      id: 'INC-2026-086',
      title: 'Routine SSL Certificate Automated Renewal',
      description: 'Scheduled edge certificate renewal across subdomains completed seamlessly.',
      severity: 'Information',
      affectedService: 'Frontend Web Applet (Vite/React)',
      assignedEngineer: 'Automated Bot System',
      status: 'Resolved',
      createdAt: '2026-07-22 04:00 PKT',
      resolvedAt: '2026-07-22 04:02 PKT',
      resolutionNotes: 'Let\'s Encrypt ACME renewal verified and propagated.',
      rootCausePlaceholder: 'Automated 90-day security maintenance cycle.',
    },
  ]);

  // Mock Audit Logs
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>([
    {
      id: 'LOG-91024',
      timestamp: '2026-07-27 03:15:22 PKT',
      actorName: 'Muhammad Shehroz Sultan',
      actorRole: 'Super Admin',
      category: 'Admin Action',
      actionDetail: 'Updated Website CMS Service Pricing Rates & 50% Promo Banner settings',
      ipAddress: '111.68.102.45',
      severity: 'Info',
      status: 'SUCCESS',
    },
    {
      id: 'LOG-91023',
      timestamp: '2026-07-27 02:40:11 PKT',
      actorName: 'Muhammad Shehroz Sultan',
      actorRole: 'Super Admin',
      category: 'Security Event',
      actionDetail: 'Verified Master Security PIN & Google SSO workspace session',
      ipAddress: '111.68.102.45',
      severity: 'Notice',
      status: 'SUCCESS',
    },
    {
      id: 'LOG-91022',
      timestamp: '2026-07-27 01:20:00 PKT',
      actorName: 'Automated Backup Engine',
      actorRole: 'System Bot',
      category: 'Configuration Change',
      actionDetail: 'Executed daily automated encrypted backup to GCP bucket gs://mfs-backups-asia-south1',
      ipAddress: '10.128.0.12 (Internal)',
      severity: 'Info',
      status: 'SUCCESS',
    },
    {
      id: 'LOG-91021',
      timestamp: '2026-07-26 23:14:50 PKT',
      actorName: 'Ayesha Khan',
      actorRole: 'Client',
      category: 'Payment Action',
      actionDetail: 'Uploaded EasyPaisa Payment Proof Screenshot (PKR 2,500) for ORD-MFS-849201',
      ipAddress: '39.40.12.98',
      severity: 'Info',
      status: 'SUCCESS',
    },
    {
      id: 'LOG-91020',
      timestamp: '2026-07-26 21:05:12 PKT',
      actorName: 'Unverified Visitor',
      actorRole: 'Guest',
      category: 'Security Event',
      actionDetail: 'Failed PIN attempt on Admin Gate (Incorrect PIN code)',
      ipAddress: '182.185.20.11',
      severity: 'Warning',
      status: 'BLOCKED',
    },
    {
      id: 'LOG-91019',
      timestamp: '2026-07-26 19:30:00 PKT',
      actorName: 'MFS AI Assistant',
      actorRole: 'AI Agent',
      category: 'AI Prompt Update',
      actionDetail: 'Dynamic Knowledge Base refreshed with latest Academic Assignment APA 7th guidelines',
      ipAddress: 'Internal AI Engine',
      severity: 'Info',
      status: 'SUCCESS',
    },
  ]);

  // Mock Operational Alerts
  const [alerts, setAlerts] = useState<OperationalAlert[]>([
    {
      id: 'ALT-801',
      title: 'WhatsApp Gateway Latency Alert',
      category: 'Performance',
      priority: 'Medium',
      message: 'Dispatch time for SMS notifications increased to 420ms (Threshold: 300ms).',
      timestamp: '15 mins ago',
      acknowledged: false,
      assignedTo: 'DevOps On-Call',
    },
    {
      id: 'ALT-802',
      title: 'Payment Verification Audit Queue',
      category: 'Payments',
      priority: 'High',
      message: '3 manual EasyPaisa payment receipts awaiting super admin verification.',
      timestamp: '42 mins ago',
      acknowledged: true,
      assignedTo: 'Muhammad Shehroz Sultan',
    },
    {
      id: 'ALT-803',
      title: 'Database Storage Growth Normal',
      category: 'Storage',
      priority: 'Low',
      message: 'Supabase storage usage increased by 1.2% today. Total 1.42 GB / 100 GB used.',
      timestamp: '2 hours ago',
      acknowledged: true,
      assignedTo: 'Automated Bot',
    },
  ]);

  // Simulated Live Refresh Effect
  useEffect(() => {
    if (!isLivePingActive) return;
    const interval = setInterval(() => {
      setLastRefreshedAt(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + ' PKT');
      // Slightly fluctuate response times to simulate real-time pinging
      setServices((prev) =>
        prev.map((s) => ({
          ...s,
          responseTimeMs: Math.max(10, s.responseTimeMs + Math.floor(Math.random() * 7) - 3),
        }))
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [isLivePingActive]);

  // Handlers
  const handleTriggerManualRefresh = () => {
    setLastRefreshedAt(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + ' PKT');
    if (onShowToast) onShowToast('Refreshed operational metrics across all 13 core enterprise services.');
  };

  const handleToggleReadOnlyMode = () => {
    const next = !readOnlyMode;
    setReadOnlyMode(next);
    if (onShowToast) {
      onShowToast(next ? 'Platform Read-Only Mode ENABLED. Client database writes suspended.' : 'Platform Read-Only Mode DISABLED. Full operational writes restored.');
    }
  };

  const handleToggleMaintenanceMode = () => {
    const next = !maintenanceMode;
    setMaintenanceMode(next);
    if (onShowToast) {
      onShowToast(next ? 'Scheduled Maintenance Mode ACTIVATED. Banner published to clients.' : 'Maintenance Mode DEACTIVATED. Platform live.');
    }
  };

  const handlePurgeCache = () => {
    if (onShowToast) onShowToast('Purged Redis memory cache & cleared CDN edge static assets.');
  };

  const handleDatabaseVacuum = () => {
    if (onShowToast) onShowToast('Executed Supabase PostgreSQL table vacuum & index optimization.');
  };

  const handleRestartService = (serviceName: string) => {
    if (onShowToast) onShowToast(`Issued graceful restart request for service: ${serviceName}. Re-routing traffic.`);
  };

  const handleCreateIncidentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newIncidentForm.title) return;
    const created: IncidentItem = {
      id: `INC-2026-${Math.floor(100 + Math.random() * 900)}`,
      title: newIncidentForm.title,
      description: newIncidentForm.description || 'No detailed notes provided.',
      severity: newIncidentForm.severity,
      affectedService: newIncidentForm.affectedService,
      assignedEngineer: 'Muhammad Shehroz Sultan (On-Call)',
      status: 'Investigating',
      createdAt: 'Just now (PKT)',
      rootCausePlaceholder: 'Initial investigation in progress by senior response engineer.',
    };
    setIncidents([created, ...incidents]);
    setIsCreateIncidentModalOpen(false);
    setNewIncidentForm({ title: '', severity: 'Medium', affectedService: 'Express API Backend Engine', description: '' });
    if (onShowToast) onShowToast(`Declared new Incident ${created.id} (${created.severity}). On-call alerted.`);
  };

  const handleAcknowledgeAlert = (id: string) => {
    setAlerts((prev) => prev.map((a) => (a.id === id ? { ...a, acknowledged: !a.acknowledged } : a)));
    if (onShowToast) onShowToast('Updated alert acknowledgement state.');
  };

  const handleTriggerManualBackup = () => {
    setIsBackupModalOpen(true);
  };

  const handleConfirmManualBackup = () => {
    setIsBackupModalOpen(false);
    if (onShowToast) onShowToast('Initiated manual encrypted GCP Cloud backup snapshot. Completion in ~45 seconds.');
  };

  // Filtered lists
  const filteredIncidents = incidents.filter((inc) => {
    const matchesSearch = inc.title.toLowerCase().includes(incidentSearch.toLowerCase()) || inc.id.toLowerCase().includes(incidentSearch.toLowerCase());
    const matchesSeverity = incidentSeverityFilter === 'all' || inc.severity.toLowerCase() === incidentSeverityFilter.toLowerCase();
    return matchesSearch && matchesSeverity;
  });

  const filteredAuditLogs = auditLogs.filter((log) => {
    const matchesSearch = log.actionDetail.toLowerCase().includes(auditSearch.toLowerCase()) || log.actorName.toLowerCase().includes(auditSearch.toLowerCase());
    const matchesCategory = auditCategoryFilter === 'all' || log.category.toLowerCase().includes(auditCategoryFilter.toLowerCase());
    return matchesSearch && matchesCategory;
  });

  const filteredAlerts = alerts.filter((alt) => {
    return alertCategoryFilter === 'all' || alt.category.toLowerCase() === alertCategoryFilter.toLowerCase();
  });

  return (
    <div className="space-y-6 font-inter text-white">
      {/* HEADER BAR */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-[#0D0D12] via-[#12121A] to-[#0D0D12] border border-[#E5C158]/30 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#E5C158]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-1 relative z-10">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-[#E5C158]/10 text-[#E5C158] font-mono text-[10px] font-bold border border-[#E5C158]/30 uppercase tracking-widest flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#E5C158]" />
              Phase 16 – Part 10 • Operations Center
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-[#28C76F]/10 text-[#28C76F] font-mono text-[10px] font-bold border border-[#28C76F]/30 uppercase flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#28C76F] animate-pulse" />
              NOC & SOC ACTIVE
            </span>
          </div>

          <h1 className="text-2xl md:text-3xl font-poppins font-black text-white tracking-tight flex items-center gap-2">
            Platform Administration & Operations HQ
          </h1>
          <p className="text-xs text-neutral-400 max-w-2xl">
            Central Executive Command for Network Operations (NOC), Security Operations (SOC), Incident Command, System Backups, Audit Trails, and System Maintenance.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 relative z-10 shrink-0">
          <button
            onClick={handleTriggerManualRefresh}
            className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-all flex items-center gap-2 border border-white/10 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5 text-[#E5C158]" />
            <span>Sync ({lastRefreshedAt})</span>
          </button>

          <button
            onClick={() => setIsLivePingActive(!isLivePingActive)}
            className={`px-3.5 py-2 rounded-xl font-bold text-xs transition-all flex items-center gap-2 border cursor-pointer ${
              isLivePingActive
                ? 'bg-[#28C76F]/15 text-[#28C76F] border-[#28C76F]/40'
                : 'bg-white/5 text-neutral-400 border-white/10'
            }`}
          >
            <Radio className={`w-3.5 h-3.5 ${isLivePingActive ? 'text-[#28C76F] animate-pulse' : ''}`} />
            <span>{isLivePingActive ? 'Live Telemetry ON' : 'Telemetry Paused'}</span>
          </button>

          <button
            onClick={handleTriggerManualBackup}
            className="px-4 py-2 rounded-xl bg-[#E5C158] hover:bg-[#fce888] text-black font-extrabold text-xs transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(229,193,88,0.25)] cursor-pointer"
          >
            <DatabaseZap className="w-4 h-4" />
            <span>Manual Backup</span>
          </button>
        </div>
      </div>

      {/* SYSTEM BROADCAST / MAINTENANCE WARNING BANNER IF ACTIVE */}
      {(maintenanceMode || readOnlyMode) && (
        <div className={`p-4 rounded-2xl border flex items-center justify-between gap-4 text-xs font-bold ${
          maintenanceMode ? 'bg-amber-500/10 border-amber-500/40 text-amber-300' : 'bg-blue-500/10 border-blue-500/40 text-blue-300'
        }`}>
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>
              {maintenanceMode ? `MAINTENANCE MODE ACTIVE: ${maintenanceBannerText}` : 'READ-ONLY MODE ACTIVE: Database mutations locked for client apps.'}
            </span>
          </div>
          <button
            onClick={maintenanceMode ? handleToggleMaintenanceMode : handleToggleReadOnlyMode}
            className="px-3 py-1 rounded-lg bg-black/40 hover:bg-black/60 text-white border border-white/20 text-[11px] cursor-pointer"
          >
            Disable Mode
          </button>
        </div>
      )}

      {/* OPERATIONS SUB-NAVIGATION TABS */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-white/10 no-scrollbar">
        {[
          { id: 'exec_overview', label: 'Executive Overview', icon: Activity, badge: '99.8%' },
          { id: 'monitoring', label: 'Service Health & Telemetry', icon: Server, badge: '13 Services' },
          { id: 'incidents', label: 'Incident Management', icon: ShieldAlert, badge: incidents.filter((i) => i.status !== 'Resolved').length.toString() },
          { id: 'maintenance', label: 'System Maintenance', icon: Sliders },
          { id: 'backups', label: 'Backup & Disaster Recovery', icon: Database },
          { id: 'releases', label: 'Release Management', icon: Box, badge: 'v2.10.4' },
          { id: 'audit_logs', label: 'Enterprise Audit Trail', icon: FileText, badge: 'Compliance' },
          { id: 'soc', label: 'Security Ops (SOC)', icon: Shield, badge: '0 Threat' },
          { id: 'notifications', label: 'Alerts Dispatch Center', icon: Bell, badge: alerts.filter((a) => !a.acknowledged).length.toString() },
          { id: 'future_hub', label: 'Stage 2 Ops Hub', icon: Sparkles, badge: 'Stage 2' },
        ].map((tab) => {
          const TabIcon = tab.icon;
          const isActive = subTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setSubTab(tab.id as OpsSubTab)}
              className={`px-3.5 py-2 rounded-2xl font-bold text-xs transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer shrink-0 ${
                isActive
                  ? 'bg-[#E5C158] text-black shadow-[0_0_15px_rgba(229,193,88,0.3)]'
                  : 'glass-card text-neutral-400 hover:text-white border border-white/10 hover:border-white/20'
              }`}
            >
              <TabIcon className={`w-4 h-4 ${isActive ? 'text-black' : 'text-[#E5C158]'}`} />
              <span>{tab.label}</span>
              {tab.badge && (
                <span
                  className={`px-2 py-0.5 rounded-full text-[9px] font-mono font-extrabold ${
                    isActive ? 'bg-black/20 text-black' : 'bg-white/10 text-neutral-300'
                  }`}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* =========================================================================
          SUB-TAB 1: EXECUTIVE PLATFORM OPERATIONS OVERVIEW
          ========================================================================= */}
      {subTab === 'exec_overview' && (
        <div className="space-y-6">
          {/* TOP HEALTH SCORE BANNER */}
          <div className="p-6 rounded-3xl glass-card border border-white/10 bg-gradient-to-r from-emerald-500/10 via-transparent to-blue-500/10 grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest font-bold">Overall Platform Health</span>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-poppins font-black text-[#28C76F]">99.8%</span>
                <span className="text-xs text-[#28C76F] font-bold uppercase bg-[#28C76F]/10 px-2 py-0.5 rounded border border-[#28C76F]/30">
                  EXCELLENT
                </span>
              </div>
              <p className="text-[11px] text-neutral-400">12 of 13 Core Services Operational • 1 Minor Provider Latency</p>
            </div>

            <div className="space-y-1 border-l border-white/10 pl-4">
              <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest font-bold">Monthly Uptime SLA</span>
              <div className="text-2xl font-poppins font-bold text-white">99.98%</div>
              <p className="text-[11px] text-neutral-400">Target SLA: 99.90% (Passed by +0.08%)</p>
            </div>

            <div className="space-y-1 border-l border-white/10 pl-4">
              <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest font-bold">Active Live Sessions</span>
              <div className="text-2xl font-poppins font-bold text-white flex items-center gap-2">
                <span>316 Sessions</span>
                <span className="w-2 h-2 rounded-full bg-[#28C76F] animate-ping" />
              </div>
              <p className="text-[11px] text-neutral-400">312 Clients • 4 Admin Sessions Active</p>
            </div>

            <div className="space-y-1 border-l border-white/10 pl-4">
              <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest font-bold">Active Release Version</span>
              <div className="text-xl font-mono font-bold text-[#E5C158]">v2.10.4-PROD</div>
              <p className="text-[11px] text-neutral-400">Deployed 2h ago • Rollback Ready</p>
            </div>
          </div>

          {/* 12 EXECUTIVE KPI METRIC CARDS */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { label: 'Platform Health Score', val: '99.8%', status: 'Operational', icon: Activity, color: 'text-[#28C76F]', bg: 'bg-[#28C76F]/10 border-[#28C76F]/30' },
              { label: 'Active Users', val: '1,482 Registered', status: '+14 Today', icon: UserCheck, color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/30' },
              { label: 'Active Client Sessions', val: '312 Online', status: 'Live Telemetry', icon: Wifi, color: 'text-cyan-400', bg: 'bg-cyan-500/10 border-cyan-500/30' },
              { label: 'Active Admin Sessions', val: '4 Sessions', status: 'Super Admin', icon: Key, color: 'text-[#E5C158]', bg: 'bg-[#E5C158]/10 border-[#E5C158]/30' },
              { label: 'AI Services Status', val: '99.5% Healthy', status: 'Gemini 1.5 Pro/Flash', icon: Zap, color: 'text-purple-400', bg: 'bg-purple-500/10 border-purple-500/30' },
              { label: 'Database Status', val: '12ms Response', status: 'Supabase Normal', icon: Database, color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/30' },
              { label: 'Cloud Storage Status', val: '1.42 GB / 100 GB', status: 'Encrypted GCP', icon: HardDrive, color: 'text-indigo-400', bg: 'bg-indigo-500/10 border-indigo-500/30' },
              { label: 'Express API Throughput', val: '220 Req/Sec', status: 'Avg 34ms', icon: Cpu, color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/30' },
              { label: 'Email SMTP Gateway', val: '99.8% Delivery', status: 'Resend API', icon: CheckCircle2, color: 'text-[#28C76F]', bg: 'bg-[#28C76F]/10 border-[#28C76F]/30' },
              { label: 'Background Jobs Status', val: '1,840 Executed', status: '0 Failed', icon: Layers, color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/30' },
              { label: 'Automation Engine Health', val: '100% Sync', status: 'Active Rules', icon: RefreshCw, color: 'text-fuchsia-400', bg: 'bg-fuchsia-500/10 border-fuchsia-500/30' },
              { label: 'Security SOC Status', val: '0 Threat Level', status: 'Cloudflare WAF', icon: ShieldCheck, color: 'text-[#28C76F]', bg: 'bg-[#28C76F]/10 border-[#28C76F]/30' },
            ].map((kpi, idx) => {
              const KIcon = kpi.icon;
              return (
                <div key={idx} className="p-4 rounded-2xl glass-card border border-white/10 space-y-2 relative overflow-hidden group hover:border-[#E5C158]/40 transition-all">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-neutral-400 uppercase font-semibold">{kpi.label}</span>
                    <div className={`p-1.5 rounded-lg border ${kpi.bg}`}>
                      <KIcon className={`w-3.5 h-3.5 ${kpi.color}`} />
                    </div>
                  </div>
                  <div className="text-base font-poppins font-bold text-white">{kpi.val}</div>
                  <span className={`text-[10px] font-mono font-bold block ${kpi.color}`}>
                    ● {kpi.status}
                  </span>
                </div>
              );
            })}
          </div>

          {/* QUICK EXECUTIVE OPERATIONAL CONTROLS */}
          <div className="p-6 rounded-3xl glass-card border border-white/10 space-y-4">
            <h3 className="font-poppins font-bold text-white text-sm flex items-center gap-2">
              <Sliders className="w-4 h-4 text-[#E5C158]" />
              <span>Executive Operational Controls</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <button
                onClick={handlePurgeCache}
                className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#E5C158]/50 text-left space-y-1 transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white group-hover:text-[#E5C158]">Purge Redis Cache</span>
                  <RefreshCw className="w-3.5 h-3.5 text-[#E5C158]" />
                </div>
                <p className="text-[10px] text-neutral-400">Clear Vite memory & API cache instantly</p>
              </button>

              <button
                onClick={handleDatabaseVacuum}
                className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-emerald-500/50 text-left space-y-1 transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white group-hover:text-emerald-400">Optimize DB Vacuum</span>
                  <Database className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <p className="text-[10px] text-neutral-400">Clean dead tuples in Supabase DB</p>
              </button>

              <button
                onClick={handleToggleReadOnlyMode}
                className={`p-3.5 rounded-2xl border text-left space-y-1 transition-all cursor-pointer group ${
                  readOnlyMode ? 'bg-blue-500/20 border-blue-500/60' : 'bg-white/[0.03] border-white/10 hover:border-blue-500/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white group-hover:text-blue-400">
                    {readOnlyMode ? 'Disable Read-Only' : 'Toggle Read-Only Mode'}
                  </span>
                  <Lock className="w-3.5 h-3.5 text-blue-400" />
                </div>
                <p className="text-[10px] text-neutral-400">Lock database writes for emergency audit</p>
              </button>

              <button
                onClick={handleToggleMaintenanceMode}
                className={`p-3.5 rounded-2xl border text-left space-y-1 transition-all cursor-pointer group ${
                  maintenanceMode ? 'bg-amber-500/20 border-amber-500/60' : 'bg-white/[0.03] border-white/10 hover:border-amber-500/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white group-hover:text-amber-400">
                    {maintenanceMode ? 'Exit Maintenance' : 'Scheduled Maintenance'}
                  </span>
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                </div>
                <p className="text-[10px] text-neutral-400">Publish maintenance banner to clients</p>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          SUB-TAB 2: ENTERPRISE MONITORING CENTER
          ========================================================================= */}
      {subTab === 'monitoring' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <h2 className="font-poppins font-bold text-white text-base flex items-center gap-2">
                <Server className="w-5 h-5 text-[#E5C158]" />
                Centralized Service Telemetry (13 Services)
              </h2>
              <p className="text-xs text-neutral-400">Real-time status, health, latency, last incident, and restart metrics per service module.</p>
            </div>
            <button
              onClick={() => handleRestartService('All Core Services')}
              className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs cursor-pointer border border-white/10"
            >
              Restart Service Pipeline
            </button>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-white/10 glass-card">
            <table className="w-full text-left text-xs text-neutral-300">
              <thead className="bg-white/[0.04] text-[10px] font-mono uppercase text-neutral-400 border-b border-white/10">
                <tr>
                  <th className="p-3.5">Service Name</th>
                  <th className="p-3.5">Category</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5">Health</th>
                  <th className="p-3.5">Latency (ms)</th>
                  <th className="p-3.5">Availability</th>
                  <th className="p-3.5">Last Incident</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-mono">
                {services.map((srv) => (
                  <tr key={srv.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-3.5 font-bold font-inter text-white flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${srv.status === 'Operational' ? 'bg-[#28C76F]' : 'bg-amber-400 animate-pulse'}`} />
                      {srv.name}
                    </td>
                    <td className="p-3.5">
                      <span className="px-2 py-0.5 rounded bg-white/10 text-neutral-300 text-[10px] font-semibold">
                        {srv.category}
                      </span>
                    </td>
                    <td className="p-3.5">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase border ${
                          srv.status === 'Operational'
                            ? 'bg-[#28C76F]/10 text-[#28C76F] border-[#28C76F]/30'
                            : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                        }`}
                      >
                        {srv.status}
                      </span>
                    </td>
                    <td className="p-3.5 font-bold text-white">{srv.healthPercent}%</td>
                    <td className="p-3.5">
                      <span className={`font-bold ${srv.responseTimeMs < 50 ? 'text-[#28C76F]' : srv.responseTimeMs < 200 ? 'text-[#E5C158]' : 'text-amber-400'}`}>
                        {srv.responseTimeMs} ms
                      </span>
                    </td>
                    <td className="p-3.5 text-neutral-300">{srv.availability}</td>
                    <td className="p-3.5 text-neutral-400 text-[11px]">{srv.lastIncident}</td>
                    <td className="p-3.5 text-right">
                      <button
                        onClick={() => handleRestartService(srv.name)}
                        className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-[#E5C158] hover:text-black font-sans font-bold text-[10px] transition-all cursor-pointer"
                      >
                        Restart
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* =========================================================================
          SUB-TAB 3: INCIDENT MANAGEMENT CENTER
          ========================================================================= */}
      {subTab === 'incidents' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <h2 className="font-poppins font-bold text-white text-base flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-amber-400" />
                Incident Command & Severity Matrix
              </h2>
              <p className="text-xs text-neutral-400">Track, declare, investigate, and resolve platform operational incidents with audit history.</p>
            </div>
            <button
              onClick={() => setIsCreateIncidentModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs transition-all flex items-center gap-2 cursor-pointer shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Declare New Incident</span>
            </button>
          </div>

          {/* FILTERS & SEARCH */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search incident title or ID..."
                value={incidentSearch}
                onChange={(e) => setIncidentSearch(e.target.value)}
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#E5C158]"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
              <span className="text-xs text-neutral-400 font-semibold">Severity:</span>
              {['all', 'Information', 'Low', 'Medium', 'High', 'Critical'].map((sev) => (
                <button
                  key={sev}
                  onClick={() => setIncidentSeverityFilter(sev)}
                  className={`px-2.5 py-1 rounded-xl text-[11px] font-bold cursor-pointer transition-all ${
                    incidentSeverityFilter === sev ? 'bg-[#E5C158] text-black font-extrabold' : 'bg-white/5 text-neutral-400 hover:text-white'
                  }`}
                >
                  {sev.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* INCIDENTS LIST */}
          <div className="space-y-3">
            {filteredIncidents.length === 0 ? (
              <div className="p-8 text-center glass-card rounded-2xl border border-white/10 text-neutral-400 text-xs">
                No incidents match the search criteria. All platform operations normal.
              </div>
            ) : (
              filteredIncidents.map((inc) => (
                <div
                  key={inc.id}
                  className="p-4 rounded-2xl glass-card border border-white/10 hover:border-[#E5C158]/40 transition-all space-y-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-[#E5C158]">{inc.id}</span>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-extrabold uppercase border ${
                          inc.severity === 'Critical'
                            ? 'bg-rose-500/20 text-rose-400 border-rose-500/40'
                            : inc.severity === 'High'
                            ? 'bg-orange-500/20 text-orange-400 border-orange-500/40'
                            : inc.severity === 'Medium'
                            ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                            : 'bg-blue-500/20 text-blue-400 border-blue-500/40'
                        }`}
                      >
                        {inc.severity}
                      </span>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          inc.status === 'Resolved'
                            ? 'bg-[#28C76F]/10 text-[#28C76F] border border-[#28C76F]/30'
                            : 'bg-amber-500/10 text-amber-300 border border-amber-500/30'
                        }`}
                      >
                        ● {inc.status}
                      </span>
                    </div>

                    <span className="text-[11px] text-neutral-400 font-mono">{inc.createdAt}</span>
                  </div>

                  <div>
                    <h3 className="font-poppins font-bold text-white text-sm">{inc.title}</h3>
                    <p className="text-xs text-neutral-300 mt-1">{inc.description}</p>
                  </div>

                  <div className="pt-2 border-t border-white/5 flex flex-wrap items-center justify-between text-[11px] text-neutral-400 gap-2">
                    <div className="flex items-center gap-4">
                      <span>Affected: <strong className="text-white">{inc.affectedService}</strong></span>
                      <span>Assigned: <strong className="text-white">{inc.assignedEngineer}</strong></span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedIncident(inc)}
                        className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold cursor-pointer"
                      >
                        View Timeline & Root Cause
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* =========================================================================
          SUB-TAB 4: SYSTEM MAINTENANCE CENTER
          ========================================================================= */}
      {subTab === 'maintenance' && (
        <div className="space-y-6">
          <div className="border-b border-white/10 pb-4">
            <h2 className="font-poppins font-bold text-white text-base flex items-center gap-2">
              <Sliders className="w-5 h-5 text-[#E5C158]" />
              System Maintenance & Platform Operations Control
            </h2>
            <p className="text-xs text-neutral-400">Manage read-only modes, scheduled maintenance banners, cache flushes, and CDN purges.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* MAINTENANCE CONFIG CARD */}
            <div className="p-6 rounded-3xl glass-card border border-white/10 space-y-4">
              <h3 className="font-poppins font-bold text-white text-sm flex items-center gap-2">
                <Lock className="w-4 h-4 text-[#E5C158]" />
                <span>Maintenance Modes & Locks</span>
              </h3>

              <div className="space-y-3 text-xs">
                <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
                  <div>
                    <strong className="text-white block font-bold">Scheduled Maintenance Mode</strong>
                    <span className="text-neutral-400 text-[11px]">Displays active maintenance banner to clients while keeping admin active</span>
                  </div>
                  <button
                    onClick={handleToggleMaintenanceMode}
                    className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                      maintenanceMode ? 'bg-amber-500 text-black font-extrabold' : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    {maintenanceMode ? 'ACTIVE' : 'Enable'}
                  </button>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
                  <div>
                    <strong className="text-white block font-bold">Read-Only Database Mode</strong>
                    <span className="text-neutral-400 text-[11px]">Prevents database inserts during core migration checks</span>
                  </div>
                  <button
                    onClick={handleToggleReadOnlyMode}
                    className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                      readOnlyMode ? 'bg-blue-500 text-white font-extrabold' : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    {readOnlyMode ? 'ACTIVE' : 'Enable'}
                  </button>
                </div>

                <div className="space-y-1.5 pt-2">
                  <label className="text-xs text-neutral-300 font-bold block">Public Maintenance Banner Message</label>
                  <input
                    type="text"
                    value={maintenanceBannerText}
                    onChange={(e) => setMaintenanceBannerText(e.target.value)}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-[#E5C158]"
                  />
                </div>
              </div>
            </div>

            {/* UPCOMING SCHEDULED WINDOWS */}
            <div className="p-6 rounded-3xl glass-card border border-white/10 space-y-4">
              <h3 className="font-poppins font-bold text-white text-sm flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#E5C158]" />
                <span>Scheduled Maintenance Calendar</span>
              </h3>

              <div className="space-y-3 text-xs">
                <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1">
                  <div className="flex items-center justify-between">
                    <strong className="text-white font-bold">Supabase DB Index Rebuild</strong>
                    <span className="text-[#E5C158] font-mono text-[10px] bg-[#E5C158]/10 px-2 py-0.5 rounded font-bold">UPCOMING</span>
                  </div>
                  <p className="text-neutral-400 text-[11px]">Scheduled: Sunday 03:00 AM PKT (Duration ~10 mins)</p>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1">
                  <div className="flex items-center justify-between">
                    <strong className="text-white font-bold">Cloudflare Edge SSL Certificate Refresh</strong>
                    <span className="text-[#28C76F] font-mono text-[10px] bg-[#28C76F]/10 px-2 py-0.5 rounded font-bold">AUTOMATED</span>
                  </div>
                  <p className="text-neutral-400 text-[11px]">Scheduled: 1st of next month (Zero Downtime)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          SUB-TAB 5: BACKUP & RECOVERY CENTER
          ========================================================================= */}
      {subTab === 'backups' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <h2 className="font-poppins font-bold text-white text-base flex items-center gap-2">
                <Database className="w-5 h-5 text-[#E5C158]" />
                Backup & Disaster Recovery Vault
              </h2>
              <p className="text-xs text-neutral-400">Automated multi-frequency backups, point-in-time recovery, RTO/RPO SLAs, and encrypted GCP bucket storage.</p>
            </div>

            <button
              onClick={handleTriggerManualBackup}
              className="px-4 py-2 rounded-xl bg-[#E5C158] hover:bg-[#fce888] text-black font-extrabold text-xs transition-all flex items-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(229,193,88,0.25)] shrink-0"
            >
              <DatabaseZap className="w-4 h-4" />
              <span>Trigger Backup Now</span>
            </button>
          </div>

          {/* BACKUP SCHEDULING CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl glass-card border border-white/10 space-y-2">
              <span className="text-[10px] font-mono text-[#28C76F] uppercase font-bold">Daily Backups</span>
              <div className="text-xl font-poppins font-bold text-white">Active (02:00 AM PKT)</div>
              <p className="text-[11px] text-neutral-400">Retention: 30 Days • Status: COMPLETED</p>
            </div>

            <div className="p-5 rounded-2xl glass-card border border-white/10 space-y-2">
              <span className="text-[10px] font-mono text-blue-400 uppercase font-bold">Weekly Snapshots</span>
              <div className="text-xl font-poppins font-bold text-white">Active (Sun 03:00 AM)</div>
              <p className="text-[11px] text-neutral-400">Retention: 12 Months • Status: COMPLETED</p>
            </div>

            <div className="p-5 rounded-2xl glass-card border border-white/10 space-y-2">
              <span className="text-[10px] font-mono text-purple-400 uppercase font-bold">Disaster Recovery Metrics</span>
              <div className="text-xl font-poppins font-bold text-white">RTO &lt;15m | RPO &lt;5m</div>
              <p className="text-[11px] text-neutral-400">Encrypted GCP Storage: gs://mfs-backups</p>
            </div>
          </div>

          {/* RESTORE POINT HISTORY TABLE */}
          <div className="space-y-3">
            <h3 className="font-poppins font-bold text-white text-sm">Recent Backup Restore Points</h3>
            <div className="overflow-x-auto rounded-2xl border border-white/10 glass-card">
              <table className="w-full text-left text-xs text-neutral-300">
                <thead className="bg-white/[0.04] text-[10px] font-mono uppercase text-neutral-400 border-b border-white/10">
                  <tr>
                    <th className="p-3.5">Point ID</th>
                    <th className="p-3.5">Timestamp</th>
                    <th className="p-3.5">Backup Type</th>
                    <th className="p-3.5">Size</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5">Location</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-mono">
                  {[
                    { id: 'BKP-2026-0727', time: '2026-07-27 02:00 PKT', type: 'Daily Automated', size: '1.42 GB', status: 'VERIFIED', loc: 'gs://mfs-backups-asia-south1' },
                    { id: 'BKP-2026-0726', time: '2026-07-26 02:00 PKT', type: 'Daily Automated', size: '1.40 GB', status: 'VERIFIED', loc: 'gs://mfs-backups-asia-south1' },
                    { id: 'BKP-2026-0720-WK', time: '2026-07-20 03:00 PKT', type: 'Weekly Snapshot', size: '1.38 GB', status: 'VERIFIED', loc: 'gs://mfs-backups-asia-south1' },
                  ].map((pt) => (
                    <tr key={pt.id} className="hover:bg-white/[0.02]">
                      <td className="p-3.5 font-bold text-[#E5C158]">{pt.id}</td>
                      <td className="p-3.5 text-white">{pt.time}</td>
                      <td className="p-3.5">{pt.type}</td>
                      <td className="p-3.5 font-bold text-white">{pt.size}</td>
                      <td className="p-3.5">
                        <span className="px-2 py-0.5 rounded bg-[#28C76F]/10 text-[#28C76F] text-[10px] font-bold border border-[#28C76F]/30">
                          {pt.status}
                        </span>
                      </td>
                      <td className="p-3.5 text-neutral-400 text-[10px]">{pt.loc}</td>
                      <td className="p-3.5 text-right">
                        <button
                          onClick={() => {
                            if (onShowToast) onShowToast(`Simulated Dry-Run restore test for ${pt.id}. Integrity check passed.`);
                          }}
                          className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white font-sans font-bold text-[10px] cursor-pointer"
                        >
                          Dry-Run Test
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          SUB-TAB 6: RELEASE MANAGEMENT CENTER
          ========================================================================= */}
      {subTab === 'releases' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <h2 className="font-poppins font-bold text-white text-base flex items-center gap-2">
                <Box className="w-5 h-5 text-[#E5C158]" />
                Release Management & Deployment Control
              </h2>
              <p className="text-xs text-neutral-400">Platform deployment versions, release notes, changelogs, and emergency rollback readiness.</p>
            </div>

            <button
              onClick={() => setIsRollbackModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/40 hover:bg-rose-500/30 font-bold text-xs transition-all flex items-center gap-2 cursor-pointer shrink-0"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Rollback Readiness</span>
            </button>
          </div>

          <div className="p-6 rounded-3xl glass-card border border-[#E5C158]/30 space-y-4 bg-gradient-to-r from-[#E5C158]/5 to-transparent">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-[#E5C158]/20 text-[#E5C158] font-mono text-[10px] font-bold uppercase border border-[#E5C158]/40">
                ACTIVE PRODUCTION RELEASE
              </span>
              <span className="text-xs text-neutral-400 font-mono">Environment: Cloud Run (asia-east1)</span>
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-poppins font-black text-white">v2.10.4-PROD — Enterprise Operations Center (NOC/SOC)</h3>
              <p className="text-xs text-neutral-300">Deployed: July 27, 2026 at 03:30 PKT • Status: 100% Traffic Healthy</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 text-xs">
              <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1">
                <strong className="text-white block font-bold text-xs text-[#28C76F]">Features Included in v2.10.4:</strong>
                <ul className="list-disc list-inside text-neutral-300 space-y-0.5 text-[11px]">
                  <li>Executive Operations HQ with 12 real-time KPIs</li>
                  <li>Centralized Service Telemetry for 13 system modules</li>
                  <li>Incident Command Matrix with severity filters & timelines</li>
                  <li>Automated Backup & Disaster Recovery Vault</li>
                </ul>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1">
                <strong className="text-white block font-bold text-xs text-blue-400">Bug Fixes & Hardening:</strong>
                <ul className="list-disc list-inside text-neutral-300 space-y-0.5 text-[11px]">
                  <li>Patched CMS service rate update state propagation delay</li>
                  <li>Optimized memory allocation during dual AI streaming response</li>
                  <li>Hardened RBAC permission evaluation on file downloads</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          SUB-TAB 7: ENTERPRISE AUDIT CENTER
          ========================================================================= */}
      {subTab === 'audit_logs' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <h2 className="font-poppins font-bold text-white text-base flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#E5C158]" />
                Enterprise Audit Center & Immutable Activity Trail
              </h2>
              <p className="text-xs text-neutral-400">Track logins, admin modifications, payment actions, CMS updates, and security events for compliance.</p>
            </div>

            <button
              onClick={() => {
                if (onShowToast) onShowToast('Exported audit log activity trail (CSV / JSON format) for compliance audit.');
              }}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-all flex items-center gap-2 cursor-pointer shrink-0"
            >
              <Download className="w-4 h-4 text-[#E5C158]" />
              <span>Export Audit Trail (CSV)</span>
            </button>
          </div>

          {/* AUDIT LOG TABLE */}
          <div className="overflow-x-auto rounded-2xl border border-white/10 glass-card">
            <table className="w-full text-left text-xs text-neutral-300">
              <thead className="bg-white/[0.04] text-[10px] font-mono uppercase text-neutral-400 border-b border-white/10">
                <tr>
                  <th className="p-3.5">Log ID</th>
                  <th className="p-3.5">Timestamp</th>
                  <th className="p-3.5">Actor</th>
                  <th className="p-3.5">Category</th>
                  <th className="p-3.5">Action Detail</th>
                  <th className="p-3.5">IP Address</th>
                  <th className="p-3.5 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-mono">
                {filteredAuditLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-white/[0.02]">
                    <td className="p-3.5 font-bold text-[#E5C158]">{log.id}</td>
                    <td className="p-3.5 text-neutral-400 text-[11px]">{log.timestamp}</td>
                    <td className="p-3.5 font-inter text-white font-bold">
                      {log.actorName} <span className="text-[10px] font-mono text-neutral-400">({log.actorRole})</span>
                    </td>
                    <td className="p-3.5">
                      <span className="px-2 py-0.5 rounded bg-white/10 text-neutral-300 text-[10px]">
                        {log.category}
                      </span>
                    </td>
                    <td className="p-3.5 font-inter text-neutral-200 text-xs">{log.actionDetail}</td>
                    <td className="p-3.5 text-neutral-400 text-[10px]">{log.ipAddress}</td>
                    <td className="p-3.5 text-right">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          log.status === 'SUCCESS' ? 'bg-[#28C76F]/10 text-[#28C76F]' : 'bg-rose-500/20 text-rose-400'
                        }`}
                      >
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* =========================================================================
          SUB-TAB 8: SECURITY OPERATIONS CENTER (SOC)
          ========================================================================= */}
      {subTab === 'soc' && (
        <div className="space-y-6">
          <div className="border-b border-white/10 pb-4">
            <h2 className="font-poppins font-bold text-white text-base flex items-center gap-2">
              <Shield className="w-5 h-5 text-[#28C76F]" />
              Security Operations Center (SOC)
            </h2>
            <p className="text-xs text-neutral-400">Active session monitoring, failed login tracking, WAF rules, and threat mitigation architecture.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl glass-card border border-white/10 space-y-1">
              <span className="text-[10px] font-mono text-neutral-400 uppercase font-bold">Login Attempts Today</span>
              <div className="text-2xl font-poppins font-bold text-white">2,410</div>
              <p className="text-[10px] text-[#28C76F]">99.8% Legitimate traffic</p>
            </div>

            <div className="p-4 rounded-2xl glass-card border border-white/10 space-y-1">
              <span className="text-[10px] font-mono text-neutral-400 uppercase font-bold">Failed Login Blocks</span>
              <div className="text-2xl font-poppins font-bold text-amber-400">4 Blocked</div>
              <p className="text-[10px] text-neutral-400">IP rate-limited automatically</p>
            </div>

            <div className="p-4 rounded-2xl glass-card border border-white/10 space-y-1">
              <span className="text-[10px] font-mono text-neutral-400 uppercase font-bold">Active Admin Sessions</span>
              <div className="text-2xl font-poppins font-bold text-[#E5C158]">4 Active</div>
              <p className="text-[10px] text-neutral-400">Super Admin & Lead DevOps</p>
            </div>

            <div className="p-4 rounded-2xl glass-card border border-white/10 space-y-1">
              <span className="text-[10px] font-mono text-neutral-400 uppercase font-bold">Threat Level</span>
              <div className="text-2xl font-poppins font-bold text-[#28C76F]">LEVEL 0 (LOW)</div>
              <p className="text-[10px] text-[#28C76F]">Cloudflare WAF Active</p>
            </div>
          </div>

          <div className="p-6 rounded-3xl glass-card border border-white/10 space-y-4">
            <h3 className="font-poppins font-bold text-white text-sm">Active Admin Sessions</h3>
            <div className="space-y-2 text-xs font-mono">
              {[
                { user: 'Muhammad Shehroz Sultan (Super Admin)', ip: '111.68.102.45', location: 'PK', device: 'Chrome / macOS', activeSince: '45 mins ago' },
                { user: 'Senior Resume Architect', ip: '39.40.12.80', location: 'Lahore, PK', device: 'Firefox / Windows', activeSince: '2 hours ago' },
              ].map((sess, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
                  <div>
                    <strong className="text-white block font-inter font-bold">{sess.user}</strong>
                    <span className="text-neutral-400 text-[10px]">{sess.ip} • {sess.location} • {sess.device}</span>
                  </div>

                  <button
                    onClick={() => {
                      if (onShowToast) onShowToast(`Revoked active session for ${sess.user}. User re-authentication required.`);
                    }}
                    className="px-3 py-1 rounded-lg bg-rose-500/20 text-rose-400 hover:bg-rose-500/30 font-sans font-bold text-[10px] cursor-pointer"
                  >
                    Revoke Session
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          SUB-TAB 9: ENTERPRISE NOTIFICATIONS COMMAND CENTER
          ========================================================================= */}
      {subTab === 'notifications' && (
        <div className="space-y-6">
          <div className="border-b border-white/10 pb-4">
            <h2 className="font-poppins font-bold text-white text-base flex items-center gap-2">
              <Bell className="w-5 h-5 text-[#E5C158]" />
              Enterprise Operational Alerts & Dispatch Engine
            </h2>
            <p className="text-xs text-neutral-400">Centralized alert routing across Security, Payments, AI, Orders, CRM, and Infrastructure.</p>
          </div>

          <div className="space-y-3">
            {alerts.map((alt) => (
              <div
                key={alt.id}
                className="p-4 rounded-2xl glass-card border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-[#E5C158]">{alt.id}</span>
                    <span className="px-2 py-0.5 rounded bg-white/10 text-neutral-300 font-bold text-[10px]">
                      {alt.category}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded font-bold text-[10px] uppercase ${
                        alt.priority === 'High' ? 'bg-amber-500/20 text-amber-300' : 'bg-blue-500/20 text-blue-300'
                      }`}
                    >
                      {alt.priority} Priority
                    </span>
                  </div>

                  <h3 className="font-bold text-white text-sm">{alt.title}</h3>
                  <p className="text-neutral-300 text-xs">{alt.message}</p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <button
                    onClick={() => handleAcknowledgeAlert(alt.id)}
                    className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                      alt.acknowledged
                        ? 'bg-[#28C76F]/20 text-[#28C76F] border border-[#28C76F]/40'
                        : 'bg-[#E5C158] text-black font-extrabold'
                    }`}
                  >
                    {alt.acknowledged ? 'Acknowledged' : 'Acknowledge Alert'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================================
          SUB-TAB 10: FUTURE ENTERPRISE OPERATIONS HUB
          ========================================================================= */}
      {subTab === 'future_hub' && (
        <div className="space-y-6">
          <div className="p-8 rounded-3xl glass-card border border-[#E5C158]/40 bg-gradient-to-b from-[#E5C158]/10 via-transparent to-transparent text-center space-y-4">
            <div className="w-16 h-16 rounded-3xl bg-[#E5C158]/10 text-[#E5C158] flex items-center justify-center mx-auto border border-[#E5C158]/30 shadow-[0_0_30px_rgba(229,193,88,0.2)]">
              <Sparkles className="w-8 h-8 text-[#E5C158]" />
            </div>

            <div className="space-y-2 max-w-xl mx-auto">
              <span className="px-3.5 py-1 rounded-full bg-[#E5C158]/20 text-[#E5C158] font-mono text-[10px] font-extrabold uppercase tracking-widest border border-[#E5C158]/40">
                COMING IN STAGE 2 – REAL IMPLEMENTATION
              </span>
              <h2 className="text-2xl font-poppins font-black text-white">
                Next-Gen Multi-Tenant & Infrastructure Orchestration
              </h2>
              <p className="text-xs text-neutral-300">
                Architectural placeholders for Stage 2 real enterprise infrastructure expansions including Kubernetes management, edge network routing, distributed worker queues, and white-label agency sub-accounts.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: 'Multi-Tenant Management', desc: 'Isolate agency franchises & partner sub-organizations' },
              { title: 'Multi-Region Deployment', desc: 'Distribute database replicas across US, EU & Asia' },
              { title: 'Kubernetes Cluster Ops', desc: 'Auto-scale GKE containers during seasonal assignment spikes' },
              { title: 'Edge Network Monitoring', desc: 'Cloudflare Workers global edge performance telemetry' },
              { title: 'AI Infrastructure Clusters', desc: 'Private GPU cluster routing & dedicated model instances' },
              { title: 'Distributed Job Queue', desc: 'BullMQ & Redis background async worker management' },
              { title: 'Enterprise Licensing', desc: 'Manage enterprise client quotas, API keys & SLAs' },
              { title: 'White Label Agency Hub', desc: 'Custom domain mapping & brand theme customization' },
              { title: 'Multi-Company Ledger', desc: 'Consolidated multi-entity financial statement aggregation' },
            ].map((hub, idx) => (
              <div key={idx} className="p-4 rounded-2xl glass-card border border-white/10 space-y-2 opacity-80 hover:opacity-100 transition-opacity">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">{hub.title}</span>
                  <span className="text-[9px] font-mono font-bold text-[#E5C158] bg-[#E5C158]/10 px-2 py-0.5 rounded border border-[#E5C158]/20">
                    STAGE 2
                  </span>
                </div>
                <p className="text-[11px] text-neutral-400">{hub.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 1: INCIDENT TIMELINE & DETAIL MODAL
          ========================================================================= */}
      {selectedIncident && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-xl rounded-3xl bg-[#0D0D12] border border-[#E5C158]/40 p-6 space-y-5 shadow-2xl relative">
            <div className="flex items-start justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-xs font-mono font-bold text-[#E5C158]">{selectedIncident.id}</span>
                <h3 className="font-poppins font-bold text-white text-base mt-0.5">{selectedIncident.title}</h3>
              </div>
              <button
                onClick={() => setSelectedIncident(null)}
                className="p-1.5 rounded-xl bg-white/10 text-neutral-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1">
                <strong className="text-neutral-400 uppercase text-[10px] font-mono block">Incident Description & Impact</strong>
                <p className="text-white text-xs">{selectedIncident.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                  <span className="text-neutral-400 text-[10px] font-mono block">Severity</span>
                  <span className="font-bold text-amber-400">{selectedIncident.severity}</span>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                  <span className="text-neutral-400 text-[10px] font-mono block">Affected Service</span>
                  <span className="font-bold text-white">{selectedIncident.affectedService}</span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1">
                <strong className="text-[#E5C158] uppercase text-[10px] font-mono block">Root Cause Analysis</strong>
                <p className="text-neutral-300 text-xs">{selectedIncident.rootCausePlaceholder}</p>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => {
                  if (onShowToast) onShowToast(`Escalated Incident ${selectedIncident.id} to CEO & Lead Systems Engineer.`);
                  setSelectedIncident(null);
                }}
                className="px-4 py-2 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/40 hover:bg-rose-500/30 text-xs font-bold cursor-pointer"
              >
                Escalate to CEO
              </button>
              <button
                onClick={() => setSelectedIncident(null)}
                className="px-4 py-2 rounded-xl bg-[#E5C158] text-black font-extrabold text-xs hover:bg-[#fce888] cursor-pointer"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 2: DECLARE NEW INCIDENT MODAL
          ========================================================================= */}
      {isCreateIncidentModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <form
            onSubmit={handleCreateIncidentSubmit}
            className="w-full max-w-md rounded-3xl bg-[#0D0D12] border border-[#E5C158]/40 p-6 space-y-4 shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="font-poppins font-bold text-white text-sm flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-amber-400" />
                <span>Declare Operational Incident</span>
              </h3>
              <button
                type="button"
                onClick={() => setIsCreateIncidentModalOpen(false)}
                className="p-1 rounded-lg bg-white/10 text-neutral-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="text-neutral-300 font-bold block">Incident Summary / Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Gemini AI Voice Gateway Latency Spike"
                  value={newIncidentForm.title}
                  onChange={(e) => setNewIncidentForm({ ...newIncidentForm, title: e.target.value })}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-[#E5C158]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-neutral-300 font-bold block">Severity Level</label>
                  <select
                    value={newIncidentForm.severity}
                    onChange={(e) => setNewIncidentForm({ ...newIncidentForm, severity: e.target.value as IncidentItem['severity'] })}
                    className="w-full bg-[#12121A] border border-white/10 rounded-xl p-2.5 text-xs text-white focus:outline-none"
                  >
                    <option value="Information">Information</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Critical">Critical</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-neutral-300 font-bold block">Affected Service</label>
                  <select
                    value={newIncidentForm.affectedService}
                    onChange={(e) => setNewIncidentForm({ ...newIncidentForm, affectedService: e.target.value })}
                    className="w-full bg-[#12121A] border border-white/10 rounded-xl p-2.5 text-xs text-white focus:outline-none"
                  >
                    {services.map((s) => (
                      <option key={s.id} value={s.name}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-neutral-300 font-bold block">Initial Description & Investigation Notes</label>
                <textarea
                  rows={3}
                  placeholder="Provide initial observations..."
                  value={newIncidentForm.description}
                  onChange={(e) => setNewIncidentForm({ ...newIncidentForm, description: e.target.value })}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-[#E5C158]"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsCreateIncidentModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs cursor-pointer"
              >
                Dispatch Incident
              </button>
            </div>
          </form>
        </div>
      )}

      {/* =========================================================================
          MODAL 3: MANUAL BACKUP CONFIRMATION MODAL
          ========================================================================= */}
      {isBackupModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-md rounded-3xl bg-[#0D0D12] border border-[#E5C158]/40 p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="font-poppins font-bold text-white text-sm flex items-center gap-2">
                <DatabaseZap className="w-4 h-4 text-[#E5C158]" />
                <span>Trigger Encrypted Cloud Backup</span>
              </h3>
              <button
                type="button"
                onClick={() => setIsBackupModalOpen(false)}
                className="p-1 rounded-lg bg-white/10 text-neutral-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2 text-xs text-neutral-300">
              <p>
                You are about to initiate an immediate manual backup snapshot of the Supabase PostgreSQL database, encrypted client file manifests, and system configurations.
              </p>
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 space-y-1 font-mono text-[11px]">
                <div>Target Storage: <span className="text-[#E5C158]">gs://mfs-backups-asia-south1</span></div>
                <div>Encryption: <span className="text-[#28C76F]">AES-256 GCM</span></div>
                <div>Estimated Size: <span className="text-white">~1.42 GB</span></div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsBackupModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmManualBackup}
                className="px-4 py-2 rounded-xl bg-[#E5C158] hover:bg-[#fce888] text-black font-extrabold text-xs cursor-pointer shadow-[0_0_15px_rgba(229,193,88,0.25)]"
              >
                Start Backup Snapshot
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 4: ROLLBACK READINESS CONFIRMATION MODAL
          ========================================================================= */}
      {isRollbackModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-md rounded-3xl bg-[#0D0D12] border border-rose-500/40 p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="font-poppins font-bold text-white text-sm flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-rose-400" />
                <span>Production Rollback Readiness</span>
              </h3>
              <button
                type="button"
                onClick={() => setIsRollbackModalOpen(false)}
                className="p-1 rounded-lg bg-white/10 text-neutral-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2 text-xs text-neutral-300">
              <p>
                Previous stable build <strong className="text-white">v2.10.3-PROD</strong> is cached in the Cloud Run registry.
              </p>
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 space-y-1 font-mono text-[11px]">
                <div>Rollback Target: <span className="text-rose-400">v2.10.3-PROD</span></div>
                <div>Traffic Transition: <span className="text-white">Instant 100% Shift</span></div>
                <div>Database Migration Safety: <span className="text-[#28C76F]">Backward Compatible</span></div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsRollbackModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsRollbackModalOpen(false);
                  if (onShowToast) onShowToast('Production Rollback simulation complete. Target image v2.10.3 ready.');
                }}
                className="px-4 py-2 rounded-xl bg-rose-500 hover:bg-rose-400 text-white font-extrabold text-xs cursor-pointer"
              >
                Verify Rollback Target
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
