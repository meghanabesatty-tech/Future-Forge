import React, { useState } from 'react';
import {
  AlertTriangle,
  ArrowRight,
  Bell,
  Bookmark,
  Calendar,
  CheckCircle2,
  Clock,
  ExternalLink,
  Flame,
  Globe,
  Info,
  Landmark,
  Plus,
  Search,
  Shield,
  Sparkles,
  Users,
  X,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { GovtExamCategory, GovtExamNotification } from '../../types';

export const GovtExamsView: React.FC = () => {
  const {
    govtExams,
    addGovtExam,
    toggleSaveExam,
    user,
    setCurrentView,
    setSelectedRoadmapId,
    showSuccessToast,
  } = useApp();

  const [activeCategory, setActiveCategory] = useState<GovtExamCategory | 'All'>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [activeExamDetail, setActiveExamDetail] = useState<GovtExamNotification | null>(null);

  // New Notification Form state
  const [newExamName, setNewExamName] = useState('');
  const [newCategory, setNewCategory] = useState<GovtExamCategory>('SSC');
  const [newOrganization, setNewOrganization] = useState('');
  const [newVacancies, setNewVacancies] = useState('5000');
  const [newStartDate, setNewStartDate] = useState('2026-10-15');
  const [newLastDate, setNewLastDate] = useState('2026-11-20');
  const [newExamDate, setNewExamDate] = useState('2027-01-15');
  const [newEligibility, setNewEligibility] = useState("Bachelor's Degree in any discipline");
  const [newAgeLimit, setNewAgeLimit] = useState('18 to 30 Years');
  const [newWebsite, setNewWebsite] = useState('https://ssc.gov.in');
  const [newSyllabus, setNewSyllabus] = useState('Reasoning, Quantitative Aptitude, English Comprehension & General Awareness');

  const categories: (GovtExamCategory | 'All')[] = [
    'All',
    'UPSC',
    'SSC',
    'Banking',
    'Railways',
    'APPSC',
    'TSPSC',
    'Police',
    'Defence',
  ];

  const filteredExams = govtExams.filter((exam) => {
    if (activeCategory !== 'All' && exam.category !== activeCategory) return false;
    if (statusFilter !== 'All' && exam.status !== statusFilter) return false;

    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      const matches =
        exam.examName.toLowerCase().includes(q) ||
        exam.organization.toLowerCase().includes(q) ||
        exam.category.toLowerCase().includes(q) ||
        exam.postNames.some((p) => p.toLowerCase().includes(q));
      if (!matches) return false;
    }

    return true;
  });

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addGovtExam({
      examName: newExamName,
      category: newCategory,
      organization: newOrganization,
      postNames: ['General Cadre Posts'],
      vacancies: parseInt(newVacancies, 10) || 1000,
      startDate: newStartDate,
      lastDate: newLastDate,
      examDate: newExamDate,
      eligibility: newEligibility,
      ageLimit: newAgeLimit,
      officialWebsite: newWebsite,
      syllabusOverview: newSyllabus,
      status: 'Open',
      isHot: true,
    });
    setIsAddModalOpen(false);
    // Reset form
    setNewExamName('');
    setNewOrganization('');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold mb-1">
            <Landmark size={13} />
            <span>Public Sector Career Alerts</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-100 tracking-tight">
            Government Exam Notifications
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Real-time verified recruitment notifications across central & state commissions with deadlines, eligibility, and official application portals.
          </p>
        </div>

        {/* Action: Add Notification (Admin or Aspirant) */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 via-orange-600 to-purple-600 hover:opacity-90 text-white font-semibold text-xs shadow-lg shadow-amber-500/20 flex items-center gap-1.5 transition-all"
          >
            <Plus size={15} />
            <span>Add Notification Manually</span>
          </button>
        </div>
      </div>

      {/* Category Pills (UPSC, SSC, Banking, Railways, APPSC, TSPSC, Police, Defence) */}
      <div className="flex gap-2 overflow-x-auto pb-2 border-b border-slate-800">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeCategory === cat
                ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-md'
                : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            {cat === 'All' ? <Sparkles size={13} /> : <Landmark size={13} />}
            <span>{cat}</span>
          </button>
        ))}
      </div>

      {/* Search & Status Filters */}
      <div className="p-4 rounded-2xl glass-card border border-slate-800/90 flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[220px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search exam name, commission, or organization..."
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl glass-input text-slate-100 placeholder:text-slate-500"
          />
        </div>

        <div className="flex items-center gap-1.5">
          <span className="text-[11px] text-slate-400 font-semibold">Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-xl glass-input text-xs font-semibold text-slate-100 bg-slate-900 border-slate-700"
          >
            <option value="All">All Statuses</option>
            <option value="Open">Applications Open</option>
            <option value="Upcoming">Upcoming</option>
            <option value="Closing Soon">Closing Soon</option>
          </select>
        </div>

        {(searchTerm || statusFilter !== 'All') && (
          <button
            onClick={() => {
              setSearchTerm('');
              setStatusFilter('All');
            }}
            className="text-xs text-amber-400 hover:text-amber-300 font-semibold px-2"
          >
            Reset
          </button>
        )}
      </div>

      {/* Government Exam Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredExams.map((exam) => {
          const isSaved = user?.savedExamIds.includes(exam.id);
          return (
            <div
              key={exam.id}
              className="p-6 rounded-3xl glass-card border border-slate-800/90 hover:border-amber-500/40 transition-all flex flex-col justify-between space-y-4 group"
            >
              <div>
                {/* Top Badge Row */}
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-extrabold px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase tracking-wider">
                      {exam.category}
                    </span>
                    {exam.isHot && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 flex items-center gap-1">
                        <Flame size={11} />
                        <span>Hot Notification</span>
                      </span>
                    )}
                  </div>

                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                      exam.status === 'Open'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : exam.status === 'Closing Soon'
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30 animate-pulse'
                        : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                    }`}
                  >
                    {exam.status}
                  </span>
                </div>

                {/* Exam Title & Organization */}
                <h3 className="text-lg font-bold text-slate-100 group-hover:text-amber-300 transition-colors leading-snug">
                  {exam.examName}
                </h3>
                <p className="text-xs text-purple-300/90 font-medium mt-0.5 mb-3">
                  {exam.organization}
                </p>

                {/* Vacancies & Posts */}
                <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800/80 mb-3 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between text-slate-300">
                    <span className="text-slate-400">Total Vacancies:</span>
                    <strong className="text-amber-300 font-bold">
                      {exam.vacancies.toLocaleString()} Posts
                    </strong>
                  </div>
                  <div className="flex items-center justify-between text-slate-300">
                    <span className="text-slate-400">Age Eligibility:</span>
                    <span>{exam.ageLimit}</span>
                  </div>
                </div>

                {/* Key Dates Grid */}
                <div className="grid grid-cols-3 gap-2 text-center text-xs mb-3">
                  <div className="bg-slate-950/40 p-2 rounded-xl border border-slate-800/60">
                    <span className="text-[10px] text-slate-500 block">Start Date</span>
                    <span className="text-[11px] font-semibold text-slate-300">
                      {exam.startDate}
                    </span>
                  </div>
                  <div className="bg-rose-950/30 p-2 rounded-xl border border-rose-500/20">
                    <span className="text-[10px] text-rose-300 block">Last Date</span>
                    <span className="text-[11px] font-bold text-rose-200">
                      {exam.lastDate}
                    </span>
                  </div>
                  <div className="bg-blue-950/30 p-2 rounded-xl border border-blue-500/20">
                    <span className="text-[10px] text-blue-300 block">Exam Date</span>
                    <span className="text-[11px] font-bold text-blue-200">
                      {exam.examDate.split('(')[0]}
                    </span>
                  </div>
                </div>

                {/* Eligibility Brief */}
                <div className="text-xs text-slate-400 line-clamp-2">
                  <strong className="text-slate-300">Eligibility:</strong> {exam.eligibility}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center gap-2">
                {/* Save Exam to reminders */}
                <button
                  onClick={() => toggleSaveExam(exam.id)}
                  className={`p-2.5 rounded-xl border transition-colors ${
                    isSaved
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                      : 'bg-slate-900 hover:bg-slate-800 text-slate-400 border-slate-800'
                  }`}
                  title={isSaved ? 'Remove from Tracker' : 'Bookmark Exam Reminder'}
                >
                  <Bookmark size={15} fill={isSaved ? 'currentColor' : 'none'} />
                </button>

                <button
                  onClick={() => setActiveExamDetail(exam)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-200 transition-colors"
                >
                  Syllabus Details
                </button>

                {/* Official Website Portal */}
                <a
                  href={exam.officialWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 via-orange-600 to-purple-600 hover:opacity-90 text-white font-semibold text-xs shadow-md shadow-amber-500/20 flex items-center justify-center gap-1.5 transition-all"
                >
                  <Globe size={14} />
                  <span>Official Portal</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal: Full Syllabus & Detail Breakdown */}
      {activeExamDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-xl rounded-3xl glass-panel border border-slate-700 shadow-2xl p-6 sm:p-8 space-y-4">
            <button
              onClick={() => setActiveExamDetail(null)}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X size={18} />
            </button>

            <div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 uppercase">
                {activeExamDetail.category} Commission
              </span>
              <h3 className="text-xl font-bold text-slate-100 mt-1">
                {activeExamDetail.examName}
              </h3>
              <p className="text-xs text-slate-400">{activeExamDetail.organization}</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2 text-xs">
              <h4 className="font-bold text-slate-200">Syllabus & Exam Pattern Overview:</h4>
              <p className="text-slate-300 leading-relaxed">
                {activeExamDetail.syllabusOverview}
              </p>
            </div>

            <div className="space-y-1.5 text-xs text-slate-300">
              <div>
                <strong className="text-slate-400">Post Profiles:</strong>{' '}
                {activeExamDetail.postNames.join(', ')}
              </div>
              <div>
                <strong className="text-slate-400">Eligibility Criteria:</strong>{' '}
                {activeExamDetail.eligibility}
              </div>
              <div>
                <strong className="text-slate-400">Age Restrictions:</strong>{' '}
                {activeExamDetail.ageLimit}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex gap-2">
              <button
                onClick={() => {
                  setCurrentView('skill-gap');
                  setActiveExamDetail(null);
                }}
                className="flex-1 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-semibold text-slate-200 border border-slate-700"
              >
                Subject Readiness Test
              </button>
              <a
                href={activeExamDetail.officialWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-purple-600 text-xs font-semibold text-white flex items-center justify-center gap-1.5 shadow-md"
              >
                <span>Visit Official Website</span>
                <ExternalLink size={13} />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Admin / Manual Add Notification Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-lg rounded-3xl glass-panel border border-slate-700 shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X size={18} />
            </button>

            <div className="mb-4">
              <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                <Shield size={18} className="text-amber-400" />
                <span>Add Government Exam Notification</span>
              </h3>
              <p className="text-xs text-slate-400">
                Post new recruitment notices with dates, eligibility, and verified official URLs.
              </p>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Exam Notification Name
                </label>
                <input
                  type="text"
                  required
                  value={newExamName}
                  onChange={(e) => setNewExamName(e.target.value)}
                  placeholder="e.g. IBPS Specialist Officer (SO) CRP-XV"
                  className="w-full px-3.5 py-2 text-xs rounded-xl glass-input text-slate-100"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Category Commission
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as GovtExamCategory)}
                    className="w-full px-3 py-2 text-xs rounded-xl glass-input text-slate-100 bg-slate-900 border-slate-700"
                  >
                    <option value="UPSC">UPSC</option>
                    <option value="SSC">SSC</option>
                    <option value="Banking">Banking</option>
                    <option value="Railways">Railways</option>
                    <option value="APPSC">APPSC</option>
                    <option value="TSPSC">TSPSC</option>
                    <option value="Police">Police</option>
                    <option value="Defence">Defence</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Total Vacancies
                  </label>
                  <input
                    type="number"
                    required
                    value={newVacancies}
                    onChange={(e) => setNewVacancies(e.target.value)}
                    placeholder="3500"
                    className="w-full px-3.5 py-2 text-xs rounded-xl glass-input text-slate-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Organization / Board Name
                </label>
                <input
                  type="text"
                  required
                  value={newOrganization}
                  onChange={(e) => setNewOrganization(e.target.value)}
                  placeholder="e.g. Institute of Banking Personnel Selection"
                  className="w-full px-3.5 py-2 text-xs rounded-xl glass-input text-slate-100"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    required
                    value={newStartDate}
                    onChange={(e) => setNewStartDate(e.target.value)}
                    className="w-full px-2 py-1.5 text-xs rounded-xl glass-input text-slate-100 bg-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                    Last Date
                  </label>
                  <input
                    type="date"
                    required
                    value={newLastDate}
                    onChange={(e) => setNewLastDate(e.target.value)}
                    className="w-full px-2 py-1.5 text-xs rounded-xl glass-input text-slate-100 bg-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                    Exam Date
                  </label>
                  <input
                    type="date"
                    required
                    value={newExamDate}
                    onChange={(e) => setNewExamDate(e.target.value)}
                    className="w-full px-2 py-1.5 text-xs rounded-xl glass-input text-slate-100 bg-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Eligibility Criteria
                </label>
                <input
                  type="text"
                  required
                  value={newEligibility}
                  onChange={(e) => setNewEligibility(e.target.value)}
                  placeholder="Graduation degree with 55% marks"
                  className="w-full px-3.5 py-2 text-xs rounded-xl glass-input text-slate-100"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Official Portal URL
                </label>
                <input
                  type="url"
                  required
                  value={newWebsite}
                  onChange={(e) => setNewWebsite(e.target.value)}
                  placeholder="https://official-portal.gov.in"
                  className="w-full px-3.5 py-2 text-xs rounded-xl glass-input text-slate-100"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Syllabus Overview
                </label>
                <textarea
                  rows={2}
                  value={newSyllabus}
                  onChange={(e) => setNewSyllabus(e.target.value)}
                  placeholder="Summary of exam tiers, papers, and key syllabus topics..."
                  className="w-full p-2.5 text-xs rounded-xl glass-input text-slate-100 resize-none"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-semibold text-slate-300 border border-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-purple-600 text-white font-semibold text-xs shadow-md shadow-amber-500/20 hover:opacity-90"
                >
                  Publish Notification
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
