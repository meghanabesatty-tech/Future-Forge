import React, { useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  Calendar,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Clock,
  Compass,
  ExternalLink,
  Flame,
  Globe,
  GraduationCap,
  Landmark,
  Layers,
  Map,
  Sparkles,
  Target,
  Trophy,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CareerRoadmap, RoadmapMilestone } from '../../types';

export const RoadmapsView: React.FC = () => {
  const {
    roadmaps,
    selectedRoadmapId,
    setSelectedRoadmapId,
    user,
    toggleMilestoneTopic,
    setCurrentView,
  } = useApp();

  const [activeGroup, setActiveGroup] = useState<
    'Tech & Modern Careers' | 'Government exams'
  >('Tech & Modern Careers');

  // Filter roadmaps by active group
  const groupRoadmaps = roadmaps.filter((rm) => rm.group === activeGroup);

  // Active selected roadmap
  const activeRoadmap =
    roadmaps.find((rm) => rm.id === selectedRoadmapId) ||
    groupRoadmaps[0] ||
    roadmaps[0];

  // Calculate completion percentage for this active roadmap
  const allTopicIds: string[] = [];
  activeRoadmap.milestones.forEach((m) => {
    m.topics.forEach((t) => allTopicIds.push(t.id));
  });

  const completedCount = allTopicIds.filter((id) =>
    user?.completedMilestoneTopics.includes(id)
  ).length;

  const roadmapProgress = Math.round(
    (completedCount / Math.max(1, allTopicIds.length)) * 100
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-semibold mb-1">
            <Map size={13} />
            <span>Interactive Curriculum Blueprint</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-100 tracking-tight">
            Learning Roadmaps
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Structured step-by-step milestones with interactive task tracking for top tech engineering and government civil service examinations.
          </p>
        </div>

        {/* Group Selector (Tech vs Government Exams) */}
        <div className="flex p-1 rounded-2xl bg-slate-900 border border-slate-800">
          <button
            onClick={() => {
              setActiveGroup('Tech & Modern Careers');
              const firstTech = roadmaps.find((r) => r.group === 'Tech & Modern Careers');
              if (firstTech) setSelectedRoadmapId(firstTech.id);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeGroup === 'Tech & Modern Careers'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles size={14} />
            <span>Tech & Modern Careers</span>
          </button>

          <button
            onClick={() => {
              setActiveGroup('Government exams');
              const firstGovt = roadmaps.find((r) => r.group === 'Government exams');
              if (firstGovt) setSelectedRoadmapId(firstGovt.id);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeGroup === 'Government exams'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Landmark size={14} />
            <span>Government Exams</span>
          </button>
        </div>
      </div>

      {/* Roadmap Picker Tabs for current group */}
      <div className="flex gap-2 overflow-x-auto pb-2 border-b border-slate-800">
        {groupRoadmaps.map((rm) => (
          <button
            key={rm.id}
            onClick={() => setSelectedRoadmapId(rm.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
              activeRoadmap.id === rm.id
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/25 border border-purple-400/40'
                : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            {activeGroup === 'Government exams' ? <Landmark size={14} /> : <Compass size={14} />}
            <span>{rm.title.split(' ')[0]} {rm.title.split(' ')[1]}</span>
          </button>
        ))}
      </div>

      {/* Active Roadmap Hero Progress Card */}
      <div className="relative overflow-hidden rounded-3xl p-6 sm:p-8 glass-panel border border-slate-700/80 shadow-2xl space-y-4">
        <div className="ambient-glow top-0 right-10 w-64 h-64 bg-purple-600/20" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 uppercase">
                {activeRoadmap.group}
              </span>
              <span className="text-xs text-slate-400 font-semibold">
                Est: {activeRoadmap.totalEstimatedWeeks} Weeks • {activeRoadmap.difficulty}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-100">{activeRoadmap.title}</h2>
            <p className="text-xs sm:text-sm text-slate-400">{activeRoadmap.description}</p>
          </div>

          {/* Progress Bar & Metric */}
          <div className="min-w-[240px] p-4 rounded-2xl glass-card border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 font-semibold">Overall Milestones Completed:</span>
              <span className="font-bold text-emerald-400">{roadmapProgress}%</span>
            </div>
            <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-full transition-all duration-500"
                style={{ width: `${roadmapProgress}%` }}
              />
            </div>
            <div className="text-[11px] text-slate-500 text-right">
              {completedCount} of {allTopicIds.length} topics validated
            </div>
          </div>
        </div>
      </div>

      {/* Milestones Timeline */}
      <div className="space-y-6">
        {activeRoadmap.milestones.map((milestone, idx) => {
          const completedTopicsInMilestone = milestone.topics.filter((t) =>
            user?.completedMilestoneTopics.includes(t.id)
          ).length;
          const isMilestoneDone =
            completedTopicsInMilestone === milestone.topics.length && milestone.topics.length > 0;

          return (
            <div
              key={milestone.id}
              className={`p-6 rounded-3xl glass-card border transition-all duration-200 space-y-4 ${
                isMilestoneDone
                  ? 'border-emerald-500/40 bg-emerald-950/10'
                  : 'border-slate-800/90 hover:border-slate-700'
              }`}
            >
              {/* Milestone Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800/80">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm ${
                      isMilestoneDone
                        ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/30'
                        : 'bg-purple-600/30 text-purple-300 border border-purple-500/30'
                    }`}
                  >
                    {isMilestoneDone ? '✓' : idx + 1}
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-slate-100">{milestone.title}</h3>
                    <p className="text-xs text-slate-400">{milestone.description}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-semibold text-slate-400 bg-slate-900 px-3 py-1 rounded-full border border-slate-800 flex items-center gap-1">
                    <Clock size={12} className="text-purple-400" />
                    {milestone.duration}
                  </span>
                  <span
                    className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${
                      isMilestoneDone
                        ? 'bg-emerald-500/20 text-emerald-300'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {completedTopicsInMilestone}/{milestone.topics.length} Done
                  </span>
                </div>
              </div>

              {/* Topics Checklist */}
              <div className="space-y-2">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  Target Competencies & Checklists:
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                  {milestone.topics.map((topic) => {
                    const isChecked = user?.completedMilestoneTopics.includes(topic.id);
                    return (
                      <div
                        key={topic.id}
                        onClick={() => toggleMilestoneTopic(topic.id)}
                        className={`p-3 rounded-xl border flex items-center gap-3 cursor-pointer transition-all ${
                          isChecked
                            ? 'bg-purple-950/20 border-purple-500/40 text-slate-200'
                            : 'bg-slate-900/50 hover:bg-slate-900 border-slate-800 text-slate-400'
                        }`}
                      >
                        <div
                          className={`w-5 h-5 rounded-md flex items-center justify-center border shrink-0 transition-colors ${
                            isChecked
                              ? 'bg-purple-600 border-purple-500 text-white'
                              : 'border-slate-700 bg-slate-800/80'
                          }`}
                        >
                          {isChecked && <CheckCircle2 size={14} />}
                        </div>
                        <span className={`text-xs font-medium ${isChecked ? 'text-slate-100' : ''}`}>
                          {topic.title}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Curated Resources for Milestone */}
              {milestone.resources.length > 0 && (
                <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center gap-2 text-xs">
                  <span className="text-[11px] text-slate-500 font-semibold flex items-center gap-1">
                    <BookOpen size={13} />
                    <span>Recommended Guides:</span>
                  </span>
                  {milestone.resources.map((res, i) => (
                    <a
                      key={i}
                      href={res.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-purple-300 hover:text-purple-200 text-xs font-medium border border-slate-800 flex items-center gap-1 transition-colors"
                    >
                      <span>{res.title}</span>
                      <ExternalLink size={11} />
                    </a>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom CTA to verify skills via interview or skill gap */}
      <div className="p-6 rounded-3xl glass-panel border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h4 className="font-bold text-sm text-slate-100">Ready to test what you learned?</h4>
          <p className="text-xs text-slate-400">
            Take an AI Mock Interview or run a Skill Gap check to measure retention.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentView('skill-gap')}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-semibold border border-slate-700"
          >
            Check Skill Gap
          </button>
          <button
            onClick={() => setCurrentView('mock-interview')}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 text-white text-xs font-semibold shadow-md"
          >
            Take AI Mock Interview
          </button>
        </div>
      </div>
    </div>
  );
};
