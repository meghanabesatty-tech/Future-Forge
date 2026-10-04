import React, { useState } from 'react';
import {
  Bell,
  Check,
  ChevronDown,
  Compass,
  FileText,
  Landmark,
  Layers,
  LogOut,
  Menu,
  Moon,
  Search,
  Shield,
  Sparkles,
  Sun,
  User,
  X,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ViewMode } from '../../types';

export const Navbar: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    theme,
    toggleTheme,
    user,
    logout,
    setIsAuthModalOpen,
    setAuthModalTab,
    notifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    unreadNotificationsCount,
    isSidebarCollapsed,
    mobileMenuOpen,
    setMobileMenuOpen,
    searchQuery,
    setSearchQuery,
    switchRole,
  } = useApp();

  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [roleSwitchOpen, setRoleSwitchOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    // Route smartly based on query keyword
    const q = searchQuery.toLowerCase();
    if (q.includes('exam') || q.includes('upsc') || q.includes('ssc') || q.includes('govt')) {
      setCurrentView('govt-exams');
    } else if (q.includes('job') || q.includes('intern') || q.includes('hire')) {
      setCurrentView('jobs');
    } else if (q.includes('resume') || q.includes('cv') || q.includes('ats')) {
      setCurrentView('resume-analyzer');
    } else if (q.includes('interview') || q.includes('mock') || q.includes('practice')) {
      setCurrentView('mock-interview');
    } else if (q.includes('roadmap') || q.includes('learn') || q.includes('path')) {
      setCurrentView('roadmaps');
    } else {
      setCurrentView('domains');
    }
  };

  const handleNotificationClick = (id: string, actionView?: ViewMode) => {
    markNotificationAsRead(id);
    if (actionView) {
      setCurrentView(actionView);
      setNotificationsOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 right-0 z-30 h-16 border-b border-slate-800/80 bg-slate-950/70 backdrop-blur-xl transition-all duration-300 ${
        isSidebarCollapsed ? 'left-0 md:left-20' : 'left-0 md:left-68'
      } flex items-center justify-between px-4 lg:px-8`}
    >
      {/* Left: Mobile Toggle & Search Input */}
      <div className="flex items-center gap-3 flex-1 max-w-xl">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 md:hidden"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        <form onSubmit={handleSearchSubmit} className="relative w-full max-w-md hidden sm:block">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search careers, exams, roadmaps, skills..."
            className="w-full pl-10 pr-4 py-2 text-sm rounded-xl glass-input text-slate-800 placeholder:text-slate-400 focus:border-purple-500/60 transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
            >
              Clear
            </button>
          )}
        </form>
      </div>

      {/* Right: Actions, Role Pill, Notifications, Theme, Profile */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Quick Role Switcher Pill */}
        {user && (
          <div className="relative">
            <button
              onClick={() => setRoleSwitchOpen(!roleSwitchOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 border border-purple-200 text-xs font-semibold text-purple-700 transition-colors"
              title="Switch demo preview role"
            >
              <Shield size={14} className="text-purple-600" />
              <span className="capitalize">{user.role} View</span>
              <ChevronDown size={12} className="text-purple-600 ml-0.5" />
            </button>

            {roleSwitchOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-xl glass-panel border border-slate-700/80 p-1.5 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2">
                <div className="px-2 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Switch Active Role
                </div>
                <button
                  onClick={() => {
                    switchRole('student');
                    setRoleSwitchOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium text-left ${
                    user.role === 'student'
                      ? 'bg-blue-600/30 text-blue-200 font-semibold'
                      : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <span>Student (Tech Roles)</span>
                  {user.role === 'student' && <Check size={14} className="text-blue-400" />}
                </button>
                <button
                  onClick={() => {
                    switchRole('aspirant');
                    setRoleSwitchOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium text-left ${
                    user.role === 'aspirant'
                      ? 'bg-purple-600/30 text-purple-200 font-semibold'
                      : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <span>Govt Aspirant</span>
                  {user.role === 'aspirant' && <Check size={14} className="text-purple-400" />}
                </button>
                <button
                  onClick={() => {
                    switchRole('admin');
                    setRoleSwitchOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium text-left ${
                    user.role === 'admin'
                      ? 'bg-amber-600/30 text-amber-200 font-semibold'
                      : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <span>Admin Panel Access</span>
                  {user.role === 'admin' && <Check size={14} className="text-amber-400" />}
                </button>
              </div>
            )}
          </div>
        )}

        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-xl text-slate-600 hover:text-purple-600 hover:bg-slate-100 border border-slate-200 transition-colors"
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
        >
          {theme === 'dark' ? <Sun size={18} className="text-amber-500" /> : <Moon size={18} className="text-indigo-600" />}
        </button>

        {/* Notifications Icon with Badge */}
        <div className="relative">
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="p-2 rounded-xl text-slate-600 hover:text-purple-600 hover:bg-slate-100 border border-slate-200 transition-colors relative"
            title="Notifications"
          >
            <Bell size={18} />
            {unreadNotificationsCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-tr from-rose-500 to-purple-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-white animate-pulse">
                {unreadNotificationsCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown Panel */}
          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl glass-panel border border-slate-700/80 shadow-2xl p-4 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 mb-2">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-sm text-slate-100">Notifications</h3>
                  {unreadNotificationsCount > 0 && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                      {unreadNotificationsCount} New
                    </span>
                  )}
                </div>
                {unreadNotificationsCount > 0 && (
                  <button
                    onClick={markAllNotificationsAsRead}
                    className="text-xs text-purple-400 hover:text-purple-300 font-medium"
                  >
                    Mark all read
                  </button>
                )}
              </div>

              <div className="max-h-80 overflow-y-auto space-y-2 pr-1">
                {notifications.length === 0 ? (
                  <p className="text-xs text-slate-400 text-center py-6">No notifications yet.</p>
                ) : (
                  notifications.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => handleNotificationClick(item.id, item.actionView)}
                      className={`p-3 rounded-xl cursor-pointer transition-all ${
                        item.read
                          ? 'bg-slate-900/30 hover:bg-slate-800/40 border border-transparent'
                          : 'bg-gradient-to-r from-blue-900/20 to-purple-900/20 hover:from-blue-900/30 hover:to-purple-900/30 border border-purple-500/30'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <div className="flex items-center gap-1.5">
                          <span className="font-semibold text-xs text-slate-200">{item.title}</span>
                          {!item.read && (
                            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" />
                          )}
                        </div>
                        {item.badge && (
                          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 shrink-0">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-400 line-clamp-2">{item.description}</p>
                      <span className="text-[10px] text-slate-500 mt-1.5 block">{item.timestamp}</span>
                    </div>
                  ))
                )}
              </div>

              <div className="pt-3 mt-2 border-t border-slate-800/80 text-center">
                <button
                  onClick={() => {
                    setCurrentView('govt-exams');
                    setNotificationsOpen(false);
                  }}
                  className="text-xs text-blue-400 hover:text-blue-300 font-medium flex items-center justify-center gap-1 w-full"
                >
                  View All Government & Job Notifications &rarr;
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Profile / Auth Dropdown */}
        {user ? (
          <div className="relative">
            <button
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="flex items-center gap-2 p-1 pl-2 pr-2.5 rounded-xl glass-card border border-slate-800/80 hover:border-purple-500/40 transition-colors"
            >
              <img
                src={user.avatarUrl}
                alt={user.name}
                className="w-7 h-7 rounded-full object-cover border border-purple-500/30"
              />
              <span className="text-xs font-semibold text-slate-200 hidden sm:inline max-w-[100px] truncate">
                {user.name.split(' ')[0]}
              </span>
              <ChevronDown size={14} className="text-slate-400" />
            </button>

            {profileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 rounded-2xl glass-panel border border-slate-700/80 p-2 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2">
                <div className="p-2 border-b border-slate-800/80 mb-1">
                  <p className="font-semibold text-xs text-slate-100">{user.name}</p>
                  <p className="text-[11px] text-slate-400 truncate">{user.email}</p>
                </div>
                <button
                  onClick={() => {
                    setCurrentView('profile');
                    setProfileDropdownOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-slate-300 hover:text-white hover:bg-slate-800/60"
                >
                  <User size={15} />
                  <span>View Full Profile</span>
                </button>
                {user.role === 'admin' && (
                  <button
                    onClick={() => {
                      setCurrentView('admin');
                      setProfileDropdownOpen(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-amber-300 hover:bg-amber-950/30"
                  >
                    <Shield size={15} />
                    <span>Admin Panel</span>
                  </button>
                )}
                <button
                  onClick={() => {
                    setCurrentView('settings');
                    setProfileDropdownOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-slate-300 hover:text-white hover:bg-slate-800/60"
                >
                  <Layers size={15} />
                  <span>Preferences & Settings</span>
                </button>
                <div className="border-t border-slate-800/80 mt-1 pt-1">
                  <button
                    onClick={() => {
                      logout();
                      setProfileDropdownOpen(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-rose-400 hover:bg-rose-950/30"
                  >
                    <LogOut size={15} />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setAuthModalTab('login');
                setIsAuthModalOpen(true);
              }}
              className="px-3.5 py-1.5 text-xs font-semibold rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-200 transition-colors"
            >
              Sign In
            </button>
            <button
              onClick={() => {
                setAuthModalTab('signup');
                setIsAuthModalOpen(true);
              }}
              className="px-3.5 py-1.5 text-xs font-semibold rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:opacity-90 text-white shadow-md shadow-purple-500/20 transition-all"
            >
              Get Started
            </button>
          </div>
        )}
      </div>

      {/* Mobile Drawer Navigation (when open on phone/tablet) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-16 z-50 bg-slate-950/95 backdrop-blur-2xl p-6 overflow-y-auto md:hidden animate-in fade-in">
          <div className="space-y-4">
            <div className="p-3 bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-2xl border border-purple-500/25 mb-4">
              <h2 className="font-extrabold text-base bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
                Future Forge
              </h2>
              <p className="text-xs text-purple-400 font-medium">AI Career Companion</p>
            </div>

            <div className="grid grid-cols-2 gap-2 text-sm font-medium">
              {[
                { id: 'dashboard', label: 'Dashboard' },
                { id: 'domains', label: 'Career Domains' },
                { id: 'skill-gap', label: 'Skill Gap' },
                { id: 'mock-interview', label: 'AI Mock Interview' },
                { id: 'resume-analyzer', label: 'Resume ATS' },
                { id: 'jobs', label: 'Jobs & Interns' },
                { id: 'govt-exams', label: 'Govt Exams' },
                { id: 'roadmaps', label: 'Roadmaps' },
                { id: 'profile', label: 'Profile' },
                { id: 'settings', label: 'Settings' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentView(item.id as ViewMode);
                    setMobileMenuOpen(false);
                  }}
                  className={`p-3 rounded-xl text-left border ${
                    currentView === item.id
                      ? 'bg-purple-600/30 border-purple-500/40 text-white'
                      : 'bg-slate-900/60 border-slate-800 text-slate-300'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
