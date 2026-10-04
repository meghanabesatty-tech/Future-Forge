export type ViewMode =
  | 'dashboard'
  | 'domains'
  | 'skill-gap'
  | 'mock-interview'
  | 'resume-analyzer'
  | 'jobs'
  | 'govt-exams'
  | 'roadmaps'
  | 'profile'
  | 'admin'
  | 'settings';

export type CareerDomainId =
  | 'data-science'
  | 'ai-ml'
  | 'web-dev'
  | 'cyber-security'
  | 'cloud-computing'
  | 'ui-ux'
  | 'govt-exams';

export interface CareerDomain {
  id: CareerDomainId;
  name: string;
  category: 'Tech' | 'Design' | 'Healthcare' | 'Public Sector';
  tagline: string;
  description: string;
  skillsRequired: string[];
  salaryRange: {
    entry: string;
    mid: string;
    senior: string;
  };
  jobGrowth: string;
  openingsEstimate: string;
  learningResources: {
    title: string;
    type: 'Course' | 'Documentation' | 'Book' | 'Certification';
    provider: string;
    link: string;
    free: boolean;
  }[];
  roadmapId: string;
  iconName: string;
  gradient: string;
}

export interface SkillGapAnalysisResult {
  domain: string;
  totalRequired: number;
  matchedCount: number;
  progressPercentage: number;
  matchedSkills: string[];
  missingSkills: string[];
  suggestedCourses: {
    skill: string;
    title: string;
    provider: string;
    duration: string;
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
    link: string;
  }[];
  learningRoadmapSteps: string[];
}

export interface GovtSubjectReadiness {
  subject: string;
  weightage: number; // e.g. 25%
  userScore: number; // 0 to 100
  status: 'Critical Need' | 'Needs Practice' | 'Exam Ready';
  recommendedTopic: string;
  highYieldAreas: string[];
}

export interface GovtExamReadinessResult {
  examId: string;
  examName: string;
  overallReadiness: number;
  subjects: GovtSubjectReadiness[];
  priorityStudyPlan: {
    week: string;
    focus: string;
    action: string;
    targetHours: number;
  }[];
  mockTestRecommendation: string;
}

export interface InterviewQuestion {
  id: string;
  domain: CareerDomainId;
  type: 'Technical' | 'HR';
  question: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  tips: string;
  sampleAnswerHighlight: string;
}

export interface InterviewEvaluation {
  id: string;
  questionId: string;
  question: string;
  domain: string;
  type: 'Technical' | 'HR';
  userAnswer: string;
  durationSeconds: number;
  score: number;
  summary: string;
  strengths: string[];
  weaknesses: string[];
  improvementTips: string[];
  idealAnswerHighlight: string;
  timestamp: string;
}

export interface ResumeAnalysisResult {
  atsScore: number;
  rating: 'Needs Work' | 'Average' | 'Strong' | 'Exceptional';
  detectedSkills: string[];
  missingKeywords: string[];
  atsFormattingScore: number;
  contentQualityScore: number;
  strengths: string[];
  criticalImprovements: string[];
  recommendedActionVerbs: string[];
  suggestedSummary: string;
  targetDomain: string;
}

export type JobType = 'Full-time' | 'Internship' | 'Contract';
export type JobCategory = 'private' | 'internship';

export interface JobListing {
  id: string;
  category: JobCategory;
  title: string;
  company: string;
  location: string;
  type: JobType;
  workMode: 'Remote' | 'Hybrid' | 'On-site';
  salary: string;
  experience: string;
  skills: string[];
  description: string;
  postedDate: string;
  applicationDeadline: string;
  applyUrl: string;
  featured?: boolean;
}

export type GovtExamCategory =
  | 'UPSC'
  | 'SSC'
  | 'Banking'
  | 'Railways'
  | 'APPSC'
  | 'TSPSC'
  | 'Police'
  | 'Defence';

export interface GovtExamNotification {
  id: string;
  examName: string;
  category: GovtExamCategory;
  organization: string;
  postNames: string[];
  vacancies: number;
  startDate: string;
  lastDate: string;
  examDate: string;
  eligibility: string;
  ageLimit: string;
  officialWebsite: string;
  syllabusOverview: string;
  status: 'Open' | 'Upcoming' | 'Closing Soon';
  isHot?: boolean;
}

export interface RoadmapMilestone {
  id: string;
  title: string;
  duration: string;
  description: string;
  topics: {
    id: string;
    title: string;
    completed: boolean;
  }[];
  resources: {
    title: string;
    url: string;
  }[];
}

export interface CareerRoadmap {
  id: string;
  domainId: string;
  title: string;
  group: 'Tech & Modern Careers' | 'Government exams';
  description: string;
  totalEstimatedWeeks: number;
  difficulty: 'Beginner Friendly' | 'Intermediate' | 'Rigorous Preparation';
  milestones: RoadmapMilestone[];
}

export interface NotificationItem {
  id: string;
  type: 'job' | 'govt-exam' | 'interview' | 'course';
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
  actionView?: ViewMode;
  badge?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  role: 'student' | 'aspirant' | 'admin';
  targetDomain: CareerDomainId;
  experienceLevel: 'Student / Fresher' | '1-3 Years' | '3-5 Years' | 'Govt Exam Aspirant';
  education: string;
  currentSkills: string[];
  bio: string;
  savedJobIds: string[];
  savedExamIds: string[];
  completedMilestoneTopics: string[]; // Topic IDs
}
