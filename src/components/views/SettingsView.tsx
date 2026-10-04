import React, { useEffect, useState } from 'react';
import {
  Bell,
  CheckCircle2,
  HardDrive,
  Info,
  Moon,
  RefreshCw,
  RotateCcw,
  Server,
  Settings,
  Shield,
  Sparkles,
  Sun,
  Volume2,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const SettingsView: React.FC = () => {
  const { theme, toggleTheme, showSuccessToast } = useApp();

  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [ttsEnabled, setTtsEnabled] = useState(true);
  const [apiHealth, setApiHealth] = useState<{
    status: string;
    appName: string;
    hasApiKey: boolean;
  } | null>(null);
  const [checkingApi, setCheckingApi] = useState(false);

  const checkHealth = async () => {
    setCheckingApi(true);
    try {
      const res = await fetch('/api/health');
      const data = await res.json();
      setApiHealth(data);
    } catch (e) {
      setApiHealth({
        status: 'Client Offline Mode',
        appName: 'Future Forge - Your AI Career Companion',
        hasApiKey: false,
      });
    } finally {
      setCheckingApi(false);
    }
  };

  useEffect(() => {
    checkHealth();
  }, []);

  const handleResetData = () => {
    if (confirm('Reset application data to original demo seeds? Your local session changes will be restored to defaults.')) {
      localStorage.clear();
      showSuccessToast('Data reset to default seeds. Reloading app...');
      setTimeout(() => {
        window.location.reload();
      }, 800);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 max-w-4xl">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold mb-1">
          <Settings size={13} />
          <span>System & Preferences</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-100 tracking-tight">
          Settings & Customization
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Personalize your visual theme, voice assistant preferences, notification alerts, and verify AI connection health.
        </p>
      </div>

      {/* Settings Sections */}
      <div className="space-y-4">
        {/* 1. Theme Configuration */}
        <div className="p-6 rounded-3xl glass-card border border-slate-800 space-y-4">
          <h3 className="font-bold text-sm text-slate-100 flex items-center gap-2">
            {theme === 'dark' ? <Moon size={18} className="text-purple-400" /> : <Sun size={18} className="text-amber-400" />}
            <span>Interface Appearance</span>
          </h3>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div>
              <span className="font-semibold text-xs text-slate-200 block">Dark / Light Mode</span>
              <p className="text-[11px] text-slate-400">
                Switch between high-contrast midnight glassmorphism and clean daylight mode.
              </p>
            </div>

            <div className="flex p-1 rounded-xl bg-slate-950 border border-slate-800">
              <button
                onClick={() => theme === 'light' && toggleTheme()}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                  theme === 'dark' ? 'bg-purple-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Moon size={13} />
                <span>Dark</span>
              </button>
              <button
                onClick={() => theme === 'dark' && toggleTheme()}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                  theme === 'light' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Sun size={13} />
                <span>Light</span>
              </button>
            </div>
          </div>
        </div>

        {/* 2. Audio & Speech Assistant */}
        <div className="p-6 rounded-3xl glass-card border border-slate-800 space-y-4">
          <h3 className="font-bold text-sm text-slate-100 flex items-center gap-2">
            <Volume2 size={18} className="text-blue-400" />
            <span>Voice & Audio Synthesis</span>
          </h3>

          <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div>
              <span className="font-semibold text-xs text-slate-200 block">
                Read Out Interview Questions Aloud
              </span>
              <p className="text-[11px] text-slate-400">
                AI interviewer vocalizes technical and behavioral prompts in the mock interview room.
              </p>
            </div>

            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={ttsEnabled}
                onChange={() => setTtsEnabled(!ttsEnabled)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
            </label>
          </div>
        </div>

        {/* 3. Notifications Preferences */}
        <div className="p-6 rounded-3xl glass-card border border-slate-800 space-y-4">
          <h3 className="font-bold text-sm text-slate-100 flex items-center gap-2">
            <Bell size={18} className="text-amber-400" />
            <span>Alerts & Notifications</span>
          </h3>

          <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div>
              <span className="font-semibold text-xs text-slate-200 block">
                Government Exam & Job Deadline Alerts
              </span>
              <p className="text-[11px] text-slate-400">
                Receive unread notification badges for closing exam windows and new tech requisitions.
              </p>
            </div>

            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notificationsEnabled}
                onChange={() => setNotificationsEnabled(!notificationsEnabled)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
            </label>
          </div>
        </div>

        {/* 4. AI Engine Telemetry & Server Health */}
        <div className="p-6 rounded-3xl glass-card border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-100 flex items-center gap-2">
              <Server size={18} className="text-emerald-400" />
              <span>AI Integration Telemetry</span>
            </h3>

            <button
              onClick={checkHealth}
              disabled={checkingApi}
              className="text-xs text-purple-400 hover:text-purple-300 font-semibold flex items-center gap-1"
            >
              <RefreshCw size={13} className={checkingApi ? 'animate-spin' : ''} />
              <span>Re-check Ping</span>
            </button>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Application Identity:</span>
              <span className="font-semibold text-slate-200">
                {apiHealth?.appName || 'Future Forge - Your AI Career Companion'}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-400">Active Model Target:</span>
              <span className="font-mono text-purple-300 font-semibold">gemini-3.8-flash</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-400">Server Route Health:</span>
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle2 size={13} />
                <span>{apiHealth?.status === 'ok' ? 'Healthy (Port 3000)' : 'Online / Fallback Engine Ready'}</span>
              </span>
            </div>
          </div>
        </div>

        {/* 5. Reset Workspace Data */}
        <div className="p-6 rounded-3xl glass-card border border-rose-500/20 bg-rose-950/5 space-y-3">
          <h3 className="font-bold text-sm text-rose-300 flex items-center gap-2">
            <HardDrive size={18} className="text-rose-400" />
            <span>Storage & Cache Maintenance</span>
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Need to clear all added jobs, modified milestones, or interview logs back to the default pristine seeds?
          </p>
          <button
            onClick={handleResetData}
            className="px-4 py-2 rounded-xl bg-rose-950/60 hover:bg-rose-900 text-rose-200 border border-rose-500/30 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw size={13} />
            <span>Reset Cache to Default Seeds</span>
          </button>
        </div>
      </div>
    </div>
  );
};
