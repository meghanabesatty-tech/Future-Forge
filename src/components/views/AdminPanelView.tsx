import React, { useState } from 'react';
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  BarChart3,
  Briefcase,
  Building2,
  CheckCircle2,
  Clock,
  Edit2,
  GraduationCap,
  Landmark,
  Layers,
  Plus,
  Search,
  Shield,
  ShieldCheck,
  Trash2,
  TrendingUp,
  UserCheck,
  Users,
  X,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { GovtExamCategory, GovtExamNotification, JobCategory, JobListing } from '../../types';

export const AdminPanelView: React.FC = () => {
  const {
    jobs,
    addJob,
    updateJob,
    deleteJob,
    govtExams,
    addGovtExam,
    updateGovtExam,
    deleteGovtExam,
    showSuccessToast,
    switchRole,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'analytics' | 'jobs' | 'exams' | 'users'>('analytics');

  // Job Modal
  const [jobModalOpen, setJobModalOpen] = useState(false);
  const [editingJobId, setEditingJobId] = useState<string | null>(null);
  const [jobTitle, setJobTitle] = useState('');
  const [jobCompany, setJobCompany] = useState('');
  const [jobCategory, setJobCategory] = useState<JobCategory>('private');
  const [jobLocation, setJobLocation] = useState('Bangalore, India');
  const [jobSalary, setJobSalary] = useState('₹18 - 30 LPA');
  const [jobExperience, setJobExperience] = useState('2-4 Years');
  const [jobSkills, setJobSkills] = useState('React, TypeScript, Node.js');
  const [jobDescription, setJobDescription] = useState('Develop scalable cloud user interfaces.');

  // Exam Modal
  const [examModalOpen, setExamModalOpen] = useState(false);
  const [editingExamId, setEditingExamId] = useState<string | null>(null);
  const [examName, setExamName] = useState('');
  const [examCategory, setExamCategory] = useState<GovtExamCategory>('SSC');
  const [examOrg, setExamOrg] = useState('');
  const [examVacancies, setExamVacancies] = useState('4500');
  const [examStartDate, setExamStartDate] = useState('2026-10-15');
  const [examLastDate, setExamLastDate] = useState('2026-11-20');
  const [examDate, setExamDate] = useState('2027-01-10');
  const [examEligibility, setExamEligibility] = useState("Bachelor's Degree in any discipline");
  const [examWebsite, setExamWebsite] = useState('https://official-portal.gov.in');

  // Users Mock Data
  const [mockUsers, setMockUsers] = useState([
    { id: 'u_1', name: 'Alex Vance', email: 'alex.vance@futureforge.ai', role: 'student', domain: 'Web Development', active: true },
    { id: 'u_2', name: 'Pooja Sharma', email: 'pooja.sharma@govtaspirant.in', role: 'aspirant', domain: 'Government Exams', active: true },
    { id: 'u_3', name: 'David Miller', email: 'david.miller@cloudarchitecture.io', role: 'student', domain: 'Cloud Computing', active: true },
    { id: 'u_4', name: 'Elena Rostova', email: 'elena.rostova@ailabs.org', role: 'student', domain: 'AI & ML', active: true },
    { id: 'u_5', name: 'Karthik Raja', email: 'karthik.raja@cybersecurity.in', role: 'student', domain: 'Cyber Security', active: false },
  ]);

  // Handle Save Job
  const handleSaveJob = (e: React.FormEvent) => {
    e.preventDefault();
    const skillsArr = jobSkills.split(',').map((s) => s.trim()).filter(Boolean);

    if (editingJobId) {
      updateJob(editingJobId, {
        title: jobTitle,
        company: jobCompany,
        category: jobCategory,
        location: jobLocation,
        salary: jobSalary,
        experience: jobExperience,
        skills: skillsArr,
        description: jobDescription,
      });
    } else {
      addJob({
        title: jobTitle,
        company: jobCompany,
        category: jobCategory,
        type: jobCategory === 'internship' ? 'Internship' : 'Full-time',
        workMode: 'Hybrid',
        location: jobLocation,
        salary: jobSalary,
        experience: jobExperience,
        skills: skillsArr,
        description: jobDescription,
        applicationDeadline: '2026-12-31',
        applyUrl: 'https://example.com/apply',
        featured: true,
      });
    }

    setJobModalOpen(false);
    setEditingJobId(null);
  };

  const handleEditJob = (job: JobListing) => {
    setEditingJobId(job.id);
    setJobTitle(job.title);
    setJobCompany(job.company);
    setJobCategory(job.category);
    setJobLocation(job.location);
    setJobSalary(job.salary);
    setJobExperience(job.experience);
    setJobSkills(job.skills.join(', '));
    setJobDescription(job.description);
    setJobModalOpen(true);
  };

  // Handle Save Govt Exam
  const handleSaveExam = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingExamId) {
      updateGovtExam(editingExamId, {
        examName,
        category: examCategory,
        organization: examOrg,
        vacancies: parseInt(examVacancies, 10) || 1000,
        startDate: examStartDate,
        lastDate: examLastDate,
        examDate,
        eligibility: examEligibility,
        officialWebsite: examWebsite,
      });
    } else {
      addGovtExam({
        examName,
        category: examCategory,
        organization: examOrg,
        postNames: ['Cadre Officers'],
        vacancies: parseInt(examVacancies, 10) || 1000,
        startDate: examStartDate,
        lastDate: examLastDate,
        examDate,
        eligibility: examEligibility,
        ageLimit: '21 to 32 Years',
        officialWebsite: examWebsite,
        syllabusOverview: 'Standard multi-stage objective & descriptive examination pattern.',
        status: 'Open',
        isHot: true,
      });
    }

    setExamModalOpen(false);
    setEditingExamId(null);
  };

  const handleEditExam = (exam: GovtExamNotification) => {
    setEditingExamId(exam.id);
    setExamName(exam.examName);
    setExamCategory(exam.category);
    setExamOrg(exam.organization);
    setExamVacancies(exam.vacancies.toString());
    setExamStartDate(exam.startDate);
    setExamLastDate(exam.lastDate);
    setExamDate(exam.examDate);
    setExamEligibility(exam.eligibility);
    setExamWebsite(exam.officialWebsite);
    setExamModalOpen(true);
  };

  const toggleUserStatus = (userId: string) => {
    setMockUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, active: !u.active } : u))
    );
    showSuccessToast('User account status updated.');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Admin Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold mb-1">
            <ShieldCheck size={13} />
            <span>Master Administration Console</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-100 tracking-tight">
            Admin Panel & Analytics
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Manage system-wide job requisitions, government exam alerts, registered candidate accounts, and platform health telemetry.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex p-1 rounded-2xl bg-slate-900 border border-slate-800">
          {[
            { id: 'analytics', label: 'Analytics', icon: BarChart3 },
            { id: 'jobs', label: 'Manage Jobs', icon: Briefcase },
            { id: 'exams', label: 'Manage Exams', icon: Landmark },
            { id: 'users', label: 'Manage Users', icon: Users },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-amber-600 to-purple-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icon size={14} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* TOP KPI ANALYTICS ROW */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl glass-card border border-slate-800">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Total Active Candidates</span>
            <Users size={16} className="text-purple-400" />
          </div>
          <div className="text-2xl font-black text-slate-100">42,850</div>
          <span className="text-[11px] text-emerald-400 font-medium">↑ +14% this month</span>
        </div>

        <div className="p-5 rounded-3xl glass-card border border-slate-800">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Live Job Listings</span>
            <Briefcase size={16} className="text-blue-400" />
          </div>
          <div className="text-2xl font-black text-slate-100">{jobs.length} Published</div>
          <span className="text-[11px] text-slate-400">Tech & Healthcare</span>
        </div>

        <div className="p-5 rounded-3xl glass-card border border-slate-800">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Active Govt Exam Alerts</span>
            <Landmark size={16} className="text-amber-400" />
          </div>
          <div className="text-2xl font-black text-slate-100">{govtExams.length} Open</div>
          <span className="text-[11px] text-amber-400">UPSC, SSC, Banks</span>
        </div>

        <div className="p-5 rounded-3xl glass-card border border-slate-800">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>AI Interviews Completed</span>
            <Activity size={16} className="text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-slate-100">128,420</div>
          <span className="text-[11px] text-emerald-400">98.4% AI Uptime</span>
        </div>
      </div>

      {/* TAB 1: ANALYTICS & DASHBOARD METRICS */}
      {activeTab === 'analytics' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 p-6 rounded-3xl glass-panel border border-slate-800 space-y-4">
            <h3 className="font-bold text-sm text-slate-100">Domain Popularity & Engagement</h3>
            <div className="space-y-3">
              {[
                { name: 'Web Development & Full Stack', count: '14,200 candidates', pct: 82, color: 'bg-blue-500' },
                { name: 'Government Civil Services & SSC', count: '11,400 candidates', pct: 68, color: 'bg-amber-500' },
                { name: 'AI & Machine Learning', count: '9,850 candidates', pct: 58, color: 'bg-purple-500' },
                { name: 'Cloud Computing & DevOps', count: '6,200 candidates', pct: 45, color: 'bg-cyan-500' },
                { name: 'Cyber Security & Forensics', count: '4,300 candidates', pct: 32, color: 'bg-emerald-500' },
              ].map((item, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-200">{item.name}</span>
                    <span className="text-slate-400">{item.count}</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden">
                    <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-3xl glass-panel border border-slate-800 space-y-4">
            <h3 className="font-bold text-sm text-slate-100">System Status</h3>
            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 flex items-center justify-between text-emerald-300">
                <span className="font-semibold">Gemini 3.8 Flash AI Engine</span>
                <span className="font-mono text-[10px] bg-emerald-500/20 px-2 py-0.5 rounded">Operational</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between text-slate-300">
                <span>ATS Resume Parser</span>
                <span className="text-emerald-400 font-semibold">Active</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between text-slate-300">
                <span>Govt RSS Sync Feeds</span>
                <span className="text-emerald-400 font-semibold">Synced</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: MANAGE JOBS (ADD/EDIT/DELETE) */}
      {activeTab === 'jobs' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-100">Job Directory Management</h3>
            <button
              onClick={() => {
                setEditingJobId(null);
                setJobTitle('');
                setJobCompany('');
                setJobModalOpen(true);
              }}
              className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Plus size={15} />
              <span>Post New Job Opening</span>
            </button>
          </div>

          <div className="space-y-3">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="p-4 rounded-2xl glass-card border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 uppercase">
                      {job.category}
                    </span>
                    <span className="font-bold text-xs text-purple-300">{job.company}</span>
                    <span className="text-[11px] text-slate-400">• {job.location}</span>
                  </div>
                  <h4 className="font-bold text-sm text-slate-100">{job.title}</h4>
                  <span className="text-xs text-emerald-400 font-semibold">{job.salary}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEditJob(job)}
                    className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 text-xs flex items-center gap-1 transition-colors"
                  >
                    <Edit2 size={13} />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => deleteJob(job.id)}
                    className="p-2 rounded-xl bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 border border-rose-500/30 text-xs flex items-center gap-1 transition-colors"
                  >
                    <Trash2 size={13} />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: MANAGE GOVT EXAMS (ADD/EDIT/DELETE) */}
      {activeTab === 'exams' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-100">Government Exam Alerts Management</h3>
            <button
              onClick={() => {
                setEditingExamId(null);
                setExamName('');
                setExamOrg('');
                setExamModalOpen(true);
              }}
              className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Plus size={15} />
              <span>Add Notification Manually</span>
            </button>
          </div>

          <div className="space-y-3">
            {govtExams.map((exam) => (
              <div
                key={exam.id}
                className="p-4 rounded-2xl glass-card border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 uppercase">
                      {exam.category}
                    </span>
                    <span className="text-[11px] text-slate-400">Last Date: {exam.lastDate}</span>
                  </div>
                  <h4 className="font-bold text-sm text-slate-100">{exam.examName}</h4>
                  <span className="text-xs text-slate-400">
                    {exam.organization} • {exam.vacancies.toLocaleString()} Posts
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEditExam(exam)}
                    className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 text-xs flex items-center gap-1 transition-colors"
                  >
                    <Edit2 size={13} />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => deleteGovtExam(exam.id)}
                    className="p-2 rounded-xl bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 border border-rose-500/30 text-xs flex items-center gap-1 transition-colors"
                  >
                    <Trash2 size={13} />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: MANAGE USERS */}
      {activeTab === 'users' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-100">Registered Candidates & Roles</h3>
            <span className="text-xs text-slate-400">{mockUsers.length} Sample Profiles</span>
          </div>

          <div className="space-y-2">
            {mockUsers.map((u) => (
              <div
                key={u.id}
                className="p-4 rounded-2xl glass-card border border-slate-800 flex items-center justify-between gap-4 text-xs"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-100">{u.name}</span>
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-purple-500/20 text-purple-300">
                      {u.role}
                    </span>
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                        u.active ? 'text-emerald-400 bg-emerald-950/40' : 'text-rose-400 bg-rose-950/40'
                      }`}
                    >
                      {u.active ? 'Active' : 'Suspended'}
                    </span>
                  </div>
                  <div className="text-slate-400 mt-0.5">
                    {u.email} • Target: <span className="text-purple-300">{u.domain}</span>
                  </div>
                </div>

                <button
                  onClick={() => toggleUserStatus(u.id)}
                  className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 text-xs font-semibold"
                >
                  {u.active ? 'Suspend' : 'Activate'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal: Job Add/Edit */}
      {jobModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-lg rounded-3xl glass-panel border border-slate-700 shadow-2xl p-6 space-y-4">
            <button
              onClick={() => setJobModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X size={18} />
            </button>

            <h3 className="font-bold text-base text-slate-100">
              {editingJobId ? 'Edit Job Opening' : 'Post New Job Opening'}
            </h3>

            <form onSubmit={handleSaveJob} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Role Title</label>
                <input
                  type="text"
                  required
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl glass-input text-slate-100"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Company</label>
                  <input
                    type="text"
                    required
                    value={jobCompany}
                    onChange={(e) => setJobCompany(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl glass-input text-slate-100"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Category</label>
                  <select
                    value={jobCategory}
                    onChange={(e) => setJobCategory(e.target.value as JobCategory)}
                    className="w-full px-3 py-2 rounded-xl glass-input text-slate-100 bg-slate-900 border-slate-700"
                  >
                    <option value="private">Private Job</option>
                    <option value="internship">Internship</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Location</label>
                  <input
                    type="text"
                    value={jobLocation}
                    onChange={(e) => setJobLocation(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl glass-input text-slate-100"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Salary</label>
                  <input
                    type="text"
                    value={jobSalary}
                    onChange={(e) => setJobSalary(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl glass-input text-slate-100"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">
                  Required Skills (comma separated)
                </label>
                <input
                  type="text"
                  value={jobSkills}
                  onChange={(e) => setJobSkills(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl glass-input text-slate-100"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Description</label>
                <textarea
                  rows={2}
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  className="w-full p-2.5 rounded-xl glass-input text-slate-100 resize-none"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setJobModalOpen(false)}
                  className="flex-1 py-2 rounded-xl bg-slate-900 text-slate-400 border border-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold shadow-md"
                >
                  Save Job
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Exam Add/Edit */}
      {examModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-lg rounded-3xl glass-panel border border-slate-700 shadow-2xl p-6 space-y-4">
            <button
              onClick={() => setExamModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X size={18} />
            </button>

            <h3 className="font-bold text-base text-slate-100">
              {editingExamId ? 'Edit Exam Notification' : 'Add Government Notification'}
            </h3>

            <form onSubmit={handleSaveExam} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Exam Name</label>
                <input
                  type="text"
                  required
                  value={examName}
                  onChange={(e) => setExamName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl glass-input text-slate-100"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Category</label>
                  <select
                    value={examCategory}
                    onChange={(e) => setExamCategory(e.target.value as GovtExamCategory)}
                    className="w-full px-3 py-2 rounded-xl glass-input text-slate-100 bg-slate-900 border-slate-700"
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
                  <label className="block font-semibold text-slate-300 mb-1">Organization</label>
                  <input
                    type="text"
                    required
                    value={examOrg}
                    onChange={(e) => setExamOrg(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl glass-input text-slate-100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Last Date</label>
                  <input
                    type="date"
                    required
                    value={examLastDate}
                    onChange={(e) => setExamLastDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl glass-input text-slate-100 bg-slate-900"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Vacancies</label>
                  <input
                    type="number"
                    value={examVacancies}
                    onChange={(e) => setExamVacancies(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl glass-input text-slate-100"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Official Portal URL</label>
                <input
                  type="url"
                  required
                  value={examWebsite}
                  onChange={(e) => setExamWebsite(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl glass-input text-slate-100"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setExamModalOpen(false)}
                  className="flex-1 py-2 rounded-xl bg-slate-900 text-slate-400 border border-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-semibold shadow-md"
                >
                  Save Notification
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
