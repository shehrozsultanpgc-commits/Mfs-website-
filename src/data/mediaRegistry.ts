export interface MediaAsset {
  id: string;
  name: string;
  type: 'video' | 'image' | 'graphic';
  url: string;
  posterUrl?: string;
  source: 'Unsplash' | 'Pexels' | 'Mixkit' | 'Custom CSS/Canvas';
  license: 'Commercial Free (No Attribution Required)';
  usedIn: string[];
  altText: string;
}

export const MEDIA_REGISTRY: MediaAsset[] = [
  {
    id: 'hero-ambient-video',
    name: 'Cinematic MFS Growth Dark Tech Loop',
    type: 'video',
    url: '/videos/hero.mp4',
    source: 'Custom CSS/Canvas',
    license: 'Commercial Free (No Attribution Required)',
    usedIn: ['Hero Section', 'Landing Page Ambient Header'],
    altText: 'Atmospheric digital network lines representing modern digital growth and technology'
  },
  {
    id: 'hero-poster-fallback',
    name: 'Modern Executive Digital Workspace',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1920&q=80',
    source: 'Unsplash',
    license: 'Commercial Free (No Attribution Required)',
    usedIn: ['Hero Poster Fallback', 'Mobile Hero Background'],
    altText: 'Dark high-tech executive workspace with ambient lighting'
  },
  {
    id: 'service-presentation',
    name: 'Executive Pitch Deck Visual Design',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80',
    source: 'Unsplash',
    license: 'Commercial Free (No Attribution Required)',
    usedIn: ['Services Section', 'Our Work Portfolio Item 1'],
    altText: 'Executive pitch deck slides on laptop screen with custom data graphics'
  },
  {
    id: 'service-assignment',
    name: 'Academic Research & Literature Analysis',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
    source: 'Unsplash',
    license: 'Commercial Free (No Attribution Required)',
    usedIn: ['Services Section', 'Our Work Portfolio Item 2'],
    altText: 'Academic research document with charts and analytical notes'
  },
  {
    id: 'service-resume',
    name: 'ATS Executive Resume Engineering',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=800&q=80',
    source: 'Unsplash',
    license: 'Commercial Free (No Attribution Required)',
    usedIn: ['Services Section', 'Our Work Portfolio Item 3'],
    altText: 'Clean single-column ATS compliant resume layout on desk'
  },
  {
    id: 'service-case-study',
    name: 'Healthcare AI Medical Case Study',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
    source: 'Unsplash',
    license: 'Commercial Free (No Attribution Required)',
    usedIn: ['Services Section', 'Our Work Portfolio Item 4'],
    altText: 'Medical research case study data dashboard'
  },
  {
    id: 'service-reports',
    name: 'Corporate Financial Audit Report',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    source: 'Unsplash',
    license: 'Commercial Free (No Attribution Required)',
    usedIn: ['Services Section', 'Our Work Portfolio Item 5'],
    altText: 'Corporate financial analytics and report document formatting'
  },
  {
    id: 'service-infographic',
    name: 'Global Supply Chain Infographics',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?auto=format&fit=crop&w=800&q=80',
    source: 'Unsplash',
    license: 'Commercial Free (No Attribution Required)',
    usedIn: ['Services Section', 'Our Work Portfolio Item 6'],
    altText: 'Vector infographic metrics and process workflow graphics'
  },
  {
    id: 'about-workspace',
    name: 'MFS Growth Agency Digital Studio & Operations Desk',
    type: 'image',
    url: '/images/about/mfs-digital-agency-studio-workspace.jpg',
    source: 'Custom CSS/Canvas',
    license: 'Commercial Free (No Attribution Required)',
    usedIn: ['About Page', 'Agency Overview', 'Studio Operations'],
    altText: 'MFS Growth Agency executive digital studio workspace and multi-pillar production desk'
  },
  {
    id: 'guide-ats-og-cover',
    name: 'ATS Resume Engineering Master Guide Visual Architecture',
    type: 'image',
    url: '/images/blog/ats-compliant-executive-resume-og.jpg',
    source: 'Custom CSS/Canvas',
    license: 'Commercial Free (No Attribution Required)',
    usedIn: ['ATS Resume Guide Page', 'Social OpenGraph 1200x630 Banner', 'Knowledge Center'],
    altText: 'ATS resume engineering diagram showing parser text extraction, Workday and Taleo scoring HUD, and single-column layout benchmarks'
  }
];
