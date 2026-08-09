import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  FileText,
  Plus,
  Search,
  Filter,
  Edit3,
  Trash2,
  Copy,
  Eye,
  Calendar,
  Clock,
  User,
  Tag,
  Sparkles,
  Save,
  Send,
  X,
  CheckCircle2,
  Bot,
  Globe,
  Share2,
  BarChart3,
  ArrowUpRight,
  BookOpen,
  Image as ImageIcon,
  Check,
  Folder
} from 'lucide-react';
import { Currency } from '../../types';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  featuredImage: string;
  author: string;
  category: string;
  tags: string[];
  readingTime: string;
  status: 'published' | 'draft' | 'scheduled' | 'archived';
  publishDate: string;
  lastModified: string;
  seoScore: number;
  excerpt: string;
  content: string;
  aiGeneratedStatus: 'human' | 'ai_assisted' | 'ai_generated';
  version: string;
  internalNotes?: string;
  metaTitle?: string;
  metaKeywords?: string;
  featured?: boolean;
}

interface CMSBlogEngineProps {
  currency: Currency;
  onShowToast?: (message: string) => void;
}

export const CMSBlogEngine: React.FC<CMSBlogEngineProps> = ({
  currency,
  onShowToast,
}) => {
  // Blog Articles State
  const [articles, setArticles] = useState<BlogPost[]>([
    {
      id: 'post-101',
      title: 'How to Design Executive Pitch Decks That Secure Investor Funding in 2026',
      slug: '/blog/executive-pitch-deck-design-guide-2026',
      featuredImage: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&q=80',
      author: 'Muhammad Shehroz Sultan (Founder)',
      category: 'Presentation Design',
      tags: ['pitch deck', 'investors', 'slide design', 'mfs growth'],
      readingTime: '6 min read',
      status: 'published',
      publishDate: '2026-07-25 10:00 PKT',
      lastModified: '2026-07-26 14:20 PKT',
      seoScore: 96,
      excerpt: 'Comprehensive blueprint on crafting executive pitch decks with data visualization, visual hierarchy, and persuasive storytelling.',
      content: `Executive presentations require an uncompromising balance between visual elegance and data clarity. In this guide, we break down how MFS Growth Agency engineers 10-slide pitch decks that capture investor attention within 30 seconds.`,
      aiGeneratedStatus: 'ai_assisted',
      version: 'v1.4',
      internalNotes: 'Reviewed by Founder. Approved for Gold branding theme guidelines.',
      metaTitle: 'Executive Pitch Deck Design Guide 2026 | MFS Growth Agency',
      metaKeywords: 'pitch deck design, investor slides, executive presentation',
      featured: true,
    },
    {
      id: 'post-102',
      title: 'Mastering APA, Harvard & MLA Referencing in Academic Assignments',
      slug: '/blog/mastering-apa-harvard-mla-referencing-2026',
      featuredImage: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&q=80',
      author: 'Academic Research Lead',
      category: 'Academic Writing',
      tags: ['apa style', 'harvard', 'mla', 'assignment help'],
      readingTime: '8 min read',
      status: 'published',
      publishDate: '2026-07-20 18:30 PKT',
      lastModified: '2026-07-21 09:15 PKT',
      seoScore: 92,
      excerpt: 'Avoid accidental plagiarism and format academic bibliographies effortlessly with updated 2026 citation standards.',
      content: `Academic integrity relies heavily on proper citation and attribution. Whether you are working on a university research report or a case study thesis...`,
      aiGeneratedStatus: 'human',
      version: 'v1.1',
      internalNotes: 'Includes updated 2026 APA 7th edition citation examples.',
      metaTitle: 'Mastering Academic Citation Standards 2026 | MFS Growth',
      metaKeywords: 'apa 7th, harvard referencing, academic formatting',
      featured: false,
    },
    {
      id: 'post-103',
      title: 'Beat the ATS Algorithms: Engineering High-Impact Resumes in 2026',
      slug: '/blog/ats-resume-engineering-tips-2026',
      featuredImage: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=600&q=80',
      author: 'Shehroz Sultan',
      category: 'Resume & Career',
      tags: ['ats resume', 'cv design', 'career growth', 'job application'],
      readingTime: '5 min read',
      status: 'scheduled',
      publishDate: '2026-08-01 09:00 PKT',
      lastModified: '2026-07-26 16:45 PKT',
      seoScore: 95,
      excerpt: 'Learn how Applicant Tracking Systems parse resume keywords and how to format text for 98%+ candidate match rates.',
      content: `Modern recruitment processes rely on AI resume screeners. To ensure your CV passes automated filters and reaches hiring managers...`,
      aiGeneratedStatus: 'ai_assisted',
      version: 'v2.0',
      internalNotes: 'Scheduled for release on August 1st.',
      metaTitle: 'ATS Resume Engineering Guide 2026 | MFS Growth Agency',
      metaKeywords: 'ats resume, cv format, job application tips',
      featured: true,
    },
  ]);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  // New/Edit Form State
  const [formData, setFormData] = useState<Partial<BlogPost>>({
    title: '',
    slug: '',
    category: 'Presentation Design',
    author: 'Muhammad Shehroz Sultan',
    excerpt: '',
    content: '',
    status: 'draft',
    aiGeneratedStatus: 'human',
  });

  const filteredPosts = articles.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || post.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleOpenNewEditor = () => {
    setFormData({
      title: '',
      slug: '',
      category: 'Presentation Design',
      author: 'Muhammad Shehroz Sultan',
      excerpt: '',
      content: '',
      status: 'draft',
      aiGeneratedStatus: 'human',
    });
    setSelectedPost(null);
    setIsEditorOpen(true);
  };

  const handleOpenEditEditor = (post: BlogPost) => {
    setSelectedPost(post);
    setFormData(post);
    setIsEditorOpen(true);
  };

  const handleSaveArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title) return;

    if (selectedPost) {
      // Update existing
      setArticles((prev) =>
        prev.map((p) =>
          p.id === selectedPost.id
            ? ({
                ...p,
                ...formData,
                lastModified: new Date().toISOString().replace('T', ' ').substring(0, 16) + ' PKT',
              } as BlogPost)
            : p
        )
      );
      if (onShowToast) onShowToast(`Updated article "${formData.title}"`);
    } else {
      // Create new
      const newPost: BlogPost = {
        id: `post-${Date.now()}`,
        version: '1.0.0',
        title: formData.title || 'Untitled Article',
        slug: formData.slug || `/blog/${(formData.title || 'article').toLowerCase().replace(/\s+/g, '-')}`,
        featuredImage: formData.featuredImage || 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&q=80',
        author: formData.author || 'MFS Growth Team',
        category: formData.category || 'General',
        tags: ['mfs', 'growth', 'digital solutions'],
        readingTime: '5 min read',
        status: (formData.status as any) || 'draft',
        publishDate: new Date().toISOString().replace('T', ' ').substring(0, 16) + ' PKT',
        lastModified: new Date().toISOString().replace('T', ' ').substring(0, 16) + ' PKT',
        seoScore: 90,
        excerpt: formData.excerpt || '',
        content: formData.content || '',
        aiGeneratedStatus: (formData.aiGeneratedStatus as any) || 'human',
      };
      setArticles((prev) => [newPost, ...prev]);
      if (onShowToast) onShowToast(`Published new article "${newPost.title}"`);
    }
    setIsEditorOpen(false);
  };

  const handleDeletePost = (id: string, title: string) => {
    setArticles((prev) => prev.filter((p) => p.id !== id));
    if (onShowToast) onShowToast(`Deleted article "${title}"`);
  };

  const handleDuplicatePost = (post: BlogPost) => {
    const duplicated: BlogPost = {
      ...post,
      id: `post-${Date.now()}`,
      title: `${post.title} (Copy)`,
      slug: `${post.slug}-copy`,
      status: 'draft',
      lastModified: new Date().toISOString().replace('T', ' ').substring(0, 16) + ' PKT',
      version: 'v1.0-draft',
    };
    setArticles((prev) => [duplicated, ...prev]);
    if (onShowToast) onShowToast(`Duplicated article into draft "${duplicated.title}"`);
  };

  return (
    <div className="space-y-6">
      {/* HEADER & CONTROLS */}
      <div className="glass-card rounded-3xl border border-white/10 p-5 space-y-4 bg-[#0D0D12]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 font-mono text-[10px] font-bold border border-blue-500/30 uppercase">
                ENTERPRISE BLOG ENGINE
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#28C76F]/10 text-[#28C76F] font-mono text-[10px] font-bold border border-[#28C76F]/30 flex items-center gap-1">
                <Globe className="w-3 h-3 text-[#28C76F]" />
                <span>SEO INDEXED</span>
              </span>
            </div>
            <h3 className="font-poppins font-bold text-white text-base mt-1">
              Blog Article Publishing & Content CMS
            </h3>
            <p className="text-xs text-neutral-400">
              Create, schedule, draft, and optimize educational articles, guides, and thought leadership pieces for student & corporate growth.
            </p>
          </div>

          <button
            onClick={handleOpenNewEditor}
            className="px-5 py-2.5 rounded-2xl bg-[#E5C158] text-black font-extrabold text-xs hover:bg-[#fce888] transition-all flex items-center gap-1.5 cursor-pointer shadow-lg shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Article</span>
          </button>
        </div>

        {/* SEARCH & FILTERS */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 pt-2 border-t border-white/10">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles by title, category, author..."
              className="w-full bg-white/[0.04] border border-white/10 rounded-2xl pl-10 pr-4 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#E5C158]"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-white/[0.04] border border-white/10 rounded-xl px-3 py-2 text-xs text-neutral-300 font-mono focus:outline-none shrink-0"
            >
              <option value="all" className="bg-black">All Statuses</option>
              <option value="published" className="bg-black">Published</option>
              <option value="draft" className="bg-black">Drafts</option>
              <option value="scheduled" className="bg-black">Scheduled</option>
            </select>
          </div>
        </div>
      </div>

      {/* ARTICLES TABLE */}
      <div className="glass-card rounded-3xl border border-white/10 overflow-hidden bg-[#0D0D12]">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-white/[0.03] text-neutral-400 font-mono uppercase text-[10px] border-b border-white/10">
              <tr>
                <th className="py-3 px-5">Article & Slug</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Author</th>
                <th className="py-3 px-4">Publish Date</th>
                <th className="py-3 px-4">SEO Score</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-neutral-300">
              {filteredPosts.map((post) => (
                <tr key={post.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-3">
                      <img
                        src={post.featuredImage}
                        alt={post.title}
                        className="w-12 h-12 rounded-xl object-cover shrink-0 border border-white/10"
                      />
                      <div className="space-y-0.5">
                        <strong className="text-white font-bold text-xs line-clamp-1 hover:text-[#E5C158] transition-colors cursor-pointer">
                          {post.title}
                        </strong>
                        <span className="text-[10px] font-mono text-neutral-400 block line-clamp-1">
                          {post.slug}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="py-4 px-4 font-mono text-neutral-300">
                    <span className="px-2.5 py-1 rounded-xl bg-white/5 border border-white/10 text-neutral-200">
                      {post.category}
                    </span>
                  </td>

                  <td className="py-4 px-4 font-mono text-[11px] text-neutral-300">
                    {post.author}
                  </td>

                  <td className="py-4 px-4 font-mono text-[10px] text-neutral-400">
                    {post.publishDate}
                  </td>

                  <td className="py-4 px-4">
                    <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-mono text-[10px] font-bold">
                      {post.seoScore}/100
                    </span>
                  </td>

                  <td className="py-4 px-4">
                    <span
                      className={`px-2.5 py-1 rounded-full font-mono text-[10px] font-bold border uppercase ${
                        post.status === 'published'
                          ? 'bg-[#28C76F]/20 text-[#28C76F] border-[#28C76F]/30'
                          : post.status === 'scheduled'
                          ? 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                          : 'bg-white/10 text-neutral-400 border-white/20'
                      }`}
                    >
                      {post.status}
                    </span>
                  </td>

                  <td className="py-4 px-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleDuplicatePost(post)}
                        className="p-2 rounded-xl bg-white/5 hover:bg-cyan-500/20 text-neutral-300 hover:text-cyan-400 transition-colors cursor-pointer"
                        title="Duplicate Article"
                      >
                        <Copy className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => handleOpenEditEditor(post)}
                        className="p-2 rounded-xl bg-white/5 hover:bg-[#E5C158]/20 text-neutral-300 hover:text-[#E5C158] transition-colors cursor-pointer"
                        title="Edit Article"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => handleDeletePost(post.id, post.title)}
                        className="p-2 rounded-xl bg-white/5 hover:bg-red-500/20 text-neutral-400 hover:text-red-400 transition-colors cursor-pointer"
                        title="Delete Article"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ARTICLE EDITOR MODAL */}
      <AnimatePresence>
        {isEditorOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-3xl h-[85vh] bg-[#0D0D12] border border-white/10 rounded-3xl p-6 space-y-5 overflow-y-auto shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2 text-[#E5C158]">
                  <FileText className="w-5 h-5" />
                  <h3 className="font-poppins font-bold text-white text-base">
                    {selectedPost ? 'Edit Blog Article' : 'Create New Article'}
                  </h3>
                </div>
                <button
                  onClick={() => setIsEditorOpen(false)}
                  className="p-1 rounded-lg text-neutral-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveArticle} className="space-y-4 text-xs flex-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-neutral-400 font-mono text-[10px] uppercase block mb-1">
                      Article Title
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Executive Presentation Design Guide"
                      value={formData.title || ''}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#E5C158] font-bold"
                    />
                  </div>

                  <div>
                    <label className="text-neutral-400 font-mono text-[10px] uppercase block mb-1">
                      URL Slug
                    </label>
                    <input
                      type="text"
                      placeholder="/blog/my-custom-slug"
                      value={formData.slug || ''}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-[#E5C158]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-neutral-400 font-mono text-[10px] uppercase block mb-1">
                      Category
                    </label>
                    <select
                      value={formData.category || 'Presentation Design'}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#E5C158]"
                    >
                      <option value="Presentation Design" className="bg-black">Presentation Design</option>
                      <option value="Academic Writing" className="bg-black">Academic Writing</option>
                      <option value="Resume & Career" className="bg-black">Resume & Career</option>
                      <option value="Corporate Reports" className="bg-black">Corporate Reports</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-neutral-400 font-mono text-[10px] uppercase block mb-1">
                      Author Name
                    </label>
                    <input
                      type="text"
                      value={formData.author || ''}
                      onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                      className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#E5C158]"
                    />
                  </div>

                  <div>
                    <label className="text-neutral-400 font-mono text-[10px] uppercase block mb-1">
                      Publish Status
                    </label>
                    <select
                      value={formData.status || 'draft'}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                      className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#E5C158]"
                    >
                      <option value="draft" className="bg-black">Draft</option>
                      <option value="published" className="bg-black">Published Live</option>
                      <option value="scheduled" className="bg-black">Scheduled</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-neutral-400 font-mono text-[10px] uppercase block mb-1">
                    Short Excerpt / Meta Description
                  </label>
                  <textarea
                    rows={2}
                    value={formData.excerpt || ''}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#E5C158]"
                  />
                </div>

                <div>
                  <label className="text-neutral-400 font-mono text-[10px] uppercase block mb-1">
                    Main Article Content (Markdown / HTML)
                  </label>
                  <textarea
                    rows={8}
                    value={formData.content || ''}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-[#E5C158]"
                  />
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
                    type="submit"
                    className="px-6 py-2.5 rounded-2xl bg-[#E5C158] text-black font-extrabold shadow-lg hover:bg-[#fce888]"
                  >
                    Save Article
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
