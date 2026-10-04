import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar } from './components/layout/Sidebar';
import { Navbar } from './components/layout/Navbar';
import { AuthModal } from './components/auth/AuthModal';
import { DashboardView } from './components/views/DashboardView';
import { CareerDomainsView } from './components/views/CareerDomainsView';
import { SkillGapView } from './components/views/SkillGapView';
import { MockInterviewView } from './components/views/MockInterviewView';
import { ResumeAnalyzerView } from './components/views/ResumeAnalyzerView';
import { JobsView } from './components/views/JobsView';
import { GovtExamsView } from './components/views/GovtExamsView';
import { RoadmapsView } from './components/views/RoadmapsView';
import { ProfileView } from './components/views/ProfileView';
import { AdminPanelView } from './components/views/AdminPanelView';
import { SettingsView } from './components/views/SettingsView';
import { CheckCircle2, Heart, Sparkles } from 'lucide-react';

const MainContent: React.FC = () => {
  const { currentView, isSidebarCollapsed, toastMessage } = useApp();

  const renderActiveView = () => {
    switch (currentView) {
      case 'dashboard':
        return <DashboardView />;
      case 'domains':
        return <CareerDomainsView />;
      case 'skill-gap':
        return <SkillGapView />;
      case 'mock-interview':
        return <MockInterviewView />;
      case 'resume-analyzer':
        return <ResumeAnalyzerView />;
      case 'jobs':
        return <JobsView />;
      case 'govt-exams':
        return <GovtExamsView />;
      case 'roadmaps':
        return <RoadmapsView />;
      case 'profile':
        return <ProfileView />;
      case 'admin':
        return <AdminPanelView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans transition-colors duration-200">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-white border border-purple-500/40 text-slate-900 shadow-2xl text-xs font-semibold animate-in slide-in-from-bottom-5 duration-200">
          <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Navigation Layout */}
      <Sidebar />
      <Navbar />
      <AuthModal />

      {/* Main Dynamic View Area */}
      <main
        className={`flex-1 pt-20 pb-12 px-4 sm:px-6 lg:px-10 transition-all duration-300 ${
          isSidebarCollapsed ? 'md:ml-20' : 'md:ml-68'
        }`}
      >
        <div className="max-w-7xl mx-auto space-y-8">
          {renderActiveView()}

          {/* Unified Footer */}
          <footer className="pt-10 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-lg bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center text-white text-[10px] font-bold">
                FF
              </div>
              <span className="font-semibold text-slate-700">
                Future Forge - Your AI Career Companion
              </span>
            </div>

            <div className="flex items-center gap-6">
              <span>Skill Gap Diagnostics</span>
              <span>•</span>
              <span>ATS Resume Analyzer</span>
              <span>•</span>
              <span>Government Exam Tracker</span>
            </div>

            <p>© 2026 Future Forge • Empowering modern careers</p>
          </footer>
        </div>
      </main>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
