import React, { useState } from 'react';
import {
  Activity,
  ArrowRight,
  BarChart3,
  BookOpen,
  Briefcase,
  CheckCircle2,
  ChevronRight,
  Cloud,
  Compass,
  Cpu,
  ExternalLink,
  Globe,
  Layers,
  Map,
  Palette,
  Search,
  ShieldAlert,
  Sparkles,
  TrendingUp,
  X,
} from 'lucide-react';
import { CAREER_DOMAINS } from '../../data/initialData';
import { useApp } from '../../context/AppContext';
import { CareerDomain, CareerDomainId } from '../../types';

export const CareerDomainsView: React.FC = () => {
  const { setCurrentView, setSelectedDomainId, setSelectedRoadmapId } = useApp();
  const [selectedFilter, setSelectedFilter] = useState<'All' | 'Tech' | 'Design' | 'Healthcare'>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeModalDomain, setActiveModalDomain] = useState<CareerDomain | null>(null);

  const getDomainIcon = (iconName: string) => {
    switch (iconName) {
      case 'BarChart3':
        return <BarChart3 size={24} />;
      case 'Cpu':
        return <Cpu size={24} />;
      case 'Globe':
        return <Globe size={24} />;
      case 'ShieldAlert':
        return <ShieldAlert size={24} />;
      case 'Cloud':
        return <Cloud size={24} />;
      case 'Palette':
        return <Palette size={24} />;
      case 'Activity':
        return <Activity size={24} />;
      default:
        return <Compass size={24} />;
    }
  };

  const filteredDomains = CAREER_DOMAINS.filter((domain) => {
    const matchesFilter = selectedFilter === 'All' || domain.category === selectedFilter;
    const matchesSearch =
      domain.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      domain.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      domain.skillsRequired.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  const handleOpenRoadmap = (domain: CareerDomain) => {
    setSelectedDomainId(domain.id);
    setSelectedRoadmapId(domain.roadmapId);
    setCurrentView('roadmaps');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-semibold mb-1">
            <Compass size={13} />
            <span>High-Impact Career Architecture</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-100 tracking-tight">
            Career Domains
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Explore industry-benchmarked career trajectories with live salary metrics, required skillsets, and curated curriculum.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Filter domains or skills..."
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl glass-input text-slate-100 placeholder:text-slate-500"
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 border-b border-slate-800 pb-2 overflow-x-auto">
        {(['All', 'Tech', 'Design', 'Healthcare'] as const).map((filter) => (
          <button
            key={filter}
            onClick={() => setSelectedFilter(filter)}
            className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
              selectedFilter === filter
                ? 'bg-purple-600 text-white shadow-md shadow-purple-500/20'
                : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Career Domain Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDomains.map((domain) => (
          <div
            key={domain.id}
            className="glass-card rounded-3xl p-6 border border-slate-800/90 flex flex-col justify-between hover:border-purple-500/40 group transition-all duration-300"
          >
            <div>
              {/* Card Header */}
              <div className="flex items-start justify-between gap-3 mb-4">
                <div
                  className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${domain.gradient} flex items-center justify-center text-white shadow-lg`}
                >
                  {getDomainIcon(domain.iconName)}
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-800/80 text-purple-300 border border-purple-500/20">
                    {domain.category}
                  </span>
                  <span className="block text-[11px] text-emerald-400 font-semibold mt-1">
                    {domain.jobGrowth}
                  </span>
                </div>
              </div>

              {/* Title & Description */}
              <h3 className="text-lg font-bold text-slate-100 group-hover:text-purple-300 transition-colors">
                {domain.name}
              </h3>
              <p className="text-xs text-purple-300/80 font-medium mt-0.5 mb-2">
                {domain.tagline}
              </p>
              <p className="text-xs text-slate-400 leading-relaxed line-clamp-3 mb-4">
                {domain.description}
              </p>

              {/* Skills Required */}
              <div className="space-y-1.5 mb-4">
                <span className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider">
                  Skills Required
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {domain.skillsRequired.slice(0, 5).map((skill, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-900/90 text-slate-300 border border-slate-800"
                    >
                      {skill}
                    </span>
                  ))}
                  {domain.skillsRequired.length > 5 && (
                    <span className="text-[11px] px-2 py-1 rounded-lg bg-slate-900/50 text-slate-400">
                      +{domain.skillsRequired.length - 5} more
                    </span>
                  )}
                </div>
              </div>

              {/* Salary Range */}
              <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800/80 mb-4">
                <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                  <span>Salary Range</span>
                  <span className="text-purple-400">{domain.openingsEstimate}</span>
                </div>
                <div className="grid grid-cols-3 gap-1 text-center">
                  <div className="bg-slate-950/40 p-1.5 rounded-lg border border-slate-800/40">
                    <span className="text-[10px] text-slate-500 block">Entry</span>
                    <span className="text-[11px] font-bold text-slate-200">
                      {domain.salaryRange.entry.split('/')[0]}
                    </span>
                  </div>
                  <div className="bg-purple-950/30 p-1.5 rounded-lg border border-purple-500/20">
                    <span className="text-[10px] text-purple-300 block">Mid-Level</span>
                    <span className="text-[11px] font-bold text-purple-200">
                      {domain.salaryRange.mid.split('/')[0]}
                    </span>
                  </div>
                  <div className="bg-slate-950/40 p-1.5 rounded-lg border border-slate-800/40">
                    <span className="text-[10px] text-slate-500 block">Senior</span>
                    <span className="text-[11px] font-bold text-slate-200">
                      {domain.salaryRange.senior.split('/')[0]}
                    </span>
                  </div>
                </div>
              </div>

              {/* Learning Resources Preview */}
              <div className="space-y-1.5 mb-5">
                <span className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider flex items-center justify-between">
                  <span>Top Learning Resources</span>
                  <span className="text-[10px] text-slate-500">Curated</span>
                </span>
                <div className="space-y-1">
                  {domain.learningResources.slice(0, 2).map((res, i) => (
                    <a
                      key={i}
                      href={res.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-2 rounded-xl bg-slate-900/40 hover:bg-slate-800/60 border border-slate-800/60 text-xs text-slate-300 hover:text-white transition-colors group/link"
                    >
                      <span className="truncate max-w-[200px]">{res.title}</span>
                      <ExternalLink size={12} className="text-slate-500 group-hover/link:text-purple-400 shrink-0" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions: Roadmap & Details */}
            <div className="flex gap-2 pt-3 border-t border-slate-800/80">
              <button
                onClick={() => setActiveModalDomain(domain)}
                className="flex-1 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-200 transition-colors"
              >
                View Syllabus
              </button>
              <button
                onClick={() => handleOpenRoadmap(domain)}
                className="flex-1 py-2 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:opacity-90 text-xs font-semibold text-white shadow-md shadow-purple-500/20 flex items-center justify-center gap-1.5 transition-all"
              >
                <Map size={14} />
                <span>Roadmap</span>
                <ArrowRight size={13} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal: Full Domain Detailed View */}
      {activeModalDomain && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-2xl rounded-3xl glass-panel border border-slate-700 shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setActiveModalDomain(null)}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X size={18} />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div
                className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${activeModalDomain.gradient} flex items-center justify-center text-white`}
              >
                {getDomainIcon(activeModalDomain.iconName)}
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-100">{activeModalDomain.name}</h2>
                <span className="text-xs text-purple-400 font-medium">
                  {activeModalDomain.category} • {activeModalDomain.openingsEstimate}
                </span>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed mb-6">
              {activeModalDomain.description}
            </p>

            <div className="space-y-4 mb-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Complete Core Skills Stack
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {activeModalDomain.skillsRequired.map((skill, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-medium text-slate-200 flex items-center gap-2"
                  >
                    <CheckCircle2 size={14} className="text-purple-400 shrink-0" />
                    <span className="truncate">{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                All Recommended Learning Materials
              </h4>
              <div className="space-y-2">
                {activeModalDomain.learningResources.map((res, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between"
                  >
                    <div>
                      <div className="font-semibold text-xs text-slate-200">{res.title}</div>
                      <div className="text-[11px] text-slate-400">
                        {res.provider} • <span className="text-purple-300">{res.type}</span>
                      </div>
                    </div>
                    <a
                      href={res.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-purple-600/30 hover:bg-purple-600/50 text-purple-300 text-xs font-semibold flex items-center gap-1"
                    >
                      <span>Open Link</span>
                      <ExternalLink size={12} />
                    </a>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t border-slate-800">
              <button
                onClick={() => {
                  setSelectedDomainId(activeModalDomain.id);
                  setCurrentView('skill-gap');
                  setActiveModalDomain(null);
                }}
                className="flex-1 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-200"
              >
                Analyze My Skill Gap
              </button>
              <button
                onClick={() => {
                  handleOpenRoadmap(activeModalDomain);
                  setActiveModalDomain(null);
                }}
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-xs font-semibold text-white shadow-lg flex items-center justify-center gap-1.5"
              >
                <Map size={15} />
                <span>Launch Interactive Roadmap</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
