import React, { useState } from 'react';
import {
  ArrowRight,
  Bookmark,
  BookmarkCheck,
  Briefcase,
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  ExternalLink,
  Filter,
  GraduationCap,
  MapPin,
  Search,
  Sparkles,
  X,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { JobCategory, JobListing } from '../../types';

export const JobsView: React.FC = () => {
  const { jobs, user, toggleSaveJob, showSuccessToast } = useApp();

  const [activeTab, setActiveTab] = useState<JobCategory | 'saved'>('private');
  const [searchTerm, setSearchTerm] = useState('');
  const [companyFilter, setCompanyFilter] = useState('All');
  const [locationFilter, setLocationFilter] = useState('All');
  const [workModeFilter, setWorkModeFilter] = useState('All');

  // Application modal
  const [applyingJob, setApplyingJob] = useState<JobListing | null>(null);
  const [applyName, setApplyName] = useState(user?.name || '');
  const [applyEmail, setApplyEmail] = useState(user?.email || '');
  const [applyNote, setApplyNote] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Extract unique companies & locations for filters
  const companies = ['All', ...Array.from(new Set(jobs.map((j) => j.company)))];
  const locations = [
    'All',
    ...Array.from(
      new Set(
        jobs.map((j) => {
          const mainCity = j.location.split(',')[0].split('/')[0].trim();
          return mainCity;
        })
      )
    ),
  ];

  const filteredJobs = jobs.filter((job) => {
    // Tab filter
    if (activeTab === 'saved') {
      if (!user || !user.savedJobIds.includes(job.id)) return false;
    } else {
      if (job.category !== activeTab) return false;
    }

    // Company filter
    if (companyFilter !== 'All' && job.company !== companyFilter) return false;

    // Location filter
    if (
      locationFilter !== 'All' &&
      !job.location.toLowerCase().includes(locationFilter.toLowerCase())
    ) {
      return false;
    }

    // Work Mode
    if (workModeFilter !== 'All' && job.workMode !== workModeFilter) return false;

    // Search query
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      const matches =
        job.title.toLowerCase().includes(q) ||
        job.company.toLowerCase().includes(q) ||
        job.location.toLowerCase().includes(q) ||
        job.skills.some((s) => s.toLowerCase().includes(q));
      if (!matches) return false;
    }

    return true;
  });

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      showSuccessToast(`Application submitted to ${applyingJob?.company}!`);
      setApplyingJob(null);
    }, 1800);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-semibold mb-1">
            <Briefcase size={13} />
            <span>Opportunities Hub</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-100 tracking-tight">
            Jobs & Internships
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Curated industry openings across high-growth Tech companies, Healthcare organizations, and paid summer internships.
          </p>
        </div>

        {/* Tab Switcher: Private Jobs vs Internships vs Saved */}
        <div className="flex p-1 rounded-2xl bg-slate-900 border border-slate-800">
          <button
            onClick={() => setActiveTab('private')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'private'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Building2 size={14} />
            <span>Private Jobs</span>
          </button>
          <button
            onClick={() => setActiveTab('internship')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'internship'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <GraduationCap size={14} />
            <span>Internships</span>
          </button>
          <button
            onClick={() => setActiveTab('saved')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'saved'
                ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <BookmarkCheck size={14} />
            <span>Saved ({user?.savedJobIds.length || 0})</span>
          </button>
        </div>
      </div>

      {/* Filter Toolbar: Search, Company, Location, Work Mode */}
      <div className="p-4 rounded-2xl glass-card border border-slate-800/90 flex flex-wrap items-center gap-3">
        {/* Search */}
        <div className="relative flex-1 min-w-[220px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by role, company, or skill..."
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl glass-input text-slate-100 placeholder:text-slate-500"
          />
        </div>

        {/* Company Filter */}
        <div className="flex items-center gap-1.5">
          <span className="text-[11px] text-slate-400 font-semibold hidden md:inline">Company:</span>
          <select
            value={companyFilter}
            onChange={(e) => setCompanyFilter(e.target.value)}
            className="px-3 py-2 rounded-xl glass-input text-xs font-semibold text-slate-100 bg-slate-900 border-slate-700"
          >
            {companies.map((c, i) => (
              <option key={i} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Location Filter */}
        <div className="flex items-center gap-1.5">
          <span className="text-[11px] text-slate-400 font-semibold hidden md:inline">Location:</span>
          <select
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="px-3 py-2 rounded-xl glass-input text-xs font-semibold text-slate-100 bg-slate-900 border-slate-700"
          >
            {locations.map((loc, i) => (
              <option key={i} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        {/* Work Mode */}
        <div className="flex items-center gap-1.5">
          <select
            value={workModeFilter}
            onChange={(e) => setWorkModeFilter(e.target.value)}
            className="px-3 py-2 rounded-xl glass-input text-xs font-semibold text-slate-100 bg-slate-900 border-slate-700"
          >
            <option value="All">All Work Modes</option>
            <option value="Remote">Remote</option>
            <option value="Hybrid">Hybrid</option>
            <option value="On-site">On-site</option>
          </select>
        </div>

        {(searchTerm || companyFilter !== 'All' || locationFilter !== 'All' || workModeFilter !== 'All') && (
          <button
            onClick={() => {
              setSearchTerm('');
              setCompanyFilter('All');
              setLocationFilter('All');
              setWorkModeFilter('All');
            }}
            className="text-xs text-purple-400 hover:text-purple-300 font-semibold px-2 py-1"
          >
            Reset
          </button>
        )}
      </div>

      {/* Job Cards Grid */}
      <div className="space-y-4">
        {filteredJobs.length === 0 ? (
          <div className="p-12 text-center rounded-3xl glass-panel border border-slate-800 space-y-3">
            <Briefcase size={36} className="mx-auto text-slate-600" />
            <h4 className="font-bold text-sm text-slate-300">No jobs match your selected filters</h4>
            <p className="text-xs text-slate-500">
              Try adjusting your company, location, or search keyword above.
            </p>
          </div>
        ) : (
          filteredJobs.map((job) => {
            const isSaved = user?.savedJobIds.includes(job.id);
            return (
              <div
                key={job.id}
                className="p-5 sm:p-6 rounded-3xl glass-card border border-slate-800/90 hover:border-purple-500/40 transition-all duration-200 flex flex-col md:flex-row md:items-center justify-between gap-5 group"
              >
                {/* Left Info Column */}
                <div className="space-y-2.5 max-w-2xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-extrabold text-sm text-purple-300 bg-purple-950/40 px-2.5 py-0.5 rounded-lg border border-purple-500/25">
                      {job.company}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
                      <MapPin size={12} className="text-slate-500" />
                      {job.location}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                      {job.workMode}
                    </span>
                    <span className="text-[10px] text-slate-500">• Posted {job.postedDate}</span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-100 group-hover:text-purple-300 transition-colors">
                    {job.title}
                  </h3>

                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {job.description}
                  </p>

                  {/* Skills tags */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    {job.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="text-[11px] px-2.5 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-slate-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right Salary & Actions Column */}
                <div className="flex flex-col sm:flex-row md:flex-col items-start md:items-end justify-between gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-slate-800 shrink-0">
                  <div className="text-left md:text-right">
                    <span className="text-sm sm:text-base font-black text-emerald-400 block">
                      {job.salary}
                    </span>
                    <span className="text-[11px] text-slate-400 font-medium">
                      Exp: {job.experience}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    {/* Save Job Button */}
                    <button
                      onClick={() => toggleSaveJob(job.id)}
                      className={`p-2.5 rounded-xl border transition-colors ${
                        isSaved
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                          : 'bg-slate-900 hover:bg-slate-800 text-slate-400 border-slate-800'
                      }`}
                      title={isSaved ? 'Remove Bookmark' : 'Save Job'}
                    >
                      <Bookmark size={16} fill={isSaved ? 'currentColor' : 'none'} />
                    </button>

                    {/* Apply Button */}
                    <button
                      onClick={() => setApplyingJob(job)}
                      className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:opacity-90 text-white font-semibold text-xs shadow-md shadow-purple-500/20 flex items-center justify-center gap-1.5 transition-all"
                    >
                      <span>Apply Now</span>
                      <ArrowRight size={13} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Interactive Apply Modal */}
      {applyingJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-lg rounded-3xl glass-panel border border-slate-700 shadow-2xl p-6 sm:p-8">
            <button
              onClick={() => setApplyingJob(null)}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X size={18} />
            </button>

            <div className="mb-5">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 uppercase">
                Direct Application
              </span>
              <h3 className="text-lg font-bold text-slate-100 mt-1">{applyingJob.title}</h3>
              <p className="text-xs text-slate-400">
                {applyingJob.company} • {applyingJob.location} • {applyingJob.salary}
              </p>
            </div>

            {isSubmitted ? (
              <div className="p-6 text-center space-y-2">
                <CheckCircle2 size={40} className="mx-auto text-emerald-400 animate-bounce" />
                <h4 className="font-bold text-base text-slate-100">Application Transmitted!</h4>
                <p className="text-xs text-slate-400">
                  Your profile and verified credentials have been forwarded to {applyingJob.company}.
                </p>
              </div>
            ) : (
              <form onSubmit={handleApplySubmit} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Candidate Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={applyName}
                    onChange={(e) => setApplyName(e.target.value)}
                    placeholder="Alex Vance"
                    className="w-full px-3.5 py-2 text-xs rounded-xl glass-input text-slate-100"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={applyEmail}
                    onChange={(e) => setApplyEmail(e.target.value)}
                    placeholder="alex@futureforge.ai"
                    className="w-full px-3.5 py-2 text-xs rounded-xl glass-input text-slate-100"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Attached Resume / Profile
                  </label>
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs">
                    <span className="text-slate-300 font-medium">
                      ✓ FutureForge_ATS_Verified_Resume.pdf
                    </span>
                    <span className="text-[10px] text-emerald-400 font-bold uppercase">
                      ATS Ready
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Candidate Pitch / Cover Note (Optional)
                  </label>
                  <textarea
                    rows={3}
                    value={applyNote}
                    onChange={(e) => setApplyNote(e.target.value)}
                    placeholder="Briefly state why your skills make you a strong fit for this role..."
                    className="w-full p-3 text-xs rounded-xl glass-input text-slate-100 resize-none"
                  />
                </div>

                <div className="pt-2 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setApplyingJob(null)}
                    className="flex-1 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-semibold text-slate-300 border border-slate-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-semibold text-xs shadow-md shadow-purple-500/20 hover:opacity-90"
                  >
                    Submit Application
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
