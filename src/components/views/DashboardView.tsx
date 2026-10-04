import React from 'react';
import {
  Activity,
  ArrowRight,
  Award,
  BarChart3,
  Bot,
  BrainCircuit,
  Briefcase,
  CheckCircle2,
  ChevronRight,
  Compass,
  FileText,
  Flame,
  Globe,
  Landmark,
  Layers,
  Map,
  Sparkles,
  Target,
  TrendingUp,
  Zap,
} from 'lucide-react';
import { CAREER_DOMAINS } from '../../data/initialData';
import { useApp } from '../../context/AppContext';
import { CareerDomainId, ViewMode } from '../../types';

export const DashboardView: React.FC = () => {
  const {
    user,
    setCurrentView,
    setSelectedDomainId,
    jobs,
    govtExams,
    interviewEvaluations,
    roadmaps,
  } = useApp();

  // Calculate metrics
  const avgInterviewScore =
    interviewEvaluations.length > 0
      ? Math.round(
          interviewEvaluations.reduce((acc, curr) => acc + curr.score, 0) /
            interviewEvaluations.length
        )
      : 84;

  const completedTopicsCount = user?.completedMilestoneTopics.length || 0;
  const targetDomain =
    CAREER_DOMAINS.find((d) => d.id === user?.targetDomain) || CAREER_DOMAINS[2];

  const quickActions: {
    title: string;
    description: string;
    icon: React.ElementType;
    view: ViewMode;
    color: string;
    badge: string;
  }[] = [
    {
      title: 'AI Mock Interview',
      description: 'Practice Technical & HR questions with real-time AI scoring & feedback.',
      icon: Bot,
      view: 'mock-interview',
      color: 'from-blue-600 to-indigo-600',
      badge: 'Live AI',
    },
    {
      title: 'Skill Gap Analysis',
      description: 'Compare skills against modern Tech and Government Exam syllabi.',
      icon: Target,
      view: 'skill-gap',
      color: 'from-purple-600 to-pink-600',
      badge: 'Weighted',
    },
    {
      title: 'Resume ATS Analyzer',
      description: 'Upload resume PDF or text to get ATS compatibility & keyword fixes.',
      icon: FileText,
      view: 'resume-analyzer',
      color: 'from-emerald-600 to-teal-600',
      badge: 'Instant',
    },
    {
      title: 'Govt Exam Alerts',
      description: 'Track UPSC, SSC, Banking, Railways, APPSC & TSPSC live notifications.',
      icon: Landmark,
      view: 'govt-exams',
      color: 'from-amber-600 to-orange-600',
      badge: 'Verified',
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* 1. Welcome Card Hero */}
      <div className="relative overflow-hidden rounded-3xl p-6 sm:p-8 glass-panel border border-slate-700/80 shadow-2xl">
        {/* Glow Effects */}
        <div className="ambient-glow top-0 right-1/4 w-80 h-80 bg-purple-600/25" />
        <div className="ambient-glow bottom-0 left-10 w-72 h-72 bg-blue-600/20" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 border border-purple-200 text-purple-700 text-xs font-semibold">
              <Sparkles size={14} className="text-purple-600" />
              <span>Future Forge • AI Career Companion Active</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Welcome back, <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">{user?.name || 'Explorer'}</span>! 👋
            </h1>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Your personalized AI copilot has analyzed your trajectory for{' '}
              <span className="text-purple-700 font-semibold">{targetDomain.name}</span>.
              You are currently <span className="text-emerald-600 font-bold">78% ready</span> for market-tier opportunities.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => setCurrentView('mock-interview')}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:opacity-95 text-white text-sm font-semibold shadow-lg shadow-purple-500/25 flex items-center gap-2 transition-all"
              >
                <Bot size={16} />
                <span>Start AI Mock Interview</span>
                <ArrowRight size={15} />
              </button>

              <button
                onClick={() => setCurrentView('skill-gap')}
                className="px-5 py-2.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 text-sm font-semibold flex items-center gap-2 shadow-xs transition-all"
              >
                <Target size={16} className="text-purple-600" />
                <span>Analyze Skill Gap</span>
              </button>
            </div>
          </div>

          {/* Quick Metrics Badge Column */}
          <div className="grid grid-cols-2 gap-3 min-w-[280px]">
            <div className="p-4 rounded-2xl glass-card border border-slate-800/80">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                <span>Avg Interview Score</span>
                <BrainCircuit size={15} className="text-purple-400" />
              </div>
              <div className="text-2xl font-black text-slate-100">{avgInterviewScore}%</div>
              <span className="text-[11px] text-emerald-400 font-medium">+8% from last week</span>
            </div>

            <div className="p-4 rounded-2xl glass-card border border-slate-800/80">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                <span>Roadmap Topics</span>
                <CheckCircle2 size={15} className="text-blue-400" />
              </div>
              <div className="text-2xl font-black text-slate-100">{completedTopicsCount} / 24</div>
              <span className="text-[11px] text-blue-400 font-medium">Phase 1 & 2 ongoing</span>
            </div>

            <div className="p-4 rounded-2xl glass-card border border-slate-800/80">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                <span>Active Jobs</span>
                <Briefcase size={15} className="text-emerald-400" />
              </div>
              <div className="text-2xl font-black text-slate-100">{jobs.length} Listed</div>
              <span className="text-[11px] text-slate-400">Private & Internships</span>
            </div>

            <div className="p-4 rounded-2xl glass-card border border-slate-800/80">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                <span>Govt Exam Alerts</span>
                <Landmark size={15} className="text-amber-400" />
              </div>
              <div className="text-2xl font-black text-slate-100">{govtExams.length} Active</div>
              <span className="text-[11px] text-amber-400 font-medium">UPSC, SSC, Banks</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Quick Action Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-100">Quick Accelerators</h2>
            <p className="text-xs text-slate-400">AI-driven modules designed to fast-track your preparation</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, idx) => {
            const Icon = action.icon;
            return (
              <div
                key={idx}
                onClick={() => setCurrentView(action.view)}
                className="glass-card p-5 rounded-2xl border border-slate-800/90 cursor-pointer group hover:-translate-y-1 transition-all duration-200"
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${action.color} flex items-center justify-center text-white shadow-lg`}
                  >
                    <Icon size={22} />
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700 uppercase">
                    {action.badge}
                  </span>
                </div>
                <h3 className="font-bold text-sm text-slate-100 group-hover:text-purple-300 transition-colors flex items-center gap-1.5">
                  {action.title}
                  <ChevronRight size={15} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">{action.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Middle Section: Career Domains Spotlight & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Career Domains Grid */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-100">Featured Career Pathways</h2>
              <p className="text-xs text-slate-400">High-growth domains with salary metrics & resource guides</p>
            </div>
            <button
              onClick={() => setCurrentView('domains')}
              className="text-xs text-purple-400 hover:text-purple-300 font-semibold flex items-center gap-1"
            >
              <span>Explore All (7)</span>
              <ArrowRight size={14} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {CAREER_DOMAINS.slice(0, 4).map((domain) => (
              <div
                key={domain.id}
                onClick={() => {
                  setSelectedDomainId(domain.id);
                  setCurrentView('domains');
                }}
                className="p-4 rounded-2xl glass-card border border-slate-800/80 cursor-pointer group hover:border-purple-500/40"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="font-bold text-sm text-slate-100 group-hover:text-purple-300 transition-colors">
                    {domain.name}
                  </div>
                  <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    {domain.salaryRange.mid}
                  </span>
                </div>
                <p className="text-xs text-slate-400 line-clamp-2 mb-3">{domain.description}</p>
                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-800/60">
                  <span>{domain.openingsEstimate}</span>
                  <span className="text-purple-400 group-hover:underline flex items-center gap-0.5">
                    View Pathway &rarr;
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Career Roadmaps & Exams Spotlight Banner */}
          <div
            onClick={() => setCurrentView('roadmaps')}
            className="p-4 rounded-2xl glass-panel border border-blue-500/30 bg-gradient-to-r from-blue-950/30 via-slate-900/60 to-purple-950/20 cursor-pointer hover:border-blue-500/50 transition-all flex items-center justify-between"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-300 shrink-0">
                <Map size={20} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-sm text-slate-100">Interactive Career & Exam Roadmaps</h4>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300">
                    Comprehensive
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  Step-by-step milestone progression for tech disciplines and major government competitive examinations.
                </p>
              </div>
            </div>
            <ChevronRight size={18} className="text-slate-400 shrink-0 ml-2" />
          </div>
        </div>

        {/* Right 1 Col: Recent Activity & Government Notifications */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-100">Urgent Govt Alerts</h2>
            <button
              onClick={() => setCurrentView('govt-exams')}
              className="text-xs text-amber-400 hover:text-amber-300 font-semibold"
            >
              View All
            </button>
          </div>

          <div className="space-y-3">
            {govtExams.slice(0, 3).map((exam) => (
              <div
                key={exam.id}
                onClick={() => setCurrentView('govt-exams')}
                className="p-3.5 rounded-2xl glass-card border border-slate-800/80 cursor-pointer hover:border-amber-500/40 transition-all"
              >
                <div className="flex items-start justify-between gap-2 mb-1">
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    {exam.category}
                  </span>
                  <span className="text-[10px] text-slate-400">
                    Deadline: {exam.lastDate}
                  </span>
                </div>
                <h4 className="font-semibold text-xs text-slate-200 line-clamp-1">{exam.examName}</h4>
                <p className="text-[11px] text-slate-400 mt-1">
                  {exam.vacancies.toLocaleString()} Vacancies • {exam.organization}
                </p>
              </div>
            ))}
          </div>

          {/* Quick Mock Interview Past Result Snapshot */}
          {interviewEvaluations.length > 0 && (
            <div className="p-4 rounded-2xl glass-panel border border-purple-500/30 bg-purple-950/15">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-purple-300">Latest AI Interview</span>
                <span className="text-xs font-extrabold text-emerald-400">
                  {interviewEvaluations[0].score}/100
                </span>
              </div>
              <p className="text-xs text-slate-300 line-clamp-2">
                "{interviewEvaluations[0].summary}"
              </p>
              <button
                onClick={() => setCurrentView('mock-interview')}
                className="mt-3 text-xs text-purple-400 hover:text-purple-300 font-semibold flex items-center gap-1"
              >
                <span>Take Another Interview</span>
                <ArrowRight size={13} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
