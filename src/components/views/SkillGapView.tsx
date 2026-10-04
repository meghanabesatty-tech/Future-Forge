import React, { useState } from 'react';
import {
  ArrowRight,
  Award,
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  ExternalLink,
  Flame,
  HelpCircle,
  Landmark,
  Layers,
  Map,
  Plus,
  RefreshCw,
  Sparkles,
  Target,
  X,
  Zap,
} from 'lucide-react';
import { CAREER_DOMAINS } from '../../data/initialData';
import { useApp } from '../../context/AppContext';
import { CareerDomainId, GovtSubjectReadiness } from '../../types';

export const SkillGapView: React.FC = () => {
  const {
    selectedDomainId,
    setSelectedDomainId,
    setCurrentView,
    setSelectedRoadmapId,
    user,
    updateProfile,
    showSuccessToast,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'tech' | 'govt'>('tech');

  // Tech Tab State
  const [techDomainId, setTechDomainId] = useState<CareerDomainId>(selectedDomainId || 'web-dev');
  const [userSkills, setUserSkills] = useState<string[]>(
    user?.currentSkills || ['JavaScript', 'React', 'HTML5', 'CSS3']
  );
  const [customSkillInput, setCustomSkillInput] = useState('');

  // Government Exams Tab State
  const [selectedGovtExam, setSelectedGovtExam] = useState<string>('ssc_cgl');
  const [govtScores, setGovtScores] = useState<Record<string, number>>({
    quant: 65,
    reasoning: 80,
    gk: 45,
    english: 75,
  });

  const currentDomain =
    CAREER_DOMAINS.find((d) => d.id === techDomainId) || CAREER_DOMAINS[2];

  // Calculate Tech Gap
  const requiredSkills = currentDomain.skillsRequired;
  const lowerUserSkills = userSkills.map((s) => s.toLowerCase());

  const matchedSkills = requiredSkills.filter((req) =>
    lowerUserSkills.some((us) => us.includes(req.toLowerCase()) || req.toLowerCase().includes(us))
  );
  const missingSkills = requiredSkills.filter(
    (req) => !matchedSkills.includes(req)
  );
  const progressPercentage = Math.round(
    (matchedSkills.length / Math.max(1, requiredSkills.length)) * 100
  );

  // Add / Remove user skill
  const handleAddSkill = (skill: string) => {
    const trimmed = skill.trim();
    if (!trimmed) return;
    if (!userSkills.some((s) => s.toLowerCase() === trimmed.toLowerCase())) {
      const updated = [...userSkills, trimmed];
      setUserSkills(updated);
      if (user) updateProfile({ currentSkills: updated });
      showSuccessToast(`Added skill: "${trimmed}"`);
    }
    setCustomSkillInput('');
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    const updated = userSkills.filter((s) => s !== skillToRemove);
    setUserSkills(updated);
    if (user) updateProfile({ currentSkills: updated });
  };

  // Govt Exam Configuration
  const govtExamsConfig: Record<
    string,
    {
      name: string;
      category: string;
      subjects: { key: string; label: string; weight: number; highYield: string[] }[];
      roadmapId: string;
    }
  > = {
    ssc_cgl: {
      name: 'SSC CGL (Tier 1 & Tier 2)',
      category: 'Staff Selection Commission',
      roadmapId: 'roadmap_ssc',
      subjects: [
        { key: 'quant', label: 'Quantitative Aptitude & Advanced Math', weight: 30, highYield: ['Algebra & Geometry', 'Trigonometry', 'Profit & Loss', 'Mensuration 3D'] },
        { key: 'reasoning', label: 'General Intelligence & Logical Reasoning', weight: 25, highYield: ['Syllogism', 'Coded Blood Relations', 'Figure Counting', 'Analogy'] },
        { key: 'english', label: 'English Comprehension & Grammar', weight: 25, highYield: ['Active/Passive Voice', 'Direct/Indirect Speech', 'Idioms & Phrases', 'Cloze Test'] },
        { key: 'gk', label: 'General Awareness, Polity & Static GK', weight: 20, highYield: ['Constitution Articles', 'Classical Dances & Temples', 'Current Affairs (Last 8 Months)', 'Modern History'] },
      ],
    },
    upsc_cse: {
      name: 'UPSC Civil Services (Prelims & Mains)',
      category: 'Union Public Service Commission',
      roadmapId: 'roadmap_upsc',
      subjects: [
        { key: 'quant', label: 'CSAT (Mental Ability & Math Paper II)', weight: 20, highYield: ['Reading Comprehension', 'Data Sufficiency', 'Permutation & Combination', 'Logical Puzzles'] },
        { key: 'reasoning', label: 'Analytical Reasoning & Ethics Case Studies', weight: 25, highYield: ['Ethical Dilemmas', 'Administrative Integrity', 'Public Sector Governance'] },
        { key: 'gk', label: 'General Studies I-IV & Current Affairs', weight: 40, highYield: ['Polity (Laxmikanth)', 'Modern Indian History', 'Physical Geography', 'Environment & Climate'] },
        { key: 'english', label: 'Essay & Language Formulation', weight: 15, highYield: ['Philosophical Essays', 'Economic Policy Commentary', 'Constitutional Values'] },
      ],
    },
    banking_po: {
      name: 'IBPS & SBI Probationary Officer (PO)',
      category: 'Public Sector Banking',
      roadmapId: 'roadmap_banking',
      subjects: [
        { key: 'quant', label: 'Speed Math & Complex Data Interpretation', weight: 35, highYield: ['Caselet DI sets', 'Missing Number Series', 'Quadratic Equations', 'Arithmetic Arithmetic DI'] },
        { key: 'reasoning', label: 'High-Level Floor & Circular Puzzles', weight: 35, highYield: ['Multi-variable Puzzles', 'Machine Input-Output', 'Coded Direction & Inequalities'] },
        { key: 'english', label: 'English Reading Comprehension & Vocab', weight: 20, highYield: ['Economic Editorial passages', 'Error Spotting (New pattern)', 'Para Jumbles'] },
        { key: 'gk', label: 'Banking & Financial Awareness', weight: 10, highYield: ['RBI Monetary Policy Rates', 'Basel III Norms', 'Financial Inclusion Schemes', 'Union Budget'] },
      ],
    },
    state_psc: {
      name: 'State PSC (APPSC / TSPSC Group 1 & 2)',
      category: 'State Public Service',
      roadmapId: 'roadmap_state_psc',
      subjects: [
        { key: 'quant', label: 'Mental Ability & Data Analysis', weight: 20, highYield: ['Tabular Interpretation', 'Logical Venn Diagrams', 'Arithmetic Percentages'] },
        { key: 'reasoning', label: 'General Reasoning & Analytical Ability', weight: 20, highYield: ['Assertion & Reasoning', 'Statement & Assumptions', 'Critical Judgments'] },
        { key: 'gk', label: 'State History, Economy & Welfare Schemes', weight: 40, highYield: ['State Socio-Economic Survey', 'Bifurcation Act Provisions', 'State Dynasties & Culture', 'Flagship Welfare Programs'] },
        { key: 'english', label: 'General English & Regional Language', weight: 20, highYield: ['Précis Writing', 'Letter Writing to Authorities', 'Grammar Correction'] },
      ],
    },
  };

  const activeGovtConfig = govtExamsConfig[selectedGovtExam] || govtExamsConfig.ssc_cgl;

  // Calculate Weighted Government Exam Readiness
  let weightedGovtScore = 0;
  activeGovtConfig.subjects.forEach((sub) => {
    const score = govtScores[sub.key] ?? 60;
    weightedGovtScore += score * (sub.weight / 100);
  });
  weightedGovtScore = Math.round(weightedGovtScore);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold mb-1">
            <Target size={13} />
            <span>AI Diagnostic Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-100 tracking-tight">
            Skill Gap Analysis
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Compare your current competencies against industry benchmarks or Government Exam syllabi to discover missing skills and high-yield study plans.
          </p>
        </div>

        {/* Mode Switcher Tabs */}
        <div className="flex p-1 rounded-2xl bg-slate-900 border border-slate-800">
          <button
            onClick={() => setActiveTab('tech')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'tech'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles size={14} />
            <span>Tech & Modern Careers</span>
          </button>
          <button
            onClick={() => setActiveTab('govt')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'govt'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Landmark size={14} />
            <span>Government Exams</span>
          </button>
        </div>
      </div>

      {/* ================= TAB 1: TECH CAREERS ================= */}
      {activeTab === 'tech' && (
        <div className="space-y-6">
          {/* Domain Selector & Quick Add */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left 2 Cols: Career Selector & Current Skills Input */}
            <div className="lg:col-span-2 space-y-4">
              <div className="p-5 rounded-3xl glass-card border border-slate-800/90 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Select Target Career Domain:
                  </label>
                  <select
                    value={techDomainId}
                    onChange={(e) => setTechDomainId(e.target.value as CareerDomainId)}
                    className="px-3 py-2 rounded-xl glass-input text-xs font-semibold text-slate-100 bg-slate-900 border-slate-700"
                  >
                    {CAREER_DOMAINS.map((domain) => (
                      <option key={domain.id} value={domain.id}>
                        {domain.name} ({domain.category})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Input Skills Bar */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Your Current Skills & Technologies:
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={customSkillInput}
                      onChange={(e) => setCustomSkillInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill(customSkillInput))}
                      placeholder="Type a skill (e.g., Docker, Python, SQL) and press Enter..."
                      className="flex-1 px-4 py-2.5 text-xs rounded-xl glass-input text-slate-100 placeholder:text-slate-500"
                    />
                    <button
                      onClick={() => handleAddSkill(customSkillInput)}
                      className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors"
                    >
                      <Plus size={15} />
                      <span>Add Skill</span>
                    </button>
                  </div>
                </div>

                {/* Current Active Skills Chips */}
                <div>
                  <div className="text-[11px] font-semibold text-slate-400 mb-2">
                    Active Skills Logged ({userSkills.length}):
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {userSkills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-900 border border-slate-700/80 text-xs font-medium text-slate-200 group"
                      >
                        <span>{skill}</span>
                        <button
                          onClick={() => handleRemoveSkill(skill)}
                          className="text-slate-500 hover:text-rose-400 transition-colors"
                          title="Remove skill"
                        >
                          <X size={13} />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Quick Add Suggestions based on Domain */}
                <div className="pt-2 border-t border-slate-800/80">
                  <div className="text-[11px] text-slate-400 mb-1.5">
                    Quick Add Missing Requirements for {currentDomain.name}:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {missingSkills.slice(0, 5).map((skill, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleAddSkill(skill)}
                        className="text-[11px] px-2.5 py-1 rounded-lg bg-purple-950/40 hover:bg-purple-900/60 border border-purple-500/30 text-purple-300 font-medium flex items-center gap-1 transition-colors"
                      >
                        <Plus size={11} />
                        <span>{skill}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right 1 Col: Match Percentage Gauge */}
            <div className="glass-card rounded-3xl p-6 border border-slate-800/90 flex flex-col justify-between text-center relative overflow-hidden">
              <div className="ambient-glow top-0 right-0 w-40 h-40 bg-purple-600/20" />

              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                  Market Readiness Score
                </span>

                {/* Circular / Radial Progress Representation */}
                <div className="relative w-36 h-36 mx-auto my-3 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="currentColor"
                      strokeWidth="8"
                      className="text-slate-800"
                      fill="transparent"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="url(#progressGradient)"
                      strokeWidth="8"
                      strokeDasharray={251.2}
                      strokeDashoffset={251.2 - (251.2 * progressPercentage) / 100}
                      strokeLinecap="round"
                      fill="transparent"
                      className="transition-all duration-700 ease-out"
                    />
                    <defs>
                      <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#a855f7" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-black text-slate-100">{progressPercentage}%</span>
                    <span className="text-[10px] font-semibold text-purple-300">
                      {progressPercentage >= 80 ? 'Job Ready' : progressPercentage >= 50 ? 'Intermediate' : 'Early Stage'}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-400 mt-2">
                  You possess <strong className="text-slate-200">{matchedSkills.length}</strong> of{' '}
                  <strong className="text-slate-200">{requiredSkills.length}</strong> core skills required for this role.
                </p>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-800">
                <button
                  onClick={() => {
                    setSelectedDomainId(techDomainId);
                    setSelectedRoadmapId(currentDomain.roadmapId);
                    setCurrentView('roadmaps');
                  }}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-purple-500/20"
                >
                  <Map size={14} />
                  <span>Launch Learning Roadmap</span>
                </button>
              </div>
            </div>
          </div>

          {/* Matched vs Missing Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Matched Skills */}
            <div className="p-5 rounded-3xl glass-card border border-emerald-500/20 bg-emerald-950/10">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <CheckCircle2 size={18} />
                  </div>
                  <h3 className="font-bold text-sm text-emerald-200">
                    Acquired Core Skills ({matchedSkills.length})
                  </h3>
                </div>
                <span className="text-xs font-bold text-emerald-400">Validated</span>
              </div>

              {matchedSkills.length === 0 ? (
                <p className="text-xs text-slate-400 py-4">No matching skills detected yet. Add skills in the input above.</p>
              ) : (
                <div className="space-y-2">
                  {matchedSkills.map((skill, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between text-xs"
                    >
                      <span className="font-semibold text-slate-200">{skill}</span>
                      <span className="text-[11px] text-emerald-400 font-medium">✓ In your profile</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Missing Skills */}
            <div className="p-5 rounded-3xl glass-card border border-rose-500/20 bg-rose-950/10">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center">
                    <Flame size={18} />
                  </div>
                  <h3 className="font-bold text-sm text-rose-200">
                    Missing Skills to Acquire ({missingSkills.length})
                  </h3>
                </div>
                <span className="text-xs font-bold text-rose-400">Action Required</span>
              </div>

              {missingSkills.length === 0 ? (
                <p className="text-xs text-emerald-300 py-4">
                  Outstanding! You meet 100% of the core competencies for this role.
                </p>
              ) : (
                <div className="space-y-2">
                  {missingSkills.map((skill, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between text-xs"
                    >
                      <span className="font-semibold text-slate-200">{skill}</span>
                      <button
                        onClick={() => handleAddSkill(skill)}
                        className="text-[11px] text-purple-400 hover:text-purple-300 font-semibold"
                      >
                        + Mark as Learned
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Suggested Courses */}
          <div className="p-6 rounded-3xl glass-panel border border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                  <BookOpen size={18} className="text-purple-400" />
                  <span>Curated Courses to Bridge Your Gap</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Targeted learning paths mapped to your missing skills
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {currentDomain.learningResources.map((res, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl glass-card border border-slate-800 flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 uppercase">
                      {res.type}
                    </span>
                    <h4 className="font-bold text-xs text-slate-100 mt-2 mb-1 line-clamp-1">
                      {res.title}
                    </h4>
                    <p className="text-[11px] text-slate-400">Provider: {res.provider}</p>
                  </div>
                  <div className="pt-3 mt-3 border-t border-slate-800/80 flex items-center justify-between">
                    <span className="text-[11px] text-emerald-400 font-semibold">
                      {res.free ? 'Free Resource' : 'Certification'}
                    </span>
                    <a
                      href={res.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-purple-400 hover:text-purple-300 font-semibold flex items-center gap-1"
                    >
                      <span>Enroll</span>
                      <ExternalLink size={12} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 2: GOVERNMENT EXAMS (WEIGHTED SUBJECT READINESS + PRIORITY STUDY PLAN) ================= */}
      {activeTab === 'govt' && (
        <div className="space-y-6">
          {/* Exam Selection Header */}
          <div className="p-5 rounded-3xl glass-card border border-slate-800/90 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="font-bold text-sm text-slate-100">Select Target Government Exam</h3>
                <p className="text-xs text-slate-400">
                  Weighted subject readiness evaluation with exam-specific marks allocation
                </p>
              </div>

              <select
                value={selectedGovtExam}
                onChange={(e) => setSelectedGovtExam(e.target.value)}
                className="px-4 py-2 rounded-xl glass-input text-xs font-semibold text-slate-100 bg-slate-900 border-slate-700"
              >
                <option value="ssc_cgl">SSC CGL (Combined Graduate Level)</option>
                <option value="upsc_cse">UPSC Civil Services Examination (CSE)</option>
                <option value="banking_po">IBPS & SBI Probationary Officer (PO)</option>
                <option value="state_psc">State PSC (APPSC / TSPSC Group 1 & 2)</option>
              </select>
            </div>
          </div>

          {/* Weighted Subject Sliders & Overall Readiness */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left 2 Cols: Subject Sliders */}
            <div className="lg:col-span-2 space-y-4">
              <div className="p-6 rounded-3xl glass-panel border border-slate-800 space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <h3 className="font-bold text-sm text-slate-100">
                    Subject Readiness Self-Assessment ({activeGovtConfig.name})
                  </h3>
                  <span className="text-[11px] text-purple-400 font-medium">
                    Adjust sliders to reflect your mock test percentiles
                  </span>
                </div>

                <div className="space-y-4">
                  {activeGovtConfig.subjects.map((sub) => {
                    const currentScore = govtScores[sub.key] ?? 60;
                    return (
                      <div key={sub.key} className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-2">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="font-bold text-xs text-slate-100 block">{sub.label}</span>
                            <span className="text-[11px] text-slate-400">
                              Exam Weightage: <strong className="text-purple-300">{sub.weight}%</strong>
                            </span>
                          </div>
                          <span
                            className={`text-xs font-extrabold px-2.5 py-1 rounded-xl ${
                              currentScore >= 75
                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                : currentScore >= 50
                                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                                : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                            }`}
                          >
                            {currentScore}% Readiness
                          </span>
                        </div>

                        {/* Slider */}
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={currentScore}
                          onChange={(e) =>
                            setGovtScores({
                              ...govtScores,
                              [sub.key]: parseInt(e.target.value, 10),
                            })
                          }
                          className="w-full accent-purple-500 cursor-pointer"
                        />

                        {/* High-yield topics pill */}
                        <div className="flex items-center gap-1.5 flex-wrap pt-1">
                          <span className="text-[10px] font-semibold text-slate-500 uppercase">
                            High-Yield:
                          </span>
                          {sub.highYield.map((hy, i) => (
                            <span
                              key={i}
                              className="text-[10px] px-2 py-0.5 rounded bg-slate-800/90 text-slate-300 border border-slate-700/60"
                            >
                              {hy}
                            </span>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right 1 Col: Weighted Overall Score */}
            <div className="glass-card rounded-3xl p-6 border border-slate-800/90 flex flex-col justify-between text-center relative overflow-hidden">
              <div className="ambient-glow top-0 right-0 w-40 h-40 bg-purple-600/20" />

              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                  Weighted Composite Readiness
                </span>

                <div className="my-4">
                  <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-300 to-pink-400">
                    {weightedGovtScore}%
                  </div>
                  <span
                    className={`inline-block mt-2 text-xs font-bold px-3 py-1 rounded-full ${
                      weightedGovtScore >= 75
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : weightedGovtScore >= 55
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                    }`}
                  >
                    {weightedGovtScore >= 75
                      ? 'Competitive Cut-Off Zone'
                      : weightedGovtScore >= 55
                      ? 'Requires Revision Drills'
                      : 'High Risk • Boost Foundational NCERTs'}
                  </span>
                </div>

                <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800 text-left text-xs space-y-1.5">
                  <div className="font-semibold text-purple-300">Diagnostic Verdict:</div>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    {weightedGovtScore >= 75
                      ? 'Excellent sectional balance. Prioritize timed speed test simulations and eliminate negative marking risks.'
                      : 'Critical weakness detected in General Awareness / Static GK. Dedicate 2 hours daily to past 10 years solved papers.'}
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-800 space-y-2">
                <button
                  onClick={() => {
                    setSelectedRoadmapId(activeGovtConfig.roadmapId);
                    setCurrentView('roadmaps');
                  }}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-purple-500/20"
                >
                  <Map size={14} />
                  <span>Open {activeGovtConfig.name} Roadmap</span>
                </button>
              </div>
            </div>
          </div>

          {/* Priority 4-Week Study Plan */}
          <div className="p-6 rounded-3xl glass-panel border border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                  <Calendar size={18} className="text-purple-400" />
                  <span>Recommended 4-Week Priority Study Plan</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Custom schedule tailored to bridge your lowest weighted subject readiness
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  week: 'Week 1',
                  focus: 'Speed Calculation & Core Formulas',
                  action: 'Memorize tables up to 30, square roots, and basic algebraic identities. Solve 50 simplification questions daily.',
                  hours: '28 Hours (4 hrs/day)',
                },
                {
                  week: 'Week 2',
                  focus: 'High-Yield Reasoning & Puzzles',
                  action: 'Complete 20 seating arrangements, syllogisms, and coded direction sets. Analyze negative marking errors.',
                  hours: '30 Hours',
                },
                {
                  week: 'Week 3',
                  focus: 'Static GK & Constitutional Articles',
                  action: 'Revise Fundamental Rights, Classical Art/Dances, and last 6 months current affairs summaries.',
                  hours: '32 Hours',
                },
                {
                  week: 'Week 4',
                  focus: 'Full-Length CBT Mock Tests',
                  action: 'Attempt 8 full simulated 60-minute mock tests under strict exam conditions. Target 75+ percentile.',
                  hours: '35 Hours',
                },
              ].map((plan, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl glass-card border border-slate-800 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">
                        {plan.week}
                      </span>
                      <span className="text-[10px] text-slate-500 flex items-center gap-1">
                        <Clock size={11} />
                        {plan.hours}
                      </span>
                    </div>
                    <h4 className="font-bold text-xs text-slate-200 mb-1.5">{plan.focus}</h4>
                    <p className="text-[11px] text-slate-400 leading-relaxed">{plan.action}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
