import React from 'react';
import {
  Activity,
  Award,
  BarChart3,
  Bot,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  Compass,
  FileText,
  Landmark,
  LayoutDashboard,
  LogOut,
  Map,
  Settings,
  ShieldCheck,
  Sparkles,
  Target,
  User,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ViewMode } from '../../types';

interface NavItem {
  id: ViewMode;
  label: string;
  icon: React.ElementType;
  badge?: string;
  adminOnly?: boolean;
}

export const Sidebar: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    isSidebarCollapsed,
    setIsSidebarCollapsed,
    user,
    logout,
    setIsAuthModalOpen,
    setAuthModalTab,
    unreadNotificationsCount,
  } = useApp();

  const navItems: NavItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'domains', label: 'Career Domains', icon: Compass },
    { id: 'skill-gap', label: 'Skill Gap Analysis', icon: Target, badge: 'AI' },
    { id: 'mock-interview', label: 'AI Mock Interview', icon: Bot, badge: 'Live' },
    { id: 'resume-analyzer', label: 'Resume Analyzer', icon: FileText, badge: 'ATS' },
    { id: 'jobs', label: 'Jobs & Internships', icon: Briefcase },
    { id: 'govt-exams', label: 'Govt Exam Alerts', icon: Landmark, badge: 'Hot' },
    { id: 'roadmaps', label: 'Learning Roadmaps', icon: Map },
    { id: 'profile', label: 'My Profile', icon: User },
    { id: 'admin', label: 'Admin Panel', icon: ShieldCheck, adminOnly: true },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleNavClick = (view: ViewMode) => {
    setCurrentView(view);
  };

  return (
    <aside
      className={`fixed top-0 left-0 z-40 h-screen transition-all duration-300 ease-in-out border-r border-slate-800/80 bg-slate-950/85 backdrop-blur-xl flex flex-col justify-between ${
        isSidebarCollapsed ? 'w-20' : 'w-68'
      } hidden md:flex`}
    >
      {/* Top Branding Section */}
      <div className="p-4 border-b border-slate-800/60 flex items-center justify-between">
        <div
          onClick={() => setCurrentView('dashboard')}
          className="flex items-center gap-3 cursor-pointer group overflow-hidden"
        >
          {/* Logo Icon */}
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/25 shrink-0 group-hover:scale-105 transition-transform duration-200">
            <Sparkles className="w-5 h-5 text-white animate-pulse" />
          </div>

          {!isSidebarCollapsed && (
            <div className="flex flex-col min-w-0">
              <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-700 bg-clip-text text-transparent truncate">
                Future Forge
              </span>
              <span className="text-[11px] font-semibold tracking-wide text-purple-600 uppercase -mt-0.5 truncate">
                AI Career Companion
              </span>
            </div>
          )}
        </div>

        {/* Collapse Button */}
        <button
          onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors shrink-0"
          title={isSidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {isSidebarCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1.5">
        {navItems.map((item) => {
          const isActive = currentView === item.id;
          const Icon = item.icon;

          // If admin only, only show if user is admin or highlight as admin tool
          if (item.adminOnly && user?.role !== 'admin') {
            return null;
          }

          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              title={isSidebarCollapsed ? item.label : undefined}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group relative ${
                isActive
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md shadow-purple-500/20 font-semibold'
                  : 'text-slate-600 hover:text-purple-700 hover:bg-purple-50/80'
              }`}
            >
              <div
                className={`p-1.5 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-white/20 text-white shadow-xs'
                    : 'text-slate-500 group-hover:text-purple-600 group-hover:bg-purple-100/60'
                }`}
              >
                <Icon size={18} />
              </div>

              {!isSidebarCollapsed && (
                <span className="truncate flex-1 text-left">{item.label}</span>
              )}

              {!isSidebarCollapsed && item.badge && (
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                    isActive
                      ? 'bg-white/25 text-white'
                      : item.badge === 'Hot'
                      ? 'bg-amber-100 text-amber-800 border border-amber-200'
                      : item.badge === 'Live'
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                      : 'bg-purple-100 text-purple-800 border border-purple-200'
                  }`}
                >
                  {item.badge}
                </span>
              )}

              {/* Collapsed active dot indicator */}
              {isSidebarCollapsed && isActive && (
                <span className="absolute right-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white shadow-xs" />
              )}
            </button>
          );
        })}
      </div>

      {/* Bottom Profile / Quick Action Card */}
      <div className="p-3 border-t border-slate-800/60 space-y-2">
        {user ? (
          <div className="glass-card p-2.5 rounded-xl border border-slate-800/80">
            <div className="flex items-center gap-3">
              <img
                src={user.avatarUrl}
                alt={user.name}
                className="w-9 h-9 rounded-full object-cover border border-purple-500/30 ring-2 ring-purple-500/10 shrink-0"
              />
              {!isSidebarCollapsed && (
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-100 truncate">{user.name}</p>
                  <div className="flex items-center gap-1.5">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span className="text-[11px] text-slate-400 capitalize truncate">
                      {user.role === 'admin' ? 'Admin Access' : user.role === 'aspirant' ? 'Govt Aspirant' : 'Tech Candidate'}
                    </span>
                  </div>
                </div>
              )}
              {!isSidebarCollapsed && (
                <button
                  onClick={logout}
                  className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-800/60 rounded-lg transition-colors"
                  title="Sign out"
                >
                  <LogOut size={16} />
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            {!isSidebarCollapsed ? (
              <div className="glass-card p-3 rounded-xl text-center space-y-2">
                <p className="text-xs text-slate-400">Join 40,000+ candidates</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setAuthModalTab('login');
                      setIsAuthModalOpen(true);
                    }}
                    className="flex-1 py-1.5 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
                  >
                    Log In
                  </button>
                  <button
                    onClick={() => {
                      setAuthModalTab('signup');
                      setIsAuthModalOpen(true);
                    }}
                    className="flex-1 py-1.5 text-xs font-semibold rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 text-white transition-opacity"
                  >
                    Sign Up
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => {
                  setAuthModalTab('login');
                  setIsAuthModalOpen(true);
                }}
                className="w-full p-2.5 rounded-xl bg-purple-600/30 text-purple-300 hover:bg-purple-600/50 flex items-center justify-center"
                title="Log In / Sign Up"
              >
                <User size={18} />
              </button>
            )}
          </div>
        )}
      </div>
    </aside>
  );
};
