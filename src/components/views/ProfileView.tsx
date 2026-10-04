import React, { useState } from 'react';
import {
  Award,
  Bookmark,
  Briefcase,
  CheckCircle2,
  Edit2,
  GraduationCap,
  Landmark,
  Mail,
  MapPin,
  Save,
  Shield,
  Sparkles,
  User,
  Zap,
} from 'lucide-react';
import { CAREER_DOMAINS } from '../../data/initialData';
import { useApp } from '../../context/AppContext';
import { CareerDomainId } from '../../types';

export const ProfileView: React.FC = () => {
  const { user, updateProfile, jobs, govtExams, interviewEvaluations, showSuccessToast } = useApp();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [education, setEducation] = useState(user?.education || '');
  const [targetDomain, setTargetDomain] = useState<CareerDomainId>(user?.targetDomain || 'web-dev');
  const [bio, setBio] = useState(user?.bio || '');
  const [skillsString, setSkillsString] = useState((user?.currentSkills || []).join(', '));

  if (!user) {
    return (
      <div className="p-12 text-center rounded-3xl glass-panel border border-slate-800 space-y-4">
        <User size={40} className="mx-auto text-slate-600" />
        <h3 className="font-bold text-base text-slate-200">No Active Profile Found</h3>
        <p className="text-xs text-slate-400">Please sign in to manage your career portfolio and settings.</p>
      </div>
    );
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const skillsArray = skillsString
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    updateProfile({
      name,
      education,
      targetDomain,
      bio,
      currentSkills: skillsArray,
    });
    setIsEditing(false);
    showSuccessToast('Profile changes saved successfully.');
  };

  const savedJobsList = jobs.filter((j) => user.savedJobIds.includes(j.id));
  const savedExamsList = govtExams.filter((e) => user.savedExamIds.includes(e.id));

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Profile Header Card */}
      <div className="relative overflow-hidden rounded-3xl p-6 sm:p-8 glass-panel border border-slate-700/80 shadow-2xl">
        <div className="ambient-glow top-0 right-10 w-72 h-72 bg-purple-600/20" />

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-5">
            <img
              src={user.avatarUrl}
              alt={user.name}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl object-cover border-2 border-purple-500/40 ring-4 ring-purple-500/10 shadow-xl"
            />
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black text-slate-100">{user.name}</h1>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 uppercase">
                  {user.role}
                </span>
              </div>
              <p className="text-xs text-slate-400 flex items-center gap-1.5">
                <Mail size={13} className="text-slate-500" />
                <span>{user.email}</span>
              </p>
              <p className="text-xs text-purple-300 font-medium pt-1">
                Target Pathway:{' '}
                <strong className="text-slate-200">
                  {CAREER_DOMAINS.find((d) => d.id === user.targetDomain)?.name || user.targetDomain}
                </strong>
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold text-xs flex items-center gap-2 self-start sm:self-auto transition-colors"
          >
            <Edit2 size={14} className="text-purple-400" />
            <span>{isEditing ? 'Cancel Edit' : 'Edit Profile'}</span>
          </button>
        </div>
      </div>

      {/* Edit Form or Information Showcase */}
      {isEditing ? (
        <form onSubmit={handleSave} className="p-6 rounded-3xl glass-card border border-purple-500/30 space-y-4">
          <h3 className="font-bold text-sm text-slate-100">Update Profile Details</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2 text-xs rounded-xl glass-input text-slate-100"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Education</label>
              <input
                type="text"
                value={education}
                onChange={(e) => setEducation(e.target.value)}
                className="w-full px-3.5 py-2 text-xs rounded-xl glass-input text-slate-100"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Target Career Pathway
              </label>
              <select
                value={targetDomain}
                onChange={(e) => setTargetDomain(e.target.value as CareerDomainId)}
                className="w-full px-3.5 py-2 text-xs rounded-xl glass-input text-slate-100 bg-slate-900 border-slate-700"
              >
                {CAREER_DOMAINS.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>
                ))}
                <option value="govt-exams">Government Exams</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Current Skills (comma separated)
              </label>
              <input
                type="text"
                value={skillsString}
                onChange={(e) => setSkillsString(e.target.value)}
                className="w-full px-3.5 py-2 text-xs rounded-xl glass-input text-slate-100"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Bio</label>
            <textarea
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full p-3 text-xs rounded-xl glass-input text-slate-100 resize-none"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 rounded-xl bg-slate-900 text-slate-400 text-xs font-semibold border border-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-semibold shadow-md"
            >
              Save Changes
            </button>
          </div>
        </form>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left 2 Cols: Details & Skills */}
          <div className="lg:col-span-2 space-y-6">
            {/* Bio & Education */}
            <div className="p-6 rounded-3xl glass-card border border-slate-800 space-y-3">
              <h3 className="font-bold text-sm text-slate-100">About & Background</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{user.bio}</p>
              <div className="pt-2 border-t border-slate-800 flex items-center gap-2 text-xs text-slate-400">
                <GraduationCap size={15} className="text-purple-400" />
                <span>Education: {user.education}</span>
              </div>
            </div>

            {/* Current Skills Cloud */}
            <div className="p-6 rounded-3xl glass-card border border-slate-800 space-y-3">
              <h3 className="font-bold text-sm text-slate-100">Skills Portfolio</h3>
              <div className="flex flex-wrap gap-2">
                {user.currentSkills.map((skill, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-xl bg-purple-950/40 border border-purple-500/30 text-purple-300 text-xs font-semibold"
                  >
                    ✓ {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Saved Jobs List */}
            <div className="p-6 rounded-3xl glass-card border border-slate-800 space-y-3">
              <h3 className="font-bold text-sm text-slate-100 flex items-center gap-2">
                <Bookmark size={15} className="text-amber-400" />
                <span>Saved Jobs & Opportunities ({savedJobsList.length})</span>
              </h3>
              {savedJobsList.length === 0 ? (
                <p className="text-xs text-slate-500">No bookmarked jobs yet.</p>
              ) : (
                <div className="space-y-2">
                  {savedJobsList.map((job) => (
                    <div
                      key={job.id}
                      className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-between text-xs"
                    >
                      <div>
                        <div className="font-semibold text-slate-200">{job.title}</div>
                        <div className="text-[11px] text-slate-400">
                          {job.company} • {job.location} • {job.salary}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right 1 Col: Quick Trackers */}
          <div className="space-y-6">
            {/* Saved Govt Exams */}
            <div className="p-6 rounded-3xl glass-card border border-slate-800 space-y-3">
              <h3 className="font-bold text-sm text-slate-100 flex items-center gap-2">
                <Landmark size={15} className="text-amber-400" />
                <span>Tracked Govt Exams ({savedExamsList.length})</span>
              </h3>
              {savedExamsList.length === 0 ? (
                <p className="text-xs text-slate-500">No tracked government exams.</p>
              ) : (
                <div className="space-y-2">
                  {savedExamsList.map((exam) => (
                    <div
                      key={exam.id}
                      className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800 text-xs"
                    >
                      <div className="font-semibold text-slate-200">{exam.examName}</div>
                      <div className="text-[11px] text-amber-300 mt-0.5">
                        Last Date: {exam.lastDate}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Mock Interview Stats */}
            <div className="p-6 rounded-3xl glass-card border border-slate-800 space-y-3">
              <h3 className="font-bold text-sm text-slate-100">AI Preparation Stats</h3>
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between p-2 rounded-xl bg-slate-900/50">
                  <span className="text-slate-400">Interviews Attempted</span>
                  <strong className="text-slate-200">{interviewEvaluations.length}</strong>
                </div>
                <div className="flex items-center justify-between p-2 rounded-xl bg-slate-900/50">
                  <span className="text-slate-400">Roadmap Milestones</span>
                  <strong className="text-purple-300">
                    {user.completedMilestoneTopics.length} Checked
                  </strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
