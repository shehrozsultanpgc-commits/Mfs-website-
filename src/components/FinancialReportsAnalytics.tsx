import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  BarChart3,
  PieChart,
  Calendar,
  Download,
  Printer,
  Share2,
  Filter,
  SlidersHorizontal,
  Search,
  RefreshCw,
  FileSpreadsheet,
  FileText,
  FileCheck2,
  CreditCard,
  Building2,
  Users,
  ShoppingBag,
  Sparkles,
  Zap,
  ShieldCheck,
  AlertCircle,
  HelpCircle,
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight,
  Layers,
  Percent,
  Activity,
  CheckCircle2,
  Clock,
  RotateCcw,
  Bot
} from 'lucide-react';
import { Currency } from '../types';

interface FinancialReportsAnalyticsProps {
  currency: Currency;
  onShowToast?: (message: string) => void;
  onNavigateTab?: (tab: string) => void;
}

// Sample Service Revenue Breakdown
interface ServiceRevenueItem {
  id: string;
  name: string;
  category: string;
  ordersCount: number;
  grossPkr: number;
  netPkr: number;
  sharePercent: number;
  growth: number;
}

const SERVICE_REVENUE: ServiceRevenueItem[] = [
  {
    id: 'SRV-1',
    name: 'Presentation Design (Pitch Decks & Academic)',
    category: 'Design & Visuals',
    ordersCount: 48,
    grossPkr: 1440000,
    netPkr: 1368000,
    sharePercent: 38.5,
    growth: 14.2
  },
  {
    id: 'SRV-2',
    name: 'Assignment & Academic Research Writing',
    category: 'Writing & Editorial',
    ordersCount: 62,
    grossPkr: 980000,
    netPkr: 931000,
    sharePercent: 26.2,
    growth: 8.7
  },
  {
    id: 'SRV-3',
    name: 'ATS Resume Engineering & CV Design',
    category: 'Career Branding',
    ordersCount: 84,
    grossPkr: 672000,
    netPkr: 638400,
    sharePercent: 18.0,
    growth: 22.5
  },
  {
    id: 'SRV-4',
    name: 'Corporate Report Formatting & Case Studies',
    category: 'Corporate Documents',
    ordersCount: 22,
    grossPkr: 648000,
    netPkr: 615600,
    sharePercent: 17.3,
    growth: 5.1
  }
];

// Sample Client Spending Leaders
interface TopClientSpending {
  id: string;
  name: string;
  email: string;
  totalOrders: number;
  spentPkr: number;
  lastPaymentDate: string;
  vipBadge: string;
}

const TOP_CLIENTS: TopClientSpending[] = [
  {
    id: 'CLT-102',
    name: 'Hamza Farooq',
    email: 'hamza.f@enterprise.pk',
    totalOrders: 6,
    spentPkr: 480000,
    lastPaymentDate: '2026-07-22',
    vipBadge: 'Enterprise VIP'
  },
  {
    id: 'CLT-204',
    name: 'David Miller',
    email: 'dmiller@globalstartups.co',
    totalOrders: 3,
    spentPkr: 336000,
    lastPaymentDate: '2026-07-23',
    vipBadge: 'Global Account'
  },
  {
    id: 'CLT-118',
    name: 'Zainab Fatima',
    email: 'zainab.design@gmail.com',
    totalOrders: 5,
    spentPkr: 160000,
    lastPaymentDate: '2026-07-24',
    vipBadge: 'Frequent Client'
  }
];

// Monthly Trend Sample Data for Visual Bar Visualizer
const MONTHLY_TRENDS = [
  { month: 'Jan 2026', revenuePkr: 2100000, growth: '+12%' },
  { month: 'Feb 2026', revenuePkr: 2450000, growth: '+16.6%' },
  { month: 'Mar 2026', revenuePkr: 2800000, growth: '+14.2%' },
  { month: 'Apr 2026', revenuePkr: 3100000, growth: '+10.7%' },
  { month: 'May 2026', revenuePkr: 3400000, growth: '+9.6%' },
  { month: 'Jun 2026', revenuePkr: 3650000, growth: '+7.3%' },
  { month: 'Jul 2026 (YTD)', revenuePkr: 3740000, growth: '+2.4%' }
];

export const FinancialReportsAnalytics: React.FC<FinancialReportsAnalyticsProps> = ({
  currency,
  onShowToast,
  onNavigateTab
}) => {
  // Navigation Sub-Tabs
  const [activeSubTab, setActiveSubTab] = useState<'overview' | 'services' | 'reports' | 'forecasting'>('overview');

  // Filters State
  const [timeRange, setTimeRange] = useState<string>('This Month');
  const [selectedQuarter, setSelectedQuarter] = useState<string>('All Quarters');
  const [selectedYear, setSelectedYear] = useState<string>('2026');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('All Methods');
  const [selectedCurrencyFilter, setSelectedCurrencyFilter] = useState<string>('All Currencies');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Selected Report State
  const [selectedReportType, setSelectedReportType] = useState<string>('Revenue Report');
  const [isExporting, setIsExporting] = useState<boolean>(false);

  // Currency Converter
  const formatMoney = (pkrAmount: number) => {
    switch (currency) {
      case 'USD':
        return `$${(pkrAmount / 280).toFixed(2)}`;
      case 'GBP':
        return `£${(pkrAmount / 355).toFixed(2)}`;
      case 'EUR':
        return `€${(pkrAmount / 300).toFixed(2)}`;
      case 'AED':
        return `AED ${(pkrAmount / 76).toFixed(2)}`;
      default:
        return `PKR ${pkrAmount.toLocaleString()}`;
    }
  };

  // KPI Placeholders & Values
  const kpis = useMemo(() => {
    const grossRevenue = 3740000; // Total billed
    const refunds = 61000; // Total refunded
    const netRevenue = grossRevenue - refunds;
    const pendingRevenue = 295000;
    const monthlyRevenue = 1280000;
    const yearlyRevenue = 21540000;
    const totalOrders = 216;
    const averageOrderValue = Math.round(grossRevenue / totalOrders);
    const refundRatePercent = ((refunds / grossRevenue) * 100).toFixed(1);
    const paymentSuccessRate = 98.4;
    const outstandingBalance = 145000;

    return {
      grossRevenue,
      netRevenue,
      pendingRevenue,
      monthlyRevenue,
      yearlyRevenue,
      averageOrderValue,
      refundRatePercent,
      paymentSuccessRate,
      outstandingBalance
    };
  }, []);

  const handleExport = (format: string) => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      if (onShowToast) onShowToast(`Successfully generated & downloaded ${selectedReportType} (${format.toUpperCase()})!`);
    }, 800);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* HEADER & PHASE 13 BANNER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-[#0D0D12] via-[#12121A] to-[#0D0D12] border border-[#E5C158]/30 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#E5C158]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-1.5 z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E5C158]/10 border border-[#E5C158]/30 text-[#E5C158] font-mono text-xs font-bold uppercase tracking-wider">
            <BarChart3 className="w-3.5 h-3.5 text-[#E5C158]" />
            <span>Admin Dashboard v2.0 • Phase 13</span>
          </div>
          <h1 className="font-poppins font-black text-2xl lg:text-3xl text-white tracking-tight flex items-center gap-3">
            Financial Reports & Revenue Analytics
          </h1>
          <p className="text-xs text-neutral-400 max-w-2xl">
            Executive financial intelligence workspace tracking gross & net earnings, service yield breakdown, payment distribution, client spending metrics, and AI predictive insights.
          </p>
        </div>

        {/* TOP LEVEL NAVIGATION SUB-TABS */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-2xl bg-white/[0.03] border border-white/10 z-10">
          <button
            onClick={() => setActiveSubTab('overview')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeSubTab === 'overview'
                ? 'bg-[#E5C158] text-black shadow-lg'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <DollarSign className="w-3.5 h-3.5" />
            <span>Overview</span>
          </button>

          <button
            onClick={() => setActiveSubTab('services')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeSubTab === 'services'
                ? 'bg-[#E5C158] text-black shadow-lg'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <PieChart className="w-3.5 h-3.5" />
            <span>Yield & Services</span>
          </button>

          <button
            onClick={() => setActiveSubTab('reports')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeSubTab === 'reports'
                ? 'bg-[#E5C158] text-black shadow-lg'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>Reports Center</span>
          </button>

          <button
            onClick={() => setActiveSubTab('forecasting')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeSubTab === 'forecasting'
                ? 'bg-[#E5C158] text-black shadow-lg'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Forecast</span>
          </button>
        </div>
      </div>

      {/* EXECUTIVE KPI CARDS (10 REUSABLE METRIC CARDS) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-10 gap-2.5">
        {/* KPI 1: TOTAL / GROSS REVENUE */}
        <div className="p-3.5 rounded-2xl bg-[#0D0D12] border border-[#E5C158]/40 space-y-1 hover:border-[#E5C158] transition-all shadow-lg col-span-2 sm:col-span-1 lg:col-span-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold uppercase text-[#E5C158]">Gross Revenue</span>
            <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="font-poppins font-black text-xl text-white">{formatMoney(kpis.grossRevenue)}</div>
          <span className="text-[9px] text-emerald-400 font-mono font-bold">+14.8% vs last month</span>
        </div>

        {/* KPI 2: NET REVENUE */}
        <div className="p-3.5 rounded-2xl bg-[#0D0D12] border border-emerald-500/30 space-y-1 hover:border-emerald-500 transition-all shadow-lg col-span-2 sm:col-span-1 lg:col-span-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold uppercase text-emerald-400">Net Revenue</span>
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="font-poppins font-black text-xl text-emerald-400">{formatMoney(kpis.netRevenue)}</div>
          <span className="text-[9px] text-neutral-400 font-mono">After Refunds & Fees</span>
        </div>

        {/* KPI 3: PENDING REVENUE */}
        <div className="p-3.5 rounded-2xl bg-[#0D0D12] border border-amber-500/30 space-y-1 hover:border-amber-500 transition-all shadow-lg">
          <span className="text-[10px] font-mono font-bold uppercase text-amber-400 block">Pending</span>
          <div className="font-poppins font-black text-base text-amber-400">{formatMoney(kpis.pendingRevenue)}</div>
          <span className="text-[9px] text-neutral-500 font-mono">In Verification</span>
        </div>

        {/* KPI 4: MONTHLY REVENUE */}
        <div className="p-3.5 rounded-2xl bg-[#0D0D12] border border-blue-500/30 space-y-1 hover:border-blue-500 transition-all shadow-lg">
          <span className="text-[10px] font-mono font-bold uppercase text-blue-400 block">This Month</span>
          <div className="font-poppins font-black text-base text-blue-400">{formatMoney(kpis.monthlyRevenue)}</div>
          <span className="text-[9px] text-neutral-500 font-mono">July 2026</span>
        </div>

        {/* KPI 5: YEARLY REVENUE */}
        <div className="p-3.5 rounded-2xl bg-[#0D0D12] border border-purple-500/30 space-y-1 hover:border-purple-500 transition-all shadow-lg">
          <span className="text-[10px] font-mono font-bold uppercase text-purple-400 block">Year To Date</span>
          <div className="font-poppins font-black text-base text-purple-400">{formatMoney(kpis.yearlyRevenue)}</div>
          <span className="text-[9px] text-neutral-500 font-mono">FY 2026 Total</span>
        </div>

        {/* KPI 6: AVERAGE ORDER VALUE */}
        <div className="p-3.5 rounded-2xl bg-[#0D0D12] border border-cyan-500/30 space-y-1 hover:border-cyan-500 transition-all shadow-lg">
          <span className="text-[10px] font-mono font-bold uppercase text-cyan-400 block">Avg Order (AOV)</span>
          <div className="font-poppins font-black text-base text-cyan-400">{formatMoney(kpis.averageOrderValue)}</div>
          <span className="text-[9px] text-neutral-500 font-mono">Per Ticket</span>
        </div>

        {/* KPI 7: REFUND RATE */}
        <div className="p-3.5 rounded-2xl bg-[#0D0D12] border border-rose-500/30 space-y-1 hover:border-rose-500 transition-all shadow-lg">
          <span className="text-[10px] font-mono font-bold uppercase text-rose-400 block">Refund Rate</span>
          <div className="font-poppins font-black text-base text-rose-400">{kpis.refundRatePercent}%</div>
          <span className="text-[9px] text-neutral-500 font-mono">Industry Low</span>
        </div>

        {/* KPI 8: SUCCESS RATE & OUTSTANDING */}
        <div className="p-3.5 rounded-2xl bg-[#0D0D12] border border-teal-500/30 space-y-1 hover:border-teal-500 transition-all shadow-lg">
          <span className="text-[10px] font-mono font-bold uppercase text-teal-400 block">Pay Success</span>
          <div className="font-poppins font-black text-base text-teal-400">{kpis.paymentSuccessRate}%</div>
          <span className="text-[9px] text-neutral-500 font-mono">Verification SLA</span>
        </div>
      </div>

      {/* SEARCH & GLOBAL FILTER BAR */}
      <div className="p-4 rounded-3xl bg-[#0D0D12] border border-white/10 space-y-3 shadow-xl">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* TIME RANGE SELECTOR */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-white/[0.02] border border-white/10 rounded-2xl text-xs font-mono">
            {['Today', 'This Week', 'This Month', 'Q3 2026', 'YTD 2026'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                  timeRange === range
                    ? 'bg-[#E5C158] text-black shadow'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {range}
              </button>
            ))}
          </div>

          {/* RIGHT SIDE QUICK FILTER DROPDOWNS */}
          <div className="flex flex-wrap items-center gap-2">
            <select
              value={selectedQuarter}
              onChange={(e) => setSelectedQuarter(e.target.value)}
              className="bg-white/[0.04] border border-white/10 rounded-xl px-3 py-2 text-xs font-mono text-neutral-300 focus:outline-none focus:border-[#E5C158] cursor-pointer"
            >
              <option value="All Quarters" className="bg-[#0D0D12]">All Quarters</option>
              <option value="Q1 2026" className="bg-[#0D0D12]">Q1 2026 (Jan - Mar)</option>
              <option value="Q2 2026" className="bg-[#0D0D12]">Q2 2026 (Apr - Jun)</option>
              <option value="Q3 2026" className="bg-[#0D0D12]">Q3 2026 (Jul - Sep)</option>
            </select>

            <select
              value={selectedPaymentMethod}
              onChange={(e) => setSelectedPaymentMethod(e.target.value)}
              className="bg-white/[0.04] border border-white/10 rounded-xl px-3 py-2 text-xs font-mono text-neutral-300 focus:outline-none focus:border-[#E5C158] cursor-pointer"
            >
              <option value="All Methods" className="bg-[#0D0D12]">All Payment Methods</option>
              <option value="EasyPaisa" className="bg-[#0D0D12]">EasyPaisa</option>
              <option value="JazzCash" className="bg-[#0D0D12]">JazzCash</option>
              <option value="Askari Bank" className="bg-[#0D0D12]">Askari Bank Transfer</option>
              <option value="Stripe" className="bg-[#0D0D12]">Stripe International</option>
            </select>

            <button
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                showAdvancedFilters
                  ? 'bg-[#E5C158] text-black'
                  : 'bg-white/5 border border-white/10 text-neutral-300 hover:text-white'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters</span>
            </button>
          </div>
        </div>

        {/* ADVANCED DRAWER */}
        <AnimatePresence>
          {showAdvancedFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="border-t border-white/10 pt-3 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs"
            >
              <div>
                <label className="text-[11px] font-mono text-neutral-400 block font-bold mb-1">Currency Filter</label>
                <select
                  value={selectedCurrencyFilter}
                  onChange={(e) => setSelectedCurrencyFilter(e.target.value)}
                  className="w-full bg-white/[0.04] border border-white/10 rounded-xl p-2 text-white focus:outline-none focus:border-[#E5C158]"
                >
                  <option value="All Currencies" className="bg-[#0D0D12]">All Currencies (PKR, USD, AED)</option>
                  <option value="PKR" className="bg-[#0D0D12]">PKR Only</option>
                  <option value="USD" className="bg-[#0D0D12]">USD Only</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-mono text-neutral-400 block font-bold mb-1">Search Keywords</label>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter by service name, client, order ID..."
                  className="w-full bg-white/[0.04] border border-white/10 rounded-xl p-2 text-white placeholder-neutral-500 focus:outline-none focus:border-[#E5C158]"
                />
              </div>

              <div className="flex items-end">
                <button
                  onClick={() => {
                    setTimeRange('This Month');
                    setSelectedQuarter('All Quarters');
                    setSelectedPaymentMethod('All Methods');
                    setSelectedCurrencyFilter('All Currencies');
                    setSearchQuery('');
                    if (onShowToast) onShowToast('Financial filters reset to default');
                  }}
                  className="w-full p-2 rounded-xl bg-white/10 hover:bg-white/20 text-neutral-300 font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Reset Filters</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* SUB-TAB CONTENT RENDERER */}
      {activeSubTab === 'overview' && (
        <div className="space-y-6">
          {/* REVENUE TRENDS & PAYMENT DISTRIBUTION ROW */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* LEFT 2 COLUMNS: VISUAL MONTHLY REVENUE BAR CHART */}
            <div className="lg:col-span-2 p-6 rounded-3xl bg-[#0D0D12] border border-white/10 space-y-4 shadow-xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-[#E5C158]" />
                    <h3 className="font-poppins font-bold text-white text-base">Monthly Revenue Growth & Yield</h3>
                  </div>
                  <p className="text-xs text-neutral-400">Monthly billing progression for FY 2026 across all digital service lines</p>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono font-bold">
                  +18.2% YoY Growth
                </span>
              </div>

              {/* BAR CHART GRAPH VISUALIZER */}
              <div className="space-y-3 pt-2">
                {MONTHLY_TRENDS.map((item, index) => {
                  const maxVal = 4000000;
                  const pct = Math.min((item.revenuePkr / maxVal) * 100, 100);
                  return (
                    <div key={index} className="space-y-1">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-neutral-300 font-semibold">{item.month}</span>
                        <div className="flex items-center gap-2">
                          <strong className="text-white font-bold">{formatMoney(item.revenuePkr)}</strong>
                          <span className="text-emerald-400 text-[10px]">{item.growth}</span>
                        </div>
                      </div>
                      <div className="w-full h-3 rounded-full bg-white/5 overflow-hidden p-0.5 border border-white/5">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${pct}%` }}
                          transition={{ duration: 0.8, delay: index * 0.1 }}
                          className="h-full rounded-full bg-gradient-to-r from-[#E5C158] to-[#fce888] shadow-[0_0_12px_rgba(229,193,88,0.4)]"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* RIGHT COLUMN: PAYMENT METHOD DISTRIBUTION & CURRENCY BREAKDOWN */}
            <div className="space-y-6">
              {/* PAYMENT METHOD DISTRIBUTION */}
              <div className="p-6 rounded-3xl bg-[#0D0D12] border border-white/10 space-y-4 shadow-xl">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-blue-400" />
                    <h3 className="font-poppins font-bold text-white text-base">Payment Methods</h3>
                  </div>
                  <span className="text-[10px] font-mono text-neutral-400">Share %</span>
                </div>

                <div className="space-y-3">
                  {[
                    { name: 'EasyPaisa (03116191234)', pct: 38, color: 'bg-emerald-500', pkr: 1421200 },
                    { name: 'JazzCash (03015323688)', pct: 32, color: 'bg-amber-500', pkr: 1196800 },
                    { name: 'Askari Bank Transfer', pct: 20, color: 'bg-blue-500', pkr: 748000 },
                    { name: 'Stripe International', pct: 10, color: 'bg-purple-500', pkr: 374000 }
                  ].map((m, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-neutral-300 font-medium">{m.name}</span>
                        <strong className="text-white font-mono">{m.pct}% ({formatMoney(m.pkr)})</strong>
                      </div>
                      <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden">
                        <div className={`h-full ${m.color}`} style={{ width: `${m.pct}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CURRENCY DISTRIBUTION */}
              <div className="p-6 rounded-3xl bg-[#0D0D12] border border-white/10 space-y-3 shadow-xl">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-purple-400" />
                    <h3 className="font-poppins font-bold text-white text-sm">Currency Split</h3>
                  </div>
                  <span className="text-[10px] font-mono text-neutral-400">Multi-Currency</span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5 space-y-0.5">
                    <span className="text-[10px] font-mono text-neutral-400 block">PKR Share</span>
                    <strong className="text-white font-mono font-black text-sm">78.5%</strong>
                    <span className="text-[9px] text-neutral-500 block">Domestic Revenue</span>
                  </div>

                  <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5 space-y-0.5">
                    <span className="text-[10px] font-mono text-neutral-400 block">USD / Intl Share</span>
                    <strong className="text-emerald-400 font-mono font-black text-sm">21.5%</strong>
                    <span className="text-[9px] text-neutral-500 block">Global Exports</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* TOP CLIENT SPENDING & REFUND RATIO */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* CLIENT SPENDING LEADERS */}
            <div className="p-6 rounded-3xl bg-[#0D0D12] border border-white/10 space-y-4 shadow-xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#E5C158]" />
                  <h3 className="font-poppins font-bold text-white text-base">Top Client Account Yield</h3>
                </div>
                <span className="text-[10px] text-neutral-400 font-mono">Billed Volume</span>
              </div>

              <div className="space-y-3 divide-y divide-white/5">
                {TOP_CLIENTS.map((client) => (
                  <div key={client.id} className="pt-3 first:pt-0 flex items-center justify-between text-xs">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <strong className="text-white font-bold">{client.name}</strong>
                        <span className="px-2 py-0.5 rounded-full bg-[#E5C158]/10 text-[#E5C158] font-mono text-[9px] font-bold border border-[#E5C158]/30">
                          {client.vipBadge}
                        </span>
                      </div>
                      <span className="text-[10px] text-neutral-400 font-mono block">{client.email} • {client.totalOrders} Orders</span>
                    </div>

                    <div className="text-right">
                      <strong className="font-poppins font-black text-emerald-400 text-sm block">
                        {formatMoney(client.spentPkr)}
                      </strong>
                      <span className="text-[9px] text-neutral-500 font-mono">Last: {client.lastPaymentDate}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* REFUND & DISPUTE IMPACT ANALYSIS */}
            <div className="p-6 rounded-3xl bg-[#0D0D12] border border-white/10 space-y-4 shadow-xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <RotateCcw className="w-4 h-4 text-rose-400" />
                  <h3 className="font-poppins font-bold text-white text-base">Refund & Loss Ratio</h3>
                </div>
                <span className="text-[10px] text-rose-400 font-mono font-bold">1.63% Risk Margin</span>
              </div>

              <div className="space-y-3 text-xs text-neutral-300">
                <p className="text-neutral-400 leading-relaxed">
                  Financial loss prevention remains optimal with a total refund footprint of <strong>{formatMoney(61000)}</strong> against <strong>{formatMoney(3740000)}</strong> gross volume.
                </p>

                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div className="p-3.5 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 space-y-1">
                    <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase block">Retained Yield</span>
                    <strong className="font-poppins font-black text-white text-base">98.37%</strong>
                    <span className="text-[9px] text-neutral-500 block">High Client Satisfaction</span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-rose-500/5 border border-rose-500/20 space-y-1">
                    <span className="text-[10px] font-mono text-rose-400 font-bold uppercase block">Chargeback Defense</span>
                    <strong className="font-poppins font-black text-white text-base">100%</strong>
                    <span className="text-[9px] text-neutral-500 block">0 Lost Gateway Claims</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SERVICE & PACKAGE YIELD TAB */}
      {activeSubTab === 'services' && (
        <div className="p-6 rounded-3xl bg-[#0D0D12] border border-white/10 space-y-6 shadow-2xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
            <div className="space-y-1">
              <h3 className="font-poppins font-bold text-white text-lg flex items-center gap-2">
                <PieChart className="w-5 h-5 text-[#E5C158]" />
                <span>Service Yield & Package Performance</span>
              </h3>
              <p className="text-xs text-neutral-400">Detailed breakdown of gross and net revenue generated per service line and tier package.</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.02] text-[11px] font-mono uppercase text-neutral-400">
                  <th className="p-4">Service Category & Name</th>
                  <th className="p-4">Orders Completed</th>
                  <th className="p-4">Gross Yield</th>
                  <th className="p-4">Net Profit</th>
                  <th className="p-4">Revenue Share</th>
                  <th className="p-4">MoM Growth</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-xs text-neutral-300">
                {SERVICE_REVENUE.map((srv) => (
                  <tr key={srv.id} className="hover:bg-white/[0.02]">
                    <td className="p-4">
                      <strong className="text-white font-bold block">{srv.name}</strong>
                      <span className="text-[10px] text-neutral-400 font-mono">{srv.category}</span>
                    </td>
                    <td className="p-4 font-mono font-bold text-white">{srv.ordersCount} Units</td>
                    <td className="p-4 font-mono font-bold text-emerald-400">{formatMoney(srv.grossPkr)}</td>
                    <td className="p-4 font-mono text-neutral-200">{formatMoney(srv.netPkr)}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-white text-xs">{srv.sharePercent}%</span>
                        <div className="w-20 h-1.5 rounded-full bg-white/10 overflow-hidden">
                          <div className="h-full bg-[#E5C158]" style={{ width: `${srv.sharePercent}%` }} />
                        </div>
                      </div>
                    </td>
                    <td className="p-4 font-mono font-bold text-emerald-400 flex items-center gap-1">
                      <ArrowUpRight className="w-3.5 h-3.5" />
                      <span>+{srv.growth}%</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* REPORTS CENTER & EXPORT ENGINE */}
      {activeSubTab === 'reports' && (
        <div className="p-6 rounded-3xl bg-[#0D0D12] border border-white/10 space-y-6 shadow-2xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div className="space-y-1">
              <h3 className="font-poppins font-bold text-white text-lg flex items-center gap-2">
                <FileSpreadsheet className="w-5 h-5 text-emerald-400" />
                <span>Financial Reports Generator & Export Center</span>
              </h3>
              <p className="text-xs text-neutral-400">Generate, print, and export official financial audit reports for tax, management, and board reviews.</p>
            </div>

            {/* EXPORT BUTTONS */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                disabled={isExporting}
                onClick={() => handleExport('pdf')}
                className="px-3.5 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white border border-rose-500/30 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-50"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>PDF</span>
              </button>

              <button
                disabled={isExporting}
                onClick={() => handleExport('excel')}
                className="px-3.5 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-white border border-emerald-500/30 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-50"
              >
                <FileSpreadsheet className="w-3.5 h-3.5" />
                <span>Excel (XLSX)</span>
              </button>

              <button
                disabled={isExporting}
                onClick={() => handleExport('csv')}
                className="px-3.5 py-2 rounded-xl bg-[#E5C158]/10 hover:bg-[#E5C158] text-[#E5C158] hover:text-black border border-[#E5C158]/30 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-50"
              >
                <Download className="w-3.5 h-3.5" />
                <span>CSV</span>
              </button>

              <button
                onClick={() => {
                  window.print();
                }}
                className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print</span>
              </button>
            </div>
          </div>

          {/* REPORT CATEGORIES SELECTION GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { title: 'Revenue Report', desc: 'Comprehensive gross & net revenue yield per period.', icon: DollarSign, color: 'text-emerald-400' },
              { title: 'Payments Report', desc: 'Gateway settlement & verification audit statement.', icon: CreditCard, color: 'text-blue-400' },
              { title: 'Invoice Report', desc: 'Summary of standard, tax, and credit note documents.', icon: FileCheck2, color: 'text-[#E5C158]' },
              { title: 'Refund Report', desc: 'Claims, chargeback logs, and customer reversals.', icon: RotateCcw, color: 'text-rose-400' },
              { title: 'Order Financial Report', desc: 'Per-order margin and speed multiplier breakdown.', icon: ShoppingBag, color: 'text-purple-400' },
              { title: 'Client Financial Report', desc: 'Client lifetime value (LTV) & spending ranking.', icon: Users, color: 'text-cyan-400' },
              { title: 'Tax Summary (Future)', desc: 'Withholding tax, FBR & international VAT ledger.', icon: Building2, color: 'text-amber-400' },
              { title: 'Profit Analysis (Future)', desc: 'Operating margins, overheads & net profitability.', icon: TrendingUp, color: 'text-teal-400' }
            ].map((rep) => {
              const isSelected = selectedReportType === rep.title;
              return (
                <div
                  key={rep.title}
                  onClick={() => setSelectedReportType(rep.title)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2 ${
                    isSelected
                      ? 'bg-[#E5C158]/10 border-[#E5C158] shadow-lg'
                      : 'bg-white/[0.02] border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <rep.icon className={`w-5 h-5 ${rep.color}`} />
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-[#E5C158]" />}
                  </div>
                  <strong className="text-white font-bold text-xs block">{rep.title}</strong>
                  <p className="text-[11px] text-neutral-400 leading-tight">{rep.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* AI FORECASTING & FUTURE FINANCIAL INSIGHTS */}
      {activeSubTab === 'forecasting' && (
        <div className="p-6 rounded-3xl bg-[#0D0D12] border border-[#E5C158]/40 space-y-6 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-[#E5C158]" />
                <h3 className="font-poppins font-bold text-white text-lg">AI Financial Insights & Revenue Forecasting</h3>
              </div>
              <p className="text-xs text-neutral-400">Predictive financial intelligence model powered by historical yield and seasonal demand trends.</p>
            </div>
            <span className="px-3 py-1 rounded-full bg-[#E5C158]/10 text-[#E5C158] border border-[#E5C158]/30 font-mono text-xs font-bold">
              Business Health Score: 94 / 100 (Excellent)
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2">
              <span className="text-[10px] font-mono font-bold text-[#E5C158] uppercase block">Q4 2026 Forecast</span>
              <strong className="font-poppins font-black text-2xl text-white block">{formatMoney(12500000)}</strong>
              <p className="text-xs text-neutral-400">Projected 32% spike due to end-of-year academic assignment deadlines & corporate reports.</p>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2">
              <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase block">Cash Flow Security</span>
              <strong className="font-poppins font-black text-2xl text-emerald-400 block">High Stability</strong>
              <p className="text-xs text-neutral-400">98.4% upfront payment verification rate ensures healthy operating cash reserves.</p>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2">
              <span className="text-[10px] font-mono font-bold text-purple-400 uppercase block">Yield Optimization Tip</span>
              <strong className="font-poppins font-black text-sm text-purple-300 block">Express Speed Multipliers</strong>
              <p className="text-xs text-neutral-400">Increasing Same-Day (+75%) express option availability could boost net revenue by 12.5%.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
