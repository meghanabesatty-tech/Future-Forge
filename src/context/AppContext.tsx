import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  CAREER_DOMAINS,
  CAREER_ROADMAPS,
  INITIAL_GOVT_EXAMS,
  INITIAL_JOBS,
  INITIAL_NOTIFICATIONS,
  INITIAL_USER,
} from '../data/initialData';
import {
  CareerDomain,
  CareerDomainId,
  CareerRoadmap,
  GovtExamNotification,
  InterviewEvaluation,
  JobListing,
  NotificationItem,
  ResumeAnalysisResult,
  UserProfile,
  ViewMode,
} from '../types';

interface AppContextType {
  currentView: ViewMode;
  setCurrentView: (view: ViewMode) => void;
  selectedDomainId: CareerDomainId;
  setSelectedDomainId: (id: CareerDomainId) => void;
  selectedRoadmapId: string | null;
  setSelectedRoadmapId: (id: string | null) => void;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  user: UserProfile | null;
  isAuthenticated: boolean;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  authModalTab: 'login' | 'signup' | 'forgot';
  setAuthModalTab: (tab: 'login' | 'signup' | 'forgot') => void;
  login: (email: string, role?: 'student' | 'aspirant' | 'admin') => void;
  signup: (name: string, email: string, targetDomain: CareerDomainId, education: string) => void;
  logout: () => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  switchRole: (role: 'student' | 'aspirant' | 'admin') => void;

  // Jobs
  jobs: JobListing[];
  addJob: (job: Omit<JobListing, 'id' | 'postedDate'>) => void;
  updateJob: (id: string, updates: Partial<JobListing>) => void;
  deleteJob: (id: string) => void;
  toggleSaveJob: (jobId: string) => void;

  // Government Exams
  govtExams: GovtExamNotification[];
  addGovtExam: (exam: Omit<GovtExamNotification, 'id'>) => void;
  updateGovtExam: (id: string, updates: Partial<GovtExamNotification>) => void;
  deleteGovtExam: (id: string) => void;
  toggleSaveExam: (examId: string) => void;

  // Roadmaps
  roadmaps: CareerRoadmap[];
  toggleMilestoneTopic: (topicId: string) => void;

  // Interviews & Resume
  interviewEvaluations: InterviewEvaluation[];
  addInterviewEvaluation: (item: InterviewEvaluation) => void;
  resumeAnalysis: ResumeAnalysisResult | null;
  setResumeAnalysis: (res: ResumeAnalysisResult | null) => void;

  // Notifications
  notifications: NotificationItem[];
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  unreadNotificationsCount: number;

  // UI state
  isSidebarCollapsed: boolean;
  setIsSidebarCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  searchModalOpen: boolean;
  setSearchModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  showSuccessToast: (msg: string) => void;
  toastMessage: string | null;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<ViewMode>('dashboard');
  const [selectedDomainId, setSelectedDomainId] = useState<CareerDomainId>('web-dev');
  const [selectedRoadmapId, setSelectedRoadmapId] = useState<string | null>(null);
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const savedTheme = localStorage.getItem('ff_theme');
    return (savedTheme === 'dark' || savedTheme === 'light') ? savedTheme : 'light';
  });
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [searchModalOpen, setSearchModalOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Authentication state
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('ff_user');
    return saved ? JSON.parse(saved) : INITIAL_USER;
  });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'login' | 'signup' | 'forgot'>('login');

  // Jobs state
  const [jobs, setJobs] = useState<JobListing[]>(() => {
    const saved = localStorage.getItem('ff_jobs');
    return saved ? JSON.parse(saved) : INITIAL_JOBS;
  });

  // Govt Exams state
  const [govtExams, setGovtExams] = useState<GovtExamNotification[]>(() => {
    const saved = localStorage.getItem('ff_exams');
    return saved ? JSON.parse(saved) : INITIAL_GOVT_EXAMS;
  });

  // Roadmaps state
  const [roadmaps, setRoadmaps] = useState<CareerRoadmap[]>(() => {
    const saved = localStorage.getItem('ff_roadmaps');
    return saved ? JSON.parse(saved) : CAREER_ROADMAPS;
  });

  // Interview History
  const [interviewEvaluations, setInterviewEvaluations] = useState<InterviewEvaluation[]>(() => {
    const saved = localStorage.getItem('ff_interviews');
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: 'eval_demo_1',
            questionId: 'q_wd_01',
            question: 'How does React Virtual DOM reconciliation work, and what role do keys play during array rendering?',
            domain: 'Web Development',
            type: 'Technical',
            userAnswer: 'The Virtual DOM is an in-memory object graph representing the UI. During reconciliation, React runs diffing to compare the current tree with the previous one. Keys allow React to match children across renders so it avoids re-creating unchanged nodes.',
            durationSeconds: 52,
            score: 88,
            summary: 'Excellent command of React internal reconciliation, tree diffing heuristics, and key identity semantics.',
            strengths: ['Accurate explanation of in-memory reconciliation', 'Highlighted O(n) diffing heuristics', 'Directly solved the key array mutation problem'],
            weaknesses: ['Could briefly touch on React 19 concurrent fiber lanes'],
            improvementTips: ['Practice citing the exact STAR problem statement when answering in tech screenings'],
            idealAnswerHighlight: 'The Virtual DOM allows declarative programming while batching DOM writes. Keys provide persistent identity across re-renders.',
            timestamp: 'Yesterday at 4:30 PM',
          },
        ];
  });

  // Resume analysis state
  const [resumeAnalysis, setResumeAnalysis] = useState<ResumeAnalysisResult | null>(() => {
    const saved = localStorage.getItem('ff_resume');
    return saved ? JSON.parse(saved) : null;
  });

  // Notifications state
  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem('ff_notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  // Theme synchronization with HTML element
  useEffect(() => {
    const root = document.documentElement;
    localStorage.setItem('ff_theme', theme);
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
  }, [theme]);

  // Persist user to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem('ff_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('ff_user');
    }
  }, [user]);

  // Persist jobs
  useEffect(() => {
    localStorage.setItem('ff_jobs', JSON.stringify(jobs));
  }, [jobs]);

  // Persist exams
  useEffect(() => {
    localStorage.setItem('ff_exams', JSON.stringify(govtExams));
  }, [govtExams]);

  // Persist interviews
  useEffect(() => {
    localStorage.setItem('ff_interviews', JSON.stringify(interviewEvaluations));
  }, [interviewEvaluations]);

  // Persist notifications
  useEffect(() => {
    localStorage.setItem('ff_notifications', JSON.stringify(notifications));
  }, [notifications]);

  const showSuccessToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((curr) => (curr === msg ? null : curr));
    }, 3500);
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const login = (email: string, role: 'student' | 'aspirant' | 'admin' = 'student') => {
    const namePart = email.split('@')[0] || 'User';
    const capitalizedName = namePart.charAt(0).toUpperCase() + namePart.slice(1);
    const newUser: UserProfile = {
      id: `usr_${Date.now()}`,
      name: role === 'admin' ? 'Administrator' : capitalizedName,
      email,
      avatarUrl:
        role === 'admin'
          ? 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80'
          : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      role,
      targetDomain: role === 'aspirant' ? 'govt-exams' : 'web-dev',
      experienceLevel: role === 'aspirant' ? 'Govt Exam Aspirant' : 'Student / Fresher',
      education: role === 'aspirant' ? 'B.A / B.Sc Graduate' : 'B.Tech / Computer Science',
      currentSkills: role === 'aspirant' ? ['Quantitative Aptitude', 'Reasoning', 'General Studies'] : ['JavaScript', 'React', 'HTML/CSS', 'Python'],
      bio: 'Enthusiastic candidate tracking career pathways on Future Forge.',
      savedJobIds: ['job_01'],
      savedExamIds: ['govt_01', 'govt_02'],
      completedMilestoneTopics: ['wd_t1', 'wd_t2'],
    };
    setUser(newUser);
    setIsAuthModalOpen(false);
    showSuccessToast(`Welcome back, ${newUser.name}! Signed in as ${role.toUpperCase()}.`);
  };

  const signup = (name: string, email: string, targetDomain: CareerDomainId, education: string) => {
    const newUser: UserProfile = {
      id: `usr_${Date.now()}`,
      name,
      email,
      avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
      role: targetDomain === 'govt-exams' ? 'aspirant' : 'student',
      targetDomain,
      experienceLevel: 'Student / Fresher',
      education,
      currentSkills: ['Communication', 'Problem Solving'],
      bio: `Dedicated to growing skills in ${targetDomain} via Future Forge.`,
      savedJobIds: [],
      savedExamIds: [],
      completedMilestoneTopics: [],
    };
    setUser(newUser);
    setIsAuthModalOpen(false);
    showSuccessToast(`Account created successfully! Welcome to Future Forge, ${name}.`);
  };

  const logout = () => {
    setUser(null);
    showSuccessToast('You have been signed out.');
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    if (!user) return;
    setUser({ ...user, ...updates });
    showSuccessToast('Profile updated successfully.');
  };

  const switchRole = (newRole: 'student' | 'aspirant' | 'admin') => {
    if (!user) return;
    setUser({
      ...user,
      role: newRole,
      name: newRole === 'admin' ? 'Administrator' : user.name,
    });
    showSuccessToast(`Switched active view role to ${newRole.toUpperCase()}.`);
  };

  // Jobs Actions
  const addJob = (jobData: Omit<JobListing, 'id' | 'postedDate'>) => {
    const newJob: JobListing = {
      ...jobData,
      id: `job_${Date.now()}`,
      postedDate: 'Just now',
    };
    setJobs((prev) => [newJob, ...prev]);
    showSuccessToast(`Job posting "${newJob.title}" published!`);
  };

  const updateJob = (id: string, updates: Partial<JobListing>) => {
    setJobs((prev) => prev.map((j) => (j.id === id ? { ...j, ...updates } : j)));
    showSuccessToast('Job listing updated successfully.');
  };

  const deleteJob = (id: string) => {
    setJobs((prev) => prev.filter((j) => j.id !== id));
    showSuccessToast('Job listing deleted.');
  };

  const toggleSaveJob = (jobId: string) => {
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }
    const isSaved = user.savedJobIds.includes(jobId);
    const newSaved = isSaved
      ? user.savedJobIds.filter((id) => id !== jobId)
      : [...user.savedJobIds, jobId];
    setUser({ ...user, savedJobIds: newSaved });
    showSuccessToast(isSaved ? 'Removed from saved jobs.' : 'Saved to your job bookmarks!');
  };

  // Govt Exams Actions
  const addGovtExam = (examData: Omit<GovtExamNotification, 'id'>) => {
    const newExam: GovtExamNotification = {
      ...examData,
      id: `govt_${Date.now()}`,
    };
    setGovtExams((prev) => [newExam, ...prev]);

    // Also notify
    const notif: NotificationItem = {
      id: `notif_${Date.now()}`,
      type: 'govt-exam',
      title: `New Exam: ${newExam.examName}`,
      description: `${newExam.organization} announced ${newExam.vacancies.toLocaleString()} vacancies. Last date: ${newExam.lastDate}`,
      timestamp: 'Just now',
      read: false,
      actionView: 'govt-exams',
      badge: 'New Alert',
    };
    setNotifications((prev) => [notif, ...prev]);
    showSuccessToast(`Notification for "${newExam.examName}" posted!`);
  };

  const updateGovtExam = (id: string, updates: Partial<GovtExamNotification>) => {
    setGovtExams((prev) => prev.map((e) => (e.id === id ? { ...e, ...updates } : e)));
    showSuccessToast('Exam notification updated.');
  };

  const deleteGovtExam = (id: string) => {
    setGovtExams((prev) => prev.filter((e) => e.id !== id));
    showSuccessToast('Exam notification removed.');
  };

  const toggleSaveExam = (examId: string) => {
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }
    const isSaved = user.savedExamIds.includes(examId);
    const newSaved = isSaved
      ? user.savedExamIds.filter((id) => id !== examId)
      : [...user.savedExamIds, examId];
    setUser({ ...user, savedExamIds: newSaved });
    showSuccessToast(isSaved ? 'Exam removed from reminders.' : 'Added to your exam tracker & reminders!');
  };

  // Roadmaps Actions
  const toggleMilestoneTopic = (topicId: string) => {
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }
    const isCompleted = user.completedMilestoneTopics.includes(topicId);
    const updated = isCompleted
      ? user.completedMilestoneTopics.filter((id) => id !== topicId)
      : [...user.completedMilestoneTopics, topicId];

    setUser({ ...user, completedMilestoneTopics: updated });

    // Update local roadmap state as well
    setRoadmaps((prevRoadmaps) =>
      prevRoadmaps.map((rm) => ({
        ...rm,
        milestones: rm.milestones.map((m) => ({
          ...m,
          topics: m.topics.map((t) =>
            t.id === topicId ? { ...t, completed: !isCompleted } : t
          ),
        })),
      }))
    );
  };

  // Interview Evaluation Action
  const addInterviewEvaluation = (evalResult: InterviewEvaluation) => {
    setInterviewEvaluations((prev) => [evalResult, ...prev]);
  };

  // Notifications Actions
  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    showSuccessToast('All notifications marked as read.');
  };

  const unreadNotificationsCount = notifications.filter((n) => !n.read).length;

  return (
    <AppContext.Provider
      value={{
        currentView,
        setCurrentView,
        selectedDomainId,
        setSelectedDomainId,
        selectedRoadmapId,
        setSelectedRoadmapId,
        theme,
        toggleTheme,
        user,
        isAuthenticated: !!user,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authModalTab,
        setAuthModalTab,
        login,
        signup,
        logout,
        updateProfile,
        switchRole,
        jobs,
        addJob,
        updateJob,
        deleteJob,
        toggleSaveJob,
        govtExams,
        addGovtExam,
        updateGovtExam,
        deleteGovtExam,
        toggleSaveExam,
        roadmaps,
        toggleMilestoneTopic,
        interviewEvaluations,
        addInterviewEvaluation,
        resumeAnalysis,
        setResumeAnalysis,
        notifications,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        unreadNotificationsCount,
        isSidebarCollapsed,
        setIsSidebarCollapsed,
        mobileMenuOpen,
        setMobileMenuOpen,
        searchModalOpen,
        setSearchModalOpen,
        searchQuery,
        setSearchQuery,
        showSuccessToast,
        toastMessage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
